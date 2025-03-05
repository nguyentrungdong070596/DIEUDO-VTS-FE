import React, { ChangeEvent, useState } from "react";
import logo from "./logo.svg";
import { Button, TextField } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import Header from "./layout/Header";
import Carousel from "./components/Carousel";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./layout/Footer";
import Kehoachdantau from "./pages/Kehoachdantau";
import Giodieudong from "./pages/Giodieudong";
import Dathangdichvu from "./pages/Dathangdichvu";
import Giadichvu from "./pages/Giadichvu";
import Danhsachhoatieu from "./pages/Danhsachhoatieu";
import Vunghoatieu from "./pages/Vunghoatieu";
import News from "./pages/News";
import Newsdetail from "./pages/Newsdetail";
import Hethongcangbien from "./pages/Hethongcangbien";
import Tuyenluong from "./pages/Tuyenluong";
import Tuyenluongthivai from "./pages/Tuyenluongthivai";
import Tuyenluongsongdinh from "./pages/Tuyenluongsongdinh";
import DetailService from "./pages/DetailService";

// type Todo = { id: string; name: string };

// function App() {
//   const [todolist, SetToDoList] = useState<Todo[]>([]); // state, setState
//   const [newTodoString, setNewTodoString] = useState("");
//   const onNewTodoChange = (e: ChangeEvent<HTMLInputElement>) => {
//     setNewTodoString(e.target.value);
//   };

//   const onAdding = () => {
//     const itemnew = {
//       id: uuidv4(),
//       name: newTodoString,
//     };
//     SetToDoList([...todolist, itemnew]);
//     setNewTodoString("");
//   };
//   console.log({ newTodoString });
//   return (
//     <>
//       <div>
//         <p>this is todo app</p>
//         <TextField
//           value={newTodoString}
//           onChange={onNewTodoChange}
//           id="outlined-basic"
//           label="Outlined"
//           variant="outlined"
//         />
//         <Button variant="contained" onClick={onAdding}>
//           Thêm
//         </Button>
//       </div>

//       <div>
//         {todolist.map((todo) => {
//           return <Todo name={todo.name} />;
//         })}
//       </div>
//     </>
//   );
// }

function App() {
  return (
    <BrowserRouter>
      {/* <div className="bg-green-500 text-white p-5 text-center">
        Tailwind hoạt động!
      </div> */}

      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ke-hoach-dan-tau" element={<Kehoachdantau />} />
        <Route path="/gio-dieu-dong" element={<Giodieudong />} />
        <Route path="/dat-hang-dich-vu" element={<Dathangdichvu />} />
        <Route path="/gia-dich-vu" element={<Giadichvu />} />
        <Route path="/danh-sach-hoa-tieu" element={<Danhsachhoatieu />} />
        <Route path="/vung-hoa-tieu" element={<Vunghoatieu />} />
        <Route path="/tin-tuc" element={<News />} />
        <Route path="/tin-tuc/:id" element={<Newsdetail />} />
        <Route path="/dich-vu/:id" element={<DetailService />} />
        <Route path="/he-thong-cang-bien" element={<Hethongcangbien />} />
        <Route path="/tuyen-luong" element={<Tuyenluong />} />
        <Route path="/tuyen-luong-thi-vai" element={<Tuyenluongthivai />} />
        <Route path="/tuyen-luong-song-dinh" element={<Tuyenluongsongdinh />} />
      </Routes>
      <Footer />

    </BrowserRouter>

    // <>
    //   <Header />
    //   <Carousel />

    //   <footer />
    // </>
  );
}

export default App;
