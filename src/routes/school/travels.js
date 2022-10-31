import styled from "styled-components";
import Header from "../../components/School/Header";
import Sidebar from "../../components/School/Sidebar";
import Mapir from "mapir-react-component";
import "mapir-react-component/dist/index.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../components/BaseUrl";
import TravelInfo from "../../components/School/TravelInfo";

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
                width: 80.69px;
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

export default function SchoolTravels() {
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

    const [idToReq, setIdToReq] = useState("");
    const [close, setClose] = useState(false);

    return (
        <Main>
            <Sidebar active={5} />
            <div className="w-100">
                <Header />
                <Content>
                    {showCom ? (
                        <TravelInfo
                            list={list}
                            toreq={idToReq}
                            data={driverInfo}
                        />
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
                                            سفرهای شروع نشده(2)
                                        </span>
                                        <span className="span">
                                            سفرهایی که الان باید در حال انجام
                                            باشند و نیستند{" "}
                                        </span>
                                    </div>
                                    <button>
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
                                            سفرهای جایگزین(2)
                                        </span>
                                        <span className="span">
                                            راننده یا خودرو تغییر کرده است
                                        </span>
                                    </div>
                                    <button>
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
                                            سفرهای درحال انجام(7){" "}
                                        </span>
                                        <span className="span">
                                            پایان آن توسط راننده ثبت نشده است
                                        </span>
                                    </div>
                                    <button>
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
                                </Card>
                            </div>

                            <TableDiv>
                                <div className="head">
                                    <div className="d-flex align-items-center">
                                        <h6>همه سفرها(430)</h6>
                                        <div className="date">
                                            <svg
                                                width="17"
                                                height="17"
                                                viewBox="0 0 17 17"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <rect
                                                    x="0.926025"
                                                    y="0.5"
                                                    width="3.63627"
                                                    height="3.63627"
                                                    rx="1.81814"
                                                    fill="#00A3FF"
                                                />
                                                <rect
                                                    x="6.74365"
                                                    y="0.5"
                                                    width="3.63627"
                                                    height="3.63627"
                                                    rx="1.81814"
                                                    fill="#00A3FF"
                                                />
                                                <rect
                                                    x="12.5623"
                                                    y="0.5"
                                                    width="3.63627"
                                                    height="3.63627"
                                                    rx="1.81814"
                                                    fill="#00A3FF"
                                                />
                                                <rect
                                                    x="12.5623"
                                                    y="6.31836"
                                                    width="3.63627"
                                                    height="3.63627"
                                                    rx="1.81814"
                                                    fill="#00A3FF"
                                                />
                                                <rect
                                                    x="6.74365"
                                                    y="6.31836"
                                                    width="3.63627"
                                                    height="3.63627"
                                                    rx="1.81814"
                                                    fill="#00A3FF"
                                                />
                                                <rect
                                                    x="0.926025"
                                                    y="6.31836"
                                                    width="3.63627"
                                                    height="3.63627"
                                                    rx="1.81814"
                                                    fill="#00A3FF"
                                                />
                                                <rect
                                                    x="12.5623"
                                                    y="12.8633"
                                                    width="3.63627"
                                                    height="3.63627"
                                                    rx="1.81814"
                                                    fill="#00A3FF"
                                                />
                                                <rect
                                                    x="6.74365"
                                                    y="12.8633"
                                                    width="3.63627"
                                                    height="3.63627"
                                                    rx="1.81814"
                                                    fill="#00A3FF"
                                                />
                                                <rect
                                                    x="0.926025"
                                                    y="12.8633"
                                                    width="3.63627"
                                                    height="3.63627"
                                                    rx="1.81814"
                                                    fill="#00A3FF"
                                                />
                                            </svg>
                                            از تاریخ 1401.07.12 
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
                                                    x="0.926025"
                                                    y="0.5"
                                                    width="3.63627"
                                                    height="3.63627"
                                                    rx="1.81814"
                                                    fill="#00A3FF"
                                                />
                                                <rect
                                                    x="6.74365"
                                                    y="0.5"
                                                    width="3.63627"
                                                    height="3.63627"
                                                    rx="1.81814"
                                                    fill="#00A3FF"
                                                />
                                                <rect
                                                    x="12.5623"
                                                    y="0.5"
                                                    width="3.63627"
                                                    height="3.63627"
                                                    rx="1.81814"
                                                    fill="#00A3FF"
                                                />
                                                <rect
                                                    x="12.5623"
                                                    y="6.31836"
                                                    width="3.63627"
                                                    height="3.63627"
                                                    rx="1.81814"
                                                    fill="#00A3FF"
                                                />
                                                <rect
                                                    x="6.74365"
                                                    y="6.31836"
                                                    width="3.63627"
                                                    height="3.63627"
                                                    rx="1.81814"
                                                    fill="#00A3FF"
                                                />
                                                <rect
                                                    x="0.926025"
                                                    y="6.31836"
                                                    width="3.63627"
                                                    height="3.63627"
                                                    rx="1.81814"
                                                    fill="#00A3FF"
                                                />
                                                <rect
                                                    x="12.5623"
                                                    y="12.8633"
                                                    width="3.63627"
                                                    height="3.63627"
                                                    rx="1.81814"
                                                    fill="#00A3FF"
                                                />
                                                <rect
                                                    x="6.74365"
                                                    y="12.8633"
                                                    width="3.63627"
                                                    height="3.63627"
                                                    rx="1.81814"
                                                    fill="#00A3FF"
                                                />
                                                <rect
                                                    x="0.926025"
                                                    y="12.8633"
                                                    width="3.63627"
                                                    height="3.63627"
                                                    rx="1.81814"
                                                    fill="#00A3FF"
                                                />
                                            </svg>
                                            تا تاریخ 1401.07.12
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
                                            کنسل شده{" "}
                                        </span>
                                        <span
                                            className={
                                                activeTab === 2 && "active"
                                            }
                                            onClick={() => {
                                                setActiveTab(2);
                                            }}
                                        >
                                            جایگزین شده
                                        </span>
                                        <span
                                            className={
                                                activeTab === 3 && "active"
                                            }
                                            onClick={() => {
                                                setActiveTab(3);
                                            }}
                                        >
                                            انجام شده
                                        </span>
                                        <span
                                            className={
                                                activeTab === 4 && "active"
                                            }
                                            onClick={() => {
                                                setActiveTab(4);
                                            }}
                                        >
                                            در انتظار انجام
                                        </span>
                                        <span
                                            className={
                                                activeTab === 5 && "active"
                                            }
                                            onClick={() => {
                                                setActiveTab(5);
                                            }}
                                        >
                                            همه
                                        </span>
                                    </div>
                                </div>
                                <div className="btns">
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
                                    </button>
                                </div>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>شماره سفر</th>
                                            <th>راننده</th>
                                            <th>خودرو</th>
                                            <th>زمان</th>
                                            <th>نام موسسه</th>
                                            <th>وضعیت</th>
                                            <th>عملیات</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>#7431</td>
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
                                                            حسام الدین طباطبایی
                                                        </span>
                                                        <span className="span-2">
                                                            09123456789
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <span className="span-1">
                                                    پژو 206 - سفید
                                                </span>
                                                <span className="span-2">
                                                    54 ایران 24 ص 543
                                                </span>
                                            </td>
                                            <td>
                                                <span className="span-1">
                                                    رفت − 08:00
                                                </span>
                                                <span className="span-2">
                                                    1401.04.09
                                                </span>
                                            </td>
                                            <td>
                                                <span className="span-1">
                                                    دبیرستان دخترانه فرزانگان
                                                </span>
                                                <span className="span-2">
                                                    دخترانه دوره اول
                                                </span>
                                            </td>
                                            <td>
                                                <div className="stts">
                                                    انجام شده
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
                                                    مشاهده
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
                        </>
                    )}
                </Content>
            </div>
        </Main>
    );
}
