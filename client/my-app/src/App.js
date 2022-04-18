import { Route, Routes } from "react-router-dom";
import "./App.css";
import ChangePassword from "./component/changepassword/ChangePassword";
import ViewPost from "./component/content/post/ViewPost";
import Dashboard from "./component/dashboard/Dashboard";
import EditProfile from "./component/detailProfile/EditProfile";
import ViewProfile from "./component/detailProfile/ViewProfile";
import Home from "./component/Home";
import Layout from "./component/Layout";
import Login from "./component/login/Login";
import Logout from "./component/Logout";
import ManageAccount from "./component/manage/admin/ManageAccount";
import ManageCategory from "./component/manage/category/ManageCategory";
import ManageIdea from "./component/manage/ManageIdea";
import Missing from "./component/missing/Missing";
import PersonalPage from "./component/personalPage/PersonalPage";
import RequireAuth from "./component/RequireAuth";
import Unauthorized from "./component/unauthorized/Unauthorized";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="/login" element={<Login />}></Route>
        <Route path="/unauthorized" element={<Unauthorized />}></Route>
        {/* protected routes  */}
        <Route
          element={
            <RequireAuth
              allowedRoles={["admin", "staff", "manager", "coordinator"]}
            />
          }
        >
          <Route path="/" element={<Home />}></Route>
        </Route>
        <Route
          element={
            <RequireAuth
              allowedRoles={["admin", "staff", "manager", "coordinator"]}
            />
          }
        >
          <Route path="/view-profile" element={<ViewProfile />}></Route>
        </Route>
        <Route
          element={
            <RequireAuth
              allowedRoles={["admin", "staff", "manager", "coordinator"]}
            />
          }
        >
          <Route path="/edit-profile" element={<EditProfile />}></Route>
        </Route>
        <Route
          element={
            <RequireAuth
              allowedRoles={["admin", "staff", "manager", "coordinator"]}
            />
          }
        >
          <Route path="/change-password" element={<ChangePassword />}></Route>
        </Route>
        <Route element={<RequireAuth allowedRoles={["admin"]} />}>
          <Route path="/manage-account" element={<ManageAccount />}></Route>
        </Route>
        <Route element={<RequireAuth allowedRoles={["admin", "manager"]} />}>
          <Route path="/manage-category" element={<ManageCategory />}></Route>
        </Route>
        <Route element={<RequireAuth allowedRoles={["admin", "manager"]} />}>
          <Route path="/manage-idea" element={<ManageIdea />}></Route>
        </Route>
        <Route
          element={
            <RequireAuth
              allowedRoles={["admin", "staff", "manager", "coordinator"]}
            />
          }
        >
          <Route path="/personal-page" element={<PersonalPage />}></Route>
        </Route>
        <Route
          element={
            <RequireAuth
              allowedRoles={["admin", "staff", "manager", "coordinator"]}
            />
          }
        >
          <Route path="/view-post" element={<ViewPost />}></Route>
        </Route>
        <Route element={<RequireAuth allowedRoles={["admin", "manager"]} />}>
          <Route path="/dashboard" element={<Dashboard />}></Route>
        </Route>
        <Route
          element={
            <RequireAuth
              allowedRoles={["admin", "staff", "manager", "coordinator"]}
            />
          }
        >
          <Route path="/logout" element={<Logout />}></Route>
        </Route>
        {/* catch all  */}
        <Route path="*" element={<Missing />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
