import { useEffect, useState } from "react";
import styled from "styled-components";
import * as shamsi from "shamsi-date-converter";
import axios from "axios";
import { BASE_URL } from "../BaseUrl";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ChartOne } from "./ServiceChart";

const Main = styled.div`
    padding: 30px 36px;
    .Toastify__toast-container {
        white-space: nowrap;
        width: unset !important;
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
                    border-radius: 12px;
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
                        margin: 0 2px;
                        font-weight: 500;
                        font-size: 14px;
                        text-align: right;

                        color: #b5b5c3;
                    }
                }
            }
            .left {
                display: flex;
                flex-direction: column;
                align-items: flex-end;
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
                        width: 108px;
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
                        span {
                            margin-bottom: 3px;
                            font-weight: 500;
                            font-size: 14px;
                            line-height: 16px;
                            display: flex;
                            align-items: center;
                            text-align: right;
                            margin-right: 10px;
                            color: #b5b5c3;
                        }
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
                .status {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #fff4de;
                    border-radius: 6px;
                    min-width: 103px;
                    max-width: 180px;
                    height: 32px;
                    font-weight: 400;
                    font-size: 12px;
                    line-height: 14px;
                    text-align: center;
                    color: #ffa800;
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
            width: 103px;
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
        .w-120 {
            width: 124.69px;
        }
        .w-78 {
            width: 78px;
        }
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
        .date {
            width: 168.27px;
            height: 36px;
            background: #f3f6f9;
            border-radius: 6px;
            display: flex;
            align-items: center;
            margin-right: 10px;
            justify-content: center;
            span {
                margin-right: 16px;
                font-weight: 700;
                font-size: 12px;
                line-height: 14px;
                color: #a1a5b7;
            }
        }
    }
    .travel-btns {
        display: flex;
        align-items: center;
        width: 100%;
        justify-content: flex-end;
        margin-top: 10px;
        button {
            width: 123.72px;
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

const Settings = styled.div`
    min-height: 507px;
    width: 100%;
    background: #ffffff;
    border-radius: 12px;
    margin-top: 30px;
    padding: 29px 30px;
    .settings-head {
        border-bottom: 1px solid #eff2f5;
        padding-bottom: 16px;
        h6 {
            font-weight: 700;
            font-size: 20px;
            line-height: 23px;
            text-align: right;
            color: #3f4254;
        }
    }
`;

const StudentsInfo = (props) => {
    const [activeTab, setActiveTab] = useState(1);
    const [travelTabActive, setTravelTabActive] = useState(1);
    return (
        <Main>
            <div className="head">
                <ToastContainer
                    rtl={true}
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    pauseOnFocusLoss={false}
                    draggable
                    pauseOnHover={false}
                />
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
                                props.data !== undefined &&
                                props.data.Student !== undefined &&
                                props.data.Student.profile_image !==
                                    undefined &&
                                props.data.Student.profile_image
                            }
                            width={122}
                            height={122}
                            alt=""
                        />
                        <div>
                            <span className="name">
                                {props.data !== undefined &&
                                    props.data.Student !== undefined &&
                                    props.data.Student.name !== undefined &&
                                    props.data.Student.name}{" "}
                                {props.data !== undefined &&
                                    props.data.Student !== undefined &&
                                    props.data.Student.l_name !== undefined &&
                                    props.data.Student.l_name}
                            </span>
                            <span className="number">
                                {props.data !== undefined &&
                                    props.data.Student !== undefined &&
                                    props.data.Student.const_phone !==
                                        undefined &&
                                    props.data.Student.const_phone}
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
                                <small>دانش آموز</small>
                                <small>
                                    {props.data !== undefined &&
                                        props.data.School !== undefined &&
                                        props.data.School.name !== undefined &&
                                        props.data.School.name}
                                </small>
                            </span>
                        </div>
                    </div>
                    <div className="left">
                        <div className="status">ss</div>
                        <div className="dasheds">
                            <div className="div-1">
                                15 <span>کیلومتر</span>
                            </div>
                            <div className="div-1">
                                {props.data !== undefined &&
                                    props.data.ListServiceStudent !==
                                        undefined &&
                                    props.data.ListServiceStudent.length}
                                <span>سرویس</span>
                            </div>
                            <div className="div-2"></div>
                        </div>
                    </div>
                </div>
                <div className="tabs">
                    <div
                        onClick={() => {
                            setActiveTab(1);
                        }}
                        className={activeTab === 1 ? "item active" : "item"}
                    >
                        اطلاعات فردی
                    </div>
                    <div
                        onClick={() => {
                            setActiveTab(2);
                        }}
                        className={activeTab === 2 ? "item active" : "item"}
                    >
                        اطلاعات موسسه
                    </div>
                    <div
                        onClick={() => {
                            setActiveTab(3);
                        }}
                        className={activeTab === 3 ? "item active" : "item"}
                    >
                        سرویس‌ها
                    </div>
                    <div
                        onClick={() => {
                            setActiveTab(4);
                        }}
                        className={activeTab === 4 ? "item active" : "item"}
                    >
                        سفرها
                    </div>
                    <div
                        onClick={() => {
                            setActiveTab(5);
                        }}
                        className={activeTab === 5 ? "item active" : "item"}
                    >
                        حسابداری
                    </div>
                    <div
                        onClick={() => {
                            setActiveTab(6);
                        }}
                        className={activeTab === 6 ? "item active" : "item"}
                    >
                        پیام‌ها
                    </div>
                    <div
                        onClick={() => {
                            setActiveTab(7);
                        }}
                        className={activeTab === 7 ? "item active" : "item"}
                    >
                        نظرات و شکایات
                    </div>
                    <div
                        onClick={() => {
                            setActiveTab(8);
                        }}
                        className={activeTab === 8 ? "item active" : "item"}
                    >
                        تنظیمات
                    </div>
                </div>
            </div>
            {activeTab === 1 ? (
                <div className="cont">
                    <div className="right">
                        <div className="form-1">
                            <div className="head">
                                <h6>مشخصات فردی</h6>
                            </div>
                            <form>
                                <label>
                                    نام
                                    <input
                                        disabled
                                        // onChange={(e) => {
                                        // setName(e.target.value);
                                        // }}
                                        // value={name}
                                        value={
                                            props.data !== undefined &&
                                            props.data.Student !== undefined &&
                                            props.data.Student.name !==
                                                undefined &&
                                            props.data.Student.name
                                        }
                                        // type="text"
                                    />
                                </label>
                                <label>
                                    نام خانوادگی
                                    <input
                                        disabled
                                        // onChange={(e) => {
                                        // setLastName(e.target.value);
                                        // }}
                                        // value={lastName}
                                        // type="text"
                                        value={
                                            props.data !== undefined &&
                                            props.data.Student !== undefined &&
                                            props.data.Student.l_name !==
                                                undefined &&
                                            props.data.Student.l_name
                                        }
                                    />
                                </label>
                                <label>
                                    نام پدر
                                    <input
                                        disabled
                                        // onChange={(e) => {
                                        // setFatherName(e.target.value);
                                        // }}
                                        // value={fatherName}
                                        // type="text"
                                        value={
                                            props.data !== undefined &&
                                            props.data.Student !== undefined &&
                                            props.data.Student.father_name !==
                                                undefined &&
                                            props.data.Student.father_name
                                        }
                                    />
                                </label>
                                <label className="no-jus">
                                    جنسیت
                                    <label htmlFor="female">
                                        <input
                                            disabled
                                            type="radio"
                                            name="gender"
                                            id="female"
                                            // checked={gender == "زن"}
                                            checked={
                                                props.data !== undefined &&
                                                props.data.Student !==
                                                    undefined &&
                                                props.data.Student.gender !==
                                                    undefined &&
                                                props.data.Student.gender ==
                                                    "زن"
                                            }
                                        />
                                        دختر
                                    </label>
                                    <label htmlFor="male"> 
                                        <input
                                            disabled
                                            type="radio"
                                            name="gender"
                                            id="male"
                                            // checked={gender == "مرد"}
                                            checked={
                                                props.data !== undefined &&
                                                props.data.Student !==
                                                    undefined &&
                                                props.data.Student.gender !==
                                                    undefined &&
                                                props.data.Student.gender ==
                                                    "مرد"
                                            }
                                        />
                                        پسر
                                    </label>
                                </label>
                                <label>
                                    شماره موبایل
                                    <input
                                        disabled
                                        // onChange={(e) => {
                                        //     setPhoneNumber(e.target.value);
                                        // }}
                                        // value={phoneNumber}
                                        type="text"
                                        value={
                                            props.data !== undefined &&
                                            props.data.Student !== undefined &&
                                            props.data.Student
                                                .name_in_manage !== undefined &&
                                            props.data.Student.name_in_manage
                                        }
                                    />{" "}
                                </label>
                                <label>
                                    ملیت
                                    <input
                                        disabled
                                        // onChange={(e) => {
                                        //     setDuty(e.target.value);
                                        // }}
                                        // value={duty}
                                        type="text"
                                        value={
                                            props.data !== undefined &&
                                            props.data.Student !== undefined &&
                                            props.data.Student.nationality !==
                                                undefined &&
                                            props.data.Student.nationality
                                        }
                                    />{" "}
                                </label>
                                <label>
                                    کد ملی
                                    <input
                                        disabled
                                        // onChange={(e) => {
                                        //     setBirthDay(e.target.value);
                                        // }}
                                        // value={birthDay}
                                        type="text"
                                        value={
                                            props.data !== undefined &&
                                            props.data.Student !== undefined &&
                                            props.data.Student.national_code !==
                                                undefined &&
                                            props.data.Student.national_code
                                        }
                                    />{" "}
                                </label>
                            </form>
                        </div>
                    </div>
                    <div className="left">
                        <div className="form-1">
                            <div className="head">
                                <h6>اطلاعات محل سکونت</h6>
                            </div>
                            <form>
                                <label>
                                    استان
                                    <input
                                        disabled
                                        type="text"
                                        // onChange={(e) => {
                                        //     setState(e.target.value);
                                        // }}
                                        // value={state}
                                        value={
                                            props.data !== undefined &&
                                            props.data.Student !== undefined &&
                                            props.data.Student.state !==
                                                undefined &&
                                            props.data.Student.state
                                        }
                                    />
                                </label>
                                <label>
                                    شهر
                                    <input
                                        disabled
                                        type="text"
                                        // onChange={(e) => {
                                        //     setCity(e.target.value);
                                        // }}
                                        // value={city}
                                        value={
                                            props.data !== undefined &&
                                            props.data.Student !== undefined &&
                                            props.data.Student.city !==
                                                undefined &&
                                            props.data.Student.city
                                        }
                                    />
                                </label>
                                <label>
                                    نشانی
                                    <input
                                        disabled
                                        type="text"
                                        // onChange={(e) => {
                                        //     setAddress(e.target.value);
                                        // }}
                                        // value={address}
                                        value={
                                            props.data !== undefined &&
                                            props.data.Student !== undefined &&
                                            props.data.Student.address !==
                                                undefined &&
                                            props.data.Student.address
                                        }
                                    />
                                </label>
                                <label>
                                    تلفن ثابت
                                    <input
                                        disabled
                                        type="text"
                                        // onChange={(e) => {
                                        //     setConstPhone(e.target.value);
                                        // }}
                                        // value={constPhone}
                                        value={
                                            props.data !== undefined &&
                                            props.data.Student !== undefined &&
                                            props.data.Student.const_phone !==
                                                undefined &&
                                            props.data.Student.const_phone
                                        }
                                    />
                                </label>
                                <div className="form-1">
                                    <label htmlFor="file" className="file">
                                        <input disabled type="file" id="file" />
                                        لوکیشن محل سکونت
                                    </label>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            ) : activeTab === 2 ? (
                <div className="cont">
                    <div className="right">
                        <div className="form-1">
                            <div className="head">
                                <h6>اطلاعات موسسه</h6>
                            </div>
                            <form>
                                <label>
                                    نام موسسه
                                    <input
                                        disabled
                                        // onChange={(e) => {
                                        // setName(e.target.value);
                                        // }}
                                        // value={name}
                                        value={
                                            props.data !== undefined &&
                                            props.data.School !== undefined &&
                                            props.data.School.name !==
                                                undefined &&
                                            props.data.School.name
                                        }
                                        // type="text"
                                    />
                                </label>
                                <label>
                                    کد موسسه
                                    <input
                                        disabled
                                        // onChange={(e) => {
                                        // setLastName(e.target.value);
                                        // }}
                                        // value={lastName}
                                        // type="text"
                                        value={
                                            props.data !== undefined &&
                                            props.data.School !== undefined &&
                                            props.data.School.code !==
                                                undefined &&
                                            props.data.School.code
                                        }
                                    />
                                </label>
                                <label>
                                    مدیر موسسه
                                    <input
                                        disabled
                                        // onChange={(e) => {
                                        //     setPhoneNumber(e.target.value);
                                        // }}
                                        // value={phoneNumber}
                                        type="text"
                                        value={
                                            props.data !== undefined &&
                                            props.data.School !== undefined &&
                                            props.data.School.name_in_manage !==
                                                undefined &&
                                            props.data.School.name_in_manage
                                        }
                                    />{" "}
                                </label>
                                <label>
                                    شماره تلفن همراه
                                    <input
                                        disabled
                                        // onChange={(e) => {
                                        //     setDuty(e.target.value);
                                        // }}
                                        // value={duty}
                                        type="text"
                                        value={
                                            props.data !== undefined &&
                                            props.data.School !== undefined &&
                                            props.data.School.phone_number !==
                                                undefined &&
                                            props.data.School.phone_number
                                        }
                                    />{" "}
                                </label>
                                <label>
                                    شماره شبا موسسه
                                    <input
                                        disabled
                                        // onChange={(e) => {
                                        //     setBirthDay(e.target.value);
                                        // }}
                                        // value={birthDay}
                                        type="text"
                                        value={
                                            props.data !== undefined &&
                                            props.data.School !== undefined &&
                                            props.data.School.shaba_number !==
                                                undefined &&
                                            props.data.School.shaba_number
                                        }
                                    />{" "}
                                </label>
                                <label>
                                    نام بانک
                                    <input
                                        disabled
                                        // onChange={(e) => {
                                        //     setNationalCode(e.target.value);
                                        // }}
                                        // value={nationalCode}
                                        type="text"
                                        value={
                                            props.data !== undefined &&
                                            props.data.School !== undefined &&
                                            props.data.School.bank_name !==
                                                undefined &&
                                            props.data.School.bank_name
                                        }
                                    />{" "}
                                </label>
                                <label>
                                    شناسه حقوقی
                                    <input
                                        disabled
                                        // onChange={(e) => {
                                        //     setShenas(e.target.value);
                                        // }}
                                        // value={shenas}
                                        type="text"
                                        value={
                                            props.data !== undefined &&
                                            props.data.School !== undefined &&
                                            props.data.School.legel_id !==
                                                undefined &&
                                            props.data.School.legel_id
                                        }
                                    />{" "}
                                </label>
                            </form>
                        </div>
                    </div>
                    <div className="left">
                        <div className="form-1">
                            <div className="head">
                                <h6>نشانی موسسه</h6>
                            </div>
                            <form>
                                <label>
                                    استان
                                    <input
                                        disabled
                                        type="text"
                                        // onChange={(e) => {
                                        //     setState(e.target.value);
                                        // }}
                                        // value={state}
                                        value={
                                            props.data !== undefined &&
                                            props.data.School !== undefined &&
                                            props.data.School.state !==
                                                undefined &&
                                            props.data.School.state
                                        }
                                    />
                                </label>
                                <label>
                                    شهر
                                    <input
                                        disabled
                                        type="text"
                                        // onChange={(e) => {
                                        //     setCity(e.target.value);
                                        // }}
                                        // value={city}
                                        value={
                                            props.data !== undefined &&
                                            props.data.School !== undefined &&
                                            props.data.School.city !==
                                                undefined &&
                                            props.data.School.city
                                        }
                                    />
                                </label>
                                <label>
                                    نشانی
                                    <input
                                        disabled
                                        type="text"
                                        // onChange={(e) => {
                                        //     setAddress(e.target.value);
                                        // }}
                                        // value={address}
                                        value={
                                            props.data !== undefined &&
                                            props.data.School !== undefined &&
                                            props.data.School.address !==
                                                undefined &&
                                            props.data.School.address
                                        }
                                    />
                                </label>
                                <label>
                                    تلفن ثابت
                                    <input
                                        disabled
                                        type="text"
                                        // onChange={(e) => {
                                        //     setConstPhone(e.target.value);
                                        // }}
                                        // value={constPhone}
                                        value={
                                            props.data !== undefined &&
                                            props.data.School !== undefined &&
                                            props.data.School.const_phone !==
                                                undefined &&
                                            props.data.School.const_phone
                                        }
                                    />
                                </label>
                                <div className="form-1">
                                    <label htmlFor="file" className="file">
                                        <input disabled type="file" id="file" />
                                        لوکیشن موسسه
                                    </label>
                                </div>
                            </form>
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
                                <th>نام راننده</th>
                                <th>خودرو</th>
                                <th>زمان </th>
                                <th>نام موسسه</th>
                                <th>دانش آموزان</th>
                                <th>وضعیت</th>
                                <th>عملیات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {console.log(props.list.driver_car_color)} */}
                            {/* {props.list !== undefined &&
                                props.list.map((item) => {
                                    return <div>sss</div>;
                                })} */}
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
                                            سفرهای انجام شده(بدون احتساب سفرهای
                                            جایگزین)
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
                                        <span>سفرهای در انتظار انجام</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ChartDiv>
                    <Travels>
                        <div className="head">
                            <div className="right-head">
                                <h6>سفرها(430)</h6>
                                <div className="date">
                                    <svg
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
                                    <span>از تاریخ 1401.07.12</span> 
                                </div>
                                <div className="date">
                                    <svg
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
                                    <span>تا تاریخ 1401.07.12</span>
                                </div>
                            </div>
                            <div className="left-head">
                                <span
                                    onClick={() => {
                                        setTravelTabActive(5);
                                    }}
                                    className={travelTabActive == 5 && "active"}
                                >
                                    کنسل شده
                                </span>
                                <span
                                    onClick={() => {
                                        setTravelTabActive(4);
                                    }}
                                    className={travelTabActive == 4 && "active"}
                                >
                                    جایگزین شده
                                </span>
                                <span
                                    onClick={() => {
                                        setTravelTabActive(3);
                                    }}
                                    className={travelTabActive == 3 && "active"}
                                >
                                    انجام شده
                                </span>
                                <span
                                    onClick={() => {
                                        setTravelTabActive(2);
                                    }}
                                    className={travelTabActive == 2 && "active"}
                                >
                                    در انتظار انجام
                                </span>
                                <span
                                    onClick={() => {
                                        setTravelTabActive(1);
                                    }}
                                    className={travelTabActive == 1 && "active"}
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
                                        <th>شماره سفر</th>
                                        <th>راننده</th>
                                        <th>خودرو</th>
                                        <th>زمان</th>
                                        <th>وضعیت</th>
                                        <th>عملیات</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>#7431</td>
                                        <td>
                                            <div className="img-divs">
                                                <img
                                                    width={51}
                                                    height={51}
                                                    src="/images/driver-prof.png"
                                                    alt=""
                                                />
                                                <div>
                                                    <span className="span-1">
                                                        حسام الدین طباطبایی
                                                    </span>
                                                    <span className="span-2">
                                                        09123456789
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div>
                                                <span className="span-1">
                                                    پژو 206 - سفید{" "}
                                                </span>
                                                <span className="span-2">
                                                    54 ایران 24 ص 543
                                                </span>
                                            </div>
                                        </td>
                                        <td>
                                            <div>
                                                <span className="span-1">
                                                    رفت − 08:00
                                                </span>
                                                <span className="span-2">
                                                    1401.04.09
                                                </span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="status">
                                                در انتظار انجام
                                            </div>
                                        </td>
                                        <td>
                                            <button className="w-120">
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
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </TableDiv>
                    </Travels>
                </>
            ) : activeTab === 5 ? (
                <>
                    <Travels>
                        <div className="head">
                            <div className="right-head">
                                <h6>تراکنش‌ها(10)</h6>
                            </div>
                            <div className=" travel-btns">
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
                        </div>
                        <TableDiv className="mt-0">
                            <div className="head">
                                <h6>پرداخت‌های نقدی</h6>
                            </div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>نوع عملیات</th>
                                        <th>
                                            مبلغ{" "}
                                            <svg
                                                width="16"
                                                height="16"
                                                viewBox="0 0 16 16"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <rect
                                                    opacity="0.3"
                                                    x="7.33301"
                                                    y="3.33301"
                                                    width="1.33333"
                                                    height="9.33333"
                                                    rx="0.666667"
                                                    fill="#3699FF"
                                                />
                                                <path
                                                    d="M4.47108 7.52892C4.21073 7.26857 3.78862 7.26857 3.52827 7.52892C3.26792 7.78927 3.26792 8.21138 3.52827 8.47173L7.52827 12.4717C7.78065 12.7241 8.18705 12.7329 8.45016 12.4918L12.4502 8.82509C12.7216 8.5763 12.7399 8.15459 12.4911 7.88317C12.2423 7.61176 11.8206 7.59343 11.5492 7.84222L8.01972 11.0776L4.47108 7.52892Z"
                                                    fill="#3699FF"
                                                />
                                            </svg>
                                        </th>
                                        <th>
                                            زمان
                                            <svg
                                                width="16"
                                                height="16"
                                                viewBox="0 0 16 16"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <rect
                                                    opacity="0.3"
                                                    x="7.33301"
                                                    y="3.33301"
                                                    width="1.33333"
                                                    height="9.33333"
                                                    rx="0.666667"
                                                    fill="#3699FF"
                                                />
                                                <path
                                                    d="M4.47108 7.52892C4.21073 7.26857 3.78862 7.26857 3.52827 7.52892C3.26792 7.78927 3.26792 8.21138 3.52827 8.47173L7.52827 12.4717C7.78065 12.7241 8.18705 12.7329 8.45016 12.4918L12.4502 8.82509C12.7216 8.5763 12.7399 8.15459 12.4911 7.88317C12.2423 7.61176 11.8206 7.59343 11.5492 7.84222L8.01972 11.0776L4.47108 7.52892Z"
                                                    fill="#3699FF"
                                                />
                                            </svg>
                                        </th>
                                        <th>نام بانک</th>
                                        <th>شماره پیگیری</th>
                                        <th>وضعیت</th>
                                        <th>عملیات</th>
                                    </tr>
                                </thead>
                                <tbody className="new-td">
                                    <tr>
                                        <td>
                                            <svg
                                                width="21"
                                                height="21"
                                                viewBox="0 0 21 21"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <rect
                                                    opacity="0.5"
                                                    width="1.67102"
                                                    height="11.6971"
                                                    rx="0.835508"
                                                    transform="matrix(0.708943 0.705266 -0.708943 0.705266 14.2051 6.49707)"
                                                    fill="#50CD89"
                                                />
                                                <path
                                                    d="M7.69022 7.9196C7.22758 7.9196 6.85254 7.5465 6.85254 7.08626C6.85254 6.62603 7.22758 6.25293 7.69022 6.25293L14.7981 6.25293C15.2466 6.25293 15.6156 6.60433 15.635 7.05007L15.9312 13.8265C15.9513 14.2863 15.5929 14.6753 15.1307 14.6953C14.6685 14.7152 14.2775 14.3587 14.2574 13.8989L13.9961 7.9196H7.69022Z"
                                                    fill="#50CD89"
                                                />
                                            </svg>
                                            پرداخت
                                        </td>
                                        <td>5,000،000 ریال</td>
                                        <td>1401.06.28 - 17:43</td>
                                        <td>بانک ملی</td>
                                        <td>3456453243423</td>
                                        <td>
                                            <div className="status">
                                                ثبت دستی
                                            </div>
                                        </td>
                                        <td>
                                            <button className="w-78">
                                                جزئیات
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
                                </tbody>
                            </table>
                            <div className="head mt-4">
                                <h6>پرداخت‌های اقساطی</h6>
                            </div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>نوع عملیات</th>
                                        <th>
                                            مبلغ{" "}
                                            <svg
                                                width="16"
                                                height="16"
                                                viewBox="0 0 16 16"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <rect
                                                    opacity="0.3"
                                                    x="7.33301"
                                                    y="3.33301"
                                                    width="1.33333"
                                                    height="9.33333"
                                                    rx="0.666667"
                                                    fill="#3699FF"
                                                />
                                                <path
                                                    d="M4.47108 7.52892C4.21073 7.26857 3.78862 7.26857 3.52827 7.52892C3.26792 7.78927 3.26792 8.21138 3.52827 8.47173L7.52827 12.4717C7.78065 12.7241 8.18705 12.7329 8.45016 12.4918L12.4502 8.82509C12.7216 8.5763 12.7399 8.15459 12.4911 7.88317C12.2423 7.61176 11.8206 7.59343 11.5492 7.84222L8.01972 11.0776L4.47108 7.52892Z"
                                                    fill="#3699FF"
                                                />
                                            </svg>
                                        </th>
                                        <th>
                                            تاریخ سررسید
                                            <svg
                                                width="16"
                                                height="16"
                                                viewBox="0 0 16 16"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <rect
                                                    opacity="0.3"
                                                    x="7.33301"
                                                    y="3.33301"
                                                    width="1.33333"
                                                    height="9.33333"
                                                    rx="0.666667"
                                                    fill="#3699FF"
                                                />
                                                <path
                                                    d="M4.47108 7.52892C4.21073 7.26857 3.78862 7.26857 3.52827 7.52892C3.26792 7.78927 3.26792 8.21138 3.52827 8.47173L7.52827 12.4717C7.78065 12.7241 8.18705 12.7329 8.45016 12.4918L12.4502 8.82509C12.7216 8.5763 12.7399 8.15459 12.4911 7.88317C12.2423 7.61176 11.8206 7.59343 11.5492 7.84222L8.01972 11.0776L4.47108 7.52892Z"
                                                    fill="#3699FF"
                                                />
                                            </svg>
                                        </th>
                                        <th>نام بانک</th>
                                        <th>شماره چک</th>
                                        <th>وضعیت</th>
                                        <th>عملیات</th>
                                    </tr>
                                </thead>
                                <tbody className="new-td">
                                    <tr>
                                        <td>
                                            <svg
                                                width="21"
                                                height="21"
                                                viewBox="0 0 21 21"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <rect
                                                    opacity="0.5"
                                                    width="1.67102"
                                                    height="11.6971"
                                                    rx="0.835508"
                                                    transform="matrix(0.708943 0.705266 -0.708943 0.705266 14.2051 6.49707)"
                                                    fill="#50CD89"
                                                />
                                                <path
                                                    d="M7.69022 7.9196C7.22758 7.9196 6.85254 7.5465 6.85254 7.08626C6.85254 6.62603 7.22758 6.25293 7.69022 6.25293L14.7981 6.25293C15.2466 6.25293 15.6156 6.60433 15.635 7.05007L15.9312 13.8265C15.9513 14.2863 15.5929 14.6753 15.1307 14.6953C14.6685 14.7152 14.2775 14.3587 14.2574 13.8989L13.9961 7.9196H7.69022Z"
                                                    fill="#50CD89"
                                                />
                                            </svg>
                                            پرداخت
                                        </td>
                                        <td>12،000،000 ریال</td>
                                        <td>1401/04/12</td>
                                        <td>بانک ملی</td>
                                        <td>43562313545</td>
                                        <td>
                                            <div className="status">
                                                در انتظار وصول
                                            </div>
                                        </td>
                                        <td>
                                            <div className="d-flex">
                                                <button className="w-78">
                                                    ویرایش
                                                    <svg
                                                        width="17"
                                                        height="16"
                                                        viewBox="0 0 17 16"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M14.8302 2.98661C15.4076 3.56402 15.4171 4.49722 14.8515 5.08622L9.43462 10.7273C9.15933 11.014 8.78152 11.1797 8.38414 11.188L6.10882 11.2358L6.15688 8.94521C6.16502 8.55688 6.32349 8.18685 6.59893 7.91298L12.136 2.40759C12.7222 1.82467 13.6696 1.82602 14.2542 2.41063L14.8302 2.98661Z"
                                                            fill="#3699FF"
                                                        />
                                                        <path
                                                            opacity="0.3"
                                                            d="M9.29206 1.33301C9.66025 1.33301 9.95872 1.63148 9.95872 1.99967C9.95872 2.36786 9.66025 2.66634 9.29206 2.66634H4.69206C3.95568 2.66634 3.35872 3.26329 3.35872 3.99967V11.9997C3.35872 12.7361 3.95568 13.333 4.69206 13.333H12.6921C13.4284 13.333 14.0254 12.7361 14.0254 11.9997V8.66634C14.0254 8.29815 14.3239 7.99967 14.6921 7.99967C15.0602 7.99967 15.3587 8.29815 15.3587 8.66634V11.9997C15.3587 13.4724 14.1648 14.6663 12.6921 14.6663H4.69206C3.2193 14.6663 2.02539 13.4724 2.02539 11.9997V3.99967C2.02539 2.52692 3.2193 1.33301 4.69206 1.33301H9.29206Z"
                                                            fill="#3699FF"
                                                        />
                                                    </svg>
                                                </button>
                                                <button className="w-78 mx-2">
                                                    <span className="mt-1">
                                                        حذف
                                                    </span>
                                                    <svg
                                                        className="mb-1"
                                                        width="19"
                                                        height="18"
                                                        viewBox="0 0 19 18"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M5.19238 6V15C5.19238 15.8284 5.86396 16.5 6.69238 16.5H12.6924C13.5208 16.5 14.1924 15.8284 14.1924 15V6H5.19238Z"
                                                            fill="#3699FF"
                                                        />
                                                        <path
                                                            opacity="0.3"
                                                            fill-rule="evenodd"
                                                            clip-rule="evenodd"
                                                            d="M11.1924 3.375V3.25C11.1924 2.69772 10.7447 2.25 10.1924 2.25H9.19238C8.6401 2.25 8.19238 2.69772 8.19238 3.25V3.375H4.94238C4.66624 3.375 4.44238 3.59886 4.44238 3.875V4C4.44238 4.27614 4.66624 4.5 4.94238 4.5H14.4424C14.7185 4.5 14.9424 4.27614 14.9424 4V3.875C14.9424 3.59886 14.7185 3.375 14.4424 3.375H11.1924Z"
                                                            fill="#3699FF"
                                                        />
                                                    </svg>
                                                </button>
                                                <button className="w-78">
                                                    جزئیات
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
                                    <tr>
                                        <td>
                                            <svg
                                                width="21"
                                                height="21"
                                                viewBox="0 0 21 21"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <rect
                                                    opacity="0.5"
                                                    width="1.67102"
                                                    height="11.6971"
                                                    rx="0.835508"
                                                    transform="matrix(0.708943 0.705266 -0.708943 0.705266 14.2051 6.49707)"
                                                    fill="#50CD89"
                                                />
                                                <path
                                                    d="M7.69022 7.9196C7.22758 7.9196 6.85254 7.5465 6.85254 7.08626C6.85254 6.62603 7.22758 6.25293 7.69022 6.25293L14.7981 6.25293C15.2466 6.25293 15.6156 6.60433 15.635 7.05007L15.9312 13.8265C15.9513 14.2863 15.5929 14.6753 15.1307 14.6953C14.6685 14.7152 14.2775 14.3587 14.2574 13.8989L13.9961 7.9196H7.69022Z"
                                                    fill="#50CD89"
                                                />
                                            </svg>
                                            پرداخت
                                        </td>
                                        <td>12،000،000 ریال</td>
                                        <td>1401/04/12</td>
                                        <td>بانک ملی</td>
                                        <td>43562313545</td>
                                        <td>
                                            <div className="status">
                                                در انتظار وصول
                                            </div>
                                        </td>
                                        <td>
                                            <div className="d-flex">
                                                <button className="w-78">
                                                    ویرایش
                                                    <svg
                                                        width="17"
                                                        height="16"
                                                        viewBox="0 0 17 16"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M14.8302 2.98661C15.4076 3.56402 15.4171 4.49722 14.8515 5.08622L9.43462 10.7273C9.15933 11.014 8.78152 11.1797 8.38414 11.188L6.10882 11.2358L6.15688 8.94521C6.16502 8.55688 6.32349 8.18685 6.59893 7.91298L12.136 2.40759C12.7222 1.82467 13.6696 1.82602 14.2542 2.41063L14.8302 2.98661Z"
                                                            fill="#3699FF"
                                                        />
                                                        <path
                                                            opacity="0.3"
                                                            d="M9.29206 1.33301C9.66025 1.33301 9.95872 1.63148 9.95872 1.99967C9.95872 2.36786 9.66025 2.66634 9.29206 2.66634H4.69206C3.95568 2.66634 3.35872 3.26329 3.35872 3.99967V11.9997C3.35872 12.7361 3.95568 13.333 4.69206 13.333H12.6921C13.4284 13.333 14.0254 12.7361 14.0254 11.9997V8.66634C14.0254 8.29815 14.3239 7.99967 14.6921 7.99967C15.0602 7.99967 15.3587 8.29815 15.3587 8.66634V11.9997C15.3587 13.4724 14.1648 14.6663 12.6921 14.6663H4.69206C3.2193 14.6663 2.02539 13.4724 2.02539 11.9997V3.99967C2.02539 2.52692 3.2193 1.33301 4.69206 1.33301H9.29206Z"
                                                            fill="#3699FF"
                                                        />
                                                    </svg>
                                                </button>
                                                <button className="w-78 mx-2">
                                                    <span className="mt-1">
                                                        حذف
                                                    </span>
                                                    <svg
                                                        className="mb-1"
                                                        width="19"
                                                        height="18"
                                                        viewBox="0 0 19 18"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M5.19238 6V15C5.19238 15.8284 5.86396 16.5 6.69238 16.5H12.6924C13.5208 16.5 14.1924 15.8284 14.1924 15V6H5.19238Z"
                                                            fill="#3699FF"
                                                        />
                                                        <path
                                                            opacity="0.3"
                                                            fill-rule="evenodd"
                                                            clip-rule="evenodd"
                                                            d="M11.1924 3.375V3.25C11.1924 2.69772 10.7447 2.25 10.1924 2.25H9.19238C8.6401 2.25 8.19238 2.69772 8.19238 3.25V3.375H4.94238C4.66624 3.375 4.44238 3.59886 4.44238 3.875V4C4.44238 4.27614 4.66624 4.5 4.94238 4.5H14.4424C14.7185 4.5 14.9424 4.27614 14.9424 4V3.875C14.9424 3.59886 14.7185 3.375 14.4424 3.375H11.1924Z"
                                                            fill="#3699FF"
                                                        />
                                                    </svg>
                                                </button>
                                                <button className="w-78">
                                                    جزئیات
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
                                </tbody>
                            </table>
                            <div className="mt-2 w-100 d-flex align-items-center justify-content-between">
                                <span className="amount-span">
                                    مانده حساب :
                                </span>
                                <span className="amount-span">
                                    25,000,000 ریال
                                </span>
                            </div>
                        </TableDiv>
                    </Travels>
                </>
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
                                    <input type="checkbox"  />
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
                            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از
                            صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و
                            متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم
                            است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای
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
                                    <span className="name">هایده نعمتی</span>
                                    <span className="person">
                                        دانش آموز دبیرستان دخترانه فرزانگان
                                    </span>
                                </div>
                            </div>
                            <div className="pm-left">
                                <div className="text-box">
                                    1401/07/31 - 08:10
                                </div>
                                <div className="text-box">نرم افزار</div>
                            </div>
                        </div>
                        <p>
                            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از
                            صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و
                            متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم
                            است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای
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
                                        حسام الدین طباطبایی
                                    </span>
                                    <span className="person">
                                        ثبت نظر توسط هایده نعمتی (دانش آموز
                                        بیرستان دخترانه فرزانگان)
                                    </span>
                                </div>
                            </div>
                            <div className="pm-left">
                                <div className="text-box">
                                    1401/07/31 - 08:10
                                </div>
                            </div>
                        </div>
                        <p>
                            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از
                            صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و
                            متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم
                            است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای
                            متنوع با هدف بهبود ابزارهای کاربردی می باشد.
                        </p>
                    </div>
                </Messages>
            ) : (
                <Settings>
                    <div className="settings-head">
                        <h6>تنظیمات</h6>
                    </div>
                </Settings>
            )}
        </Main>
    );
};
export default StudentsInfo;
