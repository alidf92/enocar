import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Mapir from "mapir-react-component";
import "mapir-react-component/dist/index.css";
import axios from "axios";
import { BASE_URL } from "../../components/BaseUrl";

const Main = styled.div`
    min-height: 100vh;
    width: 100%;
    display: flex;
    .back {
        color: #3e54ff;
        margin-top: 40px;
        cursor: pointer;
    }
    .success {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        h6 {
            margin-top: 30px;
            margin-bottom: 20px;
        }
    }
    .mapboxgl-map {
        border-radius: 12px;
        margin-top: 24px;
        max-height: calc(320px);
        height: 320px;
        width: 100%;
        max-width: 600px;
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
const RightDiv = styled.div`
    background: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 72px 88px;
    .samaneh {
        font-weight: 600;
        font-size: 18px;
        line-height: 27px;
        color: #7e8299;
    }

    .items {
        .item {
            display: flex;
            margin-top: 35px;
            align-items: center;
        }
        .circle {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            background: #f3f6f9;
            font-weight: 600;
            font-size: 18px;
            line-height: 27px;
            color: #181c32;
        }
        .active {
            background: #d7f9ef;
            color: #0bb783;
        }
        .texts {
            display: flex;
            flex-direction: column;
            span {
                display: block;
                margin-right: 20px;
                :first-child {
                    font-weight: 500;
                    font-size: 16px;
                    line-height: 20px;
                    text-align: right;
                    letter-spacing: -0.01em;
                    color: #181c32;
                    margin-bottom: 6px;
                }
                :last-child {
                    font-weight: 500;
                    font-size: 12px;
                    line-height: 18px;
                    text-align: right;
                    color: #b5b5c3;
                }
            }
        }
    }
    img {
        margin-top: 20px;
    }
`;

const LeftDiv = styled.div`
    display: flex;
    justify-content: center;
    width: 60%;
    padding-top: 100px;
    height: 100vh;
    .justify-content-between {
        display: flex;
        justify-content: space-between;
        button {
            margin: 0 !important;
            margin-top: 24px !important;
        }
        .back {
            background: #e1f0ff !important;
            color: #3699ff !important;
        }
    }
    .ms-1 {
        margin-right: 8px;
    }
    .box {
        width: 672px;
        background: #ffffff;
        box-shadow: 0px 0px 40px rgba(239, 240, 241, 0.7);
        border-radius: 9px;
        z-index: 1;
        display: flex;
        flex-direction: column;
        padding: 30px;
        h6 {
            font-weight: 700;
            font-size: 26px;
            line-height: 30px;
            letter-spacing: -0.02em;
            color: #181c32;
            margin-bottom: 10px;
        }
        .samane {
            font-weight: 500;
            font-size: 18px;
            line-height: 27px;
            color: #a7a8bb;
            text-align: right;
            .blue {
                color: #00a3ff;
                margin: 0 4px;
            }
        }
        .justify-between {
            justify-content: space-between;
        }
        .w-50 {
            width: 48%;
        }
        label {
            display: flex;
            flex-direction: column;
            margin-top: 18px;
            span {
                font-weight: 700;
                font-size: 14px;
                line-height: 16px;
                text-align: right;
                display: block;
                margin-bottom: 5px;
                color: #181c32;
            }
            .blue {
                cursor: pointer;
                color: #00a3ff;
            }
            .d-flex {
                justify-content: space-between;
                align-items: center;
            }
            input {
                height: 54px;
                width: 100%;
                background: #f5f8fa;
                border-radius: 6px;
            }
            .rad {
                width: 19px;
                height: 19px;
                height: unset;
            }
            .rad-div {
                display: flex;
                align-items: center;
                label {
                    margin-top: 0 !important;
                }
            }
        }
        button {
            width: 173px;
            height: 48px;
            margin-right: auto;
            margin-left: auto;
            background: #00a3ff;
            border-radius: 6px;
            margin-top: 30px;
            color: #fff;
        }
        .reg {
            font-size: 16px;
            line-height: 20px;
            text-align: center;
            color: #00a3ff;
            margin-top: 38px;
            cursor: pointer;
        }
    }
    .no-jus {
        justify-content: start !important;
    }
    .star {
        margin-right: 3px;
        color: #f64e60 !important;
    }
    .reads {
        margin-top: 25px;
        display: flex;
        align-items: center;
        input {
            border: none !important;
            outline: none !important;
            background: #f3f6f9;
            margin-left: 16px;
        }
        span {
            font-weight: 500;
            font-size: 18px;
            line-height: 27px;
            color: #a7a8bb;
        }
        .blue {
            font-weight: 700;
            font-size: 16px;
            line-height: 20px;
            text-decoration-line: underline;
            color: #00a3ff;
            margin-left: 5px;
        }
    }
    .btn-div {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        width: 100%;
        button {
            width: 173px;
            height: 48px;
            background: #00a3ff;
            border-radius: 6px;
            margin: unset;
            margin-top: 24px;
            font-weight: 700;
            font-size: 16px;
            line-height: 20px;
            text-align: center;
            color: #ffffff;
        }
    }
    .file-label {
        input {
            display: none;
        }
        .file-div {
            position: relative;
            height: 55.5px;
            width: 100%;
            background: #f5f8fa;
            border-radius: 6px;
            .btns {
                display: flex;
                align-items: center;
                justify-content: center;
                color: #fff;
                font-weight: 600;
                font-size: 13px;
                line-height: 20px;
                position: absolute;
                width: 103.72px;
                height: 36px;
                left: 12px;
                bottom: 10.5px;
                background: #00a3ff;
                border-radius: 4px;
            }
        }
    }
`;

const mapStyles = {
    default: {
        url: undefined,
        thumbnail: "https://i.postimg.cc/j2jfcgpW/default.png",
    },
    dove: {
        url: "https://map.ir/vector/styles/main/mapir-Dove-style.json",
        thumbnail: "https://i.postimg.cc/bJpkDNL9/dove.png",
    },
};
const Map = Mapir.setToken({
    transformRequest: (url) => {
        return {
            url: url,
            headers: {
                "x-api-key":
                    "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjFjNDMyNjA1NzJiODEwMGRkZjQ2ZTY1YzYwY2M5YWQyZGI5OWYyZDkxOWE4NWUxMDlhOGU5MDA2NTIzYjI2ODI3OWJmY2U0MjMzMTJhNzlkIn0.eyJhdWQiOiIxOTE5MiIsImp0aSI6IjFjNDMyNjA1NzJiODEwMGRkZjQ2ZTY1YzYwY2M5YWQyZGI5OWYyZDkxOWE4NWUxMDlhOGU5MDA2NTIzYjI2ODI3OWJmY2U0MjMzMTJhNzlkIiwiaWF0IjoxNjYxMTU1OTUyLCJuYmYiOjE2NjExNTU5NTIsImV4cCI6MTY2MzgzNzk1Miwic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.dkGkWVn_8sxSrqtY8ZToWXU7H0QB50AbIuEtWXhMn-4NIm1xtZJAKwLYoDGpaMp1KSpYkEHJHYHmKbX7IZd2sKNJ2yoXOY7fP9cDb_dMeXT00v2Iyj60yP4o0qZgII0pS5jb1uigrenPIMl27e0mk5ruXXkV9rGcd91VaRYDIXsT1dBYncXthx18pqb_j2oqrMUImkXr2DV40xQw6dE0BXczip5BOMDlHGN0Pw1Q6l8gLL-ULwFNn0bLuLIaM57gwmBewitv69mzLWjY_MrMQM_xqqVwAiKhAvjCbcAdcA6DTa5S5Z2OrO5lWsEmXTbSXglOcDpFXxcwgpijSrKQGQ", //Mapir access token
                "Mapir-SDK": "reactjs",
            },
        };
    },
});
const search = (params) => {
    return fetch(`https://map.ir/search/v2/`, {
        method: "POST",
        headers: {
            "x-api-key":
                "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjFjNDMyNjA1NzJiODEwMGRkZjQ2ZTY1YzYwY2M5YWQyZGI5OWYyZDkxOWE4NWUxMDlhOGU5MDA2NTIzYjI2ODI3OWJmY2U0MjMzMTJhNzlkIn0.eyJhdWQiOiIxOTE5MiIsImp0aSI6IjFjNDMyNjA1NzJiODEwMGRkZjQ2ZTY1YzYwY2M5YWQyZGI5OWYyZDkxOWE4NWUxMDlhOGU5MDA2NTIzYjI2ODI3OWJmY2U0MjMzMTJhNzlkIiwiaWF0IjoxNjYxMTU1OTUyLCJuYmYiOjE2NjExNTU5NTIsImV4cCI6MTY2MzgzNzk1Miwic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.dkGkWVn_8sxSrqtY8ZToWXU7H0QB50AbIuEtWXhMn-4NIm1xtZJAKwLYoDGpaMp1KSpYkEHJHYHmKbX7IZd2sKNJ2yoXOY7fP9cDb_dMeXT00v2Iyj60yP4o0qZgII0pS5jb1uigrenPIMl27e0mk5ruXXkV9rGcd91VaRYDIXsT1dBYncXthx18pqb_j2oqrMUImkXr2DV40xQw6dE0BXczip5BOMDlHGN0Pw1Q6l8gLL-ULwFNn0bLuLIaM57gwmBewitv69mzLWjY_MrMQM_xqqVwAiKhAvjCbcAdcA6DTa5S5Z2OrO5lWsEmXTbSXglOcDpFXxcwgpijSrKQGQ", //Mapir access token
            "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
    });
};

export default function SetLocation() {
    let navigate = useNavigate();
    const [location, setLocation] = useState();
    let token;
    let phone;
    let panelType;
    if (typeof window !== "undefined") {
        token = localStorage.getItem("token");
        phone = localStorage.getItem("phone_number");
        panelType = localStorage.getItem("panel_type");
    }
    const [user, setUser] = useState([]);
    useEffect(() => {
        let config = {
            // url: `${baseUrl}/api/getdetilse/user${token}`,
            method: "GET",
        };
        axios(config)
            .then((res) => {
                setUser(res.data.userallDetails[0]);
            })
            .catch((error) => {});
    }, []);

    const [stts, setStts] = useState("");
    const setLocHandler = (e) => {
        let data = new FormData();
        data.append("location", location);
        data.append("phone_number", phone);
        data.append("type_panel", panelType);

        let config = {
            method: "POST",
            url: `${BASE_URL}setlocation-school-institution/manage`,
            data: data,
        };
        axios(config)
            .then((response) => {
                setStts("success");
            })
            .catch((err) => {
                setStts("error");
            });
    };
    const [mapStyle, setMapStyle] = useState(mapStyles["dove"]);
    const [markerArray, setMarkerArray] = useState([]);
    const [coord, setCoord] = useState([51.42, 35.72]);

    const [text, setText] = useState("");
    const [results, setResults] = useState([]);
    const [marker, setMarker] = useState(null);
    const [center, setCenter] = useState([51.42047, 35.729054]);
    useEffect(() => {
        if (text.length > 1) {
            const params = {};
            const options = { text };
            for (let key in options) {
                if (options[key] !== null && options[key] !== "") {
                    params[key] = options[key];
                }
            }
            search(params)
                .then((data) => data.json())
                .then((data) => {
                    if (data["odata.count"] > 0) {
                        setResults(data.value);
                    } else {
                        setResults([{ notFound: true }]);
                    }
                });
        } else if (text.length === 0) {
            setResults([]);
        }
    }, [text]);

    function clearSearch() {
        setResults([]);
        setText("");
    }

    function reverseFunction(map, e) {
        var url = `https://map.ir/reverse/no?lat=${e.lngLat.lat}&lon=${e.lngLat.lng}`;
        fetch(url, {
            headers: {
                "Content-Type": "application/json",
                "x-api-key":
                    "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjFjNDMyNjA1NzJiODEwMGRkZjQ2ZTY1YzYwY2M5YWQyZGI5OWYyZDkxOWE4NWUxMDlhOGU5MDA2NTIzYjI2ODI3OWJmY2U0MjMzMTJhNzlkIn0.eyJhdWQiOiIxOTE5MiIsImp0aSI6IjFjNDMyNjA1NzJiODEwMGRkZjQ2ZTY1YzYwY2M5YWQyZGI5OWYyZDkxOWE4NWUxMDlhOGU5MDA2NTIzYjI2ODI3OWJmY2U0MjMzMTJhNzlkIiwiaWF0IjoxNjYxMTU1OTUyLCJuYmYiOjE2NjExNTU5NTIsImV4cCI6MTY2MzgzNzk1Miwic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.dkGkWVn_8sxSrqtY8ZToWXU7H0QB50AbIuEtWXhMn-4NIm1xtZJAKwLYoDGpaMp1KSpYkEHJHYHmKbX7IZd2sKNJ2yoXOY7fP9cDb_dMeXT00v2Iyj60yP4o0qZgII0pS5jb1uigrenPIMl27e0mk5ruXXkV9rGcd91VaRYDIXsT1dBYncXthx18pqb_j2oqrMUImkXr2DV40xQw6dE0BXczip5BOMDlHGN0Pw1Q6l8gLL-ULwFNn0bLuLIaM57gwmBewitv69mzLWjY_MrMQM_xqqVwAiKhAvjCbcAdcA6DTa5S5Z2OrO5lWsEmXTbSXglOcDpFXxcwgpijSrKQGQ",
            },
        })
            .then((response) => response.json())
            .then((data) =>
                setLocation(
                    [
                        data.geom.coordinates[0],
                        data.geom.coordinates[1],
                    ].toString()
                )
            );
        const array = [];
        array.push(
            <Mapir.Marker
                coordinates={[e.lngLat.lng, e.lngLat.lat]}
                anchor="bottom"
                Image={"/images/home-location-icon.svg"}
            />
        );
        setMarkerArray(array);
    }
    return (
        <Main>
            <RightDiv>
                <img src="/images/logo.png" width={92} alt="" />
                <span className="samane">سامانه هوشمندسازی سرویس مدارس</span>
                <div className="items">
                    <div className="item">
                        <div className="circle active">
                            <svg
                                width="26"
                                height="26"
                                viewBox="0 0 26 26"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M19.2162 6.8817C19.6037 6.42582 20.2874 6.37039 20.7433 6.75788C21.1991 7.14538 21.2546 7.82906 20.8671 8.28493L11.6587 19.1183C11.2652 19.5813 10.5678 19.6301 10.1136 19.2263L5.23859 14.893C4.7914 14.4955 4.75112 13.8108 5.14862 13.3636C5.54611 12.9164 6.23086 12.8761 6.67804 13.2736L10.7252 16.8711L19.2162 6.8817Z"
                                    fill="#0BB783"
                                />
                            </svg>
                        </div>
                        <div className="texts">
                            <span>تلفن همراه</span>
                            <span>جهت دریافت پیامک فعالسازی</span>
                        </div>
                    </div>
                    <div className="item">
                        <div className="circle active">
                            <svg
                                width="26"
                                height="26"
                                viewBox="0 0 26 26"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M19.2162 6.8817C19.6037 6.42582 20.2874 6.37039 20.7433 6.75788C21.1991 7.14538 21.2546 7.82906 20.8671 8.28493L11.6587 19.1183C11.2652 19.5813 10.5678 19.6301 10.1136 19.2263L5.23859 14.893C4.7914 14.4955 4.75112 13.8108 5.14862 13.3636C5.54611 12.9164 6.23086 12.8761 6.67804 13.2736L10.7252 16.8711L19.2162 6.8817Z"
                                    fill="#0BB783"
                                />
                            </svg>
                        </div>
                        <div className="texts">
                            <span>تایید شماره تلفن همراه</span>
                            <span>ثبت کد فعالسازی</span>
                        </div>
                    </div>
                    <div className="item">
                        <div className="circle active">
                            {" "}
                            <svg
                                width="26"
                                height="26"
                                viewBox="0 0 26 26"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M19.2162 6.8817C19.6037 6.42582 20.2874 6.37039 20.7433 6.75788C21.1991 7.14538 21.2546 7.82906 20.8671 8.28493L11.6587 19.1183C11.2652 19.5813 10.5678 19.6301 10.1136 19.2263L5.23859 14.893C4.7914 14.4955 4.75112 13.8108 5.14862 13.3636C5.54611 12.9164 6.23086 12.8761 6.67804 13.2736L10.7252 16.8711L19.2162 6.8817Z"
                                    fill="#0BB783"
                                />
                            </svg>
                        </div>
                        <div className="texts">
                            <span>ثبت اطلاعات</span>
                            <span>ثبت اطلاعات هویتی</span>
                        </div>
                    </div>
                    <div className="item">
                        <div className="circle active">
                            {stts !== undefined &&
                            stts !== null &&
                            stts.length == 0 ? (
                                4
                            ) : (
                                <svg
                                    width="26"
                                    height="26"
                                    viewBox="0 0 26 26"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M19.2162 6.8817C19.6037 6.42582 20.2874 6.37039 20.7433 6.75788C21.1991 7.14538 21.2546 7.82906 20.8671 8.28493L11.6587 19.1183C11.2652 19.5813 10.5678 19.6301 10.1136 19.2263L5.23859 14.893C4.7914 14.4955 4.75112 13.8108 5.14862 13.3636C5.54611 12.9164 6.23086 12.8761 6.67804 13.2736L10.7252 16.8711L19.2162 6.8817Z"
                                        fill="#0BB783"
                                    />
                                </svg>
                            )}
                        </div>
                        <div className="texts">
                            <span>بارگذاری مدارک</span>
                            <span>بارگذاری مدارک سازمانی</span>
                        </div>
                    </div>
                    <div className="item">
                        <div
                            className={
                                stts !== undefined &&
                                stts !== null &&
                                stts.length !== 0
                                    ? "circle active"
                                    : "circle"
                            }
                        >
                            5
                        </div>
                        <div className="texts">
                            <span>تاییدیه اینوباس</span>
                            <span>انتظار برای تایید صحت اطلاعات</span>
                        </div>
                    </div>
                </div>
                <img src="/images/reg-4.png" width={400} alt="" />
            </RightDiv>
            <LeftDiv>
                <div className="box">
                    {stts == "success" ? (
                        <div className="success">
                            <svg
                                width="200"
                                height="200"
                                viewBox="0 0 200 200"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <circle
                                    cx="100"
                                    cy="100"
                                    r="100"
                                    fill="#D7F9EF"
                                />
                                <path
                                    d="M124.871 75.5268C126.421 73.7033 129.155 73.4816 130.979 75.0315C132.802 76.5815 133.024 79.3162 131.474 81.1397L94.6409 124.473C93.0665 126.325 90.277 126.52 88.4602 124.905L68.9602 107.572C67.1715 105.982 67.0104 103.243 68.6003 101.454C70.1903 99.6656 72.9293 99.5045 74.718 101.094L90.9067 115.484L124.871 75.5268Z"
                                    fill="#0BB783"
                                />
                            </svg>
                            <h6>اطلاعات شما با موفقیت ثبت شد.</h6>
                            <span>
                                پس از بررسی اطلاعات وارد شده، کارشناسان ما با
                                شما تماس خواهند گرفت.
                            </span>
                        </div>
                    ) : stts == "error" ? (
                        <div className="success">
                            <svg
                                width="200"
                                height="200"
                                viewBox="0 0 200 200"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <circle
                                    cx="100"
                                    cy="100"
                                    r="100"
                                    fill="#FFE2E5"
                                />
                                <path
                                    d="M116.865 78.5268C118.415 76.7033 121.15 76.4816 122.973 78.0315C124.797 79.5815 125.018 82.3162 123.468 84.1397L86.635 127.473C85.0607 129.325 82.2711 129.52 80.4543 127.905C76.9941 124.5 80.4543 121.5 80.4543 121.5L116.865 78.5268Z"
                                    fill="#F64E60"
                                />
                                <path
                                    d="M86.5512 78.5268C85.0012 76.7033 82.2665 76.4816 80.443 78.0315C78.6195 79.5815 78.3977 82.3162 79.9477 84.1397L116.781 127.473C118.355 129.325 121.145 129.52 122.962 127.905C126.422 124.5 122.962 121.5 122.962 121.5L86.5512 78.5268Z"
                                    fill="#F64E60"
                                />
                            </svg>

                            <h6>خطا در ثبت اطلاعات</h6>
                            <span>
                                لطفا مجددا تلاش نمایید. در صورت حل نشدن مشکل با
                                پشتیبانی تماس بگیرید.
                            </span>
                            <span className="back" onClick={() => setStts("")}>
                                بازگشت
                            </span>
                        </div>
                    ) : (
                        <>
                            <h6>ثبت لوکیشن</h6>
                            <span className="samane">
                                لطفا محل دقیق مدرسه/ موسسه خود ر روی نقشه مشخص
                                کنید.
                            </span>
                            {results.length > 0 && (
                                <div
                                    class="clear-seach"
                                    onClick={() => clearSearch()}
                                >
                                    <span> &#10006; </span>
                                </div>
                            )}
                            <div class="btn-seach"></div>
                            {results.length > 0 && (
                                <div class="modal">
                                    {results.map((item) => {
                                        if (item.notFound === true) {
                                            return <p>نتیجه ای یافت نشد</p>;
                                        } else {
                                            return (
                                                <div
                                                    onClick={() => {
                                                        setCoord({
                                                            lng: item.geom
                                                                .coordinates[0],
                                                            lat: item.geom
                                                                .coordinates[1],
                                                        });

                                                        setCenter(
                                                            item.geom
                                                                .coordinates
                                                        );
                                                    }}
                                                    className="search-result-item"
                                                >
                                                    <p className="search-result-item-title">
                                                        {item.title}
                                                    </p>
                                                    <p className="search-result-item-address">
                                                        {item.address}
                                                    </p>
                                                </div>
                                            );
                                        }
                                    })}
                                </div>
                            )}
                            <Mapir
                                style={mapStyle.url}
                                center={coord}
                                Map={Map}
                                onClick={reverseFunction}
                                zoom={[16]}
                            >
                                <div className="click-to">
                                    برای انتخاب مکان ، روی لوکیشن مورد نظر کلیک
                                    کنید.
                                </div>
                                {markerArray}
                            </Mapir>
                            <div className="justify-content-between">
                                <button
                                    className="back"
                                    onClick={() => {
                                        navigate("/register/set_info");
                                    }}
                                >
                                    مرحله قبل
                                </button>
                                <button onClick={setLocHandler}>
                                    مرحله بعد
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </LeftDiv>
        </Main>
    );
}
