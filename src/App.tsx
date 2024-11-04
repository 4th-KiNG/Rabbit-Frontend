import { useProfile } from "./lib/hooks/useProfile";
import { AuthPage, ProfilePage } from "./pages";

function App() {
  const { user } = useProfile();

  return (
    <div className="min-h-full relative">
      {user ? <ProfilePage /> : <AuthPage />}
    </div>
  );
}

export default App;
