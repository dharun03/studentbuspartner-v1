import { useEffect, useState } from "react";
import AddButton from "../../ui/AddButton";
import Header from "../../ui/Header";
import Search from "../../ui/Search";
import Table from "../../ui/Table";
import StudentForm from "./StudentForm";
import db from "../../config/firebase";
import { getItems } from "../../helper/firebaseFunctions";

const HEADERS = [
  "Name",
  "Student ID",
  "Mail ID",
  "Phone No",
  "Pickup Point",
  "ACTIONS",
];
const KEYS = ["name", "studentid", "mailid", "phonenumber", "pickuppoint"];

function StudentPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const [details, setDetails] = useState([]);

  useEffect(() => {
    const StudentsList = getItems(db, "users");
    StudentsList.then((data) => setDetails(data));
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between">
        <Header image={"ManageStudents.jpeg"} title={"Manage Students"} />
        <div className="my-8 space-y-6">
          <AddButton
            name={"Add Students"}
            onClick={() => setIsFormOpen(true)}
          />
          <Search />
        </div>
      </div>
      {isFormOpen ? (
        <StudentForm isFormOpen={isFormOpen} setIsFormOpen={setIsFormOpen} />
      ) : (
        ""
      )}
      <Table details={details} headers={HEADERS} keys={KEYS} />

      {}
    </div>
  );
}

export default StudentPage;
