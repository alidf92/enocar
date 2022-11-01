import styled from "styled-components";
import Header from "../../components/Institute/Header";
import Sidebar from "../../components/Institute/Sidebar";
import Mapir from "mapir-react-component";
import "mapir-react-component/dist/index.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../components/BaseUrl";
import ServiceInfo from "../../components/Institute/ServiceInfo";

const Main = styled.div`
    background: #e5e5e5;
    .img-div {
        img {
            border-radius: 6px;
        }
    }
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
                background: #ffe2e5;
            }
            .yellow {
                background: #fff4de;
                color: #ffa800;
            }
            button {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 10px;
                width: 124.69px;
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

export default function Services() {
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
                    // url: `${BASE_URL}getdetilse-service/institution{}?id_institution=${res.data.InstitutionManageCurrentDetails.id}`,
                    url: `${BASE_URL}getdetilse-service/institution{}?id_institution=6`,
                    method: "GET",
                };
                axios(config)
                    .then((ress) => {
                        setDriversList(ress.data.Service_Institution);
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
            <Sidebar active={6} />
            <div className="w-100">
                <Header />
                <Content>
                    {showCom ? (
                        <ServiceInfo
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
                                            سرویس‌های فعال(30){" "}
                                        </span>
                                        <span className="span">
                                            سرویس‌هایی که توسط مدرسه تایید
                                            نشده‌اند
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
                                            سرویس‌های در انتظار تایید(1){" "}
                                        </span>
                                        <span className="span">
                                            سرویس‌هایی که مدرسه باید تایید کند
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
                                            همه سرویس‌ها(31){" "}
                                        </span>
                                        <span className="span">
                                            همه سرویس فعال و در انتظار تایید
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
                                    <h6>
                                        سرویس ها(
                                        {driversList !== undefined &&
                                            driversList.length}
                                        )
                                    </h6>
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
                                                width="15"
                                                height="15"
                                                viewBox="0 0 15 15"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    opacity="0.3"
                                                    d="M5.70592 11.2113C6.0505 10.8668 6.0505 10.3081 5.70592 9.96351C5.36134 9.61893 4.80267 9.61893 4.45809 9.96351L0.928678 13.4929C0.584098 13.8375 0.584098 14.3962 0.928678 14.7408C1.27326 15.0853 1.83193 15.0853 2.17651 14.7408L5.70592 11.2113Z"
                                                    fill="#00A3FF"
                                                />
                                                <path
                                                    fill-rule="evenodd"
                                                    clip-rule="evenodd"
                                                    d="M14.7878 6.17646C14.7878 9.58763 12.0225 12.3529 8.61138 12.3529C5.20021 12.3529 2.43491 9.58763 2.43491 6.17646C2.43491 2.7653 5.20021 0 8.61138 0C12.0225 0 14.7878 2.7653 14.7878 6.17646ZM4.19965 6.17647C4.19965 8.61302 6.17486 10.5882 8.61141 10.5882C11.048 10.5882 13.0232 8.61302 13.0232 6.17647C13.0232 3.73992 11.048 1.76471 8.61141 1.76471C6.17486 1.76471 4.19965 3.73992 4.19965 6.17647Z"
                                                    fill="#00A3FF"
                                                />
                                            </svg>
                                            جستجو ...
                                        </span>
                                        <span
                                            className={
                                                activeTab === 2 && "active"
                                            }
                                            onClick={() => {
                                                setActiveTab(2);
                                            }}
                                        >
                                            فیلتر
                                            <svg
                                                className="me-2"
                                                width="12"
                                                height="8"
                                                viewBox="0 0 12 8"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M1.44221 0.92036C1.12178 0.59993 0.602257 0.59993 0.281827 0.92036C-0.0386034 1.24079 -0.0386034 1.76031 0.281827 2.08074L5.2049 7.00382C5.51553 7.31445 6.01571 7.32531 6.33953 7.02847L11.2626 2.51565C11.5967 2.20944 11.6192 1.69041 11.313 1.35637C11.0068 1.02232 10.4878 0.999753 10.1537 1.30596L5.80977 5.28792L1.44221 0.92036Z"
                                                    fill="#3699FF"
                                                />
                                            </svg>
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
                                                    opacity="0.25"
                                                    d="M8.84541 9.67027C8.95307 8.92033 9.56635 8.33526 10.3524 8.23256C10.8033 8.17365 11.293 8.125 11.6808 8.125C12.0685 8.125 12.5582 8.17365 13.0091 8.23256C13.7952 8.33526 14.4085 8.92033 14.5161 9.67027C14.5779 10.1004 14.6289 10.5676 14.6289 10.9375C14.6289 11.3074 14.5779 11.7746 14.5161 12.2047C14.4085 12.9547 13.7952 13.5397 13.0091 13.6424C12.5582 13.7014 12.0685 13.75 11.6808 13.75C11.293 13.75 10.8033 13.7014 10.3524 13.6424C9.56635 13.5397 8.95307 12.9547 8.84541 12.2047C8.78366 11.7746 8.73267 11.3074 8.73267 10.9375C8.73267 10.5676 8.78366 10.1004 8.84541 9.67027Z"
                                                    fill="white"
                                                />
                                                <path
                                                    opacity="0.25"
                                                    d="M1.63887 9.67027C1.74653 8.92033 2.3598 8.33526 3.1459 8.23256C3.59677 8.17365 4.08649 8.125 4.47423 8.125C4.86196 8.125 5.35168 8.17365 5.80255 8.23256C6.58865 8.33526 7.20193 8.92033 7.30959 9.67027C7.37133 10.1004 7.42233 10.5676 7.42233 10.9375C7.42233 11.3074 7.37133 11.7746 7.30959 12.2047C7.20193 12.9547 6.58865 13.5397 5.80255 13.6424C5.35168 13.7014 4.86196 13.75 4.47423 13.75C4.08649 13.75 3.59677 13.7014 3.1459 13.6424C2.3598 13.5397 1.74653 12.9547 1.63887 12.2047C1.57712 11.7746 1.52612 11.3074 1.52612 10.9375C1.52612 10.5676 1.57712 10.1004 1.63887 9.67027Z"
                                                    fill="white"
                                                />
                                                <path
                                                    opacity="0.25"
                                                    d="M8.84541 2.79527C8.95307 2.04533 9.56635 1.46026 10.3524 1.35756C10.8033 1.29865 11.293 1.25 11.6808 1.25C12.0685 1.25 12.5582 1.29865 13.0091 1.35756C13.7952 1.46026 14.4085 2.04533 14.5161 2.79527C14.5779 3.2254 14.6289 3.6926 14.6289 4.0625C14.6289 4.4324 14.5779 4.8996 14.5161 5.32973C14.4085 6.07967 13.7952 6.66474 13.0091 6.76744C12.5582 6.82635 12.0685 6.875 11.6808 6.875C11.293 6.875 10.8033 6.82635 10.3524 6.76744C9.56635 6.66474 8.95307 6.07967 8.84541 5.32973C8.78366 4.8996 8.73267 4.4324 8.73267 4.0625C8.73267 3.6926 8.78366 3.2254 8.84541 2.79527Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M1.63887 2.79527C1.74653 2.04533 2.3598 1.46026 3.1459 1.35756C3.59677 1.29865 4.08649 1.25 4.47423 1.25C4.86196 1.25 5.35168 1.29865 5.80255 1.35756C6.58865 1.46026 7.20193 2.04533 7.30959 2.79527C7.37133 3.2254 7.42233 3.6926 7.42233 4.0625C7.42233 4.4324 7.37133 4.8996 7.30959 5.32973C7.20193 6.07967 6.58865 6.66474 5.80255 6.76744C5.35168 6.82635 4.86196 6.875 4.47423 6.875C4.08649 6.875 3.59677 6.82635 3.1459 6.76744C2.3598 6.66474 1.74653 6.07967 1.63887 5.32973C1.57712 4.8996 1.52612 4.4324 1.52612 4.0625C1.52612 3.6926 1.57712 3.2254 1.63887 2.79527Z"
                                                    fill="white"
                                                />
                                            </svg>
                                            افزودن سرویس
                                        </span>
                                    </div>
                                </div>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>نام راننده</th>
                                            <th>خودرو</th>
                                            <th>نام مدرسه</th>
                                            <th>زمان</th>
                                            <th>وضعیت</th>
                                            <th>عملیات</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {driversList !== null &&
                                            driversList !== undefined &&
                                            driversList.map((item) => {
                                                return (
                                                    <tr>
                                                        <td>
                                                            <div className="d-flex align-items-center img-div">
                                                                <img
                                                                    src={
                                                                        item.driver_image
                                                                    }
                                                                    width={50}
                                                                    height={50}
                                                                    alt=""
                                                                />
                                                                <div>
                                                                    <span className="span-1">
                                                                        {
                                                                            item.driver_name
                                                                        }{" "}
                                                                        {
                                                                            item.driver_l_name
                                                                        }
                                                                    </span>
                                                                    <span className="span-2">
                                                                        {
                                                                            item.driver_phone
                                                                        }
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <span className="span-1">
                                                                {
                                                                    item.driver_car_name
                                                                }
                                                            </span>
                                                            <span className="span-2">
                                                                {
                                                                    item.driver_car_plates
                                                                }
                                                            </span>
                                                        </td>
                                                        <td>
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
                                                        </td>
                                                        <td>
                                                            <span className="span-1">
                                                                {
                                                                    item.service_time_go
                                                                }
                                                            </span>
                                                            <span className="span-2">
                                                                {/* سرویس رفت */}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            {item.service_status ==
                                                            "ok" ? (
                                                                <div
                                                                    className={
                                                                        "stts"
                                                                    }
                                                                >
                                                                    تایید مدرسه
                                                                </div>
                                                            ) : item.service_status ==
                                                              "reject" ? (
                                                                <div
                                                                    className={
                                                                        "stts red"
                                                                    }
                                                                >
                                                                    رد شده
                                                                </div>
                                                            ) : (
                                                                <div
                                                                    className={
                                                                        "stts yellow"
                                                                    }
                                                                >
                                                                    در انتظار
                                                                    تایید
                                                                </div>
                                                            )}
                                                        </td>
                                                        <td>
                                                            <div className="d-flex">
                                                                <button
                                                                    onClick={() => {
                                                                        setShowCom(
                                                                            true
                                                                        );
                                                                        getDriverDet(
                                                                            item
                                                                        );
                                                                        setIdToReq(
                                                                            item.student_id
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
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
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
