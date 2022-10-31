import styled from "styled-components";
import Header from "../../components/Institute/Header";
import Sidebar from "../../components/Institute/Sidebar";
import Mapir from "mapir-react-component";
import "mapir-react-component/dist/index.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DriverInfo from "../../components/Institute/DriverInfo";
import { BASE_URL } from "../../components/BaseUrl";
import FilterComponent from "../../components/FilterComponent";
import MsgComponent from "../../components/MsgComponent";
import AddDriver from "../../components/Institute/AddDriver";
import { toast, ToastContainer } from "react-toastify";

const Main = styled.div`
    background: #e5e5e5;
    display: flex;
    .table-check {
        margin-left: 20px;
        border: none !important;
        outline: none !important;
        transform: scale(1.3) translateY(3px);
        background: #f3f6f9;
        border-radius: 6px;
    }
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
    .p-btn {
        width: 118px;
        height: 34px;
        background: #8950fc;
        border-radius: 6px;
        font-weight: 400;
        font-size: 12px;
        line-height: 14px;
        color: #ffffff;
    }
    .r-btn {
        margin-right: 12px;
        width: 118px;
        height: 34px;
        background: #f64e60;
        border-radius: 6px;
        font-weight: 400;
        font-size: 12px;
        line-height: 14px;
        color: #ffffff;
    }
    .g-btn {
        margin-right: 12px;
        width: 118px;
        height: 34px;
        background: #1bc5bd;
        border-radius: 6px;
        font-weight: 400;
        font-size: 12px;
        line-height: 14px;
        color: #ffffff;
    }
    .flex-btns {
        display: flex;
        svg {
            cursor: pointer;
        }
        button {
            margin-right: 10px;
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
            .stts-yellow {
                background: #fff4de;
                color: #ffa800;
            }
            .stts-red {
                background: #ffe2e5;
                color: #f64e60;
            }
            .stts-perp {
                background: #eee5ff;
                color: #8950fc;
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

export default function Drivers() {
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
    const [info, setInfo] = useState([]);
    let infoConfig = {
        url: `${BASE_URL}getdetilse-institution/manage{}?phone_number=${phone}`,
        method: "GET",
    };
    useEffect(() => {
        axios(infoConfig)
            .then((res) => {
                setInfo(res.data.InstitutionManageCurrentDetails);
            })
            .catch((error) => {});
    }, []);

    const [driversList, setDriversList] = useState([]);
    useEffect(() => {
        if (info !== null && info.id !== undefined) {
            let config = {
                url: `${BASE_URL}getdetilse-drivers/institution%7B%7D?id_institution=${info.id}`,
                method: "GET",
            };
            axios(config)
                .then((res) => {
                    setDriversList(res.data.ListDriverAtInstitution);
                })
                .catch((error) => {});
        }
    }, [info]);

    const [changeItem, setChangeItem] = useState([]);
    const [driverInfo, setdriverInfo] = useState([]);
    const [services, setServices] = useState([]);
    const [changed, setChanged] = useState(false);
    const getDriverDet = (item) => {
        setChangeItem(item);
        let config = {
            url: `${BASE_URL}get-info-driver-and-other-at/institution{}?id_driver=${item.id_driver}`,
            method: "GET",
        };
        axios(config)
            .then((res) => {
                setdriverInfo(res.data);
                setChanged(!changed);

                let config2 = {
                    url: `${BASE_URL}get-all-service-at/driver%7B%7D?driver_id=${item.id_driver}`,
                    method: "GET",
                };
                axios(config2)
                    .then((res) => {
                        setServices(res.data);
                    })
                    .catch((error) => {});
            })
            .catch((error) => {});
    };

    const newHandler = () => {
        let config = {
            url: `${BASE_URL}get-info-driver-and-other-at/institution{}?id_driver=${changeItem.id_driver}`,
            method: "GET",
        };
        axios(config)
            .then((res) => {
                setdriverInfo(res.data);
                setChanged(!changed);

                let config2 = {
                    url: `${BASE_URL}get-all-service-at/driver%7B%7D?driver_id=${changeItem.id_driver}`,
                    method: "GET",
                };
                axios(config2)
                    .then((res) => {
                        setServices(res.data);
                    })
                    .catch((error) => {});
            })
            .catch((error) => {});
    };

    const [idToReq, setIdToReq] = useState("");

    const [activeTable, setActiveTable] = useState(0);
    const [showFilter, setShowFilter] = useState(false);
    const [showMessageCom, setShowMessageCom] = useState(false);
    const [showNewDriver, setShowNewDriver] = useState(false);
    let activeDriver = 0;
    let pendingDriver = 0;
    let rejectedDriver = 0;
    if (driversList !== undefined) {
        driversList.map((item) => {
            if (item.status_request == "ok") {
                activeDriver++;
            }
        });
        driversList.map((item) => {
            if (item.status_request == "request") {
                pendingDriver++;
            }
        });
        driversList.map((item) => {
            if (item.status_request == "reject") {
                rejectedDriver++;
            }
        });
    }

    console.log(changed);

    return (
        <Main>
            <Sidebar active={2} />
            <div className="w-100">
                <Header />
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
                <Content>
                    {showMessageCom && (
                        <MsgComponent setshow={setShowMessageCom} />
                    )}
                    {showFilter && <FilterComponent setshow={setShowFilter} />}
                    {showNewDriver && <AddDriver setshow={setShowNewDriver} />}
                    {showCom ? (
                        <DriverInfo
                            car={driverInfo.CarDriver}
                            driver={driverInfo.Driver}
                            infoid={info.id}
                            services={services}
                            idtoreq={idToReq}
                            setshow={setShowCom}
                            data={driverInfo}
                            refresh={newHandler}
                        />
                    ) : (
                        <>
                            <div className="cards">
                                {activeTable !== 0 && (
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
                                                همه رانندگان(
                                                {driversList !== undefined &&
                                                    driversList.length}
                                                )
                                            </span>
                                            <span className="span">
                                                تمام رانندگان ثبت شده و در
                                                انتظار تایید
                                            </span>
                                        </div>
                                        <button
                                            onClick={() => {
                                                setActiveTable(0);
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
                                    </Card>
                                )}
                                {activeTable !== 1 && (
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
                                                رانندگان فعال ({activeDriver})
                                            </span>
                                            <span className="span">
                                                رانندگان ثبت و تایید شده توسط
                                                شما
                                            </span>
                                        </div>
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
                                    </Card>
                                )}
                                {activeTable !== 2 && (
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
                                                رانندگان در انتظار تایید (
                                                {pendingDriver})
                                            </span>
                                            <span className="span">
                                                رانندگان در انتظار تایید برای
                                                همکاری با شما
                                            </span>
                                        </div>
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
                                                رانندگان مسدود(
                                                {rejectedDriver})
                                            </span>
                                            <span className="span">
                                                مسدود شده توسط اینوباس یا موسسه
                                            </span>
                                        </div>
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
                                    </Card>
                                )}
                            </div>
                            {activeTable == 0 ? (
                                <TableDiv>
                                    <div className="head">
                                        <h6>
                                            تمام رانندگان(
                                            {driversList !== undefined &&
                                                driversList.length}
                                            )
                                        </h6>
                                        <div className="tabs">
                                            <span
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
                                                onClick={() => {
                                                    setShowFilter(true);
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
                                                    setShowNewDriver(true);
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
                                                        d="M10.0367 4.00065C10.0367 5.61148 8.73087 6.91732 7.12004 6.91732C5.50921 6.91732 4.20337 5.61148 4.20337 4.00065C4.20337 2.38982 5.50921 1.08398 7.12004 1.08398C8.73087 1.08398 10.0367 2.38982 10.0367 4.00065Z"
                                                        fill="#3699FF"
                                                    />
                                                    <path
                                                        opacity="0.25"
                                                        fill-rule="evenodd"
                                                        clip-rule="evenodd"
                                                        d="M11.0973 8.73869C10.7377 8.32179 10.1201 8.34327 9.63717 8.6076C8.88984 9.01665 8.03214 9.2492 7.12012 9.2492C6.2081 9.2492 5.35039 9.01665 4.60306 8.6076C4.12013 8.34327 3.50252 8.32179 3.14295 8.73869C2.34975 9.65835 1.87012 10.8561 1.87012 12.1659V12.7492C1.87012 13.3935 2.39245 13.9159 3.03678 13.9159H11.2035C11.8478 13.9159 12.3701 13.3935 12.3701 12.7492V12.1659C12.3701 10.8561 11.8905 9.65835 11.0973 8.73869Z"
                                                        fill="#3699FF"
                                                    />
                                                </svg>
                                                راننده جدید
                                            </span>
                                        </div>
                                    </div>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>
                                                    <input
                                                        type="checkbox"
                                                        className="table-check"
                                                    />
                                                    نام و نام خانوادگی
                                                </th>
                                                <th>اطلاعات خودرو</th>
                                                <th>
                                                    <div className="d-flex align-items-center">
                                                        تعداد سرویس‌
                                                        <svg
                                                            width="16"
                                                            height="16"
                                                            viewBox="0 0 16 16"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                opacity="0.3"
                                                                d="M7.33325 4.00065C7.33325 3.63246 7.63173 3.33398 7.99992 3.33398C8.36811 3.33398 8.66659 3.63246 8.66659 4.00065V12.0007C8.66659 12.3688 8.36811 12.6673 7.99992 12.6673C7.63173 12.6673 7.33325 12.3688 7.33325 12.0006V4.00065Z"
                                                                fill="#3699FF"
                                                            />
                                                            <path
                                                                d="M4.47132 7.52794C4.21097 7.26759 3.78886 7.26759 3.52851 7.52794C3.26816 7.78829 3.26816 8.2104 3.52851 8.47075L7.52851 12.4708C7.7809 12.7231 8.18729 12.732 8.4504 12.4908L12.4504 8.82412C12.7218 8.57532 12.7401 8.15361 12.4914 7.8822C12.2426 7.61078 11.8208 7.59245 11.5494 7.84124L8.01997 11.0766L4.47132 7.52794Z"
                                                                fill="#3699FF"
                                                            />
                                                        </svg>
                                                    </div>
                                                </th>
                                                <th>وضعیت</th>
                                                <th>امتیاز</th>
                                                <th>عملیات</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {driversList !== undefined &&
                                                driversList.length !== 0 &&
                                                driversList.map((item) => {
                                                    return (
                                                        <tr>
                                                            <td>
                                                                <div className="d-flex align-items-center">
                                                                    <input
                                                                        type="checkbox"
                                                                        className="table-check"
                                                                    />
                                                                    <img
                                                                        src={
                                                                            item.image_driver
                                                                        }
                                                                        width={
                                                                            50
                                                                        }
                                                                        height={
                                                                            50
                                                                        }
                                                                        alt=""
                                                                    />
                                                                    <div>
                                                                        <span className="span-1">
                                                                            {
                                                                                item.name_driver
                                                                            }
                                                                        </span>
                                                                        <span className="span-2">
                                                                            {
                                                                                item.phone_driver
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <span className="span-1">
                                                                    {
                                                                        item.car_name_driver
                                                                    }{" "}
                                                                    {
                                                                        item.car_color_driver
                                                                    }
                                                                </span>
                                                                <span className="span-2">
                                                                    54 ایران 24
                                                                    ص 543
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <span className="span-1">
                                                                    {
                                                                        item.count_service
                                                                    }{" "}
                                                                    سرویس{" "}
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <div
                                                                    className={
                                                                        item.status_request ==
                                                                        "ok"
                                                                            ? "stts"
                                                                            : item.status_request ==
                                                                              "reject"
                                                                            ? "stts stts-red"
                                                                            : "stts stts-yellow"
                                                                    }
                                                                >
                                                                    {item.status_request ==
                                                                    "ok"
                                                                        ? "تایید شده"
                                                                        : item.status_request ==
                                                                          "reject"
                                                                        ? "رد شده"
                                                                        : item.status_request ==
                                                                          "breach"
                                                                        ? "نقص اطلاعات"
                                                                        : "در انتظار تایید"}
                                                                </div>
                                                            </td>
                                                            <td>
                                                                {
                                                                    item.score_driver
                                                                }
                                                                <svg
                                                                    width="21"
                                                                    height="20"
                                                                    viewBox="0 0 21 20"
                                                                    fill="none"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                >
                                                                    <path
                                                                        opacity="0.3"
                                                                        fill-rule="evenodd"
                                                                        clip-rule="evenodd"
                                                                        d="M10.2646 14.9994L13.6682 16.7888C13.8304 16.8741 14.0163 16.9035 14.1969 16.8725C14.6505 16.7947 14.9552 16.3639 14.8774 15.9103L14.2273 12.1203L16.9809 9.43618C17.1122 9.30826 17.1976 9.14064 17.2239 8.95928C17.2901 8.50382 16.9745 8.08095 16.5191 8.01477L12.7137 7.46182L11.0119 4.01354C10.9308 3.8492 10.7977 3.71618 10.6334 3.63507C10.5146 3.57646 10.3887 3.54874 10.2646 3.54883V14.9994Z"
                                                                        fill="#FFA800"
                                                                    />
                                                                    <path
                                                                        fill-rule="evenodd"
                                                                        clip-rule="evenodd"
                                                                        d="M10.2647 3.54883C9.95766 3.54905 9.66243 3.71959 9.51735 4.01354L7.81553 7.46182L4.01013 8.01477C3.82877 8.04113 3.66115 8.12653 3.53323 8.25777C3.21197 8.58734 3.21872 9.11493 3.54829 9.43619L6.3019 12.1203L5.65186 15.9103C5.62088 16.0909 5.65031 16.2768 5.73559 16.439C5.94976 16.8463 6.45361 17.003 6.86098 16.7888L10.2646 14.9994L10.2647 14.9994V3.54883Z"
                                                                        fill="#FFA800"
                                                                    />
                                                                </svg>
                                                            </td>
                                                            <td>
                                                                <div className="flex-btns">
                                                                    <svg
                                                                        onClick={() => {
                                                                            setShowMessageCom(
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
                                                                            x="0.203125"
                                                                            width="32"
                                                                            height="32"
                                                                            rx="6"
                                                                            fill="#F3F6F9"
                                                                        />
                                                                        <path
                                                                            fill-rule="evenodd"
                                                                            clip-rule="evenodd"
                                                                            d="M22.9206 20.1895C23.2396 20.4929 23.7668 20.2656 23.7651 19.8253L23.7548 17.0669V12.0143C23.7548 11.0841 22.9618 10.3301 21.9835 10.3301H13.7178C12.7395 10.3301 11.9465 11.0841 11.9465 12.0143V14.3301H15.8442C17.5011 14.3301 18.8442 15.6732 18.8442 17.3301V18.7511H21.4078L22.9206 20.1895Z"
                                                                            fill="#3699FF"
                                                                        />
                                                                        <path
                                                                            opacity="0.3"
                                                                            fill-rule="evenodd"
                                                                            clip-rule="evenodd"
                                                                            d="M9.01831 20.3307V16.9974C9.01831 16.261 9.64611 15.6641 10.4205 15.6641H16.0295C16.8039 15.6641 17.4317 16.261 17.4317 16.9974V20.3307C17.4317 21.0671 16.8039 21.6641 16.0295 21.6641H10.5017L9.87319 22.2361C9.55207 22.5283 9.03665 22.3005 9.03665 21.8663V20.5469C9.02458 20.4765 9.01831 20.4043 9.01831 20.3307ZM11.8332 17.9974C11.8332 17.8133 11.9825 17.6641 12.1666 17.6641H15.7066C15.8907 17.6641 16.0399 17.8133 16.0399 17.9974C16.0399 18.1815 15.8907 18.3307 15.7066 18.3307H12.1666C11.9825 18.3307 11.8332 18.1815 11.8332 17.9974ZM14.2699 18.9974C14.0858 18.9974 13.9366 19.1466 13.9366 19.3307C13.9366 19.5148 14.0858 19.6641 14.2699 19.6641H15.7066C15.8907 19.6641 16.0399 19.5148 16.0399 19.3307C16.0399 19.1466 15.8907 18.9974 15.7066 18.9974H14.2699Z"
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
                                                                                item.id_request
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
                            ) : activeTable == 1 ? (
                                <TableDiv>
                                    <div className="head">
                                        <h6>رانندگان فعال({activeDriver})</h6>
                                        <div className="tabs">
                                            <span
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
                                                    setShowNewDriver(true);
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
                                                        d="M10.0367 4.00065C10.0367 5.61148 8.73087 6.91732 7.12004 6.91732C5.50921 6.91732 4.20337 5.61148 4.20337 4.00065C4.20337 2.38982 5.50921 1.08398 7.12004 1.08398C8.73087 1.08398 10.0367 2.38982 10.0367 4.00065Z"
                                                        fill="#3699FF"
                                                    />
                                                    <path
                                                        opacity="0.25"
                                                        fill-rule="evenodd"
                                                        clip-rule="evenodd"
                                                        d="M11.0973 8.73869C10.7377 8.32179 10.1201 8.34327 9.63717 8.6076C8.88984 9.01665 8.03214 9.2492 7.12012 9.2492C6.2081 9.2492 5.35039 9.01665 4.60306 8.6076C4.12013 8.34327 3.50252 8.32179 3.14295 8.73869C2.34975 9.65835 1.87012 10.8561 1.87012 12.1659V12.7492C1.87012 13.3935 2.39245 13.9159 3.03678 13.9159H11.2035C11.8478 13.9159 12.3701 13.3935 12.3701 12.7492V12.1659C12.3701 10.8561 11.8905 9.65835 11.0973 8.73869Z"
                                                        fill="#3699FF"
                                                    />
                                                </svg>
                                                راننده جدید
                                            </span>
                                        </div>
                                    </div>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>
                                                    <input
                                                        type="checkbox"
                                                        className="table-check"
                                                    />
                                                    نام و نام خانوادگی
                                                </th>
                                                <th>اطلاعات خودرو</th>
                                                <th>
                                                    <div className="d-flex align-items-center">
                                                        تعداد سرویس‌
                                                        <svg
                                                            width="16"
                                                            height="16"
                                                            viewBox="0 0 16 16"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                opacity="0.3"
                                                                d="M7.33325 4.00065C7.33325 3.63246 7.63173 3.33398 7.99992 3.33398C8.36811 3.33398 8.66659 3.63246 8.66659 4.00065V12.0007C8.66659 12.3688 8.36811 12.6673 7.99992 12.6673C7.63173 12.6673 7.33325 12.3688 7.33325 12.0006V4.00065Z"
                                                                fill="#3699FF"
                                                            />
                                                            <path
                                                                d="M4.47132 7.52794C4.21097 7.26759 3.78886 7.26759 3.52851 7.52794C3.26816 7.78829 3.26816 8.2104 3.52851 8.47075L7.52851 12.4708C7.7809 12.7231 8.18729 12.732 8.4504 12.4908L12.4504 8.82412C12.7218 8.57532 12.7401 8.15361 12.4914 7.8822C12.2426 7.61078 11.8208 7.59245 11.5494 7.84124L8.01997 11.0766L4.47132 7.52794Z"
                                                                fill="#3699FF"
                                                            />
                                                        </svg>
                                                    </div>
                                                </th>
                                                <th>وضعیت</th>
                                                <th>امتیاز</th>
                                                <th>عملیات</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {driversList !== undefined &&
                                                driversList.length !== 0 &&
                                                driversList.map((item) => {
                                                    if (
                                                        item.status_request ==
                                                        "ok"
                                                    ) {
                                                        return (
                                                            <tr>
                                                                <td>
                                                                    <div className="d-flex align-items-center">
                                                                        <input
                                                                            type="checkbox"
                                                                            className="table-check"
                                                                        />
                                                                        <img
                                                                            src={
                                                                                item.image_driver
                                                                            }
                                                                            width={
                                                                                50
                                                                            }
                                                                            height={
                                                                                50
                                                                            }
                                                                            alt=""
                                                                        />
                                                                        <div>
                                                                            <span className="span-1">
                                                                                {
                                                                                    item.name_driver
                                                                                }
                                                                            </span>
                                                                            <span className="span-2">
                                                                                {
                                                                                    item.phone_driver
                                                                                }
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <span className="span-1">
                                                                        {
                                                                            item.car_name_driver
                                                                        }{" "}
                                                                        {
                                                                            item.car_color_driver
                                                                        }
                                                                    </span>
                                                                    <span className="span-2">
                                                                        54 ایران
                                                                        24 ص 543
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <span className="span-1">
                                                                        {
                                                                            item.count_service
                                                                        }{" "}
                                                                        سرویس{" "}
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <div
                                                                        className={
                                                                            item.status_request ==
                                                                            "ok"
                                                                                ? "stts"
                                                                                : item.status_request ==
                                                                                  "reject"
                                                                                ? "stts stts-red"
                                                                                : "stts stts-yellow"
                                                                        }
                                                                    >
                                                                        {item.status_request ==
                                                                        "ok"
                                                                            ? "تایید شده"
                                                                            : item.status_request ==
                                                                              "reject"
                                                                            ? "رد شده"
                                                                            : item.status_request ==
                                                                              "breach"
                                                                            ? "نقص اطلاعات"
                                                                            : "در انتظار تایید"}
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    {
                                                                        item.score_driver
                                                                    }
                                                                    <svg
                                                                        width="21"
                                                                        height="20"
                                                                        viewBox="0 0 21 20"
                                                                        fill="none"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                    >
                                                                        <path
                                                                            opacity="0.3"
                                                                            fill-rule="evenodd"
                                                                            clip-rule="evenodd"
                                                                            d="M10.2646 14.9994L13.6682 16.7888C13.8304 16.8741 14.0163 16.9035 14.1969 16.8725C14.6505 16.7947 14.9552 16.3639 14.8774 15.9103L14.2273 12.1203L16.9809 9.43618C17.1122 9.30826 17.1976 9.14064 17.2239 8.95928C17.2901 8.50382 16.9745 8.08095 16.5191 8.01477L12.7137 7.46182L11.0119 4.01354C10.9308 3.8492 10.7977 3.71618 10.6334 3.63507C10.5146 3.57646 10.3887 3.54874 10.2646 3.54883V14.9994Z"
                                                                            fill="#FFA800"
                                                                        />
                                                                        <path
                                                                            fill-rule="evenodd"
                                                                            clip-rule="evenodd"
                                                                            d="M10.2647 3.54883C9.95766 3.54905 9.66243 3.71959 9.51735 4.01354L7.81553 7.46182L4.01013 8.01477C3.82877 8.04113 3.66115 8.12653 3.53323 8.25777C3.21197 8.58734 3.21872 9.11493 3.54829 9.43619L6.3019 12.1203L5.65186 15.9103C5.62088 16.0909 5.65031 16.2768 5.73559 16.439C5.94976 16.8463 6.45361 17.003 6.86098 16.7888L10.2646 14.9994L10.2647 14.9994V3.54883Z"
                                                                            fill="#FFA800"
                                                                        />
                                                                    </svg>
                                                                </td>
                                                                <td>
                                                                    <div className="flex-btns">
                                                                        <svg
                                                                            onClick={() => {
                                                                                setShowMessageCom(
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
                                                                                x="0.203125"
                                                                                width="32"
                                                                                height="32"
                                                                                rx="6"
                                                                                fill="#F3F6F9"
                                                                            />
                                                                            <path
                                                                                fill-rule="evenodd"
                                                                                clip-rule="evenodd"
                                                                                d="M22.9206 20.1895C23.2396 20.4929 23.7668 20.2656 23.7651 19.8253L23.7548 17.0669V12.0143C23.7548 11.0841 22.9618 10.3301 21.9835 10.3301H13.7178C12.7395 10.3301 11.9465 11.0841 11.9465 12.0143V14.3301H15.8442C17.5011 14.3301 18.8442 15.6732 18.8442 17.3301V18.7511H21.4078L22.9206 20.1895Z"
                                                                                fill="#3699FF"
                                                                            />
                                                                            <path
                                                                                opacity="0.3"
                                                                                fill-rule="evenodd"
                                                                                clip-rule="evenodd"
                                                                                d="M9.01831 20.3307V16.9974C9.01831 16.261 9.64611 15.6641 10.4205 15.6641H16.0295C16.8039 15.6641 17.4317 16.261 17.4317 16.9974V20.3307C17.4317 21.0671 16.8039 21.6641 16.0295 21.6641H10.5017L9.87319 22.2361C9.55207 22.5283 9.03665 22.3005 9.03665 21.8663V20.5469C9.02458 20.4765 9.01831 20.4043 9.01831 20.3307ZM11.8332 17.9974C11.8332 17.8133 11.9825 17.6641 12.1666 17.6641H15.7066C15.8907 17.6641 16.0399 17.8133 16.0399 17.9974C16.0399 18.1815 15.8907 18.3307 15.7066 18.3307H12.1666C11.9825 18.3307 11.8332 18.1815 11.8332 17.9974ZM14.2699 18.9974C14.0858 18.9974 13.9366 19.1466 13.9366 19.3307C13.9366 19.5148 14.0858 19.6641 14.2699 19.6641H15.7066C15.8907 19.6641 16.0399 19.5148 16.0399 19.3307C16.0399 19.1466 15.8907 18.9974 15.7066 18.9974H14.2699Z"
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
                                                                                    item.id_request
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
                                                    }
                                                })}
                                        </tbody>
                                    </table>
                                </TableDiv>
                            ) : activeTable == 2 ? (
                                <TableDiv>
                                    <div className="head">
                                        <h6>
                                            رانندگان در انتظار تایید(
                                            {pendingDriver})
                                        </h6>
                                        <div className="tabs">
                                            <span
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
                                            <button className="p-btn">
                                                <svg
                                                    width="15"
                                                    height="14"
                                                    viewBox="0 0 15 14"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M10.4539 3.50065C10.4539 5.11148 9.1481 6.41732 7.53727 6.41732C5.92644 6.41732 4.62061 5.11148 4.62061 3.50065C4.62061 1.88982 5.92644 0.583984 7.53727 0.583984C9.1481 0.583984 10.4539 1.88982 10.4539 3.50065Z"
                                                        fill="white"
                                                    />
                                                    <path
                                                        opacity="0.25"
                                                        fill-rule="evenodd"
                                                        clip-rule="evenodd"
                                                        d="M11.5143 8.23869C11.1547 7.82179 10.5371 7.84327 10.0542 8.1076C9.30684 8.51665 8.44913 8.7492 7.53711 8.7492C6.62509 8.7492 5.76738 8.51665 5.02006 8.1076C4.53712 7.84327 3.91952 7.82179 3.55994 8.23869C2.76674 9.15835 2.28711 10.3561 2.28711 11.6659V12.2492C2.28711 12.8935 2.80944 13.4159 3.45378 13.4159H11.6204C12.2648 13.4159 12.7871 12.8935 12.7871 12.2492V11.6659C12.7871 10.3561 12.3075 9.15835 11.5143 8.23869Z"
                                                        fill="white"
                                                    />
                                                </svg>
                                                نقص اطلاعات
                                            </button>
                                            <button className="r-btn">
                                                <svg
                                                    width="15"
                                                    height="14"
                                                    viewBox="0 0 15 14"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M10.4539 3.50065C10.4539 5.11148 9.1481 6.41732 7.53727 6.41732C5.92644 6.41732 4.62061 5.11148 4.62061 3.50065C4.62061 1.88982 5.92644 0.583984 7.53727 0.583984C9.1481 0.583984 10.4539 1.88982 10.4539 3.50065Z"
                                                        fill="white"
                                                    />
                                                    <path
                                                        opacity="0.25"
                                                        fill-rule="evenodd"
                                                        clip-rule="evenodd"
                                                        d="M11.5143 8.23869C11.1547 7.82179 10.5371 7.84327 10.0542 8.1076C9.30684 8.51665 8.44913 8.7492 7.53711 8.7492C6.62509 8.7492 5.76738 8.51665 5.02006 8.1076C4.53712 7.84327 3.91952 7.82179 3.55994 8.23869C2.76674 9.15835 2.28711 10.3561 2.28711 11.6659V12.2492C2.28711 12.8935 2.80944 13.4159 3.45378 13.4159H11.6204C12.2648 13.4159 12.7871 12.8935 12.7871 12.2492V11.6659C12.7871 10.3561 12.3075 9.15835 11.5143 8.23869Z"
                                                        fill="white"
                                                    />
                                                </svg>
                                                رد درخواست
                                            </button>
                                            <button className="g-btn">
                                                {" "}
                                                <svg
                                                    width="15"
                                                    height="14"
                                                    viewBox="0 0 15 14"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M10.4539 3.50065C10.4539 5.11148 9.1481 6.41732 7.53727 6.41732C5.92644 6.41732 4.62061 5.11148 4.62061 3.50065C4.62061 1.88982 5.92644 0.583984 7.53727 0.583984C9.1481 0.583984 10.4539 1.88982 10.4539 3.50065Z"
                                                        fill="white"
                                                    />
                                                    <path
                                                        opacity="0.25"
                                                        fill-rule="evenodd"
                                                        clip-rule="evenodd"
                                                        d="M11.5143 8.23869C11.1547 7.82179 10.5371 7.84327 10.0542 8.1076C9.30684 8.51665 8.44913 8.7492 7.53711 8.7492C6.62509 8.7492 5.76738 8.51665 5.02006 8.1076C4.53712 7.84327 3.91952 7.82179 3.55994 8.23869C2.76674 9.15835 2.28711 10.3561 2.28711 11.6659V12.2492C2.28711 12.8935 2.80944 13.4159 3.45378 13.4159H11.6204C12.2648 13.4159 12.7871 12.8935 12.7871 12.2492V11.6659C12.7871 10.3561 12.3075 9.15835 11.5143 8.23869Z"
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
                                                <th>
                                                    <input
                                                        type="checkbox"
                                                        className="table-check"
                                                    />
                                                    نام و نام خانوادگی
                                                </th>
                                                <th>اطلاعات خودرو</th>
                                                <th>
                                                    <div className="d-flex align-items-center">
                                                        تعداد سرویس‌
                                                        <svg
                                                            width="16"
                                                            height="16"
                                                            viewBox="0 0 16 16"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                opacity="0.3"
                                                                d="M7.33325 4.00065C7.33325 3.63246 7.63173 3.33398 7.99992 3.33398C8.36811 3.33398 8.66659 3.63246 8.66659 4.00065V12.0007C8.66659 12.3688 8.36811 12.6673 7.99992 12.6673C7.63173 12.6673 7.33325 12.3688 7.33325 12.0006V4.00065Z"
                                                                fill="#3699FF"
                                                            />
                                                            <path
                                                                d="M4.47132 7.52794C4.21097 7.26759 3.78886 7.26759 3.52851 7.52794C3.26816 7.78829 3.26816 8.2104 3.52851 8.47075L7.52851 12.4708C7.7809 12.7231 8.18729 12.732 8.4504 12.4908L12.4504 8.82412C12.7218 8.57532 12.7401 8.15361 12.4914 7.8822C12.2426 7.61078 11.8208 7.59245 11.5494 7.84124L8.01997 11.0766L4.47132 7.52794Z"
                                                                fill="#3699FF"
                                                            />
                                                        </svg>
                                                    </div>
                                                </th>
                                                <th>وضعیت</th>
                                                <th>امتیاز</th>
                                                <th>عملیات</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {driversList !== undefined &&
                                                driversList.length !== 0 &&
                                                driversList.map((item) => {
                                                    if (
                                                        item.status_request ==
                                                        "request"
                                                    ) {
                                                        return (
                                                            <tr>
                                                                <td>
                                                                    <div className="d-flex align-items-center">
                                                                        <input
                                                                            type="checkbox"
                                                                            className="table-check"
                                                                        />
                                                                        <img
                                                                            src={
                                                                                item.image_driver
                                                                            }
                                                                            width={
                                                                                50
                                                                            }
                                                                            height={
                                                                                50
                                                                            }
                                                                            alt=""
                                                                        />
                                                                        <div>
                                                                            <span className="span-1">
                                                                                {
                                                                                    item.name_driver
                                                                                }
                                                                            </span>
                                                                            <span className="span-2">
                                                                                {
                                                                                    item.phone_driver
                                                                                }
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <span className="span-1">
                                                                        {
                                                                            item.car_name_driver
                                                                        }{" "}
                                                                        {
                                                                            item.car_color_driver
                                                                        }
                                                                    </span>
                                                                    <span className="span-2">
                                                                        54 ایران
                                                                        24 ص 543
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <span className="span-1">
                                                                        {
                                                                            item.count_service
                                                                        }{" "}
                                                                        سرویس{" "}
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <div
                                                                        className={
                                                                            item.status_request ==
                                                                            "ok"
                                                                                ? "stts"
                                                                                : item.status_request ==
                                                                                  "reject"
                                                                                ? "stts stts-red"
                                                                                : "stts stts-yellow"
                                                                        }
                                                                    >
                                                                        {item.status_request ==
                                                                        "ok"
                                                                            ? "تایید شده"
                                                                            : item.status_request ==
                                                                              "reject"
                                                                            ? "رد شده"
                                                                            : item.status_request ==
                                                                              "breach"
                                                                            ? "نقص اطلاعات"
                                                                            : "در انتظار تایید"}
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    {
                                                                        item.score_driver
                                                                    }
                                                                    <svg
                                                                        width="21"
                                                                        height="20"
                                                                        viewBox="0 0 21 20"
                                                                        fill="none"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                    >
                                                                        <path
                                                                            opacity="0.3"
                                                                            fill-rule="evenodd"
                                                                            clip-rule="evenodd"
                                                                            d="M10.2646 14.9994L13.6682 16.7888C13.8304 16.8741 14.0163 16.9035 14.1969 16.8725C14.6505 16.7947 14.9552 16.3639 14.8774 15.9103L14.2273 12.1203L16.9809 9.43618C17.1122 9.30826 17.1976 9.14064 17.2239 8.95928C17.2901 8.50382 16.9745 8.08095 16.5191 8.01477L12.7137 7.46182L11.0119 4.01354C10.9308 3.8492 10.7977 3.71618 10.6334 3.63507C10.5146 3.57646 10.3887 3.54874 10.2646 3.54883V14.9994Z"
                                                                            fill="#FFA800"
                                                                        />
                                                                        <path
                                                                            fill-rule="evenodd"
                                                                            clip-rule="evenodd"
                                                                            d="M10.2647 3.54883C9.95766 3.54905 9.66243 3.71959 9.51735 4.01354L7.81553 7.46182L4.01013 8.01477C3.82877 8.04113 3.66115 8.12653 3.53323 8.25777C3.21197 8.58734 3.21872 9.11493 3.54829 9.43619L6.3019 12.1203L5.65186 15.9103C5.62088 16.0909 5.65031 16.2768 5.73559 16.439C5.94976 16.8463 6.45361 17.003 6.86098 16.7888L10.2646 14.9994L10.2647 14.9994V3.54883Z"
                                                                            fill="#FFA800"
                                                                        />
                                                                    </svg>
                                                                </td>
                                                                <td>
                                                                    <div className="flex-btns">
                                                                        <svg
                                                                            onClick={() => {
                                                                                setShowMessageCom(
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
                                                                                x="0.203125"
                                                                                width="32"
                                                                                height="32"
                                                                                rx="6"
                                                                                fill="#F3F6F9"
                                                                            />
                                                                            <path
                                                                                fill-rule="evenodd"
                                                                                clip-rule="evenodd"
                                                                                d="M22.9206 20.1895C23.2396 20.4929 23.7668 20.2656 23.7651 19.8253L23.7548 17.0669V12.0143C23.7548 11.0841 22.9618 10.3301 21.9835 10.3301H13.7178C12.7395 10.3301 11.9465 11.0841 11.9465 12.0143V14.3301H15.8442C17.5011 14.3301 18.8442 15.6732 18.8442 17.3301V18.7511H21.4078L22.9206 20.1895Z"
                                                                                fill="#3699FF"
                                                                            />
                                                                            <path
                                                                                opacity="0.3"
                                                                                fill-rule="evenodd"
                                                                                clip-rule="evenodd"
                                                                                d="M9.01831 20.3307V16.9974C9.01831 16.261 9.64611 15.6641 10.4205 15.6641H16.0295C16.8039 15.6641 17.4317 16.261 17.4317 16.9974V20.3307C17.4317 21.0671 16.8039 21.6641 16.0295 21.6641H10.5017L9.87319 22.2361C9.55207 22.5283 9.03665 22.3005 9.03665 21.8663V20.5469C9.02458 20.4765 9.01831 20.4043 9.01831 20.3307ZM11.8332 17.9974C11.8332 17.8133 11.9825 17.6641 12.1666 17.6641H15.7066C15.8907 17.6641 16.0399 17.8133 16.0399 17.9974C16.0399 18.1815 15.8907 18.3307 15.7066 18.3307H12.1666C11.9825 18.3307 11.8332 18.1815 11.8332 17.9974ZM14.2699 18.9974C14.0858 18.9974 13.9366 19.1466 13.9366 19.3307C13.9366 19.5148 14.0858 19.6641 14.2699 19.6641H15.7066C15.8907 19.6641 16.0399 19.5148 16.0399 19.3307C16.0399 19.1466 15.8907 18.9974 15.7066 18.9974H14.2699Z"
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
                                                                                    item.id_request
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
                                                    }
                                                })}
                                        </tbody>
                                    </table>
                                </TableDiv>
                            ) : (
                                <TableDiv>
                                    <div className="head">
                                        <h6>
                                            رانندگان مسدود({rejectedDriver})
                                        </h6>
                                        <div className="tabs">
                                            <span
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
                                                    setShowNewDriver(true);
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
                                                        d="M10.0367 4.00065C10.0367 5.61148 8.73087 6.91732 7.12004 6.91732C5.50921 6.91732 4.20337 5.61148 4.20337 4.00065C4.20337 2.38982 5.50921 1.08398 7.12004 1.08398C8.73087 1.08398 10.0367 2.38982 10.0367 4.00065Z"
                                                        fill="#3699FF"
                                                    />
                                                    <path
                                                        opacity="0.25"
                                                        fill-rule="evenodd"
                                                        clip-rule="evenodd"
                                                        d="M11.0973 8.73869C10.7377 8.32179 10.1201 8.34327 9.63717 8.6076C8.88984 9.01665 8.03214 9.2492 7.12012 9.2492C6.2081 9.2492 5.35039 9.01665 4.60306 8.6076C4.12013 8.34327 3.50252 8.32179 3.14295 8.73869C2.34975 9.65835 1.87012 10.8561 1.87012 12.1659V12.7492C1.87012 13.3935 2.39245 13.9159 3.03678 13.9159H11.2035C11.8478 13.9159 12.3701 13.3935 12.3701 12.7492V12.1659C12.3701 10.8561 11.8905 9.65835 11.0973 8.73869Z"
                                                        fill="#3699FF"
                                                    />
                                                </svg>
                                                راننده جدید
                                            </span>
                                        </div>
                                    </div>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>
                                                    <input
                                                        type="checkbox"
                                                        className="table-check"
                                                    />
                                                    نام و نام خانوادگی
                                                </th>
                                                <th>اطلاعات خودرو</th>
                                                <th>
                                                    <div className="d-flex align-items-center">
                                                        تعداد سرویس‌
                                                        <svg
                                                            width="16"
                                                            height="16"
                                                            viewBox="0 0 16 16"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                opacity="0.3"
                                                                d="M7.33325 4.00065C7.33325 3.63246 7.63173 3.33398 7.99992 3.33398C8.36811 3.33398 8.66659 3.63246 8.66659 4.00065V12.0007C8.66659 12.3688 8.36811 12.6673 7.99992 12.6673C7.63173 12.6673 7.33325 12.3688 7.33325 12.0006V4.00065Z"
                                                                fill="#3699FF"
                                                            />
                                                            <path
                                                                d="M4.47132 7.52794C4.21097 7.26759 3.78886 7.26759 3.52851 7.52794C3.26816 7.78829 3.26816 8.2104 3.52851 8.47075L7.52851 12.4708C7.7809 12.7231 8.18729 12.732 8.4504 12.4908L12.4504 8.82412C12.7218 8.57532 12.7401 8.15361 12.4914 7.8822C12.2426 7.61078 11.8208 7.59245 11.5494 7.84124L8.01997 11.0766L4.47132 7.52794Z"
                                                                fill="#3699FF"
                                                            />
                                                        </svg>
                                                    </div>
                                                </th>
                                                <th>وضعیت</th>
                                                <th>امتیاز</th>
                                                <th>عملیات</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {driversList !== undefined &&
                                                driversList.length !== 0 &&
                                                driversList.map((item) => {
                                                    if (
                                                        item.status_request ==
                                                        "reject"
                                                    ) {
                                                        return (
                                                            <tr>
                                                                <td>
                                                                    <div className="d-flex align-items-center">
                                                                        <input
                                                                            type="checkbox"
                                                                            className="table-check"
                                                                        />
                                                                        <img
                                                                            src={
                                                                                item.image_driver
                                                                            }
                                                                            width={
                                                                                50
                                                                            }
                                                                            height={
                                                                                50
                                                                            }
                                                                            alt=""
                                                                        />
                                                                        <div>
                                                                            <span className="span-1">
                                                                                {
                                                                                    item.name_driver
                                                                                }
                                                                            </span>
                                                                            <span className="span-2">
                                                                                {
                                                                                    item.phone_driver
                                                                                }
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <span className="span-1">
                                                                        {
                                                                            item.car_name_driver
                                                                        }{" "}
                                                                        {
                                                                            item.car_color_driver
                                                                        }
                                                                    </span>
                                                                    <span className="span-2">
                                                                        54 ایران
                                                                        24 ص 543
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <span className="span-1">
                                                                        {
                                                                            item.count_service
                                                                        }{" "}
                                                                        سرویس{" "}
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <div
                                                                        className={
                                                                            item.status_request ==
                                                                            "ok"
                                                                                ? "stts"
                                                                                : item.status_request ==
                                                                                  "reject"
                                                                                ? "stts stts-red"
                                                                                : "stts stts-yellow"
                                                                        }
                                                                    >
                                                                        {item.status_request ==
                                                                        "ok"
                                                                            ? "تایید شده"
                                                                            : item.status_request ==
                                                                              "reject"
                                                                            ? "رد شده"
                                                                            : item.status_request ==
                                                                              "breach"
                                                                            ? "نقص اطلاعات"
                                                                            : "در انتظار تایید"}
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    {
                                                                        item.score_driver
                                                                    }
                                                                    <svg
                                                                        width="21"
                                                                        height="20"
                                                                        viewBox="0 0 21 20"
                                                                        fill="none"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                    >
                                                                        <path
                                                                            opacity="0.3"
                                                                            fill-rule="evenodd"
                                                                            clip-rule="evenodd"
                                                                            d="M10.2646 14.9994L13.6682 16.7888C13.8304 16.8741 14.0163 16.9035 14.1969 16.8725C14.6505 16.7947 14.9552 16.3639 14.8774 15.9103L14.2273 12.1203L16.9809 9.43618C17.1122 9.30826 17.1976 9.14064 17.2239 8.95928C17.2901 8.50382 16.9745 8.08095 16.5191 8.01477L12.7137 7.46182L11.0119 4.01354C10.9308 3.8492 10.7977 3.71618 10.6334 3.63507C10.5146 3.57646 10.3887 3.54874 10.2646 3.54883V14.9994Z"
                                                                            fill="#FFA800"
                                                                        />
                                                                        <path
                                                                            fill-rule="evenodd"
                                                                            clip-rule="evenodd"
                                                                            d="M10.2647 3.54883C9.95766 3.54905 9.66243 3.71959 9.51735 4.01354L7.81553 7.46182L4.01013 8.01477C3.82877 8.04113 3.66115 8.12653 3.53323 8.25777C3.21197 8.58734 3.21872 9.11493 3.54829 9.43619L6.3019 12.1203L5.65186 15.9103C5.62088 16.0909 5.65031 16.2768 5.73559 16.439C5.94976 16.8463 6.45361 17.003 6.86098 16.7888L10.2646 14.9994L10.2647 14.9994V3.54883Z"
                                                                            fill="#FFA800"
                                                                        />
                                                                    </svg>
                                                                </td>
                                                                <td>
                                                                    <div className="flex-btns">
                                                                        <svg
                                                                            onClick={() => {
                                                                                setShowMessageCom(
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
                                                                                x="0.203125"
                                                                                width="32"
                                                                                height="32"
                                                                                rx="6"
                                                                                fill="#F3F6F9"
                                                                            />
                                                                            <path
                                                                                fill-rule="evenodd"
                                                                                clip-rule="evenodd"
                                                                                d="M22.9206 20.1895C23.2396 20.4929 23.7668 20.2656 23.7651 19.8253L23.7548 17.0669V12.0143C23.7548 11.0841 22.9618 10.3301 21.9835 10.3301H13.7178C12.7395 10.3301 11.9465 11.0841 11.9465 12.0143V14.3301H15.8442C17.5011 14.3301 18.8442 15.6732 18.8442 17.3301V18.7511H21.4078L22.9206 20.1895Z"
                                                                                fill="#3699FF"
                                                                            />
                                                                            <path
                                                                                opacity="0.3"
                                                                                fill-rule="evenodd"
                                                                                clip-rule="evenodd"
                                                                                d="M9.01831 20.3307V16.9974C9.01831 16.261 9.64611 15.6641 10.4205 15.6641H16.0295C16.8039 15.6641 17.4317 16.261 17.4317 16.9974V20.3307C17.4317 21.0671 16.8039 21.6641 16.0295 21.6641H10.5017L9.87319 22.2361C9.55207 22.5283 9.03665 22.3005 9.03665 21.8663V20.5469C9.02458 20.4765 9.01831 20.4043 9.01831 20.3307ZM11.8332 17.9974C11.8332 17.8133 11.9825 17.6641 12.1666 17.6641H15.7066C15.8907 17.6641 16.0399 17.8133 16.0399 17.9974C16.0399 18.1815 15.8907 18.3307 15.7066 18.3307H12.1666C11.9825 18.3307 11.8332 18.1815 11.8332 17.9974ZM14.2699 18.9974C14.0858 18.9974 13.9366 19.1466 13.9366 19.3307C13.9366 19.5148 14.0858 19.6641 14.2699 19.6641H15.7066C15.8907 19.6641 16.0399 19.5148 16.0399 19.3307C16.0399 19.1466 15.8907 18.9974 15.7066 18.9974H14.2699Z"
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
                                                                                    item.id_request
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
                                                    }
                                                })}
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
