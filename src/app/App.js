import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import SignIn from "./pages/SignIn/SignIn";
import Taxes from "./pages/Taxes/Taxes";
import Form from "./pages/Tax/Form";
import Submissions from "./pages/Submissions/Submissions";
import ButtonAppBar from "./layouts/AppBar";

const App = () => (
  <BrowserRouter>
    <ButtonAppBar />
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/taxes" element={<Taxes />} />
      <Route path="/submissions" element={<Submissions />} />
      <Route path="/tax/:id" element={<Outlet />}>
        <Route index element={<Form />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
