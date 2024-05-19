import { useEffect, useState } from "react";
import Card from "./Card";
import { collection, getCountFromServer } from "firebase/firestore";
import { db } from "../config/firebase";
import { useLoaderData } from "react-router-dom";

const count = {
  studCount: 0,
  busCount: 0,
  driverCount: 0,
  routeCount: 0,
  studentQueriesCount: 0,
  driverQueriesCount: 0,
};

function CardContainer() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchCount() {
      try {
        setIsLoading(true);
        const studData = collection(db, "users");
        const sc = await getCountFromServer(studData);
        count.studCount = sc.data().count;
        const busData = collection(db, "buses");
        const bc = await getCountFromServer(busData);
        count.busCount = bc.data().count;
        const driverData = collection(db, "drivers");
        const dc = await getCountFromServer(driverData);
        count.driverCount = dc.data().count;
        const routeData = collection(db, "routes");
        const rc = await getCountFromServer(routeData);
        count.routeCount = rc.data().count;
        const StudentQueryData = collection(db, "complaints");
        const sqc = await getCountFromServer(StudentQueryData);
        count.studentQueriesCount = sqc.data().count;
        const DriverQueryData = collection(db, "drivercomplaints");
        const dqc = await getCountFromServer(DriverQueryData);
        count.driverQueriesCount = dqc.data().count;
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCount();
  }, []);

  return (
    <div className="mb-4 grid grid-cols-1 gap-4 px-7 lg:grid-cols-4 lg:gap-9">
      <Card
        title={"Students"}
        number={count.studCount}
        color={"bg-blue-500"}
        to={"/manageStudents"}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          color="white"
          viewBox="0 0 16 16"
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M14.25 9.25V6L8 2.75L1.75 6L8 9.25l3.25-1.5v3.5c0 1-1.5 2-3.25 2s-3.25-1-3.25-2v-3.5"
          />
        </svg>
      </Card>
      <Card
        title={"Buses"}
        number={count.busCount}
        color={"bg-rose-500"}
        to={"/manageBuses"}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          color="white"
          viewBox="0 0 24 24"
        >
          <g
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          >
            <path d="M8 6v6m7-6v6M2 12h19.6M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2c0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3" />
            <circle cx="7" cy="18" r="2" />
            <path d="M9 18h5" />
            <circle cx="16" cy="18" r="2" />
          </g>
        </svg>
      </Card>
      <Card
        title={"Routes"}
        number={count.routeCount}
        color={"bg-orange-400"}
        to={"/manageRoutes"}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          color="white"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 19a2 2 0 1 0 4 0a2 2 0 0 0-4 0M19 7a2 2 0 1 0 0-4a2 2 0 0 0 0 4m-8 12h5.5a3.5 3.5 0 0 0 0-7h-8a3.5 3.5 0 0 1 0-7H13"
          />
        </svg>
      </Card>
      <Card
        title={"Drivers"}
        number={count.driverCount}
        color={"bg-gray-950"}
        to={"/manageDrivers"}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-steering-wheel"
          viewBox="0 0 24 24"
          width="40"
          height="40"
          strokeWidth="2"
          stroke="#ffffff"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
          <path d="M12 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
          <path d="M12 14l0 7" />
          <path d="M10 12l-6.75 -2" />
          <path d="M14 12l6.75 -2" />
        </svg>
      </Card>
      <Card
        title={"Driver Complaints"}
        number={count.driverQueriesCount}
        color={"bg-lime-500"}
        to={"/driverComplaints"}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-message-pin"
          width="40"
          height="40"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="#ffffff"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M8 9h8" />
          <path d="M8 13h6" />
          <path d="M12.007 18.596l-4.007 2.404v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v4.5" />
          <path d="M21.121 20.121a3 3 0 1 0 -4.242 0c.418 .419 1.125 1.045 2.121 1.879c1.051 -.89 1.759 -1.516 2.121 -1.879z" />
          <path d="M19 18v.01" />
        </svg>
      </Card>
      <Card
        title={"Student Complaints"}
        number={count.studentQueriesCount}
        color={"bg-emerald-500"}
        to={"/studentComplaints"}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-message-exclamation"
          width="40"
          height="40"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="#ffffff"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M8 9h8" />
          <path d="M8 13h6" />
          <path d="M15 18h-2l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v5.5" />
          <path d="M19 16v3" />
          <path d="M19 22v.01" />
        </svg>
      </Card>
    </div>
  );
}

export default CardContainer;
