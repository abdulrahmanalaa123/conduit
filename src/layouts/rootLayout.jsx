import { useEffect } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { setupNavigationInterceptor } from "../lib/axios";
import { logout } from "../api/authenticationApi";
import useAuthStore from "../stores/auth";

function RootLayout() {
  const navigate = useNavigate();
  const logged = useAuthStore((state) => state.identification);
  // setting up a register navigation once starting the app since this is the first page
  useEffect(() => {
    setupNavigationInterceptor(navigate);
  }, []);
  return (
    <>
      <header>
        <nav className=" bg-slate-700 ">
          <div className="flex py-6 justify-between items-center px-8 flex-wrap w-[70%] mx-auto">
            <p className="text-accentColor font-bold text-2xl">conduit</p>
            <ul className="flex flex-row gap-4 text-black flex-wrap">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "text-accentColor font-bold" : ""
                }
              >
                Home
              </NavLink>
              <NavLink
                to="login"
                className={({ isActive }) =>
                  isActive ? "text-accentColor font-bold" : ""
                }
              >
                SignIn
              </NavLink>
              <NavLink
                to="register"
                className={({ isActive }) =>
                  isActive ? "text-accentColor font-bold" : ""
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
          </div>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
