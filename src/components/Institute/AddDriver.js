import React, { useState } from "react";
import styled from "styled-components";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

const Main = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 9999;
    width: 1035.35px;
    background: #ffffff;
    border-radius: 12px;
    padding: 32px 30px;
    border: 1px solid #d2d2d2;
    .date-rel {
        position: relative;
        svg {
            position: absolute;
            left: 16px;
            top: 14px;
        }
    }
    .rmdp-input {
        direction: ltr;
        padding-left: 14px !important;
        border: none !important;
    }
    .head {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #eff2f5;
        padding-bottom: 20px;
        h6 {
            font-weight: 600;
            font-size: 14px;
            text-align: right;
            color: #464e5f;
        }
        .close {
            font-weight: 500;
            font-size: 15px;
            text-align: center;
            color: #b5b5c3;
            cursor: pointer;
        }
    }
    .tabs {
        margin-top: 24px;
        display: flex;
        justify-content: space-between;
        .tab {
            width: 236px;
            height: 80px;
            background: #f3f6f9;
            border-radius: 4px 4px 0px 0px;
            padding: 20px;
            display: flex;
            align-items: center;
            .number {
                width: 27.81px;
                height: 35px;
                background: #e5eaee;
                border-radius: 4px;
                font-weight: 600;
                font-size: 16px;
                color: #3699ff;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-left: 8px;
            }
            .span-1 {
                font-weight: 600;
                font-size: 14px;
                text-align: right;
                color: #464e5f;
                display: block;
            }
            .span-2 {
                font-weight: 400;
                font-size: 13px;
                text-align: right;
                display: block;
                color: #464e5f;
            }
        }
        .active {
            background-color: #fff;
            .number {
                background: #3699ff;
                color: #fff;
            }
        }
    }
    .row-inp {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 18px;
        flex-wrap: wrap;
        .star {
            color: red;
            display: inline;
        }
        label {
            display: flex;
            flex-direction: column;
        }
        span {
            font-weight: 400;
            font-size: 13px;
            line-height: 20px;
            color: #464e5f;
            display: block;
            margin-bottom: 3px;
        }
        select,
        input {
            background: #f3f6f9;
            border-radius: 4px;
            border: none;
            outline: none;
            font-weight: 400;
            font-size: 14px;
            height: 44px;
            width: 309.95px;
            padding: 0 12px;
            text-align: right;
            color: #464e5f;
            @media (max-width: 1450px) {
                max-width: 95%;
            }
        }
        select {
            -webkit-appearance: none;
            -moz-appearance: none;
            background-image: url("data:image/svg+xml;utf8,<svg fill='black' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
            background-repeat: no-repeat;
            background-position-x: 10px;
            background-position-y: 8px;
        }
        small {
            font-weight: 400;
            font-size: 12px;
            line-height: 18px;
            margin-top: 5px;

            color: #b5b5c3;

            opacity: 0.8;
        }
    }
    .btns {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        .cancle {
            font-weight: 500;
            font-size: 15px;
            line-height: 18px;
            text-align: center;
            cursor: pointer;
            color: #b5b5c3;
            margin-left: 33px;
        }
        button {
            width: 103.72px;
            height: 43px;
            background: #3699ff;
            border-radius: 4px;
            font-weight: 600;
            font-size: 13px;
            line-height: 20px;
            color: #ffffff;
        }
    }
    .star {
        color: red !important;
    }
    .images {
        display: flex;
        flex-wrap: wrap;
        span {
            font-weight: 400;
            font-size: 13px;
            line-height: 20px;
            text-align: right;
            color: #464e5f;
        }
        .rows {
            width: 100%;
            display: flex;
            justify-content: space-between;
        }
        .marl {
            margin-left: 29px;
        }
        .bb {
            margin-top: 24px;
        }
        .box {
            margin-top: 4px;
            width: 305px;
            height: 150px;
            background: #eff2f5;
            border-radius: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
            input {
                display: none;
            }
            .select {
                width: 103.72px !important;
                height: 43px !important;
                padding: 9px 16px;
                background: #3699ff;
                border-radius: 4px;
                font-weight: 600;
                font-size: 13px;
                color: #ffffff;
                cursor: pointer;
            }
        }
        small {
            font-weight: 400;
            font-size: 12px;
            line-height: 18px;
            color: #b5b5c3;
            opacity: 0.8;
            margin-top: 8px;
        }
    }
`;

const AddDriver = (props) => {
    const [birthday, setBirthday] = useState(new Date());
    function handleBirthday(vals) {
        setBirthday(vals.toDate());
    }

    const [bimeh, setBimeh] = useState(new Date());
    function handleBimeh(vals) {
        setBimeh(vals.toDate());
    }

    const [step, setStep] = useState(1);
    return (
        <Main>
            <div className="head">
                <h6>???????????? ???????????? ????????</h6>
                <span
                    className="close"
                    onClick={() => {
                        props.setshow(false);
                    }}
                >
                    ????????
                </span>
            </div>
            <div className="tabs">
                <div className={step == 1 ? "tab active" : "tab"}>
                    <div className="d-flex">
                        <div className="number">1</div>
                        <div>
                            <span className="span-1">?????????????? ????????</span>
                            <span className="span-2">?????? ?????????????? ??????????</span>
                        </div>
                    </div>
                </div>
                <div className={step == 2 ? "tab active" : "tab"}>
                    <div className="d-flex">
                        <div className="number">2</div>
                        <div>
                            <span className="span-1">???????????? ??????????</span>
                            <span className="span-2">?????? ???????????? ??????????</span>
                        </div>
                    </div>
                </div>
                <div className={step == 3 ? "tab active" : "tab"}>
                    <div className="d-flex">
                        <div className="number">3</div>
                        <div>
                            <span className="span-1">???????????????? ??????????</span>
                            <span className="span-2">
                                ???????????????? ???????????? ?? ??????????
                            </span>
                        </div>
                    </div>
                </div>
                <div className={step == 4 ? "tab active" : "tab"}>
                    <div className="d-flex">
                        <div className="number">4</div>
                        <div>
                            <span className="span-1">??????????</span>
                            <span className="span-2">?????? ?????????? ?????? ??????????</span>
                        </div>
                    </div>
                </div>
            </div>
            {step == 1 ? (
                <>
                    <div className="row-inp">
                        <label>
                            <span>
                                ?????? ???????????? <span className="star">*</span>{" "}
                            </span>
                            <input type="text" />
                            <small>???????? ?????? ???????????? ???? ???????? ????????.</small>
                        </label>
                        <label>
                            <span>?????? ???????????????? *</span>
                            <input type="text" />
                            <small>
                                ???????? ?????? ???????????????? ???????????? ???? ???????? ????????.
                            </small>
                        </label>
                        <label>
                            <span>?????? ?????? *</span>
                            <input type="text" />
                            <small>???????? ?????? ?????? ???????????? ???? ???????? ????????.</small>
                        </label>
                    </div>
                    <div className="row-inp">
                        <label>
                            <span>?????????? *</span>
                            <select name="" id="">
                                <option value="">??????</option>
                                <option value="">????</option>
                            </select>
                            <small>???????? ?????????? ???????????? ???? ???????? ????????.</small>
                        </label>
                        <label>
                            <span>???? ?????? *</span>
                            <input type="text" />
                            <small>???????? ???? ?????? ???????????? ???? ???????? ????????.</small>
                        </label>
                        <label>
                            <span>?????????? ???????? *</span>
                            <div className="date-rel">
                                <DatePicker
                                    calendar={persian}
                                    locale={persian_fa}
                                    onChange={handleBirthday}
                                    value={birthday}
                                    format="YYYY/MM/DD"
                                    calendarPosition="bottom-right"
                                    placeholder="???? ?????????? 1401.07.12"
                                />
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <rect
                                        x="-0.000732422"
                                        width="3.63627"
                                        height="3.63627"
                                        rx="1.81814"
                                        fill="#464E5F"
                                    />
                                    <rect
                                        x="5.81689"
                                        width="3.63627"
                                        height="3.63627"
                                        rx="1.81814"
                                        fill="#464E5F"
                                    />
                                    <rect
                                        x="11.6355"
                                        width="3.63627"
                                        height="3.63627"
                                        rx="1.81814"
                                        fill="#464E5F"
                                    />
                                    <rect
                                        x="11.6355"
                                        y="5.81836"
                                        width="3.63627"
                                        height="3.63627"
                                        rx="1.81814"
                                        fill="#464E5F"
                                    />
                                    <rect
                                        x="5.81689"
                                        y="5.81836"
                                        width="3.63627"
                                        height="3.63627"
                                        rx="1.81814"
                                        fill="#464E5F"
                                    />
                                    <rect
                                        x="-0.000732422"
                                        y="5.81836"
                                        width="3.63627"
                                        height="3.63627"
                                        rx="1.81814"
                                        fill="#464E5F"
                                    />
                                    <rect
                                        x="11.6355"
                                        y="12.3633"
                                        width="3.63627"
                                        height="3.63627"
                                        rx="1.81814"
                                        fill="#464E5F"
                                    />
                                    <rect
                                        x="5.81689"
                                        y="12.3633"
                                        width="3.63627"
                                        height="3.63627"
                                        rx="1.81814"
                                        fill="#464E5F"
                                    />
                                    <rect
                                        x="-0.000732422"
                                        y="12.3633"
                                        width="3.63627"
                                        height="3.63627"
                                        rx="1.81814"
                                        fill="#464E5F"
                                    />
                                </svg>
                            </div>
                            <small>???????? ?????????? ???????? ???????????? ???? ???????? ????????.</small>
                        </label>
                    </div>
                    <div className="row-inp">
                        <label>
                            <span>?????????? ???????? *</span>
                            <select name="" id="">
                                <option value="">??????????</option>
                                <option value="">????????</option>
                            </select>
                            <small>???????? ???????? ???????????? ???? ???????? ????????.</small>
                        </label>
                        <label>
                            <span>?????????? ???????? ?????????? *</span>
                            <select name="" id="">
                                <option value="">???????? ?????????? ????????</option>
                                <option value="">????????????</option>
                                <option value="">?????????? ????????</option>
                            </select>
                            <small>
                                ???????? ?????????? ???????? ?????????? ???????????? ???? ???????? ????????.
                            </small>
                        </label>
                        <label>
                            <span>?????? ?????? ???????? *</span>
                            <select name="" id="">
                                <option value="">??????</option>
                            </select>
                            <small>???????? ?????? ?????? ???????? ???? ???????? ????????.</small>
                        </label>
                    </div>
                    <div className="row-inp">
                        <label>
                            <span>?????????? ???????? ?????????? *</span>
                            <input type="text" />
                            <small>
                                ???????? ?????????? ???????? ?????????? ???????????? ???? ???????? ????????.
                            </small>
                        </label>
                        <label>
                            <span>?????????? ??????</span>
                            <input type="text" />
                            <small>???????? ?????????? ?????? ???????????? ???? ???????? ????????.</small>
                        </label>
                        <label>
                            <span>?????? ????????</span>
                            <select name="" id="">
                                <option value="">???????? ??????</option>
                                <option value="">????????</option>
                            </select>
                            <small>???????? ?????? ???????? ???????????? ???? ???????? ????????.</small>
                        </label>
                    </div>
                    <hr />
                    <div className="btns">
                        <span className="cancle">????????????</span>
                        <button
                            onClick={() => {
                                setStep(2);
                            }}
                        >
                            ??????
                        </button>
                    </div>
                </>
            ) : step == 2 ? (
                <>
                    <div className="row-inp">
                        <label>
                            <span>
                                ?????? ?????????? <span className="star">*</span>
                            </span>
                            <select name="" id="">
                                <option value="">????????</option>
                            </select>
                            <small>???????? ?????? ?????????? ???? ???????? ????????.</small>
                        </label>
                        <label>
                            <span>?????? ?????????? *</span>
                            <select name="" id="">
                                <option value="">?????? 206</option>
                            </select>
                            <small>???????? ?????? ?????????? ???? ???????? ????????. </small>
                        </label>
                        <label>
                            <span>?????? *</span>
                            <select name="" id="">
                                <option value="">????????</option>
                            </select>
                            <small>?????????????? ?????????? ???? ???????? ????????.</small>
                        </label>
                    </div>
                    <div className="row-inp">
                        <label>
                            <span>???????? *</span>
                            <input type="text" />
                            <small>???????? ???????? ?????????? ???? ???????? ????????.</small>
                        </label>
                        <label>
                            <span>?????? ???????? *</span>
                            <input type="text" />
                            <small>???????? ?????? ???????? ?????????? ???? ???????? ????????.</small>
                        </label>
                        <label>
                            <span>?????? ???????? ?????????? *</span>
                            <input type="text" />
                            <small>???????? ?????? ???????? ?????????? ???? ???????? ????????.</small>
                        </label>
                    </div>
                    <div className="row-inp">
                        <label>
                            <span>???? ?????? ???????? ?????????? *</span>
                            <input type="text" />
                            <small>???????????? ?????? ???????? ?????????? ???? ???????? ????????.</small>
                        </label>
                        <label>
                            <span>?????????? ???????? ???????? ?????? ???????? *</span>
                            <div className="date-rel">
                                <DatePicker
                                    calendar={persian}
                                    locale={persian_fa}
                                    onChange={handleBimeh}
                                    value={bimeh}
                                    format="YYYY/MM/DD"
                                    calendarPosition="bottom-right"
                                    placeholder="???? ?????????? 1401.07.12"
                                />
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <rect
                                        x="-0.000732422"
                                        width="3.63627"
                                        height="3.63627"
                                        rx="1.81814"
                                        fill="#464E5F"
                                    />
                                    <rect
                                        x="5.81689"
                                        width="3.63627"
                                        height="3.63627"
                                        rx="1.81814"
                                        fill="#464E5F"
                                    />
                                    <rect
                                        x="11.6355"
                                        width="3.63627"
                                        height="3.63627"
                                        rx="1.81814"
                                        fill="#464E5F"
                                    />
                                    <rect
                                        x="11.6355"
                                        y="5.81836"
                                        width="3.63627"
                                        height="3.63627"
                                        rx="1.81814"
                                        fill="#464E5F"
                                    />
                                    <rect
                                        x="5.81689"
                                        y="5.81836"
                                        width="3.63627"
                                        height="3.63627"
                                        rx="1.81814"
                                        fill="#464E5F"
                                    />
                                    <rect
                                        x="-0.000732422"
                                        y="5.81836"
                                        width="3.63627"
                                        height="3.63627"
                                        rx="1.81814"
                                        fill="#464E5F"
                                    />
                                    <rect
                                        x="11.6355"
                                        y="12.3633"
                                        width="3.63627"
                                        height="3.63627"
                                        rx="1.81814"
                                        fill="#464E5F"
                                    />
                                    <rect
                                        x="5.81689"
                                        y="12.3633"
                                        width="3.63627"
                                        height="3.63627"
                                        rx="1.81814"
                                        fill="#464E5F"
                                    />
                                    <rect
                                        x="-0.000732422"
                                        y="12.3633"
                                        width="3.63627"
                                        height="3.63627"
                                        rx="1.81814"
                                        fill="#464E5F"
                                    />
                                </svg>
                            </div>
                            <small>
                                ???????? ?????????? ???????? ???????? ?????? ???????? ???? ???????? ????????.
                            </small>
                        </label>
                        <label>
                            <span>?????????? ???????????? ??????*</span>
                            <div className="date-rel">
                                <DatePicker
                                    calendar={persian}
                                    locale={persian_fa}
                                    onChange={handleBirthday}
                                    value={birthday}
                                    format="YYYY/MM/DD"
                                    calendarPosition="bottom-right"
                                    placeholder="???? ?????????? 1401.07.12"
                                />
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <rect
                                        x="-0.000732422"
                                        width="3.63627"
                                        height="3.63627"
                                        rx="1.81814"
                                        fill="#464E5F"
                                    />
                                    <rect
                                        x="5.81689"
                                        width="3.63627"
                                        height="3.63627"
                                        rx="1.81814"
                                        fill="#464E5F"
                                    />
                                    <rect
                                        x="11.6355"
                                        width="3.63627"
                                        height="3.63627"
                                        rx="1.81814"
                                        fill="#464E5F"
                                    />
                                    <rect
                                        x="11.6355"
                                        y="5.81836"
                                        width="3.63627"
                                        height="3.63627"
                                        rx="1.81814"
                                        fill="#464E5F"
                                    />
                                    <rect
                                        x="5.81689"
                                        y="5.81836"
                                        width="3.63627"
                                        height="3.63627"
                                        rx="1.81814"
                                        fill="#464E5F"
                                    />
                                    <rect
                                        x="-0.000732422"
                                        y="5.81836"
                                        width="3.63627"
                                        height="3.63627"
                                        rx="1.81814"
                                        fill="#464E5F"
                                    />
                                    <rect
                                        x="11.6355"
                                        y="12.3633"
                                        width="3.63627"
                                        height="3.63627"
                                        rx="1.81814"
                                        fill="#464E5F"
                                    />
                                    <rect
                                        x="5.81689"
                                        y="12.3633"
                                        width="3.63627"
                                        height="3.63627"
                                        rx="1.81814"
                                        fill="#464E5F"
                                    />
                                    <rect
                                        x="-0.000732422"
                                        y="12.3633"
                                        width="3.63627"
                                        height="3.63627"
                                        rx="1.81814"
                                        fill="#464E5F"
                                    />
                                </svg>
                            </div>
                            <small>
                                ???????? ?????????? ???????????? ?????? ?????????? ???? ???????? ????????.
                            </small>
                        </label>
                    </div>
                    <hr />
                    <div className="btns">
                        <span
                            className="cancle"
                            onClick={() => {
                                setStep(1);
                            }}
                        >
                            ????????????
                        </span>
                        <button
                            onClick={() => {
                                setStep(3);
                            }}
                        >
                            ??????
                        </button>
                    </div>
                </>
            ) : step == 3 ? (
                <>
                    <div className="images">
                        <div className="rows">
                            <div className="bb">
                                <span>
                                    ?????????? ???????????? <span className="star">*</span>
                                </span>
                                <div className="box">
                                    <label>
                                        <span className="select">
                                            ???????????? ????????
                                        </span>
                                        <input type="file" />
                                    </label>
                                </div>
                                <small>
                                    ???????? ?????????? ???????????? ???? ???????????????? ????????.
                                </small>
                            </div>
                            <div className="bb">
                                <span>
                                    ?????????? ???????? ??????????{" "}
                                    <span className="star">*</span>
                                </span>
                                <div className="box">
                                    <label>
                                        <input type="file" />
                                        <span className="select">
                                            ???????????? ????????
                                        </span>
                                    </label>
                                </div>
                                <small>
                                    ???????? ?????????? ???????? ?????????? ???? ???????????????? ????????.
                                </small>
                            </div>
                            <div className="bb">
                                <span>
                                    ?????????? ???????? ???????? ?????? ????????{" "}
                                    <span className="star">*</span>
                                </span>
                                <div className="box">
                                    <label>
                                        <input type="file" />
                                        <span className="select">
                                            ???????????? ????????
                                        </span>
                                    </label>
                                </div>
                                <small>
                                    ???????? ?????????? ???????? ???????? ?????? ???????? ???? ????????????????
                                    ????????.
                                </small>
                            </div>
                        </div>
                        <div className="d-flex">
                            <div className="bb">
                                <span>
                                    ?????????? ???????????? ?????? ??????????{" "}
                                    <span className="star">*</span>
                                </span>
                                <div className="box marl">
                                    <label>
                                        <input type="file" />
                                        <span className="select">
                                            ???????????? ????????
                                        </span>
                                    </label>
                                </div>
                                <small>
                                    ???????? ?????????? ???????????? ?????? ?????????? ???? ????????????????
                                    ????????.
                                </small>
                            </div>
                            <div className="bb">
                                <span>
                                    ?????????? ?????????? ?????? ?????? ????????????{" "}
                                    <span className="star">*</span>
                                </span>
                                <div className="box">
                                    <label>
                                        <input type="file" />
                                        <span className="select">
                                            ???????????? ????????
                                        </span>
                                    </label>
                                </div>
                                <small>
                                    ???????? ?????????? ?????????? ?????? ?????? ???????????? ???? ????????????????
                                    ????????.
                                </small>
                            </div>
                        </div>
                    </div>
                    <div className="btns">
                        <span
                            className="cancle"
                            onClick={() => {
                                setStep(2);
                            }}
                        >
                            ????????????
                        </span>
                        <button
                            onClick={() => {
                                setStep(4);
                            }}
                        >
                            ??????
                        </button>
                    </div>
                </>
            ) : (
                <>
                     <div className="row-inp">
                        <label>
                            <span>
                            ?????????? *
                            </span>
                            <select name="" id="">
                                <option value="">
                                    ??????
                                </option>
                            </select>
                            <small>???????? ?????? ?????????? ???? ???????? ????????.</small>
                        </label>
                        <label>
                            <span>?????? *</span>
                            <select name="" id="">
                                <option value="">
                                    ??????
                                </option>
                            </select>
                            <small>
                            ???????? ?????? ?????? ?????????? ???? ???????? ????????.
                            </small>
                        </label>
                        <label>
                            <span>???????? ???????? *</span>
                            <input type="text" />
                            <small>???????? ?????????? ???????? ????????  ???? ???????? ????????.</small>
                        </label>
                        <label className="w-100 mt-2">
                            <span>?????????? *</span>
                            <input className="w-100" type="text" />
                            <small>???????? ?????????? ???? ???????? ????????.</small>
                        </label>

                    </div>
                        <div>Map</div>
                        <div className="btns">
                        <span
                            className="cancle"
                            onClick={() => {
                                setStep(3);
                            }}
                        >
                            ????????????
                        </span>
                        <button
                            onClick={() => {
                                props.setshow(false)
                            }}
                        >
                            ??????
                        </button>
                    </div>
                </>
            )}
        </Main>
    );
};

export default AddDriver;
