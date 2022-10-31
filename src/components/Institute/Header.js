import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import { BASE_URL } from "../BaseUrl";

const HeaderMain = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 65px;
    width: 100%;
    padding: 0 36px;
    background-color: #fff;
    .exit {
        width: 20px;
        height: 20px;
        fill: #6c7293;
        margin-right: 16px;
        cursor: pointer;
    }
    .time {
        margin-right: 30px;
        span {
            display: block;
            :first-child {
                font-weight: 500;
                font-size: 13px;
                line-height: 20px;
                text-align: right;
                color: #6c7293;
            }
            :last-child {
                font-weight: 500;
                font-size: 13px;
                line-height: 20px;
                text-align: right;
                color: #7e84a1;
            }
        }
    }
    .ltr {
        direction: ltr;
        span {
            display: block;
            :last-child {
                font-weight: 500;
                font-size: 12px;
                color: #6c7293;
            }
        }
        .prof {
            background: #d7f9ef;
            border-radius: 4px;
            width: 36px;
            height: 35px;
            margin-right: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .name {
            font-weight: 500;
            font-size: 13px;
            color: #6c7293;
        }
    }
`;
const Header = () => {
    let token;
    let phone;
    if (typeof window !== "undefined") {
        token = localStorage.getItem("token");
        phone = localStorage.getItem("phone_number");
    }
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

    const [showNotif, setShowNotif] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);
    const [date, setDate] = useState([]);
    useEffect(() => {
        let config = {
            url: `https://api.keybit.ir/time/`,
            method: "GET",
        };
        axios(config)
            .then((res) => {
                setDate(res.data);
            })
            .catch((error) => {});
    }, []);
    return (
        <HeaderMain>
            <div className="d-flex align-items-center">
                <svg
                    width="18"
                    height="19"
                    viewBox="0 0 18 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M16.4922 13.2365C15.3471 12.2473 14.5283 9.61877 14.5283 6.53127C14.5283 4.19426 13.0249 2.21292 10.9332 1.48737C10.7924 0.644219 10.0639 0 9.18024 0C8.29664 0 7.56811 0.644219 7.42726 1.48734C5.33559 2.21289 3.83222 4.19426 3.83222 6.53127C3.83222 9.6182 3.01398 12.2461 1.8683 13.2365C1.22892 13.7893 0.861084 14.592 0.861084 15.4375C0.861084 16.4214 1.65912 17.2188 2.64375 17.2188H7.39755C7.39755 18.2026 8.19559 19 9.18021 19C10.1648 19 10.9629 18.2026 10.9629 17.2188H15.7167C16.7013 17.2188 17.4993 16.4214 17.4993 15.4375C17.4994 14.5926 17.1322 13.7893 16.4922 13.2365ZM2.64375 15.4375C2.64375 15.1098 2.78637 14.7981 3.03415 14.5837C4.62607 13.2086 5.61485 10.1228 5.61485 6.53124C5.61485 4.56653 7.21393 2.96873 9.18021 2.96873C11.1465 2.96873 12.7456 4.56653 12.7456 6.53124C12.7456 10.1228 13.7343 13.2086 15.3263 14.5837C15.5747 14.7986 15.7167 15.1097 15.7167 15.4375H2.64375Z"
                        fill="#6E6C85"
                    />
                </svg>
                {date.length !== 0 && (
                    <div className="time">
                        <span>
                            {date.date.weekday.name} - {date.time24.minute.fa}:{" "}
                            {date.time24.hour.fa}
                        </span>
                        <span>{date.date.full.official.usual.fa} </span>
                    </div>
                )}
            </div>
            <div className="d-flex align-items-center ltr">
                <svg
                    className="exit"
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                >
                    <path
                        id="ic_exit_to_app_24px"
                        d="M10.09,15.59,11.5,17l5-5-5-5L10.09,8.41,12.67,11H3v2h9.67ZM19,3H5A2,2,0,0,0,3,5V9H5V5H19V19H5V15H3v4a2,2,0,0,0,2,2H19a2.006,2.006,0,0,0,2-2V5A2.006,2.006,0,0,0,19,3Z"
                        transform="translate(-3 -3)"
                    />
                </svg>

                <div className="prof">
                    <img
                        src={info !== null && info.logo}
                        width={36}
                        height={36}
                        alt=""
                    />
                </div>
                <div>
                    <span className="name">
                        {info !== undefined && info !== null && info.name}
                    </span>
                    <span>موسسه سرویس مدارس</span>
                </div>
            </div>
        </HeaderMain>
    );
};

export default Header;
