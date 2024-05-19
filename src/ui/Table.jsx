function Table({ details, headers, keys }) {
  return (
    <div className="mx-5 my-10 rounded-lg border border-gray-200 shadow-md">
      <div className="overflow-x-auto rounded-t-lg">
        <table className="min-w-full divide-y-2 divide-gray-200  text-sm">
          <thead className="bg-slate-200 ltr:text-left rtl:text-right">
            <tr>
              {headers.map((header, i) => (
                <th
                  className="whitespace-nowrap px-4 py-2 font-medium text-gray-900"
                  key={i}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {details.map((row, i) => (
              <tr key={i}>
                {keys.map((key, i) => (
                  <td
                    className="font-sm whitespace-nowrap px-4 py-2 text-center text-gray-900 "
                    key={i}
                  >
                    {row[key]}
                  </td>
                ))}
                <td className="mt-1 flex justify-center gap-3 text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    style={{ cursor: "pointer" }}
                  >
                    <path
                      fill="currentColor"
                      d="m18.988 2.012l3 3L19.701 7.3l-3-3zM8 16h3l7.287-7.287l-3-3L8 13z"
                    />
                    <path
                      fill="currentColor"
                      d="M19 19H8.158c-.026 0-.053.01-.079.01c-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .896-2 2v14c0 1.104.897 2 2 2h14a2 2 0 0 0 2-2v-8.668l-2 2V19z"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    style={{ cursor: "pointer" }}
                  >
                    <path
                      fill="#e03131"
                      d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v10zM18 4h-2.5l-.71-.71c-.18-.18-.44-.29-.7-.29H9.91c-.26 0-.52.11-.7.29L8.5 4H6c-.55 0-1 .45-1 1s.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1z"
                    />
                  </svg>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
