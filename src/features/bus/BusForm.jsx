import { useState } from "react";
import { db } from "../../config/firebase";
import { DateInput, TextInput, TimeInput } from "../../ui/Input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

function BusForm({ isFormOpen, setIsFormOpen }) {
  const queryClient = useQueryClient();

  const [formValues, setFormValues] = useState({
    name: "",
    phno: "",
    id: "",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      const docRef = await setDoc(doc(db, "buses", data.id), data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["buses"] });
    },
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const { name, phno, id: routeno } = formValues;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsFormOpen(false);
    mutate(formValues);
  };

  return (
    <div className="fixed inset-0 top-3 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
      <div
        className={`fixed inset-0 min-w-28  ${isFormOpen ? "visible bg-black/20" : "invisible"}`}
      ></div>

      <div
        className={`z-10 rounded bg-white p-8 shadow-lg ${isFormOpen ? "scale-100 opacity-100" : "scale-125 opacity-0"}`}
      >
        <h2 className=" mb-6 text-xl font-bold">Add Bus</h2>
        <form className="mb-3 flex flex-col gap-5 " onSubmit={handleSubmit}>
          <TextInput
            title={"Name"}
            name={"name"}
            value={name}
            onChange={handleChange}
          />
          <TextInput
            title={"Phone Number"}
            name={"phno"}
            value={phno}
            onChange={handleChange}
          />
          <TextInput
            title={"Route No"}
            name={"id"}
            value={routeno}
            onChange={handleChange}
          />

          <div className="space-x-4">
            <button
              className="mt-5 rounded  border-2 border-gray-500 px-4 py-2 text-gray-700 hover:bg-gray-500  hover:text-white"
              onClick={() => setIsFormOpen(false)}
            >
              Close
            </button>
            <button
              className="mt-5 rounded bg-indigo-500 px-4 py-2 text-white hover:bg-indigo-700 "
              type="submit"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BusForm;
