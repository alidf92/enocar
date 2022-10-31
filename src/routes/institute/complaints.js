import styled from "styled-components";
import Header from "../../components/Institute/Header";
import Sidebar from "../../components/Institute/Sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../components/BaseUrl";

const Main = styled.div`
    background: #e5e5e5;
    .ml-10 {
        margin-left: 10px;
    }
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
`;

const Comments = styled.div`
    width: 100%;
    background: #ffffff;
    border-radius: 12px;
    padding: 25px 35px;
    .head {
        display: flex;
        justify-content: space-between;
        padding-bottom: 10px;
        border-bottom: 1px solid #eff2f5;

        .btns {
            .search {
                width: 103.12px;
                height: 35px;
                background: #f3f6f9;
                border-radius: 6px;
                font-weight: 700;
                font-size: 12px;
                line-height: 14px;
                color: #a1a5b7;
                svg {
                    margin-left: 8px;
                }
            }
            .add {
                margin-right: 5px;
                background: #1bc5bd;
                border-radius: 6px;
                width: 176px;
                height: 35px;
                font-weight: 700;
                font-size: 12px;
                line-height: 14px;
                color: #ffffff;
                svg {
                    margin-left: 8px;
                }
            }
        }
    }
`;
const PmBox = styled.div`
    width: 100%;
    background: #ffffff;
    border: 1px solid #eff2f5;
    box-shadow: 0px 0px 20px rgba(76, 87, 125, 0.02);
    border-radius: 12px;
    padding: 28px 30px;
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
                line-height: 30px;
                text-align: right;
                letter-spacing: -0.02em;
                color: #181c32;
                display: block;
                font-weight: 700;
                font-size: 19px;
                line-height: 22px;
                text-align: right;
                color: #3f4254;
            }
            .person {
                display: block;
                font-weight: 400;
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

const Modal = styled.div`
    width: 900px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #f9f9f9;
    border-radius: 12px;
    z-index: 99;
    border: 1px solid #eee;
    padding: 30px 32px;
    .head {
        padding-bottom: 20px;
        border-bottom: 1px solid #e7e7e7;
        h6 {
            font-weight: 600;
            font-size: 14px;
            line-height: 21px;
            text-align: right;
            color: #464e5f;
        }
    }
    label {
        display: flex;
        flex-direction: column;
        font-weight: 400;
        font-size: 13px;
        line-height: 20px;
        color: #464e5f;
        margin-top: 24px;
        select {
            border: 1px solid #ddd;
            width: 305.13px;
            height: 44px;
            background: #ffffff;
            border-radius: 4px;
            margin-top: 5px;
            padding-right: 20px;
            -webkit-appearance: none;
            -moz-appearance: none;
            background-image: url("data:image/svg+xml;utf8,<svg fill='black' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
            background-repeat: no-repeat;
            background-position-x: 10px;
            background-position-y: 8px;
        }
    }
    textarea {
        height: 128.39px;
        border: 1px solid #ddd;
        width: 100%;
        background-color: #fff;
        padding: 13px 30px;
        font-weight: 400;
        font-size: 13px;
        line-height: 20px;
        text-align: right;
        resize: none;
        margin-top: 24px;
        ::placeholder {
            color: #b5b5c3;
        }
    }
    .btns {
        display: flex;
        align-items: center;
        width: 100%;
        justify-content: flex-end;
        margin-top: 24px;
        padding-top: 21px;
        border-top: 1px solid #ddd;

        .cancle {
            font-weight: 500;
            font-size: 15px;
            line-height: 18px;
            text-align: center;
            color: #b5b5c3;
            background-color: transparent;
            margin-left: 16px;
        }
        .submit {
            width: 81px;
            height: 43px;
            background: #3699ff;
            border-radius: 4px;
            font-weight: 600;
            font-size: 13px;
            line-height: 20px;
            color: #ffffff;
        }
    }
`;
export default function Complaints() {
    const [showModal, setShowModal] = useState(false);
    return (
        <Main>
            {showModal && (
                <Modal>
                    <div className="head">
                        <h6>ثبت نظر یا شکایت</h6>
                    </div>
                    <label>
                        شکایت از
                        <select>
                            <option value="">نام دانش آموز</option>
                        </select>
                    </label>
                    <textarea placeholder="نوشتن متن ..."></textarea>
                    <div className="btns">
                        <button
                            onClick={() => {
                                setShowModal(false);
                            }}
                            className="cancle"
                        >
                            انصراف
                        </button>
                        <button className="submit">ثبت</button>
                    </div>
                </Modal>
            )}
            <Sidebar active={11} />
            <div className="w-100">
                <Header />
                <Content>
                    <Comments>
                        <div className="head">
                            <h6>نظرات و شکایات ثبت شده توسط من</h6>
                            <div className="btns">
                                <button className="search">
                                    <svg
                                        width="15"
                                        height="15"
                                        viewBox="0 0 15 15"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            opacity="0.3"
                                            d="M5.57286 11.2121C5.91744 10.8675 5.91744 10.3088 5.57286 9.96425C5.22828 9.61967 4.66961 9.61967 4.32503 9.96425L0.795621 13.4937C0.451041 13.8382 0.451041 14.3969 0.795621 14.7415C1.1402 15.0861 1.69888 15.0861 2.04346 14.7415L5.57286 11.2121Z"
                                            fill="#00A3FF"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M14.6548 6.17646C14.6548 9.58763 11.8895 12.3529 8.47832 12.3529C5.06715 12.3529 2.30186 9.58763 2.30186 6.17646C2.30186 2.7653 5.06715 0 8.47832 0C11.8895 0 14.6548 2.7653 14.6548 6.17646ZM4.06659 6.17647C4.06659 8.61302 6.0418 10.5882 8.47835 10.5882C10.9149 10.5882 12.8901 8.61302 12.8901 6.17647C12.8901 3.73992 10.9149 1.76471 8.47835 1.76471C6.0418 1.76471 4.06659 3.73992 4.06659 6.17647Z"
                                            fill="#00A3FF"
                                        />
                                    </svg>
                                    جستجو ...
                                </button>
                                <button
                                    onClick={() => {
                                        setShowModal(true);
                                    }}
                                    className="add"
                                >
                                    <svg
                                        width="14"
                                        height="14"
                                        viewBox="0 0 14 14"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M9.91658 3.49992C9.91658 5.11075 8.61075 6.41659 6.99992 6.41659C5.38909 6.41659 4.08325 5.11075 4.08325 3.49992C4.08325 1.88909 5.38909 0.583252 6.99992 0.583252C8.61075 0.583252 9.91658 1.88909 9.91658 3.49992Z"
                                            fill="white"
                                        />
                                        <path
                                            opacity="0.25"
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M10.9772 8.23942C10.6176 7.82252 9.99998 7.844 9.51705 8.10833C8.76973 8.51738 7.91202 8.74994 7 8.74994C6.08798 8.74994 5.23027 8.51738 4.48295 8.10833C4.00001 7.844 3.38241 7.82252 3.02284 8.23942C2.22963 9.15909 1.75 10.3568 1.75 11.6666V12.2499C1.75 12.8943 2.27233 13.4166 2.91667 13.4166H11.0833C11.7277 13.4166 12.25 12.8943 12.25 12.2499V11.6666C12.25 10.3568 11.7704 9.15909 10.9772 8.23942Z"
                                            fill="white"
                                        />
                                    </svg>
                                    ثبت نظر یا شکایت جدید
                                </button>
                            </div>
                        </div>
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
                                        <span className="person">
                                            پشتیبانی اینوباس
                                        </span>
                                    </div>
                                </div>
                                <div className="pm-left">
                                    <div className="text-box">
                                        1401/07/31 - 08:10
                                    </div>
                                    <div className="text-box">نرم افزار</div>
                                </div>
                            </div>
                            <p>
                                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از
                                صنعت چاپ و با استفاده از طراحان گرافیک است
                                چاپگرها و متون بلکه روزنامه و مجله در ستون و
                                سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی
                                مورد نیاز و کاربردهای متنوع با هدف بهبود
                                ابزارهای کاربردی می باشد.
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
                                        <span className="person">
                                            پشتیبانی اینوباس
                                        </span>
                                    </div>
                                </div>
                                <div className="pm-left">
                                    <div className="text-box">
                                        1401/07/31 - 08:10
                                    </div>
                                    <div className="text-box">نرم افزار</div>
                                </div>
                            </div>
                            <p>
                                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از
                                صنعت چاپ و با استفاده از طراحان گرافیک است
                                چاپگرها و متون بلکه روزنامه و مجله در ستون و
                                سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی
                                مورد نیاز و کاربردهای متنوع با هدف بهبود
                                ابزارهای کاربردی می باشد.
                            </p>
                        </PmBox>
                    </Comments>
                </Content>
            </div>
        </Main>
    );
}
