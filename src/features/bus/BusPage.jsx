import { useState } from "react";
import AddButton from "../../ui/AddButton";
import Header from "../../ui/Header";
import Search from "../../ui/Search";
import Table from "../../ui/Table";
import BusForm from "./BusForm";

function BusPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between">
        <Header image={"ManageBus.png"} title={"Manage Buses"} />
        <div className="my-8 space-y-6">
          <AddButton name={"Add Buses"} onClick={() => setIsFormOpen(true)} />
          <Search />
        </div>
      </div>
      {isFormOpen ? (
        <BusForm isFormOpen={isFormOpen} setIsFormOpen={setIsFormOpen} />
      ) : (
        ""
      )}
      <Table />
    </div>
  );
}

export default BusPage;
