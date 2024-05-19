import { useState } from "react";

function ColumnFilter({ headers, keys, onColumnToggle }) {
  const [isOpen, setIsOpen] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState(() => {
    const initialVisibleColumns = {};
    keys.forEach((key) => {
      initialVisibleColumns[key] = true;
    });
    return initialVisibleColumns;
  });

  const toggleColumn = (key) => {
    const updatedColumns = { ...visibleColumns };
    updatedColumns[key] = !updatedColumns[key];
    setVisibleColumns(updatedColumns);
    onColumnToggle(updatedColumns);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
          id="options-menu"
          onClick={() => setIsOpen(!isOpen)}
          aria-haspopup="true"
          aria-expanded="true"
        >
          Filter
          {/* Heroicon name: solid/chevron-down */}
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10 12l-4-4H5a1 1 0 00-1 1v2a1 1 0 001 1h1l4 4 4-4h1a1 1 0 001-1v-2a1 1 0 00-1-1h-1l-4 4z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div className="py-1" role="none">
            {keys.map((key, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="checkbox"
                  checked={visibleColumns[key]}
                  onChange={() => toggleColumn(key)}
                  className="mr-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor={key} className="font-medium text-gray-700">
                  {headers[index]}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ColumnFilter;