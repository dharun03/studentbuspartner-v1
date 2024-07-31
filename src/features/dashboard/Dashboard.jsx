import CardContainer from "../../ui/CardContainer";
import MyAccount from "../../ui/MyAccount";

function Dashboard() {
  return (
    <div className="mt-4">
      <div className="flex justify-end">
        <MyAccount />
      </div>
      <div className="mb-8 flex items-center gap-2 px-7">
        <>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-layout-dashboard"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="#000000"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4 4h6v8h-6z" />
            <path d="M4 16h6v4h-6z" />
            <path d="M14 12h6v8h-6z" />
            <path d="M14 4h6v4h-6z" />
          </svg>
          <h1 className=" text-3xl font-bold uppercase tracking-wider">
            Dashboard
          </h1>
        </>
      </div>
      <CardContainer />
    </div>
  );
}

export default Dashboard;
