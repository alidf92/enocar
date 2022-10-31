import styled from "styled-components";
import Header from "../../components/Institute/Header";
import Sidebar from "../../components/Institute/Sidebar";
import Mapir from "mapir-react-component";
import "mapir-react-component/dist/index.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../components/BaseUrl";
import TravelInfo from "../../components/Institute/TravelInfo";
import CheckInfo from "../../components/Institute/CheckInfo";

const Main = styled.div`
    background: #e5e5e5;
    .factor {
        width: 700px;
        margin-right: auto;
        margin-left: auto;
        margin-top: 40px;
        thead {
            tr {
                th {
                    background-color: #fff;
                    border: 1px solid #333333;
                    text-align: center;
                    padding: 10px;
                }
            }
        }
        tbody {
            tr {
                td {
                    background-color: #fff;
                    border: 1px solid #333333;
                    text-align: center;
                    padding: 10px;
                }
            }
        }
    }
    .op-0 {
        opacity: 0;
        visibility: hidden;
    }
    .hr-div {
        display: flex;
        align-items: center;
        width: 100%;
        h6 {
            font-weight: 600;
            font-size: 20px;
            text-align: right;
            color: #3f4254;
            white-space: nowrap;
            margin-left: 6px;
            margin-bottom: 4px;
        }
        hr {
            width: 100%;
        }
    }
    .row-items {
        width: 100%;
        .item {
            padding: 14px 0;
            display: flex;
            width: 100%;
            border-bottom: 1px dashed #e4e6ef;
            .cols {
                width: 220px;
                font-weight: 400;
                font-size: 14px;
                line-height: 21px;
                text-align: right;
                color: #464e5f;
            }
        }
    }
    .ml-10 {
        margin-left: 10px;
    }
    .red {
        width: 72px;
        height: 34px;
        background: #f64e60;
        border-radius: 6px;
        font-weight: 400;
        font-size: 12px;
        line-height: 14px;
        color: #ffffff;
        margin-right: 12px;
        svg {
            margin-left: 8px;
        }
    }
    .green {
        width: 72px;
        height: 34px;
        background: #1bc5bd;
        border-radius: 6px;
        font-weight: 400;
        font-size: 12px;
        line-height: 14px;
        color: #ffffff;
        margin-right: 12px;
        svg {
            margin-left: 8px;
        }
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

const TableDiv = styled.div`
    width: 100%;
    padding: 26px 27px;
    background: #ffffff;
    border-radius: 12px;
    margin-top: 20px;
    .top-of-table {
        margin-top: 25px;
        width: 100%;
        background: #f3f6f9;
        border-radius: 10px;
        padding: 12px;
        margin-bottom: 5px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left {
            .span-1 {
                display: block;
                font-weight: 400;
                font-size: 14px;
                line-height: 21px;
                color: #464e5f;
            }
            .span-2 {
                display: block;
                font-weight: 600;
                font-size: 14px;
                line-height: 21px;
                margin-top: 5px;
                color: #464e5f;
            }
        }
        .img-div {
            display: flex;
            align-items: center;
            margin-left: 28px;
            img {
                border-radius: 5px;
                margin-left: 15px;
            }
            .span-1 {
                font-weight: 400;
                font-size: 14px;
                line-height: 21px;
                text-align: right;
                color: #464e5f;
                display: block;
                margin-bottom: 4px;
            }
            .span-2 {
                font-weight: 500;
                font-size: 14px;
                line-height: 16px;
                text-align: right;
                color: #b5b5c3;
            }
        }
    }
    .btn-div {
        display: flex;
        justify-content: flex-end;
        width: 100%;
        margin-top: 10px;
        margin-bottom: 40px;
        button {
            width: 86px;
            height: 42px;
            background: #00a3ff;
            border-radius: 6px;
            font-weight: 500;
            font-size: 15px;
            line-height: 18px;
            text-align: center;
            color: #ffffff;
        }
    }
    .row-inp {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 18px;
        flex-wrap: wrap;
        label {
            display: flex;
            flex-direction: column;
        }
        span {
            font-weight: 400;
            font-size: 13px;
            line-height: 20px;
            color: #464e5f;
            display: block;
            margin-bottom: 3px;
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
        select {
            -webkit-appearance: none;
            -moz-appearance: none;
            background-image: url("data:image/svg+xml;utf8,<svg fill='black' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
            background-repeat: no-repeat;
            background-position-x: 10px;
            background-position-y: 8px;
        }
        small {
            font-weight: 400;
            font-size: 12px;
            line-height: 18px;
            margin-top: 5px;

            color: #b5b5c3;

            opacity: 0.8;
        }
    }
    .date {
        width: 168.27px;
        height: 36px;
        background: #f3f6f9;
        border-radius: 6px;
        font-weight: 700;
        font-size: 12px;
        color: #a1a5b7;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 12px;
        cursor: pointer;
        svg {
            margin-left: 16px;
        }
    }
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
            border-radius: 6px;
            span {
                cursor: pointer;
                padding: 9px 16px;
                background: #f3f6f9;
                border-radius: 6px;
                margin-right: 12px;
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
    .btns {
        display: flex;
        width: 100%;
        justify-content: flex-end;
        margin-bottom: 10px;
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
                margin-left: 14px;
            }
        }
    }
    .img-div {
        display: flex;
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
                    font-size: 14px;
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
                    font-size: 14px;

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
                width: 134.69px;
                height: 32px;
                background: #f3f6f9;
                border-radius: 6px;
                font-weight: 700;
                font-size: 12px;
                line-height: 14px;
                color: #a1a5b7;
                font-weight: 400;
                font-size: 12px;
                line-height: 14px;
            }
        }
    }
`;

export default function Bill() {
    let navigate = useNavigate();
    let token;
    let phone;
    if (typeof window !== "undefined") {
        token = localStorage.getItem("token");
        phone = localStorage.getItem("phone_number");
    }
    const [activeTab, setActiveTab] = useState(1);
    const [showCom, setShowCom] = useState(false);

    // Info
    const [driversList, setDriversList] = useState([]);
    const [info, setInfo] = useState([]);
    let infoConfig = {
        url: `${BASE_URL}getdetilse-institution/manage{}?phone_number=${phone}`,
        method: "GET",
    };
    useEffect(() => {
        axios(infoConfig)
            .then((res) => {
                setInfo(res.data.InstitutionManageCurrentDetails);
                let config = {
                    url: `${BASE_URL}get-list-student-active-at-service/institution{}?id_institution=${res.data.InstitutionManageCurrentDetails.id}`,
                    method: "GET",
                };
                axios(config)
                    .then((ress) => {
                        setDriversList(
                            ress.data.user_active_list_service_institution
                        );
                    })
                    .catch((error) => {});
            })
            .catch((error) => {});
    }, []);

    const [driverInfo, setdriverInfo] = useState([]);
    const [list, setList] = useState([]);

    const getDriverDet = (item) => {
        let config = {
            url: `${BASE_URL}get-info-student-and-other-at/institution{}?id_student=${item.student_id}`,
            method: "GET",
        };
        axios(config)
            .then((res) => {
                setdriverInfo(res.data);
            })
            .catch((error) => {});

        let config2 = {
            url: `${BASE_URL}get-ifo-student-and/other{}?id_student=${item.student_id}`,
            method: "GET",
        };
        axios(config2)
            .then((res) => {
                // console.log(res.data.ServiceStudent);
                setList(res.data.ServiceStudent);
            })
            .catch((error) => {});
    };

    let infoConfigs = {
        url: `${BASE_URL}profit-calculation-at/institution`,
        method: "GET",
    };
    useEffect(() => {
        axios(infoConfigs)
            .then((res) => {
                setInfo(res.data);
            })
            .catch((error) => {});
    }, []);


    const [idToReq, setIdToReq] = useState("");
    const [close, setClose] = useState(false);

    const [activeTable, setActiveTable] = useState(1);

    return (
        <Main>
            <Sidebar active={15} />
            <div className="w-100">
                <Header />
                <Content>
                    {showCom ? (
                        <CheckInfo
                            list={list}
                            toreq={idToReq}
                            data={driverInfo}
                            close={setShowCom}
                        />
                    ) : (
                        <>
                            <div className="cards">
                                {activeTable !== 2 && (
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
                                                دفتر کل
                                            </span>
                                            <span className="span">
                                                مشاهده لیست بدهکاری و بستانکاری
                                            </span>
                                        </div>
                                        {activeTable !== 2 && (
                                            <button
                                                onClick={() => {
                                                    setActiveTable(2);
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
                                        )}
                                    </Card>
                                )}
                                {activeTable !== 1 && (
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
                                                خزانه چک
                                            </span>
                                            <span className="span">
                                                مشاهده و ثبت تراکنش‌ها مالی
                                                رانندگان
                                            </span>
                                        </div>
                                        {activeTable !== 1 && (
                                            <button
                                                onClick={() => {
                                                    setActiveTable(1);
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
                                        )}
                                    </Card>
                                )}
                                {activeTable !== 3 && (
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
                                                محاسبه سود
                                            </span>
                                            <span className="span">
                                                مشاهده و ثبت تراکنش‌ها مالی
                                                مدارس
                                            </span>
                                        </div>
                                        {activeTable !== 3 && (
                                            <button
                                                onClick={() => {
                                                    setActiveTable(3);
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
                                        )}
                                    </Card>
                                )}
                                {activeTable !== 4 && (
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
                                                صورت حساب‌
                                            </span>
                                            <span className="span">
                                                مشاهده صورت حساب مدارس
                                            </span>
                                        </div>
                                        {activeTable !== 4 && (
                                            <button
                                                onClick={() => {
                                                    setActiveTable(4);
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
                                        )}
                                    </Card>
                                )}
                            </div>
                            {activeTable == 1 ? (
                                <TableDiv>
                                    <div className="head">
                                        <div className="d-flex align-items-center">
                                            <h6>خزانه چک</h6>
                                            <div className="date">
                                                <svg
                                                    width="16"
                                                    height="17"
                                                    viewBox="0 0 16 17"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <rect
                                                        x="0.272705"
                                                        y="0.431641"
                                                        width="3.63627"
                                                        height="3.63627"
                                                        rx="1.81814"
                                                        fill="#00A3FF"
                                                    />
                                                    <rect
                                                        x="6.09033"
                                                        y="0.431641"
                                                        width="3.63627"
                                                        height="3.63627"
                                                        rx="1.81814"
                                                        fill="#00A3FF"
                                                    />
                                                    <rect
                                                        x="11.9089"
                                                        y="0.431641"
                                                        width="3.63627"
                                                        height="3.63627"
                                                        rx="1.81814"
                                                        fill="#00A3FF"
                                                    />
                                                    <rect
                                                        x="11.9089"
                                                        y="6.25"
                                                        width="3.63627"
                                                        height="3.63627"
                                                        rx="1.81814"
                                                        fill="#00A3FF"
                                                    />
                                                    <rect
                                                        x="6.09033"
                                                        y="6.25"
                                                        width="3.63627"
                                                        height="3.63627"
                                                        rx="1.81814"
                                                        fill="#00A3FF"
                                                    />
                                                    <rect
                                                        x="0.272705"
                                                        y="6.25"
                                                        width="3.63627"
                                                        height="3.63627"
                                                        rx="1.81814"
                                                        fill="#00A3FF"
                                                    />
                                                    <rect
                                                        x="11.9089"
                                                        y="12.7949"
                                                        width="3.63627"
                                                        height="3.63627"
                                                        rx="1.81814"
                                                        fill="#00A3FF"
                                                    />
                                                    <rect
                                                        x="6.09033"
                                                        y="12.7949"
                                                        width="3.63627"
                                                        height="3.63627"
                                                        rx="1.81814"
                                                        fill="#00A3FF"
                                                    />
                                                    <rect
                                                        x="0.272705"
                                                        y="12.7949"
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
                                                    width="16"
                                                    height="17"
                                                    viewBox="0 0 16 17"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <rect
                                                        x="0.272705"
                                                        y="0.431641"
                                                        width="3.63627"
                                                        height="3.63627"
                                                        rx="1.81814"
                                                        fill="#00A3FF"
                                                    />
                                                    <rect
                                                        x="6.09033"
                                                        y="0.431641"
                                                        width="3.63627"
                                                        height="3.63627"
                                                        rx="1.81814"
                                                        fill="#00A3FF"
                                                    />
                                                    <rect
                                                        x="11.9089"
                                                        y="0.431641"
                                                        width="3.63627"
                                                        height="3.63627"
                                                        rx="1.81814"
                                                        fill="#00A3FF"
                                                    />
                                                    <rect
                                                        x="11.9089"
                                                        y="6.25"
                                                        width="3.63627"
                                                        height="3.63627"
                                                        rx="1.81814"
                                                        fill="#00A3FF"
                                                    />
                                                    <rect
                                                        x="6.09033"
                                                        y="6.25"
                                                        width="3.63627"
                                                        height="3.63627"
                                                        rx="1.81814"
                                                        fill="#00A3FF"
                                                    />
                                                    <rect
                                                        x="0.272705"
                                                        y="6.25"
                                                        width="3.63627"
                                                        height="3.63627"
                                                        rx="1.81814"
                                                        fill="#00A3FF"
                                                    />
                                                    <rect
                                                        x="11.9089"
                                                        y="12.7949"
                                                        width="3.63627"
                                                        height="3.63627"
                                                        rx="1.81814"
                                                        fill="#00A3FF"
                                                    />
                                                    <rect
                                                        x="6.09033"
                                                        y="12.7949"
                                                        width="3.63627"
                                                        height="3.63627"
                                                        rx="1.81814"
                                                        fill="#00A3FF"
                                                    />
                                                    <rect
                                                        x="0.272705"
                                                        y="12.7949"
                                                        width="3.63627"
                                                        height="3.63627"
                                                        rx="1.81814"
                                                        fill="#00A3FF"
                                                    />
                                                </svg>

                                                <span>تا تاریخ 1401.07.12</span>
                                            </div>
                                        </div>
                                        <div className="tabs">
                                            <span
                                                className={
                                                    activeTab === 1 && "active"
                                                }
                                                onClick={() => {
                                                    setActiveTab(1);
                                                }}
                                            >
                                                <svg
                                                    width="17"
                                                    height="15"
                                                    viewBox="0 0 17 15"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        opacity="0.25"
                                                        d="M9.35273 9.67027C9.46039 8.92033 10.0737 8.33526 10.8598 8.23256C11.3106 8.17365 11.8004 8.125 12.1881 8.125C12.5758 8.125 13.0655 8.17365 13.5164 8.23256C14.3025 8.33526 14.9158 8.92033 15.0235 9.67027C15.0852 10.1004 15.1362 10.5676 15.1362 10.9375C15.1362 11.3074 15.0852 11.7746 15.0235 12.2047C14.9158 12.9547 14.3025 13.5397 13.5164 13.6424C13.0655 13.7014 12.5758 13.75 12.1881 13.75C11.8004 13.75 11.3106 13.7014 10.8598 13.6424C10.0737 13.5397 9.46039 12.9547 9.35273 12.2047C9.29098 11.7746 9.23999 11.3074 9.23999 10.9375C9.23999 10.5676 9.29098 10.1004 9.35273 9.67027Z"
                                                        fill="#00A3FF"
                                                    />
                                                    <path
                                                        opacity="0.25"
                                                        d="M2.14619 9.67027C2.25385 8.92033 2.86713 8.33526 3.65322 8.23256C4.10409 8.17365 4.59382 8.125 4.98155 8.125C5.36928 8.125 5.85901 8.17365 6.30988 8.23256C7.09597 8.33526 7.70925 8.92033 7.81691 9.67027C7.87866 10.1004 7.92965 10.5676 7.92965 10.9375C7.92965 11.3074 7.87866 11.7746 7.81691 12.2047C7.70925 12.9547 7.09597 13.5397 6.30988 13.6424C5.85901 13.7014 5.36928 13.75 4.98155 13.75C4.59382 13.75 4.10409 13.7014 3.65322 13.6424C2.86713 13.5397 2.25385 12.9547 2.14619 12.2047C2.08444 11.7746 2.03345 11.3074 2.03345 10.9375C2.03345 10.5676 2.08444 10.1004 2.14619 9.67027Z"
                                                        fill="#00A3FF"
                                                    />
                                                    <path
                                                        opacity="0.25"
                                                        d="M9.35273 2.79527C9.46039 2.04533 10.0737 1.46026 10.8598 1.35756C11.3106 1.29865 11.8004 1.25 12.1881 1.25C12.5758 1.25 13.0655 1.29865 13.5164 1.35756C14.3025 1.46026 14.9158 2.04533 15.0235 2.79527C15.0852 3.2254 15.1362 3.6926 15.1362 4.0625C15.1362 4.4324 15.0852 4.8996 15.0235 5.32973C14.9158 6.07967 14.3025 6.66474 13.5164 6.76744C13.0655 6.82635 12.5758 6.875 12.1881 6.875C11.8004 6.875 11.3106 6.82635 10.8598 6.76744C10.0737 6.66474 9.46039 6.07967 9.35273 5.32973C9.29098 4.8996 9.23999 4.4324 9.23999 4.0625C9.23999 3.6926 9.29098 3.2254 9.35273 2.79527Z"
                                                        fill="#00A3FF"
                                                    />
                                                    <path
                                                        d="M2.14619 2.79527C2.25385 2.04533 2.86713 1.46026 3.65322 1.35756C4.10409 1.29865 4.59382 1.25 4.98155 1.25C5.36928 1.25 5.85901 1.29865 6.30988 1.35756C7.09597 1.46026 7.70925 2.04533 7.81691 2.79527C7.87866 3.2254 7.92965 3.6926 7.92965 4.0625C7.92965 4.4324 7.87866 4.8996 7.81691 5.32973C7.70925 6.07967 7.09597 6.66474 6.30988 6.76744C5.85901 6.82635 5.36928 6.875 4.98155 6.875C4.59382 6.875 4.10409 6.82635 3.65322 6.76744C2.86713 6.66474 2.25385 6.07967 2.14619 5.32973C2.08444 4.8996 2.03345 4.4324 2.03345 4.0625C2.03345 3.6926 2.08444 3.2254 2.14619 2.79527Z"
                                                        fill="#00A3FF"
                                                    />
                                                </svg>
                                                فیلتر
                                            </span>
                                            <span
                                                className={
                                                    activeTab === 2 && "active"
                                                }
                                                onClick={() => {
                                                    setActiveTab(2);
                                                }}
                                            >
                                                <svg
                                                    width="17"
                                                    height="15"
                                                    viewBox="0 0 17 15"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        opacity="0.25"
                                                        d="M9.35273 9.67027C9.46039 8.92033 10.0737 8.33526 10.8598 8.23256C11.3106 8.17365 11.8004 8.125 12.1881 8.125C12.5758 8.125 13.0655 8.17365 13.5164 8.23256C14.3025 8.33526 14.9158 8.92033 15.0235 9.67027C15.0852 10.1004 15.1362 10.5676 15.1362 10.9375C15.1362 11.3074 15.0852 11.7746 15.0235 12.2047C14.9158 12.9547 14.3025 13.5397 13.5164 13.6424C13.0655 13.7014 12.5758 13.75 12.1881 13.75C11.8004 13.75 11.3106 13.7014 10.8598 13.6424C10.0737 13.5397 9.46039 12.9547 9.35273 12.2047C9.29098 11.7746 9.23999 11.3074 9.23999 10.9375C9.23999 10.5676 9.29098 10.1004 9.35273 9.67027Z"
                                                        fill="#00A3FF"
                                                    />
                                                    <path
                                                        opacity="0.25"
                                                        d="M2.14619 9.67027C2.25385 8.92033 2.86713 8.33526 3.65322 8.23256C4.10409 8.17365 4.59382 8.125 4.98155 8.125C5.36928 8.125 5.85901 8.17365 6.30988 8.23256C7.09597 8.33526 7.70925 8.92033 7.81691 9.67027C7.87866 10.1004 7.92965 10.5676 7.92965 10.9375C7.92965 11.3074 7.87866 11.7746 7.81691 12.2047C7.70925 12.9547 7.09597 13.5397 6.30988 13.6424C5.85901 13.7014 5.36928 13.75 4.98155 13.75C4.59382 13.75 4.10409 13.7014 3.65322 13.6424C2.86713 13.5397 2.25385 12.9547 2.14619 12.2047C2.08444 11.7746 2.03345 11.3074 2.03345 10.9375C2.03345 10.5676 2.08444 10.1004 2.14619 9.67027Z"
                                                        fill="#00A3FF"
                                                    />
                                                    <path
                                                        opacity="0.25"
                                                        d="M9.35273 2.79527C9.46039 2.04533 10.0737 1.46026 10.8598 1.35756C11.3106 1.29865 11.8004 1.25 12.1881 1.25C12.5758 1.25 13.0655 1.29865 13.5164 1.35756C14.3025 1.46026 14.9158 2.04533 15.0235 2.79527C15.0852 3.2254 15.1362 3.6926 15.1362 4.0625C15.1362 4.4324 15.0852 4.8996 15.0235 5.32973C14.9158 6.07967 14.3025 6.66474 13.5164 6.76744C13.0655 6.82635 12.5758 6.875 12.1881 6.875C11.8004 6.875 11.3106 6.82635 10.8598 6.76744C10.0737 6.66474 9.46039 6.07967 9.35273 5.32973C9.29098 4.8996 9.23999 4.4324 9.23999 4.0625C9.23999 3.6926 9.29098 3.2254 9.35273 2.79527Z"
                                                        fill="#00A3FF"
                                                    />
                                                    <path
                                                        d="M2.14619 2.79527C2.25385 2.04533 2.86713 1.46026 3.65322 1.35756C4.10409 1.29865 4.59382 1.25 4.98155 1.25C5.36928 1.25 5.85901 1.29865 6.30988 1.35756C7.09597 1.46026 7.70925 2.04533 7.81691 2.79527C7.87866 3.2254 7.92965 3.6926 7.92965 4.0625C7.92965 4.4324 7.87866 4.8996 7.81691 5.32973C7.70925 6.07967 7.09597 6.66474 6.30988 6.76744C5.85901 6.82635 5.36928 6.875 4.98155 6.875C4.59382 6.875 4.10409 6.82635 3.65322 6.76744C2.86713 6.66474 2.25385 6.07967 2.14619 5.32973C2.08444 4.8996 2.03345 4.4324 2.03345 4.0625C2.03345 3.6926 2.08444 3.2254 2.14619 2.79527Z"
                                                        fill="#00A3FF"
                                                    />
                                                </svg>
                                                دانلود اکسل
                                            </span>
                                            <span
                                                className={
                                                    activeTab === 3 && "active"
                                                }
                                                onClick={() => {
                                                    setActiveTab(3);
                                                }}
                                            >
                                                <svg
                                                    width="16"
                                                    height="15"
                                                    viewBox="0 0 16 15"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M12.7864 1.4138C13.5769 1.47902 14.1924 2.04533 14.3001 2.79527C14.3618 3.2254 14.4128 3.6926 14.4128 4.0625C14.4128 4.4324 14.3618 4.8996 14.3001 5.32973C14.1924 6.07967 13.5769 6.64598 12.7864 6.7112C11.81 6.79176 10.2284 6.875 7.8615 6.875C5.4946 6.875 3.91302 6.79176 2.93662 6.7112C2.14613 6.64597 1.53057 6.07967 1.42291 5.32973C1.36116 4.8996 1.31016 4.4324 1.31016 4.0625C1.31016 3.6926 1.36116 3.2254 1.42291 2.79527C1.53057 2.04533 2.14613 1.47902 2.93662 1.4138C3.91302 1.33324 5.4946 1.25 7.8615 1.25C10.2284 1.25 11.81 1.33324 12.7864 1.4138Z"
                                                        fill="#00A3FF"
                                                    />
                                                    <path
                                                        opacity="0.25"
                                                        d="M12.7864 8.2888C13.5769 8.35402 14.1924 8.92033 14.3001 9.67027C14.3618 10.1004 14.4128 10.5676 14.4128 10.9375C14.4128 11.3074 14.3618 11.7746 14.3001 12.2047C14.1924 12.9547 13.5769 13.521 12.7864 13.5862C11.81 13.6668 10.2284 13.75 7.8615 13.75C5.4946 13.75 3.91302 13.6668 2.93662 13.5862C2.14613 13.521 1.53057 12.9547 1.42291 12.2047C1.36116 11.7746 1.31016 11.3074 1.31016 10.9375C1.31016 10.5676 1.36116 10.1004 1.42291 9.67027C1.53057 8.92033 2.14613 8.35402 2.93662 8.2888C3.91302 8.20824 5.4946 8.125 7.8615 8.125C10.2284 8.125 11.81 8.20824 12.7864 8.2888Z"
                                                        fill="#00A3FF"
                                                    />
                                                </svg>
                                                پرینت
                                            </span>
                                        </div>
                                    </div>

                                    <table>
                                        <thead>
                                            <tr>
                                                <th>نوع</th>
                                                <th>طرف حساب</th>
                                                <th>
                                                    سررسید
                                                    <svg
                                                        width="16"
                                                        height="16"
                                                        viewBox="0 0 16 16"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            opacity="0.3"
                                                            d="M7.33325 3.99967C7.33325 3.63148 7.63173 3.33301 7.99992 3.33301C8.36811 3.33301 8.66659 3.63148 8.66659 3.99967V11.9997C8.66659 12.3679 8.36811 12.6663 7.99992 12.6663C7.63173 12.6663 7.33325 12.3679 7.33325 11.9997V3.99967Z"
                                                            fill="#3699FF"
                                                        />
                                                        <path
                                                            d="M4.47132 7.52892C4.21097 7.26857 3.78886 7.26857 3.52851 7.52892C3.26816 7.78927 3.26816 8.21138 3.52851 8.47173L7.52851 12.4717C7.7809 12.7241 8.18729 12.7329 8.4504 12.4918L12.4504 8.82509C12.7218 8.5763 12.7401 8.15459 12.4914 7.88317C12.2426 7.61176 11.8208 7.59343 11.5494 7.84222L8.01997 11.0776L4.47132 7.52892Z"
                                                            fill="#3699FF"
                                                        />
                                                    </svg>
                                                </th>
                                                <th>
                                                    مبلغ
                                                    <svg
                                                        width="16"
                                                        height="16"
                                                        viewBox="0 0 16 16"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            opacity="0.3"
                                                            d="M7.33325 3.99967C7.33325 3.63148 7.63173 3.33301 7.99992 3.33301C8.36811 3.33301 8.66659 3.63148 8.66659 3.99967V11.9997C8.66659 12.3679 8.36811 12.6663 7.99992 12.6663C7.63173 12.6663 7.33325 12.3679 7.33325 11.9997V3.99967Z"
                                                            fill="#3699FF"
                                                        />
                                                        <path
                                                            d="M4.47132 7.52892C4.21097 7.26857 3.78886 7.26857 3.52851 7.52892C3.26816 7.78927 3.26816 8.21138 3.52851 8.47173L7.52851 12.4717C7.7809 12.7241 8.18729 12.7329 8.4504 12.4918L12.4504 8.82509C12.7218 8.5763 12.7401 8.15459 12.4914 7.88317C12.2426 7.61176 11.8208 7.59343 11.5494 7.84222L8.01997 11.0776L4.47132 7.52892Z"
                                                            fill="#3699FF"
                                                        />
                                                    </svg>
                                                </th>
                                                <th>شماره چک</th>
                                                <th>شماره صیادی</th>
                                                <th>نام بانک</th>
                                                <th>وضعیت</th>
                                                <th>عملیات</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>دریافت</td>
                                                <td>حسام الدین طباطبایی</td>
                                                <td>1401.08.12</td>
                                                <td>12,000,000 ریال</td>
                                                <td>32345432</td>
                                                <td>124231243457845358</td>
                                                <td>بانک پارسیان</td>
                                                <td>
                                                    <div className="stts">
                                                        وصول شده
                                                    </div>
                                                </td>
                                                <td>
                                                    <button
                                                        onClick={() => {
                                                            setShowCom(true);
                                                            // getDriverDet(item);
                                                            // setIdToReq(item.student_id);
                                                        }}
                                                    >
                                                        مشاهده و ویرایش
                                                        <svg
                                                            width="20"
                                                            height="20"
                                                            viewBox="0 0 20 20"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                d="M12.6685 5.65656C12.9889 5.33613 12.9889 4.81661 12.6685 4.49618C12.3481 4.17575 11.8286 4.17575 11.5081 4.49618L6.58505 9.41926C6.27442 9.72989 6.26355 10.2301 6.5604 10.5539L11.0732 15.477C11.3794 15.811 11.8985 15.8336 12.2325 15.5274C12.5665 15.2212 12.5891 14.7021 12.2829 14.3681L8.30094 10.0241L12.6685 5.65656Z"
                                                                fill="#3699FF"
                                                            />
                                                        </svg>
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </TableDiv>
                            ) : activeTable == 2 ? (
                                <table className="factor">
                                    <thead>
                                        <tr>
                                            <th>تاریخ</th>
                                            <th>شرح</th>
                                            <th>بدهکار</th>
                                            <th>بستانکار</th>
                                            <th>باقیمانده</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr><tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr><tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr><tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr><tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr><tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        
                                    </tbody>
                                </table>
                            ) : activeTable == 3 ? (
                                <TableDiv>
                                    <div className="head">
                                        <h6>محاسبه سود</h6>
                                    </div>
                                    <div className="row-inp">
                                        <label>
                                            <span>نام مدرسه</span>
                                            <select name="" id="">
                                                <option value="">
                                                    دبیرستان دخترانه فرزانگان
                                                </option>
                                            </select>
                                            <small>
                                                لطفا نام مدرسه را وارد کنید.
                                            </small>
                                        </label>
                                        <label>
                                            <span>از تاریخ</span>
                                            <select name="" id="">
                                                <option value="">
                                                    1401.07.12
                                                </option>
                                            </select>
                                            <small>
                                                لطفا تاریخ شروع را وارد کنید.
                                            </small>
                                        </label>
                                        <label>
                                            <span>تا تاریخ</span>
                                            <select name="" id="">
                                                <option value="">
                                                    1401.07.12
                                                </option>
                                            </select>
                                            <small>
                                                لطفا تاریخ پایان را وارد کنید.
                                            </small>
                                        </label>
                                    </div>
                                    <div className="row-inp">
                                        <label>
                                            <span>درصد مدرسه</span>
                                            <select name="" id="">
                                                <option value="">7</option>
                                            </select>
                                            <small>
                                                لطفا نوع تراکنش را وارد کنید.
                                            </small>
                                        </label>
                                        <label>
                                            <span>درصد موسسه</span>
                                            <select name="" id="">
                                                <option value="">7</option>
                                            </select>
                                            <small>
                                                لطفا نوع تراکنش را وارد کنید.
                                            </small>
                                        </label>
                                        <label>
                                            <select
                                                className="op-0"
                                                name=""
                                                id=""
                                            ></select>
                                        </label>
                                    </div>
                                    <div className="btn-div">
                                        <button>محاسبه</button>
                                    </div>
                                    <div className="hr-div">
                                        <h6>سال تحصیلی 1401-1402</h6>
                                        <hr />
                                    </div>
                                    <div className="row-items">
                                        <div className="item">
                                            <div className="cols">
                                                نام مدرسه :
                                            </div>
                                            <div className="cols">
                                                دبیرستان دخترانه فرزانگان
                                            </div>
                                        </div>
                                        <div className="item">
                                            <div className="cols">
                                                نام موسسه :
                                            </div>
                                            <div className="cols">
                                                موسسه سفیر امید
                                            </div>
                                        </div>
                                        <div className="item">
                                            <div className="cols">
                                                مبلغ کل :
                                            </div>
                                            <div className="cols">
                                                1,407,000,000 ریال
                                            </div>
                                        </div>
                                        <div className="item">
                                            <div className="cols">
                                                درصد مدرسه :
                                            </div>
                                            <div className="cols">7 درصد</div>
                                            <div className="cols">
                                                <span className="ms-3">
                                                    مبلغ :
                                                </span>
                                                <span>27,000,000 ریال</span>
                                            </div>
                                        </div>
                                        <div className="item">
                                            <div className="cols">
                                                درصد موسسه :
                                            </div>
                                            <div className="cols">7 درصد</div>
                                            <div className="cols">
                                                <span className="ms-3">
                                                    مبلغ :
                                                </span>
                                                <span>27,000,000 ریال</span>
                                            </div>
                                        </div>
                                        <div className="btn-div mt-3">
                                            <button>پرینت</button>
                                        </div>
                                    </div>
                                </TableDiv>
                            ) : (
                                <TableDiv>
                                    <div className="head">
                                        <div className="d-flex align-items-center">
                                            <h6>صورت حساب مدارس</h6>
                                        </div>
                                        <div className="tabs">
                                            <span
                                                className={
                                                    activeTab === 3 && "active"
                                                }
                                                onClick={() => {
                                                    setActiveTab(3);
                                                }}
                                            >
                                                <svg
                                                    width="16"
                                                    height="15"
                                                    viewBox="0 0 16 15"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M12.7864 1.4138C13.5769 1.47902 14.1924 2.04533 14.3001 2.79527C14.3618 3.2254 14.4128 3.6926 14.4128 4.0625C14.4128 4.4324 14.3618 4.8996 14.3001 5.32973C14.1924 6.07967 13.5769 6.64598 12.7864 6.7112C11.81 6.79176 10.2284 6.875 7.8615 6.875C5.4946 6.875 3.91302 6.79176 2.93662 6.7112C2.14613 6.64597 1.53057 6.07967 1.42291 5.32973C1.36116 4.8996 1.31016 4.4324 1.31016 4.0625C1.31016 3.6926 1.36116 3.2254 1.42291 2.79527C1.53057 2.04533 2.14613 1.47902 2.93662 1.4138C3.91302 1.33324 5.4946 1.25 7.8615 1.25C10.2284 1.25 11.81 1.33324 12.7864 1.4138Z"
                                                        fill="#00A3FF"
                                                    />
                                                    <path
                                                        opacity="0.25"
                                                        d="M12.7864 8.2888C13.5769 8.35402 14.1924 8.92033 14.3001 9.67027C14.3618 10.1004 14.4128 10.5676 14.4128 10.9375C14.4128 11.3074 14.3618 11.7746 14.3001 12.2047C14.1924 12.9547 13.5769 13.521 12.7864 13.5862C11.81 13.6668 10.2284 13.75 7.8615 13.75C5.4946 13.75 3.91302 13.6668 2.93662 13.5862C2.14613 13.521 1.53057 12.9547 1.42291 12.2047C1.36116 11.7746 1.31016 11.3074 1.31016 10.9375C1.31016 10.5676 1.36116 10.1004 1.42291 9.67027C1.53057 8.92033 2.14613 8.35402 2.93662 8.2888C3.91302 8.20824 5.4946 8.125 7.8615 8.125C10.2284 8.125 11.81 8.20824 12.7864 8.2888Z"
                                                        fill="#00A3FF"
                                                    />
                                                </svg>
                                                پرینت
                                            </span>
                                        </div>
                                    </div>
                                    <div className="row-inp">
                                        <label>
                                            <span>نام مدرسه</span>
                                            <select name="" id="">
                                                <option value="">
                                                    دبیرستان دخترانه فرزانگان
                                                </option>
                                            </select>
                                            <small>
                                                لطفا نام مدرسه را وارد کنید.
                                            </small>
                                        </label>
                                        <label>
                                            <span>از تاریخ</span>
                                            <select name="" id="">
                                                <option value="">
                                                    1401.07.12
                                                </option>
                                            </select>
                                            <small>
                                                لطفا تاریخ شروع را وارد کنید.
                                            </small>
                                        </label>
                                        <label>
                                            <span>تا تاریخ</span>
                                            <select name="" id="">
                                                <option value="">
                                                    1401.07.12
                                                </option>
                                            </select>
                                            <small>
                                                لطفا تاریخ پایان را وارد کنید.
                                            </small>
                                        </label>
                                    </div>
                                    <div className="row-inp">
                                        <label>
                                            <span>درصد مدرسه</span>
                                            <select name="" id="">
                                                <option value="">7</option>
                                            </select>
                                            <small>
                                                لطفا نوع تراکنش را وارد کنید.
                                            </small>
                                        </label>
                                        <label>
                                            <span>درصد موسسه</span>
                                            <select name="" id="">
                                                <option value="">7</option>
                                            </select>
                                            <small>
                                                لطفا نوع تراکنش را وارد کنید.
                                            </small>
                                        </label>
                                        <label>
                                            <span>تعداد ماه سال تحصیلی</span>
                                            <select name="" id="">
                                                <option value="">9</option>
                                            </select>
                                            <small>
                                                لطفا نوع تراکنش را وارد کنید.
                                            </small>
                                        </label>
                                    </div>
                                    <div className="btn-div">
                                        <button>محاسبه</button>
                                    </div>
                                    <div className="top-of-table">
                                        <div className="d-flex">
                                            <div className="img-div">
                                                <img
                                                    src="/images/pm.png"
                                                    width={50}
                                                    height={50}
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
                                            <div className="img-div">
                                                <div>
                                                    <span className="span-1">
                                                        پژو 206 - سفید
                                                    </span>
                                                    <span className="span-2">
                                                        54 ایران 24 ص 543
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="img-div">
                                                <div>
                                                    <span className="span-1">
                                                        دبیرستان دخترانه
                                                        فرزانگان
                                                    </span>
                                                    <span className="span-2">
                                                        دخترانه دوره اول
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="left">
                                            <span className="span-1">
                                                جمع حقوق ماهیانه
                                            </span>
                                            <span className="span-2">
                                                {" "}
                                                40,000,000 ریال
                                            </span>
                                        </div>
                                    </div>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>نوع</th>
                                                <th>طرف حساب</th>
                                                <th>
                                                    سررسید
                                                    <svg
                                                        width="16"
                                                        height="16"
                                                        viewBox="0 0 16 16"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            opacity="0.3"
                                                            d="M7.33325 3.99967C7.33325 3.63148 7.63173 3.33301 7.99992 3.33301C8.36811 3.33301 8.66659 3.63148 8.66659 3.99967V11.9997C8.66659 12.3679 8.36811 12.6663 7.99992 12.6663C7.63173 12.6663 7.33325 12.3679 7.33325 11.9997V3.99967Z"
                                                            fill="#3699FF"
                                                        />
                                                        <path
                                                            d="M4.47132 7.52892C4.21097 7.26857 3.78886 7.26857 3.52851 7.52892C3.26816 7.78927 3.26816 8.21138 3.52851 8.47173L7.52851 12.4717C7.7809 12.7241 8.18729 12.7329 8.4504 12.4918L12.4504 8.82509C12.7218 8.5763 12.7401 8.15459 12.4914 7.88317C12.2426 7.61176 11.8208 7.59343 11.5494 7.84222L8.01997 11.0776L4.47132 7.52892Z"
                                                            fill="#3699FF"
                                                        />
                                                    </svg>
                                                </th>
                                                <th>
                                                    مبلغ
                                                    <svg
                                                        width="16"
                                                        height="16"
                                                        viewBox="0 0 16 16"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            opacity="0.3"
                                                            d="M7.33325 3.99967C7.33325 3.63148 7.63173 3.33301 7.99992 3.33301C8.36811 3.33301 8.66659 3.63148 8.66659 3.99967V11.9997C8.66659 12.3679 8.36811 12.6663 7.99992 12.6663C7.63173 12.6663 7.33325 12.3679 7.33325 11.9997V3.99967Z"
                                                            fill="#3699FF"
                                                        />
                                                        <path
                                                            d="M4.47132 7.52892C4.21097 7.26857 3.78886 7.26857 3.52851 7.52892C3.26816 7.78927 3.26816 8.21138 3.52851 8.47173L7.52851 12.4717C7.7809 12.7241 8.18729 12.7329 8.4504 12.4918L12.4504 8.82509C12.7218 8.5763 12.7401 8.15459 12.4914 7.88317C12.2426 7.61176 11.8208 7.59343 11.5494 7.84222L8.01997 11.0776L4.47132 7.52892Z"
                                                            fill="#3699FF"
                                                        />
                                                    </svg>
                                                </th>
                                                <th>شماره چک</th>
                                                <th>شماره صیادی</th>
                                                <th>نام بانک</th>
                                                <th>وضعیت</th>
                                                <th>عملیات</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>دریافت</td>
                                                <td>حسام الدین طباطبایی</td>
                                                <td>1401.08.12</td>
                                                <td>12,000,000 ریال</td>
                                                <td>32345432</td>
                                                <td>124231243457845358</td>
                                                <td>بانک پارسیان</td>
                                                <td>
                                                    <div className="stts">
                                                        وصول شده
                                                    </div>
                                                </td>
                                                <td>
                                                    <button
                                                        onClick={() => {
                                                            setShowCom(true);
                                                            // getDriverDet(item);
                                                            // setIdToReq(item.student_id);
                                                        }}
                                                    >
                                                        مشاهده و ویرایش
                                                        <svg
                                                            width="20"
                                                            height="20"
                                                            viewBox="0 0 20 20"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                d="M12.6685 5.65656C12.9889 5.33613 12.9889 4.81661 12.6685 4.49618C12.3481 4.17575 11.8286 4.17575 11.5081 4.49618L6.58505 9.41926C6.27442 9.72989 6.26355 10.2301 6.5604 10.5539L11.0732 15.477C11.3794 15.811 11.8985 15.8336 12.2325 15.5274C12.5665 15.2212 12.5891 14.7021 12.2829 14.3681L8.30094 10.0241L12.6685 5.65656Z"
                                                                fill="#3699FF"
                                                            />
                                                        </svg>
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div className="top-of-table">
                                        <div className="d-flex">
                                            <div className="img-div">
                                                <img
                                                    src="/images/pm.png"
                                                    width={50}
                                                    height={50}
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
                                            <div className="img-div">
                                                <div>
                                                    <span className="span-1">
                                                        پژو 206 - سفید
                                                    </span>
                                                    <span className="span-2">
                                                        54 ایران 24 ص 543
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="img-div">
                                                <div>
                                                    <span className="span-1">
                                                        دبیرستان دخترانه
                                                        فرزانگان
                                                    </span>
                                                    <span className="span-2">
                                                        دخترانه دوره اول
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="left">
                                            <span className="span-1">
                                                جمع حقوق ماهیانه
                                            </span>
                                            <span className="span-2">
                                                {" "}
                                                40,000,000 ریال
                                            </span>
                                        </div>
                                    </div>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>نوع</th>
                                                <th>طرف حساب</th>
                                                <th>
                                                    سررسید
                                                    <svg
                                                        width="16"
                                                        height="16"
                                                        viewBox="0 0 16 16"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            opacity="0.3"
                                                            d="M7.33325 3.99967C7.33325 3.63148 7.63173 3.33301 7.99992 3.33301C8.36811 3.33301 8.66659 3.63148 8.66659 3.99967V11.9997C8.66659 12.3679 8.36811 12.6663 7.99992 12.6663C7.63173 12.6663 7.33325 12.3679 7.33325 11.9997V3.99967Z"
                                                            fill="#3699FF"
                                                        />
                                                        <path
                                                            d="M4.47132 7.52892C4.21097 7.26857 3.78886 7.26857 3.52851 7.52892C3.26816 7.78927 3.26816 8.21138 3.52851 8.47173L7.52851 12.4717C7.7809 12.7241 8.18729 12.7329 8.4504 12.4918L12.4504 8.82509C12.7218 8.5763 12.7401 8.15459 12.4914 7.88317C12.2426 7.61176 11.8208 7.59343 11.5494 7.84222L8.01997 11.0776L4.47132 7.52892Z"
                                                            fill="#3699FF"
                                                        />
                                                    </svg>
                                                </th>
                                                <th>
                                                    مبلغ
                                                    <svg
                                                        width="16"
                                                        height="16"
                                                        viewBox="0 0 16 16"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            opacity="0.3"
                                                            d="M7.33325 3.99967C7.33325 3.63148 7.63173 3.33301 7.99992 3.33301C8.36811 3.33301 8.66659 3.63148 8.66659 3.99967V11.9997C8.66659 12.3679 8.36811 12.6663 7.99992 12.6663C7.63173 12.6663 7.33325 12.3679 7.33325 11.9997V3.99967Z"
                                                            fill="#3699FF"
                                                        />
                                                        <path
                                                            d="M4.47132 7.52892C4.21097 7.26857 3.78886 7.26857 3.52851 7.52892C3.26816 7.78927 3.26816 8.21138 3.52851 8.47173L7.52851 12.4717C7.7809 12.7241 8.18729 12.7329 8.4504 12.4918L12.4504 8.82509C12.7218 8.5763 12.7401 8.15459 12.4914 7.88317C12.2426 7.61176 11.8208 7.59343 11.5494 7.84222L8.01997 11.0776L4.47132 7.52892Z"
                                                            fill="#3699FF"
                                                        />
                                                    </svg>
                                                </th>
                                                <th>شماره چک</th>
                                                <th>شماره صیادی</th>
                                                <th>نام بانک</th>
                                                <th>وضعیت</th>
                                                <th>عملیات</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>دریافت</td>
                                                <td>حسام الدین طباطبایی</td>
                                                <td>1401.08.12</td>
                                                <td>12,000,000 ریال</td>
                                                <td>32345432</td>
                                                <td>124231243457845358</td>
                                                <td>بانک پارسیان</td>
                                                <td>
                                                    <div className="stts">
                                                        وصول شده
                                                    </div>
                                                </td>
                                                <td>
                                                    <button
                                                        onClick={() => {
                                                            setShowCom(true);
                                                            // getDriverDet(item);
                                                            // setIdToReq(item.student_id);
                                                        }}
                                                    >
                                                        مشاهده و ویرایش
                                                        <svg
                                                            width="20"
                                                            height="20"
                                                            viewBox="0 0 20 20"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                d="M12.6685 5.65656C12.9889 5.33613 12.9889 4.81661 12.6685 4.49618C12.3481 4.17575 11.8286 4.17575 11.5081 4.49618L6.58505 9.41926C6.27442 9.72989 6.26355 10.2301 6.5604 10.5539L11.0732 15.477C11.3794 15.811 11.8985 15.8336 12.2325 15.5274C12.5665 15.2212 12.5891 14.7021 12.2829 14.3681L8.30094 10.0241L12.6685 5.65656Z"
                                                                fill="#3699FF"
                                                            />
                                                        </svg>
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </TableDiv>
                            )}
                        </>
                    )}
                </Content>
            </div>
        </Main>
    );
}
