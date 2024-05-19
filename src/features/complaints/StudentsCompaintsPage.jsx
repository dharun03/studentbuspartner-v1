import Header from "../../ui/Header";
import Table from "../../ui/Table";
import { db } from "../../config/firebase";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";
import Loader from "../../ui/Loader";
import MyAccount from "../../ui/MyAccount";

const HEADERS = [
  "CID",
  "Description",
  "Student Name",
  "Student ID",
  "Route No",
  "ACTIONS",
];
const KEYS = ["cid", "description", "name", "studentid", "busno"];

function StudentsCompaintsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["complaints"],
    queryFn: async () => {
      const itemsCol = collection(db, "complaints");
      const ItemSnapshot = await getDocs(itemsCol);
      const itemList = ItemSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      return itemList;
    },
  });

  console.log(data);
  const complaintDetails = data;

  if (isLoading) return <Loader />;

  return (
    <div className="mt-4">
      <div className="flex justify-end">
        <MyAccount />
      </div>
      <div
        className={isLoading ? "loading" : "flex items-center justify-between"}
      >
        <Header image={"drivercomplaint.png"} title={"Student Complaints"} />
      </div>

      <Table
        details={complaintDetails}
        headers={HEADERS}
        keys={KEYS}
        dbName={"complaints"}
      />
    </div>
  );
}

export default StudentsCompaintsPage;
