import express from "express";
import db from "./config/db.js";
import "dotenv/config";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use("/", express.static('../../client'));
const run = async () => {
  await db.connect();
};
run();

app.get("/", (req, res) => {
  res.send("Hello world");
});
app.get("/viewIdea", (req, res, next) => {
  const ideas = [
    {
      id: 1,
      user: {
        id: 1,
        name: "Bombom1",
        image:
          "https://luv.vn/wp-content/uploads/2021/07/hinh-nen-Pikachu-Cute-2.jpg",
      },
      content: "Lorem ipsum dolor sit amet, consectetur1",
      time: "3 minutes ago",
      private: true,
      image:
        "https://images.unsplash.com/photo-1646940752433-1178ed81ef41?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
      like: [
        {
          id: 1,
          avatar:
            "https://media.istockphoto.com/photos/asian-chinese-beautiful-woman-sitting-at-corner-of-the-caf-working-picture-id1281786194?b=1&k=20&m=1281786194&s=170667a&w=0&h=okuaJ2Ji_UGn_xmbkpNPBwHMVgI63v8TTZtAOpUAres=",
          name: "Nguyen Thac Huy",
          email: "user1@gmail.com",
          phone: "0123456789",
          address: "Hà Nội",
          role: "staff",
        },
        {
          id: 2,
          avatar:
            "https://media.istockphoto.com/photos/asian-chinese-beautiful-woman-sitting-at-corner-of-the-caf-working-picture-id1281786194?b=1&k=20&m=1281786194&s=170667a&w=0&h=okuaJ2Ji_UGn_xmbkpNPBwHMVgI63v8TTZtAOpUAres=",
          name: "Johny Nguyen",
          email: "user2@gmail.com",
          phone: "0123456789",
          address: "Hà Nội",
          role: "staff",
        },
        {
          id: 3,
          avatar:
            "https://media.istockphoto.com/photos/asian-chinese-beautiful-woman-sitting-at-corner-of-the-caf-working-picture-id1281786194?b=1&k=20&m=1281786194&s=170667a&w=0&h=okuaJ2Ji_UGn_xmbkpNPBwHMVgI63v8TTZtAOpUAres=",
          name: "Ha Phuong",
          email: "user3@gmail.com",
          phone: "0123456789",
          address: "Sài Gòn",
          role: "qualityAssuranceManager",
        },
        {
          id: 4,
          avatar:
            "https://media.istockphoto.com/photos/asian-chinese-beautiful-woman-sitting-at-corner-of-the-caf-working-picture-id1281786194?b=1&k=20&m=1281786194&s=170667a&w=0&h=okuaJ2Ji_UGn_xmbkpNPBwHMVgI63v8TTZtAOpUAres=",
          name: "Nguyen Thao Phuong",
          email: "user4@gmail.com",
          phone: "0123456789",
          address: "Hà Nội",
          role: "qualityAssuranceManager",
        },
        {
          id: 5,
          avatar:
            "https://media.istockphoto.com/photos/asian-chinese-beautiful-woman-sitting-at-corner-of-the-caf-working-picture-id1281786194?b=1&k=20&m=1281786194&s=170667a&w=0&h=okuaJ2Ji_UGn_xmbkpNPBwHMVgI63v8TTZtAOpUAres=",
          name: "Tran The Vinh",
          email: "user5@gmail.com",
          phone: "0123456789",
          address: "Hà Nội",
          role: "qualityAssuranceManager",
        },
        {
          id: 6,
          avatar:
            "https://media.istockphoto.com/photos/asian-chinese-beautiful-woman-sitting-at-corner-of-the-caf-working-picture-id1281786194?b=1&k=20&m=1281786194&s=170667a&w=0&h=okuaJ2Ji_UGn_xmbkpNPBwHMVgI63v8TTZtAOpUAres=",
          name: "Luong Xuan Truong",
          email: "user6@gmail.com",
          phone: "0123456789",
          address: "Hà Nội",
          role: "qualityAssuranceManager",
        },
        {
          id: 7,
          avatar:
            "https://media.istockphoto.com/photos/asian-chinese-beautiful-woman-sitting-at-corner-of-the-caf-working-picture-id1281786194?b=1&k=20&m=1281786194&s=170667a&w=0&h=okuaJ2Ji_UGn_xmbkpNPBwHMVgI63v8TTZtAOpUAres=",
          name: "Luong Xuan Hieu",
          email: "user7@gmail.com",
          phone: "0123456789",
          address: "Hà Nội",
          role: "qualityAssuranceCoordinator",
        },
        {
          id: 8,
          avatar:
            "https://media.istockphoto.com/photos/asian-chinese-beautiful-woman-sitting-at-corner-of-the-caf-working-picture-id1281786194?b=1&k=20&m=1281786194&s=170667a&w=0&h=okuaJ2Ji_UGn_xmbkpNPBwHMVgI63v8TTZtAOpUAres=",
          name: "Nguyen Phuong Thao Nguyen",
          email: "user8@gmail.com",
          phone: "0123456789",
          address: "Hà Nội",
          role: "qualityAssuranceManager",
        },
        {
          id: 9,
          avatar:
            "https://media.istockphoto.com/photos/asian-chinese-beautiful-woman-sitting-at-corner-of-the-caf-working-picture-id1281786194?b=1&k=20&m=1281786194&s=170667a&w=0&h=okuaJ2Ji_UGn_xmbkpNPBwHMVgI63v8TTZtAOpUAres=",
          name: "Luong Xuan Truong",
          email: "user9@gmail.com",
          phone: "0123456789",
          address: "Hà Nội",
          role: "qualityAssuranceCoordinator",
        },
        {
          id: 10,
          avatar:
            "https://media.istockphoto.com/photos/asian-chinese-beautiful-woman-sitting-at-corner-of-the-caf-working-picture-id1281786194?b=1&k=20&m=1281786194&s=170667a&w=0&h=okuaJ2Ji_UGn_xmbkpNPBwHMVgI63v8TTZtAOpUAres=",
          name: "Luong Xuan Truong",
          email: "user10@gmail.com",
          phone: "0123456789",
          address: "Hà Nội",
          role: "staff",
        },
        {
          id: 11,
          avatar:
            "https://media.istockphoto.com/photos/asian-chinese-beautiful-woman-sitting-at-corner-of-the-caf-working-picture-id1281786194?b=1&k=20&m=1281786194&s=170667a&w=0&h=okuaJ2Ji_UGn_xmbkpNPBwHMVgI63v8TTZtAOpUAres=",
          name: "Tran Thanh",
          email: "user11@gmail.com",
          phone: "0123456789",
          address: "Hà Nội",
          role: "qualityAssuranceCoordinator",
        },
        {
          id: 12,
          avatar:
            "https://media.istockphoto.com/photos/asian-chinese-beautiful-woman-sitting-at-corner-of-the-caf-working-picture-id1281786194?b=1&k=20&m=1281786194&s=170667a&w=0&h=okuaJ2Ji_UGn_xmbkpNPBwHMVgI63v8TTZtAOpUAres=",
          name: "Xuan Truong",
          email: "user12@gmail.com",
          phone: "0123456789",
          address: "Hà Nội",
          role: "staff",
        },
      ],
      dislike: [
        {
          id: 13,
          avatar:
            "https://media.istockphoto.com/photos/asian-chinese-beautiful-woman-sitting-at-corner-of-the-caf-working-picture-id1281786194?b=1&k=20&m=1281786194&s=170667a&w=0&h=okuaJ2Ji_UGn_xmbkpNPBwHMVgI63v8TTZtAOpUAres=",
          name: "Khoa Bug",
          email: "user13@gmail.com",
          phone: "0123456789",
          address: "Hà Nội",
          role: "staff",
        },
        {
          id: 14,
          avatar:
            "https://media.istockphoto.com/photos/asian-chinese-beautiful-woman-sitting-at-corner-of-the-caf-working-picture-id1281786194?b=1&k=20&m=1281786194&s=170667a&w=0&h=okuaJ2Ji_UGn_xmbkpNPBwHMVgI63v8TTZtAOpUAres=",
          name: "Johny Dang",
          email: "user13@gmail.com",
          phone: "0123456789",
          address: "Hà Nội",
          role: "staff",
        },
        {
          id: 15,
          avatar:
            "https://media.istockphoto.com/photos/asian-chinese-beautiful-woman-sitting-at-corner-of-the-caf-working-picture-id1281786194?b=1&k=20&m=1281786194&s=170667a&w=0&h=okuaJ2Ji_UGn_xmbkpNPBwHMVgI63v8TTZtAOpUAres=",
          name: "Vuong Pham",
          email: "user13@gmail.com",
          phone: "0123456789",
          address: "Hà Nội",
          role: "staff",
        },
        {
          id: 16,
          avatar:
            "https://media.istockphoto.com/photos/asian-chinese-beautiful-woman-sitting-at-corner-of-the-caf-working-picture-id1281786194?b=1&k=20&m=1281786194&s=170667a&w=0&h=okuaJ2Ji_UGn_xmbkpNPBwHMVgI63v8TTZtAOpUAres=",
          name: "Nguyen Duc Huy",
          email: "user13@gmail.com",
          phone: "0123456789",
          address: "Hà Nội",
          role: "staff",
        },
        {
          id: 17,
          avatar:
            "https://media.istockphoto.com/photos/asian-chinese-beautiful-woman-sitting-at-corner-of-the-caf-working-picture-id1281786194?b=1&k=20&m=1281786194&s=170667a&w=0&h=okuaJ2Ji_UGn_xmbkpNPBwHMVgI63v8TTZtAOpUAres=",
          name: "Tran Thanh",
          email: "user13@gmail.com",
          phone: "0123456789",
          address: "Hà Nội",
          role: "staff",
        },
        {
          id: 18,
          avatar:
            "https://media.istockphoto.com/photos/asian-chinese-beautiful-woman-sitting-at-corner-of-the-caf-working-picture-id1281786194?b=1&k=20&m=1281786194&s=170667a&w=0&h=okuaJ2Ji_UGn_xmbkpNPBwHMVgI63v8TTZtAOpUAres=",
          name: "Ta Quang Minh",
          email: "user13@gmail.com",
          phone: "0123456789",
          address: "Hà Nội",
          role: "staff",
        },
        {
          id: 19,
          avatar:
            "https://media.istockphoto.com/photos/asian-chinese-beautiful-woman-sitting-at-corner-of-the-caf-working-picture-id1281786194?b=1&k=20&m=1281786194&s=170667a&w=0&h=okuaJ2Ji_UGn_xmbkpNPBwHMVgI63v8TTZtAOpUAres=",
          name: "Nguyen Thi Phuong Thao",
          email: "user13@gmail.com",
          phone: "0123456789",
          address: "Hà Nội",
          role: "staff",
        },
        {
          id: 20,
          avatar:
            "https://media.istockphoto.com/photos/asian-chinese-beautiful-woman-sitting-at-corner-of-the-caf-working-picture-id1281786194?b=1&k=20&m=1281786194&s=170667a&w=0&h=okuaJ2Ji_UGn_xmbkpNPBwHMVgI63v8TTZtAOpUAres=",
          name: "Hieu Nguyen",
          email: "user13@gmail.com",
          phone: "0123456789",
          address: "Hà Nội",
          role: "staff",
        },
        {
          id: 21,
          avatar:
            "https://media.istockphoto.com/photos/asian-chinese-beautiful-woman-sitting-at-corner-of-the-caf-working-picture-id1281786194?b=1&k=20&m=1281786194&s=170667a&w=0&h=okuaJ2Ji_UGn_xmbkpNPBwHMVgI63v8TTZtAOpUAres=",
          name: "Tran Thanh",
          email: "user13@gmail.com",
          phone: "0123456789",
          address: "Hà Nội",
          role: "staff",
        },
        {
          id: 22,
          avatar:
            "https://media.istockphoto.com/photos/asian-chinese-beautiful-woman-sitting-at-corner-of-the-caf-working-picture-id1281786194?b=1&k=20&m=1281786194&s=170667a&w=0&h=okuaJ2Ji_UGn_xmbkpNPBwHMVgI63v8TTZtAOpUAres=",
          name: "Tran Thanh",
          email: "user13@gmail.com",
          phone: "0123456789",
          address: "Hà Nội",
          role: "staff",
        },
        {
          id: 23,
          avatar:
            "https://media.istockphoto.com/photos/asian-chinese-beautiful-woman-sitting-at-corner-of-the-caf-working-picture-id1281786194?b=1&k=20&m=1281786194&s=170667a&w=0&h=okuaJ2Ji_UGn_xmbkpNPBwHMVgI63v8TTZtAOpUAres=",
          name: "Tran Thanh",
          email: "user13@gmail.com",
          phone: "0123456789",
          address: "Hà Nội",
          role: "staff",
        },
        {
          id: 24,
          avatar:
            "https://media.istockphoto.com/photos/asian-chinese-beautiful-woman-sitting-at-corner-of-the-caf-working-picture-id1281786194?b=1&k=20&m=1281786194&s=170667a&w=0&h=okuaJ2Ji_UGn_xmbkpNPBwHMVgI63v8TTZtAOpUAres=",
          name: "Tran Thanh",
          email: "user13@gmail.com",
          phone: "0123456789",
          address: "Hà Nội",
          role: "staff",
        },
        {
          id: 25,
          avatar:
            "https://media.istockphoto.com/photos/asian-chinese-beautiful-woman-sitting-at-corner-of-the-caf-working-picture-id1281786194?b=1&k=20&m=1281786194&s=170667a&w=0&h=okuaJ2Ji_UGn_xmbkpNPBwHMVgI63v8TTZtAOpUAres=",
          name: "Tran Thanh",
          email: "user13@gmail.com",
          phone: "0123456789",
          address: "Hà Nội",
          role: "staff",
        },
        {
          id: 26,
          avatar:
            "https://media.istockphoto.com/photos/asian-chinese-beautiful-woman-sitting-at-corner-of-the-caf-working-picture-id1281786194?b=1&k=20&m=1281786194&s=170667a&w=0&h=okuaJ2Ji_UGn_xmbkpNPBwHMVgI63v8TTZtAOpUAres=",
          name: "Tran Thanh",
          email: "user13@gmail.com",
          phone: "0123456789",
          address: "Hà Nội",
          role: "staff",
        },
      ],
      comment: [
        {
          id: "1",
          user: {
            name: "Hoang Son",
            avatar:
              "https://images.unsplash.com/photo-1644982647869-e1337f992828?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
            email: "hoangson@gmail.com",
            phone: "0123456789",
            address: "Hà Nội",
            role: "staff",
          },
          content: "Hello everyone, I am superman",
          time: "2m ago",
          private: true,
        },
        {
          id: "2",
          user: {
            name: "Tram Anh",
            avatar:
              "https://images.unsplash.com/photo-1644982647869-e1337f992828?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
            email: "tramanh@gmail.com",
            phone: "0123456789",
            address: "Hải Phòng",
            role: "staff",
          },
          content:
            "Lorem ipsum dolor sit amet, consectetur orem ipsum dolor sit amet, consectetur orem ipsum dolor sit amet, consectetur 2",
          time: "3m ago",
          private: false,
        },
        {
          id: "3",
          user: {
            name: "Củ Khoai Tây",
            avatar:
              "https://images.unsplash.com/photo-1644982647869-e1337f992828?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
            email: "cukhoaitay@gmail.com",
            phone: "0123456789",
            address: "Hà Nội",
            role: "staff",
          },
          content:
            "Lorem ipsum dolor sit amet, consectetur orem ipsum dolor sit amet, consectetur orem ipsum dolor sit amet, consectetur 2",
          time: "3m ago",
          private: false,
        },
        {
          id: "4",
          user: {
            name: "Củ Khoai Lang",
            avatar:
              "https://images.unsplash.com/photo-1644982647869-e1337f992828?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
            email: "cukhoailang@gmail.com",
            phone: "0123456789",
            address: "Hà Nội",
            role: "staff",
          },
          content:
            "Lorem ipsum dolor sit amet, consectetur orem ipsum dolor sit amet, consectetur orem ipsum dolor sit amet, consectetur 2",
          time: "3m ago",
          private: false,
        },
      ],
    },
    {
      id: 2,
      user: {
        id: 2,
        name: "Bombom2",
        image:
          "https://luv.vn/wp-content/uploads/2021/07/hinh-nen-Pikachu-Cute-2.jpg",
      },
      content: "Lorem ipsum dolor sit amet, consectetur2",
      time: "3 minutes ago",
      private: false,
      image:
        "https://images.unsplash.com/photo-1646940752433-1178ed81ef41?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
      like: [
        {
          id: 1,
          avatar:
            "https://media.istockphoto.com/photos/asian-chinese-beautiful-woman-sitting-at-corner-of-the-caf-working-picture-id1281786194?b=1&k=20&m=1281786194&s=170667a&w=0&h=okuaJ2Ji_UGn_xmbkpNPBwHMVgI63v8TTZtAOpUAres=",
          name: "staff 1",
          email: "user1@gmail.com",
          phone: "0123456789",
          address: "Hà Nội",
          role: "staff",
        },
      ],
      dislike: [
        {
          id: 13,
          avatar:
            "https://media.istockphoto.com/photos/asian-chinese-beautiful-woman-sitting-at-corner-of-the-caf-working-picture-id1281786194?b=1&k=20&m=1281786194&s=170667a&w=0&h=okuaJ2Ji_UGn_xmbkpNPBwHMVgI63v8TTZtAOpUAres=",
          name: "staff 13",
          email: "user1@gmail.com",
          phone: "0123456789",
          address: "Hà Nội",
          role: "staff",
        },
      ],
      comment: [
        {
          id: "1",
          user: {
            name: "user1",
            avatar:
              "https://images.unsplash.com/photo-1644982647869-e1337f992828?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
            email: "user1@gmail.com",
            phone: "0123456789",
            address: "Hà Nội",
            role: "staff",
          },
          content: "Lorem ipsum dolor sit amet, consectetur1",
          time: "2 minutes ago",
          private: false,
        },
        {
          id: "2",
          user: {
            name: "user2",
            avatar:
              "https://images.unsplash.com/photo-1644982647869-e1337f992828?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
            email: "user1@gmail.com",
            phone: "0123456789",
            address: "Hà Nội",
            role: "staff",
          },
          content: "Lorem ipsum dolor sit amet, consectetur1",
          time: "2 minutes ago",
          private: false,
        },
      ],
    },
    {
      id: 3,
      user: {
        id: 3,
        name: "Bombom3",
        image:
          "https://luv.vn/wp-content/uploads/2021/07/hinh-nen-Pikachu-Cute-2.jpg",
      },
      content: "Lorem ipsum dolor sit amet, consectetur3",
      time: "3 minutes ago",
      private: false,
      image:
        "https://images.unsplash.com/photo-1646940752433-1178ed81ef41?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
      like: [
        {
          id: 1,
          avatar:
            "https://media.istockphoto.com/photos/asian-chinese-beautiful-woman-sitting-at-corner-of-the-caf-working-picture-id1281786194?b=1&k=20&m=1281786194&s=170667a&w=0&h=okuaJ2Ji_UGn_xmbkpNPBwHMVgI63v8TTZtAOpUAres=",
          name: "staff 1",
          email: "user1@gmail.com",
          phone: "0123456789",
          address: "Hà Nội",
          role: "staff",
        },
      ],
      dislike: [
        {
          id: 13,
          avatar:
            "https://media.istockphoto.com/photos/asian-chinese-beautiful-woman-sitting-at-corner-of-the-caf-working-picture-id1281786194?b=1&k=20&m=1281786194&s=170667a&w=0&h=okuaJ2Ji_UGn_xmbkpNPBwHMVgI63v8TTZtAOpUAres=",
          name: "staff 1",
          email: "user1@gmail.com",
          phone: "0123456789",
          address: "Hà Nội",
          role: "staff",
        },
      ],
      comment: [],
    },
    {
      id: 4,
      user: {
        id: 4,
        name: "Bombom4",
        image:
          "https://luv.vn/wp-content/uploads/2021/07/hinh-nen-Pikachu-Cute-2.jpg",
      },
      content: "Lorem ipsum dolor sit amet, consectetur4",
      time: "3 minutes ago",
      private: false,
      image:
        "https://images.unsplash.com/photo-1646940752433-1178ed81ef41?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
      like: [],
      dislike: [],
      comment: [
        {
          id: "1",
          user: {
            name: "user1",
            avatar:
              "https://images.unsplash.com/photo-1644982647869-e1337f992828?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
            email: "user1@gmail.com",
            phone: "0123456789",
            address: "Hà Nội",
            role: "staff",
          },
          content: "Lorem ipsum dolor sit amet, consectetur1",
          time: "2 minutes ago",
          private: false,
        },
      ],
    },
    {
      id: 5,
      user: {
        id: 5,
        name: "Bombom5",
        image:
          "https://luv.vn/wp-content/uploads/2021/07/hinh-nen-Pikachu-Cute-2.jpg",
      },
      content: "Lorem ipsum dolor sit amet, consectetur5",
      time: "3 minutes ago",
      private: false,
      image:
        "https://images.unsplash.com/photo-1646940752433-1178ed81ef41?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
      like: [
        {
          id: 1,
          avatar:
            "https://media.istockphoto.com/photos/asian-chinese-beautiful-woman-sitting-at-corner-of-the-caf-working-picture-id1281786194?b=1&k=20&m=1281786194&s=170667a&w=0&h=okuaJ2Ji_UGn_xmbkpNPBwHMVgI63v8TTZtAOpUAres=",
          name: "staff 1",
          email: "user1@gmail.com",
          phone: "0123456789",
          address: "Hà Nội",
          role: "staff",
        },
      ],
      dislike: [
        {
          id: 13,
          avatar:
            "https://media.istockphoto.com/photos/asian-chinese-beautiful-woman-sitting-at-corner-of-the-caf-working-picture-id1281786194?b=1&k=20&m=1281786194&s=170667a&w=0&h=okuaJ2Ji_UGn_xmbkpNPBwHMVgI63v8TTZtAOpUAres=",
          name: "staff 1",
          email: "user1@gmail.com",
          phone: "0123456789",
          address: "Hà Nội",
          role: "staff",
        },
      ],
      comment: [
        {
          id: "1",
          user: {
            name: "user1",
            avatar:
              "https://images.unsplash.com/photo-1644982647869-e1337f992828?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
            email: "user1@gmail.com",
            phone: "0123456789",
            address: "Hà Nội",
            role: "staff",
          },
          content: "Lorem ipsum dolor sit amet, consectetur1",
          time: "2 minutes ago",
          private: false,
        },
      ],
    },
    {
      id: 6,
      user: {
        id: 6,
        name: "Bombom6",
        image:
          "https://luv.vn/wp-content/uploads/2021/07/hinh-nen-Pikachu-Cute-2.jpg",
      },
      content: "Lorem ipsum dolor sit amet, consectetur6",
      time: "3 minutes ago",
      private: false,
      image:
        "https://images.unsplash.com/photo-1646940752433-1178ed81ef41?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
      like: [
        {
          id: 1,
          avatar:
            "https://media.istockphoto.com/photos/asian-chinese-beautiful-woman-sitting-at-corner-of-the-caf-working-picture-id1281786194?b=1&k=20&m=1281786194&s=170667a&w=0&h=okuaJ2Ji_UGn_xmbkpNPBwHMVgI63v8TTZtAOpUAres=",
          name: "staff 1",
          email: "user1@gmail.com",
          phone: "0123456789",
          address: "Hà Nội",
          role: "staff",
        },
      ],
      dislike: [
        {
          id: 13,
          avatar:
            "https://media.istockphoto.com/photos/asian-chinese-beautiful-woman-sitting-at-corner-of-the-caf-working-picture-id1281786194?b=1&k=20&m=1281786194&s=170667a&w=0&h=okuaJ2Ji_UGn_xmbkpNPBwHMVgI63v8TTZtAOpUAres=",
          name: "staff 1",
          email: "user1@gmail.com",
          phone: "0123456789",
          address: "Hà Nội",
          role: "staff",
        },
      ],
      comment: [
        {
          id: "1",
          user: {
            name: "user1",
            avatar:
              "https://images.unsplash.com/photo-1644982647869-e1337f992828?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
            email: "user1@gmail.com",
            phone: "0123456789",
            address: "Hà Nội",
            role: "staff",
          },
          content: "Lorem ipsum dolor sit amet, consectetur1",
          time: "2 minutes ago",
          private: false,
        },
      ],
    },
    {
      id: 7,
      user: {
        id: 7,
        name: "Bombom7",
        image:
          "https://luv.vn/wp-content/uploads/2021/07/hinh-nen-Pikachu-Cute-2.jpg",
      },
      content: "Lorem ipsum dolor sit amet, consectetur7",
      time: "3 minutes ago",
      private: false,
      image:
        "https://images.unsplash.com/photo-1646940752433-1178ed81ef41?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
      like: [
        {
          id: 1,
          avatar:
            "https://media.istockphoto.com/photos/asian-chinese-beautiful-woman-sitting-at-corner-of-the-caf-working-picture-id1281786194?b=1&k=20&m=1281786194&s=170667a&w=0&h=okuaJ2Ji_UGn_xmbkpNPBwHMVgI63v8TTZtAOpUAres=",
          name: "staff 1",
          email: "user1@gmail.com",
          phone: "0123456789",
          address: "Hà Nội",
          role: "staff",
        },
      ],
      dislike: [
        {
          id: 13,
          avatar:
            "https://media.istockphoto.com/photos/asian-chinese-beautiful-woman-sitting-at-corner-of-the-caf-working-picture-id1281786194?b=1&k=20&m=1281786194&s=170667a&w=0&h=okuaJ2Ji_UGn_xmbkpNPBwHMVgI63v8TTZtAOpUAres=",
          name: "staff 1",
          email: "user1@gmail.com",
          phone: "0123456789",
          address: "Hà Nội",
          role: "staff",
        },
      ],
      comment: [
        {
          id: "1",
          user: {
            name: "user1",
            avatar:
              "https://images.unsplash.com/photo-1644982647869-e1337f992828?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
            email: "user1@gmail.com",
            phone: "0123456789",
            address: "Hà Nội",
            role: "staff",
          },
          content: "Lorem ipsum dolor sit amet, consectetur1",
          time: "2 minutes ago",
          private: false,
        },
      ],
    },
    {
      id: 8,
      user: {
        id: 8,
        name: "Bombom8",
        image:
          "https://luv.vn/wp-content/uploads/2021/07/hinh-nen-Pikachu-Cute-2.jpg",
      },
      content: "Lorem ipsum dolor sit amet, consectetur8",
      time: "3 minutes ago",
      private: false,
      image:
        "https://images.unsplash.com/photo-1646940752433-1178ed81ef41?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
      like: [
        {
          id: 1,
          avatar:
            "https://media.istockphoto.com/photos/asian-chinese-beautiful-woman-sitting-at-corner-of-the-caf-working-picture-id1281786194?b=1&k=20&m=1281786194&s=170667a&w=0&h=okuaJ2Ji_UGn_xmbkpNPBwHMVgI63v8TTZtAOpUAres=",
          name: "staff 1",
          email: "user1@gmail.com",
          phone: "0123456789",
          address: "Hà Nội",
          role: "staff",
        },
      ],
      dislike: [
        {
          id: 13,
          avatar:
            "https://media.istockphoto.com/photos/asian-chinese-beautiful-woman-sitting-at-corner-of-the-caf-working-picture-id1281786194?b=1&k=20&m=1281786194&s=170667a&w=0&h=okuaJ2Ji_UGn_xmbkpNPBwHMVgI63v8TTZtAOpUAres=",
          name: "staff 1",
          email: "user1@gmail.com",
          phone: "0123456789",
          address: "Hà Nội",
          role: "staff",
        },
      ],
      comment: [
        {
          id: "1",
          user: {
            name: "user1",
            avatar:
              "https://images.unsplash.com/photo-1644982647869-e1337f992828?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
            email: "user1@gmail.com",
            phone: "0123456789",
            address: "Hà Nội",
            role: "staff",
          },
          content: "Lorem ipsum dolor sit amet, consectetur1",
          time: "2 minutes ago",
          private: false,
        },
      ],
    },
  ];
  const perPage = 4;
  const page = parseInt(req.query.page) || 1;
  const start = (page - 1) * perPage;
  const end = page * perPage;
  res.status(200).json({
    status: "success",
    ideas: ideas.slice(start, end),
  });
});
app.get("/admin/manage", (req, res, next) => {
  const users = [
    {
      id: 1,
      avatar:
        "https://media.istockphoto.com/photos/asian-chinese-beautiful-woman-sitting-at-corner-of-the-caf-working-picture-id1281786194?b=1&k=20&m=1281786194&s=170667a&w=0&h=okuaJ2Ji_UGn_xmbkpNPBwHMVgI63v8TTZtAOpUAres=",
      name: "staff 1",
      email: "user1@gmail.com",
      phone: "0123456789",
      address: "Hà Nội",
      role: "staff",
    },
    {
      id: 2,
      avatar:
        "https://media.istockphoto.com/photos/asian-chinese-beautiful-woman-sitting-at-corner-of-the-caf-working-picture-id1281786194?b=1&k=20&m=1281786194&s=170667a&w=0&h=okuaJ2Ji_UGn_xmbkpNPBwHMVgI63v8TTZtAOpUAres=",
      name: "staff 2",
      email: "user2@gmail.com",
      phone: "0123456789",
      address: "Hà Nội",
      role: "staff",
    },
    {
      id: 3,
      avatar:
        "https://media.istockphoto.com/photos/asian-chinese-beautiful-woman-sitting-at-corner-of-the-caf-working-picture-id1281786194?b=1&k=20&m=1281786194&s=170667a&w=0&h=okuaJ2Ji_UGn_xmbkpNPBwHMVgI63v8TTZtAOpUAres=",
      name: "qualityAssuranceManager 1",
      email: "user3@gmail.com",
      phone: "0123456789",
      address: "Sài Gòn",
      role: "qualityAssuranceManager",
    },
    {
      id: 4,
      avatar:
        "https://media.istockphoto.com/photos/asian-chinese-beautiful-woman-sitting-at-corner-of-the-caf-working-picture-id1281786194?b=1&k=20&m=1281786194&s=170667a&w=0&h=okuaJ2Ji_UGn_xmbkpNPBwHMVgI63v8TTZtAOpUAres=",
      name: "qualityAssuranceManager 2",
      email: "user4@gmail.com",
      phone: "0123456789",
      address: "Hà Nội",
      role: "qualityAssuranceManager",
    },
    {
      id: 5,
      avatar:
        "https://media.istockphoto.com/photos/asian-chinese-beautiful-woman-sitting-at-corner-of-the-caf-working-picture-id1281786194?b=1&k=20&m=1281786194&s=170667a&w=0&h=okuaJ2Ji_UGn_xmbkpNPBwHMVgI63v8TTZtAOpUAres=",
      name: "qualityAssuranceManager 3",
      email: "user5@gmail.com",
      phone: "0123456789",
      address: "Hà Nội",
      role: "qualityAssuranceManager",
    },
    {
      id: 6,
      avatar:
        "https://media.istockphoto.com/photos/asian-chinese-beautiful-woman-sitting-at-corner-of-the-caf-working-picture-id1281786194?b=1&k=20&m=1281786194&s=170667a&w=0&h=okuaJ2Ji_UGn_xmbkpNPBwHMVgI63v8TTZtAOpUAres=",
      name: "qualityAssuranceManager 1",
      email: "user6@gmail.com",
      phone: "0123456789",
      address: "Hà Nội",
      role: "qualityAssuranceManager",
    },
    {
      id: 7,
      avatar:
        "https://media.istockphoto.com/photos/asian-chinese-beautiful-woman-sitting-at-corner-of-the-caf-working-picture-id1281786194?b=1&k=20&m=1281786194&s=170667a&w=0&h=okuaJ2Ji_UGn_xmbkpNPBwHMVgI63v8TTZtAOpUAres=",
      name: "qualityAssuranceCoordinator 2",
      email: "user7@gmail.com",
      phone: "0123456789",
      address: "Hà Nội",
      role: "qualityAssuranceCoordinator",
    },
    {
      id: 8,
      avatar:
        "https://media.istockphoto.com/photos/asian-chinese-beautiful-woman-sitting-at-corner-of-the-caf-working-picture-id1281786194?b=1&k=20&m=1281786194&s=170667a&w=0&h=okuaJ2Ji_UGn_xmbkpNPBwHMVgI63v8TTZtAOpUAres=",
      name: "qualityAssuranceManager 3",
      email: "user8@gmail.com",
      phone: "0123456789",
      address: "Hà Nội",
      role: "qualityAssuranceManager",
    },
    {
      id: 9,
      avatar:
        "https://media.istockphoto.com/photos/asian-chinese-beautiful-woman-sitting-at-corner-of-the-caf-working-picture-id1281786194?b=1&k=20&m=1281786194&s=170667a&w=0&h=okuaJ2Ji_UGn_xmbkpNPBwHMVgI63v8TTZtAOpUAres=",
      name: "qualityAssuranceCoordinator 4",
      email: "user9@gmail.com",
      phone: "0123456789",
      address: "Hà Nội",
      role: "qualityAssuranceCoordinator",
    },
    {
      id: 10,
      avatar:
        "https://media.istockphoto.com/photos/asian-chinese-beautiful-woman-sitting-at-corner-of-the-caf-working-picture-id1281786194?b=1&k=20&m=1281786194&s=170667a&w=0&h=okuaJ2Ji_UGn_xmbkpNPBwHMVgI63v8TTZtAOpUAres=",
      name: "staff 2",
      email: "user10@gmail.com",
      phone: "0123456789",
      address: "Hà Nội",
      role: "staff",
    },
    {
      id: 11,
      avatar:
        "https://media.istockphoto.com/photos/asian-chinese-beautiful-woman-sitting-at-corner-of-the-caf-working-picture-id1281786194?b=1&k=20&m=1281786194&s=170667a&w=0&h=okuaJ2Ji_UGn_xmbkpNPBwHMVgI63v8TTZtAOpUAres=",
      name: "qualityAssuranceCoordinator 2",
      email: "user11@gmail.com",
      phone: "0123456789",
      address: "Hà Nội",
      role: "qualityAssuranceCoordinator",
    },
    {
      id: 12,
      avatar:
        "https://media.istockphoto.com/photos/asian-chinese-beautiful-woman-sitting-at-corner-of-the-caf-working-picture-id1281786194?b=1&k=20&m=1281786194&s=170667a&w=0&h=okuaJ2Ji_UGn_xmbkpNPBwHMVgI63v8TTZtAOpUAres=",
      name: "staff 123",
      email: "user12@gmail.com",
      phone: "0123456789",
      address: "Hà Nội",
      role: "staff",
    },
    {
      id: 13,
      avatar:
        "https://media.istockphoto.com/photos/asian-chinese-beautiful-woman-sitting-at-corner-of-the-caf-working-picture-id1281786194?b=1&k=20&m=1281786194&s=170667a&w=0&h=okuaJ2Ji_UGn_xmbkpNPBwHMVgI63v8TTZtAOpUAres=",
      name: "staff 4334",
      email: "user13@gmail.com",
      phone: "0123456789",
      address: "Hà Nội",
      role: "staff",
    },
  ];
  const page = parseInt(req.query.page) || 1;
  const perPage = 1;
  const start = (page - 1) * perPage;
  const end = page * perPage;
  const role = req.query.role;
  let usersTemp = users;
  if (role === "staff") {
    usersTemp = users.filter((item) => item.role === "staff");
  } else if (role === "qualityAssuranceManager") {
    usersTemp = users.filter((item) => item.role === "qualityAssuranceManager");
  } else if (role === "qualityAssuranceCoordinator") {
    usersTemp = users.filter(
      (item) => item.role === "qualityAssuranceCoordinator"
    );
  }
  let countUser;
  countUser = Math.ceil(usersTemp.length / perPage);
  res.status(200).json({
    status: "status success",
    users: usersTemp.slice(start, end),
    countUser,
  });
});
app.post("/login", (req, res) => {
  const user = req.body.values;
  console.log(user);
  res.json({
    user,
  });
});
app.post("/create-idea", (req, res) => {
  const idea = req.body.data;
  res.json({
    idea,
  });
});
const port = process.env.APP_PORT;
app.listen(port, () => console.log("Server is running !"));
