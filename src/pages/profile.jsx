import { useParams } from "react-router-dom";
import { getProfile } from "../api/profileApi";
import { useQuery } from "@tanstack/react-query";
import ProfileError from "../components/Profile/profileErrorPage";

const profileQuery = (username) => ({
  queryKey: ["profile", username],
  queryFn: () => getProfile(username),
});

function Profile() {
  const params = useParams();
  console.log(params);
  const {
    data: dataObject,
    isLoading,
    isError,
    error,
  } = useQuery(profileQuery(params.username));
  console.log(dataObject);
  if (isError) {
    return <ProfileError error={error}></ProfileError>;
  }

  return (
    <div className="bg-slate-400 p-8 mb-8 shadow-inner flex flex-col items-center  shadow-black">
      <img
        src={dataObject.data.profile.image}
        alt="big-profile-picture"
        className="w-24 rounded-full"
      />
      <p className="text-2xl mt-2">{params.username}</p>
    </div>
  );
}

// const profileArticlesQuery

export const loader =
  (queryClient) =>
  async ({ params }) => {
    const query = profileQuery(params.username);
    return await queryClient.ensureQueryData(query);
  };
export default Profile;
