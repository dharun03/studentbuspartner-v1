function TextInput({ title }) {
  return (
    <label
      htmlFor={title}
      className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
    >
      <input
        type="text"
        id={title}
        name={title}
        className="peer mx-1 w-96  border-none bg-transparent py-2 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
        placeholder={title}
      />

      <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
        {title}
      </span>
    </label>
  );
}

export default TextInput;
