import { useState } from "react";
import { db } from "../../config/firebase";
import { TextInput } from "../../ui/Input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { doc, setDoc } from "firebase/firestore";
import { CgAdd } from "react-icons/cg";
import { IoIosCloseCircle } from "react-icons/io";
import toast from "react-hot-toast";

export default function RouteForm({ isFormOpen, setIsFormOpen }) {
  const queryClient = useQueryClient();

  const [formValues, setFormValues] = useState({
    route: "",
  });

  const [inputFields, setInputFields] = useState([{ busno: "" }]);

  const addInputField = () => {
    setInputFields([...inputFields, { busno: "" }]);
  };

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const list = [...inputFields];
    list[index][name] = value;
    setInputFields(list);
  };

  const removeInputFields = (index) => {
    const rows = [...inputFields];
    rows.splice(index, 1);
    setInputFields(rows);
  };

  const { mutate } = useMutation({
    mutationFn: async (data) => {
      const docRef = doc(db, "routes", data.route);
      delete data.route; // Remove the route from the data object
      await setDoc(docRef, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["routes"] });
      toast.success("Route added successfully");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create an object with numeric keys for bus fields
    const buses = inputFields.reduce((acc, field, index) => {
      acc[`${index + 1}`] = field.busno;
      return acc;
    }, {});

    const data = { route: formValues.route, ...buses };

    mutate(data);
    setIsFormOpen(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <div className="fixed inset-0 top-3 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
      <div
        className={`fixed inset-0 min-w-28 ${isFormOpen ? "visible bg-black/20" : "invisible"}`}
      ></div>

      <div
        className={`z-10 rounded bg-white p-8 shadow-lg ${isFormOpen ? "scale-100 opacity-100" : "scale-125 opacity-0"}`}
      >
        <h2 className="mb-6 text-xl font-bold">Add Routes</h2>
        <form className="mb-3 flex flex-col gap-5" onSubmit={handleSubmit}>
          <TextInput
            title={"Route Name"}
            name={"route"}
            value={formValues.route}
            onChange={handleInputChange}
          />

          {inputFields.map((data, index) => (
            <div key={index}>
              <div className="flex items-center justify-start gap-2">
                <TextInput
                  type="text"
                  name="busno"
                  onChange={(event) => handleChange(index, event)}
                  value={data.busno}
                  title={`Bus No ${index + 1}`}
                />
                {inputFields.length !== 1 ? (
                  <button
                    type="button"
                    onClick={() => removeInputFields(index)}
                  >
                    <IoIosCloseCircle size={25} color="#dc2626" />
                  </button>
                ) : null}
              </div>
            </div>
          ))}

          <button
            type="button"
            className="items inline-flex justify-center gap-x-2 rounded-lg border border-transparent px-4 py-3 text-sm font-semibold text-gray-800 hover:bg-gray-100 disabled:pointer-events-none disabled:opacity-50"
            onClick={addInputField}
          >
            <CgAdd size={20} />
            Add Bus
          </button>

          <div className="space-x-4">
            <button
              className="mt-5 rounded border-2 border-gray-500 px-4 py-2 text-gray-700 hover:bg-gray-500 hover:text-white"
              type="button"
              onClick={() => setIsFormOpen(false)}
            >
              Close
            </button>
            <button
              className="mt-5 rounded bg-indigo-500 px-4 py-2 text-white hover:bg-indigo-700"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
