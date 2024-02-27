import AddButton from "../../ui/AddButton";
import Header from "../../ui/Header";
import Search from "../../ui/Search";
import Table from "../../ui/Table";

function RoutePage() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <Header image={"ManageRoute.jpeg"} title={"Manage Routes"} />
        <div className="my-8 space-y-6">
          <AddButton name={"Add Route"} />
          <Search />
        </div>
      </div>
      <Table />
    </div>
  );
}

export default RoutePage;
