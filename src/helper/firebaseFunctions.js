import { collection, getDocs } from "firebase/firestore/lite";

async function getItems(db, col) {
  const itemsCol = collection(db, col);
  const ItemSnapshot = await getDocs(itemsCol);
  const itemList = ItemSnapshot.docs.map((doc) => doc.data());
  return itemList;
}

export { getItems };
