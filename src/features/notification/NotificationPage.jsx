import { useState } from "react";
import AddButton from "../../ui/AddButton";
import Header from "../../ui/Header";
import NotificationForm from "./NotificationForm";
import Table from "../../ui/Table";
import { db } from "../../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../ui/Loader";
import MyAccount from "../../ui/MyAccount";

const HEADERS = ["S.No", "Title", "Description", "Date", "Time", "Actions"];
const KEYS = ["title", "description", "date", "time"];

function NotificationPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const itemsCol = collection(db, "notifications");
      const ItemSnapshot = await getDocs(itemsCol);
      const itemList = ItemSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      return itemList;
    },
  });

  console.log(data);
  const notificationDetails = data;

  if (isLoading) return <Loader />;

  return (
    <div className="mt-4">
      <div className="flex justify-end">
        <MyAccount />
      </div>
      <div className="flex items-center justify-between">
        <Header image={"notifications.png"} title={"Notification"} />
        <div className="my-8 space-y-6">
          <AddButton
            name={"Add Notification"}
            onClick={() => setIsFormOpen(true)}
          />
        </div>
      </div>

      {isFormOpen ? (
        <NotificationForm
          isFormOpen={isFormOpen}
          setIsFormOpen={setIsFormOpen}
        />
      ) : (
        ""
      )}

      <Table
        details={notificationDetails}
        headers={HEADERS}
        keys={KEYS}
        dbName={"notifications"}
      />
    </div>
  );
}

export default NotificationPage;
