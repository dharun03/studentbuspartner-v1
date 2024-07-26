import { useState } from "react";
import DeleteModal from "./DeleteModal";
import MapModal from "../features/map/MapPage";
import Search from "./Search";
import ImageModal from "./ImageModal";
import { MdEdit } from "react-icons/md";

import StudentForm from "../features/student/StudentForm";
import DriverForm from "../features/driver/DriverForm";

function Table({ details, headers, keys, dbName }) {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [id, setId] = useState("");
  const [isMapModalOpen, setMapModalOpen] = useState(false);
  const [isImageModalOpen, setImageModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editRow, setEditRow] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [imgUrl, setImageUrl] = useState("");

  const [visibleColumns, setVisibleColumns] = useState(() => {
    const initialVisibleColumns = {};
    keys.forEach((key) => {
      initialVisibleColumns[key] = true;
    });
    return initialVisibleColumns;
  });
  const [selectedBus, setSelectedBus] = useState(null);
  const itemsPerPage = 30;

  const handleEdit = () => {
    // setIsEditModalOpen(true);
    if (dbName === "users") {
      return (
        <StudentForm
          isFormOpen={true}
          setIsFormOpen={setIsEditModalOpen}
          isEditSession={true}
          editRow={editRow}
        />
      );
    } else if (dbName === "drivers") {
      return (
        <DriverForm isFormOpen={true} setIsFormOpen={setIsEditModalOpen} />
      );
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filteredDetails = details.filter((row) =>
    keys.some((key) =>
      (row[key]?.toString() || "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase()),
    ),
  );

  const totalPages = Math.ceil(filteredDetails.length / itemsPerPage);

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredDetails.slice(startIndex, endIndex);
  };

  if (!details || !headers) return null;

  const renderRows = () => {
    return getCurrentPageData().map((row, index) => (
      <tr key={index}>
        {keys.map((key, i) => (
          <td
            className="whitespace-nowrap bg-white px-4 py-3 text-center text-xs text-gray-900"
            key={i}
          >
            {key === "buses" ? row[key].join(", ") : row[key]}
          </td>
        ))}

        <td className="flex justify-center gap-3 bg-white pt-1.5 text-center">
          {dbName === "buses" && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="transition-all duration-75 hover:scale-125"
              onClick={() => {
                setSelectedBus(row);
                setMapModalOpen(true);
              }}
              style={{ cursor: "pointer" }}
            >
              <path
                fill="currentColor"
                d="m15 21l-6-2.1l-6 2.325V5.05L9 3l6 2.1l6-2.325V18.95zm-1-2.45V6.85l-4-1.4v11.7z"
              />
            </svg>
          )}
          {dbName === "complaints" && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              width="24"
              height="24"
              stroke="#6d28d9"
              className={`${!row.imgUrl ? "transition-all duration-75 hover:scale-125" : "grayscale"}`}
              cursor={`${!row.imgUrl ? "pointer" : "not-allowed"}`}
              onClick={() => {
                setImageModalOpen(true);
                setImageUrl(row.imgurl);
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
          )}
          {(dbName === "users" ||
            dbName === "drivers" ||
            dbName == "routes") && (
            <MdEdit
              cursor="pointer"
              size={24}
              className="transition-all duration-75 hover:scale-125"
              color="#60a5fa"
              onClick={() => {
                setIsEditModalOpen(true);
                setEditRow(row);
              }}
            />
          )}

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            className="transition-all duration-75 hover:scale-125"
            stroke="#ef4444"
            cursor="pointer"
            onClick={() => {
              setId(row.id);
              setDeleteModalOpen(true);
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </td>
      </tr>
    ));
  };

  return (
    <>
      {dbName === "attendance" ? (
        <div className="ml-5 flex items-center justify-between">
          <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </div>
      ) : (
        <div className="mb-4 mr-5 flex justify-end">
          <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </div>
      )}

      {/* <ColumnFilter
          headers={headers}
          keys={keys}
          onColumnToggle={handleColumnToggle}
        /> */}

      <div className="mx-5 my-10 rounded-lg border border-gray-200 shadow-md">
        {isDeleteModalOpen && (
          <DeleteModal
            isOpen={isDeleteModalOpen}
            setIsOpen={setDeleteModalOpen}
            dbName={dbName}
            id={id}
          />
        )}
        {isMapModalOpen && (
          <MapModal
            isOpen={isMapModalOpen}
            onClose={() => setMapModalOpen(false)}
            details={[selectedBus]} // Pass the selected bus as an array to MapModal
          />
        )}
        {isImageModalOpen && (
          <ImageModal
            isOpen={isImageModalOpen}
            onClose={() => setImageModalOpen(false)}
            imgUrl={imgUrl}
          />
        )}

        {isEditModalOpen && handleEdit()}

        <div className="overflow-x-auto overflow-y-auto rounded-t-lg">
          <table className=" max-h-56 min-w-full  divide-y-2 divide-gray-200 text-sm">
            <thead className="bg-slate-200 ltr:text-left rtl:text-right">
              <tr>
                {headers.map((header, i) => (
                  <th
                    className="whitespace-nowrap px-4 py-2 font-medium uppercase text-gray-900"
                    key={i}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">{renderRows()}</tbody>
          </table>
          <div className="rounded-b-lg border-t border-gray-200 bg-white px-4 py-2">
            <ol className="flex justify-end gap-1 text-xs font-medium">
              <li>
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`inline-flex items-center justify-center rounded-lg border border-gray-100 bg-white text-gray-900 rtl:rotate-180 ${
                    currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
                  }`}
                  style={{ width: "2rem", height: "2rem", minWidth: "2rem" }}
                >
                  <span className="sr-only">Prev Page</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 text-blue-600 ${
                      currentPage === 1 ? "text-gray-400" : "text-blue-600"
                    }`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </li>

              {Array.from({ length: totalPages }, (_, index) => index + 1)
                .slice(currentPage - 1, currentPage + 2)
                .map((pageNumber) => (
                  <li key={pageNumber}>
                    <button
                      onClick={() => handlePageChange(pageNumber)}
                      className={`bg-blue block size-8 rounded-lg border border-gray-100 text-center leading-8 text-gray-900 ${
                        pageNumber === currentPage
                          ? "bg-blue-600 text-white"
                          : ""
                      }`}
                      style={{
                        width: "2rem",
                        height: "2rem",
                        minWidth: "2rem",
                      }}
                    >
                      {pageNumber}
                    </button>
                  </li>
                ))}

              <li>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`inline-flex items-center justify-center rounded-lg border border-gray-100 bg-white text-gray-900 ${
                    currentPage === totalPages
                      ? "cursor-not-allowed opacity-50"
                      : ""
                  }`}
                  style={{ width: "2rem", height: "2rem", minWidth: "2rem" }}
                >
                  <span className="sr-only">Next Page</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 text-blue-600 ${
                      currentPage === totalPages
                        ? "text-gray-400"
                        : "text-blue-600"
                    }`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10l-3.293-3.293a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </>
  );
}

export default Table;
