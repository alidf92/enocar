import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../components/BaseUrl";
import axios from "axios";

const Main = styled.div`
    min-height: 100vh;
    width: 100%;
    display: flex;
    transition: opacity 0.3s;
    opacity: 1;
    animation: fadeInAnimation ease 1s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
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
        position: relative;
        top: -20px;
    }
`;

const LeftDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60%;
    height: 100vh;
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
`;

export default function Otp() {
    let token;
    let phone;
    if (typeof window !== "undefined") {
        token = localStorage.getItem("token");
        phone = localStorage.getItem("phone_number");
    }
    let navigate = useNavigate();
    const [otp, setOtp] = useState("");
    const otpHandler = (e) => {
        let data = new FormData();
        data.append("phone_number", phone);
        data.append("verify_code", otp);
        let config = {
            method: "POST",
            url: `${BASE_URL}create-manager/account`,
            data: data,
        };
        axios(config).then((response) => {
            //   localStorage.setItem("token", response.data.data);
            navigate("/register/set_info");
        });
    };
    // Resend Code
    const [countDown, setCountDown] = useState(false);
    const [runTimer, setRunTimer] = useState((t) => !t);
    useEffect(() => {
        let timerId;

        if (runTimer) {
            setCountDown(60);
            timerId = setInterval(() => {
                setCountDown((countDown) => countDown - 1);
            }, 1000);
        } else {
            clearInterval(timerId);
        }

        return () => clearInterval(timerId);
    }, [runTimer]);
    useEffect(() => {
        if (countDown < 0 && runTimer) {
            setRunTimer(false);
            setCountDown(0);
        }
    }, [countDown, runTimer]);

    return (
        <Main>
            <RightDiv>
                <img src="/images/logo.png" width={92} alt="" />
                <span className="samane">سامانه هوشمندسازی سرویس مدارس</span>
                <div className="items">
                    <div className="item">
                        <div className="circle active">1</div>
                        <div className="texts">
                            <span>تلفن همراه</span>
                            <span>جهت دریافت پیامک فعالسازی</span>
                        </div>
                    </div>
                    <div className="item">
                        <div className="circle active">2</div>
                        <div className="texts">
                            <span>تایید شماره تلفن همراه</span>
                            <span>ثبت کد فعالسازی</span>
                        </div>
                    </div>
                    <div className="item">
                        <div className="circle ">3</div>
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
                <img src="/images/reg-2.png" width={400} alt="" />
            </RightDiv>
            <LeftDiv>
                <div className="box">
                    <h6>کد فعالسازی</h6>
                    <span className="samane">
                        کد فعالسازی به شماره تلفن 09123456789 ارسال شد.
                        <span
                            className="blue c-p"
                            onClick={() => {
                                navigate("/register/register");
                            }}
                        >
                            تغییر شماره تلفن
                        </span>
                    </span>
                    <label>
                        <div className="d-flex no-jus">
                            <span>کد فعالسازی</span>
                            <span className="star">*</span>
                        </div>
                        <input
                            onChange={(e) => {
                                setOtp(e.target.value);
                            }}
                            type="text"
                            name=""
                            id=""
                        />
                    </label>
                    <div className="reads">
                        {countDown !== 0 ? (
                            <>
                                <span>دریافت مجدد کد فعالسازی</span>
                                <span className="blue ms-1">{countDown}</span>
                            </>
                        ) : (
                            <span className="blue ms-1">ارسال مجدد</span>
                        )}
                    </div>
                    <div className="btn-div">
                        <button onClick={otpHandler}>مرحله بعد</button>
                    </div>
                </div>
            </LeftDiv>
        </Main>
    );
}
