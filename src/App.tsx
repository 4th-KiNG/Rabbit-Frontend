import { Route, Routes } from "react-router-dom";
import { useProfile } from "./lib/hooks/useProfile";
import {
  AuthPage,
  NotificationPage,
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
        <Route path="/notifications" element={<NotificationPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/user/:id" element={<UserPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
