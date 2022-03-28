import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import ReactPagination from "../../pagination/ReactPagination";
import Sidebar from "../../sidebar/Sidebar";
import "./ManageStyle.css";
const ManageAdmin = () => {
  const [dropdown, setDropdown] = useState(false);
  const [page, setPage] = useState(1);
  const [role, setRole] = useState("all");
  const [users, setUsers] = useState([]);
  const [countUser, setCountUser] = useState(null);
  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await axios.get(
          `http://localhost:5000/admin/manage?page=${page}&role=${role}`
        );
        if (response.data?.users) {
          setUsers(response.data.users);
          setCountUser(response.data.countUser);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchUser();
  }, [page, role]);

  const handleClickPage = (data) => {
    setPage(data.selected + 1);
  };
  const handleManageRoleAccount = (e) => {
    setPage(1);
    setRole(e.target.value);
  };
  return (
    <div className="row me-0">
      <Sidebar></Sidebar>
      <div className="manage col-10">
        <div
          className={`manage-navbar ${dropdown ? "active" : ""}`}
          onClick={() => setDropdown(!dropdown)}
        >
          <div className="manage-info">
            <div className="manage-infoImg">
              <img src="../images/bg-login.png" alt="user-logo" />
            </div>
            <span className="manage-nameUser">bombom</span>
            <span className="manage-icon">
              <i className="fa fa-angle-down"></i>
            </span>
          </div>
          {dropdown && (
            <div className="manage-dropdown">
              <ul>
                <li>
                  <a href="#">
                    <div className="manage-dropdownIcon">
                      <i className="fa fa-user"></i>
                    </div>
                    <span>View Profile</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <div className="manage-dropdownIcon">
                      <i className="fa fa-edit"></i>
                    </div>
                    <span>Update Profile</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <div className="manage-dropdownIcon">
                      <i className="fa fa-sign-out-alt"></i>
                    </div>
                    <span>Log out</span>
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
        <div className="manage-main">
          <h3 className="manage-numberAccount">{`Accounts(~ ${users.length}  records)`}</h3>
          <div className="manage-cs">
            <div className="manage-create">
              <a href="#">New Account</a>
            </div>
            <div className="manage-search">
              <input type="text" placeholder="Search something..." />
              <span>
                <i className="fa fa-search"></i>
              </span>
            </div>
          </div>
          <div className="manage-account">
            <div className="manage-roleAccount">
              <div>
                <span>Manage Account</span>
                <select onChange={handleManageRoleAccount}>
                  <option value="all">-------------</option>
                  <option value="staff">Staff</option>
                  <option value="qualityAssuranceManager">
                    Quality Assurance Manager
                  </option>
                  <option value="qualityAssuranceCoordinator">
                    Quality Assurance Coordinator
                  </option>
                </select>
              </div>
            </div>
            <div className="manage-listAccount">
              <table className="manage-tableAccount">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Avatar</th>
                    <th scope="col">Fullname</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Address</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user.id}>
                      <th scope="row">{index + 1}</th>
                      <td>
                        <img src={user.avatar} alt="" />
                      </td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>{user.address}</td>
                      <td>
                        <a href="#">Delete</a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div
              className="manage-pagination"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <ReactPagination
                pageCount={countUser}
                handleClickPage={handleClickPage}
                marginPagesDisplayed={3}
                pageRangeDisplayed={3}
                page={page - 1}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageAdmin;
