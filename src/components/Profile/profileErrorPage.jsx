import { Link } from "react-router-dom";
import ErrorComponent from "../ErrorComponent";
export default function ProfileError(error) {
  //   const error = useRouteError();

  return (
    <div className="px-8 py-8">
      <h2 className="text-red-500 font-bold text-4xl">Error</h2>
      <ErrorComponent error={error}></ErrorComponent>
      <Link to="/" className="text-accentColor text-3xl">
        Back to the Homepage
      </Link>
    </div>
  );
}
