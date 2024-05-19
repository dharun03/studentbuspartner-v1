import { useState } from "react";
import AddButton from "../../ui/AddButton";
import Header from "../../ui/Header";
import Table from "../../ui/Table";
import StudentForm from "./StudentForm";
import { db } from "../../config/firebase";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";
import Loader from "../../ui/Loader";
import MyAccount from "../../ui/MyAccount";

const HEADERS = [
  "Name",
  "Student ID",
  "Year",
  "Phone No",
  "Allocated Bus No",
  "Pickup Point",
  "ACTIONS",
];
const KEYS = [
  "name",
  "studentid",
  "year",
  "phonenumber",
  "busno",
  "pickuppoint",
];

function StudentPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const itemsCol = collection(db, "users");
      const ItemSnapshot = await getDocs(itemsCol);
      const itemList = ItemSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      return itemList;
    },
  });

  const StudentsList = data;
  console.log(StudentsList);

  if (isLoading) return <Loader />;

  return (
    <div className="mt-4">
      <div className="flex justify-end">
        <MyAccount />
      </div>
      <div className={"flex items-center justify-between"}>
        <Header image={"student.png"} title={"Manage Students"} />
        <div className="my-8 space-y-6">
          <AddButton
            name={"Add Students"}
            onClick={() => setIsFormOpen(true)}
          />
        </div>
      </div>
      {isFormOpen ? (
        <StudentForm isFormOpen={isFormOpen} setIsFormOpen={setIsFormOpen} />
      ) : (
        ""
      )}
      <Table
        details={StudentsList}
        headers={HEADERS}
        keys={KEYS}
        dbName={"users"}
      />
    </div>
  );
}

//eslint-disable-next-line
// export async function studentListLoader() {
//   const StudentsList = getItems(db, "users");
//   return StudentsList;
// }

export default StudentPage;
