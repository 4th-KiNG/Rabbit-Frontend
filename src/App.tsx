import { useProfile } from "./lib/hooks/useProfile";
import { AuthPage, ProfilePage } from "./pages";
import { Layout } from "./share";

function App() {
  const { user } = useProfile();
  //if (!user) {
  //  return <AuthPage />;
  //}
  return (
    <Layout>
      <ProfilePage />
    </Layout>
  );
}

export default App;
