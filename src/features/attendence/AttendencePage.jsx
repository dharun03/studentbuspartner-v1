import { useState } from "react";
import AddButton from "../../ui/AddButton";
import Header from "../../ui/Header";
import Table from "../../ui/Table";
import { useLoaderData } from "react-router-dom";

import { db } from "../../config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useQuery } from "@tanstack/react-query";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import MyAccount from "../../ui/MyAccount";
import Loader from "../../ui/Loader";
import { SelectInput } from "../../ui/Input";

const HEADERS = ["S.No", "Bus", "Count"]; // Fixing the header typo
const KEYS = ["bus", "count"];

function AttendencePage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [matchedDocument, setMatchedDocument] = useState(null);

  const { data: busList, isLoading } = useQuery({
    queryKey: ["attendance"],
    queryFn: async () => {
      const itemsCol = collection(db, "attendance");
      const ItemSnapshot = await getDocs(itemsCol);
      const itemList = ItemSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return itemList;
    },
  });

  if (isLoading) return <Loader />;
  if (!busList) return null;

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const formattedDate = `${year}-${month}-${day}`;
    console.log("Selected Date:", formattedDate);
    const matchedDocument = busList.find((item) => item.id === formattedDate);
    if (matchedDocument) {
      console.log(true);
      setMatchedDocument(matchedDocument);
    } else {
      console.log(false);
      setMatchedDocument(null);
    }
  };

  const renderedData = matchedDocument
    ? Object.keys(matchedDocument)
        .filter((key) => key !== "id" && key !== "totalcount")
        .map((key) => ({ bus: key, count: matchedDocument[key] }))
    : [];

  return (
    <div className="mt-4">
      <div className="flex justify-end">
        <MyAccount />
      </div>
      <div className="flex items-center justify-between">
        <Header image={"bus.png"} title={"Attendance"} />
        {/* <SelectInput
          options={["Bus Attendance", "Stop Attendance"]}
          title={"Select Type"}
          className={"w-auto"}
        /> */}
      </div>
      <div className="flex">
        <div
          className={`w-3/4 pr-4 ${renderedData.length < 1 ? "flex items-center justify-center" : ""}`}
        >
          {renderedData.length > 0 ? (
            <Table
              details={renderedData}
              headers={HEADERS}
              keys={KEYS}
              dbName={"attendance"}
            />
          ) : (
            <div className="flex items-center justify-center">
              <p>No Data Found</p>
            </div>
          )}
        </div>
        <div className="mr-4 w-1/4">
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            className="mb-3 rounded-lg border-none shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}

export default AttendencePage;
