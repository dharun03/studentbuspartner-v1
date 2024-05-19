import { useState } from "react";
import AddButton from "../../ui/AddButton";
import Header from "../../ui/Header";
import Table from "../../ui/Table";
import DriverForm from "./DriverForm";
import { db } from "../../config/firebase";
import Loader from "../../ui/Loader";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";
import MyAccount from "../../ui/MyAccount";

const HEADERS = ["Name", "Driver ID", "Mobile No.", "License No.", "Actions"];
const KEYS = ["name", "driverid", "phno", "licenseid"];

function DriverPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["drivers"],
    queryFn: async () => {
      const itemsCol = collection(db, "drivers");
      const ItemSnapshot = await getDocs(itemsCol);
      const itemList = ItemSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      return itemList;
    },
  });

  const DriversList = data;

  if (isLoading) return <Loader />;

  return (
    <div className="mt-4">
      <div className="flex justify-end">
        <MyAccount />
      </div>
      <div className="flex items-center justify-between">
        <Header image={"driver.png"} title={"Manage Drivers"} />
        <div className="my-8 space-y-6">
          <AddButton name={"Add Drivers"} onClick={() => setIsFormOpen(true)} />
        </div>
      </div>

      {isFormOpen ? (
        <DriverForm isFormOpen={isFormOpen} setIsFormOpen={setIsFormOpen} />
      ) : (
        ""
      )}

      <Table
        details={DriversList}
        headers={HEADERS}
        keys={KEYS}
        dbName={"drivers"}
      />
    </div>
  );
}

export default DriverPage;
