import React, { useEffect, useRef, useState } from "react";
import useAuth from "../../hook/useAuth";
import Profile from "../profile/Profile";
import Sidebar from "../sidebar/Sidebar";
import { Line } from "react-chartjs-2";
import "./dashboardStyle.css";
import { Chart as ChartJS, registerables } from "chart.js";
import Navbar from "../navbar/Navbar";
import axios from "../../api/axios";
ChartJS.register(...registerables);
const EVENTS = {
  like: {
    icon: "like",
    classIcon: "fa-thumbs-up",
    backgroundColor: "rgb(249, 136, 108)",
    count: 300,
  },
  dislike: {
    icon: "dislike",
    classIcon: "fa-thumbs-down",
    backgroundColor: "rgb(255, 188, 101)",
    count: 125,
  },
  view: {
    icon: "view",
    classIcon: "fa-heart",
    backgroundColor: "rgb(132, 232, 244)",
    count: 450,
  },
  all: {
    icon: "all",
    classIcon: "fa-expand-arrows-alt",
    backgroundColor: "rgb(146, 115, 191)",
    count: 875,
  },
};
const Dashboard = () => {
  const { setAuth } = useAuth();
  const [countLike7Day, setCountLike7Day] = useState([
    200, 250, 100, 70, 120, 110, 180,
  ]);
  const [countDislike7Day, setCountDislike7Day] = useState([
    20, 17, 55, 6, 40, 15, 10,
  ]);
  const [countView7Day, setCountView7Day] = useState([
    100, 192, 40, 55, 20, 35, 80,
  ]);
  const [events, setEvents] = useState([EVENTS.like]);
  const [total, setTotal] = useState(EVENTS.like.count);
  const [interactive, setInteractive] = useState("Like");
  const [showInteractive, setShowInteractive] = useState(false);
  const [dashboard1, setDashboard1] = useState({});
  const [dashboard2, setDashboard2] = useState({});
  const circleRef = useRef();
  const handleLikeEvent = () => {
    const check = events.some((event) => event.icon === "like");
    const lengthEvents = events.length;
    circleRef.current.style.transition = "all .3s";
    if (check) {
      const eventsTemp = events.filter((event) => event.icon !== "like");
      setEvents(eventsTemp);
      setTotal((prevTotal) => prevTotal - EVENTS.like.count);
      if (lengthEvents === 1) {
        circleRef.current.style.borderLeftColor = "transparent";
      } else if (lengthEvents === 2) {
        circleRef.current.style.borderBottomColor = "transparent";
      } else if (lengthEvents === 3) {
        circleRef.current.style.borderTopColor = "transparent";
        circleRef.current.style.borderRightColor = "transparent";
      }
    } else {
      const check2 = events.some((event) => event.icon === "all");
      if (check2) {
        setTotal(EVENTS.like.count);
        setEvents(() => {
          return [EVENTS.like];
        });
        circleRef.current.style.borderColor = "transparent";
        circleRef.current.style.borderLeftColor = "rgb(79, 70, 187)";
      } else {
        setTotal((prevTotal) => prevTotal + EVENTS.like.count);
        setEvents((prevEvents) => {
          return [...prevEvents, EVENTS.like];
        });
        if (lengthEvents === 0) {
          circleRef.current.style.borderLeftColor = "rgb(79, 70, 187)";
        } else if (lengthEvents === 1) {
          circleRef.current.style.borderBottomColor = "rgb(79, 70, 187)";
        } else if (lengthEvents === 2) {
          circleRef.current.style.borderRightColor = "rgb(79, 70, 187)";
          circleRef.current.style.borderTopColor = "rgb(79, 70, 187)";
        }
      }
    }
  };
  const handleDislikeEvent = () => {
    const check = events.some((event) => event.icon === "dislike");
    const lengthEvents = events.length;
    circleRef.current.style.transition = "all .3s";
    if (check) {
      const eventsTemp = events.filter((event) => event.icon !== "dislike");
      setEvents(eventsTemp);
      setTotal((prevTotal) => prevTotal - EVENTS.dislike.count);
      if (lengthEvents === 1) {
        circleRef.current.style.borderLeftColor = "transparent";
      } else if (lengthEvents === 2) {
        circleRef.current.style.borderBottomColor = "transparent";
      } else if (lengthEvents === 3) {
        circleRef.current.style.borderTopColor = "transparent";
        circleRef.current.style.borderRightColor = "transparent";
      }
    } else {
      const check2 = events.some((event) => event.icon === "all");
      if (check2) {
        setTotal(EVENTS.dislike.count);
        setEvents(() => {
          return [EVENTS.dislike];
        });
        circleRef.current.style.borderColor = "transparent";
        circleRef.current.style.borderLeftColor = "rgb(79, 70, 187)";
      } else {
        setTotal((prevTotal) => prevTotal + EVENTS.dislike.count);
        setEvents((prevEvents) => {
          return [...prevEvents, EVENTS.dislike];
        });
        if (lengthEvents === 0) {
          circleRef.current.style.borderLeftColor = "rgb(79, 70, 187)";
        } else if (lengthEvents === 1) {
          circleRef.current.style.borderBottomColor = "rgb(79, 70, 187)";
        } else if (lengthEvents === 2) {
          circleRef.current.style.borderRightColor = "rgb(79, 70, 187)";
          circleRef.current.style.borderTopColor = "rgb(79, 70, 187)";
        }
      }
    }
  };
  const handleViewEvent = () => {
    const check = events.some((event) => event.icon === "view");
    const lengthEvents = events.length;
    circleRef.current.style.transition = "all .3s";
    if (check) {
      const eventsTemp = events.filter((event) => event.icon !== "view");
      setEvents(eventsTemp);
      setTotal((prevTotal) => prevTotal - EVENTS.view.count);
      if (lengthEvents === 1) {
        circleRef.current.style.borderLeftColor = "transparent";
      } else if (lengthEvents === 2) {
        circleRef.current.style.borderBottomColor = "transparent";
      } else if (lengthEvents === 3) {
        circleRef.current.style.borderTopColor = "transparent";
        circleRef.current.style.borderRightColor = "transparent";
      }
    } else {
      const check2 = events.some((event) => event.icon === "all");
      if (check2) {
        setTotal(EVENTS.view.count);
        setEvents(() => {
          return [EVENTS.view];
        });
        circleRef.current.style.borderColor = "transparent";
        circleRef.current.style.borderLeftColor = "rgb(79, 70, 187)";
      } else {
        setTotal((prevTotal) => prevTotal + EVENTS.view.count);
        setEvents((prevEvents) => {
          return [...prevEvents, EVENTS.view];
        });
        if (lengthEvents === 0) {
          circleRef.current.style.borderLeftColor = "rgb(79, 70, 187)";
        } else if (lengthEvents === 1) {
          circleRef.current.style.borderBottomColor = "rgb(79, 70, 187)";
        } else if (lengthEvents === 2) {
          circleRef.current.style.borderRightColor = "rgb(79, 70, 187)";
          circleRef.current.style.borderTopColor = "rgb(79, 70, 187)";
        }
      }
    }
  };
  const handleAllEvent = () => {
    const check = events.some((event) => event.icon === "all");
    circleRef.current.style.transition = "all .3s";
    if (check) {
      const eventsTemp = events.filter((event) => event.icon !== "all");
      setEvents(eventsTemp);
      setTotal(0);
      circleRef.current.style.borderColor = "transparent";
    } else {
      setEvents(() => {
        return [EVENTS.all];
      });
      setTotal(EVENTS.all.count);
      circleRef.current.style.borderColor = "rgb(79, 70, 187)";
    }
  };
  const handleChangeInteractive = (value) => {
    setInteractive(value);
    if (value === "Like") {
    } else if (value === "Dislike") {
    } else if (value === "View") {
    }
    setShowInteractive(false);
  };
  //Call Data
  useEffect(() => {
    async function GetData() {
      try {
        const response = await axios({
          method: "get",
          url: `/idea/dashboard`,
        });
        console.log(response);
        setDashboard1(response.data.dashboard1);
        setDashboard2(response.data.dashboard2);
      } catch (error) {
        console.log(error);
      }
    }
    GetData();
  }, []);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setAuth(user);
  }, []);
  return (
    <div className="body row mx-0">
      <Sidebar></Sidebar>
      <div className="dashboard">
        <div className="navbar-dashboard">
          <Navbar></Navbar>
        </div>
        <div className="dashboard-main">
          <div className="dashboard-performance">
            <h4>Performance</h4>
            <div className="dashboard-performanceContent">
              <div className="dashboard-performanceItem">
                <span>VIEWS</span>
                <p>{dashboard1.view}</p>
              </div>
              <div className="dashboard-performanceItem">
                <span>LIKES</span>
                <p>{dashboard1.like}</p>
              </div>
              <div className="dashboard-performanceItem">
                <span>DISLIKES</span>
                <p>{dashboard1.dislike}</p>
              </div>
            </div>
          </div>
          <div className="dashboard-analytics">
            <div className="dashboard-analyticsViews">
              <h4>Analytics</h4>
              <div className="dashboard-analyticsViewsMain">
                <div className="dashboard-analyticsTitle">
                  <span>7 days ago</span>
                  <span>2022</span>
                </div>
                <Line
                  data={{
                    labels: [
                      "Day 1",
                      "Day 2",
                      "Day 3",
                      "Day 4",
                      "Day 5",
                      "Day 6",
                      "Day 7",
                    ],
                    datasets: [
                      {
                        label: "count interaction",
                        data: countView7Day,
                        backgroundColor: [
                          "rgba(255, 99, 132, 0.2)",
                          "rgba(54, 162, 235, 0.2)",
                          "rgba(255, 206, 86, 0.2)",
                          "rgba(75, 192, 192, 0.2)",
                          "rgba(153, 102, 255, 0.2)",
                          "rgba(255, 159, 64, 0.2)",
                          "rgba(153, 102, 255, 0.2)",
                        ],
                        borderColor: [
                          "rgba(255, 99, 132, 1)",
                          "rgba(54, 162, 235, 1)",
                          "rgba(255, 206, 86, 1)",
                          "rgba(75, 192, 192, 1)",
                          "rgba(153, 102, 255, 1)",
                          "rgba(255, 159, 64, 1)",
                          "rgba(153, 102, 255, 1)",
                        ],
                        borderWidth: 1,
                      },
                      {
                        label: "count like",
                        data: countLike7Day,
                        backgroundColor: [
                          "rgba(255, 99, 132, 0.2)",
                          "rgba(54, 162, 235, 0.2)",
                          "rgba(255, 206, 86, 0.2)",
                          "rgba(75, 192, 192, 0.2)",
                          "rgba(153, 102, 255, 0.2)",
                          "rgba(255, 159, 64, 0.2)",
                          "rgba(153, 102, 255, 0.2)",
                        ],
                        borderColor: [
                          "rgba(255, 99, 132, 1)",
                          "rgba(54, 162, 235, 1)",
                          "rgba(255, 206, 86, 1)",
                          "rgba(75, 192, 192, 1)",
                          "rgba(153, 102, 255, 1)",
                          "rgba(255, 159, 64, 1)",
                          "rgba(153, 102, 255, 1)",
                        ],
                        borderWidth: 1,
                      },
                      {
                        label: "count dislike",
                        data: countDislike7Day,
                        backgroundColor: [
                          "rgba(255, 99, 132, 0.2)",
                          "rgba(54, 162, 235, 0.2)",
                          "rgba(255, 206, 86, 0.2)",
                          "rgba(75, 192, 192, 0.2)",
                          "rgba(153, 102, 255, 0.2)",
                          "rgba(255, 159, 64, 0.2)",
                          "rgba(153, 102, 255, 0.2)",
                        ],
                        borderColor: [
                          "rgba(255, 99, 132, 1)",
                          "rgba(54, 162, 235, 1)",
                          "rgba(255, 206, 86, 1)",
                          "rgba(75, 192, 192, 1)",
                          "rgba(153, 102, 255, 1)",
                          "rgba(255, 159, 64, 1)",
                          "rgba(153, 102, 255, 1)",
                        ],
                        borderWidth: 1,
                      },
                    ],
                  }}
                  height={400}
                  width={600}
                  options={{
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: true,
                      },
                    },
                    legend: {
                      labels: {
                        fontSize: 25,
                      },
                    },
                  }}
                />
              </div>
            </div>
            <div className="dashboard-distribution">
              <h4>Distribution</h4>
              <div className="dashboard-distributionMain">
                <p>Performance</p>
                <div className="dashboard-distributeContent">
                  <div className="dashboard-distributeCircle">
                    <h2>{total}</h2>
                    <span>Total distribution</span>
                    <div
                      className="dashboard-distributePercent"
                      ref={circleRef}
                    ></div>
                  </div>
                </div>
                <div className="dashboard-distributedEvents">
                  {events.map((event, index) => (
                    <span
                      key={index}
                      style={{ backgroundColor: event.backgroundColor }}
                    >
                      <i className={`fa ${event.classIcon}`}></i>
                    </span>
                  ))}
                </div>
                <div className="dashboard-distributeEvents">
                  <span>Events DISTRIBUTION</span>
                  <div className="dashboard-distributeEventsMain">
                    <div className="dashboard-distributeEventItem">
                      <span onClick={handleLikeEvent}>
                        <i className="fa fa-thumbs-up"></i>
                      </span>
                      <span>Like</span>
                    </div>
                    <div className="dashboard-distributeEventItem">
                      <span onClick={handleDislikeEvent}>
                        <i className="fa fa-thumbs-down"></i>
                      </span>
                      <span>Dislike</span>
                    </div>
                    <div className="dashboard-distributeEventItem">
                      <span onClick={handleViewEvent}>
                        <i className="fa fa-heart"></i>
                      </span>
                      <span>View</span>
                    </div>
                    <div className="dashboard-distributeEventItem">
                      <span onClick={handleAllEvent}>
                        <i className="fa fa-expand-arrows-alt"></i>
                      </span>
                      <span>All</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="dashboard-topInteractivePosts">
            <h4>Top 3 interactive posts</h4>
            <div className="dashboard-topInteractivePostsMain">
              <p>
                <span onClick={() => setShowInteractive(!showInteractive)}>
                  <span>{interactive}</span>
                  <i className="fa fa-sort-down"></i>
                </span>
              </p>
              {showInteractive && (
                <div className="dashboard-topInteractiveType">
                  <div className="dashboard-topInteractiveTypeMain">
                    <div
                      className="dashboard-topInteractiveTypeItem"
                      onClick={() => handleChangeInteractive("Like")}
                    >
                      <span>Like</span>
                    </div>
                    <div
                      className="dashboard-topInteractiveTypeItem"
                      onClick={() => handleChangeInteractive("Dislike")}
                    >
                      <span>Dislike</span>
                    </div>
                    <div
                      className="dashboard-topInteractiveTypeItem"
                      onClick={() => handleChangeInteractive("View")}
                    >
                      <span>View</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="dashboard-topInteractivePostsList">
                <table className="dashboard-tableInteractivePostsList">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Posted by</th>
                      <th scope="col">Content</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Tommy Shelby</td>
                      <td>This post is very good</td>
                      <td>
                        <button>Detail</button>
                      </td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Tommy Shelby</td>
                      <td>This post is very good</td>
                      <td>
                        <button>Detail</button>
                      </td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Tommy Shelby</td>
                      <td>This post is very good</td>
                      <td>
                        <button>Detail</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Profile></Profile>
    </div>
  );
};

export default Dashboard;
