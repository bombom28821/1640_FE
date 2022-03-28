import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./component/Home";
import Login from "./component/login/Login";
import ManageAdmin from "./component/manage/admin/ManageAdmin";
function App() {
  return (
    <div className="">
      <div>
        {/* <Home></Home> */}
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/user/manage" element={<ManageAdmin />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
