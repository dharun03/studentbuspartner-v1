function TextInput({ title, name, value, onChange }) {
  return (
    <label
      htmlFor={title}
      className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
    >
      <input
        type="text"
        id={name}
        name={name}
        className="peer mx-1 w-96  border-none bg-transparent py-2 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
        placeholder={title}
        value={value}
        onChange={onChange}
        required
      />

      <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
        {title}
      </span>
    </label>
  );
}
function DateInput({ title, name, value, onChange }) {
  return (
    <label
      htmlFor={title}
      className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
    >
      <input
        type="date"
        id={name}
        name={name}
        className="peer mx-1 w-96  border-none bg-transparent py-2 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
        placeholder={title}
        value={value}
        onChange={onChange}
        required
      />

      <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
        {title}
      </span>
    </label>
  );
}
function TimeInput({ title, name, value, onChange }) {
  return (
    <label
      htmlFor={title}
      className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
    >
      <input
        type="time"
        id={name}
        name={name}
        className="peer mx-1 w-96  border-none bg-transparent py-2 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
        placeholder={title}
        value={value}
        onChange={onChange}
        required
      />

      <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
        {title}
      </span>
    </label>
  );
}

function UsernameInput() {
  return (
    <div className="relative">
      <label htmlFor="UserEmail" className="sr-only">
        {" "}
        Email{" "}
      </label>

      <input
        type="email"
        id="UserEmail"
        placeholder="email"
        className="w-full rounded-md border-gray-200 pe-10 shadow-sm sm:text-sm"
      />

      <span className="pointer-events-none absolute inset-y-0 end-0 grid w-10 place-content-center text-gray-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-4 w-4"
        >
          <path
            fillRule="evenodd"
            d="M5.404 14.596A6.5 6.5 0 1116.5 10a1.25 1.25 0 01-2.5 0 4 4 0 10-.571 2.06A2.75 2.75 0 0018 10a8 8 0 10-2.343 5.657.75.75 0 00-1.06-1.06 6.5 6.5 0 01-9.193 0zM10 7.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    </div>
  );
}
function SelectInput({ options, title, onChange, value, className }) {
  return (
    <label
      htmlFor={title}
      className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
    >
      <select
        id={title}
        name={title}
        className={`peer mx-1 w-96  border-none bg-transparent py-2 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 ${className}`}
        placeholder={title}
        value={value}
        onChange={onChange}
        required
      >
        {options.map((opt, i) => (
          <option value={opt} key={i}>
            {opt}
          </option>
        ))}
      </select>

      {/* <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
        {title}
      </span> */}
    </label>
  );
}

export { TextInput, DateInput, TimeInput, UsernameInput, SelectInput };
