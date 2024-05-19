import { useState } from "react";
import { auth, db } from "../../config/firebase";
import { TextInput } from "../../ui/Input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { doc, setDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import { createUserWithEmailAndPassword } from "firebase/auth";

function StudentForm({ isFormOpen, setIsFormOpen }) {
  const queryClient = useQueryClient();

  const [formValues, setFormValues] = useState({
    name: "",
    studentid: "",
    mailid: "",
    phonenumber: "",
    year: "",
    pickuppoint: "",
  });

  const { mutate } = useMutation({
    mutationFn: async (data) => {
      const newUser = await createUserWithEmailAndPassword(
        auth,
        data.mailid,
        "Welcome@123",
      );
      const id = newUser.user.uid;
      console.log(id);
      const docRef = await setDoc(doc(db, "users", id), data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Student added successfully");
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const { name, studentid, mailid, phonenumber, pickuppoint, busno, year } =
    formValues;

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
        <h2 className=" mb-6 text-xl font-bold">Add Student</h2>
        <form className="mb-3 flex flex-col gap-5 " onSubmit={handleSubmit}>
          <TextInput
            title={"Name"}
            name={"name"}
            value={name}
            onChange={handleChange}
          />
          <TextInput
            title={"Student ID"}
            name={"studentid"}
            value={studentid}
            onChange={handleChange}
          />
          <TextInput
            title={"Mail ID"}
            name={"mailid"}
            value={mailid}
            onChange={handleChange}
          />
          <TextInput
            title={"Year"}
            name={"year"}
            value={year}
            onChange={handleChange}
          />
          <TextInput
            title={"Phone"}
            name={"phonenumber"}
            value={phonenumber}
            onChange={handleChange}
          />
          <TextInput
            title={"Bus No"}
            name={"busno"}
            value={busno}
            onChange={handleChange}
          />
          <TextInput
            title={"PickupPoint"}
            name={"pickuppoint"}
            value={pickuppoint}
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

export default StudentForm;
