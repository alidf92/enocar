import styled from "styled-components";
import Header from "../../components/School/Header";
import Sidebar from "../../components/School/Sidebar";
import Mapir from "mapir-react-component";
import "mapir-react-component/dist/index.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Main = styled.div`
    background: #e5e5e5;

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
        font-size: 17px;
        line-height: 26px;
        text-align: right;
        color: #ffffff;
        margin-bottom: 4px;
    }
    .span {
        display: block;
        font-weight: 500;
        font-size: 12px;
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
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #eff2f5;
        margin-bottom: 10px;
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
            border: 1px solid #eff2f5;
            border-radius: 6px;
            span {
                cursor: pointer;
                padding: 9px 16px;
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

export default function SchoolPanel() {
    let navigate = useNavigate();
    const [location, setLocation] = useState();
    let token;
    if (typeof window !== "undefined") {
        token = localStorage.getItem("token");
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

    const setLocHandler = (e) => {
        let data = new FormData();
        data.append("location", location);
        data.append("national_code", user.national_code);
        let config = {
            method: "POST",
            // url: `${baseUrl}/api/set-location/user`,
            data: data,
        };
        axios(config).then((response) => {
            navigate("/select_school");
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

    //

    const [activeTab, setActiveTab] = useState(1);
    return (
        <Main>
            <Sidebar active={1} />
            <div className="w-100">
                <Header />
                <Content>
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
                                <span className="title">سفرها(60)</span>
                                <span className="span">نمایش سفرهای موسسه</span>
                            </div>
                            <button
                                onClick={() => {
                                    navigate("/school/travels");
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
                                        <stop offset="1" stop-color="#759CFE" />
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

                                <span className="title">موسسات(3)</span>
                                <span className="span">
                                    موسساتی که با مدرسه شما همکاری دارند
                                </span>
                            </div>
                            <button
                                onClick={() => {
                                    navigate("/school/schools");
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
                                        <stop offset="1" stop-color="#1EC9C1" />
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

                                <span className="title">دانش آموزان(32)</span>
                                <span className="span">
                                    رانندگان ثبت و تایید شده توسط موسسه
                                </span>
                            </div>
                            <button
                                onClick={() => {
                                    navigate("/school/drivers");
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
                    </div>
                    {results.length > 0 && (
                        <div class="clear-seach" onClick={() => clearSearch()}>
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
                                                    item.geom.coordinates
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
                            برای انتخاب مکان ، روی لوکیشن مورد نظر کلیک کنید.
                        </div>
                        {markerArray}
                    </Mapir>
                    <TableDiv>
                        <div className="head">
                            <h6>سفرهای امروز</h6>
                            <div className="tabs">
                                <span
                                    className={activeTab === 1 && "active"}
                                    onClick={() => {
                                        setActiveTab(1);
                                    }}
                                >
                                    کنسل شده (0)
                                </span>
                                <span
                                    className={activeTab === 2 && "active"}
                                    onClick={() => {
                                        setActiveTab(2);
                                    }}
                                >
                                    جایگزین شده(0)
                                </span>
                                <span
                                    className={activeTab === 3 && "active"}
                                    onClick={() => {
                                        setActiveTab(3);
                                    }}
                                >
                                    انجام شده (10)
                                </span>
                                <span
                                    className={activeTab === 4 && "active"}
                                    onClick={() => {
                                        setActiveTab(4);
                                    }}
                                >
                                    در انتظار انجام (0)
                                </span>
                                <span
                                    className={activeTab === 5 && "active"}
                                    onClick={() => {
                                        setActiveTab(5);
                                    }}
                                >
                                    در حال انجام (2){" "}
                                </span>
                                <span
                                    className={activeTab === 6 && "active"}
                                    onClick={() => {
                                        setActiveTab(6);
                                    }}
                                >
                                    همه (12)
                                </span>
                            </div>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>نام راننده</th>
                                    <th>نام مدرسه</th>
                                    <th>زمان سرویس</th>
                                    <th>حاضرین</th>
                                    <th>وضعیت سرویس</th>
                                    <th>عملیات</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <img
                                                src="/images/prof.png"
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
                                        <span className="span-1">
                                            رفت − 08:00
                                        </span>
                                        <span className="span-2">
                                            سفر 46457#
                                        </span>
                                    </td>
                                    <td>
                                        <div className="images">
                                            <div className="img-abs red img-1">
                                                A
                                            </div>
                                            <div className="img-abs img-2">
                                                S
                                            </div>
                                            <div className="img-abs img-3 red">
                                                P
                                            </div>
                                            <div className="img-abs img-4">
                                                R
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className="span-2">83%</span>
                                        <div className="progress-div">
                                            <div className="progress-fill"></div>
                                        </div>
                                    </td>
                                    <td>
                                        <button>
                                            جزئیات سفر
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
                </Content>
            </div>
        </Main>
    );
}
