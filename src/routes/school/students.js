import styled from "styled-components";
import Header from "../../components/School/Header";
import Sidebar from "../../components/School/Sidebar";
import Mapir from "mapir-react-component";
import "mapir-react-component/dist/index.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../components/BaseUrl";
import StudentsInfo from "../../components/School/StudentsInfo";

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
            .red-btn {
                margin-right: 12px;
                width: 72px;
                height: 34px;
                background: #f64e60;
                border-radius: 6px;
                font-weight: 400;
                font-size: 12px;
                line-height: 14px;
                color: #ffffff;
                svg {
                    margin-left: 8px;
                }
            }
            .green-btn {
                margin-right: 12px;
                width: 72px;
                height: 34px;
                background: #1bc5bd;
                border-radius: 6px;
                font-weight: 400;
                font-size: 12px;
                line-height: 14px;
                color: #ffffff;
                svg {
                    margin-left: 8px;
                }
            }
            .btn-p {
                margin-right: 12px;
                width: 118px;
                height: 34px;
                background: #8950fc;
                border-radius: 6px;
                font-weight: 400;
                font-size: 12px;
                line-height: 14px;
                color: #ffffff;
            }
            .btn-r {
                margin-right: 12px;
                width: 111px;
                height: 34px;
                background: #f64e60;
                border-radius: 6px;
                font-weight: 400;
                font-size: 12px;
                line-height: 14px;
                color: #ffffff;
            }
            .btn-g {
                margin-right: 12px;
                width: 72px;
                height: 34px;
                background: #1bc5bd;
                border-radius: 6px;
                font-weight: 400;
                font-size: 12px;
                line-height: 14px;
                color: #ffffff;
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
            }
            .blue {
                font-weight: 500;
                font-size: 16px;
                line-height: 21px;
                text-align: right;
                color: #3699ff;
            }
            button {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 10px;
                width: 83.69px;
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

export default function SchoolStudents() {
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
    const [activeTable, setActiveTable] = useState(1);
    return (
        <Main>
            <Sidebar active={4} />
            <div className="w-100">
                <Header />
                <Content>
                    {showCom ? (
                        <StudentsInfo
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
                                            در انتظار تایید ثبت نام(10)
                                        </span>
                                        <span className="span">
                                            ثبت نام توسط دانش آموز انجام شده
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
                                            در انتظار تایید مالی(5)
                                        </span>
                                        <span className="span">
                                            در انتظار تایید مالی جهت دریافت
                                            سرویس
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
                                            همه دانش آموزان
                                        </span>
                                        <span className="span">
                                            تمام دانش آموزان در اتظار تایید و
                                            فعال
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
                            </div>
                            {activeTable == 1 ? (
                                <TableDiv>
                                    <div className="head">
                                        <h6>دانش آموزان فعال (8)</h6>
                                        <div className="tabs">
                                            <span
                                                className={
                                                    activeTab === 1 && ""
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
                                                    activeTab === 2 && ""
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
                                                        d="M9.57637 9.67027C9.68403 8.92033 10.2973 8.33526 11.0834 8.23256C11.5343 8.17365 12.024 8.125 12.4117 8.125C12.7995 8.125 13.2892 8.17365 13.7401 8.23256C14.5261 8.33526 15.1394 8.92033 15.2471 9.67027C15.3088 10.1004 15.3598 10.5676 15.3598 10.9375C15.3598 11.3074 15.3088 11.7746 15.2471 12.2047C15.1394 12.9547 14.5261 13.5397 13.7401 13.6424C13.2892 13.7014 12.7995 13.75 12.4117 13.75C12.024 13.75 11.5343 13.7014 11.0834 13.6424C10.2973 13.5397 9.68403 12.9547 9.57637 12.2047C9.51462 11.7746 9.46362 11.3074 9.46362 10.9375C9.46362 10.5676 9.51462 10.1004 9.57637 9.67027Z"
                                                        fill="#00A3FF"
                                                    />
                                                    <path
                                                        opacity="0.25"
                                                        d="M2.36982 9.67027C2.47748 8.92033 3.09076 8.33526 3.87686 8.23256C4.32773 8.17365 4.81745 8.125 5.20518 8.125C5.59292 8.125 6.08264 8.17365 6.53351 8.23256C7.31961 8.33526 7.93288 8.92033 8.04054 9.67027C8.10229 10.1004 8.15329 10.5676 8.15329 10.9375C8.15329 11.3074 8.10229 11.7746 8.04054 12.2047C7.93288 12.9547 7.31961 13.5397 6.53351 13.6424C6.08264 13.7014 5.59292 13.75 5.20518 13.75C4.81745 13.75 4.32773 13.7014 3.87686 13.6424C3.09076 13.5397 2.47748 12.9547 2.36982 12.2047C2.30807 11.7746 2.25708 11.3074 2.25708 10.9375C2.25708 10.5676 2.30807 10.1004 2.36982 9.67027Z"
                                                        fill="#00A3FF"
                                                    />
                                                    <path
                                                        opacity="0.25"
                                                        d="M9.57637 2.79527C9.68403 2.04533 10.2973 1.46026 11.0834 1.35756C11.5343 1.29865 12.024 1.25 12.4117 1.25C12.7995 1.25 13.2892 1.29865 13.7401 1.35756C14.5261 1.46026 15.1394 2.04533 15.2471 2.79527C15.3088 3.2254 15.3598 3.6926 15.3598 4.0625C15.3598 4.4324 15.3088 4.8996 15.2471 5.32973C15.1394 6.07967 14.5261 6.66474 13.7401 6.76744C13.2892 6.82635 12.7995 6.875 12.4117 6.875C12.024 6.875 11.5343 6.82635 11.0834 6.76744C10.2973 6.66474 9.68403 6.07967 9.57637 5.32973C9.51462 4.8996 9.46362 4.4324 9.46362 4.0625C9.46362 3.6926 9.51462 3.2254 9.57637 2.79527Z"
                                                        fill="#00A3FF"
                                                    />
                                                    <path
                                                        d="M2.36982 2.79527C2.47748 2.04533 3.09076 1.46026 3.87686 1.35756C4.32773 1.29865 4.81745 1.25 5.20518 1.25C5.59292 1.25 6.08264 1.29865 6.53351 1.35756C7.31961 1.46026 7.93288 2.04533 8.04054 2.79527C8.10229 3.2254 8.15329 3.6926 8.15329 4.0625C8.15329 4.4324 8.10229 4.8996 8.04054 5.32973C7.93288 6.07967 7.31961 6.66474 6.53351 6.76744C6.08264 6.82635 5.59292 6.875 5.20518 6.875C4.81745 6.875 4.32773 6.82635 3.87686 6.76744C3.09076 6.66474 2.47748 6.07967 2.36982 5.32973C2.30807 4.8996 2.25708 4.4324 2.25708 4.0625C2.25708 3.6926 2.30807 3.2254 2.36982 2.79527Z"
                                                        fill="#00A3FF"
                                                    />
                                                </svg>
                                                فیلتر
                                            </span>
                                            <span
                                                className={
                                                    activeTab === 3 && ""
                                                }
                                                onClick={() => {
                                                    setActiveTab(3);
                                                }}
                                            >
                                                <svg
                                                    width="17"
                                                    height="17"
                                                    viewBox="0 0 17 17"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fill-rule="evenodd"
                                                        clip-rule="evenodd"
                                                        d="M15.4142 12.3595C15.7333 12.6629 16.2604 12.4355 16.2588 11.9952L16.2484 9.23684V4.18421C16.2484 3.25405 15.4554 2.5 14.4772 2.5H6.21142C5.23319 2.5 4.44019 3.25405 4.44019 4.18421V6.5H8.33786C9.99472 6.5 11.3379 7.84315 11.3379 9.5V10.9211H13.9015L15.4142 12.3595Z"
                                                        fill="#3699FF"
                                                    />
                                                    <path
                                                        opacity="0.3"
                                                        fill-rule="evenodd"
                                                        clip-rule="evenodd"
                                                        d="M1.51196 12.5007V9.16732C1.51196 8.43094 2.13976 7.83398 2.91419 7.83398H8.5231C9.29753 7.83398 9.92533 8.43094 9.92533 9.16732V12.5007C9.92533 13.237 9.29753 13.834 8.5231 13.834H2.99533L2.36684 14.406C2.04572 14.6982 1.5303 14.4704 1.5303 14.0362V12.7168C1.51823 12.6465 1.51196 12.5743 1.51196 12.5007ZM4.32689 10.1673C4.32689 9.98322 4.47613 9.83398 4.66022 9.83398H8.20024C8.38434 9.83398 8.53357 9.98322 8.53357 10.1673C8.53357 10.3514 8.38434 10.5007 8.20024 10.5007H4.66022C4.47613 10.5007 4.32689 10.3514 4.32689 10.1673ZM6.76356 11.1673C6.57947 11.1673 6.43023 11.3166 6.43023 11.5007C6.43023 11.6847 6.57947 11.834 6.76357 11.834H8.20024C8.38434 11.834 8.53357 11.6847 8.53357 11.5007C8.53357 11.3166 8.38434 11.1673 8.20024 11.1673H6.76356Z"
                                                        fill="#3699FF"
                                                    />
                                                </svg>
                                                ارسال پیام
                                            </span>
                                            <span
                                                className="active"
                                                onClick={() => {
                                                    setActiveTab(4);
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
                                                        d="M10.5968 4.00004C10.5968 5.61087 9.29092 6.91671 7.68009 6.91671C6.06926 6.91671 4.76343 5.61087 4.76343 4.00004C4.76343 2.38921 6.06926 1.08337 7.68009 1.08337C9.29092 1.08337 10.5968 2.38921 10.5968 4.00004Z"
                                                        fill="white"
                                                    />
                                                    <path
                                                        opacity="0.25"
                                                        fill-rule="evenodd"
                                                        clip-rule="evenodd"
                                                        d="M11.6573 8.73942C11.2978 8.32252 10.6802 8.344 10.1972 8.60833C9.4499 9.01738 8.5922 9.24994 7.68018 9.24994C6.76815 9.24994 5.91045 9.01738 5.16312 8.60833C4.68019 8.344 4.06258 8.32252 3.70301 8.73942C2.90981 9.65909 2.43018 10.8568 2.43018 12.1666V12.7499C2.43018 13.3943 2.95251 13.9166 3.59684 13.9166H11.7635C12.4078 13.9166 12.9302 13.3943 12.9302 12.7499V12.1666C12.9302 10.8568 12.4505 9.65909 11.6573 8.73942Z"
                                                        fill="white"
                                                    />
                                                </svg>
                                                دانش آموز جدید
                                            </span>
                                        </div>
                                    </div>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>نام و نام خانوادگی</th>
                                                <th>راننده</th>
                                                <th>خودرو</th>
                                                <th>نام موسسه</th>
                                                <th>
                                                    <div className="d-flex align-items-center">
                                                        تعداد سرویس‌
                                                    </div>
                                                </th>
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
                                                                <div className="d-flex align-items-center">
                                                                    <svg
                                                                        width="51"
                                                                        height="50"
                                                                        viewBox="0 0 51 50"
                                                                        fill="none"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                    >
                                                                        <rect
                                                                            x="0.330566"
                                                                            width="50"
                                                                            height="50"
                                                                            rx="6"
                                                                            fill="#D7F9EF"
                                                                        />
                                                                        <g clip-path="url(#clip0_360_21090)">
                                                                            <path
                                                                                d="M31.1034 25.0753L36.1226 18.7647C37.79 16.6257 37.4701 13.4255 35.2132 11.6738C32.9731 9.9558 29.8233 10.4106 28.139 12.5833C28.0043 12.735 24.1306 17.5857 23.6252 18.1921C23.6083 18.2258 23.5914 18.2426 23.5914 18.2426V15.6825C23.5914 12.9033 21.3177 10.6296 18.5385 10.6296C15.7593 10.6296 13.4856 12.9033 13.4856 15.6825V34.3221C13.4856 37.1012 15.7593 39.375 18.5385 39.375C21.3177 39.375 23.5914 37.1012 23.5914 34.3221V31.8125C23.7263 31.9809 28.1221 37.41 28.139 37.41C29.8739 39.6164 33.0068 40.0207 35.2132 38.3026C37.4869 36.5341 37.7731 33.4294 36.1226 31.2735L31.1034 25.0753Z"
                                                                                fill="#7FE881"
                                                                            />
                                                                            <path
                                                                                d="M36.1227 31.2735C37.7733 33.4294 37.4871 36.5341 35.2133 38.3026C33.007 40.0207 29.874 39.6164 28.1391 37.41C28.1223 37.41 23.7265 31.9809 23.5916 31.8125V18.2426C23.5916 18.2426 23.6084 18.2258 23.6253 18.1921C24.1306 17.5857 28.0044 12.735 28.1391 12.5833C29.8234 10.4106 32.9733 9.95579 35.2133 11.6738C37.4702 13.4255 37.7901 16.6257 36.1227 18.7647L31.1035 25.0753L36.1227 31.2735Z"
                                                                                fill="#5BC980"
                                                                            />
                                                                        </g>
                                                                        <defs>
                                                                            <clipPath id="clip0_360_21090">
                                                                                <rect
                                                                                    x="10.9556"
                                                                                    y="10.625"
                                                                                    width="28.75"
                                                                                    height="28.75"
                                                                                    rx="6"
                                                                                    fill="white"
                                                                                />
                                                                            </clipPath>
                                                                        </defs>
                                                                    </svg>

                                                                    <div>
                                                                        <span className="span-1">
                                                                            {
                                                                                item.student_name
                                                                            }{" "}
                                                                            {
                                                                                item.student_l_name
                                                                            }
                                                                        </span>
                                                                        <span className="span-2">
                                                                            {
                                                                                item.student_phone
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div>
                                                                    <span className="span-1">
                                                                        اکبر
                                                                        کریمی
                                                                    </span>
                                                                    <span className="span-2">
                                                                        09123456789
                                                                    </span>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div>
                                                                    <span className="span-1">
                                                                        پژو 206
                                                                        - سفید
                                                                    </span>
                                                                    <span className="span-2">
                                                                        54 ایران
                                                                        24 ص 543
                                                                    </span>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <span className="span-1">
                                                                    {
                                                                        item.student_school_name
                                                                    }
                                                                </span>
                                                                <span className="span-2">
                                                                    {
                                                                        item.student_school_phone
                                                                    }
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <span className="span-1">
                                                                    {
                                                                        item.student_service
                                                                    }{" "}
                                                                    سرویس
                                                                </span>
                                                            </td>
                                                            <td>
                                                                {item.student_status ==
                                                                "ok" ? (
                                                                    <div
                                                                        className={
                                                                            "stts"
                                                                        }
                                                                    >
                                                                        تایید
                                                                        شده
                                                                    </div>
                                                                ) : item.student_status ==
                                                                  "reject" ? (
                                                                    <div
                                                                        className={
                                                                            "stts red"
                                                                        }
                                                                    >
                                                                        رد شده
                                                                    </div>
                                                                ) : (
                                                                    ""
                                                                )}
                                                            </td>
                                                            <td>
                                                                <div className="d-flex">
                                                                    <svg
                                                                        className="ml-10"
                                                                        width="33"
                                                                        height="32"
                                                                        viewBox="0 0 33 32"
                                                                        fill="none"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                    >
                                                                        <rect
                                                                            x="0.692383"
                                                                            width="32"
                                                                            height="32"
                                                                            rx="6"
                                                                            fill="#F3F6F9"
                                                                        />
                                                                        <path
                                                                            fill-rule="evenodd"
                                                                            clip-rule="evenodd"
                                                                            d="M23.4098 20.1895C23.7289 20.4929 24.256 20.2656 24.2544 19.8253L24.244 17.0669V12.0143C24.244 11.0841 23.451 10.3301 22.4728 10.3301H14.207C13.2288 10.3301 12.4358 11.0841 12.4358 12.0143V14.3301H16.3335C17.9903 14.3301 19.3335 15.6732 19.3335 17.3301V18.7511H21.8971L23.4098 20.1895Z"
                                                                            fill="#3699FF"
                                                                        />
                                                                        <path
                                                                            opacity="0.3"
                                                                            fill-rule="evenodd"
                                                                            clip-rule="evenodd"
                                                                            d="M9.50757 20.3307V16.9974C9.50757 16.261 10.1354 15.6641 10.9098 15.6641H16.5187C17.2931 15.6641 17.9209 16.261 17.9209 16.9974V20.3307C17.9209 21.0671 17.2931 21.6641 16.5187 21.6641H10.9909L10.3624 22.2361C10.0413 22.5283 9.5259 22.3005 9.5259 21.8663V20.5469C9.51384 20.4765 9.50757 20.4043 9.50757 20.3307ZM12.3225 17.9974C12.3225 17.8133 12.4717 17.6641 12.6558 17.6641H16.1958C16.3799 17.6641 16.5292 17.8133 16.5292 17.9974C16.5292 18.1815 16.3799 18.3307 16.1958 18.3307H12.6558C12.4717 18.3307 12.3225 18.1815 12.3225 17.9974ZM14.7592 18.9974C14.5751 18.9974 14.4258 19.1466 14.4258 19.3307C14.4258 19.5148 14.5751 19.6641 14.7592 19.6641H16.1958C16.3799 19.6641 16.5292 19.5148 16.5292 19.3307C16.5292 19.1466 16.3799 18.9974 16.1958 18.9974H14.7592Z"
                                                                            fill="#3699FF"
                                                                        />
                                                                    </svg>

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
                                                    );
                                                })}
                                        </tbody>
                                    </table>
                                </TableDiv>
                            ) : activeTable == 2 ? (
                                <TableDiv>
                                    <div className="head">
                                        <h6>دانش آموزان فعال (8)</h6>
                                        <div className="tabs">
                                            <span
                                                className={
                                                    activeTab === 1 && ""
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
                                                    activeTab === 2 && ""
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
                                                        d="M9.57637 9.67027C9.68403 8.92033 10.2973 8.33526 11.0834 8.23256C11.5343 8.17365 12.024 8.125 12.4117 8.125C12.7995 8.125 13.2892 8.17365 13.7401 8.23256C14.5261 8.33526 15.1394 8.92033 15.2471 9.67027C15.3088 10.1004 15.3598 10.5676 15.3598 10.9375C15.3598 11.3074 15.3088 11.7746 15.2471 12.2047C15.1394 12.9547 14.5261 13.5397 13.7401 13.6424C13.2892 13.7014 12.7995 13.75 12.4117 13.75C12.024 13.75 11.5343 13.7014 11.0834 13.6424C10.2973 13.5397 9.68403 12.9547 9.57637 12.2047C9.51462 11.7746 9.46362 11.3074 9.46362 10.9375C9.46362 10.5676 9.51462 10.1004 9.57637 9.67027Z"
                                                        fill="#00A3FF"
                                                    />
                                                    <path
                                                        opacity="0.25"
                                                        d="M2.36982 9.67027C2.47748 8.92033 3.09076 8.33526 3.87686 8.23256C4.32773 8.17365 4.81745 8.125 5.20518 8.125C5.59292 8.125 6.08264 8.17365 6.53351 8.23256C7.31961 8.33526 7.93288 8.92033 8.04054 9.67027C8.10229 10.1004 8.15329 10.5676 8.15329 10.9375C8.15329 11.3074 8.10229 11.7746 8.04054 12.2047C7.93288 12.9547 7.31961 13.5397 6.53351 13.6424C6.08264 13.7014 5.59292 13.75 5.20518 13.75C4.81745 13.75 4.32773 13.7014 3.87686 13.6424C3.09076 13.5397 2.47748 12.9547 2.36982 12.2047C2.30807 11.7746 2.25708 11.3074 2.25708 10.9375C2.25708 10.5676 2.30807 10.1004 2.36982 9.67027Z"
                                                        fill="#00A3FF"
                                                    />
                                                    <path
                                                        opacity="0.25"
                                                        d="M9.57637 2.79527C9.68403 2.04533 10.2973 1.46026 11.0834 1.35756C11.5343 1.29865 12.024 1.25 12.4117 1.25C12.7995 1.25 13.2892 1.29865 13.7401 1.35756C14.5261 1.46026 15.1394 2.04533 15.2471 2.79527C15.3088 3.2254 15.3598 3.6926 15.3598 4.0625C15.3598 4.4324 15.3088 4.8996 15.2471 5.32973C15.1394 6.07967 14.5261 6.66474 13.7401 6.76744C13.2892 6.82635 12.7995 6.875 12.4117 6.875C12.024 6.875 11.5343 6.82635 11.0834 6.76744C10.2973 6.66474 9.68403 6.07967 9.57637 5.32973C9.51462 4.8996 9.46362 4.4324 9.46362 4.0625C9.46362 3.6926 9.51462 3.2254 9.57637 2.79527Z"
                                                        fill="#00A3FF"
                                                    />
                                                    <path
                                                        d="M2.36982 2.79527C2.47748 2.04533 3.09076 1.46026 3.87686 1.35756C4.32773 1.29865 4.81745 1.25 5.20518 1.25C5.59292 1.25 6.08264 1.29865 6.53351 1.35756C7.31961 1.46026 7.93288 2.04533 8.04054 2.79527C8.10229 3.2254 8.15329 3.6926 8.15329 4.0625C8.15329 4.4324 8.10229 4.8996 8.04054 5.32973C7.93288 6.07967 7.31961 6.66474 6.53351 6.76744C6.08264 6.82635 5.59292 6.875 5.20518 6.875C4.81745 6.875 4.32773 6.82635 3.87686 6.76744C3.09076 6.66474 2.47748 6.07967 2.36982 5.32973C2.30807 4.8996 2.25708 4.4324 2.25708 4.0625C2.25708 3.6926 2.30807 3.2254 2.36982 2.79527Z"
                                                        fill="#00A3FF"
                                                    />
                                                </svg>
                                                فیلتر
                                            </span>
                                            <span
                                                className={
                                                    activeTab === 3 && ""
                                                }
                                                onClick={() => {
                                                    setActiveTab(3);
                                                }}
                                            >
                                                <svg
                                                    width="17"
                                                    height="17"
                                                    viewBox="0 0 17 17"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fill-rule="evenodd"
                                                        clip-rule="evenodd"
                                                        d="M15.4142 12.3595C15.7333 12.6629 16.2604 12.4355 16.2588 11.9952L16.2484 9.23684V4.18421C16.2484 3.25405 15.4554 2.5 14.4772 2.5H6.21142C5.23319 2.5 4.44019 3.25405 4.44019 4.18421V6.5H8.33786C9.99472 6.5 11.3379 7.84315 11.3379 9.5V10.9211H13.9015L15.4142 12.3595Z"
                                                        fill="#3699FF"
                                                    />
                                                    <path
                                                        opacity="0.3"
                                                        fill-rule="evenodd"
                                                        clip-rule="evenodd"
                                                        d="M1.51196 12.5007V9.16732C1.51196 8.43094 2.13976 7.83398 2.91419 7.83398H8.5231C9.29753 7.83398 9.92533 8.43094 9.92533 9.16732V12.5007C9.92533 13.237 9.29753 13.834 8.5231 13.834H2.99533L2.36684 14.406C2.04572 14.6982 1.5303 14.4704 1.5303 14.0362V12.7168C1.51823 12.6465 1.51196 12.5743 1.51196 12.5007ZM4.32689 10.1673C4.32689 9.98322 4.47613 9.83398 4.66022 9.83398H8.20024C8.38434 9.83398 8.53357 9.98322 8.53357 10.1673C8.53357 10.3514 8.38434 10.5007 8.20024 10.5007H4.66022C4.47613 10.5007 4.32689 10.3514 4.32689 10.1673ZM6.76356 11.1673C6.57947 11.1673 6.43023 11.3166 6.43023 11.5007C6.43023 11.6847 6.57947 11.834 6.76357 11.834H8.20024C8.38434 11.834 8.53357 11.6847 8.53357 11.5007C8.53357 11.3166 8.38434 11.1673 8.20024 11.1673H6.76356Z"
                                                        fill="#3699FF"
                                                    />
                                                </svg>
                                                ارسال پیام
                                            </span>
                                            <button className="btn-p">
                                                <svg
                                                    width="15"
                                                    height="14"
                                                    viewBox="0 0 15 14"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M9.95394 3.50004C9.95394 5.11087 8.6481 6.41671 7.03727 6.41671C5.42644 6.41671 4.12061 5.11087 4.12061 3.50004C4.12061 1.88921 5.42644 0.583374 7.03727 0.583374C8.6481 0.583374 9.95394 1.88921 9.95394 3.50004Z"
                                                        fill="white"
                                                    />
                                                    <path
                                                        opacity="0.25"
                                                        fill-rule="evenodd"
                                                        clip-rule="evenodd"
                                                        d="M11.0143 8.23942C10.6547 7.82252 10.0371 7.844 9.55416 8.10833C8.80684 8.51738 7.94913 8.74994 7.03711 8.74994C6.12509 8.74994 5.26738 8.51738 4.52006 8.10833C4.03712 7.844 3.41952 7.82252 3.05994 8.23942C2.26674 9.15909 1.78711 10.3568 1.78711 11.6666V12.2499C1.78711 12.8943 2.30944 13.4166 2.95378 13.4166H11.1204C11.7648 13.4166 12.2871 12.8943 12.2871 12.2499V11.6666C12.2871 10.3568 11.8075 9.15909 11.0143 8.23942Z"
                                                        fill="white"
                                                    />
                                                </svg>
                                                نقص اطلاعات
                                            </button>
                                            <button className="btn-r">
                                                <svg
                                                    width="15"
                                                    height="14"
                                                    viewBox="0 0 15 14"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M9.95394 3.50004C9.95394 5.11087 8.6481 6.41671 7.03727 6.41671C5.42644 6.41671 4.12061 5.11087 4.12061 3.50004C4.12061 1.88921 5.42644 0.583374 7.03727 0.583374C8.6481 0.583374 9.95394 1.88921 9.95394 3.50004Z"
                                                        fill="white"
                                                    />
                                                    <path
                                                        opacity="0.25"
                                                        fill-rule="evenodd"
                                                        clip-rule="evenodd"
                                                        d="M11.0143 8.23942C10.6547 7.82252 10.0371 7.844 9.55416 8.10833C8.80684 8.51738 7.94913 8.74994 7.03711 8.74994C6.12509 8.74994 5.26738 8.51738 4.52006 8.10833C4.03712 7.844 3.41952 7.82252 3.05994 8.23942C2.26674 9.15909 1.78711 10.3568 1.78711 11.6666V12.2499C1.78711 12.8943 2.30944 13.4166 2.95378 13.4166H11.1204C11.7648 13.4166 12.2871 12.8943 12.2871 12.2499V11.6666C12.2871 10.3568 11.8075 9.15909 11.0143 8.23942Z"
                                                        fill="white"
                                                    />
                                                </svg>
                                                رد درخواست
                                            </button>
                                            <button className="btn-g">
                                                <svg
                                                    width="15"
                                                    height="14"
                                                    viewBox="0 0 15 14"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M9.95394 3.50004C9.95394 5.11087 8.6481 6.41671 7.03727 6.41671C5.42644 6.41671 4.12061 5.11087 4.12061 3.50004C4.12061 1.88921 5.42644 0.583374 7.03727 0.583374C8.6481 0.583374 9.95394 1.88921 9.95394 3.50004Z"
                                                        fill="white"
                                                    />
                                                    <path
                                                        opacity="0.25"
                                                        fill-rule="evenodd"
                                                        clip-rule="evenodd"
                                                        d="M11.0143 8.23942C10.6547 7.82252 10.0371 7.844 9.55416 8.10833C8.80684 8.51738 7.94913 8.74994 7.03711 8.74994C6.12509 8.74994 5.26738 8.51738 4.52006 8.10833C4.03712 7.844 3.41952 7.82252 3.05994 8.23942C2.26674 9.15909 1.78711 10.3568 1.78711 11.6666V12.2499C1.78711 12.8943 2.30944 13.4166 2.95378 13.4166H11.1204C11.7648 13.4166 12.2871 12.8943 12.2871 12.2499V11.6666C12.2871 10.3568 11.8075 9.15909 11.0143 8.23942Z"
                                                        fill="white"
                                                    />
                                                </svg>
                                                تایید
                                            </button>
                                        </div>
                                    </div>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>نام و نام خانوادگی</th>
                                                <th>آدرس و فاصله</th>
                                                <th>زمان درخواست</th>
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
                                                                <div className="d-flex align-items-center">
                                                                    <svg
                                                                        width="51"
                                                                        height="50"
                                                                        viewBox="0 0 51 50"
                                                                        fill="none"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                    >
                                                                        <rect
                                                                            x="0.330566"
                                                                            width="50"
                                                                            height="50"
                                                                            rx="6"
                                                                            fill="#D7F9EF"
                                                                        />
                                                                        <g clip-path="url(#clip0_360_21090)">
                                                                            <path
                                                                                d="M31.1034 25.0753L36.1226 18.7647C37.79 16.6257 37.4701 13.4255 35.2132 11.6738C32.9731 9.9558 29.8233 10.4106 28.139 12.5833C28.0043 12.735 24.1306 17.5857 23.6252 18.1921C23.6083 18.2258 23.5914 18.2426 23.5914 18.2426V15.6825C23.5914 12.9033 21.3177 10.6296 18.5385 10.6296C15.7593 10.6296 13.4856 12.9033 13.4856 15.6825V34.3221C13.4856 37.1012 15.7593 39.375 18.5385 39.375C21.3177 39.375 23.5914 37.1012 23.5914 34.3221V31.8125C23.7263 31.9809 28.1221 37.41 28.139 37.41C29.8739 39.6164 33.0068 40.0207 35.2132 38.3026C37.4869 36.5341 37.7731 33.4294 36.1226 31.2735L31.1034 25.0753Z"
                                                                                fill="#7FE881"
                                                                            />
                                                                            <path
                                                                                d="M36.1227 31.2735C37.7733 33.4294 37.4871 36.5341 35.2133 38.3026C33.007 40.0207 29.874 39.6164 28.1391 37.41C28.1223 37.41 23.7265 31.9809 23.5916 31.8125V18.2426C23.5916 18.2426 23.6084 18.2258 23.6253 18.1921C24.1306 17.5857 28.0044 12.735 28.1391 12.5833C29.8234 10.4106 32.9733 9.95579 35.2133 11.6738C37.4702 13.4255 37.7901 16.6257 36.1227 18.7647L31.1035 25.0753L36.1227 31.2735Z"
                                                                                fill="#5BC980"
                                                                            />
                                                                        </g>
                                                                        <defs>
                                                                            <clipPath id="clip0_360_21090">
                                                                                <rect
                                                                                    x="10.9556"
                                                                                    y="10.625"
                                                                                    width="28.75"
                                                                                    height="28.75"
                                                                                    rx="6"
                                                                                    fill="white"
                                                                                />
                                                                            </clipPath>
                                                                        </defs>
                                                                    </svg>

                                                                    <div>
                                                                        <span className="span-1">
                                                                            {
                                                                                item.student_name
                                                                            }{" "}
                                                                            {
                                                                                item.student_l_name
                                                                            }
                                                                        </span>
                                                                        <span className="span-2">
                                                                            {
                                                                                item.student_phone
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div>
                                                                    <span className="span-1">
                                                                        5
                                                                        کیلومتر
                                                                    </span>
                                                                    <span className="span-2">
                                                                        شهرک
                                                                        فردوسی،
                                                                        خیابان
                                                                        بادگیر،
                                                                        کوچه اول
                                                                    </span>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <span className="blue">
                                                                    1401/04/12
                                                                </span>
                                                            </td>
                                                            <td>
                                                                {item.student_status ==
                                                                "ok" ? (
                                                                    <div
                                                                        className={
                                                                            "stts"
                                                                        }
                                                                    >
                                                                        تایید
                                                                        شده
                                                                    </div>
                                                                ) : item.student_status ==
                                                                  "reject" ? (
                                                                    <div
                                                                        className={
                                                                            "stts red"
                                                                        }
                                                                    >
                                                                        رد شده
                                                                    </div>
                                                                ) : (
                                                                    ""
                                                                )}
                                                            </td>
                                                            <td>
                                                                <div className="d-flex">
                                                                    <svg
                                                                        className="ml-10"
                                                                        width="33"
                                                                        height="32"
                                                                        viewBox="0 0 33 32"
                                                                        fill="none"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                    >
                                                                        <rect
                                                                            x="0.692383"
                                                                            width="32"
                                                                            height="32"
                                                                            rx="6"
                                                                            fill="#F3F6F9"
                                                                        />
                                                                        <path
                                                                            fill-rule="evenodd"
                                                                            clip-rule="evenodd"
                                                                            d="M23.4098 20.1895C23.7289 20.4929 24.256 20.2656 24.2544 19.8253L24.244 17.0669V12.0143C24.244 11.0841 23.451 10.3301 22.4728 10.3301H14.207C13.2288 10.3301 12.4358 11.0841 12.4358 12.0143V14.3301H16.3335C17.9903 14.3301 19.3335 15.6732 19.3335 17.3301V18.7511H21.8971L23.4098 20.1895Z"
                                                                            fill="#3699FF"
                                                                        />
                                                                        <path
                                                                            opacity="0.3"
                                                                            fill-rule="evenodd"
                                                                            clip-rule="evenodd"
                                                                            d="M9.50757 20.3307V16.9974C9.50757 16.261 10.1354 15.6641 10.9098 15.6641H16.5187C17.2931 15.6641 17.9209 16.261 17.9209 16.9974V20.3307C17.9209 21.0671 17.2931 21.6641 16.5187 21.6641H10.9909L10.3624 22.2361C10.0413 22.5283 9.5259 22.3005 9.5259 21.8663V20.5469C9.51384 20.4765 9.50757 20.4043 9.50757 20.3307ZM12.3225 17.9974C12.3225 17.8133 12.4717 17.6641 12.6558 17.6641H16.1958C16.3799 17.6641 16.5292 17.8133 16.5292 17.9974C16.5292 18.1815 16.3799 18.3307 16.1958 18.3307H12.6558C12.4717 18.3307 12.3225 18.1815 12.3225 17.9974ZM14.7592 18.9974C14.5751 18.9974 14.4258 19.1466 14.4258 19.3307C14.4258 19.5148 14.5751 19.6641 14.7592 19.6641H16.1958C16.3799 19.6641 16.5292 19.5148 16.5292 19.3307C16.5292 19.1466 16.3799 18.9974 16.1958 18.9974H14.7592Z"
                                                                            fill="#3699FF"
                                                                        />
                                                                    </svg>

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
                                                    );
                                                })}
                                        </tbody>
                                    </table>
                                </TableDiv>
                            ) : activeTable == 3 ? (
                                <TableDiv>
                                    <div className="head">
                                        <h6>مالی دانش آموزان(780)</h6>
                                        <div className="tabs">
                                            <span
                                                className={
                                                    activeTab === 1 && ""
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
                                                    activeTab === 2 && ""
                                                }
                                                onClick={() => {
                                                    setActiveTab(2);
                                                }}
                                            >
                                                دبیرستان دخترانه فرزاگان
                                                <svg
                                                    className="ms-0 me-1"
                                                    width="21"
                                                    height="21"
                                                    viewBox="0 0 21 21"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M6.02473 7.86518C5.7043 7.54475 5.18478 7.54475 4.86435 7.86518C4.54392 8.18561 4.54392 8.70513 4.86435 9.02556L9.78742 13.9486C10.0981 14.2593 10.5982 14.2701 10.9221 13.9733L15.8451 9.46048C16.1792 9.15427 16.2017 8.63524 15.8955 8.30119C15.5893 7.96714 15.0703 7.94458 14.7362 8.25079L10.3923 12.2327L6.02473 7.86518Z"
                                                        fill="#3699FF"
                                                    />
                                                </svg>
                                            </span>
                                            <span
                                                className={
                                                    activeTab === 3 && ""
                                                }
                                                onClick={() => {
                                                    setActiveTab(3);
                                                }}
                                            >
                                                همه وضعیت‌ها
                                                <svg
                                                    className="ms-0 me-1"
                                                    width="21"
                                                    height="21"
                                                    viewBox="0 0 21 21"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M6.02473 7.86518C5.7043 7.54475 5.18478 7.54475 4.86435 7.86518C4.54392 8.18561 4.54392 8.70513 4.86435 9.02556L9.78742 13.9486C10.0981 14.2593 10.5982 14.2701 10.9221 13.9733L15.8451 9.46048C16.1792 9.15427 16.2017 8.63524 15.8955 8.30119C15.5893 7.96714 15.0703 7.94458 14.7362 8.25079L10.3923 12.2327L6.02473 7.86518Z"
                                                        fill="#3699FF"
                                                    />
                                                </svg>
                                            </span>
                                            <button className="red-btn">
                                                <svg
                                                    width="15"
                                                    height="15"
                                                    viewBox="0 0 15 15"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M10.7459 3.94535C10.7459 5.55618 9.44009 6.86202 7.82926 6.86202C6.21843 6.86202 4.9126 5.55618 4.9126 3.94535C4.9126 2.33452 6.21843 1.02869 7.82926 1.02869C9.44009 1.02869 10.7459 2.33452 10.7459 3.94535Z"
                                                        fill="white"
                                                    />
                                                    <path
                                                        opacity="0.25"
                                                        fill-rule="evenodd"
                                                        clip-rule="evenodd"
                                                        d="M11.8063 8.68473C11.4467 8.26783 10.8291 8.28931 10.3462 8.55365C9.59883 8.96269 8.74112 9.19525 7.8291 9.19525C6.91708 9.19525 6.05937 8.96269 5.31205 8.55365C4.82912 8.28931 4.21151 8.26783 3.85194 8.68473C3.05873 9.6044 2.5791 10.8021 2.5791 12.1119V12.6952C2.5791 13.3396 3.10144 13.8619 3.74577 13.8619H11.9124C12.5568 13.8619 13.0791 13.3396 13.0791 12.6952V12.1119C13.0791 10.8021 12.5995 9.6044 11.8063 8.68473Z"
                                                        fill="white"
                                                    />
                                                </svg>
                                                رد
                                            </button>
                                            <button className="green-btn">
                                                <svg
                                                    width="15"
                                                    height="15"
                                                    viewBox="0 0 15 15"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M10.7459 3.94535C10.7459 5.55618 9.44009 6.86202 7.82926 6.86202C6.21843 6.86202 4.9126 5.55618 4.9126 3.94535C4.9126 2.33452 6.21843 1.02869 7.82926 1.02869C9.44009 1.02869 10.7459 2.33452 10.7459 3.94535Z"
                                                        fill="white"
                                                    />
                                                    <path
                                                        opacity="0.25"
                                                        fill-rule="evenodd"
                                                        clip-rule="evenodd"
                                                        d="M11.8063 8.68473C11.4467 8.26783 10.8291 8.28931 10.3462 8.55365C9.59883 8.96269 8.74112 9.19525 7.8291 9.19525C6.91708 9.19525 6.05937 8.96269 5.31205 8.55365C4.82912 8.28931 4.21151 8.26783 3.85194 8.68473C3.05873 9.6044 2.5791 10.8021 2.5791 12.1119V12.6952C2.5791 13.3396 3.10144 13.8619 3.74577 13.8619H11.9124C12.5568 13.8619 13.0791 13.3396 13.0791 12.6952V12.1119C13.0791 10.8021 12.5995 9.6044 11.8063 8.68473Z"
                                                        fill="white"
                                                    />
                                                </svg>
                                                تایید
                                            </button>
                                        </div>
                                    </div>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>نام و نام خانوادگی</th>
                                                <th>نام موسسه</th>
                                                <th>
                                                    فاصله
                                                    <svg
                                                        width="16"
                                                        height="16"
                                                        viewBox="0 0 16 16"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            opacity="0.3"
                                                            d="M7.33301 3.99955C7.33301 3.63136 7.63148 3.33289 7.99967 3.33289C8.36786 3.33289 8.66634 3.63136 8.66634 3.99955V11.9996C8.66634 12.3677 8.36786 12.6662 7.99967 12.6662C7.63148 12.6662 7.33301 12.3677 7.33301 11.9996V3.99955Z"
                                                            fill="#3699FF"
                                                        />
                                                        <path
                                                            d="M4.47108 7.52806C4.21073 7.26771 3.78862 7.26771 3.52827 7.52806C3.26792 7.78841 3.26792 8.21052 3.52827 8.47087L7.52827 12.4709C7.78065 12.7233 8.18705 12.7321 8.45016 12.4909L12.4502 8.82424C12.7216 8.57544 12.7399 8.15373 12.4911 7.88232C12.2423 7.61091 11.8206 7.59257 11.5492 7.84137L8.01972 11.0767L4.47108 7.52806Z"
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
                                                            d="M7.33301 3.99955C7.33301 3.63136 7.63148 3.33289 7.99967 3.33289C8.36786 3.33289 8.66634 3.63136 8.66634 3.99955V11.9996C8.66634 12.3677 8.36786 12.6662 7.99967 12.6662C7.63148 12.6662 7.33301 12.3677 7.33301 11.9996V3.99955Z"
                                                            fill="#3699FF"
                                                        />
                                                        <path
                                                            d="M4.47108 7.52806C4.21073 7.26771 3.78862 7.26771 3.52827 7.52806C3.26792 7.78841 3.26792 8.21052 3.52827 8.47087L7.52827 12.4709C7.78065 12.7233 8.18705 12.7321 8.45016 12.4909L12.4502 8.82424C12.7216 8.57544 12.7399 8.15373 12.4911 7.88232C12.2423 7.61091 11.8206 7.59257 11.5492 7.84137L8.01972 11.0767L4.47108 7.52806Z"
                                                            fill="#3699FF"
                                                        />
                                                    </svg>
                                                </th>
                                                <th>
                                                    <div className="d-flex align-items-center">
                                                        سرویس‌ها
                                                    </div>
                                                </th>
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
                                                                <div className="d-flex align-items-center">
                                                                    <svg
                                                                        width="51"
                                                                        height="50"
                                                                        viewBox="0 0 51 50"
                                                                        fill="none"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                    >
                                                                        <rect
                                                                            x="0.330566"
                                                                            width="50"
                                                                            height="50"
                                                                            rx="6"
                                                                            fill="#D7F9EF"
                                                                        />
                                                                        <g clip-path="url(#clip0_360_21090)">
                                                                            <path
                                                                                d="M31.1034 25.0753L36.1226 18.7647C37.79 16.6257 37.4701 13.4255 35.2132 11.6738C32.9731 9.9558 29.8233 10.4106 28.139 12.5833C28.0043 12.735 24.1306 17.5857 23.6252 18.1921C23.6083 18.2258 23.5914 18.2426 23.5914 18.2426V15.6825C23.5914 12.9033 21.3177 10.6296 18.5385 10.6296C15.7593 10.6296 13.4856 12.9033 13.4856 15.6825V34.3221C13.4856 37.1012 15.7593 39.375 18.5385 39.375C21.3177 39.375 23.5914 37.1012 23.5914 34.3221V31.8125C23.7263 31.9809 28.1221 37.41 28.139 37.41C29.8739 39.6164 33.0068 40.0207 35.2132 38.3026C37.4869 36.5341 37.7731 33.4294 36.1226 31.2735L31.1034 25.0753Z"
                                                                                fill="#7FE881"
                                                                            />
                                                                            <path
                                                                                d="M36.1227 31.2735C37.7733 33.4294 37.4871 36.5341 35.2133 38.3026C33.007 40.0207 29.874 39.6164 28.1391 37.41C28.1223 37.41 23.7265 31.9809 23.5916 31.8125V18.2426C23.5916 18.2426 23.6084 18.2258 23.6253 18.1921C24.1306 17.5857 28.0044 12.735 28.1391 12.5833C29.8234 10.4106 32.9733 9.95579 35.2133 11.6738C37.4702 13.4255 37.7901 16.6257 36.1227 18.7647L31.1035 25.0753L36.1227 31.2735Z"
                                                                                fill="#5BC980"
                                                                            />
                                                                        </g>
                                                                        <defs>
                                                                            <clipPath id="clip0_360_21090">
                                                                                <rect
                                                                                    x="10.9556"
                                                                                    y="10.625"
                                                                                    width="28.75"
                                                                                    height="28.75"
                                                                                    rx="6"
                                                                                    fill="white"
                                                                                />
                                                                            </clipPath>
                                                                        </defs>
                                                                    </svg>

                                                                    <div>
                                                                        <span className="span-1">
                                                                            {
                                                                                item.student_name
                                                                            }{" "}
                                                                            {
                                                                                item.student_l_name
                                                                            }
                                                                        </span>
                                                                        <span className="span-2">
                                                                            {
                                                                                item.student_phone
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div>
                                                                    <span className="span-1">
                                                                        سفیر
                                                                        امید
                                                                    </span>
                                                                    <span className="span-2">
                                                                        035-6234321
                                                                    </span>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div>
                                                                    <span className="span-1">
                                                                        5
                                                                    </span>
                                                                    <span className="span-2">
                                                                        کیلومتر
                                                                    </span>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div>
                                                                    <span className="span-1">
                                                                        5,000,000
                                                                    </span>
                                                                    <span className="span-2">
                                                                        ریال
                                                                    </span>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div>
                                                                    <span className="span-1">
                                                                        2
                                                                    </span>
                                                                    <span className="span-2">
                                                                        سرویس
                                                                    </span>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                {item.student_status ==
                                                                "ok" ? (
                                                                    <div
                                                                        className={
                                                                            "stts"
                                                                        }
                                                                    >
                                                                        تایید
                                                                        شده
                                                                    </div>
                                                                ) : item.student_status ==
                                                                  "reject" ? (
                                                                    <div
                                                                        className={
                                                                            "stts red"
                                                                        }
                                                                    >
                                                                        رد شده
                                                                    </div>
                                                                ) : (
                                                                    ""
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
                                                                        مشاهده
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
