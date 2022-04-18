import React, { useEffect, useState } from "react";
import axios from "../../../api/axios";
import useAuth from "../../../hook/useAuth";
import Navbar from "../../navbar/Navbar";
import Overlay from "../../overlay/Overlay";
import ReactPagination from "../../pagination/ReactPagination";
import Sidebar from "../../sidebar/Sidebar";
import AddCategory from "./AddCategory";
import "./category.css";
import EditCategory from "./EditCategory";
const ManageCategory = () => {
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState([]);
  const [newCategory, setNewCategory] = useState(false);
  const [statusSuccess, setStatusSuccess] = useState(false);
  const [editCategory, setEditCategory] = useState(false);
  const [idCategory, setIdCategory] = useState();
  const [valueSearch, setValueSearch] = useState("");
  const { auth, setAuth } = useAuth();
  const handleChangeSearch = (e) => {
    setValueSearch(e.target.value);
  };
  const handleClickPage = (data) => {
    setPage(data.selected + 1);
  };
  const handleDeleteCategory = (id) => {
    async function DeleteCategory() {
      try {
        await axios.delete(`/category?id=${id}`);
        setStatusSuccess(!statusSuccess);
      } catch (error) {
        console.log(error);
      }
    }
    DeleteCategory();
  };
  const handleSendSearch = () => {
    async function Search() {
      try {
        const response = await axios.get(
          `/category/search?search=${valueSearch}`
        );
        setCategory(response?.data);
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
        const response = await axios.get(`/category`);
        if (response) {
          setCategory(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchUser();
  }, [statusSuccess]);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setAuth(user);
  }, []);
  return (
    <div className="manage manage-category">
      <Sidebar></Sidebar>
      {newCategory && (
        <Overlay>
          <AddCategory
            newCategory={newCategory}
            setNewCategory={setNewCategory}
            statusSuccess={statusSuccess}
            setStatusSuccess={setStatusSuccess}
          ></AddCategory>
        </Overlay>
      )}
      {editCategory && (
        <Overlay>
          <EditCategory
            editCategory={editCategory}
            setEditCategory={setEditCategory}
            statusSuccess={statusSuccess}
            setStatusSuccess={setStatusSuccess}
            id={idCategory}
          ></EditCategory>
        </Overlay>
      )}
      <div className="navbar-manageCategory">
        <Navbar></Navbar>
      </div>
      <div className="manageCategory-mains">
        <h3 className="manageCategory-numberCategory">{`Categories(~ ${category.length} records)`}</h3>
        <div className="manageCategory-ct">
          <div className="manageCategory-create">
            <a href="#" onClick={() => setNewCategory(true)}>
              New Category
            </a>
          </div>
          <div className="manageCategory-search">
            <input
              type="text"
              placeholder="Search something..."
              value={valueSearch}
              onChange={handleChangeSearch}
            />
            <span onClick={handleSendSearch}>
              <i className="fa fa-search"></i>
            </span>
          </div>
        </div>
        <div className="manageCategory-listCategory">
          <table className="manageCategory-tableAccount">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
                <th scope="col">Idea</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {category?.length > 0 &&
                category.map((category, index) => (
                  <tr key={category._id}>
                    <th scope="row">{index + 1}</th>
                    <td>{category.name}</td>
                    <td>{category.description}</td>
                    <td>{category.idea}</td>
                    <td>
                      <a
                        href="#"
                        style={{
                          marginRight: "10px",
                        }}
                        onClick={() => handleDeleteCategory(category._id)}
                      >
                        Delete
                      </a>
                      <a
                        href="#"
                        onClick={() => {
                          setEditCategory(true);
                          setIdCategory(category._id);
                        }}
                      >
                        Edit
                      </a>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div
          className="manageCategory-pagination"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <ReactPagination
            pageCount={8}
            handleClickPage={handleClickPage}
            marginPagesDisplayed={3}
            pageRangeDisplayed={3}
            page={page - 1}
          />
        </div>
      </div>
    </div>
  );
};

export default ManageCategory;
