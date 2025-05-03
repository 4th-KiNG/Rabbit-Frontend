import { Route, Routes } from "react-router-dom";
import { useProfile } from "./lib/hooks/useProfile";
import {
  AuthPage,
  PostPage,
  PostsPage,
  ProfilePage,
  SettingsPage,
  SubscribersPage,
  UserPage,
} from "./pages";
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
        <Route path="/subscribers" element={<SubscribersPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/user/:id" element={<UserPage />} />
        <Route path="/post/:id" element={<PostPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
