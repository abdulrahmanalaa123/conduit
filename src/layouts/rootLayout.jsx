import { useEffect } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import axiosInterface from "../helpers/axios";
import { logout } from "../api/authenticationApi";

function RootLayout() {
  const navigate = useNavigate();
  // setting up a register navigation once starting the app since this is the first page
  useEffect(() => {
    axiosInterface.setupNavigationInterceptor(navigate);
  }, []);
  return (
    <>
      <header>
        <nav className="flex h-16 bg-slate-700 justify-between items-center px-8 flex-wrap">
          <p className="text-accentColor font-bold text-2xl">Conduit</p>
          <ul className="flex flex-row gap-4 text-black">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-red-500 font-bold" : ""
              }
            >
              Home
            </NavLink>
            <NavLink
              to="login"
              className={({ isActive }) =>
                isActive ? "text-red-500 font-bold" : ""
              }
            >
              SignIn
            </NavLink>
            <NavLink
              to="register"
              className={({ isActive }) =>
                isActive ? "text-red-500 font-bold" : ""
              }
            >
              SignUp
            </NavLink>
            <button
              className=" rounded-full px-4  bg-red-50  "
              onClick={() => logout()}
            >
              Logout
            </button>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
