import { Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import HomePage from "./pages/Home";
import RequireAuth from "./layouts/RequireAuth";
import ProfilePage from "./pages/Profile.tsx";
import OAuthPage from "./pages/OAuth.tsx";
import ChangePasswordPage from "./pages/ChangePassword.tsx";
import VerificationPage from "./pages/Verification.tsx";
import AuthPage from "./pages/Auth.tsx";
import GetPasswordToken from "./components/form/resetPassword/GetPasswordToken.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import CreateCompanyPage from "./pages/CreateCompany.tsx";
import CompanyDetailsPage from "./pages/CompanyDetails.tsx";
import CreateProjectPage from "./pages/CreateProject.tsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route index element={<HomePage />} />
        <Route path="OAuth" element={<OAuthPage />} />
        <Route path="verification" element={<VerificationPage />} />
        <Route path="auth" element={<AuthPage />} />
        <Route path="resetPassword" element={<GetPasswordToken />} />

        {/* protected routes */}
        <Route element={<RequireAuth />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="companyDetails/:id" element={<CompanyDetailsPage/>} />
          <Route path="createCompany" element={<CreateCompanyPage />} />
          <Route path="createProject/:id" element={<CreateProjectPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="changePassword" element={<ChangePasswordPage />} />
        </Route>
      </Route>
    </Routes>
  );
}