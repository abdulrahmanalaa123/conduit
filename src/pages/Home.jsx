import axiosInterface from "../helpers/axios";

function Home() {
  async function unauthorized() {
    await axiosInterface.authorizedInterface.get("/user");
  }
  return (
    <div>
      Home
      <button
        className="bg-red-500 rounder-full px-4 py-8"
        onClick={unauthorized}
      >
        Testing
      </button>
    </div>
  );
}

export default Home;
