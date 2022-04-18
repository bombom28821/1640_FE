import React, { useEffect, useRef, useState } from "react";
import axios from "../../api/axios";
import useAuth from "../../hook/useAuth";
import Navbar from "../navbar/Navbar";
import Overlay from "../overlay/Overlay";
import ReactPagination from "../pagination/ReactPagination";
import Sidebar from "../sidebar/Sidebar";
import ClosureDate from "./admin/closuredate/Closuredate";
import "./manageIdeaStyle.css";

const ManageIdea = () => {
  const [page, setPage] = useState(1);
  const [countIdea, setCountIdea] = useState(null);
  const [closure, setClosure] = useState(false);
  const [arrayClosureDate, setArrayClosureDate] = useState([]);
  const [arrayIdea, setArrayIdea] = useState([]);
  const [typeDate, setTypeDate] = useState("All");
  const [deadlineDate, setDeadlineDate] = useState(() => {
    const timeNow = new Date();
    return timeNow;
  });
  const [dateTimeEnd, setDateTimeEnd] = useState();
  const [idClosureDate, setIdClosureDate] = useState();
  const downloadXlsxRef = useRef();
  const downloadZipRef = useRef();
  const { auth, setAuth } = useAuth();
  let deadline =
    deadlineDate - dateTimeEnd > 0 && typeDate !== "All" ? true : false;
  const handleChangeDate = (e) => {
    if (e.target.value !== "All") {
      const newClosure = arrayClosureDate.find(
        (item) => item._id === e.target.value
      );
      const newClosureTemp = newClosure?.end.split("/").reverse();
      setDateTimeEnd(new Date(newClosureTemp.join("-")));
      setIdClosureDate(e.target.value);
    }
    setTypeDate(e.target.value);
    setPage(1);
  };
  const handleDownloadZip = () => {
    async function DownloadZip() {
      try {
        const response = await axios({
          method: "get",
          url: `/time/downloadzip?id=${idClosureDate}`,
        });
        downloadZipRef.current.href = `${auth.url}/${response.data.urlFile}`;
        downloadZipRef.current.click();
      } catch (error) {
        console.log(error);
      }
    }
    DownloadZip();
  };
  const handleDownloadXlsx = () => {
    async function DownloadXlsx() {
      try {
        const response = await axios({
          method: "get",
          url: `/time/downloadxlsx?id=${idClosureDate}`,
        });
        downloadXlsxRef.current.href = `${auth.url}/${response.data.urlFile}`;
        downloadXlsxRef.current.click();
      } catch (error) {
        console.log(error);
      }
    }
    DownloadXlsx();
  };
  useEffect(() => {
    async function getIdea() {
      try {
        let response;
        if (typeDate === "All") {
          response = await axios.get(`/idea?page=${page}`);
        } else {
          response = await axios.get(`/time/idea?page=${page}&id=${typeDate}`);
        }
        if (response.data) {
          setCountIdea(response.data.count);
          setArrayIdea(response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getIdea();
  }, [page, typeDate]);
  const handleClickPage = (data) => {
    setPage(data.selected + 1);
  };
  //Get Data Closure Date
  useEffect(() => {
    async function GetDate() {
      try {
        const response = await axios({
          method: "get",
          url: "/time",
        });
        response.data.forEach((item) => {
          item.start = new Date(item.start).toLocaleString("en-GB", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          });
          item.end = new Date(item.end).toLocaleString("en-GB", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          });
        });
        setArrayClosureDate(response?.data);
      } catch (error) {
        console.log(error);
      }
    }
    GetDate();
  }, []);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setAuth(user);
  }, []);
  return (
    <div className="manageIdea">
      <Sidebar></Sidebar>
      {closure && (
        <Overlay>
          <ClosureDate closure={closure} setClosure={setClosure}></ClosureDate>
        </Overlay>
      )}
      <div className="navbar-manageIdea">
        <Navbar></Navbar>
      </div>
      <div className="manageIdea-mains">
        <h3 className="manageIdea-numberCategory">{`Accounts(~ 1 records)`}</h3>
        <div className="manageIdea-ct">
          <div className="manageIdea-create">
            {auth.role === "admin" && (
              <a href="#" onClick={() => setClosure(true)}>
                Set Closure
              </a>
            )}
          </div>
          <div className="manageIdea-search">
            <input type="text" placeholder="Search something..." />
            <span>
              <i className="fa fa-search"></i>
            </span>
          </div>
        </div>
        <div className="manageIdea-chooseDate">
          <span>Date Time: </span>
          <select name="" id="" onChange={handleChangeDate}>
            <option value="All">---------All---------</option>
            {arrayClosureDate.length &&
              arrayClosureDate.map((item) => (
                <option
                  value={item._id}
                  key={item._id}
                >{`${item.start} to ${item.end}`}</option>
              ))}
          </select>
          {deadline && (
            <div className="manageIdea-downloadButton">
              <button onClick={handleDownloadZip}>Download Zip</button>
              <button onClick={handleDownloadXlsx}>Download Xlsx</button>
            </div>
          )}
        </div>
        <div className="manageIdea-listCategory">
          <table className="manageIdea-tableAccount">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name Post</th>
                <th scope="col">Content</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {arrayIdea.length > 0 &&
                arrayIdea.map((item, index) => (
                  <tr key={item.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.user.name}</td>
                    <td>{item.content}</td>
                    <td>
                      <a href="#">Delete</a>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div
          className="manageIdea-pagination"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <ReactPagination
            pageCount={countIdea}
            handleClickPage={handleClickPage}
            marginPagesDisplayed={3}
            pageRangeDisplayed={3}
            page={page - 1}
          />
        </div>
        <a href="" ref={downloadXlsxRef}></a>
        <a href="" ref={downloadZipRef}></a>
      </div>
    </div>
  );
};

export default ManageIdea;
