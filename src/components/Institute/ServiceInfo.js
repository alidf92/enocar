import React from "react";
import styled from "styled-components";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Main = styled.div`
    .Toastify__toast-container {
        white-space: nowrap;
        width: unset !important;
    }
`;

const Box = styled.div`
    background: #ffffff;
    border-radius: 12px;
    width: 100%;
    padding: 27px;
    .box-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #eff2f5;
        padding-bottom: 16px;
        h6 {
            font-weight: 600;
            font-size: 20px;
            line-height: 30px;
            color: #3f4254;
        }
        button {
            width: 113px;
            height: 32px;
            background: #f3f6f9;
            border-radius: 6px;
            font-weight: 700;
            font-size: 12px;
            line-height: 14px;
            color: #a1a5b7;
            svg {
                margin-right: 5px;
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
            @media (max-width:1450px) {
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
    .title {
        font-weight: 700;
        font-size: 14px;
        line-height: 16px;
        text-align: right;
        color: #5e6278;
        margin-top: 26px;
        margin-bottom: 26px;
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
        .delete {
            width: 65px;
            height: 32px;
            background: #f3f6f9;
            border-radius: 6px;
            svg{
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
                border-bottom: 1px dashed #E4E6EF;

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

const ServiceInfo = (props) => {
    console.log(props.data);
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
            <Box>
                <div className="box-head">
                    <h6>جزئیات سرویس</h6>
                    <button>
                        حذف سرویس
                        <svg
                            width="19"
                            height="19"
                            viewBox="0 0 19 19"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M5.09766 6.36914V15.3691C5.09766 16.1976 5.76923 16.8691 6.59766 16.8691H12.5977C13.4261 16.8691 14.0977 16.1976 14.0977 15.3691V6.36914H5.09766Z"
                                fill="#3699FF"
                            />
                            <path
                                opacity="0.3"
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M11.0977 3.74414V3.61914C11.0977 3.06686 10.6499 2.61914 10.0977 2.61914H9.09766C8.54537 2.61914 8.09766 3.06686 8.09766 3.61914V3.74414H4.84766C4.57151 3.74414 4.34766 3.968 4.34766 4.24414V4.36914C4.34766 4.64528 4.57151 4.86914 4.84766 4.86914H14.3477C14.6238 4.86914 14.8477 4.64528 14.8477 4.36914V4.24414C14.8477 3.968 14.6238 3.74414 14.3477 3.74414H11.0977Z"
                                fill="#3699FF"
                            />
                        </svg>
                    </button>
                </div>
                <div className="row-inp">
                    <label>
                        <span>نام مدرسه</span>
                        <select name="" id="">
                            <option value="">دبیرستان دخترانه فرزانگان</option>
                        </select>
                        <small>لطفا مدرسه را جهت سرویس دهی انتخاب کنید.</small>
                    </label>
                    <label>
                        <span>نام مدرسه</span>
                        <select name="" id="">
                            <option value="">
                                حسام الدین طباطبایی - پژو 206
                            </option>
                        </select>
                        <small>لطفا راننده و خودرو را انتخاب کنید.</small>
                    </label>
                    <label>
                        <span>نوع سرویس</span>
                        <select name="" id="">
                            <option value="">رفت و برگشت</option>
                        </select>
                        <small>لطفا نوع سرویس را انتخاب کنید.</small>
                    </label>
                </div>
                <div className="row-inp">
                    <label>
                        <span>زمان رفت</span>
                        <input type="text" value="08:00" name="" id="" />
                        <small>لطفا زمان رسیدن به مدرسه را انتخاب کتید.</small>
                    </label>
                    <label>
                        <span>زمان برگشت</span>
                        <input type="text" value="13:00" name="" id="" />
                        <small>لطفا زمان خروج از مدرسه را وارد نمایید.</small>
                    </label>
                    <label>
                        <span>تاریخ شروع سرویس‌دهی</span>
                        <input type="text" value="1401/07/01" name="" id="" />
                        <small>لطفا تاریخ شروع سرویس‌دهی را وارد نمایید.</small>
                    </label>
                </div>
                <div className="row-inp">
                    <label>
                        <span>تاریخ پایان سرویس‌دهی</span>
                        <input type="text" value="1402/03/31" name="" id="" />
                        <small>
                            لطفا تاریخ پایان سرویس‌دهی را وارد نمایید.
                        </small>
                    </label>
                </div>
                <div className="title">لوکیشن دانش آموزان </div>
                <div>Map</div>
                <TableDiv>
                    <div className="head">
                        <div className="title mb-2">
                            دانش آموزان اضافه شده به این سرویس(2){" "}
                        </div>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>نام دانش آموز</th>
                                <th>آدرس</th>
                                <th>نوع سرویس</th>
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
                                    <div className="img-div">
                                        <div>
                                            <span className="span-1">5km</span>
                                            <span className="span-2">
                                                شهرک بهار - خیابان وزیر - کوچه
                                                سوم - بن ...
                                            </span>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="check-boxs">
                                        <label>
                                            رفت
                                            <input
                                                type="checkbox"
                                                name=""
                                                id=""
                                            />
                                        </label>
                                        <label>
                                            برگشت
                                            <input
                                                type="checkbox"
                                                name=""
                                                id=""
                                            />
                                        </label>
                                    </div>
                                </td>
                                <td>
                                    <button className="delete">
                                        حذف
                                        <svg
                                            width="19"
                                            height="19"
                                            viewBox="0 0 19 19"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M5.40723 6.62109V15.6211C5.40723 16.4495 6.0788 17.1211 6.90723 17.1211H12.9072C13.7357 17.1211 14.4072 16.4495 14.4072 15.6211V6.62109H5.40723Z"
                                                fill="#3699FF"
                                            />
                                            <path
                                                opacity="0.3"
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M11.4072 3.99609V3.87109C11.4072 3.31881 10.9595 2.87109 10.4072 2.87109H9.40723C8.85494 2.87109 8.40723 3.31881 8.40723 3.87109V3.99609H5.15723C4.88108 3.99609 4.65723 4.21995 4.65723 4.49609V4.62109C4.65723 4.89724 4.88108 5.12109 5.15723 5.12109H14.6572C14.9334 5.12109 15.1572 4.89724 15.1572 4.62109V4.49609C15.1572 4.21995 14.9334 3.99609 14.6572 3.99609H11.4072Z"
                                                fill="#3699FF"
                                            />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </TableDiv>
            </Box>
        </Main>
    );
};

export default ServiceInfo;
