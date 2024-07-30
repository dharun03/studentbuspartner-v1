import { useState } from "react";
import AddButton from "../../ui/AddButton";
import Header from "../../ui/Header";
import Table from "../../ui/Table";
import { db } from "../../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useQuery } from "@tanstack/react-query";
import BusForm from "./BusForm";
import Loader from "../../ui/Loader";
import MyAccount from "../../ui/MyAccount";

const HEADERS = [
  "S.No",
  "Name",
  "Phone No.",
  "Bus No",
  "1st Year",
  "2nd Year",
  "3rd Year",
  "4th Year",
  "Actions",
];
const KEYS = ["name", "phno", "id", "year1", "year2", "year3", "year4"];

function BusPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const { data: buses, isLoading: busesLoading } = useQuery({
    queryKey: ["buses"],
    queryFn: async () => {
      const itemsCol = collection(db, "buses");
      const ItemSnapshot = await getDocs(itemsCol);
      return ItemSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
    },
  });

  const { data: users, isLoading: usersLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const itemsCol = collection(db, "users");
      const ItemSnapshot = await getDocs(itemsCol);
      return ItemSnapshot.docs.map((doc) => doc.data());
    },
  });

  if (busesLoading || usersLoading) return <Loader />;

  // Aggregate user data by bus number and year
  const busYearCounts = buses.map((bus) => {
    const counts = { year1: 0, year2: 0, year3: 0, year4: 0 };
    users.forEach((user) => {
      if (user.busno === bus.id) {
        const yearKey = `year${user.year}`;
        if (counts[yearKey] !== undefined) {
          counts[yearKey]++;
        }
      }
    });
    return { ...bus, ...counts };
  });

  return (
    <div className="mt-4">
      <div className="flex justify-end">
        <MyAccount />
      </div>
      <div className="flex items-center justify-between">
        <Header image={"bus.png"} title={"Manage Buses"} />
        <div className="my-8 space-y-6">
          <AddButton name={"Add Buses"} onClick={() => setIsFormOpen(true)} />
        </div>
      </div>
      {isFormOpen ? (
        <BusForm isFormOpen={isFormOpen} setIsFormOpen={setIsFormOpen} />
      ) : (
        ""
      )}
      <Table
        details={busYearCounts}
        headers={HEADERS}
        keys={KEYS}
        dbName={"buses"}
      />
    </div>
  );
}
export default BusPage;
