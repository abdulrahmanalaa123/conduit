import { Link } from "react-router-dom";
import LoginObject from "../Models/LoginObject";
import { login } from "../api/authenticationApi";
import { useForm } from "react-hook-form";

function SignIn() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({ mode: onSubmit, reValidateMode: onSubmit });

  async function onSubmit(data) {
    const loginPayLoad = new LoginObject(data.email, data.password);
    try {
      await login(loginPayLoad);
    } catch (error) {
      setError("root", {
        message: "Invalid Email or Password",
      });
    }
  }

  //i couldve not used the login object but ill keep it for educational purposes i couldve named my email user.email and password
  // user.password in react hook form and wouldve achieved the same results
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-4 p-8 ">
      <p className="text-slate-500 text-3xl font-bold">SignIn</p>
      <Link to="/register" className="text-red-500 hover:underline">
        Need an Account?
      </Link>

      <form
        action="register "
        className="flex flex-col gap-4 w-[30%] "
        onSubmit={handleSubmit(onSubmit)}
      >
        {errors.root && <p className="text-red-500">{errors.root.message}</p>}
        {(errors.email?.type === "required" ||
          errors.password?.type == "required") && (
          <p className="text-red-500">
            Cant Leave Either email or Password Blank
          </p>
        )}
        {errors.email && errors.email.type !== "required" && (
          <p className="text-red-500">{errors.email.message}</p>
        )}
        {errors.password && errors.password.type !== "required" && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
        <input
          type="text"
          {...register("email", {
            required: true,
            validate: (value) => {
              if (!value.includes("@")) {
                return "emails must include @";
              }
              return true;
            },
          })}
          placeholder="Email"
          className="border-2 border-red-500 w-full rounded-md px-4 h-14"
        />
        <input
          type="password"
          {...register("password", {
            required: true,
            minLength: {
              value: 8,
              message: "Password must have at least 8 characters",
            },
          })}
          placeholder="Password"
          className="border-2 border-red-500 w-full rounded-md px-4 h-14"
        />

        <button
          disabled={isSubmitting}
          className="self-end text-xl disabled:bg-blue-500 bg-red-500 text-slate-500 font-bold px-6 py-3 rounded-md"
        >
          SignIn
        </button>
      </form>
    </div>
  );
}

export default SignIn;
