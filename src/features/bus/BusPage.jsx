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

const HEADERS = ["Name", "Phone No.", "Route No.", "Actions"];
const KEYS = ["name", "phno", "id"];

function BusPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["buses"],
    queryFn: async () => {
      const itemsCol = collection(db, "buses");
      const ItemSnapshot = await getDocs(itemsCol);
      const itemList = ItemSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log(ItemSnapshot);
      return itemList;
    },
  });

  if (isLoading) return <Loader />;

  const busList = data;

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
      <Table details={busList} headers={HEADERS} keys={KEYS} dbName={"buses"} />
    </div>
  );
}

export default BusPage;
