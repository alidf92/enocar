import styled from "styled-components";
import Header from "../../components/Institute/Header";
import Sidebar from "../../components/Institute/Sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../components/BaseUrl";
import ServiceInfo from "../../components/Institute/ServiceInfo";
import PmDetails from "../../components/Institute/PmDetails";

const Main = styled.div`
    background: #e5e5e5;
    .ml-10 {
        margin-left: 10px;
    }
    display: flex;
    .w-100 {
        width: 100%;
    }
    .mapboxgl-map {
        border-radius: 12px;
        margin-top: 24px;
        max-height: calc(600px);
        height: 600px;
        width: calc(100%) !important;
        max-width: calc(100%);
    }
    .modal {
        top: 180px;
        width: 100%;
        right: 0;
        z-index: 9999999999;
        background-color: #fff;
        max-height: 150px;
        overflow: auto;
        padding: 16px;
        .search-result-item-title {
            padding: 10px;
            border-bottom: 1px solid #c2c2c2;
        }
    }
    .map {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 20px;
        position: relative;
    }
    .search-box {
        margin-top: 15px;
        svg {
            position: absolute;
            right: 13px;
            top: 17px;
            cursor: pointer;
        }
        input {
            padding-right: 48px;
        }
    }
`;
const Content = styled.div`
    padding: 45px 30px;
    .cards {
        display: flex;
        width: 100%;
        justify-content: space-between;
        .bg-red {
            background: #f64e60;
        }
        .bg-blue {
            background: #6993ff;
        }
        .bg-green {
            background: #1bc5bd;
        }
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
`;

const Card = styled.div`
    padding: 38px 28px 35px 24px;
    width: 29%;
    height: 180px;
    position: relative;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    .pos-abs {
        position: absolute;
        left: 0;
        top: 0;
    }
    .mb-2 {
        margin-bottom: 16px;
    }
    .title {
        display: block;
        font-weight: 600;
        font-size: 16px;
        line-height: 26px;
        text-align: right;
        color: #ffffff;
        margin-bottom: 4px;
    }
    .span {
        display: block;
        font-weight: 500;
        font-size: 11px;
        line-height: 18px;
        text-align: right;
        color: #ffffff;
    }
    button {
        width: 103px;
        height: 35px;
        background: #ffffff;
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        z-index: 1;
        padding: 0 14px 0 17px;
        font-weight: 700;
        font-size: 12px;
        line-height: 14px;
        text-align: right;
        color: #a1a5b7;
        flex: none;
        order: 0;
        flex-grow: 0;
    }
`;

const FaqDiv = styled.div`
    width: 100%;
    background-color: #fff;
    padding: 26px;
    margin-top: 20px;
    border-radius: 12px;
    .head {
        padding-bottom: 17px;
        border-bottom: 1px solid #eff2f5;
        h6 {
            font-weight: 600;
            font-size: 20px;
            line-height: 30px;
            text-align: right;
            color: #3f4254;
        }
    }
    .content {
        h6 {
            font-weight: 700;
            font-size: 17px;
            line-height: 26px;
            text-align: right;
            color: #464e5f;
            margin-top: 16px;
        }
        .item {
            margin-top: 18px;
            border-bottom: 1px dashed #e4e6ef;
            padding-bottom: 10px;
            .head {
                display: flex;
                align-items: center;
                font-weight: 700;
                font-size: 15px;
                line-height: 22px;
                text-align: right;
                color: #464e5f;
                border-bottom: none;
                cursor: pointer;
                svg {
                    margin-left: 12px;
                }
            }
            .content {
                transition: all 0.5s;
                max-height: 0;
                overflow: hidden;
                padding-right: 36px;
                font-weight: 500;
                font-size: 15px;
                line-height: 29px;
                text-align: justify;
                color: #464e5f;
                img {
                    max-width: 100%;
                }
            }
            .show {
                max-height: 1000px !important;
            }
        }
    }
`;

const Pms = styled.div`
    width: 100%;
    background-color: #fff;
    padding: 26px;
    margin-top: 20px;
    border-radius: 12px;
    .head {
        padding-bottom: 17px;
        border-bottom: 1px solid #eff2f5;
        display: flex;
        justify-content: space-between;
        h6 {
            font-weight: 600;
            font-size: 20px;
            line-height: 30px;
            text-align: right;
            color: #3f4254;
        }
        button {
            background: #1bc5bd;
            border-radius: 6px;
            font-weight: 700;
            font-size: 12px;
            line-height: 14px;
            color: #ffffff;
            width: 157px;
            svg {
                margin-left: 8px;
            }
        }
    }
    .rows {
        display: flex;
        margin-top: 21px;
        span {
            font-weight: 400;
            font-size: 13px;
            line-height: 20px;
            color: #464e5f;
            margin-bottom: 5px;
        }
        small {
            font-weight: 400;
            font-size: 12px;
            line-height: 18px;
            color: #b5b5c3;
            opacity: 0.8;
            margin-top: 5px;
        }
        label {
            display: flex;
            flex-direction: column;
            margin-left: 20px;
            :last-child {
                margin-left: 0;
            }
        }

        select,
        input {
            background: #f3f6f9;
            border-radius: 4px;
            border: none;
            outline: none;
            font-weight: 400;
            font-size: 14px;
            height: 44px;
            width: 359.95px;
            padding: 0 12px;
            text-align: right;
            color: #464e5f;
            @media (max-width: 1450px) {
                max-width: 95%;
            }
        }
        input {
            width: 100%;
        }
        select {
            -webkit-appearance: none;
            -moz-appearance: none;
            background-image: url("data:image/svg+xml;utf8,<svg fill='black' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
            background-repeat: no-repeat;
            background-position-x: 10px;
            background-position-y: 8px;
        }
    }
    .area-div {
        position: relative;
    }
    textarea {
        width: 100%;
        background: #f3f6f9;
        border-radius: 4px;
        resize: none;
        margin-top: 20px;
        border: none;
        padding: 30px 34px;
        min-height: 293px;
        ::placeholder {
            font-weight: 400;
            font-size: 13px;
            line-height: 20px;
            text-align: right;
            color: #b5b5c3;
        }
    }
    .bottom-box {
        border-top: 1px solid rgba(161, 165, 183, 0.3);
        width: calc(100% - 40px);
        margin-right: 20px;
        position: absolute;
        display: flex;
        justify-content: flex-end;
        padding-top: 12px;
        bottom: 20px;
        button {
            background: #6993ff;
            opacity: 0.9;
            border-radius: 6px;
            font-weight: 600;
            font-size: 13px;
            line-height: 20px;
            color: #ffffff;
            width: 70.75px;
            height: 40px;
        }
    }
`;
const TableDiv = styled.div`
    width: 100%;
    padding: 26px 27px;
    background: #ffffff;
    border-radius: 12px;
    margin-top: 20px;
    .head {
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
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
            font-size: 12px;
            line-height: 16px;
            color: #b5b5c3;
            border: 1px solid #eff2f5;
            border-radius: 6px;
            span {
                cursor: pointer;
                padding: 9px 16px;
                svg {
                    margin-left: 8px;
                }
            }
            .active {
                background: #1bc5bd;
                border-radius: 6px;
                color: #fff;
                svg {
                    path {
                        fill: #fff;
                    }
                }
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

                    font-weight: 400;
                    font-size: 16px;
                    line-height: 21px;
                    text-align: right;
                    color: #3f4254;
                }
            }
        }
        tbody {
            .img-div {
                display: flex;
            }
            .red {
                color: #f64e60;
                display: inline;
                margin-right: 3px;
            }
            .time {
                font-weight: 500;
                font-size: 16px;
                line-height: 21px;
                text-align: right;
                color: #3699ff;
                direction: ltr;
            }
            tr {
                border-bottom: 1px dashed #e4e6ef;

                td {
                    padding: 11px 16px;
                    vertical-align: center;

                    span {
                        display: block;
                    }
                    .span-1 {
                        margin-right: 16px;
                        font-weight: 500;
                        font-size: 14px;
                        line-height: 21px;
                        text-align: right;
                        color: #464e5f;
                    }
                    .span-2 {
                        margin-right: 16px;
                        font-weight: 400;
                        font-size: 13px;
                        line-height: 20px;
                        text-align: right;
                        margin-top: 3px;
                        color: #b5b5c3;
                    }
                }
            }
            .stts {
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                padding: 6px 11.5px;
                width: 103px;
                height: 32px;
                background: #c9f7f5;
                border-radius: 6px;
                font-size: 12px;
                line-height: 14px;
                text-align: center;
                color: #1bc5bd;
            }
            .red {
                color: #c51b1b;
            }
            button {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 10px;
                width: 78.69px;
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
`;
export default function Faq() {
    let token;
    let phone;
    if (typeof window !== "undefined") {
        token = localStorage.getItem("token");
        phone = localStorage.getItem("phone_number");
    }
    const [showCom, setShowCom] = useState(false);

    // Info
    const [info, setInfo] = useState([]);
    // https://www.enocar.ir/api/create/faq
    let infoConfig = {
        url: `${BASE_URL}get/faq{}?type=Institution`,
        method: "GET",
    };
    useEffect(() => {
        axios(infoConfig)
            .then((res) => {
                setInfo(res.data);
            })
            .catch((error) => {});
    }, []);

    const [showTab, setShowTab] = useState(1);
    const [activePage, setActivePage] = useState(1);
    const [newMessage, setNewMessage] = useState(false);
    return (
        <Main>
            <Sidebar active={12} />
            <div className="w-100">
                <Header />
                <Content>
                    {showCom ? (
                        <PmDetails />
                    ) : (
                        <>
                            <div className="cards">
                                <Card className="bg-red">
                                    <svg
                                        className="pos-abs"
                                        width="102"
                                        height="139"
                                        viewBox="0 0 102 139"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <circle
                                            r="75"
                                            transform="matrix(-1 0 0 1 7 44)"
                                            stroke="url(#paint0_radial_513_1302)"
                                            stroke-width="40"
                                        />
                                        <defs>
                                            <radialGradient
                                                id="paint0_radial_513_1302"
                                                cx="0"
                                                cy="0"
                                                r="1"
                                                gradientUnits="userSpaceOnUse"
                                                gradientTransform="translate(-3.17998e-06 43.5) rotate(44.3069) scale(175.375)"
                                            >
                                                <stop
                                                    stop-color="#df394cc2"
                                                    stop-opacity="0.98"
                                                />
                                                <stop
                                                    offset="1"
                                                    stop-color="#FA5D6D"
                                                    stop-opacity="0"
                                                />
                                            </radialGradient>
                                        </defs>
                                    </svg>
                                    <div>
                                        <svg
                                            className="mb-2"
                                            width="48"
                                            height="48"
                                            viewBox="0 0 48 48"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <rect
                                                opacity="0.3"
                                                x="26"
                                                y="8"
                                                width="6"
                                                height="32"
                                                rx="2"
                                                fill="white"
                                            />
                                            <rect
                                                x="16"
                                                y="18"
                                                width="6"
                                                height="22"
                                                rx="2"
                                                fill="white"
                                            />
                                            <rect
                                                x="36"
                                                y="22"
                                                width="6"
                                                height="18"
                                                rx="2"
                                                fill="white"
                                            />
                                            <rect
                                                x="6"
                                                y="26"
                                                width="6"
                                                height="14"
                                                rx="2"
                                                fill="white"
                                            />
                                        </svg>
                                        <span className="title">
                                            سوالات متداول
                                        </span>
                                        <span className="span">
                                            مشکلات و سوالات پر تکرار
                                        </span>
                                    </div>
                                    {activePage !== 1 ? (
                                        <button
                                            onClick={() => {
                                                setActivePage(1);
                                            }}
                                        >
                                            مشاهده
                                            <svg
                                                width="6"
                                                height="9"
                                                viewBox="0 0 6 9"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M5.52837 1.19194C5.77245 0.947864 5.77245 0.552136 5.52837 0.308058C5.28429 0.0639806 4.88856 0.0639806 4.64449 0.308058L0.894485 4.05806C0.657873 4.29467 0.649595 4.67566 0.875705 4.92233L4.31321 8.67233C4.54645 8.92678 4.94181 8.94397 5.19625 8.71072C5.4507 8.47748 5.46789 8.08212 5.23465 7.82767L2.20151 4.5188L5.52837 1.19194Z"
                                                    fill="#A1A5B7"
                                                />
                                            </svg>
                                        </button>
                                    ) : (
                                        ""
                                    )}
                                </Card>
                                <Card className="bg-blue">
                                    <svg
                                        className="pos-abs"
                                        width="114"
                                        height="139"
                                        viewBox="0 0 114 139"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <circle
                                            r="75"
                                            transform="matrix(-1 0 0 1 19 44)"
                                            stroke="url(#paint0_radial_513_1284)"
                                            stroke-width="40"
                                        />
                                        <defs>
                                            <radialGradient
                                                id="paint0_radial_513_1284"
                                                cx="0"
                                                cy="0"
                                                r="1"
                                                gradientUnits="userSpaceOnUse"
                                                gradientTransform="translate(-3.17998e-06 43.5) rotate(44.3069) scale(175.375)"
                                            >
                                                <stop stop-color="#5886FE" />
                                                <stop
                                                    offset="1"
                                                    stop-color="#759CFE"
                                                />
                                            </radialGradient>
                                        </defs>
                                    </svg>
                                    <div>
                                        <svg
                                            className="mb-2"
                                            width="50"
                                            height="50"
                                            viewBox="0 0 50 50"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <rect
                                                x="8.33325"
                                                y="8.33398"
                                                width="14.5833"
                                                height="14.5833"
                                                rx="1.5"
                                                fill="white"
                                            />
                                            <path
                                                opacity="0.3"
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M27.0833 9.83398C27.0833 9.00556 27.7548 8.33398 28.5833 8.33398H40.1666C40.995 8.33398 41.6666 9.00556 41.6666 9.83398V21.4173C41.6666 22.2457 40.995 22.9173 40.1666 22.9173H28.5832C27.7548 22.9173 27.0833 22.2457 27.0833 21.4173V9.83398ZM8.33325 28.584C8.33325 27.7556 9.00482 27.084 9.83325 27.084H21.4166C22.245 27.084 22.9166 27.7556 22.9166 28.584V40.1673C22.9166 40.9957 22.245 41.6673 21.4166 41.6673H9.83325C9.00482 41.6673 8.33325 40.9957 8.33325 40.1673V28.584ZM28.5833 27.084C27.7548 27.084 27.0833 27.7556 27.0833 28.584V40.1673C27.0833 40.9957 27.7548 41.6673 28.5832 41.6673H40.1666C40.995 41.6673 41.6666 40.9957 41.6666 40.1673V28.584C41.6666 27.7556 40.995 27.084 40.1666 27.084H28.5833Z"
                                                fill="white"
                                            />
                                        </svg>

                                        <span className="title">
                                            پیام به پشتیبانی
                                        </span>
                                        <span className="span">
                                            ثبت تیکت و دریافت پاسخ
                                        </span>
                                    </div>
                                    {activePage !== 2 ? (
                                        <button
                                            onClick={() => {
                                                setActivePage(2);
                                            }}
                                        >
                                            مشاهده
                                            <svg
                                                width="6"
                                                height="9"
                                                viewBox="0 0 6 9"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M5.52837 1.19194C5.77245 0.947864 5.77245 0.552136 5.52837 0.308058C5.28429 0.0639806 4.88856 0.0639806 4.64449 0.308058L0.894485 4.05806C0.657873 4.29467 0.649595 4.67566 0.875705 4.92233L4.31321 8.67233C4.54645 8.92678 4.94181 8.94397 5.19625 8.71072C5.4507 8.47748 5.46789 8.08212 5.23465 7.82767L2.20151 4.5188L5.52837 1.19194Z"
                                                    fill="#A1A5B7"
                                                />
                                            </svg>
                                        </button>
                                    ) : (
                                        ""
                                    )}
                                </Card>
                                <Card className="bg-green">
                                    <svg
                                        className="pos-abs"
                                        width="114"
                                        height="139"
                                        viewBox="0 0 114 139"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <circle
                                            r="75"
                                            transform="matrix(-1 0 0 1 19 44)"
                                            stroke="url(#paint0_radial_513_1263)"
                                            stroke-width="40"
                                        />
                                        <defs>
                                            <radialGradient
                                                id="paint0_radial_513_1263"
                                                cx="0"
                                                cy="0"
                                                r="1"
                                                gradientUnits="userSpaceOnUse"
                                                gradientTransform="translate(-3.17998e-06 43.5) rotate(44.3069) scale(175.375)"
                                            >
                                                <stop stop-color="#25BBB4" />
                                                <stop
                                                    offset="1"
                                                    stop-color="#1EC9C1"
                                                />
                                            </radialGradient>
                                        </defs>
                                    </svg>
                                    <div>
                                        <svg
                                            className="mb-2"
                                            width="50"
                                            height="50"
                                            viewBox="0 0 50 50"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                opacity="0.3"
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M10.4167 14.5833C10.4167 19.1857 14.1477 22.9167 18.7501 22.9167C23.3525 22.9167 27.0834 19.1857 27.0834 14.5833C27.0834 9.98096 23.3525 6.25 18.7501 6.25C14.1477 6.25 10.4167 9.98096 10.4167 14.5833ZM31.2501 22.9167C31.2501 26.3685 34.0483 29.1667 37.5001 29.1667C40.9519 29.1667 43.7501 26.3685 43.7501 22.9167C43.7501 19.4649 40.9519 16.6667 37.5001 16.6667C34.0483 16.6667 31.2501 19.4649 31.2501 22.9167Z"
                                                fill="white"
                                            />
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M18.7153 27.084C8.87898 27.084 0.808872 32.1392 0.00135768 42.0823C-0.0426286 42.6239 0.99315 43.7506 1.51563 43.7506H35.9306C37.4957 43.7506 37.52 42.4912 37.4957 42.084C36.8852 31.8615 28.69 27.084 18.7153 27.084ZM36.6691 31.2519C39.2839 34.7336 40.8333 39.0612 40.8333 43.7506H48.8666C49.9969 43.7506 50.0145 42.8061 49.9969 42.5006C49.5608 34.9176 43.766 31.3295 36.6691 31.2519Z"
                                                fill="white"
                                            />
                                        </svg>

                                        <span className="title">
                                            اطلاعات تماس پشتیبانی
                                        </span>
                                        <span className="span">
                                            تماس تلفنی با پشتیبانی اینوباس
                                        </span>
                                    </div>
                                    {activePage !== 3 ? (
                                        <button
                                            onClick={() => {
                                                // setActivePage(3);
                                            }}
                                        >
                                            مشاهده
                                            <svg
                                                width="6"
                                                height="9"
                                                viewBox="0 0 6 9"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M5.52837 1.19194C5.77245 0.947864 5.77245 0.552136 5.52837 0.308058C5.28429 0.0639806 4.88856 0.0639806 4.64449 0.308058L0.894485 4.05806C0.657873 4.29467 0.649595 4.67566 0.875705 4.92233L4.31321 8.67233C4.54645 8.92678 4.94181 8.94397 5.19625 8.71072C5.4507 8.47748 5.46789 8.08212 5.23465 7.82767L2.20151 4.5188L5.52837 1.19194Z"
                                                    fill="#A1A5B7"
                                                />
                                            </svg>
                                        </button>
                                    ) : (
                                        ""
                                    )}
                                </Card>
                            </div>
                            {activePage == 1 ? (
                                <FaqDiv>
                                    <div className="head">
                                        <h6>سوالات متداول</h6>
                                    </div>
                                    <div className="content">
                                        {info.Faq !== undefined &&
                                            info.Faq.map((i) => {
                                                return (
                                                    <div className="item">
                                                        <div
                                                            className="head"
                                                            onClick={() => {
                                                                showTab == i.id
                                                                    ? setShowTab(
                                                                          0
                                                                      )
                                                                    : setShowTab(
                                                                          i.id
                                                                      );
                                                            }}
                                                        >
                                                            <svg
                                                                width="25"
                                                                height="25"
                                                                viewBox="0 0 25 25"
                                                                fill="none"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    opacity="0.25"
                                                                    fill-rule="evenodd"
                                                                    clip-rule="evenodd"
                                                                    d="M7.22372 3.33823C5.02693 3.62836 3.34101 5.31428 3.05088 7.51108C2.85142 9.02132 2.68188 10.9105 2.68188 12.9692C2.68188 15.028 2.85142 16.9172 3.05088 18.4274C3.34101 20.6242 5.02693 22.3101 7.22372 22.6002C8.73397 22.7997 10.6232 22.9692 12.6819 22.9692C14.7406 22.9692 16.6298 22.7997 18.14 22.6002C20.3368 22.3101 22.0228 20.6242 22.3129 18.4274C22.5124 16.9172 22.6819 15.028 22.6819 12.9692C22.6819 10.9105 22.5124 9.02132 22.3129 7.51108C22.0228 5.31428 20.3368 3.62836 18.14 3.33823C16.6298 3.13877 14.7406 2.96924 12.6819 2.96924C10.6232 2.96924 8.73397 3.13877 7.22372 3.33823Z"
                                                                    fill="#B5B5C3"
                                                                />
                                                                <path
                                                                    fill-rule="evenodd"
                                                                    clip-rule="evenodd"
                                                                    d="M12.6819 17.9692C13.2342 17.9692 13.6819 17.5215 13.6819 16.9692V13.9692H16.6819C17.2342 13.9692 17.6819 13.5215 17.6819 12.9692C17.6819 12.417 17.2342 11.9692 16.6819 11.9692H13.6819V8.96924C13.6819 8.41695 13.2342 7.96924 12.6819 7.96924C12.1296 7.96924 11.6819 8.41695 11.6819 8.96924V11.9692H8.68188C8.1296 11.9692 7.68188 12.417 7.68188 12.9692C7.68188 13.5215 8.1296 13.9692 8.68188 13.9692H11.6819V16.9692C11.6819 17.5215 12.1296 17.9692 12.6819 17.9692Z"
                                                                    fill="#B5B5C3"
                                                                />
                                                            </svg>
                                                            {i.title}
                                                        </div>
                                                        <div
                                                            className={
                                                                showTab == i.id
                                                                    ? "show content"
                                                                    : "content"
                                                            }
                                                        >
                                                            <p>
                                                               {i.text}
                                                            </p>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                    </div>
                                </FaqDiv>
                            ) : activePage == 2 ? (
                                !newMessage ? (
                                    <Pms>
                                        <div className="head">
                                            <h6>پیام پشتیبانی</h6>
                                            <button
                                                onClick={() => {
                                                    setNewMessage(true);
                                                }}
                                            >
                                                <svg
                                                    width="15"
                                                    height="15"
                                                    viewBox="0 0 15 15"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <g clip-path="url(#clip0_647_16292)">
                                                        <path
                                                            d="M10.14 3.74186C10.14 5.35269 8.83414 6.65853 7.22331 6.65853C5.61248 6.65853 4.30664 5.35269 4.30664 3.74186C4.30664 2.13103 5.61248 0.825195 7.22331 0.825195C8.83414 0.825195 10.14 2.13103 10.14 3.74186Z"
                                                            fill="white"
                                                        />
                                                        <path
                                                            opacity="0.25"
                                                            fill-rule="evenodd"
                                                            clip-rule="evenodd"
                                                            d="M11.2003 8.48136C10.8407 8.06446 10.2231 8.08594 9.7402 8.35028C8.99287 8.75932 8.13517 8.99188 7.22314 8.99188C6.31112 8.99188 5.45342 8.75932 4.70609 8.35028C4.22316 8.08594 3.60555 8.06446 3.24598 8.48136C2.45278 9.40103 1.97314 10.5988 1.97314 11.9085V12.4919C1.97314 13.1362 2.49548 13.6585 3.13981 13.6585H11.3065C11.9508 13.6585 12.4731 13.1362 12.4731 12.4919V11.9085C12.4731 10.5988 11.9935 9.40103 11.2003 8.48136Z"
                                                            fill="white"
                                                        />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_647_16292">
                                                            <rect
                                                                width="14"
                                                                height="14"
                                                                fill="white"
                                                                transform="translate(0.223145 0.241699)"
                                                            />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                                ارسال پیام پشتیبانی
                                            </button>
                                        </div>

                                        <TableDiv>
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>شماره پیام</th>
                                                        <th>موضوع</th>
                                                        <th>وضعیت</th>
                                                        <th>آخرین بروزرسانی</th>
                                                        <th>عملیات</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>#32421</td>
                                                        <td>
                                                            لورم ایپسوم یک متن
                                                            ساختگی
                                                        </td>
                                                        <td>
                                                            <div className="stts">
                                                                پاسخ داده شده
                                                            </div>
                                                        </td>
                                                        <td>
                                                            1401.07.12 - 08:13
                                                        </td>
                                                        <td>
                                                            <button
                                                                onClick={() => {
                                                                    setShowCom(
                                                                        true
                                                                    );
                                                                }}
                                                            >
                                                                مشاهده
                                                                <svg
                                                                    width="21"
                                                                    height="20"
                                                                    viewBox="0 0 21 20"
                                                                    fill="none"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                >
                                                                    <path
                                                                        d="M12.8541 5.65656C13.1745 5.33613 13.1745 4.81661 12.8541 4.49618C12.5336 4.17575 12.0141 4.17575 11.6937 4.49618L6.7706 9.41926C6.45997 9.72989 6.4491 10.2301 6.74594 10.5539L11.2588 15.477C11.565 15.811 12.084 15.8336 12.418 15.5274C12.7521 15.2212 12.7747 14.7021 12.4685 14.3681L8.48649 10.0241L12.8541 5.65656Z"
                                                                        fill="#3699FF"
                                                                    />
                                                                </svg>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </TableDiv>
                                    </Pms>
                                ) : (
                                    <Pms>
                                        <div className="head">
                                            <h6>ارسال پیام پشتیبانی</h6>
                                        </div>
                                        <div className="rows">
                                            <label>
                                                <span>ارسال به</span>
                                                <select name="" id="">
                                                    <option value="">
                                                        پشتیبان فنی
                                                    </option>
                                                </select>
                                                <small>
                                                    لطفا مدرسه را جهت سرویس دهی
                                                    انتخاب کنید.
                                                </small>
                                            </label>
                                            <label className="w-100">
                                                <span>عنوان پیام</span>
                                                <input type="text" />
                                                <small>
                                                    لطفا راننده و خودرو را
                                                    انتخاب کنید.
                                                </small>
                                            </label>
                                        </div>
                                        <div className="area-div">
                                            <textarea placeholder="نوشتن پیام ..."></textarea>
                                            <div className="bottom-box">
                                                <button>ارسال</button>
                                            </div>
                                        </div>
                                    </Pms>
                                )
                            ) : (
                                ""
                            )}
                        </>
                    )}
                </Content>
            </div>
        </Main>
    );
}
