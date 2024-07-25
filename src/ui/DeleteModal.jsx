import { useMutation, useQueryClient } from "@tanstack/react-query";
import { db, auth } from "../config/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import toast from "react-hot-toast";
import { deleteUser } from "firebase/auth";
// import { adminAuth } from "../config/adminFirebase";

function DeleteModal({ isOpen, setIsOpen, dbName, id }) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const docRef = await doc(db, dbName, id);
      if (dbName == "users") {
        // await console.log(docRef);
        // try {
        //   await deleteUser(adminAuth, id);
        // } catch (err) {
        //   console.log(err);
        // }
      }
      await deleteDoc(docRef);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [dbName] });
      toast.success("Deleted Successfully");
    },
    onError: () => {
      toast.error("Could not delete");
    },
  });

  return (
    <div className="fixed inset-0  z-50 flex items-center justify-center bg-black bg-opacity-50 ">
      <div className=" z-50 rounded-md bg-white p-8 shadow-md">
        <div className="flex items-center gap-4 ">
          <span className="shrink-0 rounded-full bg-red-500 p-2 text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-4 w-4"
            >
              <path
                fillRule="evenodd"
                d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                clipRule="evenodd"
              />
            </svg>
          </span>

          <p className="font-medium sm:text-lg">Delete Message</p>
        </div>

        <p className="mt-4 text-gray-500">Do you want to delete ?</p>

        <div className="mt-6 sm:flex sm:gap-4">
          <button
            className="inline-block w-full rounded-lg bg-red-600 px-5 py-3 text-center text-sm font-semibold text-white sm:w-auto"
            onClick={() => {
              mutate();
              setIsOpen(false);
              console.log(id);
            }}
          >
            Delete
          </button>

          <button
            className="mt-2 inline-block w-full rounded-lg bg-gray-50 px-5 py-3 text-center text-sm font-semibold text-gray-500 sm:mt-0 sm:w-auto"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
