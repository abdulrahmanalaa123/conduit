import { getProfile } from "../api/profile/getProfile";

const profileQuery = (username) => ({
  queryKey: ["profile", username],
  queryFn: () => getProfile(username),
});
export default profileQuery;
