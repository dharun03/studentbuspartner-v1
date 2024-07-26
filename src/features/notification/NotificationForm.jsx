import { useState } from "react";
import { db } from "../../config/firebase";
import { DateInput, TextInput, TimeInput } from "../../ui/Input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addDoc, collection } from "firebase/firestore";
import toast from "react-hot-toast";

function NotificationForm({ isFormOpen, setIsFormOpen }) {
  const queryClient = useQueryClient();

  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
  });

  const { mutate } = useMutation({
    mutationFn: async (data) => {
      await addDoc(collection(db, "notifications"), data);
      // console.log(new Date().toTimeString);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      toast.success("Notification sent successfully");
    },
    onError: () => {
      toast.error("Notification failed");
      // console.log(new Date().toTimeString);
    },
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const { title, description, date, time } = formValues;

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
        <h2 className=" mb-6 text-xl font-bold">Send Notification</h2>
        <form className="mb-3 flex flex-col gap-5 " onSubmit={handleSubmit}>
          <TextInput
            title={"Title"}
            name={"title"}
            value={title}
            onChange={handleChange}
          />
          <TextInput
            title={"Description"}
            name={"description"}
            value={description}
            onChange={handleChange}
          />
          {/* <DateInput
            title={"Select Date"}
            name={"date"}
            value={date}
            onChange={handleChange}
          />
          <TimeInput
            title={"Select Time"}
            name={"time"}
            value={time}
            onChange={handleChange}
          /> */}

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

export default NotificationForm;
