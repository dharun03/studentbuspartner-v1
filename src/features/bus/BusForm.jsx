import TextInput from "../../ui/Input";
function BusForm({ isFormOpen, setIsFormOpen }) {
  return (
    <div className="fixed inset-0 top-3 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
      <div
        className={`fixed inset-0 min-w-28 bg-gray-500 ${isFormOpen ? "visible bg-black/20" : "invisible"}`}
      ></div>

      <div
        className={`z-10 rounded bg-white p-8 shadow-lg ${isFormOpen ? "scale-100 opacity-100" : "scale-125 opacity-0"}`}
      >
        <h2 className=" mb-6 text-xl font-bold">Add Student</h2>
        <form className="mb-3 flex flex-col gap-5">
          <TextInput title={"Bus ID"} />
          <TextInput title={"Bus No"} />
          <TextInput title={"Route ID"} />
          <TextInput title={"Driver ID"} />
          <>
            <label className="mb-2">Status</label>
            <select className="rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </>
        </form>
        <div className="space-x-4">
          <button
            className="mt-5 rounded  border-2 border-gray-500 px-4 py-2 text-gray-700 hover:bg-gray-500  hover:text-white"
            onClick={() => setIsFormOpen(false)}
          >
            Close
          </button>
          <button className="mt-5 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700 ">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default BusForm;
