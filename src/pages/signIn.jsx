import { Link } from "react-router-dom";

function SignIn() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-4 p-8 ">
      <p className="text-slate-500 text-3xl font-bold">SignIn</p>
      <Link to="/register" className="text-red-500 hover:underline">
        Need an Account?
      </Link>
      <form action="register " className="flex flex-col gap-4 w-[30%] h-52">
        <input
          type="text"
          placeholder="Email"
          className="border-2 border-red-500 flex-auto rounded-md px-4"
        />
        <input
          type="password"
          placeholder="Password"
          className="border-2 border-red-500 flex-auto rounded-md px-4"
        />
        <button className="self-end text-xl bg-red-500 text-slate-500 font-bold px-6 py-3 rounded-md">
          SignIn
        </button>
      </form>
    </div>
  );
}

export default SignIn;
