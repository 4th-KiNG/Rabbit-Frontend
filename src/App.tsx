import { Route, Routes } from "react-router-dom";
import { useProfile } from "./lib/hooks/useProfile";
import { AuthPage, PostsPage, ProfilePage } from "./pages";
import { Layout } from "./share";

function App() {
  const { user } = useProfile();
  if (!user) {
    return <AuthPage />;
  }
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<PostsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Layout>
  );
}

export default App;
