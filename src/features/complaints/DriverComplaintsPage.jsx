import { db } from "../../config/firebase";
import Header from "../../ui/Header";
import Table from "../../ui/Table";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";
import Loader from "../../ui/Loader";
import MyAccount from "../../ui/MyAccount";

const HEADERS = ["S.No", "Driver ID", "Name", "Bus No", "Issue", "ACTIONS"];
const KEYS = ["driverid", "name", "busno", "issue"];

function DriverComplaintsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["drivercomplaints"],
    queryFn: async () => {
      const itemsCol = collection(db, "drivercomplaints");
      const ItemSnapshot = await getDocs(itemsCol);
      const itemList = ItemSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      return itemList;
    },
  });

  if (isLoading) return <Loader />;

  const complaintDetails = data;

  return (
    <div className="mt-4">
      <div className="flex justify-end">
        <MyAccount />
      </div>
      <div
        className={isLoading ? "loading" : "flex items-center justify-between"}
      >
        <Header image={"drivercomplaint.png"} title={"Drivers Complaints"} />
      </div>

      <Table
        details={complaintDetails}
        headers={HEADERS}
        keys={KEYS}
        dbName={"drivercomplaints"}
      />
    </div>
  );
}

export default DriverComplaintsPage;
