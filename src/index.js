import React from "react";
import ReactDOM from "react-dom/client";
import { Routes, Route, HashRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import Login from "./routes/login";
import Register from "./routes/register/register";
import Otp from "./routes/register/otp";
import SetInfo from "./routes/register/set_info";
import SetLocation from "./routes/register/set_location";
import Panel from "./routes/institute";
import Drivers from "./routes/institute/drivers";
import Schools from "./routes/institute/schools";
import Students from "./routes/institute/students";
import Services from "./routes/institute/services";
import Travels from "./routes/institute/travels";
import Messages from "./routes/institute/messages";
import Faq from "./routes/institute/faq";
import ForgetPassword from "./routes/forget_password";
import Financial from "./routes/institute/financial";
import Complaints from "./routes/institute/complaints";
import SchoolPanel from "./routes/school";
import SchoolStudents from "./routes/school/students";
import SchoolDrivers from "./routes/school/drivers";
import SchoolsInstitutes from "./routes/school/institutes";
import SchoolTravels from "./routes/school/travels";
import SchoolServices from "./routes/school/services";
import SchoolFinancial from "./routes/school/financial";
import SchoolMessages from "./routes/school/messages";
import SchoolFaq from "./routes/school/faq";
import SchoolComplaints from "./routes/school/complaints";
import Bill from "./routes/institute/bill";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <HashRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="login" element={<Login />} />
            <Route path="forget_password" element={<ForgetPassword />} />
            <Route path="/register/register" element={<Register />} />
            <Route path="/register/otp" element={<Otp />} />
            <Route path="/register/set_info" element={<SetInfo />} />
            <Route path="/register/set_location" element={<SetLocation />} />
            {/* institute */}
            <Route path="/institute" element={<Panel />} />
            <Route path="/institute/drivers" element={<Drivers />} />
            <Route path="/institute/schools" element={<Schools />} />
            <Route path="/institute/students" element={<Students />} />
            <Route path="/institute/services" element={<Services />} />
            <Route path="/institute/travels" element={<Travels />} />
            <Route path="/institute/messages" element={<Messages />} />
            <Route path="/institute/faq" element={<Faq />} />
            <Route path="/institute/financial" element={<Financial />} />
            <Route path="/institute/complaints" element={<Complaints />} />
            <Route path="/institute/bill" element={<Bill />} />
            {/* school */}
            <Route path="/school" element={<SchoolPanel />} />
            <Route path="/school/students" element={<SchoolStudents />} />
            <Route path="/school/drivers" element={<SchoolDrivers />} />
            <Route path="/school/institutes" element={<SchoolsInstitutes />} />
            <Route path="/school/travels" element={<SchoolTravels />} />
            <Route path="/school/services" element={<SchoolServices />} />
            <Route path="/school/financial" element={<SchoolFinancial />} />
            <Route path="/school/messages" element={<SchoolMessages />} />
            <Route path="/school/faq" element={<SchoolFaq />} />
            <Route path="/school/complaints" element={<SchoolComplaints />} />
        </Routes>
    </HashRouter>
);
