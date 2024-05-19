import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getAuthenticate } from "../../helper/firebaseFunctions";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../ui/Loader";

function Login() {
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("123456");

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (email && password) login(email, password);
  }

  useEffect(
    function () {
      if (isAuthenticated) navigate("/dashboard", { replace: true });
    },
    [isAuthenticated, navigate],
  );

  return (
    <section className="relative flex flex-wrap lg:h-screen lg:items-center">
      <div className="relative flex h-64 w-full flex-col items-center justify-center gap-4 bg-zinc-900 sm:h-96 lg:h-full lg:w-1/2">
        <img
          src="/images/buspicture.png"
          alt=""
          className="h-[300px] w-[400px]"
        />
        <div className="flex items-center gap-5 tracking-wide">
          <img src="/images/buslogo.png" alt="logo" />
          <h3 className="space-y-5 font-inter text-3xl text-white">
            <span className="mx-6">Student Bus Partner</span> <br />{" "}
            <span className="text-5xl font-extrabold">Administration</span>
          </h3>
        </div>
        <p className="mx-3 mt-8 text-lg tracking-wider text-white">
          Track, Ride, Arrive - Student Transit Simplified
        </p>
      </div>
      <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">Hi There!</h1>

          <p className="mt-4 text-gray-500">Please Login to your account.</p>
        </div>

        <form
          action="#"
          className="grow-1 mx-auto mb-0 mt-8 flex max-w-md flex-col space-y-4"
          onSubmit={handleSubmit}
        >
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>

            <div className="relative">
              <input
                type="email"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter email"
                defaultValue={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="size-4 text-gray-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                  />
                </svg>
              </span>
            </div>
          </div>

          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>

            <div className="relative">
              <input
                type="password"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter password"
                defaultValue={password}
              />

              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="size-4 text-gray-500"
                  onChange={(e) => setPassword(e.target.value)}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                  />
                </svg>
              </span>
            </div>
          </div>

          <div className="flex items-center">
            <button
              type="submit"
              className="block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
            >
              Log in
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Login;
