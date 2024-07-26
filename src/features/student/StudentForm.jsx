import { useState, useEffect } from "react";
import { auth, db } from "../../config/firebase";
import { TextInput } from "../../ui/Input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { doc, setDoc, collection, getDocs, getDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Select from "react-select";

function StudentForm({ isFormOpen, setIsFormOpen, isEditSession, editRow }) {
  const queryClient = useQueryClient();
  const [pickupPoints, setPickupPoints] = useState([]);
  const [buses, setBuses] = useState([]);
  const [formValues, setFormValues] = useState(
    isEditSession
      ? editRow
      : {
          name: "",
          studentid: "",
          mailid: "",
          phonenumber: "",
          year: "",
          pickuppoint: "",
          busno: "",
        },
  );

  useEffect(() => {
    const fetchPickupPoints = async () => {
      try {
        const routesCollection = collection(db, "routes");
        const routesSnapshot = await getDocs(routesCollection);
        const routesList = routesSnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.id,
        }));
        setPickupPoints(routesList);
      } catch (error) {
        console.error("Error fetching pickup points:", error);
      }
    };

    fetchPickupPoints();
  }, []);

  const fetchBuses = async (pickupPointId) => {
    try {
      const routeDoc = doc(db, "routes", pickupPointId);
      const routeSnapshot = await getDoc(routeDoc);

      if (routeSnapshot.exists()) {
        const routeData = routeSnapshot.data();
        // Transform routeData to array of buses
        const busesList = Object.values(routeData).map((value, index) => ({
          id: index + 1,
          name: value,
        }));
        setBuses(busesList);
      } else {
        console.error("No such route!");
      }
    } catch (error) {
      console.error("Error fetching buses:", error);
    }
  };

  const { mutate } = useMutation({
    mutationFn: async (data) => {
      if (!isEditSession) {
        const newUser = await createUserWithEmailAndPassword(
          auth,
          data.mailid,
          "Welcome@123",
        );
        const id = newUser.user.uid;
        await setDoc(doc(db, "users", id), data);
      } else {
        const { id } = data;
        await setDoc(doc(db, "users", id), data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      isEditSession
        ? toast.success("Student updated successfully")
        : toast.success("Student added successfully");
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handlePickupPointChange = (selectedOption) => {
    setFormValues({
      ...formValues,
      pickuppoint: selectedOption.value,
      busno: "",
    });
    fetchBuses(selectedOption.value);
    setBuses([]); // Clear buses when pickup point changes
  };

  const handleBusChange = (selectedOption) => {
    setFormValues({ ...formValues, busno: selectedOption.value });
  };

  const { name, studentid, mailid, phonenumber, pickuppoint, busno, year } =
    formValues;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsFormOpen(false);
    mutate(formValues);
  };

  const pickupPointOptions = pickupPoints.map((point) => ({
    value: point.id,
    label: point.name,
  }));
  const busOptions = buses.map((bus) => ({ value: bus.name, label: bus.name }));

  return (
    <div className="fixed inset-0 top-3 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
      <div
        className={`fixed inset-0 min-w-28 ${isFormOpen ? "visible bg-black/20" : "invisible"}`}
      ></div>
      <div
        className={`z-10 rounded bg-white p-8 shadow-lg ${isFormOpen ? "scale-100 opacity-100" : "scale-125 opacity-0"}`}
      >
        <h2 className="mb-6 text-xl font-bold">Add Student</h2>
        <form className="mb-3 flex flex-col gap-5" onSubmit={handleSubmit}>
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

          <div className="relative">
            <label
              htmlFor="pickuppoint"
              className="block text-sm font-medium text-gray-700"
            >
              Pickup Point
            </label>
            <Select
              id="pickuppoint"
              name="pickuppoint"
              value={
                pickupPointOptions.find(
                  (option) => option.value === pickuppoint,
                ) || null
              }
              onChange={handlePickupPointChange}
              options={pickupPointOptions}
              className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div className="relative">
            <label
              htmlFor="busno"
              className="block text-sm font-medium text-gray-700"
            >
              Bus No
            </label>
            <div className="mt-1 block w-full">
              <Select
                id="busno"
                name="busno"
                value={
                  busOptions.find((option) => option.value === busno) || null
                }
                onChange={handleBusChange}
                options={busOptions}
                className="rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="space-x-4">
            <button
              className="mt-5 rounded border-2 border-gray-500 px-4 py-2 text-gray-700 hover:bg-gray-500 hover:text-white"
              onClick={() => setIsFormOpen(false)}
            >
              Close
            </button>
            <button
              className="mt-5 rounded bg-indigo-500 px-4 py-2 text-white hover:bg-indigo-700"
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
