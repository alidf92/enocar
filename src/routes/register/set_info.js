import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../components/BaseUrl";
import axios from "axios";

const Main = styled.div`
    min-height: 100vh;
    width: 100%;
    display: flex;
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
    min-height: 100vh;
    padding-bottom: 40px;
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
        height: unset !important;
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
        .w-48 {
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

export default function SetInfo() {
    let navigate = useNavigate();

    let token;
    let phone;
    if (typeof window !== "undefined") {
        token = localStorage.getItem("token");
        phone = localStorage.getItem("phone_number");
    }

    const [selectedForm, setSelectedForm] = useState("sch");
    console.log(selectedForm);

    // Create Institution

    const [insImg, setInsImg] = useState("");
    const [insName, setInsName] = useState("");
    const [insCode, setInsCode] = useState("");
    const [insState, setInsState] = useState("");
    const [insCity, setInsCity] = useState("");
    const [insAddress, setInsAddress] = useState("");
    const [insManagerName, setInsManagerName] = useState("");
    const [insPhone, setInsPhone] = useState("");
    const [insShenase, setInsShenase] = useState("");
    const [insSheba, setInsSheba] = useState("");
    const [insBank, setInsBank] = useState("");

    const createInstitutioneHandler = (e) => {
        let data = new FormData();
        data.append("type_panel", "institution");
        data.append("phone_number", phone);
        data.append("logo", insImg);
        data.append("name", insName);
        data.append("code", insCode);
        data.append("state", insState);
        data.append("city", insCity);
        data.append("address", insAddress);
        data.append("name_in_manage", insManagerName);
        data.append("const_phone", insPhone);
        data.append("legel_id", insShenase);
        data.append("shaba_number", insSheba);
        data.append("bank_name", insBank);
        let config = {
            method: "POST",
            url: `${BASE_URL}create-school-institution/manage`,
            data: data,
        };
        axios(config).then((response) => {
            localStorage.setItem(
                "panel_type",
                selectedForm === "sch" ? "school" : "institution"
            );
            navigate("/register/set_location");
        });
    };

    // Create School

    const [schoolImg, setSchoolImg] = useState("");
    const [schoolName, setSchoolName] = useState("");
    const [schoolCode, setSchoolCode] = useState("");
    const [schoolDore, setSchoolDore] = useState("");
    const [schoolGender, setSchoolGender] = useState("");
    const [schoolState, setSchoolState] = useState("");
    const [schoolCity, setSchoolCity] = useState("");
    const [schoolAddress, setSchoolAddress] = useState("");
    const [schoolManagerName, setSchoolManagerName] = useState("");
    const [schoolPhone, setSchoolPhone] = useState("");
    const [schoolShenase, setSchoolShenase] = useState("");
    const [schoolSheba, setSchoolSheba] = useState("");
    const [schoolBank, setSchoolBank] = useState("");

    const createSchooleHandler = (e) => {
        let data = new FormData();
        data.append("type_panel", "school");
        data.append("phone_number", phone);
        data.append("logo", schoolImg);
        data.append("name", schoolName);
        data.append("code", schoolCode);
        data.append("dore", schoolDore);
        data.append("gender", schoolGender);
        data.append("state", schoolState);
        data.append("city", schoolCity);
        data.append("address", schoolAddress);
        data.append("name_in_manage", schoolManagerName);
        data.append("const_phone", schoolPhone);
        data.append("legel_id", schoolShenase);
        data.append("shaba_number", schoolSheba);
        data.append("bank_name", schoolBank);
        let config = {
            method: "POST",
            url: `${BASE_URL}create-school-institution/manage`,
            data: data,
        };
        axios(config).then((response) => {
            localStorage.setItem(
                "panel_type",
                selectedForm === "sch" ? "school" : "institution"
            );
            navigate("/register/set_location");
        });
    };

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
                        <div className="circle active">3</div>
                        <div className="texts">
                            <span>ثبت اطلاعات</span>
                            <span>ثبت اطلاعات هویتی</span>
                        </div>
                    </div>
                    <div className="item">
                        <div className="circle ">4</div>
                        <div className="texts">
                            <span>بارگذاری مدارک</span>
                            <span>بارگذاری مدارک سازمانی</span>
                        </div>
                    </div>
                    <div className="item">
                        <div className="circle ">5</div>
                        <div className="texts">
                            <span>تاییدیه اینوباس</span>
                            <span>انتظار برای تایید صحت اطلاعات</span>
                        </div>
                    </div>
                </div>
                <img src="/images/reg-3.png" width={400} alt="" />
            </RightDiv>
            <LeftDiv>
                <div className="box">
                    <h6>ثبت اطلاعات</h6>
                    <span className="samane">ثبت اطلاعات موسسه / مدرسه</span>
                    {selectedForm === "sch" ? (
                        <>
                            <div className="d-flex justify-between">
                                <div className="w-48">
                                    <label
                                        onChange={(e) => {
                                            setSelectedForm(e.target.value);
                                        }}
                                    >
                                        <div className="d-flex no-jus">
                                            <span>نوع پنل</span>
                                            <span className="star">*</span>
                                        </div>
                                        <div className="rad-div">
                                            <input
                                                type="radio"
                                                className="rad"
                                                name="rad"
                                                id="rad-1"
                                                checked={selectedForm == "ins"}
                                                value="ins"
                                            />
                                            <label htmlFor="rad-1">
                                                موسسه سرویس مدارس
                                            </label>
                                        </div>
                                        <div className="rad-div">
                                            <input
                                                type="radio"
                                                className="rad"
                                                name="rad"
                                                id="rad-2"
                                                value="sch"
                                                checked={selectedForm == "sch"}
                                            />
                                            <label htmlFor="rad-2">مدرسه</label>
                                        </div>
                                    </label>
                                    <label>
                                        <div className="d-flex no-jus">
                                            <span>نام مدرسه</span>
                                            <span className="star">*</span>
                                        </div>
                                        <input
                                            onChange={(e) => {
                                                setSchoolName(e.target.value);
                                            }}
                                            type="text"
                                            name=""
                                            id=""
                                        />
                                    </label>
                                    <label>
                                        <div className="d-flex no-jus">
                                            <span>دوره مدرسه</span>
                                            <span className="star">*</span>
                                        </div>
                                        <input
                                            onChange={(e) => {
                                                setSchoolDore(e.target.value);
                                            }}
                                            type="text"
                                            name=""
                                            id=""
                                        />
                                    </label>
                                    <label>
                                        <div className="d-flex no-jus">
                                            <span>استان</span>
                                            <span className="star">*</span>
                                        </div>
                                        <input
                                            onChange={(e) => {
                                                setSchoolState(e.target.value);
                                            }}
                                            type="text"
                                        />
                                    </label>
                                </div>
                                <div className="w-48">
                                    <label
                                        htmlFor="file"
                                        className="file-label"
                                    >
                                        <span>لوگو</span>
                                        <div className="file-div">
                                            <div className="btns">
                                                <input
                                                    type="file"
                                                    name=""
                                                    id="file"
                                                    onChange={(e) => {
                                                        setSchoolImg(
                                                            e.target.files[0]
                                                        );
                                                    }}
                                                />
                                                انتخاب فایل
                                            </div>
                                        </div>
                                    </label>
                                    <label>
                                        <div className="d-flex no-jus">
                                            <span>کد مدرسه</span>
                                            <span className="star">*</span>
                                        </div>
                                        <input
                                            onChange={(e) => {
                                                setSchoolCode(e.target.value);
                                            }}
                                            type="text"
                                            name=""
                                            id=""
                                        />
                                    </label>
                                    <label>
                                        <div className="d-flex no-jus">
                                            <span>جنسیت</span>
                                            <span className="star">*</span>
                                        </div>
                                        <input
                                            onChange={(e) => {
                                                setSchoolGender(e.target.value);
                                            }}
                                            type="text"
                                            name=""
                                            id=""
                                        />
                                    </label>
                                    <label>
                                        <div className="d-flex no-jus">
                                            <span>شهر</span>
                                            <span className="star">*</span>
                                        </div>
                                        <input
                                            onChange={(e) => {
                                                setSchoolCity(e.target.value);
                                            }}
                                            type="text"
                                            name=""
                                            id=""
                                        />
                                    </label>
                                </div>
                            </div>
                            <label>
                                <div className="d-flex no-jus">
                                    <span>نشانی </span>
                                    <span className="star">*</span>
                                </div>
                                <input
                                    onChange={(e) => {
                                        setSchoolAddress(e.target.value);
                                    }}
                                    type="text"
                                    name=""
                                    id=""
                                />
                            </label>
                            <label>
                                <div className="d-flex no-jus">
                                    <span>نام و نام خانوادگی مدیر مدرسه </span>
                                    <span className="star">*</span>
                                </div>
                                <input
                                    onChange={(e) => {
                                        setSchoolManagerName(e.target.value);
                                    }}
                                    type="text"
                                    name=""
                                    id=""
                                />
                            </label>
                            <div className="d-flex justify-between">
                                <div className="w-48">
                                    <label>
                                        <div className="d-flex no-jus">
                                            <span>تلفن ثابت مدرسه</span>
                                            <span className="star">*</span>
                                        </div>
                                        <input
                                            onChange={(e) => {
                                                setSchoolPhone(e.target.value);
                                            }}
                                            type="text"
                                            name=""
                                            id=""
                                        />
                                    </label>
                                    <label>
                                        <div className="d-flex no-jus">
                                            <span>شماره شبا مدرسه</span>
                                            <span className="star">*</span>
                                        </div>
                                        <input
                                            onChange={(e) => {
                                                setSchoolSheba(e.target.value);
                                            }}
                                            type="text"
                                            name=""
                                            id=""
                                        />
                                    </label>
                                </div>
                                <div className="w-48">
                                    <label>
                                        <div className="d-flex no-jus">
                                            <span>شناسه حقوقی</span>
                                            <span className="star">*</span>
                                        </div>
                                        <input
                                            onChange={(e) => {
                                                setSchoolShenase(
                                                    e.target.value
                                                );
                                            }}
                                            type="text"
                                            name=""
                                            id=""
                                        />
                                    </label>
                                    <label>
                                        <div className="d-flex no-jus">
                                            <span>نام بانک</span>
                                            <span className="star">*</span>
                                        </div>
                                        <input
                                            onChange={(e) => {
                                                setSchoolBank(e.target.value);
                                            }}
                                            type="text"
                                            name=""
                                            id=""
                                        />
                                    </label>
                                </div>
                            </div>
                            <div className="justify-content-between">
                                <button
                                    className="back"
                                    onClick={() => {
                                        navigate("/register/otp");
                                    }}
                                >
                                    مرحله قبل
                                </button>
                                <button onClick={createSchooleHandler}>
                                    مرحله بعد
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="d-flex justify-between">
                                <div className="w-48">
                                    <label
                                        onChange={(e) => {
                                            setSelectedForm(e.target.value);
                                        }}
                                    >
                                        <div className="d-flex no-jus">
                                            <span>نوع پنل</span>
                                            <span className="star">*</span>
                                        </div>
                                        <div className="rad-div">
                                            <input
                                                type="radio"
                                                className="rad"
                                                name="rad"
                                                id="rad-1"
                                                checked={selectedForm == "ins"}
                                                value="ins"
                                            />
                                            <label htmlFor="rad-1">
                                                موسسه سرویس مدارس
                                            </label>
                                        </div>
                                        <div className="rad-div">
                                            <input
                                                type="radio"
                                                className="rad"
                                                name="rad"
                                                id="rad-2"
                                                value="sch"
                                                checked={selectedForm == "sch"}
                                            />
                                            <label htmlFor="rad-2">مدرسه</label>
                                        </div>
                                    </label>
                                    <label>
                                        <div className="d-flex no-jus">
                                            <span>نام موسسه</span>
                                            <span className="star">*</span>
                                        </div>
                                        <input
                                            onChange={(e) => {
                                                setInsName(e.target.value);
                                            }}
                                            type="text"
                                            name=""
                                            id=""
                                        />
                                    </label>

                                    <label>
                                        <div className="d-flex no-jus">
                                            <span>استان</span>
                                            <span className="star">*</span>
                                        </div>
                                        <input
                                            onChange={(e) => {
                                                setInsState(e.target.value);
                                            }}
                                            type="text"
                                            name=""
                                            id=""
                                        />
                                    </label>
                                </div>
                                <div className="w-48">
                                    <label
                                        htmlFor="file"
                                        className="file-label"
                                    >
                                        <span>لوگو</span>
                                        <div className="file-div">
                                            <div className="btns">
                                                <input
                                                    onChange={(e) => {
                                                        setInsImg(
                                                            e.target.files[0]
                                                        );
                                                    }}
                                                    type="file"
                                                    name=""
                                                    id="file"
                                                />
                                                انتخاب فایل
                                            </div>
                                        </div>
                                    </label>
                                    <label>
                                        <div className="d-flex no-jus">
                                            <span>کد موسسه</span>
                                            <span className="star">*</span>
                                        </div>
                                        <input
                                            onChange={(e) => {
                                                setInsCode(e.target.value);
                                            }}
                                            type="text"
                                            name=""
                                            id=""
                                        />
                                    </label>

                                    <label>
                                        <div className="d-flex no-jus">
                                            <span>شهر</span>
                                            <span className="star">*</span>
                                        </div>
                                        <input
                                            onChange={(e) => {
                                                setInsCity(e.target.value);
                                            }}
                                            type="text"
                                            name=""
                                            id=""
                                        />
                                    </label>
                                </div>
                            </div>
                            <label>
                                <div className="d-flex no-jus">
                                    <span>نشانی </span>
                                    <span className="star">*</span>
                                </div>
                                <input
                                    onChange={(e) => {
                                        setInsAddress(e.target.value);
                                    }}
                                    type="text"
                                    name=""
                                    id=""
                                />
                            </label>
                            <label>
                                <div className="d-flex no-jus">
                                    <span>نام و نام خانوادگی مدیر موسسه </span>
                                    <span className="star">*</span>
                                </div>
                                <input
                                    onChange={(e) => {
                                        setInsManagerName(e.target.value);
                                    }}
                                    type="text"
                                    name=""
                                    id=""
                                />
                            </label>
                            <div className="d-flex justify-between">
                                <div className="w-48">
                                    <label>
                                        <div className="d-flex no-jus">
                                            <span>تلفن ثابت موسسه</span>
                                            <span className="star">*</span>
                                        </div>
                                        <input
                                            onChange={(e) => {
                                                setInsPhone(e.target.value);
                                            }}
                                            type="text"
                                            name=""
                                            id=""
                                        />
                                    </label>
                                    <label>
                                        <div className="d-flex no-jus">
                                            <span>شماره شبا موسسه</span>
                                            <span className="star">*</span>
                                        </div>
                                        <input
                                            onChange={(e) => {
                                                setInsSheba(e.target.value);
                                            }}
                                            type="text"
                                            name=""
                                            id=""
                                        />
                                    </label>
                                </div>
                                <div className="w-48">
                                    <label>
                                        <div className="d-flex no-jus">
                                            <span>شناسه حقوقی</span>
                                            <span className="star">*</span>
                                        </div>
                                        <input
                                            onChange={(e) => {
                                                setInsShenase(e.target.value);
                                            }}
                                            type="text"
                                            name=""
                                            id=""
                                        />
                                    </label>
                                    <label>
                                        <div className="d-flex no-jus">
                                            <span>نام بانک</span>
                                            <span className="star">*</span>
                                        </div>
                                        <input
                                            onChange={(e) => {
                                                setInsBank(e.target.value);
                                            }}
                                            type="text"
                                            name=""
                                            id=""
                                        />
                                    </label>
                                </div>
                            </div>
                            <div className="justify-content-between">
                                <button
                                    className="back"
                                    onClick={() => {
                                        navigate("/register/otp");
                                    }}
                                >
                                    مرحله قبل
                                </button>
                                <button onClick={createInstitutioneHandler}>
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
