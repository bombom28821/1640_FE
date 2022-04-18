import React, { useEffect, useRef, useState } from "react";
import axios from "../../../../api/axios";
import "./closuredate.css";

const ClosureDate = (props) => {
  const [startDay, setStartDay] = useState("");
  const [endDay, setEndDay] = useState("");
  const [closureDate, setClosureDate] = useState([]);
  const [add, setAdd] = useState(true);
  const [messageError, setMessageError] = useState("");
  const [idClosure, setIdClosure] = useState();
  const nodeMainRef = useRef();
  const minTemp = new Date();
  const minEnd = new Date().toLocaleString("sv-SE", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
  minTemp.setDate(minTemp.getDate() - 4);
  const minStart = new Date(minTemp).toLocaleString("sv-SE", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
  const handleStartDay = (e) => {
    setStartDay(e.target.value);
  };
  const handleEndDay = (e) => {
    setEndDay(e.target.value);
  };
  //Add Closure Day
  const handleAddDay = () => {
    const start = new Date(startDay);
    const end = new Date(endDay);
    const newClosureDay = {
      start,
      end,
    };
    if (start < end) {
      setMessageError("");
      async function AddClosure() {
        try {
          const response = await axios({
            method: "post",
            url: "/time",
            data: newClosureDay,
          });
          let options = {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          };
          const time = {};
          time._id = response.data._id;
          time.start = new Date(response.data.start).toLocaleString(
            "en-GB",
            options
          );
          time.end = new Date(response.data.end).toLocaleString(
            "en-GB",
            options
          );
          setClosureDate([...closureDate, time]);
          setStartDay("");
          setEndDay("");
        } catch (error) {
          console.log(error);
        }
      }
      AddClosure();
    } else {
      setMessageError("Start day must less than end day");
    }
  };
  //Delete Closure Day
  const handleDelete = (id) => {
    async function DeleteDate() {
      try {
        await axios({
          method: "delete",
          url: `/time?id=${id}`,
        });
        const newClosureDate = closureDate.filter((item) => item._id !== id);
        setClosureDate(newClosureDate);
      } catch (error) {
        console.log(error);
      }
    }
    DeleteDate();
  };
  const handleUpdate = (startDay, endDay, id) => {
    const newStartDay = startDay.split("/").reverse();
    const newEndDay = endDay.split("/").reverse();
    setStartDay(newStartDay.join("-"));
    setEndDay(newEndDay.join("-"));
    setAdd(false);
    setIdClosure(id);
  };
  const handleSaveDate = () => {
    async function UpdateClosure() {
      try {
        await axios({
          method: "put",
          url: `/time?id=${idClosure}`,
          data: {
            start: startDay,
            end: endDay,
          },
        });
        const newStartDay = startDay.split("-").reverse();
        const newEndDay = endDay.split("-").reverse();
        closureDate.forEach((item) => {
          if (item._id === idClosure) {
            item.start = newStartDay.join("/");
            item.end = newEndDay.join("/");
          }
        });
        setStartDay("");
        setEndDay("");
        setAdd(true);
      } catch (error) {
        console.log(error);
      }
    }
    UpdateClosure();
  };
  useEffect(() => {
    const handleClickOutSide = (e) => {
      if (props.closure && !nodeMainRef.current?.contains(e.target)) {
        document.body.classList.remove("active");
        props.setClosure(false);
      }
    };
    if (props.closure) {
      document.addEventListener("click", handleClickOutSide);
    }
    return () => {
      document.removeEventListener("click", handleClickOutSide);
    };
  }, [props]);
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
        setClosureDate([...closureDate, ...response.data]);
      } catch (error) {
        console.log(error);
      }
    }
    GetDate();
  }, []);
  return (
    <div className="setDate" ref={nodeMainRef}>
      <div className="setDate-delete" onClick={() => props.setClosure(false)}>
        <i className="fa fa-times"></i>
      </div>
      <div className="setDate-main">
        <h2>Set Closure Date</h2>
        <div className="setDate-add">
          <div className="setDate-addTime">
            <div className="setDate-addStart">
              <span>Start: </span>
              <input
                type="date"
                name="dateStart"
                value={startDay}
                onChange={handleStartDay}
                min={minStart}
              />
            </div>
            <div className="setDate-addEnd">
              <span>End: </span>
              <input
                type="date"
                name="dateEnd"
                value={endDay}
                onChange={handleEndDay}
                min={minEnd}
              />
            </div>
          </div>
          {messageError && (
            <div className="setDate-error">
              <span>{messageError}</span>
            </div>
          )}
          <div className="setDate-addButtom">
            {add ? (
              <button
                disabled={startDay && endDay ? false : true}
                style={{
                  opacity: startDay && endDay ? "1" : "0.7",
                }}
                onClick={handleAddDay}
              >
                Add
              </button>
            ) : (
              <button
                disabled={startDay && endDay ? false : true}
                style={{
                  opacity: startDay && endDay ? "1" : "0.7",
                }}
                onClick={handleSaveDate}
              >
                Save
              </button>
            )}
          </div>
        </div>
        <div className="setDate-update">
          {closureDate.length > 0 && (
            <table className="manage-tableAccount">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Start Date</th>
                  <th scope="col">End Date</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {closureDate.map((item, index) => (
                  <tr key={index}>
                    <th scope="row">{index}</th>
                    <td>{item.start}</td>
                    <td>{item.end}</td>
                    <td>
                      <button
                        onClick={() =>
                          handleUpdate(item.start, item.end, item._id)
                        }
                      >
                        Update
                      </button>
                      <button onClick={() => handleDelete(item._id)}>
                        Delete
                      </button>
                      <button>Dl Zip</button>
                      <button>Dl Xlsx</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClosureDate;
