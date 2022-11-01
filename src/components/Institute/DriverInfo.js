import { useEffect, useState } from "react";
import styled from "styled-components";
import * as shamsi from "shamsi-date-converter";
import axios from "axios";
import { BASE_URL } from "../BaseUrl";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { ChartOne } from "./ServiceChart";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import ServiceInfo from "./ServiceInfo";
import DriverServiceInfo from "./DriverServiceInfo";
import CheckInfo from "./CheckInfo";
import NewCheck from "./NewCheck";
import CashInfo from "./CashInfo"; 
import TravelInfo from "./TravelInfo";

const Main = styled.div`
    padding: 30px 36px;
    .all {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #f3f6f9;
        border-radius: 10px;
        margin-top: 12px;
        padding: 20px;
        h6 {
            font-weight: 700;
            font-size: 14px;
            line-height: 16px;
            text-align: right;
            color: #5e6278;
        }
        span {
            font-weight: 700;
            font-size: 14px;
            line-height: 16px;
            color: #5e6278;
        }
    }
    .bg-red {
        background: #fff5f8 !important;
        color: #f1416c !important;
    }
    .bg-green {
        background: #e8fff3 !important;
        color: #50cd89 !important;
    }
    .Toastify__toast-container {
        white-space: nowrap;
        width: unset !important;
    }
    .img-div {
        display: flex;
    }
    .blue {
        font-weight: 500;
        font-size: 16px;
        line-height: 21px;
        text-align: right;
        color: #3699ff;
    }
    .flex-btns {
        display: flex;
        svg {
            cursor: pointer;
        }
        button {
            margin-right: 10px;
            width: 130px !important;
        }
    }
    .head {
        width: 100%;
        background: #ffffff;
        border-radius: 12px;
        padding: 14px 30px;
        padding-bottom: 0;
        .rows {
            margin-top: 10px;
            display: flex;
            justify-content: space-between;
            width: 100%;
            padding-bottom: 20px;
            border-bottom: 1px solid #eff2f5;
            .right {
                display: flex;
                align-items: center;
                img {
                    margin-left: 22px;
                    border-radius: 6px;
                }
                .name {
                    font-weight: 700;
                    font-size: 19px;
                    line-height: 22px;
                    text-align: right;
                    color: #3f4254;
                    display: block;
                    margin-bottom: 20px;
                }
                .number {
                    font-weight: 700;
                    font-size: 19px;
                    line-height: 22px;
                    text-align: right;
                    color: #3f4254;
                    margin-bottom: 20px;
                    display: block;
                }
                .svgs {
                    display: flex;
                    small {
                        margin: 0 4px;
                        font-weight: 500;
                        font-size: 14px;
                        text-align: right;

                        color: #b5b5c3;
                    }
                }
            }
            .left {
                .btns {
                    display: flex;
                    justify-content: flex-end;
                    button {
                        display: flex;
                        align-items: center;
                        font-weight: 700;
                        font-size: 12px;
                        line-height: 14px;
                        color: #ffffff;
                        height: 34px;
                        border-radius: 6px;
                        margin: 0 6px;
                        padding: 0 14px;
                        svg {
                            margin: 0 9px;
                        }
                    }
                    .p-btn {
                        background: #8950fc;
                    }
                    .r-btn {
                        background: #f64e60;
                    }
                    .g-btn {
                        background: #1bc5bd;
                    }
                }
                .dasheds {
                    display: flex;
                    margin-top: 24px;
                    .div-1 {
                        width: 193px;
                        height: 50px;
                        background: #ffffff;
                        border: 1px dashed #e4e6ef;
                        border-radius: 6px;
                        padding: 14px;
                        font-weight: 900;
                        font-size: 19px;
                        line-height: 22px;
                        display: flex;
                        align-items: center;
                        text-align: right;
                        margin-left: 20px;
                    }
                    .div-2 {
                        width: 193px;
                        height: 50px;
                        background: #ffffff;
                        border: 1px dashed #e4e6ef;
                        border-radius: 6px;
                        padding: 14px;
                        font-weight: 900;
                        font-size: 19px;
                        line-height: 22px;
                        display: flex;
                        align-items: center;
                        text-align: right;
                        color: #3f4254;
                    }
                }
            }
        }
        .tabs {
            display: flex;
            align-items: center;
            .item {
                padding: 18px;
                border-bottom: 2px solid #fff;
                cursor: pointer;
            }
            .active {
                border-bottom: 2px solid #00a3ff;
                color: #00a3ff;
            }
        }
    }
    .cont {
        margin-top: 23px;
        display: flex;
        justify-content: space-between;
        .form-1 {
            background: #ffffff;
            border-radius: 12px;
            margin-bottom: 47px;
            .file {
                width: 100%;
                height: 243px;
                background: #eff2f5;
                border-radius: 6px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .img-s {
                height: 243px;
                border-radius: 6px;
                margin-right: auto;
                margin-left: auto;
            }
            .to-full {
                width: 600px;
                position: fixed;
                top: 50%;
                right: 50%;
                transform: translate(50%, -50%);
            }
            input[type="file"] {
                display: none;
            }
        }
        .head {
            padding: 22px 30px;
            border-bottom: 1px solid #eff2f5;
            display: flex;
            align-items: center;
            justify-content: space-between;
            h6 {
                font-weight: 700;
                font-size: 20px;
                line-height: 23px;
                text-align: right;
                color: #3f4254;
            }
            span {
                font-weight: 500;
                font-size: 16px;
                line-height: 19px;
                color: #a1a5b7;
            }
        }
        form {
            padding: 25px 30px;
        }
        .no-jus {
            width: 50%;
            justify-content: flex-start !important;
        }
        label {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            margin-bottom: 30px;
            font-weight: 500;
            font-size: 15px;
            line-height: 18px;
            text-align: right;
            white-space: nowrap;
            color: #3f4254;
            input {
                background: #f5f8fa;
                border-radius: 6px;
                width: 100%;
                max-width: 359px;

                height: 42px;
                margin: 10px;
            }
            label {
                justify-content: flex-start;
                margin-bottom: 0 !important;
            }
            input[type="radio"] {
                width: 30px;
                height: 30px;
                :first-child {
                    margin-right: 64px;
                }
            }
        }
        .right,
        .left {
            width: 49%;
        }
    }
    .center {
        width: 100%;
        display: flex;
        justify-content: center;
    }
    .sub {
        height: 52px;
        background: #00a3ff;
        border-radius: 6px;
        color: #fff;
        width: 100%;
        margin-right: auto;
        margin-left: auto;
    }
`;

const ChartDiv = styled.div`
    background: #ffffff;
    box-shadow: 0px 0px 20px rgba(76, 87, 125, 0.02);
    border-radius: 12px;
    margin-top: 9px;
    .chart-head {
        border-bottom: 1px solid #eff2f5;
        padding: 22px 30px;
        padding-bottom: 22px;
        h6 {
            font-weight: 700;
            font-size: 20px;
            line-height: 23px;
            text-align: right;
            color: #3f4254;
        }
    }
    .chartt {
        padding: 22px 30px;
        display: flex;
        justify-content: space-between;
        canvas {
            width: 100px !important;
            height: 100px !important;
        }
    }
    .labels {
        display: flex;
        flex-direction: column;
        margin-right: 21px;
        .label {
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            .rec {
                width: 8px;
                height: 3px;
                border-radius: 5px;
            }
            .bg-green {
                background: #50cd89;
            }
            .bg-yellow {
                background: #f1bc00;
            }
            .bg-red {
                background: #f1416c;
            }
            .bg-gray {
                background: #e4e6ef;
            }
            span {
                margin-right: 10px;
                font-weight: 500;
                font-size: 14px;
                line-height: 16px;
                text-align: right;

                color: #b5b5c3;
            }
        }
    }
`;

const Travels = styled.div`
    padding: 27px;
    width: 100%;
    background-color: #fff;
    margin-top: 23px;
    border-radius: 12px;
    .new-td {
        tr {
            border-bottom: 1px dashed #e4e6ef;
        }
        td {
            font-weight: 500;
            font-size: 16px;
            line-height: 21px;
            text-align: right;
            color: #7e8299;
            button {
                display: flex;
            }
        }
    }
    .mt-0 {
        margin-top: 0;
        .head {
            h6 {
                font-weight: 600;
                font-size: 14px;
                line-height: 21px;
                /* identical to box height */

                text-align: right;

                color: #464e5f;
            }
        }
    }
    .img-divs {
        display: flex;
        align-items: center;
        img {
            border-radius: 6px;
        }
    }
    .head {
        padding: 0;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #eff2f5;
        padding-bottom: 12px;
        .right-head {
            display: flex;
            align-items: center;
        }
        .left-head {
            display: flex;
            span {
                display: block;
                cursor: pointer;
                padding: 9px 16px;
                font-weight: 500;
                font-size: 14px;
                color: #b5b5c3;
            }
            .active {
                background: #1bc5bd;
                color: #fff;
                border-radius: 6px;
            }
        }
        h6 {
            font-weight: 600;
            font-size: 20px;
            line-height: 30px;
            color: #3f4254;
        }
        .date,
        .rmdp-input {
            width: 168.27px;
            height: 36px;
            background: #f3f6f9;
            border-radius: 6px;
            display: flex;
            align-items: center;
            margin-right: 10px;
            justify-content: center;
            font-weight: 700;
            font-size: 12px;
            line-height: 14px;
            color: #a1a5b7;

            span {
                margin-right: 16px;
            }
        }
        .date-rel {
            position: relative;

            svg {
                position: absolute;
                right: 26px;
                top: 10px;
            }
            span {
                position: absolute;
                right: 57px;
                top: 11.5px;
                font-weight: 700;
                font-size: 12px;
                line-height: 14px;
                color: #a1a5b7;
            }
        }
        .rmdp-input {
            direction: ltr;
            padding-left: 14px !important;
            border: none !important;
        }
    }
    .travel-btns {
        display: flex;
        align-items: center;
        width: 100%;
        justify-content: flex-end;
        margin-top: 10px;
        button {
            padding: 0 14px;
            height: 35px;
            background: #f3f6f9;
            border-radius: 6px;
            font-weight: 700;
            font-size: 12px;
            line-height: 14px;
            color: #a1a5b7;
            margin-right: 12px;
            svg {
                margin-left: 17px;
            }
        }
        .active {
            background: #1bc5bd;
            color: #fff;
            border-radius: 6px;
        }
    }
`;

const TableDiv = styled.div`
    width: 100%;
    padding: 26px 27px;
    background: #ffffff;
    border-radius: 12px;
    margin-top: 20px;
    .amount-span {
        font-weight: 600;
        font-size: 14px;
        line-height: 21px;
        margin-top: 20px;
        color: #464e5f;
    }
    .head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-bottom: 10px;
        border-bottom: 1px solid #eff2f5;
        margin-bottom: 10px;
        border-radius: 0 !important;

        h6 {
            font-weight: 600;
            font-size: 20px;
            line-height: 30px;
            color: #3f4254;
        }
        .tabs {
            display: flex;
            align-items: center;
            padding: 5px;
            font-weight: 500;
            font-size: 14px;
            line-height: 16px;
            color: #b5b5c3;
            button {
                border-radius: 6px;
                height: 35px;
                padding: 10px 14px;
                background-color: #f3f6f9;
                font-weight: 400;
                font-size: 12px;
                line-height: 14px;
                color: #a1a5b7;
                span {
                    margin-right: 10px;
                }
            }
            .active {
                background: #1bc5bd;
                border-radius: 6px;
                color: #fff;
            }
        }
    }
    table {
        width: 100%;
        thead {
            tr {
                background: #f3f6f9;
                th {
                    :first-child {
                        border-radius: 0 6px 6px 0 !important;
                    }
                    :last-child {
                        border-radius: 6px 0 0 6px !important;
                    }
                    padding: 11px 16px;

                    font-weight: 500;
                    font-size: 16px;
                    line-height: 21px;
                    text-align: right;
                    color: #3f4254;
                }
            }
        }
        tbody {
            tr {
                td {
                    padding: 11px 16px;
                    vertical-align: center;
                    font-size: 13px !important;
                    span {
                        display: block;
                    }
                    .span-1 {
                        margin-right: 16px;
                        font-weight: 600;
                        font-size: 14px;
                        line-height: 21px;
                        text-align: right;
                        color: #464e5f;
                    }
                    .span-2 {
                        margin-right: 16px;
                        font-weight: 500;
                        font-size: 13px;
                        line-height: 20px;
                        text-align: right;
                        margin-top: 3px;
                        color: #b5b5c3;
                    }
                    .images {
                        position: relative;
                        top: -16px;
                        .img-abs {
                            background: #50cd89;
                            width: 34px;
                            height: 34px;
                            border: 1px solid rgba(255, 255, 255, 0.5);
                            border-radius: 30px;
                            color: #fff;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            position: absolute;
                            padding-top: 2px;
                        }
                        .red {
                            background: #f1416c;
                        }
                        .img-1 {
                            left: 20px;
                        }
                        .img-2 {
                            left: 45px;
                        }
                        .img-3 {
                            left: 70px;
                        }
                        .img-4 {
                            left: 95px;
                        }
                    }
                    .progress-div {
                        width: 110px;
                        height: 5px;
                        background: #d7f9ef;
                        border-radius: 5px;
                        .progress-fill {
                            width: 83%;
                            height: 5px;
                            background: #0bb783;
                            border-radius: 5px;
                        }
                    }
                    button {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        padding: 10px;
                        width: 103.69px;
                        height: 32px;
                        background: #f3f6f9;
                        border-radius: 6px;
                        font-weight: 700;
                        font-size: 12px;
                        line-height: 14px;
                        color: #a1a5b7;
                    }
                }
            }
        }
        .status {
            width: 113px;
            height: 32px;
            background: #fff8dd;
            border-radius: 6px;
            font-weight: 400;
            font-size: 12px;
            line-height: 14px;
            text-align: center;
            color: #f1bc00;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .red {
            color: #f64e60;
            background: #ffe2e5 !important;
        }
        .green {
            color: #1bc5bd;
            background: #c9f7f5;
        }
        .w-120 {
            width: 124.69px;
        }
        .w-78 {
            width: 68px;
        }
    }
`;

const Messages = styled.div`
    background: #ffffff;
    border-radius: 12px;
    width: 100%;
    padding: 26px 29px;
    margin-top: 27px;
    .msgs-head {
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #eff2f5;
        padding-bottom: 11px;
        h6 {
            font-weight: 400;
            font-size: 20px;
            line-height: 30px;
            text-align: right;
            color: #3f4254;
        }
        button {
            margin-right: 12px;
            width: 100px;
            height: 35px;
            background: #f3f6f9;
            border-radius: 6px;
            font-weight: 700;
            font-size: 12px;
            line-height: 14px;
            color: #a1a5b7;
            display: flex;
            align-items: center;
            justify-content: center;
            svg {
                margin-left: 10px;
            }
        }
    }
    .msg-content {
        position: relative;
        width: 100%;
        textarea {
            width: 100%;
            height: 293px;
            background: #f3f6f9;
            border-radius: 4px;
            padding: 30px 34px;
            border: none;
            font-weight: 400;
            font-size: 13px;
            line-height: 20px;
            text-align: right;
            color: #3b3b3b;
            resize: none;
            ::placeholder {
                font-weight: 400;
                font-size: 13px;
                line-height: 20px;
                text-align: right;
                color: #b5b5c3;
            }
            :focus {
                outline: 1px solid #c4c4c4;
            }
        }
        .send-div {
            position: absolute;
            bottom: 18px;
            border-top: 1px solid rgba(161, 165, 183, 0.3);
            width: calc(100% - 100px);
            background-color: #f3f6f9;
            right: 50%;
            transform: translateX(50%);
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-top: 16px;
            label {
                font-weight: 500;
                font-size: 14px;
                line-height: 16px;
                text-align: right;
                color: #5e6278;
                display: flex;
                align-items: center;
                margin-left: 22px;
                input {
                    transform: scale(1.3);
                    margin-left: 10px;
                }
            }
            button {
                font-weight: 600;
                font-size: 13px;
                line-height: 20px;
                color: #ffffff;
                width: 70.75px;
                height: 40px;
                background: #1e5cf8;
                opacity: 0.9;
                border-radius: 6px;
            }
        }
    }
    .pm-box {
        width: 100%;
        background: #ffffff;
        border: 1px solid #eff2f5;
        box-shadow: 0px 0px 20px rgba(76, 87, 125, 0.02);
        border-radius: 12px;
        padding: 26px;
        margin-top: 16px;
        .pm-head {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .pm-right {
                display: flex;
                align-items: center;
                img {
                    border-radius: 6px;
                    margin-left: 18px;
                }
                .name {
                    font-weight: 700;
                    font-size: 22px;
                    line-height: 30px;
                    text-align: right;
                    letter-spacing: -0.02em;
                    color: #181c32;
                    display: block;
                }
                .person {
                    display: block;
                    font-weight: 500;
                    font-size: 16px;
                    line-height: 30px;
                    /* identical to box height, or 188% */

                    text-align: right;
                    letter-spacing: -0.02em;

                    color: #b5b5c3;
                }
            }
            .pm-left {
                display: flex;
                flex-direction: column;
                align-items: flex-end;
                .text-box {
                    margin-bottom: 5px;
                    background: #f5f8fa;
                    border-radius: 6px;
                    font-weight: 700;
                    font-size: 12px;
                    line-height: 14px;
                    color: #a1a5b7;
                    padding: 6px 11px;
                }
            }
        }
        p {
            margin-top: 25px;
            font-weight: 400;
            font-size: 16px;
            line-height: 24px;
            text-align: justify;
            color: #7e8299;
        }
    }
`;

const DeleteModal = styled.div`
    position: fixed;
    right: 50%;
    top: 50%;
    width: 500px;
    height: 200px;
    z-index: 99999;
    transform: translate(50%, -50%);
    background-color: #fff;
    border: 1px solid #dcdcdc;
    border-radius: 12px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    span {
        font-weight: 500;
    }
    .btns {
        margin-top: 40px;
        display: flex;
        align-items: center;
        .btn-danger {
            width: 100px;
        }
        .cancles {
            margin-left: 16px;
            width: 100px;
        }
    }
`;

const DriverInfo = (props) => {
    const [activeTab, setActiveTab] = useState(1);
    const [toFull, setToFull] = useState(false);
    const [name, setName] = useState("");

    const [lastName, setLastName] = useState("");
    const [fatherName, setFatherName] = useState("");
    const [gender, setGender] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [duty, setDuty] = useState("");
    const [birthDay, setBirthDay] = useState("");
    const [nationalCode, setNationalCode] = useState("");
    const [shenas, setShenas] = useState("");
    const [issuanceCity, setIssuanceCity] = useState("");
    const [marry, setMarry] = useState("");
    const [email, setEmail] = useState("");
    const [sheba, setSheba] = useState("");
    const [bank, setBank] = useState("");
    const [sooImg, setSooImg] = useState("");
    const [issuanceCertificateDate, setIssuanceCertificateDate] = useState("");
    const [certificateExpireDate, setCertificateExpireDate] = useState("");
    const [certificateType, setCertificateType] = useState("");
    const [certificateImg, setCertificateImg] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [constPhone, setConstPhone] = useState("");
    const [location, setLocation] = useState("");

    // Car
    const [model, setModel] = useState("");
    const [pelakType, setPelakType] = useState("");
    const [pelak, setPelak] = useState("");
    const [color, setColor] = useState("");
    const [construcYear, setConstrucYear] = useState("");
    const [ownerName, setOwnerName] = useState("");
    const [ownerNationalCode, setOwnerNationalCode] = useState("");
    const [cartImg, setCartImg] = useState("");
    const [bimeh, setBimeh] = useState("");
    const [examinExpireDate, setExaminExpireDate] = useState("");

    useEffect(() => {
        if (props.data.Driver !== undefined) {
            setName(props.data.Driver.name);
            setLastName(props.data.Driver.l_name);
            setFatherName(props.data.Driver.father_name);
            setGender(props.data.Driver.gender);
            setPhoneNumber(props.data.Driver.phone_number);
            setDuty(props.data.Driver.duty_system_status);
            setBirthDay(props.data.Driver.date_birth);
            setNationalCode(props.data.Driver.national_code);
            setShenas(props.data.Driver.identification_code);
            setIssuanceCity(props.data.Driver.exporting_city);
            setMarry(props.data.Driver.marital_status);
            setEmail(props.data.Driver.email);
            setSheba(props.data.Driver.shaba_number);
            setBank(props.data.Driver.bank_name);
            setSooImg(props.data.Driver.l_name);
            setIssuanceCertificateDate(props.data.Driver.certificate_issu_date);
            setCertificateExpireDate(
                props.data.Driver.certificate_validity_per
            );
            setCertificateType(props.data.Driver.certificate_type);
            setCertificateImg(props.data.Driver.certificate_image);
            setState(props.data.Driver.state);
            setCity(props.data.Driver.city);
            setAddress(props.data.Driver.address);
            setConstPhone(props.data.Driver.const_phone);
            setLocation(props.data.Driver.map_driver);

            // Car
            setModel(props.data.CarDriver.model);
            setPelakType(props.data.CarDriver.type_plates);
            setPelak(props.data.CarDriver.number_plates);
            setColor(props.data.CarDriver.color);
            setConstrucYear(props.data.CarDriver.year_construction);
            setOwnerName(props.data.CarDriver.name_car_owner);
            setOwnerNationalCode(props.data.CarDriver.national_code_owner);
            setCartImg(props.data.CarDriver.car_cart_image);
            setBimeh(props.data.CarDriver.insurance_image);
            setExaminExpireDate(props.data.CarDriver.expiry_date_tech_examin);
        }
    }, [props]);
    const [travelTabActive, setTravelTabActive] = useState(1);

    // Confirm
    const confirmHandler = (e) => {
        let data = new FormData();
        data.append("id_request", props.idtoreq);
        data.append("type", "ok");
        let config = {
            method: "POST",
            url: `${BASE_URL}reject-or-accept-request-driver-for/institution`,
            data: data,
        };
        axios(config).then((response) => {
            toast.success("راننده با موفقیت تایید شد.", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        });
    };
    // Regect
    const rejectHandler = (e) => {
        let data = new FormData();
        data.append("id_request", props.idtoreq);
        data.append("type", "reject");
        let config = {
            method: "POST",
            url: `${BASE_URL}reject-or-accept-request-driver-for/institution`,
            data: data,
        };
        axios(config).then((response) => {
            toast.error("رد درخواست انجام شد.", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        });
    };

    // Breach
    const breachHandler = (e) => {
        let data = new FormData();
        data.append("id_request", props.idtoreq);
        data.append("type", "breach");
        let config = {
            method: "POST",
            url: `${BASE_URL}reject-or-accept-request-driver-for/institution`,
            data: data,
        };
        axios(config).then((response) => {
            toast.success("وضعیت راننده به نقص اطلاعات تغییر یافت.", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        });
    };
    const [showCom, setShowCom] = useState(false);

    const [startDate, setStartDate] = useState(new Date());
    function handleStart(vals) {
        setStartDate(vals.toDate());
    }
    const [endDate, setEndDate] = useState(new Date());
    function handleEnd(vals) {
        setEndDate(vals.toDate());
    }

    let all = 0;

    props.data.TransactionCashForDriver !== undefined &&
        props.data.TransactionCashForDriver.map((item) => {
            all += Number(item.check_amount);
        });
    props.data.TransactionCheckForDriver !== undefined &&
        props.data.TransactionCheckForDriver.map((item) => {
            all += Number(item.check_amount);
        });
    //

    const [showNewCheck, setShowNewCheck] = useState(false);

    const [showDet, setShowDet] = useState(false);
    const [showCashDet, setShowCashDet] = useState(false);

    const [item, setItem] = useState([]);
    const [cashItem, setCashItem] = useState([]);
    const [itemToDelete, setItemToDelete] = useState();
    const removeServiceHandler = () => {
        let data = new FormData();
        data.append("service_id", itemToDelete);
        let config = {
            method: "POST",
            url: `${BASE_URL}delete/service`,
            data: data,
        };
        axios(config).then((response) => {
            props.refresh();
            setDeleteModal(false);
            toast.success("سرویس با موفقیت حذف شد.", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        });
    };

    const [serviceDet, setServiceDet] = useState([]);
    const [deleteModal, setDeleteModal] = useState(false);
    const [showTravel, setShowTravel] = useState(false);
    const [tripItem, setTripItem] = useState([]);

    return showTravel ? (
        <TravelInfo
            infoid={props.infoid}
            item={tripItem}
            setshow={setShowTravel}
        />
    ) : (
        <Main>
            {deleteModal && (
                <DeleteModal>
                    <span>آیا از حذف این سرویس مطمئن هستید ؟</span>
                    <div className="btns">
                        <button
                            onClick={() => {
                                setDeleteModal(false);
                            }}
                            className="cancles btn btn-info"
                        >
                            انصراف
                        </button>
                        <button
                            onClick={removeServiceHandler}
                            className="btn btn-danger"
                        >
                            حذف
                        </button>
                    </div>
                </DeleteModal>
            )}
            {showNewCheck && <NewCheck setshow={setShowNewCheck} />}
            {showCom ? (
                <DriverServiceInfo
                    setshow={setShowCom}
                    car={props.car}
                    remove={removeServiceHandler}
                    infoid={props.infoid}
                    driver={props.driver}
                    data={serviceDet}
                />
            ) : (
                <>
                    <div className="head">
                        <svg
                            onClick={() => {
                                props.setshow(false);
                            }}
                            className="c-p"
                            width="21"
                            height="16"
                            viewBox="0 0 21 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M12.2241 14.3758C11.9271 14.6645 11.9204 15.1393 12.2091 15.4363C12.4978 15.7334 12.9727 15.7401 13.2697 15.4514L12.2241 14.3758ZM20.3817 8.53777C20.6787 8.24905 20.6854 7.77423 20.3967 7.47722C20.1079 7.18021 19.6331 7.17349 19.3361 7.46222L20.3817 8.53777ZM19.3361 8.53777C19.6331 8.82649 20.1079 8.81978 20.3967 8.52277C20.6854 8.22576 20.6787 7.75094 20.3817 7.46222L19.3361 8.53777ZM13.2697 0.548635C12.9727 0.259913 12.4978 0.266631 12.2091 0.563638C11.9204 0.860645 11.9271 1.33547 12.2241 1.62419L13.2697 0.548635ZM19.8589 8.74999C20.2731 8.74999 20.6089 8.41421 20.6089 7.99999C20.6089 7.58578 20.2731 7.24999 19.8589 7.24999V8.74999ZM0.893551 7.24999C0.479338 7.24999 0.143551 7.58578 0.143551 7.99999C0.143551 8.41421 0.479338 8.74999 0.893551 8.74999V7.24999ZM13.2697 15.4514L20.3817 8.53777L19.3361 7.46222L12.2241 14.3758L13.2697 15.4514ZM20.3817 7.46222L13.2697 0.548635L12.2241 1.62419L19.3361 8.53777L20.3817 7.46222ZM19.8589 7.24999L0.893551 7.24999V8.74999L19.8589 8.74999V7.24999Z"
                                fill="#2B2B2B"
                            ></path>
                        </svg>
                        <div className="rows">
                            <div className="right">
                                <img
                                    src={
                                        props.data.Driver !== undefined &&
                                        props.data.Driver.profile_image
                                    }
                                    width={122}
                                    height={122}
                                    alt=""
                                />
                                <div>
                                    <span className="name">
                                        {props.data.Driver !== undefined &&
                                            props.data.Driver.name}
                                    </span>
                                    <span className="number">
                                        {props.data.Driver !== undefined &&
                                            props.data.Driver.phone_number}
                                    </span>
                                    <span className="svgs">
                                        <svg
                                            width="14"
                                            height="14"
                                            viewBox="0 0 14 14"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M9.91683 3.50065C9.91683 5.11148 8.61099 6.41732 7.00016 6.41732C5.38933 6.41732 4.0835 5.11148 4.0835 3.50065C4.0835 1.88982 5.38933 0.583984 7.00016 0.583984C8.61099 0.583984 9.91683 1.88982 9.91683 3.50065Z"
                                                fill="#3699FF"
                                            />
                                            <path
                                                opacity="0.25"
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M10.9772 8.23869C10.6176 7.82179 9.99998 7.84327 9.51705 8.1076C8.76973 8.51665 7.91202 8.7492 7 8.7492C6.08798 8.7492 5.23027 8.51665 4.48295 8.1076C4.00001 7.84327 3.38241 7.82179 3.02284 8.23869C2.22963 9.15835 1.75 10.3561 1.75 11.6659V12.2492C1.75 12.8935 2.27233 13.4159 2.91667 13.4159H11.0833C11.7277 13.4159 12.25 12.8935 12.25 12.2492V11.6659C12.25 10.3561 11.7704 9.15835 10.9772 8.23869Z"
                                                fill="#3699FF"
                                            />
                                        </svg>
                                        <small>راننده</small>
                                        <small>
                                            {props.data.Driver !== undefined &&
                                                props.data.Driver
                                                    .score_driver !==
                                                    undefined &&
                                                props.data.Driver.score_driver}
                                        </small>
                                        <svg
                                            width="12"
                                            height="12"
                                            viewBox="0 0 12 12"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M5.5744 9.66045L2.85148 11.092C2.52559 11.2633 2.1225 11.138 1.95117 10.8121C1.88294 10.6823 1.8594 10.5337 1.88418 10.3892L2.40421 7.35717L0.201326 5.20989C-0.0623298 4.95288 -0.0677247 4.53081 0.189276 4.26715C0.291615 4.16216 0.42571 4.09384 0.570801 4.07276L3.61512 3.63039L4.97658 0.871772C5.13953 0.541602 5.53928 0.406043 5.86945 0.568991C6.00092 0.633878 6.10734 0.740296 6.17223 0.871772L7.53369 3.63039L10.578 4.07276C10.9424 4.1257 11.1948 4.464 11.1419 4.82836C11.1208 4.97345 11.0525 5.10755 10.9475 5.20989L8.74459 7.35717L9.26462 10.3892C9.32686 10.7521 9.08314 11.0967 8.72025 11.159C8.57574 11.1837 8.4271 11.1602 8.29732 11.092L5.5744 9.66045Z"
                                                fill="#FFA800"
                                            />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                            <div className="left">
                                <div className="btns">
                                    <button
                                        className="p-btn"
                                        onClick={breachHandler}
                                    >
                                        نقص اطلاعات
                                        <svg
                                            width="16"
                                            height="15"
                                            viewBox="0 0 16 15"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                opacity="0.25"
                                                d="M8.89106 9.67027C8.99872 8.92033 9.612 8.33526 10.3981 8.23256C10.849 8.17365 11.3387 8.125 11.7264 8.125C12.1142 8.125 12.6039 8.17365 13.0547 8.23256C13.8408 8.33526 14.4541 8.92033 14.5618 9.67027C14.6235 10.1004 14.6745 10.5676 14.6745 10.9375C14.6745 11.3074 14.6235 11.7746 14.5618 12.2047C14.4541 12.9547 13.8408 13.5397 13.0547 13.6424C12.6039 13.7014 12.1142 13.75 11.7264 13.75C11.3387 13.75 10.849 13.7014 10.3981 13.6424C9.612 13.5397 8.99872 12.9547 8.89106 12.2047C8.82931 11.7746 8.77832 11.3074 8.77832 10.9375C8.77832 10.5676 8.82931 10.1004 8.89106 9.67027Z"
                                                fill="white"
                                            />
                                            <path
                                                opacity="0.25"
                                                d="M1.68452 9.67027C1.79218 8.92033 2.40546 8.33526 3.19155 8.23256C3.64242 8.17365 4.13215 8.125 4.51988 8.125C4.90761 8.125 5.39734 8.17365 5.84821 8.23256C6.6343 8.33526 7.24758 8.92033 7.35524 9.67027C7.41699 10.1004 7.46798 10.5676 7.46798 10.9375C7.46798 11.3074 7.41699 11.7746 7.35524 12.2047C7.24758 12.9547 6.6343 13.5397 5.84821 13.6424C5.39734 13.7014 4.90761 13.75 4.51988 13.75C4.13215 13.75 3.64242 13.7014 3.19155 13.6424C2.40546 13.5397 1.79218 12.9547 1.68452 12.2047C1.62277 11.7746 1.57178 11.3074 1.57178 10.9375C1.57178 10.5676 1.62277 10.1004 1.68452 9.67027Z"
                                                fill="white"
                                            />
                                            <path
                                                opacity="0.25"
                                                d="M8.89106 2.79527C8.99872 2.04533 9.612 1.46026 10.3981 1.35756C10.849 1.29865 11.3387 1.25 11.7264 1.25C12.1142 1.25 12.6039 1.29865 13.0547 1.35756C13.8408 1.46026 14.4541 2.04533 14.5618 2.79527C14.6235 3.2254 14.6745 3.6926 14.6745 4.0625C14.6745 4.4324 14.6235 4.8996 14.5618 5.32973C14.4541 6.07967 13.8408 6.66474 13.0547 6.76744C12.6039 6.82635 12.1142 6.875 11.7264 6.875C11.3387 6.875 10.849 6.82635 10.3981 6.76744C9.612 6.66474 8.99872 6.07967 8.89106 5.32973C8.82931 4.8996 8.77832 4.4324 8.77832 4.0625C8.77832 3.6926 8.82931 3.2254 8.89106 2.79527Z"
                                                fill="white"
                                            />
                                            <path
                                                d="M1.68452 2.79527C1.79218 2.04533 2.40546 1.46026 3.19155 1.35756C3.64242 1.29865 4.13215 1.25 4.51988 1.25C4.90761 1.25 5.39734 1.29865 5.84821 1.35756C6.6343 1.46026 7.24758 2.04533 7.35524 2.79527C7.41699 3.2254 7.46798 3.6926 7.46798 4.0625C7.46798 4.4324 7.41699 4.8996 7.35524 5.32973C7.24758 6.07967 6.6343 6.66474 5.84821 6.76744C5.39734 6.82635 4.90761 6.875 4.51988 6.875C4.13215 6.875 3.64242 6.82635 3.19155 6.76744C2.40546 6.66474 1.79218 6.07967 1.68452 5.32973C1.62277 4.8996 1.57178 4.4324 1.57178 4.0625C1.57178 3.6926 1.62277 3.2254 1.68452 2.79527Z"
                                                fill="white"
                                            />
                                        </svg>
                                    </button>
                                    <button
                                        className="r-btn"
                                        onClick={rejectHandler}
                                    >
                                        رد درخواست
                                        <svg
                                            width="16"
                                            height="15"
                                            viewBox="0 0 16 15"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                opacity="0.25"
                                                d="M8.89106 9.67027C8.99872 8.92033 9.612 8.33526 10.3981 8.23256C10.849 8.17365 11.3387 8.125 11.7264 8.125C12.1142 8.125 12.6039 8.17365 13.0547 8.23256C13.8408 8.33526 14.4541 8.92033 14.5618 9.67027C14.6235 10.1004 14.6745 10.5676 14.6745 10.9375C14.6745 11.3074 14.6235 11.7746 14.5618 12.2047C14.4541 12.9547 13.8408 13.5397 13.0547 13.6424C12.6039 13.7014 12.1142 13.75 11.7264 13.75C11.3387 13.75 10.849 13.7014 10.3981 13.6424C9.612 13.5397 8.99872 12.9547 8.89106 12.2047C8.82931 11.7746 8.77832 11.3074 8.77832 10.9375C8.77832 10.5676 8.82931 10.1004 8.89106 9.67027Z"
                                                fill="white"
                                            />
                                            <path
                                                opacity="0.25"
                                                d="M1.68452 9.67027C1.79218 8.92033 2.40546 8.33526 3.19155 8.23256C3.64242 8.17365 4.13215 8.125 4.51988 8.125C4.90761 8.125 5.39734 8.17365 5.84821 8.23256C6.6343 8.33526 7.24758 8.92033 7.35524 9.67027C7.41699 10.1004 7.46798 10.5676 7.46798 10.9375C7.46798 11.3074 7.41699 11.7746 7.35524 12.2047C7.24758 12.9547 6.6343 13.5397 5.84821 13.6424C5.39734 13.7014 4.90761 13.75 4.51988 13.75C4.13215 13.75 3.64242 13.7014 3.19155 13.6424C2.40546 13.5397 1.79218 12.9547 1.68452 12.2047C1.62277 11.7746 1.57178 11.3074 1.57178 10.9375C1.57178 10.5676 1.62277 10.1004 1.68452 9.67027Z"
                                                fill="white"
                                            />
                                            <path
                                                opacity="0.25"
                                                d="M8.89106 2.79527C8.99872 2.04533 9.612 1.46026 10.3981 1.35756C10.849 1.29865 11.3387 1.25 11.7264 1.25C12.1142 1.25 12.6039 1.29865 13.0547 1.35756C13.8408 1.46026 14.4541 2.04533 14.5618 2.79527C14.6235 3.2254 14.6745 3.6926 14.6745 4.0625C14.6745 4.4324 14.6235 4.8996 14.5618 5.32973C14.4541 6.07967 13.8408 6.66474 13.0547 6.76744C12.6039 6.82635 12.1142 6.875 11.7264 6.875C11.3387 6.875 10.849 6.82635 10.3981 6.76744C9.612 6.66474 8.99872 6.07967 8.89106 5.32973C8.82931 4.8996 8.77832 4.4324 8.77832 4.0625C8.77832 3.6926 8.82931 3.2254 8.89106 2.79527Z"
                                                fill="white"
                                            />
                                            <path
                                                d="M1.68452 2.79527C1.79218 2.04533 2.40546 1.46026 3.19155 1.35756C3.64242 1.29865 4.13215 1.25 4.51988 1.25C4.90761 1.25 5.39734 1.29865 5.84821 1.35756C6.6343 1.46026 7.24758 2.04533 7.35524 2.79527C7.41699 3.2254 7.46798 3.6926 7.46798 4.0625C7.46798 4.4324 7.41699 4.8996 7.35524 5.32973C7.24758 6.07967 6.6343 6.66474 5.84821 6.76744C5.39734 6.82635 4.90761 6.875 4.51988 6.875C4.13215 6.875 3.64242 6.82635 3.19155 6.76744C2.40546 6.66474 1.79218 6.07967 1.68452 5.32973C1.62277 4.8996 1.57178 4.4324 1.57178 4.0625C1.57178 3.6926 1.62277 3.2254 1.68452 2.79527Z"
                                                fill="white"
                                            />
                                        </svg>
                                    </button>
                                    <button
                                        className="g-btn"
                                        onClick={confirmHandler}
                                    >
                                        تایید
                                        <svg
                                            width="16"
                                            height="15"
                                            viewBox="0 0 16 15"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                opacity="0.25"
                                                d="M8.89106 9.67027C8.99872 8.92033 9.612 8.33526 10.3981 8.23256C10.849 8.17365 11.3387 8.125 11.7264 8.125C12.1142 8.125 12.6039 8.17365 13.0547 8.23256C13.8408 8.33526 14.4541 8.92033 14.5618 9.67027C14.6235 10.1004 14.6745 10.5676 14.6745 10.9375C14.6745 11.3074 14.6235 11.7746 14.5618 12.2047C14.4541 12.9547 13.8408 13.5397 13.0547 13.6424C12.6039 13.7014 12.1142 13.75 11.7264 13.75C11.3387 13.75 10.849 13.7014 10.3981 13.6424C9.612 13.5397 8.99872 12.9547 8.89106 12.2047C8.82931 11.7746 8.77832 11.3074 8.77832 10.9375C8.77832 10.5676 8.82931 10.1004 8.89106 9.67027Z"
                                                fill="white"
                                            />
                                            <path
                                                opacity="0.25"
                                                d="M1.68452 9.67027C1.79218 8.92033 2.40546 8.33526 3.19155 8.23256C3.64242 8.17365 4.13215 8.125 4.51988 8.125C4.90761 8.125 5.39734 8.17365 5.84821 8.23256C6.6343 8.33526 7.24758 8.92033 7.35524 9.67027C7.41699 10.1004 7.46798 10.5676 7.46798 10.9375C7.46798 11.3074 7.41699 11.7746 7.35524 12.2047C7.24758 12.9547 6.6343 13.5397 5.84821 13.6424C5.39734 13.7014 4.90761 13.75 4.51988 13.75C4.13215 13.75 3.64242 13.7014 3.19155 13.6424C2.40546 13.5397 1.79218 12.9547 1.68452 12.2047C1.62277 11.7746 1.57178 11.3074 1.57178 10.9375C1.57178 10.5676 1.62277 10.1004 1.68452 9.67027Z"
                                                fill="white"
                                            />
                                            <path
                                                opacity="0.25"
                                                d="M8.89106 2.79527C8.99872 2.04533 9.612 1.46026 10.3981 1.35756C10.849 1.29865 11.3387 1.25 11.7264 1.25C12.1142 1.25 12.6039 1.29865 13.0547 1.35756C13.8408 1.46026 14.4541 2.04533 14.5618 2.79527C14.6235 3.2254 14.6745 3.6926 14.6745 4.0625C14.6745 4.4324 14.6235 4.8996 14.5618 5.32973C14.4541 6.07967 13.8408 6.66474 13.0547 6.76744C12.6039 6.82635 12.1142 6.875 11.7264 6.875C11.3387 6.875 10.849 6.82635 10.3981 6.76744C9.612 6.66474 8.99872 6.07967 8.89106 5.32973C8.82931 4.8996 8.77832 4.4324 8.77832 4.0625C8.77832 3.6926 8.82931 3.2254 8.89106 2.79527Z"
                                                fill="white"
                                            />
                                            <path
                                                d="M1.68452 2.79527C1.79218 2.04533 2.40546 1.46026 3.19155 1.35756C3.64242 1.29865 4.13215 1.25 4.51988 1.25C4.90761 1.25 5.39734 1.29865 5.84821 1.35756C6.6343 1.46026 7.24758 2.04533 7.35524 2.79527C7.41699 3.2254 7.46798 3.6926 7.46798 4.0625C7.46798 4.4324 7.41699 4.8996 7.35524 5.32973C7.24758 6.07967 6.6343 6.66474 5.84821 6.76744C5.39734 6.82635 4.90761 6.875 4.51988 6.875C4.13215 6.875 3.64242 6.82635 3.19155 6.76744C2.40546 6.66474 1.79218 6.07967 1.68452 5.32973C1.62277 4.8996 1.57178 4.4324 1.57178 4.0625C1.57178 3.6926 1.62277 3.2254 1.68452 2.79527Z"
                                                fill="white"
                                            />
                                        </svg>
                                    </button>
                                </div>
                                <div className="dasheds">
                                    <div className="div-1">
                                        {props.data.CarDriver !== undefined &&
                                            props.data.CarDriver
                                                .number_plates}{" "}
                                    </div>
                                    <div className="div-2">
                                        {props.data.CarDriver !== undefined &&
                                            props.data.CarDriver.car_type}{" "}
                                        {props.data.CarDriver !== undefined &&
                                            props.data.CarDriver.model}{" "}
                                        -{" "}
                                        {props.data.CarDriver !== undefined &&
                                            props.data.CarDriver.color}{" "}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="tabs">
                            <div
                                onClick={() => {
                                    setActiveTab(1);
                                }}
                                className={
                                    activeTab === 1 ? "item active" : "item"
                                }
                            >
                                اطلاعات فردی
                            </div>
                            <div
                                onClick={() => {
                                    setActiveTab(2);
                                }}
                                className={
                                    activeTab === 2 ? "item active" : "item"
                                }
                            >
                                اطلاعات خودرو
                            </div>
                            <div
                                onClick={() => {
                                    setActiveTab(3);
                                }}
                                className={
                                    activeTab === 3 ? "item active" : "item"
                                }
                            >
                                سرویس‌ها
                            </div>
                            <div
                                onClick={() => {
                                    setActiveTab(4);
                                }}
                                className={
                                    activeTab === 4 ? "item active" : "item"
                                }
                            >
                                سفرها
                            </div>
                            <div
                                onClick={() => {
                                    setActiveTab(5);
                                }}
                                className={
                                    activeTab === 5 ? "item active" : "item"
                                }
                            >
                                حسابداری
                            </div>
                            <div
                                onClick={() => {
                                    setActiveTab(6);
                                }}
                                className={
                                    activeTab === 6 ? "item active" : "item"
                                }
                            >
                                پیام‌ها
                            </div>
                            <div
                                onClick={() => {
                                    setActiveTab(7);
                                }}
                                className={
                                    activeTab === 7 ? "item active" : "item"
                                }
                            >
                                نظرات و شکایات
                            </div>
                        </div>
                    </div>
                    {activeTab === 1 ? (
                        <div className="cont">
                            <div className="right">
                                <div className="form-1">
                                    <div className="head">
                                        <h6>مشخصات فردی</h6>
                                        <span>
                                            {/* تاریخ ثبت نام :{" "} */}
                                            {/* {props.data.Driver !== undefined &&
                                        console.log(
                                            props.data.Driver.created_at.substr(
                                                0,
                                                10
                                            )
                                        )}
                                    {props.data.Driver !== undefined &&
                                        shamsi
                                            .gregorianToJalali(
                                                props.data.Driver.created_at
                                                    .substr(0, 10)
                                                    .toLocaleDateString("en-CA")
                                            )
                                            .join("/")} */}
                                        </span>
                                    </div>
                                    <form>
                                        <label>
                                            نام
                                            <input
                                                onChange={(e) => {
                                                    setName(e.target.value);
                                                }}
                                                value={name}
                                                type="text"
                                            />
                                        </label>
                                        <label>
                                            نام خانوادگی
                                            <input
                                                onChange={(e) => {
                                                    setLastName(e.target.value);
                                                }}
                                                value={lastName}
                                                type="text"
                                            />
                                        </label>
                                        <label>
                                            نام پدر
                                            <input
                                                onChange={(e) => {
                                                    setFatherName(
                                                        e.target.value
                                                    );
                                                }}
                                                value={fatherName}
                                                type="text"
                                            />
                                        </label>
                                        <label className="no-jus">
                                            جنسیت
                                            <label htmlFor="mail">
                                                <input
                                                    type="radio"
                                                    name="gender"
                                                    id="mail"
                                                    checked={gender == "مرد"}
                                                />
                                                مرد
                                            </label>
                                            <label htmlFor="femail">
                                                <input
                                                    type="radio"
                                                    name="gender"
                                                    id="femail"
                                                    checked={gender == "زن"}
                                                />
                                                زن
                                            </label>
                                        </label>
                                        <label>
                                            شماره موبایل
                                            <input
                                                onChange={(e) => {
                                                    setPhoneNumber(
                                                        e.target.value
                                                    );
                                                }}
                                                value={phoneNumber}
                                                type="text"
                                            />{" "}
                                        </label>
                                        <label>
                                            وضعیت نظام وظیفه
                                            <input
                                                onChange={(e) => {
                                                    setDuty(e.target.value);
                                                }}
                                                value={duty}
                                                type="text"
                                            />{" "}
                                        </label>
                                        <label>
                                            تاریخ تولد
                                            <input
                                                onChange={(e) => {
                                                    setBirthDay(e.target.value);
                                                }}
                                                value={birthDay}
                                                type="text"
                                            />{" "}
                                        </label>
                                        <label>
                                            کد ملی
                                            <input
                                                onChange={(e) => {
                                                    setNationalCode(
                                                        e.target.value
                                                    );
                                                }}
                                                value={nationalCode}
                                                type="text"
                                            />{" "}
                                        </label>
                                        <label>
                                            شماره شناسنامه
                                            <input
                                                onChange={(e) => {
                                                    setShenas(e.target.value);
                                                }}
                                                value={shenas}
                                                type="text"
                                            />{" "}
                                        </label>
                                        <label>
                                            شهر محل صدور
                                            <input
                                                onChange={(e) => {
                                                    setIssuanceCity(
                                                        e.target.value
                                                    );
                                                }}
                                                value={issuanceCity}
                                                type="text"
                                            />{" "}
                                        </label>
                                        <label>
                                            وضعیت تاهل
                                            <input
                                                onChange={(e) => {
                                                    setMarry(e.target.value);
                                                }}
                                                value={marry}
                                                type="text"
                                            />{" "}
                                        </label>
                                        <label>
                                            ایمیل
                                            <input
                                                onChange={(e) => {
                                                    setEmail(e.target.value);
                                                }}
                                                value={email}
                                                type="text"
                                            />{" "}
                                        </label>
                                        <label>
                                            شماره شبا راننده
                                            <input
                                                onChange={(e) => {
                                                    setSheba(e.target.value);
                                                }}
                                                value={sheba}
                                                type="text"
                                            />{" "}
                                        </label>
                                        <label>
                                            نام بانک
                                            <input
                                                onChange={(e) => {
                                                    setBank(e.target.value);
                                                }}
                                                value={bank}
                                                type="text"
                                            />{" "}
                                        </label>
                                    </form>
                                </div>
                                <div className="form-1">
                                    <div className="head">
                                        <h6>گواهی سوء پیشینه</h6>
                                    </div>
                                    <form>
                                        {props.data.Driver !== undefined &&
                                        props.data.Driver
                                            .background_certificate_image !==
                                            undefined &&
                                        props.data.Driver
                                            .background_certificate_image !==
                                            null ? (
                                            props.data.Driver !== undefined && (
                                                <img
                                                    src={
                                                        props.data.Driver
                                                            .background_certificate_image
                                                    }
                                                    alt=""
                                                />
                                            )
                                        ) : (
                                            <label
                                                htmlFor="file"
                                                className="file"
                                            >
                                                <input
                                                    type="file"
                                                    id="file"
                                                    onChange={(e) => {
                                                        setSooImg(
                                                            e.target.files[0]
                                                        );
                                                    }}
                                                />
                                                گواهی سوء پیشینه
                                            </label>
                                        )}
                                    </form>
                                </div>
                            </div>
                            <div className="left">
                                <div className="form-1">
                                    <div className="head">
                                        <h6>اطلاعات گواهینامه</h6>
                                    </div>
                                    <form>
                                        <label>
                                            تاریخ صدور
                                            <input
                                                type="text"
                                                onChange={(e) => {
                                                    setIssuanceCertificateDate(
                                                        e.target.value
                                                    );
                                                }}
                                                value={issuanceCertificateDate}
                                            />
                                        </label>
                                        <label>
                                            مدت اعتبار گواهینامه
                                            <input
                                                type="text"
                                                onChange={(e) => {
                                                    setCertificateExpireDate(
                                                        e.target.value
                                                    );
                                                }}
                                                value={certificateExpireDate}
                                            />
                                        </label>
                                        <label>
                                            نوع گواهینامه
                                            <input
                                                type="text"
                                                onChange={(e) => {
                                                    setCertificateType(
                                                        e.target.value
                                                    );
                                                }}
                                                value={certificateType}
                                            />
                                        </label>
                                        <div className="form-1">
                                            {props.data.Driver !== undefined &&
                                            props.data.Driver
                                                .certificate_image !== null ? (
                                                <img
                                                    onClick={() =>
                                                        setToFull(!toFull)
                                                    }
                                                    className={
                                                        toFull
                                                            ? "to-full"
                                                            : "img-s"
                                                    }
                                                    src={
                                                        props.data.Driver
                                                            .certificate_image
                                                    }
                                                    alt=""
                                                />
                                            ) : (
                                                <label
                                                    htmlFor="file"
                                                    className="file"
                                                >
                                                    <input
                                                        type="file"
                                                        onChange={(e) => {
                                                            setCertificateImg(
                                                                e.target
                                                                    .files[0]
                                                            );
                                                        }}
                                                        id="file"
                                                    />
                                                    تصویر گواهینامه
                                                </label>
                                            )}
                                        </div>
                                    </form>
                                </div>
                                <div className="form-1">
                                    <div className="head">
                                        <h6>اطلاعات محل سکونت</h6>
                                    </div>
                                    <form>
                                        <label>
                                            استان
                                            <input
                                                type="text"
                                                onChange={(e) => {
                                                    setState(e.target.value);
                                                }}
                                                value={state}
                                            />
                                        </label>
                                        <label>
                                            شهر
                                            <input
                                                type="text"
                                                onChange={(e) => {
                                                    setCity(e.target.value);
                                                }}
                                                value={city}
                                            />
                                        </label>
                                        <label>
                                            نشانی
                                            <input
                                                type="text"
                                                onChange={(e) => {
                                                    setAddress(e.target.value);
                                                }}
                                                value={address}
                                            />
                                        </label>
                                        <label>
                                            تلفن ثابت
                                            <input
                                                type="text"
                                                onChange={(e) => {
                                                    setConstPhone(
                                                        e.target.value
                                                    );
                                                }}
                                                value={constPhone}
                                            />
                                        </label>
                                        <div className="form-1">
                                            <label
                                                htmlFor="file"
                                                className="file"
                                            >
                                                <input type="file" id="file" />
                                                لوکیشن محل سکونت
                                            </label>
                                        </div>
                                    </form>
                                </div>
                                <div className="center">
                                    <button className="sub">
                                        ذخیره تغییرات
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : activeTab === 2 ? (
                        <div className="cont">
                            <div className="right">
                                <div className="form-1">
                                    <div className="head">
                                        <h6>مشخصات خودرو</h6>
                                    </div>
                                    <form>
                                        <label>
                                            مدل خودرو
                                            <input
                                                type="text"
                                                onChange={(e) => {
                                                    setModel(e.target.value);
                                                }}
                                                value={model}
                                            />
                                        </label>
                                        <label>
                                            نوع پلاک
                                            <input
                                                type="text"
                                                onChange={(e) => {
                                                    setPelakType(
                                                        e.target.value
                                                    );
                                                }}
                                                value={pelakType}
                                            />
                                        </label>
                                        <label>
                                            پلاک
                                            <input
                                                type="text"
                                                onChange={(e) => {
                                                    setPelak(e.target.value);
                                                }}
                                                value={pelak}
                                            />
                                        </label>

                                        <label>
                                            رنگ
                                            <input
                                                type="text"
                                                onChange={(e) => {
                                                    setColor(e.target.value);
                                                }}
                                                value={color}
                                            />
                                        </label>
                                        <label>
                                            سال ساخت
                                            <input
                                                type="text"
                                                onChange={(e) => {
                                                    setConstrucYear(
                                                        e.target.value
                                                    );
                                                }}
                                                value={construcYear}
                                            />
                                        </label>
                                        <label>
                                            نام مالک خودرو
                                            <input
                                                type="text"
                                                onChange={(e) => {
                                                    setOwnerName(
                                                        e.target.value
                                                    );
                                                }}
                                                value={ownerName}
                                            />
                                        </label>
                                        <label>
                                            کد ملی مالک خودرو
                                            <input
                                                type="text"
                                                onChange={(e) => {
                                                    setOwnerNationalCode(
                                                        e.target.value
                                                    );
                                                }}
                                                value={ownerNationalCode}
                                            />
                                        </label>
                                    </form>
                                </div>
                                <div className="form-1">
                                    <div className="head">
                                        <h6>کارت خودرو</h6>
                                    </div>
                                    <form>
                                        {props.data.CarDriver !== undefined &&
                                        props.data.CarDriver.car_cart_image !==
                                            null ? (
                                            <img
                                                onClick={() =>
                                                    setToFull(!toFull)
                                                }
                                                className={
                                                    toFull ? "to-full" : "img-s"
                                                }
                                                src={
                                                    props.data.CarDriver
                                                        .car_cart_image
                                                }
                                                alt=""
                                            />
                                        ) : (
                                            <label
                                                htmlFor="file"
                                                className="file"
                                            >
                                                <input type="file" id="file" />
                                                تصویر کارت ماشین
                                            </label>
                                        )}
                                    </form>
                                </div>
                            </div>
                            <div className="left">
                                <div className="form-1">
                                    <div className="head">
                                        <h6>بیمه نامه شخص ثالث</h6>
                                    </div>
                                    <form>
                                        <label>
                                            تاریخ انقضای بیمه نامه شخص ثالث
                                            <input
                                                type="text"
                                                onChange={(e) => {
                                                    setBimeh(e.target.value);
                                                }}
                                            />
                                        </label>
                                        <div className="form-1">
                                            {props.data.CarDriver !==
                                                undefined &&
                                            props.data.CarDriver
                                                .certificate_image !== null ? (
                                                <img
                                                    onClick={() =>
                                                        setToFull(!toFull)
                                                    }
                                                    className={
                                                        toFull
                                                            ? "to-full"
                                                            : "img-s"
                                                    }
                                                    src={
                                                        props.data.CarDriver
                                                            .insurance_image
                                                    }
                                                    alt=""
                                                />
                                            ) : (
                                                <label
                                                    htmlFor="file"
                                                    className="file"
                                                >
                                                    <input
                                                        type="file"
                                                        id="file"
                                                    />
                                                    تصویر بیمه نامه
                                                </label>
                                            )}
                                        </div>
                                    </form>
                                </div>
                                <div className="form-1">
                                    <div className="head">
                                        <h6>معاینه فنی</h6>
                                    </div>
                                    <form>
                                        <label>
                                            تاریخ انقضای معاینه فنی
                                            <input
                                                type="text"
                                                onChange={(e) => {
                                                    setExaminExpireDate(
                                                        e.target.value
                                                    );
                                                }}
                                                value={examinExpireDate}
                                            />
                                        </label>
                                        <div className="form-1">
                                            {props.data.CarDriver !==
                                                undefined &&
                                            props.data.CarDriver
                                                .certificate_image !== null ? (
                                                <img
                                                    onClick={() =>
                                                        setToFull(!toFull)
                                                    }
                                                    className={
                                                        toFull
                                                            ? "to-full"
                                                            : "img-s"
                                                    }
                                                    src={
                                                        props.data.CarDriver
                                                            .tech_diag_image
                                                    }
                                                    alt=""
                                                />
                                            ) : (
                                                <label
                                                    htmlFor="file"
                                                    className="file"
                                                >
                                                    <input
                                                        type="file"
                                                        id="file"
                                                    />
                                                    تصویر معاینه فنی
                                                </label>
                                            )}
                                        </div>
                                    </form>
                                </div>
                                <div className="center">
                                    <button className="sub">
                                        ذخیره تغییرات
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : activeTab === 3 ? (
                        <TableDiv>
                            <div className="head">
                                <h6>سرویس ها(3)</h6>
                                <div className="tabs">
                                    <button>
                                        <svg
                                            width="16"
                                            height="15"
                                            viewBox="0 0 16 15"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                opacity="0.3"
                                                d="M5.97496 11.2123C6.31954 10.8677 6.31954 10.3091 5.97496 9.96449C5.63038 9.61991 5.07171 9.61991 4.72713 9.96449L1.19772 13.4939C0.853141 13.8385 0.853141 14.3972 1.19772 14.7417C1.5423 15.0863 2.10098 15.0863 2.44555 14.7417L5.97496 11.2123Z"
                                                fill="#00A3FF"
                                            />
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M15.0566 6.17646C15.0566 9.58763 12.2913 12.3529 8.88018 12.3529C5.46901 12.3529 2.70371 9.58763 2.70371 6.17646C2.70371 2.7653 5.46901 0 8.88018 0C12.2913 0 15.0566 2.7653 15.0566 6.17646ZM4.46845 6.17647C4.46845 8.61302 6.44366 10.5882 8.88021 10.5882C11.3168 10.5882 13.292 8.61302 13.292 6.17647C13.292 3.73992 11.3168 1.76471 8.88021 1.76471C6.44366 1.76471 4.46845 3.73992 4.46845 6.17647Z"
                                                fill="#00A3FF"
                                            />
                                        </svg>
                                        <span>جستجو ...</span>
                                    </button>
                                </div>
                            </div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>نام مدرسه</th>
                                        <th>زمان سرویس</th>
                                        <th>دانش آموزان</th>
                                        <th>زمان ایجاد</th>
                                        <th>وضعیت</th>
                                        <th>عملیات</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.data !== undefined &&
                                        props.data.ServiceDriver !==
                                            undefined &&
                                        props.data.ServiceDriver.map((item) => {
                                            return (
                                                <tr>
                                                    <td>
                                                        <div className="img-div">
                                                            <img
                                                                src="/images/pm.png"
                                                                alt=""
                                                                width={50}
                                                                height={50}
                                                            />
                                                            <div>
                                                                <span className="span-1">
                                                                    {
                                                                        item.name_school
                                                                    }
                                                                </span>
                                                                <span className="span-2">
                                                                    {
                                                                        item.school_dore
                                                                    }
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="img-div">
                                                            <div>
                                                                <span className="span-1">
                                                                    {item.service_type ==
                                                                    "go"
                                                                        ? "رفت"
                                                                        : item.service_type ==
                                                                          "return"
                                                                        ? "برگشت"
                                                                        : "رفت و برگشت"}{" "}
                                                                </span>
                                                                <span className="span-2">
                                                                    {item.time_to_go !==
                                                                        undefined &&
                                                                        item.time_to_go}
                                                                    -
                                                                    {item.retutning_time !==
                                                                        undefined &&
                                                                        item.retutning_time}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="images">
                                                            <div className="img-abs red img-1">
                                                                A
                                                            </div>
                                                            <div className="img-abs img-2">
                                                                S
                                                            </div>
                                                            <div className="img-abs img-3 red">
                                                                P
                                                            </div>
                                                            <div className="img-abs img-4">
                                                                R
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <span className="blue">
                                                            {
                                                                item.service_start_date
                                                            }
                                                        </span>
                                                    </td>
                                                    <td>
                                                        {item.status == "ok" ? (
                                                            <div className="status bg-green">
                                                                تایید مدرسه
                                                            </div>
                                                        ) : item.status ==
                                                          "reject" ? (
                                                            <div className="status bg-red">
                                                                رد شده
                                                            </div>
                                                        ) : item.status ==
                                                          "rejectschool" ? (
                                                            <div className="status bg-red">
                                                                رد توسط مدرسه
                                                            </div>
                                                        ) : item.status ==
                                                          "rejectinstitue" ? (
                                                            <div className="status bg-red">
                                                                رد توسط موسسه
                                                            </div>
                                                        ) : (
                                                            <div className="status">
                                                                در انتظار تایید
                                                                مدرسه
                                                            </div>
                                                        )}
                                                    </td>
                                                    <td>
                                                        <div className="flex-btns">
                                                            <svg
                                                                onClick={() => {
                                                                    setItemToDelete(
                                                                        item.id
                                                                    );
                                                                    setDeleteModal(
                                                                        true
                                                                    );
                                                                }}
                                                                width="33"
                                                                height="32"
                                                                viewBox="0 0 33 32"
                                                                fill="none"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <rect
                                                                    x="0.93457"
                                                                    width="32"
                                                                    height="32"
                                                                    rx="6"
                                                                    fill="#F3F6F9"
                                                                />
                                                                <path
                                                                    d="M12.4346 13V22C12.4346 22.8284 13.1061 23.5 13.9346 23.5H19.9346C20.763 23.5 21.4346 22.8284 21.4346 22V13H12.4346Z"
                                                                    fill="#3699FF"
                                                                />
                                                                <path
                                                                    opacity="0.3"
                                                                    fill-rule="evenodd"
                                                                    clip-rule="evenodd"
                                                                    d="M18.4346 10.375V10.25C18.4346 9.69772 17.9869 9.25 17.4346 9.25H16.4346C15.8823 9.25 15.4346 9.69772 15.4346 10.25V10.375H12.1846C11.9084 10.375 11.6846 10.5989 11.6846 10.875V11C11.6846 11.2761 11.9084 11.5 12.1846 11.5H21.6846C21.9607 11.5 22.1846 11.2761 22.1846 11V10.875C22.1846 10.5989 21.9607 10.375 21.6846 10.375H18.4346Z"
                                                                    fill="#3699FF"
                                                                />
                                                            </svg>

                                                            <button
                                                                onClick={() => {
                                                                    setShowCom(
                                                                        true
                                                                    );
                                                                    setServiceDet(
                                                                        item
                                                                    );
                                                                    setItemToDelete(
                                                                        item.id
                                                                    );
                                                                }}
                                                            >
                                                                مشاهده و ویرایش
                                                                <svg
                                                                    width="7"
                                                                    height="12"
                                                                    viewBox="0 0 7 12"
                                                                    fill="none"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                >
                                                                    <path
                                                                        d="M6.38726 1.65656C6.70769 1.33613 6.70769 0.816613 6.38726 0.496183C6.06683 0.175752 5.54731 0.175752 5.22688 0.496182L0.3038 5.41926C-0.00682905 5.72989 -0.0176973 6.23006 0.279145 6.55389L4.79196 11.477C5.09817 11.811 5.6172 11.8336 5.95125 11.5274C6.2853 11.2212 6.30786 10.7021 6.00165 10.3681L2.01969 6.02413L6.38726 1.65656Z"
                                                                        fill="#3699FF"
                                                                    />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                </tbody>
                            </table>
                        </TableDiv>
                    ) : activeTab === 4 ? (
                        <>
                            <ChartDiv>
                                <div className="chart-head">
                                    <h6>خلاصه عملکرد</h6>
                                </div>
                                <div className="chartt">
                                    <div className="d-flex">
                                        <ChartOne />
                                        <div className="labels">
                                            <div className="label">
                                                <div className="rec bg-green"></div>
                                                <span>
                                                    سفرهای انجام شده(بدون احتساب
                                                    سفرهای جایگزین)
                                                </span>
                                            </div>
                                            <div className="label">
                                                <div className="rec bg-yellow"></div>
                                                <span>سفرهای جایگزین شده</span>
                                            </div>
                                            <div className="label">
                                                <div className="rec bg-red"></div>
                                                <span>سفرهای لغو نشده</span>
                                            </div>
                                            <div className="label">
                                                <div className="rec bg-gray"></div>
                                                <span>
                                                    سفرهای در انتظار انجام
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </ChartDiv>
                            <Travels>
                                <div className="head">
                                    <div className="right-head">
                                        <h6>سفرها(430)</h6>
                                        <div className="date-rel">
                                            <DatePicker
                                                calendar={persian}
                                                locale={persian_fa}
                                                onChange={handleStart}
                                                value={startDate}
                                                format="YYYY/MM/DD"
                                                calendarPosition="bottom-right"
                                                placeholder="از تاریخ 1401.07.12"
                                            />
                                            <svg
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                }}
                                                width="17"
                                                height="17"
                                                viewBox="0 0 17 17"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <rect
                                                    x="0.925781"
                                                    y="0.5"
                                                    width="3.63627"
                                                    height="3.63627"
                                                    rx="1.81814"
                                                    fill="#00A3FF"
                                                />
                                                <rect
                                                    x="6.74316"
                                                    y="0.5"
                                                    width="3.63627"
                                                    height="3.63627"
                                                    rx="1.81814"
                                                    fill="#00A3FF"
                                                />
                                                <rect
                                                    x="12.5625"
                                                    y="0.5"
                                                    width="3.63627"
                                                    height="3.63627"
                                                    rx="1.81814"
                                                    fill="#00A3FF"
                                                />
                                                <rect
                                                    x="12.5625"
                                                    y="6.31836"
                                                    width="3.63627"
                                                    height="3.63627"
                                                    rx="1.81814"
                                                    fill="#00A3FF"
                                                />
                                                <rect
                                                    x="6.74316"
                                                    y="6.31836"
                                                    width="3.63627"
                                                    height="3.63627"
                                                    rx="1.81814"
                                                    fill="#00A3FF"
                                                />
                                                <rect
                                                    x="0.925781"
                                                    y="6.31836"
                                                    width="3.63627"
                                                    height="3.63627"
                                                    rx="1.81814"
                                                    fill="#00A3FF"
                                                />
                                                <rect
                                                    x="12.5625"
                                                    y="12.8633"
                                                    width="3.63627"
                                                    height="3.63627"
                                                    rx="1.81814"
                                                    fill="#00A3FF"
                                                />
                                                <rect
                                                    x="6.74316"
                                                    y="12.8633"
                                                    width="3.63627"
                                                    height="3.63627"
                                                    rx="1.81814"
                                                    fill="#00A3FF"
                                                />
                                                <rect
                                                    x="0.925781"
                                                    y="12.8633"
                                                    width="3.63627"
                                                    height="3.63627"
                                                    rx="1.81814"
                                                    fill="#00A3FF"
                                                />
                                            </svg>
                                            <span>از تاریخ</span>
                                        </div>
                                        <div className="date-rel">
                                            <DatePicker
                                                calendar={persian}
                                                locale={persian_fa}
                                                onChange={handleEnd}
                                                value={endDate}
                                                format="YYYY/MM/DD"
                                                calendarPosition="bottom-right"
                                                placeholder="از تاریخ 1401.07.12"
                                            />
                                            <svg
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                }}
                                                width="17"
                                                height="17"
                                                viewBox="0 0 17 17"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <rect
                                                    x="0.925781"
                                                    y="0.5"
                                                    width="3.63627"
                                                    height="3.63627"
                                                    rx="1.81814"
                                                    fill="#00A3FF"
                                                />
                                                <rect
                                                    x="6.74316"
                                                    y="0.5"
                                                    width="3.63627"
                                                    height="3.63627"
                                                    rx="1.81814"
                                                    fill="#00A3FF"
                                                />
                                                <rect
                                                    x="12.5625"
                                                    y="0.5"
                                                    width="3.63627"
                                                    height="3.63627"
                                                    rx="1.81814"
                                                    fill="#00A3FF"
                                                />
                                                <rect
                                                    x="12.5625"
                                                    y="6.31836"
                                                    width="3.63627"
                                                    height="3.63627"
                                                    rx="1.81814"
                                                    fill="#00A3FF"
                                                />
                                                <rect
                                                    x="6.74316"
                                                    y="6.31836"
                                                    width="3.63627"
                                                    height="3.63627"
                                                    rx="1.81814"
                                                    fill="#00A3FF"
                                                />
                                                <rect
                                                    x="0.925781"
                                                    y="6.31836"
                                                    width="3.63627"
                                                    height="3.63627"
                                                    rx="1.81814"
                                                    fill="#00A3FF"
                                                />
                                                <rect
                                                    x="12.5625"
                                                    y="12.8633"
                                                    width="3.63627"
                                                    height="3.63627"
                                                    rx="1.81814"
                                                    fill="#00A3FF"
                                                />
                                                <rect
                                                    x="6.74316"
                                                    y="12.8633"
                                                    width="3.63627"
                                                    height="3.63627"
                                                    rx="1.81814"
                                                    fill="#00A3FF"
                                                />
                                                <rect
                                                    x="0.925781"
                                                    y="12.8633"
                                                    width="3.63627"
                                                    height="3.63627"
                                                    rx="1.81814"
                                                    fill="#00A3FF"
                                                />
                                            </svg>
                                            <span>تا تاریخ</span>
                                        </div>
                                    </div>
                                    <div className="left-head">
                                        <span
                                            onClick={() => {
                                                setTravelTabActive(5);
                                            }}
                                            className={
                                                travelTabActive == 5 && "active"
                                            }
                                        >
                                            کنسل شده
                                        </span>
                                        <span
                                            onClick={() => {
                                                setTravelTabActive(4);
                                            }}
                                            className={
                                                travelTabActive == 4 && "active"
                                            }
                                        >
                                            جایگزین شده
                                        </span>
                                        <span
                                            onClick={() => {
                                                setTravelTabActive(3);
                                            }}
                                            className={
                                                travelTabActive == 3 && "active"
                                            }
                                        >
                                            انجام شده
                                        </span>
                                        <span
                                            onClick={() => {
                                                setTravelTabActive(2);
                                            }}
                                            className={
                                                travelTabActive == 2 && "active"
                                            }
                                        >
                                            در انتظار انجام
                                        </span>
                                        <span
                                            onClick={() => {
                                                setTravelTabActive(1);
                                            }}
                                            className={
                                                travelTabActive == 1 && "active"
                                            }
                                        >
                                            همه{" "}
                                        </span>
                                    </div>
                                </div>
                                <div className="travel-btns">
                                    <button>
                                        <svg
                                            width="17"
                                            height="15"
                                            viewBox="0 0 17 15"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                opacity="0.25"
                                                d="M9.35298 9.67027C9.46064 8.92033 10.0739 8.33526 10.86 8.23256C11.3109 8.17365 11.8006 8.125 12.1883 8.125C12.5761 8.125 13.0658 8.17365 13.5167 8.23256C14.3028 8.33526 14.916 8.92033 15.0237 9.67027C15.0854 10.1004 15.1364 10.5676 15.1364 10.9375C15.1364 11.3074 15.0854 11.7746 15.0237 12.2047C14.916 12.9547 14.3028 13.5397 13.5167 13.6424C13.0658 13.7014 12.5761 13.75 12.1883 13.75C11.8006 13.75 11.3109 13.7014 10.86 13.6424C10.0739 13.5397 9.46064 12.9547 9.35298 12.2047C9.29123 11.7746 9.24023 11.3074 9.24023 10.9375C9.24023 10.5676 9.29123 10.1004 9.35298 9.67027Z"
                                                fill="#00A3FF"
                                            />
                                            <path
                                                opacity="0.25"
                                                d="M2.14692 9.67027C2.25458 8.92033 2.86786 8.33526 3.65396 8.23256C4.10483 8.17365 4.59455 8.125 4.98228 8.125C5.37002 8.125 5.85974 8.17365 6.31061 8.23256C7.0967 8.33526 7.70998 8.92033 7.81764 9.67027C7.87939 10.1004 7.93039 10.5676 7.93039 10.9375C7.93039 11.3074 7.87939 11.7746 7.81764 12.2047C7.70998 12.9547 7.0967 13.5397 6.31061 13.6424C5.85974 13.7014 5.37002 13.75 4.98228 13.75C4.59455 13.75 4.10483 13.7014 3.65396 13.6424C2.86786 13.5397 2.25458 12.9547 2.14692 12.2047C2.08517 11.7746 2.03418 11.3074 2.03418 10.9375C2.03418 10.5676 2.08517 10.1004 2.14692 9.67027Z"
                                                fill="#00A3FF"
                                            />
                                            <path
                                                opacity="0.25"
                                                d="M9.35298 2.79527C9.46064 2.04533 10.0739 1.46026 10.86 1.35756C11.3109 1.29865 11.8006 1.25 12.1883 1.25C12.5761 1.25 13.0658 1.29865 13.5167 1.35756C14.3028 1.46026 14.916 2.04533 15.0237 2.79527C15.0854 3.2254 15.1364 3.6926 15.1364 4.0625C15.1364 4.4324 15.0854 4.8996 15.0237 5.32973C14.916 6.07967 14.3028 6.66474 13.5167 6.76744C13.0658 6.82635 12.5761 6.875 12.1883 6.875C11.8006 6.875 11.3109 6.82635 10.86 6.76744C10.0739 6.66474 9.46064 6.07967 9.35298 5.32973C9.29123 4.8996 9.24023 4.4324 9.24023 4.0625C9.24023 3.6926 9.29123 3.2254 9.35298 2.79527Z"
                                                fill="#00A3FF"
                                            />
                                            <path
                                                d="M2.14692 2.79527C2.25458 2.04533 2.86786 1.46026 3.65396 1.35756C4.10483 1.29865 4.59455 1.25 4.98228 1.25C5.37002 1.25 5.85974 1.29865 6.31061 1.35756C7.0967 1.46026 7.70998 2.04533 7.81764 2.79527C7.87939 3.2254 7.93039 3.6926 7.93039 4.0625C7.93039 4.4324 7.87939 4.8996 7.81764 5.32973C7.70998 6.07967 7.0967 6.66474 6.31061 6.76744C5.85974 6.82635 5.37002 6.875 4.98228 6.875C4.59455 6.875 4.10483 6.82635 3.65396 6.76744C2.86786 6.66474 2.25458 6.07967 2.14692 5.32973C2.08517 4.8996 2.03418 4.4324 2.03418 4.0625C2.03418 3.6926 2.08517 3.2254 2.14692 2.79527Z"
                                                fill="#00A3FF"
                                            />
                                        </svg>
                                        دانلود اکسل
                                    </button>
                                    <button>
                                        <svg
                                            width="17"
                                            height="15"
                                            viewBox="0 0 17 15"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                opacity="0.25"
                                                d="M9.35298 9.67027C9.46064 8.92033 10.0739 8.33526 10.86 8.23256C11.3109 8.17365 11.8006 8.125 12.1883 8.125C12.5761 8.125 13.0658 8.17365 13.5167 8.23256C14.3028 8.33526 14.916 8.92033 15.0237 9.67027C15.0854 10.1004 15.1364 10.5676 15.1364 10.9375C15.1364 11.3074 15.0854 11.7746 15.0237 12.2047C14.916 12.9547 14.3028 13.5397 13.5167 13.6424C13.0658 13.7014 12.5761 13.75 12.1883 13.75C11.8006 13.75 11.3109 13.7014 10.86 13.6424C10.0739 13.5397 9.46064 12.9547 9.35298 12.2047C9.29123 11.7746 9.24023 11.3074 9.24023 10.9375C9.24023 10.5676 9.29123 10.1004 9.35298 9.67027Z"
                                                fill="#00A3FF"
                                            />
                                            <path
                                                opacity="0.25"
                                                d="M2.14692 9.67027C2.25458 8.92033 2.86786 8.33526 3.65396 8.23256C4.10483 8.17365 4.59455 8.125 4.98228 8.125C5.37002 8.125 5.85974 8.17365 6.31061 8.23256C7.0967 8.33526 7.70998 8.92033 7.81764 9.67027C7.87939 10.1004 7.93039 10.5676 7.93039 10.9375C7.93039 11.3074 7.87939 11.7746 7.81764 12.2047C7.70998 12.9547 7.0967 13.5397 6.31061 13.6424C5.85974 13.7014 5.37002 13.75 4.98228 13.75C4.59455 13.75 4.10483 13.7014 3.65396 13.6424C2.86786 13.5397 2.25458 12.9547 2.14692 12.2047C2.08517 11.7746 2.03418 11.3074 2.03418 10.9375C2.03418 10.5676 2.08517 10.1004 2.14692 9.67027Z"
                                                fill="#00A3FF"
                                            />
                                            <path
                                                opacity="0.25"
                                                d="M9.35298 2.79527C9.46064 2.04533 10.0739 1.46026 10.86 1.35756C11.3109 1.29865 11.8006 1.25 12.1883 1.25C12.5761 1.25 13.0658 1.29865 13.5167 1.35756C14.3028 1.46026 14.916 2.04533 15.0237 2.79527C15.0854 3.2254 15.1364 3.6926 15.1364 4.0625C15.1364 4.4324 15.0854 4.8996 15.0237 5.32973C14.916 6.07967 14.3028 6.66474 13.5167 6.76744C13.0658 6.82635 12.5761 6.875 12.1883 6.875C11.8006 6.875 11.3109 6.82635 10.86 6.76744C10.0739 6.66474 9.46064 6.07967 9.35298 5.32973C9.29123 4.8996 9.24023 4.4324 9.24023 4.0625C9.24023 3.6926 9.29123 3.2254 9.35298 2.79527Z"
                                                fill="#00A3FF"
                                            />
                                            <path
                                                d="M2.14692 2.79527C2.25458 2.04533 2.86786 1.46026 3.65396 1.35756C4.10483 1.29865 4.59455 1.25 4.98228 1.25C5.37002 1.25 5.85974 1.29865 6.31061 1.35756C7.0967 1.46026 7.70998 2.04533 7.81764 2.79527C7.87939 3.2254 7.93039 3.6926 7.93039 4.0625C7.93039 4.4324 7.87939 4.8996 7.81764 5.32973C7.70998 6.07967 7.0967 6.66474 6.31061 6.76744C5.85974 6.82635 5.37002 6.875 4.98228 6.875C4.59455 6.875 4.10483 6.82635 3.65396 6.76744C2.86786 6.66474 2.25458 6.07967 2.14692 5.32973C2.08517 4.8996 2.03418 4.4324 2.03418 4.0625C2.03418 3.6926 2.08517 3.2254 2.14692 2.79527Z"
                                                fill="#00A3FF"
                                            />
                                        </svg>
                                        سفر جایگزین
                                    </button>
                                </div>
                                <TableDiv className="mt-0">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>شماره سفر</th>
                                                <th>مدرسه</th>
                                                <th>ساعت</th>
                                                <th>تاریخ</th>
                                                <th>وضعیت</th>
                                                <th>عملیات</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {props.data.tripArray !==
                                                undefined &&
                                                props.data.tripArray.map(
                                                    (item) => {
                                                        return (
                                                            <tr>
                                                                <td>
                                                                    #
                                                                    {
                                                                        item.trip_id
                                                                    }
                                                                </td>
                                                                <td>
                                                                    <div className="img-divs">
                                                                        <img
                                                                            width={
                                                                                51
                                                                            }
                                                                            height={
                                                                                51
                                                                            }
                                                                            src={
                                                                                item.school_image
                                                                            }
                                                                            alt=""
                                                                        />
                                                                        <div>
                                                                            <span className="span-1">
                                                                                {
                                                                                    item.school_name
                                                                                }
                                                                            </span>
                                                                            <span className="span-2">
                                                                                {
                                                                                    item.school_dore
                                                                                }
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    {item.type_trip ==
                                                                    "go"
                                                                        ? "رفت"
                                                                        : item.type_trip ==
                                                                          "return"
                                                                        ? "برگشت"
                                                                        : "رفت و برگشت"}{" "}
                                                                    −{" "}
                                                                    {
                                                                        item.time_go
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {item.date_trip !==
                                                                        undefined &&
                                                                        shamsi
                                                                            .gregorianToJalali(
                                                                                item.date_trip
                                                                            )
                                                                            .join(
                                                                                "/"
                                                                            )}
                                                                </td>

                                                                <td>
                                                                    {item.status_trip ==
                                                                    "end" ? (
                                                                        <div className="status bg-green">
                                                                            انجام
                                                                            شده
                                                                        </div>
                                                                    ) : item.status_trip ==
                                                                      "waiting" ? (
                                                                        <div className="status">
                                                                            در
                                                                            انتظار
                                                                            انجام
                                                                        </div>
                                                                    ) : (
                                                                        <div className="status bg-red">
                                                                            انجام
                                                                            نشده
                                                                        </div>
                                                                    )}
                                                                </td>
                                                                <td>
                                                                    <button
                                                                        className="w-120"
                                                                        onClick={() => {
                                                                            setTripItem(
                                                                                item
                                                                            );
                                                                            setShowTravel(
                                                                                true
                                                                            );
                                                                        }}
                                                                    >
                                                                        مشاهده و
                                                                        ویرایش
                                                                        <svg
                                                                            width="7"
                                                                            height="12"
                                                                            viewBox="0 0 7 12"
                                                                            fill="none"
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                        >
                                                                            <path
                                                                                d="M6.38726 1.65656C6.70769 1.33613 6.70769 0.816613 6.38726 0.496183C6.06683 0.175752 5.54731 0.175752 5.22688 0.496182L0.3038 5.41926C-0.00682905 5.72989 -0.0176973 6.23006 0.279145 6.55389L4.79196 11.477C5.09817 11.811 5.6172 11.8336 5.95125 11.5274C6.2853 11.2212 6.30786 10.7021 6.00165 10.3681L2.01969 6.02413L6.38726 1.65656Z"
                                                                                fill="#3699FF"
                                                                            />
                                                                        </svg>
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        );
                                                    }
                                                )}
                                        </tbody>
                                    </table>
                                </TableDiv>
                            </Travels>
                        </>
                    ) : activeTab === 5 ? (
                        <Travels>
                            <div className="head">
                                <div className="right-head">
                                    <h6>
                                        تراکنش‌ها(
                                        {props.data.TransactionCashForDriver !==
                                            undefined &&
                                            props.data
                                                .TransactionCheckForDriver !==
                                                undefined &&
                                            props.data.TransactionCashForDriver
                                                .length +
                                                props.data
                                                    .TransactionCheckForDriver
                                                    .length}
                                        )
                                    </h6>
                                </div>
                                <div className=" travel-btns">
                                    <button>
                                        <svg
                                            width="16"
                                            height="15"
                                            viewBox="0 0 16 15"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                opacity="0.3"
                                                d="M5.94957 11.2113C6.29415 10.8668 6.29415 10.3081 5.94957 9.96351C5.60499 9.61893 5.04632 9.61893 4.70174 9.96351L1.17233 13.4929C0.82775 13.8375 0.82775 14.3962 1.17233 14.7408C1.51691 15.0853 2.07558 15.0853 2.42016 14.7408L5.94957 11.2113Z"
                                                fill="#00A3FF"
                                            />
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M15.0312 6.17646C15.0312 9.58763 12.266 12.3529 8.85479 12.3529C5.44362 12.3529 2.67832 9.58763 2.67832 6.17646C2.67832 2.7653 5.44362 0 8.85479 0C12.266 0 15.0312 2.7653 15.0312 6.17646ZM4.44306 6.17647C4.44306 8.61302 6.41827 10.5882 8.85482 10.5882C11.2914 10.5882 13.2666 8.61302 13.2666 6.17647C13.2666 3.73992 11.2914 1.76471 8.85482 1.76471C6.41827 1.76471 4.44306 3.73992 4.44306 6.17647Z"
                                                fill="#00A3FF"
                                            />
                                        </svg>
                                        جستجو ...
                                    </button>
                                    <button>
                                        <svg
                                            width="16"
                                            height="15"
                                            viewBox="0 0 16 15"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                opacity="0.25"
                                                d="M8.81977 9.67027C8.92743 8.92033 9.54071 8.33526 10.3268 8.23256C10.7777 8.17365 11.2674 8.125 11.6551 8.125C12.0429 8.125 12.5326 8.17365 12.9835 8.23256C13.7696 8.33526 14.3828 8.92033 14.4905 9.67027C14.5522 10.1004 14.6032 10.5676 14.6032 10.9375C14.6032 11.3074 14.5522 11.7746 14.4905 12.2047C14.3828 12.9547 13.7696 13.5397 12.9835 13.6424C12.5326 13.7014 12.0429 13.75 11.6551 13.75C11.2674 13.75 10.7777 13.7014 10.3268 13.6424C9.54071 13.5397 8.92743 12.9547 8.81977 12.2047C8.75803 11.7746 8.70703 11.3074 8.70703 10.9375C8.70703 10.5676 8.75803 10.1004 8.81977 9.67027Z"
                                                fill="#00A3FF"
                                            />
                                            <path
                                                opacity="0.25"
                                                d="M1.61372 9.67027C1.72138 8.92033 2.33466 8.33526 3.12075 8.23256C3.57162 8.17365 4.06135 8.125 4.44908 8.125C4.83681 8.125 5.32654 8.17365 5.77741 8.23256C6.5635 8.33526 7.17678 8.92033 7.28444 9.67027C7.34619 10.1004 7.39718 10.5676 7.39718 10.9375C7.39718 11.3074 7.34619 11.7746 7.28444 12.2047C7.17678 12.9547 6.5635 13.5397 5.77741 13.6424C5.32654 13.7014 4.83681 13.75 4.44908 13.75C4.06135 13.75 3.57162 13.7014 3.12075 13.6424C2.33466 13.5397 1.72138 12.9547 1.61372 12.2047C1.55197 11.7746 1.50098 11.3074 1.50098 10.9375C1.50098 10.5676 1.55197 10.1004 1.61372 9.67027Z"
                                                fill="#00A3FF"
                                            />
                                            <path
                                                opacity="0.25"
                                                d="M8.81977 2.79527C8.92743 2.04533 9.54071 1.46026 10.3268 1.35756C10.7777 1.29865 11.2674 1.25 11.6551 1.25C12.0429 1.25 12.5326 1.29865 12.9835 1.35756C13.7696 1.46026 14.3828 2.04533 14.4905 2.79527C14.5522 3.2254 14.6032 3.6926 14.6032 4.0625C14.6032 4.4324 14.5522 4.8996 14.4905 5.32973C14.3828 6.07967 13.7696 6.66474 12.9835 6.76744C12.5326 6.82635 12.0429 6.875 11.6551 6.875C11.2674 6.875 10.7777 6.82635 10.3268 6.76744C9.54071 6.66474 8.92743 6.07967 8.81977 5.32973C8.75803 4.8996 8.70703 4.4324 8.70703 4.0625C8.70703 3.6926 8.75803 3.2254 8.81977 2.79527Z"
                                                fill="#00A3FF"
                                            />
                                            <path
                                                d="M1.61372 2.79527C1.72138 2.04533 2.33466 1.46026 3.12075 1.35756C3.57162 1.29865 4.06135 1.25 4.44908 1.25C4.83681 1.25 5.32654 1.29865 5.77741 1.35756C6.5635 1.46026 7.17678 2.04533 7.28444 2.79527C7.34619 3.2254 7.39718 3.6926 7.39718 4.0625C7.39718 4.4324 7.34619 4.8996 7.28444 5.32973C7.17678 6.07967 6.5635 6.66474 5.77741 6.76744C5.32654 6.82635 4.83681 6.875 4.44908 6.875C4.06135 6.875 3.57162 6.82635 3.12075 6.76744C2.33466 6.66474 1.72138 6.07967 1.61372 5.32973C1.55197 4.8996 1.50098 4.4324 1.50098 4.0625C1.50098 3.6926 1.55197 3.2254 1.61372 2.79527Z"
                                                fill="#00A3FF"
                                            />
                                        </svg>
                                        فیلتر
                                    </button>
                                    <button>
                                        <svg
                                            width="18"
                                            height="17"
                                            viewBox="0 0 18 17"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M15.8315 12.3595C16.1505 12.6629 16.6776 12.4355 16.676 11.9952L16.6657 9.23684V4.18421C16.6657 3.25405 15.8726 2.5 14.8944 2.5H6.62866C5.65043 2.5 4.85742 3.25405 4.85742 4.18421V6.5H8.7551C10.412 6.5 11.7551 7.84315 11.7551 9.5V10.9211H14.3187L15.8315 12.3595Z"
                                                fill="#3699FF"
                                            />
                                            <path
                                                opacity="0.3"
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M1.92871 12.5007V9.16732C1.92871 8.43094 2.55651 7.83398 3.33094 7.83398H8.93985C9.71428 7.83398 10.3421 8.43094 10.3421 9.16732V12.5007C10.3421 13.237 9.71428 13.834 8.93985 13.834H3.41208L2.78359 14.406C2.46247 14.6982 1.94705 14.4704 1.94705 14.0362V12.7168C1.93498 12.6465 1.92871 12.5743 1.92871 12.5007ZM4.74364 10.1673C4.74364 9.98322 4.89288 9.83398 5.07697 9.83398H8.61699C8.80108 9.83398 8.95032 9.98322 8.95032 10.1673C8.95032 10.3514 8.80108 10.5007 8.61699 10.5007H5.07697C4.89288 10.5007 4.74364 10.3514 4.74364 10.1673ZM7.18031 11.1673C6.99622 11.1673 6.84698 11.3166 6.84698 11.5007C6.84698 11.6847 6.99622 11.834 7.18031 11.834H8.61699C8.80108 11.834 8.95032 11.6847 8.95032 11.5007C8.95032 11.3166 8.80108 11.1673 8.61699 11.1673H7.18031Z"
                                                fill="#3699FF"
                                            />
                                        </svg>
                                        دانلود اکسل
                                    </button>
                                    <button>
                                        <svg
                                            width="18"
                                            height="17"
                                            viewBox="0 0 18 17"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M15.8315 12.3595C16.1505 12.6629 16.6776 12.4355 16.676 11.9952L16.6657 9.23684V4.18421C16.6657 3.25405 15.8726 2.5 14.8944 2.5H6.62866C5.65043 2.5 4.85742 3.25405 4.85742 4.18421V6.5H8.7551C10.412 6.5 11.7551 7.84315 11.7551 9.5V10.9211H14.3187L15.8315 12.3595Z"
                                                fill="#3699FF"
                                            />
                                            <path
                                                opacity="0.3"
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M1.92871 12.5007V9.16732C1.92871 8.43094 2.55651 7.83398 3.33094 7.83398H8.93985C9.71428 7.83398 10.3421 8.43094 10.3421 9.16732V12.5007C10.3421 13.237 9.71428 13.834 8.93985 13.834H3.41208L2.78359 14.406C2.46247 14.6982 1.94705 14.4704 1.94705 14.0362V12.7168C1.93498 12.6465 1.92871 12.5743 1.92871 12.5007ZM4.74364 10.1673C4.74364 9.98322 4.89288 9.83398 5.07697 9.83398H8.61699C8.80108 9.83398 8.95032 9.98322 8.95032 10.1673C8.95032 10.3514 8.80108 10.5007 8.61699 10.5007H5.07697C4.89288 10.5007 4.74364 10.3514 4.74364 10.1673ZM7.18031 11.1673C6.99622 11.1673 6.84698 11.3166 6.84698 11.5007C6.84698 11.6847 6.99622 11.834 7.18031 11.834H8.61699C8.80108 11.834 8.95032 11.6847 8.95032 11.5007C8.95032 11.3166 8.80108 11.1673 8.61699 11.1673H7.18031Z"
                                                fill="#3699FF"
                                            />
                                        </svg>
                                        پرینت
                                    </button>
                                    <button
                                        className="active"
                                        onClick={() => {
                                            setShowNewCheck(true);
                                        }}
                                    >
                                        <svg
                                            width="15"
                                            height="15"
                                            viewBox="0 0 15 15"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M10.4535 4.00065C10.4535 5.61148 9.14761 6.91732 7.53678 6.91732C5.92595 6.91732 4.62012 5.61148 4.62012 4.00065C4.62012 2.38982 5.92595 1.08398 7.53678 1.08398C9.14761 1.08398 10.4535 2.38982 10.4535 4.00065Z"
                                                fill="white"
                                            />
                                            <path
                                                opacity="0.25"
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M11.5143 8.73869C11.1547 8.32179 10.5371 8.34327 10.0542 8.6076C9.30684 9.01665 8.44913 9.2492 7.53711 9.2492C6.62509 9.2492 5.76738 9.01665 5.02006 8.6076C4.53712 8.34327 3.91952 8.32179 3.55994 8.73869C2.76674 9.65835 2.28711 10.8561 2.28711 12.1659V12.7492C2.28711 13.3935 2.80944 13.9159 3.45378 13.9159H11.6204C12.2648 13.9159 12.7871 13.3935 12.7871 12.7492V12.1659C12.7871 10.8561 12.3075 9.65835 11.5143 8.73869Z"
                                                fill="white"
                                            />
                                        </svg>
                                        ثبت چک و وجه
                                    </button>
                                </div>
                            </div>
                            <TableDiv className="mt-0">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>نوع</th>
                                            <th>نحوه پرداخت</th>
                                            <th>مبلغ(ریال)</th>
                                            <th>زمان</th>
                                            <th>بابت</th>
                                            <th>وضعیت</th>
                                            <th>عملیات</th>
                                        </tr>
                                    </thead>
                                    <tbody className="new-td">
                                        {props.data.TransactionCashForDriver !==
                                            undefined &&
                                            props.data.TransactionCashForDriver.map(
                                                (item) => {
                                                    return (
                                                        <tr>
                                                            <td>
                                                                {
                                                                    item.type_transaction
                                                                }
                                                            </td>
                                                            <td>
                                                                {
                                                                    item.payment_method
                                                                }
                                                            </td>
                                                            <td>
                                                                {item.check_amount
                                                                    .toString()
                                                                    .replace(
                                                                        /\B(?=(\d{3})+(?!\d))/g,
                                                                        ","
                                                                    )}{" "}
                                                                ریال
                                                            </td>
                                                            <td>
                                                                {
                                                                    item.delivery_date
                                                                }
                                                            </td>
                                                            <td>
                                                                {item.fo_cash}
                                                            </td>
                                                            <td>
                                                                {item.status_cash ==
                                                                "waiting" ? (
                                                                    <div className="status">
                                                                        در
                                                                        انتظار
                                                                        تایید
                                                                    </div>
                                                                ) : item.status_cash ==
                                                                  "ok" ? (
                                                                    <div className="status green">
                                                                        موفق
                                                                    </div>
                                                                ) : (
                                                                    <div className="status red">
                                                                        ناموفق
                                                                    </div>
                                                                )}
                                                            </td>
                                                            <td>
                                                                <button
                                                                    className="w-120"
                                                                    onClick={() => {
                                                                        setCashItem(
                                                                            item
                                                                        );
                                                                        setShowCashDet(
                                                                            true
                                                                        );
                                                                    }}
                                                                >
                                                                    مشاهده و
                                                                    ویرایش
                                                                    <svg
                                                                        width="7"
                                                                        height="12"
                                                                        viewBox="0 0 7 12"
                                                                        fill="none"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                    >
                                                                        <path
                                                                            d="M6.38726 1.65656C6.70769 1.33613 6.70769 0.816613 6.38726 0.496183C6.06683 0.175752 5.54731 0.175752 5.22688 0.496182L0.3038 5.41926C-0.00682905 5.72989 -0.0176973 6.23006 0.279145 6.55389L4.79196 11.477C5.09817 11.811 5.6172 11.8336 5.95125 11.5274C6.2853 11.2212 6.30786 10.7021 6.00165 10.3681L2.01969 6.02413L6.38726 1.65656Z"
                                                                            fill="#3699FF"
                                                                        />
                                                                    </svg>
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    );
                                                }
                                            )}
                                        {props.data
                                            .TransactionCheckForDriver !==
                                            undefined &&
                                            props.data.TransactionCheckForDriver.map(
                                                (item) => {
                                                    return (
                                                        <tr>
                                                            <td>
                                                                {
                                                                    item.type_transaction
                                                                }
                                                            </td>
                                                            <td>
                                                                {
                                                                    item.payment_method
                                                                }
                                                            </td>
                                                            <td>
                                                                {item.check_amount
                                                                    .toString()
                                                                    .replace(
                                                                        /\B(?=(\d{3})+(?!\d))/g,
                                                                        ","
                                                                    )}{" "}
                                                                ریال
                                                            </td>
                                                            <td>
                                                                {
                                                                    item.delivery_date
                                                                }
                                                            </td>
                                                            <td>
                                                                {item.fo_check}
                                                            </td>
                                                            <td>
                                                                {item.status_check ==
                                                                "waiting" ? (
                                                                    <div className="status">
                                                                        در
                                                                        انتظار
                                                                        وصول
                                                                    </div>
                                                                ) : item.status_check ==
                                                                  "ok" ? (
                                                                    <div className="status green">
                                                                        وصول شده
                                                                    </div>
                                                                ) : (
                                                                    <div className="status red">
                                                                        برگشت
                                                                        خورده
                                                                    </div>
                                                                )}
                                                            </td>
                                                            <td>
                                                                <button
                                                                    className="w-120"
                                                                    onClick={() => {
                                                                        setItem(
                                                                            item
                                                                        );
                                                                        setShowDet(
                                                                            true
                                                                        );
                                                                    }}
                                                                >
                                                                    مشاهده و
                                                                    ویرایش
                                                                    <svg
                                                                        width="7"
                                                                        height="12"
                                                                        viewBox="0 0 7 12"
                                                                        fill="none"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                    >
                                                                        <path
                                                                            d="M6.38726 1.65656C6.70769 1.33613 6.70769 0.816613 6.38726 0.496183C6.06683 0.175752 5.54731 0.175752 5.22688 0.496182L0.3038 5.41926C-0.00682905 5.72989 -0.0176973 6.23006 0.279145 6.55389L4.79196 11.477C5.09817 11.811 5.6172 11.8336 5.95125 11.5274C6.2853 11.2212 6.30786 10.7021 6.00165 10.3681L2.01969 6.02413L6.38726 1.65656Z"
                                                                            fill="#3699FF"
                                                                        />
                                                                    </svg>
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    );
                                                }
                                            )}
                                    </tbody>
                                </table>
                                {showDet && (
                                    <CheckInfo item={item} close={setShowDet} />
                                )}
                                {showCashDet && (
                                    <CashInfo
                                        item={cashItem}
                                        close={setShowCashDet}
                                    />
                                )}
                                <div className="all">
                                    <h6>جمع کل (89) :</h6>
                                    <span>
                                        {all
                                            .toString()
                                            .replace(
                                                /\B(?=(\d{3})+(?!\d))/g,
                                                ","
                                            )}{" "}
                                        ریال
                                    </span>
                                </div>
                            </TableDiv>
                        </Travels>
                    ) : activeTab === 6 ? (
                        <Messages>
                            <div className="msgs-head">
                                <h6>پیام‌ها (70)</h6>
                                <div className="d-flex">
                                    <button>
                                        <svg
                                            width="15"
                                            height="15"
                                            viewBox="0 0 15 15"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                opacity="0.3"
                                                d="M5.79625 11.2123C6.14083 10.8677 6.14083 10.3091 5.79625 9.96449C5.45167 9.61991 4.893 9.61991 4.54842 9.96449L1.01901 13.4939C0.67443 13.8385 0.67443 14.3972 1.01901 14.7417C1.36359 15.0863 1.92226 15.0863 2.26684 14.7417L5.79625 11.2123Z"
                                                fill="#00A3FF"
                                            />
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M14.8779 6.17646C14.8779 9.58763 12.1126 12.3529 8.70147 12.3529C5.2903 12.3529 2.525 9.58763 2.525 6.17646C2.525 2.7653 5.2903 0 8.70147 0C12.1126 0 14.8779 2.7653 14.8779 6.17646ZM4.28973 6.17647C4.28973 8.61302 6.26495 10.5882 8.7015 10.5882C11.138 10.5882 13.1133 8.61302 13.1133 6.17647C13.1133 3.73992 11.138 1.76471 8.7015 1.76471C6.26495 1.76471 4.28973 3.73992 4.28973 6.17647Z"
                                                fill="#00A3FF"
                                            />
                                        </svg>
                                        جستجو ...
                                    </button>
                                    <button>
                                        <svg
                                            width="16"
                                            height="15"
                                            viewBox="0 0 16 15"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                opacity="0.25"
                                                d="M8.66645 9.67027C8.77411 8.92033 9.38739 8.33526 10.1735 8.23256C10.6244 8.17365 11.1141 8.125 11.5018 8.125C11.8895 8.125 12.3793 8.17365 12.8301 8.23256C13.6162 8.33526 14.2295 8.92033 14.3372 9.67027C14.3989 10.1004 14.4499 10.5676 14.4499 10.9375C14.4499 11.3074 14.3989 11.7746 14.3372 12.2047C14.2295 12.9547 13.6162 13.5397 12.8301 13.6424C12.3793 13.7014 11.8895 13.75 11.5018 13.75C11.1141 13.75 10.6244 13.7014 10.1735 13.6424C9.38739 13.5397 8.77411 12.9547 8.66645 12.2047C8.60471 11.7746 8.55371 11.3074 8.55371 10.9375C8.55371 10.5676 8.60471 10.1004 8.66645 9.67027Z"
                                                fill="#00A3FF"
                                            />
                                            <path
                                                opacity="0.25"
                                                d="M1.4604 9.67027C1.56806 8.92033 2.18134 8.33526 2.96743 8.23256C3.4183 8.17365 3.90803 8.125 4.29576 8.125C4.68349 8.125 5.17322 8.17365 5.62408 8.23256C6.41018 8.33526 7.02346 8.92033 7.13112 9.67027C7.19287 10.1004 7.24386 10.5676 7.24386 10.9375C7.24386 11.3074 7.19287 11.7746 7.13112 12.2047C7.02346 12.9547 6.41018 13.5397 5.62408 13.6424C5.17322 13.7014 4.68349 13.75 4.29576 13.75C3.90803 13.75 3.4183 13.7014 2.96743 13.6424C2.18134 13.5397 1.56806 12.9547 1.4604 12.2047C1.39865 11.7746 1.34766 11.3074 1.34766 10.9375C1.34766 10.5676 1.39865 10.1004 1.4604 9.67027Z"
                                                fill="#00A3FF"
                                            />
                                            <path
                                                opacity="0.25"
                                                d="M8.66645 2.79527C8.77411 2.04533 9.38739 1.46026 10.1735 1.35756C10.6244 1.29865 11.1141 1.25 11.5018 1.25C11.8895 1.25 12.3793 1.29865 12.8301 1.35756C13.6162 1.46026 14.2295 2.04533 14.3372 2.79527C14.3989 3.2254 14.4499 3.6926 14.4499 4.0625C14.4499 4.4324 14.3989 4.8996 14.3372 5.32973C14.2295 6.07967 13.6162 6.66474 12.8301 6.76744C12.3793 6.82635 11.8895 6.875 11.5018 6.875C11.1141 6.875 10.6244 6.82635 10.1735 6.76744C9.38739 6.66474 8.77411 6.07967 8.66645 5.32973C8.60471 4.8996 8.55371 4.4324 8.55371 4.0625C8.55371 3.6926 8.60471 3.2254 8.66645 2.79527Z"
                                                fill="#00A3FF"
                                            />
                                            <path
                                                d="M1.4604 2.79527C1.56806 2.04533 2.18134 1.46026 2.96743 1.35756C3.4183 1.29865 3.90803 1.25 4.29576 1.25C4.68349 1.25 5.17322 1.29865 5.62408 1.35756C6.41018 1.46026 7.02346 2.04533 7.13112 2.79527C7.19287 3.2254 7.24386 3.6926 7.24386 4.0625C7.24386 4.4324 7.19287 4.8996 7.13112 5.32973C7.02346 6.07967 6.41018 6.66474 5.62408 6.76744C5.17322 6.82635 4.68349 6.875 4.29576 6.875C3.90803 6.875 3.4183 6.82635 2.96743 6.76744C2.18134 6.66474 1.56806 6.07967 1.4604 5.32973C1.39865 4.8996 1.34766 4.4324 1.34766 4.0625C1.34766 3.6926 1.39865 3.2254 1.4604 2.79527Z"
                                                fill="#00A3FF"
                                            />
                                        </svg>
                                        فیلتر
                                    </button>
                                </div>
                            </div>
                            <div className="msg-content">
                                <textarea placeholder="نوشتن پیام ..."></textarea>
                                <div className="send-div">
                                    <div className="d-flex">
                                        <label>
                                            <input type="checkbox" />
                                            نرم افزار
                                        </label>
                                        <label>
                                            <input type="checkbox" />
                                            پیام کوتاه
                                        </label>
                                    </div>
                                    <button>ارسال</button>
                                </div>
                            </div>
                            <div className="pm-box">
                                <div className="pm-head">
                                    <div className="pm-right">
                                        <img
                                            src="/images/pm.png"
                                            width={60}
                                            height={60}
                                            alt=""
                                        />
                                        <div>
                                            <span className="name">
                                                موسسه سفیر امید
                                            </span>
                                            <span className="person">شما</span>
                                        </div>
                                    </div>
                                    <div className="pm-left">
                                        <div className="text-box">
                                            1401/07/31 - 08:10
                                        </div>
                                        <div className="text-box">
                                            پیام کوتاه - نرم افزار
                                        </div>
                                    </div>
                                </div>
                                <p>
                                    لورم ایپسوم متن ساختگی با تولید سادگی
                                    نامفهوم از صنعت چاپ و با استفاده از طراحان
                                    گرافیک است چاپگرها و متون بلکه روزنامه و
                                    مجله در ستون و سطرآنچنان که لازم است و برای
                                    شرایط فعلی تکنولوژی مورد نیاز و کاربردهای
                                    متنوع با هدف بهبود ابزارهای کاربردی می باشد.
                                </p>
                            </div>
                            <div className="pm-box">
                                <div className="pm-head">
                                    <div className="pm-right">
                                        <img
                                            src="/images/prof.png"
                                            width={60}
                                            height={60}
                                            alt=""
                                        />
                                        <div>
                                            <span className="name">
                                                هایده نعمتی
                                            </span>
                                            <span className="person">
                                                دانش آموز دبیرستان دخترانه
                                                فرزانگان
                                            </span>
                                        </div>
                                    </div>
                                    <div className="pm-left">
                                        <div className="text-box">
                                            1401/07/31 - 08:10
                                        </div>
                                        <div className="text-box">
                                            نرم افزار
                                        </div>
                                    </div>
                                </div>
                                <p>
                                    لورم ایپسوم متن ساختگی با تولید سادگی
                                    نامفهوم از صنعت چاپ و با استفاده از طراحان
                                    گرافیک است چاپگرها و متون بلکه روزنامه و
                                    مجله در ستون و سطرآنچنان که لازم است و برای
                                    شرایط فعلی تکنولوژی مورد نیاز و کاربردهای
                                    متنوع با هدف بهبود ابزارهای کاربردی می باشد.
                                </p>
                            </div>
                        </Messages>
                    ) : activeTab === 7 ? (
                        <Messages>
                            <div className="msgs-head">
                                <h6>نظرات و شکایات (10)</h6>
                                <div className="d-flex">
                                    <button>
                                        <svg
                                            width="15"
                                            height="15"
                                            viewBox="0 0 15 15"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                opacity="0.3"
                                                d="M5.79625 11.2123C6.14083 10.8677 6.14083 10.3091 5.79625 9.96449C5.45167 9.61991 4.893 9.61991 4.54842 9.96449L1.01901 13.4939C0.67443 13.8385 0.67443 14.3972 1.01901 14.7417C1.36359 15.0863 1.92226 15.0863 2.26684 14.7417L5.79625 11.2123Z"
                                                fill="#00A3FF"
                                            />
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M14.8779 6.17646C14.8779 9.58763 12.1126 12.3529 8.70147 12.3529C5.2903 12.3529 2.525 9.58763 2.525 6.17646C2.525 2.7653 5.2903 0 8.70147 0C12.1126 0 14.8779 2.7653 14.8779 6.17646ZM4.28973 6.17647C4.28973 8.61302 6.26495 10.5882 8.7015 10.5882C11.138 10.5882 13.1133 8.61302 13.1133 6.17647C13.1133 3.73992 11.138 1.76471 8.7015 1.76471C6.26495 1.76471 4.28973 3.73992 4.28973 6.17647Z"
                                                fill="#00A3FF"
                                            />
                                        </svg>
                                        جستجو ...
                                    </button>
                                    <button>
                                        <svg
                                            width="16"
                                            height="15"
                                            viewBox="0 0 16 15"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                opacity="0.25"
                                                d="M8.66645 9.67027C8.77411 8.92033 9.38739 8.33526 10.1735 8.23256C10.6244 8.17365 11.1141 8.125 11.5018 8.125C11.8895 8.125 12.3793 8.17365 12.8301 8.23256C13.6162 8.33526 14.2295 8.92033 14.3372 9.67027C14.3989 10.1004 14.4499 10.5676 14.4499 10.9375C14.4499 11.3074 14.3989 11.7746 14.3372 12.2047C14.2295 12.9547 13.6162 13.5397 12.8301 13.6424C12.3793 13.7014 11.8895 13.75 11.5018 13.75C11.1141 13.75 10.6244 13.7014 10.1735 13.6424C9.38739 13.5397 8.77411 12.9547 8.66645 12.2047C8.60471 11.7746 8.55371 11.3074 8.55371 10.9375C8.55371 10.5676 8.60471 10.1004 8.66645 9.67027Z"
                                                fill="#00A3FF"
                                            />
                                            <path
                                                opacity="0.25"
                                                d="M1.4604 9.67027C1.56806 8.92033 2.18134 8.33526 2.96743 8.23256C3.4183 8.17365 3.90803 8.125 4.29576 8.125C4.68349 8.125 5.17322 8.17365 5.62408 8.23256C6.41018 8.33526 7.02346 8.92033 7.13112 9.67027C7.19287 10.1004 7.24386 10.5676 7.24386 10.9375C7.24386 11.3074 7.19287 11.7746 7.13112 12.2047C7.02346 12.9547 6.41018 13.5397 5.62408 13.6424C5.17322 13.7014 4.68349 13.75 4.29576 13.75C3.90803 13.75 3.4183 13.7014 2.96743 13.6424C2.18134 13.5397 1.56806 12.9547 1.4604 12.2047C1.39865 11.7746 1.34766 11.3074 1.34766 10.9375C1.34766 10.5676 1.39865 10.1004 1.4604 9.67027Z"
                                                fill="#00A3FF"
                                            />
                                            <path
                                                opacity="0.25"
                                                d="M8.66645 2.79527C8.77411 2.04533 9.38739 1.46026 10.1735 1.35756C10.6244 1.29865 11.1141 1.25 11.5018 1.25C11.8895 1.25 12.3793 1.29865 12.8301 1.35756C13.6162 1.46026 14.2295 2.04533 14.3372 2.79527C14.3989 3.2254 14.4499 3.6926 14.4499 4.0625C14.4499 4.4324 14.3989 4.8996 14.3372 5.32973C14.2295 6.07967 13.6162 6.66474 12.8301 6.76744C12.3793 6.82635 11.8895 6.875 11.5018 6.875C11.1141 6.875 10.6244 6.82635 10.1735 6.76744C9.38739 6.66474 8.77411 6.07967 8.66645 5.32973C8.60471 4.8996 8.55371 4.4324 8.55371 4.0625C8.55371 3.6926 8.60471 3.2254 8.66645 2.79527Z"
                                                fill="#00A3FF"
                                            />
                                            <path
                                                d="M1.4604 2.79527C1.56806 2.04533 2.18134 1.46026 2.96743 1.35756C3.4183 1.29865 3.90803 1.25 4.29576 1.25C4.68349 1.25 5.17322 1.29865 5.62408 1.35756C6.41018 1.46026 7.02346 2.04533 7.13112 2.79527C7.19287 3.2254 7.24386 3.6926 7.24386 4.0625C7.24386 4.4324 7.19287 4.8996 7.13112 5.32973C7.02346 6.07967 6.41018 6.66474 5.62408 6.76744C5.17322 6.82635 4.68349 6.875 4.29576 6.875C3.90803 6.875 3.4183 6.82635 2.96743 6.76744C2.18134 6.66474 1.56806 6.07967 1.4604 5.32973C1.39865 4.8996 1.34766 4.4324 1.34766 4.0625C1.34766 3.6926 1.39865 3.2254 1.4604 2.79527Z"
                                                fill="#00A3FF"
                                            />
                                        </svg>
                                        فیلتر
                                    </button>
                                </div>
                            </div>
                            {props.data.ComplaintsList !== undefined &&
                                props.data.ComplaintsList.map((item) => {
                                    return (
                                        <div className="pm-box">
                                            <div className="pm-head">
                                                <div className="pm-right">
                                                    <img
                                                        src={item.student_image}
                                                        width={60}
                                                        height={60}
                                                        alt=""
                                                    />
                                                    <div>
                                                        <span className="name">
                                                            {props.data
                                                                .Driver !==
                                                                undefined &&
                                                                props.data
                                                                    .Driver
                                                                    .name}
                                                            <span>
                                                                {" "}
                                                                {props.data
                                                                    .Driver !==
                                                                    undefined &&
                                                                    props.data
                                                                        .Driver
                                                                        .l_name}
                                                            </span>
                                                        </span>
                                                        <span className="person">
                                                            ثبت نظر توسط{" "}
                                                            {item.student_name}
                                                            (دانش آموز
                                                            <span className="me-1">
                                                                {
                                                                    item.school_name
                                                                }
                                                            </span>
                                                            )
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="pm-left">
                                                    <div className="text-box">
                                                        1401/07/31 - 08:10
                                                    </div>
                                                </div>
                                            </div>
                                            <p>{item.text}</p>
                                        </div>
                                    );
                                })}
                        </Messages>
                    ) : (
                        ""
                    )}
                </>
            )}
        </Main>
    );
};
export default DriverInfo;
