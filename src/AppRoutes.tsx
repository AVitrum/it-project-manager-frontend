import { Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import HomePage from "./pages/Home";
import RequireAuth from "./layouts/RequireAuth";
import GetPasswordToken from "./components/form/resetPassword/GetPasswordToken.tsx";
import Dashboard from "./pages/Company/Dashboard.tsx";
import CompanyMembersPage from "./pages/Company/CompanyMembers.tsx";
import ProjectPage from "./pages/Project/Project.tsx";
import CompanyDetailsPage from "./pages/Company/CompanyDetails.tsx";
import CompanyEditPage from "./pages/Company/CompanyEdit.tsx";
import MembersInfoPage from "./pages/Member/MembersInfo.tsx";
import CreateCompanyPage from "./pages/Company/CreateCompany.tsx";
import CreatePositionPage from "./pages/Position/CreatePosition.tsx";
import CreateProjectPage from "./pages/Project/CreateProject.tsx";
import OAuthPage from "./pages/Auth/OAuth.tsx";
import VerificationPage from "./pages/Auth/Verification.tsx";
import AuthPage from "./pages/Auth/Registration.tsx";
import ProfilePage from "./pages/Auth/Profile.tsx";
import ChangePasswordPage from "./pages/Auth/ChangePassword.tsx";
import UpdatePositionPage from "./pages/Position/UpdatePosition.tsx";
import TasksPage from "./pages/Task/Tasks.tsx";
import CreateTaskPage from "./pages/Task/CreateTask.tsx";
import ProjectPerformersPage from "./pages/Project/ProjectPerformers.tsx";
import UpdateProjectPage from "./pages/Project/UpdateProject.tsx";
import UpdateTaskPage from "./pages/Task/UpdateTask.tsx";
import DiagramPage from "./pages/Project/Diagram.tsx";
import AddTaskPerformerPage from "./pages/Task/AddTaskPerformer.tsx";
import LoginPage from "./pages/Auth/Login.tsx";
import ContactsPage from "./pages/Contacts.tsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route index element={<AuthPage />} />
        <Route path="OAuth" element={<OAuthPage />} />
        <Route path="verification" element={<VerificationPage />} />
        <Route path="auth" element={<AuthPage />} />
        <Route path="contacts" element={<ContactsPage />} />
        <Route path="login" element={<LoginPage />}></Route>
        <Route path="resetPassword" element={<GetPasswordToken />} />

        {/* protected routes */}
        <Route element={<RequireAuth />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="companyDetails/:id" element={<CompanyDetailsPage />} />
          <Route path="editCompany/:id" element={<CompanyEditPage />} />
          <Route path="companyMembers/:id" element={<CompanyMembersPage />} />
          <Route path="companyMembers/:id/info/:employeeId" element={<MembersInfoPage />} />
          <Route path="createCompany" element={<CreateCompanyPage />} />
          <Route path="addPosition/:id" element={<CreatePositionPage />} />
          <Route path=":companyId/project/:id/tasks" element={<TasksPage />} />
          <Route path=":companyId/project/:id/tasks/diagram" element={<DiagramPage />} />
          <Route path=":companyId/project/:id/task/create" element={<CreateTaskPage />} />
          <Route path=":companyId/project/:id/task/:taskId/update" element={<UpdateTaskPage />} />
          <Route path=":companyId/project/:id/task/:taskId/addPerformer" element={<AddTaskPerformerPage />} />
          <Route path="updatePosition/:id" element={<UpdatePositionPage />} />
          <Route path=":companyId/project/:id" element={<ProjectPage />} />
          <Route path=":companyId/project/:id/members" element={<ProjectPerformersPage />} />
          <Route path=":companyId/project/:id/update" element={<UpdateProjectPage />} />
          <Route path="createProject/:id" element={<CreateProjectPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="changePassword" element={<ChangePasswordPage />} />
        </Route>
      </Route>
    </Routes>
  );
}