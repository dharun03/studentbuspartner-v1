import AddButton from "../../ui/AddButton";
import Header from "../../ui/Header";
import Search from "../../ui/Search";
import Table from "../../ui/Table";

function DriverPage() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <Header image={"ManageDrivers.png"} title={"Manage Drivers"} />
        <div className="my-8 space-y-6">
          <AddButton name={"Add Drivers"} />
          <Search />
        </div>
      </div>
      <Table />
    </div>
  );
}

export default DriverPage;
