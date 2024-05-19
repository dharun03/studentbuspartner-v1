import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  getCountFromServer,
  getDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";

const count = {
  studCount: 0,
  busCount: 0,
  driverCount: 0,
  routeCount: 0,
  studentQueriesCount: 0,
  driverQueriesCount: 0,
};

async function getItems(db, col) {
  const itemsCol = collection(db, col);
  const ItemSnapshot = await getDocs(itemsCol);
  const itemList = ItemSnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  console.log(itemList);
  return itemList;
}

async function addItem(db, col, value) {
  const docRef = await addDoc(collection(db, col), value);
  console.log("Document written with ID: ", docRef.id);
}

async function deleteItem(db, col, id) {
  const docRef = await doc(db, col, id);
  await deleteDoc(docRef);
}

async function fetchCount(db) {
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
}

async function getRoutes() {
  const itemsCol = collection(db, "routes");
  const ItemSnapshot = await getDocs(itemsCol);
  const itemList = ItemSnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  console.log(itemList);

  const busList = itemList.map((bus) => {
    const len = Object.keys(bus).length - 1;
    let buses = [];

    for (let i = 1; i <= len; i++) {
      buses.push(bus[String(i)]);
    }

    return { ...bus, buses };
  });

  console.log();
  return busList;
}

async function getAuthenticate() {
  const authenticationDoc = await doc(db, "authentication");
  const authenticationSnapShot = getDocs(authenticationDoc);

  const itemList = await authenticationSnapShot.docs.map((doc) => ({
    ...doc.data(),
  }));

  console.log(itemList);
}

export {
  getItems,
  addItem,
  deleteItem,
  fetchCount,
  getRoutes,
  getAuthenticate,
};
