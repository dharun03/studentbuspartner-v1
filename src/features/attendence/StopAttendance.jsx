import { useState } from "react";
import AddButton from "../../ui/AddButton";
import Header from "../../ui/Header";
import Table from "../../ui/Table";
import { useLoaderData } from "react-router-dom";

import { db } from "../../config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useQuery } from "@tanstack/react-query";
import Calendar from "react-calendar"; // Importing the Calendar component from react-calendar
import "react-calendar/dist/Calendar.css"; // Importing the default CSS styles for the calendar
import MyAccount from "../../ui/MyAccount";
import Loader from "../../ui/Loader";
import { SelectInput } from "../../ui/Input";

const HEADERS = ["Stops", "Count", "Actions"]; // Fixing the header typo
const KEYS = ["stop", "count"];

function AttendencePage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date()); // State to store the selected date
  const [matchedDocument, setMatchedDocument] = useState(null);
  const [attendanceType, setAttendanceType] = useState(""); // State to store the matched document for the selected date

  const { data: stopList, isLoading } = useQuery({
    queryKey: ["stopattendance"],
    queryFn: async () => {
      const itemsCol = collection(db, "stopattendance");
      const ItemSnapshot = await getDocs(itemsCol);
      const itemList = ItemSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return itemList;
    },
  });

  if (isLoading) return <Loader />;
  if (!stopList) return null;

  // Function to handle date change
  const handleDateChange = (date) => {
    setSelectedDate(date); // Update the selected date state
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Month starts from 0
    const day = date.getDate();
    const formattedDate = `${year}-${month}-${day}`;
    console.log("Selected Date:", formattedDate); // Print the selected date
    const matchedDocument = stopList.find((item) => item.id === formattedDate);
    if (matchedDocument) {
      console.log(true); // Print true if document name matches the selected date
      setMatchedDocument(matchedDocument);
    } else {
      console.log(false); // Print false if no match found
      setMatchedDocument(null);
    }
  };

  // Rendered table data based on the matched document
  const renderedData = matchedDocument
    ? Object.keys(matchedDocument)
        .filter((key) => key !== "id" && key !== "totalcount") // Exclude "id" and "totalcount" keys
        .map((key) => ({ stop: key, count: matchedDocument[key] }))
    : [];

  return (
    <div className="mt-4">
      <div className="flex justify-end">
        <MyAccount />
      </div>
      <div className="flex items-center justify-between">
        <Header image={"bus.png"} title={"Stop Attendance"} />
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
              dbName={"stopattendance"}
            />
          ) : (
            <div className="flex items-center justify-center">
              <p>No Data Found</p>
            </div>
          )}
        </div>
        <div className="mr-4 w-1/4">
          {/* Render the calendar component here */}
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
