import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BASE_URL } from "../BaseUrl";
import EditCashInfo from "./EditCashInfo";

const Main = styled.div`
    position: fixed;
    right: 50%;
    top: 50%;
    transform: translate(50%, -50%);
    width: 1120px;
    background: #ffffff;
    border-radius: 12px;
    z-index: 9999;
    padding: 37px 40px;

    .blue-btn {
        width: 103.72px;
        height: 43px;
        background: #3699ff;
        border-radius: 4px;
        font-weight: 600;
        font-size: 13px;
        line-height: 20px;
        color: #ffffff;
    }
    .head {
        display: flex;
        justify-content: space-between;
    }

    .content {
        display: flex;
        justify-content: space-between;
        width: 100%;
        .right {
            width: 47%;
        }
        .left {
            width: 47%;
        }
        .item {
            width: 100%;
            border-bottom: 1px dashed #e4e6ef;
            padding: 20px 0;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .span-1 {
                font-weight: 500;
                font-size: 16px;
                line-height: 30px;
                text-align: right;
                letter-spacing: -0.02em;
                color: #b5b5c3;
            }
            .span-2 {
                font-weight: 400;
                font-size: 16px;
                line-height: 19px;
                text-align: left;
                color: #3f4254;
            }
            .stts {
                width: 102px;
                height: 29px;
                background: #ffb61d;
                border-radius: 5px;
                font-size: 14px;
                line-height: 16px;
                text-align: center;
                letter-spacing: 0.005em;
                color: #ffffff;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .green {
                background: #1bc5bd;
            }
            .red {
                background: #fedee8 !important;
                color: #f1416c !important;
            }
        }
        .btns {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            margin-top: 40px;
            .cancle {
                background-color: transparent;
                font-weight: 500;
                font-size: 15px;
                line-height: 18px;
                text-align: center;
                color: #b5b5c3;
                margin-left: 33px;
            }
        }
    }
`;

const CashInfo = (props) => {
    let phone;
    if (typeof window !== "undefined") {
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

    const [showEdit, setShowEdit] = useState(false);

    console.log(props.item);
    return (
        <Main>
            {showEdit && <EditCashInfo setshow={setShowEdit} item={props.item} />}
            <div className="head">
                <h6>جزئیات تراکنش CP-4225</h6>
                <button className="blue-btn">پرینت</button>
            </div>
            <div className="content">
                <div className="right">
                    <div className="item">
                        <span className="span-1">نوع : </span>
                        <span className="span-2">دریافت نقدی - درگاه بانک</span>
                    </div>
                    <div className="item">
                        <span className="span-1">زمان تراکنش :</span>
                        <span className="span-2">
                            {props.item.delivery_date}
                        </span>
                    </div>
                    <div className="item">
                        <span className="span-1">شماره پیگیری : </span>
                        <span className="span-2">
                            {props.item.tracking_number}
                        </span>
                    </div>
                    <div className="item">
                        <span className="span-1">دریافت توسط :</span>
                        <span className="span-2">
                            {props.item.receiver_name}
                        </span>
                    </div>
                    <div className="item">
                        <span className="span-1">بابت :</span>
                        <span className="span-2">{props.item.fo_cash}</span>
                    </div>
                    <div className="item">
                        <span className="span-1">بانک گیرنده وجه :</span>
                        <span className="span-2">
                            {props.item.bank_name !== undefined &&
                                props.item.bank_name !== null &&
                                props.item.bank_name}
                        </span>
                    </div>
                    <div className="item">
                        <span className="span-1">توضیحات : -</span>
                        <span className="span-2">{info.fo_cash}</span>
                    </div>{" "}
                </div>
                <div className="left">
                    <div className="item">
                        <span className="span-1">مبلغ : </span>
                        <span className="span-2">
                            {props.item.check_amount} ریال
                        </span>
                    </div>
                    <div className="item">
                        <span className="span-1">درگاه بانک : </span>
                        <span className="span-2">
                            {props.item.bank_name !== undefined &&
                                props.item.bank_name !== null &&
                                props.item.bank_name}
                        </span>
                    </div>
                    <div className="item">
                        <span className="span-1">شماره رسید : </span>
                        <span className="span-2">
                            {props.item.receipt_number}
                        </span>
                    </div>
                    <div className="item">
                        <span className="span-1">پرداخت توسط :</span>
                        <span className="span-2">{props.item.bank_name}</span>
                    </div>
                    <div className="item">
                        <span className="span-1">شماره شبا گیرنده وجه :</span>
                        <span className="span-2">هایده نعمتی</span>
                    </div>
                    <div className="item">
                        <span className="span-1">وضعیت : </span>
                        <span className="span-2">
                            <div
                                className={
                                    props.item.status_cash == "ok"
                                        ? "stts green"
                                        : props.item.status_cash == "reject"
                                        ? "stts red"
                                        : "stts"
                                }
                            >
                                {props.item.status_cash == "ok"
                                    ? "موفق"
                                    : props.item.status_cash == "reject"
                                    ? "ناموفق"
                                    : props.item.status_cash == "return"
                                    ? "برگشت وجه"
                                    : "در انتظار تایید"}
                            </div>
                        </span>
                    </div>
                    <div className="btns">
                        <button
                            className="cancle"
                            onClick={() => {
                                props.close(false);
                            }}
                        >
                            بستن
                        </button>
                        <button
                            className="blue-btn"
                            onClick={() => {
                                setShowEdit(true);
                            }}
                        >
                            ویرایش
                        </button>
                    </div>
                </div>
            </div>
        </Main>
    );
};

export default CashInfo;
