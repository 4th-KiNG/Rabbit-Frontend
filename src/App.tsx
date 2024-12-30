import { Route, Routes } from "react-router-dom";
import { useProfile } from "./lib/hooks/useProfile";
import {
  AuthPage,
  NotificationPage,
  PostsPage,
  ProfilePage,
  SettingsPage,
  SubscribersPage,
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
      </Routes>
    </Layout>
  );
}

export default App;
