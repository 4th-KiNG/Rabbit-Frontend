import { useProfile } from "../../lib/hooks/useProfile";

const ProfilePage = () => {
  const { user } = useProfile();

  return (
    <>
      <div>
        <p>{user?.username}</p>
      </div>
    </>
  );
};

export default ProfilePage;
