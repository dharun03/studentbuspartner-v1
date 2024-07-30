import { useState, useEffect } from "react";
import { auth, db } from "../../config/firebase";
import { TextInput } from "../../ui/Input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { doc, setDoc, collection, getDocs, getDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Select from "react-select";

// Function to calculate the difference in years from May to May
function differenceInMayYears(date1, date2) {
  const year1 = date1.getFullYear();
  const month1 = date1.getMonth();
  const day1 = date1.getDate();

  const year2 = date2.getFullYear();
  const month2 = date2.getMonth();
  const day2 = date2.getDate();

  let age = year2 - year1;

  // Adjust for May-to-May year calculation
  if (month2 < 4 || (month2 === 4 && day2 < day1)) {
    // 4 represents May (0-indexed)
    age--;
  }

  return age;
}

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
          phonenumber: "",
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
          `${data.studentid.toLowerCase()}@sairamtap.edu.in`,
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsFormOpen(false);

    // Derive year from studentid
    const studentYearStr = formValues.studentid.substring(3, 5);
    const studentYear = parseInt(studentYearStr, 10);

    // Current date
    const currentDate = new Date();

    // May 1st of the student year
    const studentYearMay = new Date(`May 1, 20${studentYear}`);

    // Calculate difference in years from May to May
    const year = differenceInMayYears(studentYearMay, currentDate) + 1;

    mutate({
      ...formValues,
      year: year.toString(),
      mailid: `${formValues.studentid.toLowerCase()}@sairamtap.edu.in`,
    });
  };

  const pickupPointOptions = pickupPoints.map((point) => ({
    value: point.id,
    label: point.name,
  }));
  const busOptions = buses.map((bus) => ({ value: bus.name, label: bus.name }));

  const { name, studentid, phonenumber, pickuppoint, busno } = formValues;

  return (
    <div className="fixed inset-0 top-3 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
      <div
        className={`fixed inset-0 min-w-28 ${
          isFormOpen ? "visible bg-black/20" : "invisible"
        }`}
      ></div>
      <div
        className={`z-10 rounded bg-white p-8 shadow-lg ${
          isFormOpen ? "scale-100 opacity-100" : "scale-125 opacity-0"
        }`}
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
