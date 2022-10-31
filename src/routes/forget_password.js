import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../components/BaseUrl";
import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Main = styled.div`
    min-height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    align-items: center;
    justify-content: center;

    .bg {
        position: absolute;
        bottom: 0;
        right: 50%;
        transform: translateX(50%);
        width: 100%;
        height: 60vh;
        background: url("/images/login-bg.png");
        background-size: contain;
        background-position-x: center;
        background-repeat: no-repeat;
    }
    .box {
        width: 480px;
        left: 503px;
        top: 214px;
        background: #ffffff;
        box-shadow: 0px 0px 40px rgba(239, 240, 241, 0.7);
        border-radius: 9px;
        z-index: 1;
        display: flex;
        flex-direction: column;
        padding: 48px 50px 12px 50px;
        h6 {
            font-weight: 700;
            font-size: 26px;
            line-height: 30px;
            text-align: center;
            letter-spacing: -0.02em;
            color: #181c32;
            margin-bottom: 10px;
        }
        .samane {
            font-weight: 500;
            font-size: 18px;
            line-height: 21px;
            text-align: center;
            color: #b5b5c3;
            margin-bottom: 12px;
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
    ul {
        list-style: none;
        display: flex;
        z-index: 1;
        margin-top: 80px;
        li {
            font-weight: 600;
            cursor: pointer;
            font-size: 16px;
            line-height: 24px;
            color: #b5b5c3;
            margin: 0 12px;
        }
    }
`;
export default function ForgetPassword() {
    let navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const loginHandler = (e) => {
        let data = new FormData();
        data.append("phone_number", userName);
        data.append("password", password);
        let config = {
            method: "POST",
            url: `${BASE_URL}login-manager`,
            data: data,
        };
        axios(config)
            .then((response) => {
                localStorage.setItem("token", response.data.api_token);
                localStorage.setItem("phone_number", userName);
                if (response.data.disc === "verfiy") {
                    navigate("/register/otp");
                } else if (response.data.disc === "false") {
                    navigate("/register/set_info");
                } else {
                    navigate("/institute");
                }
            })
            .catch((err) => {
                toast.error(err.response.data, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            });
    };
    return (
        <Main>
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
            <div className="bg"></div>
            <div className="box">
                <h6>بازیابی رمز عبور</h6>
                <span className="samane">سامانه هوشمندسازی سرویس مدارس</span>
                <label>
                    <span>تلفن همراه</span>
                    <input
                        onChange={(e) => {
                            setUserName(e.target.value);
                        }}
                        type="text"
                        name=""
                        id=""
                    />
                </label>
                <label>
                    <div className="d-flex">
                        <span>رمزعبور</span>
                    </div>
                    <input
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        type="password"
                        name=""
                        id=""
                    />
                </label>
                <button onClick={loginHandler}>ورود</button>
                <div
                    className="reg"
                    onClick={() => {
                        navigate("/register/register");
                    }}
                >
                    ایجاد حساب کاربری
                </div>
            </div>
            <ul>
                <li>صفحه اصلی</li>
                <li>راهنما و سوالات متداول</li>
                <li>در باره ما</li>
                <li>تماس با ما</li>
            </ul>
        </Main>
    );
}
