import React, { useEffect, useRef } from "react";
import "./notificationStyle.css";
const Notification = (props) => {
  const nodeNotificationRef = useRef();
  useEffect(() => {
    const handleClickOutSide = (e) => {
      if (
        props.activeNotification &&
        !nodeNotificationRef.current?.contains(e.target)
      ) {
        const listItem = document.querySelectorAll(".navbar-item");
        listItem.forEach((item) => {
          if (!item.contains(e.target)) {
            item.classList.remove("active");
          }
        });
        props.setActiveNotification(false);
      }
    };
    if (props.activeNotification) {
      document.addEventListener("click", handleClickOutSide);
    }
    return () => {
      document.removeEventListener("click", handleClickOutSide);
    };
  }, [props]);
  return (
    <div className="navbar-notifications" ref={nodeNotificationRef}>
      <div className="navbar-notificationsInside">
        <div className="navbar-notificationTitle">
          <span>Notifications</span>
        </div>
        <div className="navbar-notificationNew">
          <div className="navbar-notificationAll">
            <span>New</span>
            <span>See All</span>
          </div>
          <div className="navbar-notificationContent">
            <div className="navbar-notificationItem">
              <div className="navbar-notificationImg">
                <img
                  src="https://images.unsplash.com/photo-1644982647711-9129d2ed7ceb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
                  alt=""
                />
              </div>
              <div className="navbar-notificationMain">
                <span>Khoa Pug</span>
                <span>commented on</span>
                <span>Nguyen Duc Huy</span>
                <p>about an hour ago</p>
              </div>
            </div>
            <div className="navbar-notificationItem">
              <div className="navbar-notificationImg">
                <img
                  src="https://images.unsplash.com/photo-1453227588063-bb302b62f50b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8a2hvYSUyMHB1Z3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                  alt=""
                />
              </div>
              <div className="navbar-notificationMain">
                <span>Nguyen Thac Huy</span>
                <span>posted an opinion</span>
                <p>24 minutes ago</p>
              </div>
            </div>
          </div>
        </div>
        <div className="navbar-notificationEarlier">
          <span>Before</span>
          <div className="navbar-notificationContent">
            <div className="navbar-notificationItem">
              <div className="navbar-notificationImg">
                <img
                  src="https://images.unsplash.com/photo-1644982647711-9129d2ed7ceb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
                  alt=""
                />
              </div>
              <div className="navbar-notificationMain">
                <span>Khoa Pug</span>
                <span>posted an opinion</span>
                <p>about an hour ago</p>
              </div>
            </div>
            <div className="navbar-notificationItem">
              <div className="navbar-notificationImg">
                <img
                  src="https://images.unsplash.com/photo-1453227588063-bb302b62f50b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8a2hvYSUyMHB1Z3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                  alt=""
                />
              </div>
              <div className="navbar-notificationMain">
                <span>Nguyen Thac Huy</span>
                <span>posted an opinion</span>
                <p>24 minutes ago</p>
              </div>
            </div>
            <div className="navbar-notificationItem">
              <div className="navbar-notificationImg">
                <img
                  src="https://images.unsplash.com/photo-1453227588063-bb302b62f50b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8a2hvYSUyMHB1Z3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                  alt=""
                />
              </div>
              <div className="navbar-notificationMain">
                <span>Nguyen Thac Huy</span>
                <span>posted an opinion</span>
                <p>24 minutes ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
