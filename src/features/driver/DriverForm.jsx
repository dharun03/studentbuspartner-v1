import { useState } from "react";
import { TextInput } from "../../ui/Input";
import { addItem } from "../../helper/firebaseFunctions";
import { db } from "../../config/firebase";

function DriverForm({ isFormOpen, setIsFormOpen }) {
  const [formValues, setFormValues] = useState({
    name: "",
    driverid: "",
    licenseid: "",
    phno: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const { name, driverid, licenseid, phno } = formValues;

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsFormOpen(false);
    addItem(db, "drivers", formValues);
  };

  return (
    <div className="fixed inset-0 top-3 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
      <div
        className={`fixed inset-0 min-w-28  ${isFormOpen ? "visible bg-black/20" : "invisible"}`}
      ></div>

      <div
        className={`z-10 rounded bg-white p-8 shadow-lg ${isFormOpen ? "scale-100 opacity-100" : "scale-125 opacity-0"}`}
      >
        <h2 className=" mb-6 text-xl font-bold">Add Driver</h2>
        <form className="mb-3 flex flex-col gap-5 " onSubmit={handleSubmit}>
          <TextInput
            title={"Name"}
            name={"name"}
            value={name}
            onChange={handleChange}
          />
          <TextInput
            title={"Driver ID"}
            name={"driverid"}
            value={driverid}
            onChange={handleChange}
          />
          <TextInput
            title={"License ID"}
            name={"licenseid"}
            value={licenseid}
            onChange={handleChange}
          />
          <TextInput
            title={"Phone"}
            name={"phno"}
            value={phno}
            onChange={handleChange}
          />
          <>
            <label className="relative block rounded-md border border-gray-200 text-gray-700 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
              <select
                id="status"
                className="peer mx-1 w-96  border-none bg-transparent py-2 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                name="stauts"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                {"Status"}
              </span>
            </label>
          </>

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

export default DriverForm;
