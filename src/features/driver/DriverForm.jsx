import { useEffect, useState } from "react";
import { TextInput } from "../../ui/Input";
import { addItem } from "../../helper/firebaseFunctions";
import { auth, db } from "../../config/firebase";
import Select from "react-select";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { addDoc, collection, doc, getDocs, setDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import { createUserWithEmailAndPassword } from "firebase/auth";

function DriverForm({ isFormOpen, setIsFormOpen, isEditSession, editRow }) {
  const queryClient = useQueryClient();
  const [pickupPoints, setPickupPoints] = useState([]);
  const [formValues, setFormValues] = useState(
    isEditSession
      ? editRow
      : {
          name: "",
          driverid: "",
          licenseid: "",
          phno: "",
          busno: "",
        },
  );

  const handleBusChange = (selectedOption) => {
    setFormValues({
      ...formValues,
      busno: selectedOption.value,
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const { name, driverid, licenseid, phno, busno } = formValues;

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formValues);
    console.log(formValues);
    setIsFormOpen(false);
  };

  useEffect(() => {
    const fetchPickupPoints = async () => {
      try {
        const routesCollection = collection(db, "buses");
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

  const handlePickupPointChange = (selectedOption) => {
    setFormValues({
      ...formValues,
      busno: selectedOption.value,
    });
  };

  const pickupPointOptions = pickupPoints.map((point) => ({
    value: point.id,
    label: point.name,
  }));

  const { mutate } = useMutation({
    mutationFn: async (data) => {
      if (!isEditSession) {
        const newUser = await createUserWithEmailAndPassword(
          auth,
          `${data.driverid.toLowerCase()}@sairamtap.edu.in`,
          "Welcome@123",
        );
        const id = newUser.user.uid;
        await setDoc(doc(db, "drivers", id), data);
      } else {
        const { id } = data;
        const { busno } = data;
        await setDoc(doc(db, "drivers", id), data);

        await setDoc(doc(db, "buses", busno), {
          name: name,
          phno: phno,
          // latitude: latitude,
          // longitude: longitude,
        });
      }
    },

    // if (!isEditSession) {
    //   const newUser = await createUserWithEmailAndPassword(
    //     auth,
    //     `${data.studentid.toLowerCase()}@sairamtap.edu.in`,
    //     "Welcome@123",
    //   );
    //   const id = newUser.user.uid;
    //   await setDoc(doc(db, "users", id), data);
    //   await addDoc(collection(db, "drivers"), data);
    // } else {
    //   const { id } = data;
    //   const { busno } = data;
    //   await setDoc(doc(db, "drivers", id), data);

    //   await setDoc(doc(db, "buses", busno), {
    //     name: name,
    //     phno: phno,
    //     // latitude: latitude,
    //     // longitude: longitude,
    //   });
    // }

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["drivers"] });
      isEditSession
        ? toast.success("Driver updated successfully")
        : toast.success("Driver added successfully");
    },
    onError: (e) => {
      toast.error("Something went wrong!");
      console.log(e);
    },
  });

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
            <div className="relative">
              <label
                htmlFor="busno"
                className="block text-sm font-medium text-gray-700"
              >
                Bus No
              </label>
              <Select
                id="pickuppoint"
                name="pickuppoint"
                value={
                  pickupPointOptions.find((option) => option.value === busno) ||
                  null
                }
                onChange={handlePickupPointChange}
                options={pickupPointOptions}
                className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              />
              {/* <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                {"Bus No"}
              </span> */}
            </div>
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
