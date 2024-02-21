import { useEffect } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { setupNavigationInterceptor } from "../lib/axios";
import { logout } from "../api/authenticationApi";
import useAuthStore from "../stores/auth";

function createNavLinkStyle(isActive) {
  return `hover:text-accentColor font-bold    ${
    isActive ? "text-accentColor font-bold" : "text-slate-400"
  }`;
}

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
            <p
              className="text-accentColor font-bold text-2xl cursor-pointer"
              onClick={() => {
                navigate("/");
              }}
            >
              conduit
            </p>
            <ul className="flex flex-row items-center gap-4 text-black flex-wrap">
              <NavLink
                to="/"
                className={({ isActive }) => createNavLinkStyle(isActive)}
              >
                Home
              </NavLink>
              {!logged && (
                <>
                  <NavLink
                    to="login"
                    className={({ isActive }) => createNavLinkStyle(isActive)}
                  >
                    SignIn
                  </NavLink>
                  <NavLink
                    to="register"
                    className={({ isActive }) => createNavLinkStyle(isActive)}
                  >
                    SignUp
                  </NavLink>
                </>
              )}

              {logged && (
                <>
                  <NavLink
                    to="editor"
                    className={({ isActive }) => createNavLinkStyle(isActive)}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>
                    New Article
                  </NavLink>
                  <NavLink
                    to="settings"
                    className={({ isActive }) => createNavLinkStyle(isActive)}
                  >
                    Settings
                  </NavLink>
                  <NavLink
                    to={`profile/${logged.username}`}
                    className={({ isActive }) => createNavLinkStyle(isActive)}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <img
                      src={logged.image}
                      alt="profile-Picture"
                      className="rounded-full w-8 h-8 mr-2"
                    />
                    {logged.username}
                  </NavLink>
                  <button
                    className=" rounded-full px-4  bg-red-50  "
                    onClick={() => logout()}
                  >
                    Logout
                  </button>
                </>
              )}
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
