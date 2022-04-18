import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import axios from "../../../api/axios";
import useAuth from "../../../hook/useAuth";
import Navbar from "../../navbar/Navbar";
import Overlay from "../../overlay/Overlay";
import ReactPagination from "../../pagination/ReactPagination";
import Sidebar from "../../sidebar/Sidebar";
import AddUser from "./add/Adduser";
import "./ManageStyle.css";
const ManageAccount = () => {
  const [dropdown, setDropdown] = useState(false);
  const [page, setPage] = useState(1);
  const [role, setRole] = useState("all");
  const [users, setUsers] = useState([]);
  const [countUser, setCountUser] = useState(null);
  const [newUser, setNewUser] = useState(false);
  const [valueSearch, setValueSearch] = useState("");
  const [statusSuccess, setStatusSuccess] = useState(false);
  const { auth, setAuth } = useAuth();
  //Handle Delete
  const handleDeleteAccount = (id) => {
    async function Delete() {
      try {
        await axios.delete(`/user?id=${id}`);
        setPage(1);
      } catch (error) {
        console.log(error);
      }
    }
    Delete();
  };
  //Handle Search
  const handleChangeSearch = (e) => {
    setValueSearch(e.target.value);
  };
  const handleSendSearch = () => {
    async function Search() {
      try {
        const response = await axios.get(
          `/user/search?search=${valueSearch}&role=${role}`
        );
        setUsers(response?.data.user);
      } catch (error) {
        console.log(error);
      }
    }
    Search();
  };
  useEffect(() => {
    handleSendSearch();
  }, [valueSearch]);
  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await axios.get(`/user?page=${page}&role=${role}`);
        if (response.data?.users) {
          setUsers(response.data.users);
          setCountUser(response.data.count);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchUser();
  }, [page, role, statusSuccess]);

  const handleClickPage = (data) => {
    setPage(data.selected + 1);
  };
  const handleManageRoleAccount = (e) => {
    setPage(1);
    setRole(e.target.value);
  };
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setAuth(user);
  }, []);
  return (
    <div className="manage manage-account">
      <Sidebar></Sidebar>
      {newUser && (
        <Overlay>
          <AddUser
            setNewUser={setNewUser}
            newUser={newUser}
            statusSuccess={statusSuccess}
            setStatusSuccess={setStatusSuccess}
          ></AddUser>
        </Overlay>
      )}
      <div className="navbar-manage">
        <Navbar></Navbar>
      </div>
      <div className="manage-main">
        <h3 className="manage-numberAccount">{`Accounts(~ ${users.length}  records)`}</h3>
        <div className="manage-cs">
          <div className="manage-create">
            <a href="#" onClick={() => setNewUser(true)}>
              New Account
            </a>
          </div>
          <div className="manage-search">
            <input
              type="text"
              name="search"
              placeholder="Search something..."
              value={valueSearch}
              onChange={handleChangeSearch}
            />
            <span onClick={handleSendSearch}>
              <i className="fa fa-search"></i>
            </span>
          </div>
        </div>
        <div className="manage-account">
          <div className="manage-roleAccount">
            <div>
              <span>Manage Account</span>
              <select onChange={handleManageRoleAccount}>
                <option value="all">----All ----</option>
                <option value="staff">Staff</option>
                <option value="manager">Quality Assurance Manager</option>
                <option value="coordinator">
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
                  <tr key={user._id}>
                    <th scope="row">{index + 1}</th>
                    <td>
                      <img src={`${auth.url}/${user.avatar}`} alt="" />
                    </td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.address}</td>
                    <td>
                      <a href="#" onClick={() => handleDeleteAccount(user._id)}>
                        Delete
                      </a>
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
  );
};

export default ManageAccount;
