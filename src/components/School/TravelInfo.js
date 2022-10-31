import React, { useState } from "react";
import styled from "styled-components";

const Detail = styled.div`
    background-color: #fff;
    width: 100%;
    padding: 30px;
    .tit {
        font-weight: 700;
        font-size: 20px;
        color: #999a9f;
        span {
            color: #3f4254;
            margin-left: 5px;
        }
    }
    .head {
        button {
            width: 139.83px;
            height: 36px;
            background: #f3f6f9;
            border-radius: 6px;
            font-weight: 400;
            font-size: 12px;
            line-height: 14px;
            color: #a1a5b7;
            svg {
                margin-left: 16px;
            }
        }
    }
    .line {
        display: flex;
        align-items: center;
        white-space: nowrap;
        hr {
            background-color: #b5b5c3;
            width: 100%;
        }
        span {
            font-size: 12px;
            line-height: 14px;
            text-align: right;
            letter-spacing: 0.005em;
            font-weight: 600;
            color: #2b2b2b;
            margin-left: 8px;
        }
    }
    .info-div {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .img-div {
            display: flex;
            align-items: center;
            img {
                border-radius: 6px;
                margin-left: 14px;
            }
            span {
                display: block;
            }
            .span-1 {
                font-weight: 400;
                font-size: 14px;
                text-align: right;
                color: #464e5f;
                margin-bottom: 7px;
            }
            .span-2 {
                font-weight: 500;
                font-size: 14px;
                text-align: right;
                color: #b5b5c3;
            }
        }
        .date {
            font-weight: 400;
            font-size: 16px;
            line-height: 21px;
            text-align: right;
            color: #3699ff;
        }
        .stts {
            width: 116px;
            height: 32px;
            background: #eee5ff;
            border-radius: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 400;
            font-size: 12px;
            line-height: 14px;
            text-align: center;
            color: #8950fc;
        }
        button {
            width: 111.69px;
            height: 32px;
            background: #f3f6f9;
            border-radius: 6px;
            font-weight: 400;
            font-size: 12px;
            line-height: 14px;
            color: #a1a5b7;
        }
    }
    .alert {
        color: #f1416c;
        font-weight: 400;
        font-size: 13px;
        margin-bottom: 0;
    }
`;

const TableDiv = styled.div`
    width: 100%;
    padding: 26px 27px;
    background: #ffffff;
    border-radius: 12px;
    margin-top: 20px;
    .amount-span {
        font-weight: 600;
        font-size: 14px;
        line-height: 21px;
        margin-top: 20px;
        color: #464e5f;
    }
    .head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-bottom: 10px;
        border-bottom: 1px solid #eff2f5;
        margin-bottom: 10px;
        border-radius: 0 !important;

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
            button {
                border-radius: 6px;
                height: 35px;
                padding: 10px 14px;
                background-color: #f3f6f9;
                font-weight: 400;
                font-size: 12px;
                line-height: 14px;
                color: #a1a5b7;
                span {
                    margin-right: 10px;
                }
            }
            .active {
                background: #1bc5bd;
                border-radius: 6px;
                color: #fff;
            }
        }
    }
    .title {
        display: flex;
        justify-content: space-between;
        width: 100%;
        button {
            width: 139.83px;
            height: 36px;
            background: #f3f6f9;
            border-radius: 6px;
            font-weight: 400;
            font-size: 12px;
            line-height: 14px;
            color: #a1a5b7;
            svg {
                margin-left: 14px;
            }
        }
    }
    table {
        width: 100%;
        .img-div {
            display: flex;
            align-items: center;
            .span-1 {
                font-weight: 400;
                font-size: 14px;
                line-height: 21px;
                text-align: right;

                color: #464e5f;
            }
            .span-2 {
                font-weight: 700;
                font-size: 13px;
                line-height: 20px;
                text-align: right;
                color: #b5b5c3;
            }
        }
        .check-boxs {
            display: flex;
            label {
                display: flex;
                align-items: center;
                margin-left: 16px;
                input {
                    transform: scale(1.3);
                    margin-right: 4px;
                }
                font-weight: 400;
                font-size: 14px;
                line-height: 21px;
                text-align: right;
                color: #464e5f;
            }
        }
        .prof-btn {
            width: 125.69px;
            height: 32px;
            background: #f3f6f9;
            border-radius: 6px;
            svg {
                margin-bottom: 5px;
            }
        }
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
                border-bottom: 1px dashed #e4e6ef;

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
        .status {
            width: 103px;
            height: 32px;
            background: #fff8dd;
            border-radius: 6px;
            font-weight: 400;
            font-size: 12px;
            line-height: 14px;
            text-align: center;
            color: #f1bc00;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .w-120 {
            width: 124.69px;
        }
        .w-78 {
            width: 78px;
        }
    }
`;

const Events = styled.div`
    padding: 19px 34px;
    width: 100%;
    background: #ffffff;
    border-radius: 12px;
    margin-top: 30px;
    .head {
        margin-bottom: 19px;
        display: flex;
        justify-content: space-between;
        width: 100%;
        border-bottom: 1px solid #eff2f5;
        padding-bottom: 15px;
        .date {
            display: flex;
            align-items: center;
            font-weight: 600;
            font-size: 20px;
            line-height: 30px;
            color: #3f4254;
            svg {
                margin-right: 10px;
                margin-bottom: 3px;
            }
        }
    }
    .event {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        .right {
            display: flex;
            .mar-y-4 {
                margin: 4px 0;
            }
            .span-1 {
                font-weight: 400;
                font-size: 16px;
                text-align: right;
                color: #3f4254;
                display: block;
                margin-top: -5px;
            }
            .span-2 {
                margin-top: 4px;
                font-weight: 400;
                display: block;
                font-size: 14px;
                text-align: right;
                color: #b5b5c3;
            }
            svg {
                margin-left: 14px;
            }
            .blue {
                font-weight: 400;
                font-size: 16px;
                line-height: 19px;
                text-align: right;
                color: #00a3ff;
            }
        }
        .left {
            display: flex;
            button {
                svg {
                    margin-right: 4px;
                }
                margin-right: 10px;
                width: 148px;
                height: 34px;
                background: #f5f8fa;
                border-radius: 6px;
                font-weight: 700;
                font-size: 12px;
                line-height: 14px;
                text-align: center;
                color: #a1a5b7;
            }
        }
    }
    .empty-div {
        margin-right: 50px;
        background: rgba(245, 248, 250, 0.2);
        border: 1px solid rgba(228, 230, 239, 0.7);
        border-radius: 6px;
        width: calc(100% - 50px);
        height: 73px;
        margin-top: 20px;
    }
    .end-div {
        width: calc(100% - 80px);
        margin-top: 20px;
        margin-right: 60px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .img-div {
            display: flex;
            align-items: center;
            .span-1 {
                font-weight: 400;
                font-size: 14px;
                line-height: 21px;
                text-align: right;
                display: block;
                color: #464e5f;
                margin-right: 15px;
            }
            .span-2 {
                font-weight: 700;
                font-size: 13px;
                line-height: 20px;
                text-align: right;
                display: block;
                color: #b5b5c3;
                margin-right: 15px;
                margin-top: 5px;
            }
        }
        .btns {
            display: flex;
            align-items: center;
            button {
                height: 32px;
                padding: 0 10px;
                background: #f3f6f9;
                border-radius: 6px;
                margin-right: 10px;
            }
        }
    }
`;

const ReplacedService = styled.div`
    background-color: #fff;
    width: 100%;
    padding: 27px;
    background: #ffffff;
    border-radius: 12px;
    .head {
        border-bottom: 1px solid #eff2f5;
        padding-bottom: 10px;
        display: flex;
        justify-content: space-between;
        h6 {
            font-weight: 600;
            font-size: 20px;
            line-height: 30px;
            color: #3f4254;
        }
        button {
            width: 157px;
            height: 32px;
            background: #f3f6f9;
            border-radius: 6px;
            font-weight: 700;
            font-size: 12px;
            line-height: 14px;
            color: #a1a5b7;
            svg {
                margin-right: 4px;
                margin-bottom: 3px;
            }
        }
    }
    .row-inp {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 18px;
        flex-wrap: wrap;
        label {
            display: flex;
            flex-direction: column;
            position: relative;
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
            width: 359.95px;
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
        .abs-span {
            position: absolute;
            left: 20px;
            top: 33px;
        }
    }
    .titr {
        font-weight: 700;
        font-size: 14px;
        line-height: 16px;
        text-align: right;
        color: #5e6278;
        margin: 26px 0;
    }
    .radio-row {
        display: flex;
        label {
            display: flex;
            align-items: center;
            margin-left: 34px;
            input {
                transform: scale(1.4);
                margin-left: 10px;
            }
        }
    }
    .buttons {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin-top: 23px;
        .cancle {
            background-color: transparent;
            font-weight: 500;
            font-size: 15px;
            line-height: 18px;
            text-align: center;
            color: #b5b5c3;
        }
        .submit {
            width: 136px;
            height: 42px;
            background: #00a3ff;
            border-radius: 6px;
            font-weight: 500;
            font-size: 15px;
            line-height: 18px;
            margin-right: 23px;
            text-align: center;

            color: #ffffff;
        }
    }
`;

const TravelInfo = () => {
    const [activeTab, setActiveTab] = useState(false);
    return (
        <>
            {!activeTab ? (
                <>
                    <Detail>
                        <div className="d-flex head justify-content-between">
                            <div className="tit">
                                <span>سفر</span>
                                44232#
                            </div>
                            <button>
                                <svg
                                    width="17"
                                    height="16"
                                    viewBox="0 0 17 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M15.2943 11.8595C15.6134 12.1629 16.1405 11.9355 16.1389 11.4952L16.1285 8.73684V3.68421C16.1285 2.75405 15.3355 2 14.3573 2H6.09155C5.11332 2 4.32031 2.75405 4.32031 3.68421V6H8.21799C9.87484 6 11.218 7.34315 11.218 9V10.4211H13.7816L15.2943 11.8595Z"
                                        fill="#3699FF"
                                    />
                                    <path
                                        opacity="0.3"
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M1.3916 11.9997V8.66634C1.3916 7.92996 2.0194 7.33301 2.79383 7.33301H8.40274C9.17717 7.33301 9.80497 7.92996 9.80497 8.66634V11.9997C9.80497 12.7361 9.17717 13.333 8.40274 13.333H2.87497L2.24648 13.905C1.92536 14.1973 1.40994 13.9694 1.40994 13.5352V12.2158C1.39787 12.1455 1.3916 12.0733 1.3916 11.9997ZM4.20653 9.66634C4.20653 9.48225 4.35577 9.33301 4.53986 9.33301H8.07988C8.26397 9.33301 8.41321 9.48225 8.41321 9.66634C8.41321 9.85044 8.26397 9.99967 8.07988 9.99967H4.53986C4.35577 9.99967 4.20653 9.85044 4.20653 9.66634ZM6.6432 10.6663C6.45911 10.6663 6.30987 10.8156 6.30987 10.9997C6.30987 11.1838 6.45911 11.333 6.6432 11.333H8.07988C8.26398 11.333 8.41321 11.1838 8.41321 10.9997C8.41321 10.8156 8.26398 10.6663 8.07988 10.6663H6.6432Z"
                                        fill="#3699FF"
                                    />
                                </svg>
                                سرویس جایگزین
                            </button>
                        </div>
                        <div className="line">
                            <span>اطلاعات سرویس</span>
                            <hr />
                        </div>
                        <div className="info-div">
                            <div className="img-div">
                                <img src="/images/pm.png" alt="" />
                                <div>
                                    <span className="span-1">
                                        دبیرستان دخترانه فرزانگان
                                    </span>
                                    <span className="span-2">
                                        دخترانه دوره اول
                                    </span>
                                </div>
                            </div>
                            <div className="img-div">
                                <img src="/images/pm.png" alt="" />
                                <div>
                                    <span className="span-1">
                                        دبیرستان دخترانه فرزانگان
                                    </span>
                                    <span className="span-2">
                                        دخترانه دوره اول
                                    </span>
                                </div>
                            </div>
                            <div className="img-div">
                                <div>
                                    <span className="span-1">
                                        پژو 206 - سفید
                                    </span>
                                    <span className="span-2">
                                        54 ایران 24 ص 543
                                    </span>
                                </div>
                            </div>
                            <div className="img-div">
                                <div>
                                    <span className="span-1">08:00</span>
                                    <span className="span-2">سرویس رفت</span>
                                </div>
                            </div>
                        </div>
                        <div className="line">
                            <span>جزئیات سفر</span>
                            <hr />
                        </div>
                        <div className="info-div">
                            <div className="img-div">
                                <div>
                                    <span className="span-1">07:31</span>
                                    <span className="span-2">شروع سفر</span>
                                </div>
                            </div>
                            <div className="img-div">
                                <div>
                                    <span className="span-1">--:--</span>
                                    <span className="span-2">پایان سفر</span>
                                </div>
                            </div>
                            <div className="date">1401/07/20</div>
                            <div className="stts">در حال انجام</div>
                        </div>
                        <div className="line">
                            <span>توضیحات</span>
                            <hr />
                        </div>
                        <div className="alert">
                            راننده و خودروی این سفر در تاریخ 1401.07.21 ساعت
                            18:01 تغییر کرد.
                        </div>
                        <div className="info-div">
                            <div className="img-div">
                                <img src="/images/pm.png" alt="" />
                                <div>
                                    <span className="span-1">
                                        علی اکبر کریمی
                                    </span>
                                    <span className="span-2">09123456789</span>
                                </div>
                            </div>
                            <div className="img-div">
                                <div>
                                    <span className="span-1">سمند - سفید</span>
                                    <span className="span-2">
                                        54 ایران 34 ص 543
                                    </span>
                                </div>
                            </div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </Detail>
                    <TableDiv>
                        <div className="head">
                            <div className="title mb-2">
                                <span>دانش آموزان سفر</span>
                                <button
                                    onClick={() => {
                                        setActiveTab(true);
                                    }}
                                >
                                    <svg
                                        width="17"
                                        height="16"
                                        viewBox="0 0 17 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M15.2943 11.8595C15.6134 12.1629 16.1405 11.9355 16.1389 11.4952L16.1285 8.73684V3.68421C16.1285 2.75405 15.3355 2 14.3573 2H6.09155C5.11332 2 4.32031 2.75405 4.32031 3.68421V6H8.21799C9.87484 6 11.218 7.34315 11.218 9V10.4211H13.7816L15.2943 11.8595Z"
                                            fill="#3699FF"
                                        />
                                        <path
                                            opacity="0.3"
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M1.3916 11.9997V8.66634C1.3916 7.92996 2.0194 7.33301 2.79383 7.33301H8.40274C9.17717 7.33301 9.80497 7.92996 9.80497 8.66634V11.9997C9.80497 12.7361 9.17717 13.333 8.40274 13.333H2.87497L2.24648 13.905C1.92536 14.1973 1.40994 13.9694 1.40994 13.5352V12.2158C1.39787 12.1455 1.3916 12.0733 1.3916 11.9997ZM4.20653 9.66634C4.20653 9.48225 4.35577 9.33301 4.53986 9.33301H8.07988C8.26397 9.33301 8.41321 9.48225 8.41321 9.66634C8.41321 9.85044 8.26397 9.99967 8.07988 9.99967H4.53986C4.35577 9.99967 4.20653 9.85044 4.20653 9.66634ZM6.6432 10.6663C6.45911 10.6663 6.30987 10.8156 6.30987 10.9997C6.30987 11.1838 6.45911 11.333 6.6432 11.333H8.07988C8.26398 11.333 8.41321 11.1838 8.41321 10.9997C8.41321 10.8156 8.26398 10.6663 8.07988 10.6663H6.6432Z"
                                            fill="#3699FF"
                                        />
                                    </svg>
                                    سرویس جایگزین
                                </button>
                            </div>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>نام دانش آموز</th>
                                    <th>وضعیت</th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th>عملیات</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <div className="img-div">
                                            <img
                                                width={50}
                                                height={50}
                                                src="/images/pm.png"
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
                                        <div className="status">
                                            در انتظار سرویس
                                        </div>
                                    </td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>
                                        <button className="prof-btn">
                                            مشاهده پروفایل
                                            <svg
                                                width="20"
                                                height="20"
                                                viewBox="0 0 20 20"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M12.6993 5.65705C13.0197 5.33662 13.0197 4.8171 12.6993 4.49667C12.3788 4.17624 11.8593 4.17624 11.5389 4.49667L6.61581 9.41975C6.30518 9.73038 6.29431 10.2305 6.59116 10.5544L11.104 15.4775C11.4102 15.8115 11.9292 15.8341 12.2633 15.5279C12.5973 15.2216 12.6199 14.7026 12.3137 14.3686L8.3317 10.0246L12.6993 5.65705Z"
                                                    fill="#3699FF"
                                                />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </TableDiv>
                    <Events>
                        <div className="head">
                            <h6>رویدادهای سفر (12)</h6>
                            <div className="date">
                                <span>1401.07.24</span>
                                <svg
                                    width="24"
                                    height="25"
                                    viewBox="0 0 24 25"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        opacity="0.25"
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M2.36899 6.98325C2.65912 4.78645 4.34504 3.10053 6.54184 2.8104C8.05208 2.61094 9.94127 2.44141 12 2.44141C14.0587 2.44141 15.9479 2.61094 17.4582 2.8104C19.655 3.10053 21.3409 4.78645 21.631 6.98325C21.8305 8.49349 22 10.3827 22 12.4414C22 14.5001 21.8305 16.3893 21.631 17.8996C21.3409 20.0964 19.655 21.7823 17.4582 22.0724C15.9479 22.2719 14.0587 22.4414 12 22.4414C9.94127 22.4414 8.05208 22.2719 6.54184 22.0724C4.34504 21.7823 2.65912 20.0964 2.36899 17.8996C2.16953 16.3893 2 14.5001 2 12.4414C2 10.3827 2.16953 8.49349 2.36899 6.98325Z"
                                        fill="#00A3FF"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M9 8.44141C9 8.99369 8.55228 9.44141 8 9.44141C7.44772 9.44141 7 8.99369 7 8.44141C7 7.88912 7.44772 7.44141 8 7.44141C8.55228 7.44141 9 7.88912 9 8.44141ZM13 8.44141C13 8.99369 12.5523 9.44141 12 9.44141C11.4477 9.44141 11 8.99369 11 8.44141C11 7.88912 11.4477 7.44141 12 7.44141C12.5523 7.44141 13 7.88912 13 8.44141ZM16 9.44141C16.5523 9.44141 17 8.99369 17 8.44141C17 7.88912 16.5523 7.44141 16 7.44141C15.4477 7.44141 15 7.88912 15 8.44141C15 8.99369 15.4477 9.44141 16 9.44141Z"
                                        fill="#00A3FF"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M9 12.4414C9 12.9937 8.55228 13.4414 8 13.4414C7.44772 13.4414 7 12.9937 7 12.4414C7 11.8891 7.44772 11.4414 8 11.4414C8.55228 11.4414 9 11.8891 9 12.4414ZM13 12.4414C13 12.9937 12.5523 13.4414 12 13.4414C11.4477 13.4414 11 12.9937 11 12.4414C11 11.8891 11.4477 11.4414 12 11.4414C12.5523 11.4414 13 11.8891 13 12.4414ZM16 13.4414C16.5523 13.4414 17 12.9937 17 12.4414C17 11.8891 16.5523 11.4414 16 11.4414C15.4477 11.4414 15 11.8891 15 12.4414C15 12.9937 15.4477 13.4414 16 13.4414Z"
                                        fill="#00A3FF"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M9 16.4414C9 16.9937 8.55228 17.4414 8 17.4414C7.44772 17.4414 7 16.9937 7 16.4414C7 15.8891 7.44772 15.4414 8 15.4414C8.55228 15.4414 9 15.8891 9 16.4414ZM13 16.4414C13 16.9937 12.5523 17.4414 12 17.4414C11.4477 17.4414 11 16.9937 11 16.4414C11 15.8891 11.4477 15.4414 12 15.4414C12.5523 15.4414 13 15.8891 13 16.4414ZM16 17.4414C16.5523 17.4414 17 16.9937 17 16.4414C17 15.8891 16.5523 15.4414 16 15.4414C15.4477 15.4414 15 15.8891 15 16.4414C15 16.9937 15.4477 17.4414 16 17.4414Z"
                                        fill="#00A3FF"
                                    />
                                </svg>
                            </div>
                        </div>
                        <div className="event">
                            <div className="right">
                                <div className="d-flex flex-column align-items-center">
                                    <div>
                                        <svg
                                            width="36"
                                            height="37"
                                            viewBox="0 0 36 37"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <rect
                                                y="0.441406"
                                                width="36"
                                                height="36"
                                                rx="18"
                                                fill="#EFF2F5"
                                            />
                                            <path
                                                opacity="0.3"
                                                d="M18.0002 17.7747C16.5274 17.7747 15.3335 16.5808 15.3335 15.1081C15.3335 13.6353 16.5274 12.4414 18.0002 12.4414C19.4729 12.4414 20.6668 13.6353 20.6668 15.1081C20.6668 16.5808 19.4729 17.7747 18.0002 17.7747Z"
                                                fill="#7E8299"
                                            />
                                            <path
                                                d="M12.0004 23.9079C12.2588 20.7261 14.8413 19.1084 17.9889 19.1084C21.1808 19.1084 23.8033 20.6372 23.9986 23.9084C24.0064 24.0387 23.9986 24.4417 23.4978 24.4417C21.0274 24.4417 17.3565 24.4417 12.485 24.4417C12.3178 24.4417 11.9864 24.0812 12.0004 23.9079Z"
                                                fill="#7E8299"
                                            />
                                        </svg>
                                    </div>
                                    <div className="mar-y-4">
                                        <svg
                                            width="2"
                                            height="56"
                                            viewBox="0 0 2 56"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <rect
                                                x="0.5"
                                                y="0.941406"
                                                width="1"
                                                height="54"
                                                rx="0.5"
                                                stroke="#E4E6EF"
                                                stroke-dasharray="4 4"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <div>
                                    <span className="span-1">
                                        پایان سرویس دبیرستان دخترانه فرزانگان
                                    </span>
                                    <span className="span-2">
                                        08:01 توسط{" "}
                                        <span className="blue">
                                            حسام الدین طباطبایی
                                        </span>
                                    </span>
                                </div>
                            </div>
                            <div className="left">
                                <button>مشاهده اطلاعات کاربر</button>
                                <button>
                                    مشاهده لوکیشن
                                    <svg
                                        width="18"
                                        height="19"
                                        viewBox="0 0 18 19"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M5.24951 2.69141C3.59266 2.69141 2.24951 4.03455 2.24951 5.69141C2.24951 7.34826 3.59266 8.69141 5.24951 8.69141H12.7495C14.4064 8.69141 15.7495 7.34826 15.7495 5.69141C15.7495 4.03455 14.4064 2.69141 12.7495 2.69141H5.24951ZM6.74951 5.6914C6.74951 6.51983 6.07794 7.1914 5.24951 7.1914C4.42109 7.1914 3.74951 6.51983 3.74951 5.6914C3.74951 4.86298 4.42109 4.1914 5.24951 4.1914C6.07794 4.1914 6.74951 4.86298 6.74951 5.6914Z"
                                            fill="#3699FF"
                                        />
                                        <path
                                            opacity="0.3"
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M5.24951 10.1914C3.59266 10.1914 2.24951 11.5346 2.24951 13.1914C2.24951 14.8483 3.59266 16.1914 5.24951 16.1914H12.7495C14.4064 16.1914 15.7495 14.8483 15.7495 13.1914C15.7495 11.5346 14.4064 10.1914 12.7495 10.1914H5.24951ZM14.2495 13.1914C14.2495 14.0198 13.5779 14.6914 12.7495 14.6914C11.9211 14.6914 11.2495 14.0198 11.2495 13.1914C11.2495 12.363 11.9211 11.6914 12.7495 11.6914C13.5779 11.6914 14.2495 12.363 14.2495 13.1914Z"
                                            fill="#3699FF"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="event">
                            <div className="right">
                                <div className="d-flex flex-column align-items-center">
                                    <div>
                                        <svg
                                            width="36"
                                            height="37"
                                            viewBox="0 0 36 37"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <rect
                                                y="0.441406"
                                                width="36"
                                                height="36"
                                                rx="18"
                                                fill="#EFF2F5"
                                            />
                                            <path
                                                opacity="0.3"
                                                d="M18.0002 17.7747C16.5274 17.7747 15.3335 16.5808 15.3335 15.1081C15.3335 13.6353 16.5274 12.4414 18.0002 12.4414C19.4729 12.4414 20.6668 13.6353 20.6668 15.1081C20.6668 16.5808 19.4729 17.7747 18.0002 17.7747Z"
                                                fill="#7E8299"
                                            />
                                            <path
                                                d="M12.0004 23.9079C12.2588 20.7261 14.8413 19.1084 17.9889 19.1084C21.1808 19.1084 23.8033 20.6372 23.9986 23.9084C24.0064 24.0387 23.9986 24.4417 23.4978 24.4417C21.0274 24.4417 17.3565 24.4417 12.485 24.4417C12.3178 24.4417 11.9864 24.0812 12.0004 23.9079Z"
                                                fill="#7E8299"
                                            />
                                        </svg>
                                    </div>
                                    <div className="mar-y-4">
                                        <svg
                                            width="2"
                                            height="56"
                                            viewBox="0 0 2 56"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <rect
                                                x="0.5"
                                                y="0.941406"
                                                width="1"
                                                height="54"
                                                rx="0.5"
                                                stroke="#E4E6EF"
                                                stroke-dasharray="4 4"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <div>
                                    <span className="span-1">
                                        پایان سرویس دبیرستان دخترانه فرزانگان
                                    </span>
                                    <span className="span-2">
                                        08:01 توسط{" "}
                                        <span className="blue">
                                            حسام الدین طباطبایی
                                        </span>
                                    </span>
                                </div>
                            </div>
                            <div className="left">
                                <button>مشاهده اطلاعات کاربر</button>
                                <button>
                                    مشاهده لوکیشن
                                    <svg
                                        width="18"
                                        height="19"
                                        viewBox="0 0 18 19"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M5.24951 2.69141C3.59266 2.69141 2.24951 4.03455 2.24951 5.69141C2.24951 7.34826 3.59266 8.69141 5.24951 8.69141H12.7495C14.4064 8.69141 15.7495 7.34826 15.7495 5.69141C15.7495 4.03455 14.4064 2.69141 12.7495 2.69141H5.24951ZM6.74951 5.6914C6.74951 6.51983 6.07794 7.1914 5.24951 7.1914C4.42109 7.1914 3.74951 6.51983 3.74951 5.6914C3.74951 4.86298 4.42109 4.1914 5.24951 4.1914C6.07794 4.1914 6.74951 4.86298 6.74951 5.6914Z"
                                            fill="#3699FF"
                                        />
                                        <path
                                            opacity="0.3"
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M5.24951 10.1914C3.59266 10.1914 2.24951 11.5346 2.24951 13.1914C2.24951 14.8483 3.59266 16.1914 5.24951 16.1914H12.7495C14.4064 16.1914 15.7495 14.8483 15.7495 13.1914C15.7495 11.5346 14.4064 10.1914 12.7495 10.1914H5.24951ZM14.2495 13.1914C14.2495 14.0198 13.5779 14.6914 12.7495 14.6914C11.9211 14.6914 11.2495 14.0198 11.2495 13.1914C11.2495 12.363 11.9211 11.6914 12.7495 11.6914C13.5779 11.6914 14.2495 12.363 14.2495 13.1914Z"
                                            fill="#3699FF"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="event">
                            <div className="right">
                                <div className="d-flex flex-column align-items-center">
                                    <div>
                                        <svg
                                            width="36"
                                            height="37"
                                            viewBox="0 0 36 37"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <rect
                                                y="0.441406"
                                                width="36"
                                                height="36"
                                                rx="18"
                                                fill="#EFF2F5"
                                            />
                                            <path
                                                opacity="0.3"
                                                d="M18.0002 17.7747C16.5274 17.7747 15.3335 16.5808 15.3335 15.1081C15.3335 13.6353 16.5274 12.4414 18.0002 12.4414C19.4729 12.4414 20.6668 13.6353 20.6668 15.1081C20.6668 16.5808 19.4729 17.7747 18.0002 17.7747Z"
                                                fill="#7E8299"
                                            />
                                            <path
                                                d="M12.0004 23.9079C12.2588 20.7261 14.8413 19.1084 17.9889 19.1084C21.1808 19.1084 23.8033 20.6372 23.9986 23.9084C24.0064 24.0387 23.9986 24.4417 23.4978 24.4417C21.0274 24.4417 17.3565 24.4417 12.485 24.4417C12.3178 24.4417 11.9864 24.0812 12.0004 23.9079Z"
                                                fill="#7E8299"
                                            />
                                        </svg>
                                    </div>
                                    <div className="mar-y-4">
                                        <svg
                                            width="2"
                                            height="56"
                                            viewBox="0 0 2 56"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <rect
                                                x="0.5"
                                                y="0.941406"
                                                width="1"
                                                height="54"
                                                rx="0.5"
                                                stroke="#E4E6EF"
                                                stroke-dasharray="4 4"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <div>
                                    <span className="span-1">
                                        پایان سرویس دبیرستان دخترانه فرزانگان
                                    </span>
                                    <span className="span-2">
                                        08:01 توسط{" "}
                                        <span className="blue">
                                            حسام الدین طباطبایی
                                        </span>
                                    </span>
                                </div>
                            </div>
                            <div className="left">
                                <button>مشاهده اطلاعات کاربر</button>
                                <button>
                                    مشاهده لوکیشن
                                    <svg
                                        width="18"
                                        height="19"
                                        viewBox="0 0 18 19"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M5.24951 2.69141C3.59266 2.69141 2.24951 4.03455 2.24951 5.69141C2.24951 7.34826 3.59266 8.69141 5.24951 8.69141H12.7495C14.4064 8.69141 15.7495 7.34826 15.7495 5.69141C15.7495 4.03455 14.4064 2.69141 12.7495 2.69141H5.24951ZM6.74951 5.6914C6.74951 6.51983 6.07794 7.1914 5.24951 7.1914C4.42109 7.1914 3.74951 6.51983 3.74951 5.6914C3.74951 4.86298 4.42109 4.1914 5.24951 4.1914C6.07794 4.1914 6.74951 4.86298 6.74951 5.6914Z"
                                            fill="#3699FF"
                                        />
                                        <path
                                            opacity="0.3"
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M5.24951 10.1914C3.59266 10.1914 2.24951 11.5346 2.24951 13.1914C2.24951 14.8483 3.59266 16.1914 5.24951 16.1914H12.7495C14.4064 16.1914 15.7495 14.8483 15.7495 13.1914C15.7495 11.5346 14.4064 10.1914 12.7495 10.1914H5.24951ZM14.2495 13.1914C14.2495 14.0198 13.5779 14.6914 12.7495 14.6914C11.9211 14.6914 11.2495 14.0198 11.2495 13.1914C11.2495 12.363 11.9211 11.6914 12.7495 11.6914C13.5779 11.6914 14.2495 12.363 14.2495 13.1914Z"
                                            fill="#3699FF"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="event">
                            <div className="right">
                                <div className="d-flex flex-column align-items-center">
                                    <div>
                                        <svg
                                            width="36"
                                            height="37"
                                            viewBox="0 0 36 37"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <rect
                                                y="0.441406"
                                                width="36"
                                                height="36"
                                                rx="18"
                                                fill="#EFF2F5"
                                            />
                                            <path
                                                opacity="0.3"
                                                d="M18.0002 17.7747C16.5274 17.7747 15.3335 16.5808 15.3335 15.1081C15.3335 13.6353 16.5274 12.4414 18.0002 12.4414C19.4729 12.4414 20.6668 13.6353 20.6668 15.1081C20.6668 16.5808 19.4729 17.7747 18.0002 17.7747Z"
                                                fill="#7E8299"
                                            />
                                            <path
                                                d="M12.0004 23.9079C12.2588 20.7261 14.8413 19.1084 17.9889 19.1084C21.1808 19.1084 23.8033 20.6372 23.9986 23.9084C24.0064 24.0387 23.9986 24.4417 23.4978 24.4417C21.0274 24.4417 17.3565 24.4417 12.485 24.4417C12.3178 24.4417 11.9864 24.0812 12.0004 23.9079Z"
                                                fill="#7E8299"
                                            />
                                        </svg>
                                    </div>
                                    <div className="mar-y-4">
                                        <svg
                                            width="2"
                                            height="56"
                                            viewBox="0 0 2 56"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <rect
                                                x="0.5"
                                                y="0.941406"
                                                width="1"
                                                height="54"
                                                rx="0.5"
                                                stroke="#E4E6EF"
                                                stroke-dasharray="4 4"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <div>
                                    <span className="span-1">
                                        پایان سرویس دبیرستان دخترانه فرزانگان
                                    </span>
                                    <span className="span-2">
                                        08:01 توسط{" "}
                                        <span className="blue">
                                            حسام الدین طباطبایی
                                        </span>
                                    </span>
                                </div>
                            </div>
                            <div className="left">
                                <button>مشاهده اطلاعات کاربر</button>
                                <button>
                                    مشاهده لوکیشن
                                    <svg
                                        width="18"
                                        height="19"
                                        viewBox="0 0 18 19"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M5.24951 2.69141C3.59266 2.69141 2.24951 4.03455 2.24951 5.69141C2.24951 7.34826 3.59266 8.69141 5.24951 8.69141H12.7495C14.4064 8.69141 15.7495 7.34826 15.7495 5.69141C15.7495 4.03455 14.4064 2.69141 12.7495 2.69141H5.24951ZM6.74951 5.6914C6.74951 6.51983 6.07794 7.1914 5.24951 7.1914C4.42109 7.1914 3.74951 6.51983 3.74951 5.6914C3.74951 4.86298 4.42109 4.1914 5.24951 4.1914C6.07794 4.1914 6.74951 4.86298 6.74951 5.6914Z"
                                            fill="#3699FF"
                                        />
                                        <path
                                            opacity="0.3"
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M5.24951 10.1914C3.59266 10.1914 2.24951 11.5346 2.24951 13.1914C2.24951 14.8483 3.59266 16.1914 5.24951 16.1914H12.7495C14.4064 16.1914 15.7495 14.8483 15.7495 13.1914C15.7495 11.5346 14.4064 10.1914 12.7495 10.1914H5.24951ZM14.2495 13.1914C14.2495 14.0198 13.5779 14.6914 12.7495 14.6914C11.9211 14.6914 11.2495 14.0198 11.2495 13.1914C11.2495 12.363 11.9211 11.6914 12.7495 11.6914C13.5779 11.6914 14.2495 12.363 14.2495 13.1914Z"
                                            fill="#3699FF"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="event">
                            <div className="right">
                                <div className="d-flex flex-column align-items-center">
                                    <div>
                                        <svg
                                            width="36"
                                            height="37"
                                            viewBox="0 0 36 37"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <rect
                                                y="0.441406"
                                                width="36"
                                                height="36"
                                                rx="18"
                                                fill="#EFF2F5"
                                            />
                                            <path
                                                opacity="0.3"
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M16.5856 18.9125L15.1714 20.3267C14.911 20.5871 14.911 21.0092 15.1714 21.2695C15.4317 21.5299 15.8538 21.5299 16.1142 21.2695L17.5284 19.8553L17.9998 20.3267C18.5205 20.8474 18.5205 21.6916 17.9998 22.2123L16.1142 24.098C15.5935 24.6187 14.7493 24.6187 14.2286 24.098L12.343 22.2123C11.8223 21.6916 11.8223 20.8474 12.343 20.3267L14.2286 18.4411C14.7493 17.9204 15.5935 17.9204 16.1142 18.4411L16.5856 18.9125Z"
                                                fill="#7E8299"
                                            />
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M19.4142 17.9703L20.8284 16.5561C21.0887 16.2957 21.0887 15.8736 20.8284 15.6133C20.568 15.3529 20.1459 15.3529 19.8856 15.6133L18.4713 17.0275L17.9999 16.5561C17.4792 16.0354 17.4792 15.1912 17.9999 14.6705L19.8856 12.7849C20.4063 12.2642 21.2505 12.2642 21.7712 12.7849L23.6568 14.6705C24.1775 15.1912 24.1775 16.0354 23.6568 16.5561L21.7712 18.4417C21.2505 18.9624 20.4063 18.9624 19.8856 18.4417L19.4142 17.9703Z"
                                                fill="#7E8299"
                                            />
                                            <path
                                                opacity="0.3"
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M12.8147 14.1994C12.5543 13.9391 12.5543 13.517 12.8147 13.2566C13.075 12.9963 13.4971 12.9963 13.7575 13.2566L14.7003 14.1994C14.9606 14.4598 14.9606 14.8819 14.7003 15.1422C14.4399 15.4026 14.0178 15.4026 13.7575 15.1422L12.8147 14.1994ZM15.5626 12.1184C15.5626 11.7502 15.8611 11.4517 16.2293 11.4517C16.5975 11.4517 16.8959 11.7502 16.8959 12.1184L16.8959 13.4517C16.8959 13.8199 16.5975 14.1184 16.2293 14.1184C15.8611 14.1184 15.5626 13.8199 15.5626 13.4517L15.5626 12.1184ZM11.1245 16.5564C11.1245 16.1882 11.423 15.8897 11.7912 15.8897L13.1245 15.8897C13.4927 15.8897 13.7912 16.1882 13.7912 16.5564C13.7912 16.9246 13.4927 17.2231 13.1245 17.2231L11.7912 17.2231C11.423 17.2231 11.1245 16.9246 11.1245 16.5564Z"
                                                fill="#7E8299"
                                            />
                                            <path
                                                opacity="0.3"
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M22.1619 23.5467C22.4222 23.807 22.8443 23.807 23.1047 23.5467C23.365 23.2863 23.365 22.8642 23.1047 22.6039L22.1619 21.6611C21.9015 21.4007 21.4794 21.4007 21.2191 21.6611C20.9587 21.9214 20.9587 22.3435 21.2191 22.6039L22.1619 23.5467ZM24.243 20.7987C24.6112 20.7987 24.9097 20.5003 24.9097 20.1321C24.9097 19.7639 24.6112 19.4654 24.243 19.4654H22.9097C22.5415 19.4654 22.243 19.7639 22.243 20.1321C22.243 20.5003 22.5415 20.7987 22.9097 20.7987L24.243 20.7987ZM19.8049 25.2368C20.1731 25.2368 20.4716 24.9383 20.4716 24.5701L20.4716 23.2368C20.4716 22.8686 20.1731 22.5701 19.8049 22.5701C19.4367 22.5701 19.1383 22.8686 19.1383 23.2368L19.1383 24.5701C19.1383 24.9383 19.4367 25.2368 19.8049 25.2368Z"
                                                fill="#7E8299"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <div>
                                    <span className="span-1">
                                        تغییر راننده و خودرو
                                    </span>
                                    <span className="span-2">
                                        08:01 توسط{" "}
                                        <span className="blue">
                                            حسام الدین طباطبایی
                                        </span>
                                    </span>
                                </div>
                            </div>
                            <div className="left">
                                <button>مشاهده اطلاعات کاربر</button>
                                <button>
                                    مشاهده لوکیشن
                                    <svg
                                        width="18"
                                        height="19"
                                        viewBox="0 0 18 19"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M5.24951 2.69141C3.59266 2.69141 2.24951 4.03455 2.24951 5.69141C2.24951 7.34826 3.59266 8.69141 5.24951 8.69141H12.7495C14.4064 8.69141 15.7495 7.34826 15.7495 5.69141C15.7495 4.03455 14.4064 2.69141 12.7495 2.69141H5.24951ZM6.74951 5.6914C6.74951 6.51983 6.07794 7.1914 5.24951 7.1914C4.42109 7.1914 3.74951 6.51983 3.74951 5.6914C3.74951 4.86298 4.42109 4.1914 5.24951 4.1914C6.07794 4.1914 6.74951 4.86298 6.74951 5.6914Z"
                                            fill="#3699FF"
                                        />
                                        <path
                                            opacity="0.3"
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M5.24951 10.1914C3.59266 10.1914 2.24951 11.5346 2.24951 13.1914C2.24951 14.8483 3.59266 16.1914 5.24951 16.1914H12.7495C14.4064 16.1914 15.7495 14.8483 15.7495 13.1914C15.7495 11.5346 14.4064 10.1914 12.7495 10.1914H5.24951ZM14.2495 13.1914C14.2495 14.0198 13.5779 14.6914 12.7495 14.6914C11.9211 14.6914 11.2495 14.0198 11.2495 13.1914C11.2495 12.363 11.9211 11.6914 12.7495 11.6914C13.5779 11.6914 14.2495 12.363 14.2495 13.1914Z"
                                            fill="#3699FF"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="empty-div"></div>
                        <div className="end-div">
                            <div className="img-div">
                                <img
                                    src="/images/pm.png"
                                    width={50}
                                    height={50}
                                    alt=""
                                />
                                <div>
                                    <span className="span-1">
                                        دبیرستان دخترانه فرزانگان
                                    </span>
                                    <span className="span-2">
                                        دخترانه دوره اول
                                    </span>
                                </div>
                            </div>
                            <div className="img-div">
                                <div>
                                    <span className="span-1">
                                        پژو 207 - سفید
                                    </span>
                                    <span className="span-2">
                                        54 ایران 24 ص 543
                                    </span>
                                </div>
                            </div>
                            <div className="btns">
                                <button>
                                    <svg
                                        width="19"
                                        height="19"
                                        viewBox="0 0 19 19"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M5.19238 6.44141V15.4414C5.19238 16.2698 5.86396 16.9414 6.69238 16.9414H12.6924C13.5208 16.9414 14.1924 16.2698 14.1924 15.4414V6.44141H5.19238Z"
                                            fill="#3699FF"
                                        />
                                        <path
                                            opacity="0.3"
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M11.1924 3.81641V3.69141C11.1924 3.13912 10.7447 2.69141 10.1924 2.69141H9.19238C8.6401 2.69141 8.19238 3.13912 8.19238 3.69141V3.81641H4.94238C4.66624 3.81641 4.44238 4.04026 4.44238 4.31641V4.44141C4.44238 4.71755 4.66624 4.94141 4.94238 4.94141H14.4424C14.7185 4.94141 14.9424 4.71755 14.9424 4.44141V4.31641C14.9424 4.04026 14.7185 3.81641 14.4424 3.81641H11.1924Z"
                                            fill="#3699FF"
                                        />
                                    </svg>
                                </button>
                                <button>
                                    <svg
                                        width="19"
                                        height="19"
                                        viewBox="0 0 19 19"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M5.94238 2.69141C4.28553 2.69141 2.94238 4.03455 2.94238 5.69141C2.94238 7.34826 4.28553 8.69141 5.94238 8.69141H13.4424C15.0992 8.69141 16.4424 7.34826 16.4424 5.69141C16.4424 4.03455 15.0992 2.69141 13.4424 2.69141H5.94238ZM7.44238 5.6914C7.44238 6.51983 6.77081 7.1914 5.94238 7.1914C5.11396 7.1914 4.44238 6.51983 4.44238 5.6914C4.44238 4.86298 5.11396 4.1914 5.94238 4.1914C6.77081 4.1914 7.44238 4.86298 7.44238 5.6914Z"
                                            fill="#3699FF"
                                        />
                                        <path
                                            opacity="0.3"
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M5.94238 10.1914C4.28553 10.1914 2.94238 11.5346 2.94238 13.1914C2.94238 14.8483 4.28553 16.1914 5.94238 16.1914H13.4424C15.0992 16.1914 16.4424 14.8483 16.4424 13.1914C16.4424 11.5346 15.0992 10.1914 13.4424 10.1914H5.94238ZM14.9424 13.1914C14.9424 14.0198 14.2708 14.6914 13.4424 14.6914C12.614 14.6914 11.9424 14.0198 11.9424 13.1914C11.9424 12.363 12.614 11.6914 13.4424 11.6914C14.2708 11.6914 14.9424 12.363 14.9424 13.1914Z"
                                            fill="#3699FF"
                                        />
                                    </svg>
                                </button>
                                <button>
                                    جزئیات
                                    <svg
                                        width="20"
                                        height="21"
                                        viewBox="0 0 20 21"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M5.50324 7.86177C5.18281 7.54134 4.66329 7.54134 4.34286 7.86177C4.02243 8.1822 4.02243 8.70172 4.34286 9.02215L9.26594 13.9452C9.57657 14.2559 10.0767 14.2667 10.4006 13.9699L15.3236 9.45706C15.6577 9.15085 15.6803 8.63182 15.374 8.29777C15.0678 7.96373 14.5488 7.94116 14.2148 8.24737L9.87081 12.2293L5.50324 7.86177Z"
                                            fill="#3699FF"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </Events>
                </>
            ) : (
                <ReplacedService>
                    <div className="head">
                        <h6>سرویس جایگزین</h6>
                        <button>
                            حذف سرویس جایگزین
                            <svg
                                width="19"
                                height="19"
                                viewBox="0 0 19 19"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M4.93945 6.36914V15.3691C4.93945 16.1976 5.61103 16.8691 6.43945 16.8691H12.4395C13.2679 16.8691 13.9395 16.1976 13.9395 15.3691V6.36914H4.93945Z"
                                    fill="#3699FF"
                                />
                                <path
                                    opacity="0.3"
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M10.9395 3.74414V3.61914C10.9395 3.06686 10.4917 2.61914 9.93945 2.61914H8.93945C8.38717 2.61914 7.93945 3.06686 7.93945 3.61914V3.74414H4.68945C4.41331 3.74414 4.18945 3.968 4.18945 4.24414V4.36914C4.18945 4.64528 4.41331 4.86914 4.68945 4.86914H14.1895C14.4656 4.86914 14.6895 4.64528 14.6895 4.36914V4.24414C14.6895 3.968 14.4656 3.74414 14.1895 3.74414H10.9395Z"
                                    fill="#3699FF"
                                />
                            </svg>
                        </button>
                    </div>
                    <div className="row-inp">
                        <label>
                            <span>راننده و خودرو</span>
                            <select name="" id="">
                                <option value="">
                                    حسام الدین طباطبایی - پژو 206
                                </option>
                            </select>
                            <small>لطفا راننده و خودرو را انتخاب کنید.</small>
                        </label>
                        <label>
                            <span>نام مدرسه</span>
                            <select name="" id="">
                                <option value="">
                                    دبیرستان دخترانه فرزانگان
                                </option>
                            </select>
                            <small>
                                لطفا مدرسه را جهت سرویس دهی انتخاب کنید.
                            </small>
                        </label>
                        <label>
                            <span>انتخاب سرویس‌ها(چند انتخابی)</span>
                            <select name="" id="">
                                <option value="">رسیدن به مدرسه - 08:00</option>
                            </select>
                            <small>
                                لطفا زمان رسیدن به مدرسه را انتخاب کتید.
                            </small>
                        </label>
                    </div>

                    <div className="row-inp">
                        <label>
                            <span>تاریخ شروع سرویس جایگزین</span>
                            <input
                                type="text"
                                value="1402/03/31"
                                name=""
                                id=""
                            />
                            <small>
                                لطفا تاریخ شروع سرویس جایگزین را انتخاب کنید.
                            </small>
                        </label>
                        <label>
                            <span>تاریخ پایان سرویس جایگزین</span>
                            <input
                                type="text"
                                value="1402/03/31"
                                name=""
                                id=""
                            />
                            <small>
                                لطفاتاریخ پایان سرویس جایگزین را انتخاب کنید.
                            </small>
                        </label>
                        <label>
                            <span>
                                ثبت هزینه هر سفر برای کسر از حساب راننده(1 سفر)
                            </span>
                            <input type="text" value="600,000" name="" id="" />
                            <span className="abs-span">ریال</span>
                            <small>لطفا هزینه هر سفر را انتخاب کنید.</small>
                        </label>
                    </div>
                    <h6 className="titr">اطلاعات راننده جایگزین</h6>
                    <div className="radio-row">
                        <label>
                            <input type="radio" name="driver" />
                            انتخاب راننده از لیست رانندگان من
                        </label>
                        <label>
                            <input type="radio" name="driver" />
                            انتخاب راننده از لیست رانندگان من
                        </label>
                    </div>
                    <div className="row-inp">
                        <label>
                            <span>نام راننده جایگزین</span>
                            <input type="text" value="کریم" name="" id="" />
                            <small>
                                لطفا نام راننده جایگزین را انتخاب کنید.
                            </small>
                        </label>
                        <label>
                            <span>نام خانوادگی راننده جایگزین</span>
                            <input type="text" value="باقری" name="" id="" />
                            <small>
                                لطفا نام خانوادگی راننده جایگزین را انتخاب کنید.
                            </small>
                        </label>
                        <label>
                            <span>تلفن همراه راننده جایگزین</span>
                            <input
                                type="text"
                                value="09123456789"
                                name=""
                                id=""
                            />
                            <small>
                                لطفا تلفن همراه راننده جایگزین را انتخاب کنید.
                            </small>
                        </label>
                    </div>
                    <h6 className="titr">اطلاعات راننده جایگزین</h6>
                    <div className="row-inp">
                        <label>
                            <span>مدل خوردو</span>
                            <select name="" id="">
                                <option value="">پژو 206</option>
                            </select>
                            <small>لطفا مدل خوردو را انتخاب کنید.</small>
                        </label>
                        <label>
                            <span>شماره پلاک خودرو</span>
                            <input
                                type="text"
                                value="54 ایران 24 ص 543"
                                name=""
                                id=""
                            />
                            <small>لطفا شماره پلاک خودرو را انتخاب کنید.</small>
                        </label>
                        <label>
                            <span>رنگ خودرو</span>
                            <input type="text" value="سفید" name="" id="" />
                            <small>لطفا رنگ خودرو را انتخاب کنید.</small>
                        </label>
                    </div>
                    <div className="buttons">
                        <button className="cancle">انصراف</button>
                        <button className="submit">ذخیره </button>
                    </div>
                </ReplacedService>
            )}
        </>
    );
};

export default TravelInfo;
