import { NavLink } from "react-router-dom";

function Card({ title, number, color, children, to }) {
  return (
    <NavLink to={to}>
      <div className="bg-white-100 flex h-24 w-auto items-center gap-4  rounded-lg border border-gray-100  p-6 shadow-md drop-shadow-sm  sm:justify-between">
        <span className={`sm:order rounded-xl ${color} p-3 text-blue-600`}>
          {children}
        </span>
        <div className="space-y-1">
          <p className="text-md text-right  font-semibold text-gray-400 hover:decoration-solid">
            {title}
          </p>
          <p className="text-right text-3xl font-medium text-gray-900">
            {number}
          </p>
        </div>
      </div>
    </NavLink>
  );
}

export default Card;
