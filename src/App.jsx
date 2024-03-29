import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import SignIn from "./pages/signIn";
import SignUp from "./pages/signUp";
import Settings from "./pages/settings";
import Editor from "./pages/editor";
import Profile, { loader } from "./pages/profile";
import Article, { articlesLoader } from "./pages/article";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "./lib/queryClient";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />}></Route>
      <Route path="login" element={<SignIn />}></Route>
      <Route path="register" element={<SignUp />}></Route>
      <Route path="settings" element={<Settings />}></Route>
      <Route
        path="profile/:username"
        element={<Profile />}
        loader={loader(queryClient)}
      ></Route>
      <Route path="editor/:slug?" element={<Editor />}></Route>
      <Route
        path="article/:slug"
        element={<Article />}
        loader={articlesLoader(queryClient)}
      ></Route>
    </Route>
  )
);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}

export default App;
