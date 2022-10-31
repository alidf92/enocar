import React from "react";
import styled from "styled-components";

const Detail = styled.div`
    width: 100%;
    padding: 34px 32px;
    background: #ffffff;
    border-radius: 12px;
    .rows {
        display: flex;
        width: 100%;
        justify-content: space-between;
        margin-bottom: 16px;
        :last-child {
            margin-bottom: 0;
        }
        .right {
            span {
                :first-child {
                    font-weight: 500;
                    font-size: 16px;
                    line-height: 30px;
                    text-align: right;
                    letter-spacing: -0.02em;
                    color: #b5b5c3;
                }
                :last-child {
                    font-weight: 400;
                    font-size: 18px;
                    line-height: 22px;
                    text-align: right;
                    color: #3f4254;
                    margin-right: 5px;
                }
            }
        }
        .left {
            display: flex;
            align-items: center;
            span {
                font-weight: 400;
                font-size: 16px;
                line-height: 30px;
                letter-spacing: -0.02em;
                color: #b5b5c3;
                margin-right: 10px;
            }
            .date {
                font-weight: 400;
                font-size: 18px;
                line-height: 22px;
                color: #3f4254;
            }
            .stts {
                width: 103px;
                height: 32px;
                left: 102.59px;
                top: 34px;
                background: #c9f7f5;
                border-radius: 6px;
                font-weight: 400;
                font-size: 12px;
                line-height: 14px;
                text-align: center;
                color: #1bc5bd;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }
    }
`;

const Reply = styled.div`
    .area-div {
        position: relative;
    }
    width: 100%;
    background-color: #fff;
    padding: 26px;
    margin-top: 20px;
    border-radius: 12px;
    .head {
        padding-bottom: 17px;
        border-bottom: 1px solid #eff2f5;
        display: flex;
        justify-content: space-between;
    }
    textarea {
        width: 100%;
        background: #f3f6f9;
        border-radius: 4px;
        resize: none;
        margin-top: 20px;
        border: none;
        padding: 30px 34px;
        min-height: 293px;
        ::placeholder {
            font-weight: 400;
            font-size: 13px;
            line-height: 20px;
            text-align: right;
            color: #b5b5c3;
        }
    }
    .bottom-box {
        border-top: 1px solid rgba(161, 165, 183, 0.3);
        width: calc(100% - 40px);
        margin-right: 20px;
        position: absolute;
        display: flex;
        justify-content: flex-end;
        padding-top: 12px;
        bottom: 20px;
        button {
            background: #6993ff;
            opacity: 0.9;
            border-radius: 6px;
            font-weight: 600;
            font-size: 13px;
            line-height: 20px;
            color: #ffffff;
            width: 70.75px;
            height: 40px;
        }
    }
`;

const PmBox = styled.div`
    width: 100%;
    background: #ffffff;
    border: 1px solid #eff2f5;
    box-shadow: 0px 0px 20px rgba(76, 87, 125, 0.02);
    border-radius: 12px;
    padding: 46px;
    margin-top: 16px;
    .pm-head {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .pm-right {
            display: flex;
            align-items: center;
            img {
                border-radius: 6px;
                margin-left: 18px;
            }
            .name {
                font-weight: 700;
                font-size: 22px;
                line-height: 30px;
                text-align: right;
                letter-spacing: -0.02em;
                color: #181c32;
                display: block;
            }
            .person {
                display: block;
                font-weight: 500;
                font-size: 16px;
                line-height: 30px;
                /* identical to box height, or 188% */

                text-align: right;
                letter-spacing: -0.02em;

                color: #b5b5c3;
            }
        }
        .pm-left {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            .text-box {
                margin-bottom: 5px;
                background: #f5f8fa;
                border-radius: 6px;
                font-weight: 700;
                font-size: 12px;
                line-height: 14px;
                color: #a1a5b7;
                padding: 6px 11px;
            }
        }
    }
    p {
        margin-top: 25px;
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;
        text-align: justify;
        color: #7e8299;
    }
`;

const PmDetails = () => {
    return (
        <>
            <Detail>
                <div className="rows">
                    <div className="right">
                        <span>شماره پیام :</span>
                        <span>4342122</span>
                    </div>
                    <div className="left">
                        <div className="stts">پاسخ داده شده</div>
                        <span>: وضعیت</span>
                    </div>
                </div>
                <div className="rows">
                    <div className="right">
                        <span>عنوان پیام :</span>
                        <span>لورم ایپسوم</span>
                    </div>
                    <div className="left">
                        <div className="date">1401.07.21 - 08:12</div>
                        <span>: تاریخ ایجاد</span>
                    </div>
                </div>
                <div className="rows">
                    <div className="right">
                        <span>ارسال شده به : </span>
                        <span>پشتیبانی فنی</span>
                    </div>
                    <div className="left">
                        <div className="date">1401.07.21 - 08:12</div>
                        <span>: آخرین بروزرسانی</span>
                    </div>
                </div>
            </Detail>
            <Reply>
                <div className="head">پاسخ</div>
                <div className="area-div">
                    <textarea placeholder="نوشتن پیام ..."></textarea>
                    <div className="bottom-box">
                        <button>ارسال</button>
                    </div>
                </div>
            </Reply>
            <PmBox>
                <div className="pm-head">
                    <div className="pm-right">
                        <img
                            src="/images/pm.png"
                            width={60}
                            height={60}
                            alt=""
                        />
                        <div>
                            <span className="name">کریم کریمی</span>
                            <span className="person">پشتیبانی اینوباس</span>
                        </div>
                    </div>
                    <div className="pm-left">
                        <div className="text-box">1401/07/31 - 08:10</div>
                    </div>
                </div>
                <p>
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و
                    با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه
                    و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی
                    تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای
                    کاربردی می باشد.
                </p>
            </PmBox>
            <PmBox>
                <div className="pm-head">
                    <div className="pm-right">
                        <img
                            src="/images/pm.png"
                            width={60}
                            height={60}
                            alt=""
                        />
                        <div>
                            <span className="name">کریم کریمی</span>
                            <span className="person">پشتیبانی اینوباس</span>
                        </div>
                    </div>
                    <div className="pm-left">
                        <div className="text-box">1401/07/31 - 08:10</div>
                    </div>
                </div>
                <p>
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و
                    با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه
                    و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی
                    تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای
                    کاربردی می باشد.
                </p>
            </PmBox>
        </>
    );
};

export default PmDetails;
