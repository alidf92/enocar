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
    width: 49%;
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
                width: 114.69px;
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

export default function SchoolFinancial() {
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
            <Sidebar active={7} />
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
                                            مالی دانش آموزان
                                        </span>
                                        <span className="span">
                                            مشاهده و ثبت تراکنش‌های دانش آموزان
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
                                            مالی موسسات
                                        </span>
                                        <span className="span">
                                            مشاهده و ثبت تراکنش‌های مالی با
                                            موسسات
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
                            </div>
                            {activeTable == 1 ? (
                                <TableDiv>
                                    <div className="head">
                                        <div className="d-flex align-items-center">
                                            <h6>مالی دانش آموزان(780)</h6>
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
                                                    width="15"
                                                    height="16"
                                                    viewBox="0 0 15 16"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        opacity="0.3"
                                                        d="M5.24913 12.1576C5.59371 11.8131 5.59371 11.2544 5.24913 10.9098C4.90455 10.5652 4.34588 10.5652 4.0013 10.9098L0.471891 14.4392C0.127311 14.7838 0.127311 15.3425 0.471891 15.687C0.816471 16.0316 1.37514 16.0316 1.71972 15.687L5.24913 12.1576Z"
                                                        fill="#00A3FF"
                                                    />
                                                    <path
                                                        fill-rule="evenodd"
                                                        clip-rule="evenodd"
                                                        d="M14.3311 7.12178C14.3311 10.5329 11.5658 13.2982 8.15459 13.2982C4.74342 13.2982 1.97813 10.5329 1.97813 7.12178C1.97813 3.71061 4.74342 0.945312 8.15459 0.945312C11.5658 0.945312 14.3311 3.71061 14.3311 7.12178ZM3.74286 7.12178C3.74286 9.55833 5.71807 11.5335 8.15462 11.5335C10.5912 11.5335 12.5664 9.55833 12.5664 7.12178C12.5664 4.68523 10.5912 2.71002 8.15462 2.71002C5.71807 2.71002 3.74286 4.68523 3.74286 7.12178Z"
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
                                                دبیرستان دخترانه فرزاگان
                                                <svg
                                                    width="21"
                                                    height="21"
                                                    viewBox="0 0 21 21"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M6.02448 7.86567C5.70405 7.54524 5.18453 7.54524 4.8641 7.86567C4.54367 8.1861 4.54367 8.70562 4.8641 9.02605L9.78718 13.9491C10.0978 14.2598 10.598 14.2706 10.9218 13.9738L15.8449 9.46096C16.1789 9.15476 16.2015 8.63573 15.8953 8.30168C15.5891 7.96763 15.0701 7.94507 14.736 8.25128L10.392 12.2332L6.02448 7.86567Z"
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
                                                همه وضعیت‌ها
                                                <svg
                                                    width="21"
                                                    height="21"
                                                    viewBox="0 0 21 21"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M6.3321 7.86567C6.01167 7.54524 5.49215 7.54524 5.17172 7.86567C4.85129 8.1861 4.85129 8.70562 5.17172 9.02605L10.0948 13.9491C10.4054 14.2598 10.9056 14.2706 11.2294 13.9738L16.1525 9.46096C16.4865 9.15476 16.5091 8.63573 16.2029 8.30168C15.8967 7.96763 15.3777 7.94507 15.0436 8.25128L10.6997 12.2332L6.3321 7.86567Z"
                                                        fill="#3699FF"
                                                    />
                                                </svg>
                                            </span>
                                        </div>
                                    </div>

                                    <table>
                                        <thead>
                                            <tr>
                                                <th>نام وسسس نام خانوادگی</th>
                                                <th>نام مدرسه</th>
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
                                                <th>سرویس‌ها</th>
                                                <th>وضعیت</th>
                                                <th>عملیات</th>
                                            </tr>
                                        </thead>
                                        <tbody>
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
                                                                حسام الدین
                                                                طباطبایی
                                                            </span>
                                                            <span className="span-2">
                                                                09123456789
                                                            </span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="img-div">
                                                        <div>
                                                            <span className="span-1">
                                                                دبیرستان دخترانه
                                                                فرزانگان
                                                            </span>
                                                            <span className="span-2">
                                                                035-6234321
                                                            </span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="img-div">
                                                        <div>
                                                            <span className="span-1">
                                                                5
                                                            </span>
                                                            <span className="span-2">
                                                                کیلومتر
                                                            </span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="img-div">
                                                        <div>
                                                            <span className="span-1">
                                                                5,000,000
                                                            </span>
                                                            <span className="span-2">
                                                                ریال
                                                            </span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="img-div">
                                                        <div>
                                                            <span className="span-1">
                                                                2
                                                            </span>
                                                            <span className="span-2">
                                                                سرویس
                                                            </span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="stts">
                                                        تایید شده
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
                            ) : activeTable == 2 ? (
                                <TableDiv>
                                    <div className="head">
                                        <div className="d-flex align-items-center">
                                            <h6>مالی رانندگان(780)</h6>
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
                                                    width="15"
                                                    height="16"
                                                    viewBox="0 0 15 16"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        opacity="0.3"
                                                        d="M5.24913 12.1576C5.59371 11.8131 5.59371 11.2544 5.24913 10.9098C4.90455 10.5652 4.34588 10.5652 4.0013 10.9098L0.471891 14.4392C0.127311 14.7838 0.127311 15.3425 0.471891 15.687C0.816471 16.0316 1.37514 16.0316 1.71972 15.687L5.24913 12.1576Z"
                                                        fill="#00A3FF"
                                                    />
                                                    <path
                                                        fill-rule="evenodd"
                                                        clip-rule="evenodd"
                                                        d="M14.3311 7.12178C14.3311 10.5329 11.5658 13.2982 8.15459 13.2982C4.74342 13.2982 1.97813 10.5329 1.97813 7.12178C1.97813 3.71061 4.74342 0.945312 8.15459 0.945312C11.5658 0.945312 14.3311 3.71061 14.3311 7.12178ZM3.74286 7.12178C3.74286 9.55833 5.71807 11.5335 8.15462 11.5335C10.5912 11.5335 12.5664 9.55833 12.5664 7.12178C12.5664 4.68523 10.5912 2.71002 8.15462 2.71002C5.71807 2.71002 3.74286 4.68523 3.74286 7.12178Z"
                                                        fill="#00A3FF"
                                                    />
                                                </svg>
                                                جستجو ...
                                            </span>
                                            <span
                                                className={
                                                    activeTab === 3 && "active"
                                                }
                                                onClick={() => {
                                                    setActiveTab(3);
                                                }}
                                            >
                                                همه وضعیت‌ها
                                                <svg
                                                    width="21"
                                                    height="21"
                                                    viewBox="0 0 21 21"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M6.3321 7.86567C6.01167 7.54524 5.49215 7.54524 5.17172 7.86567C4.85129 8.1861 4.85129 8.70562 5.17172 9.02605L10.0948 13.9491C10.4054 14.2598 10.9056 14.2706 11.2294 13.9738L16.1525 9.46096C16.4865 9.15476 16.5091 8.63573 16.2029 8.30168C15.8967 7.96763 15.3777 7.94507 15.0436 8.25128L10.6997 12.2332L6.3321 7.86567Z"
                                                        fill="#3699FF"
                                                    />
                                                </svg>
                                            </span>
                                        </div>
                                    </div>

                                    <table>
                                        <thead>
                                            <tr>
                                                <th>نام راننده</th>
                                                <th>تعداد سرویس</th>
                                                <th>
                                                    جمع کل سرویس‌ها
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
                                                <th>وضعیت</th>
                                                <th>عملیات</th>
                                            </tr>
                                        </thead>
                                        <tbody>
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
                                                                حسام الدین
                                                                طباطبایی
                                                            </span>
                                                            <span className="span-2">
                                                                09123456789
                                                            </span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="img-div">
                                                        <div>
                                                            <span className="span-1">
                                                                2
                                                            </span>
                                                            <span className="span-2">
                                                                سرویس
                                                            </span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="img-div">
                                                        <div>
                                                            <span className="span-1">
                                                                5
                                                            </span>
                                                            <span className="span-2">
                                                                کیلومتر
                                                            </span>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td>
                                                    <div className="stts">
                                                        فعال
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
                            ) : (
                                <TableDiv>
                                    <div className="head">
                                        <div className="d-flex align-items-center">
                                            <h6>مالی مدارس(4)</h6>
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
                                                    width="15"
                                                    height="16"
                                                    viewBox="0 0 15 16"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        opacity="0.3"
                                                        d="M5.24913 12.1576C5.59371 11.8131 5.59371 11.2544 5.24913 10.9098C4.90455 10.5652 4.34588 10.5652 4.0013 10.9098L0.471891 14.4392C0.127311 14.7838 0.127311 15.3425 0.471891 15.687C0.816471 16.0316 1.37514 16.0316 1.71972 15.687L5.24913 12.1576Z"
                                                        fill="#00A3FF"
                                                    />
                                                    <path
                                                        fill-rule="evenodd"
                                                        clip-rule="evenodd"
                                                        d="M14.3311 7.12178C14.3311 10.5329 11.5658 13.2982 8.15459 13.2982C4.74342 13.2982 1.97813 10.5329 1.97813 7.12178C1.97813 3.71061 4.74342 0.945312 8.15459 0.945312C11.5658 0.945312 14.3311 3.71061 14.3311 7.12178ZM3.74286 7.12178C3.74286 9.55833 5.71807 11.5335 8.15462 11.5335C10.5912 11.5335 12.5664 9.55833 12.5664 7.12178C12.5664 4.68523 10.5912 2.71002 8.15462 2.71002C5.71807 2.71002 3.74286 4.68523 3.74286 7.12178Z"
                                                        fill="#00A3FF"
                                                    />
                                                </svg>
                                                جستجو ...
                                            </span>
                                            <span
                                                className={
                                                    activeTab === 3 && "active"
                                                }
                                                onClick={() => {
                                                    setActiveTab(3);
                                                }}
                                            >
                                                همه وضعیت‌ها
                                                <svg
                                                    width="21"
                                                    height="21"
                                                    viewBox="0 0 21 21"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M6.3321 7.86567C6.01167 7.54524 5.49215 7.54524 5.17172 7.86567C4.85129 8.1861 4.85129 8.70562 5.17172 9.02605L10.0948 13.9491C10.4054 14.2598 10.9056 14.2706 11.2294 13.9738L16.1525 9.46096C16.4865 9.15476 16.5091 8.63573 16.2029 8.30168C15.8967 7.96763 15.3777 7.94507 15.0436 8.25128L10.6997 12.2332L6.3321 7.86567Z"
                                                        fill="#3699FF"
                                                    />
                                                </svg>
                                            </span>
                                        </div>
                                    </div>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>نام مدرسه</th>
                                                <th>تلفن تماس</th>
                                                <th>
                                                    تعداد سرویس‌ها
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
                                                <th>وضعیت</th>
                                                <th>عملیات</th>
                                            </tr>
                                        </thead>
                                        <tbody>
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
                                                                دبیرستان دخترانه
                                                                فرزانگان
                                                            </span>
                                                            <span className="span-2">
                                                                دخترانه دوره اول
                                                            </span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="img-div">
                                                        <div>
                                                            <span className="span-1">
                                                                035 - 4355465
                                                            </span>
                                                            <span className="span-2">
                                                                اعظم هشمتی
                                                            </span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="img-div">
                                                        <div>
                                                            <span className="span-1">
                                                                12
                                                            </span>
                                                            <span className="span-2">
                                                                سرویس
                                                            </span>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td>
                                                    <div className="stts">
                                                        فعال
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
                                                        جزئیات
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
