import { useState } from "react";
import AddButton from "../../ui/AddButton";
import Header from "../../ui/Header";
import Search from "../../ui/Search";
import Table from "../../ui/Table";
import StudentForm from "./StudentForm";

function StudentPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);

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
      <Table />
    </div>
  );
}

export default StudentPage;
