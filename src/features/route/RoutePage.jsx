import { db } from "../../config/firebase";
import AddButton from "../../ui/AddButton";
import Header from "../../ui/Header";
import Table from "../../ui/Table";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";
import Loader from "../../ui/Loader";
import MyAccount from "../../ui/MyAccount";
import { useState } from "react";
import RouteForm from "./RouteForm";

const HEADERS = ["Routes", "Buses", "Actions"];
const KEYS = ["id", "buses"];

function RoutePage() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["routes"],
    queryFn: async () => {
      const itemsCol = collection(db, "routes");
      const ItemSnapshot = await getDocs(itemsCol);
      const itemList = ItemSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      const busList = itemList.map((bus) => {
        const len = Object.keys(bus).length - 1;
        let buses = [];

        for (let i = 1; i <= len; i++) {
          buses.push(bus[String(i)]);
        }

        return { ...bus, buses };
      });

      console.log();
      return busList;
    },
  });

  console.log(data);
  const routesDetails = data;

  if (isLoading) return <Loader />;

  return (
    <div className="mt-4">
      <div className="flex justify-end">
        <MyAccount />
      </div>
      <div className="flex items-center justify-between">
        <Header image={"routes.png"} title={"Manage Routes"} />
        <div className="my-8 space-y-6">
          <AddButton name={"Add Route"} onClick={() => setIsFormOpen(true)} />
        </div>
      </div>
      <Table
        headers={HEADERS}
        keys={KEYS}
        details={routesDetails}
        dbName={"routes"}
      />
      {isFormOpen ? (
        <RouteForm isFormOpen={isFormOpen} setIsFormOpen={setIsFormOpen} />
      ) : (
        ""
      )}
    </div>
  );
}

export default RoutePage;
