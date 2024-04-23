import { Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import RequireAuth from "./layouts/RequireAuth";
import Welcome from "./pages/Welcome";
import Profile from "./pages/Profile.tsx";

export default function AppRoutes() {
    return (
        <Routes>
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route index element={<Home />} />
  
          {/* protected routes */}
          <Route element={<RequireAuth />}>
            <Route path="welcome" element={<Welcome />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    );
}