import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BASE_URL } from "../BaseUrl";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import * as shamsi from "shamsi-date-converter";

const Main = styled.div`
    position: fixed;
    background-color: #fff;
    padding: 32px 30px;
    border-radius: 12px;
    width: 1035.4px;
    border: 1px solid #c8c8cf;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .btnss {
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
    .filter {
        button {
            margin-bottom: 5px;
            margin-right: 12px;
            padding: 0 14px;
            height: 22px;
            background: #f3f6f9;
            border-radius: 6px;
            font-weight: 700;
            font-size: 12px;
            line-height: 14px;
            color: #a1a5b7;
        }
        .active {
            background: #1bc5bd;
            color: #fff;
        }
    }
    .remove {
    }
    .head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #eff2f5;
        button {
            width: 108px;
            height: 32px;
            background: #f3f6f9;
            font-weight: 700;
            font-size: 12px;
            line-height: 14px;
            color: #a1a5b7;
            border-radius: 6px;
            margin-bottom: 10px;
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
        .date-rel {
            position: relative;
            svg {
                position: absolute;
                left: 16px;
                top: 14px;
            }
        }
        label {
            display: flex;
            position: relative;
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
        .abs-span {
            position: absolute;
            left: 20px;
            top: 33px;
        }
    }
`;

const EditCheckInfo = (props) => {
    const [sttsOne, setSttsOne] = useState("پرداخت");
    const [cashOrCheck, setCashOrCheck] = useState("check");

    let phone;
    if (typeof window !== "undefined") {
        phone = localStorage.getItem("phone_number");
    }
    const [driversList, setDriversList] = useState([]);
    const [student, setStudent] = useState([]);
    const [schools, setSchools] = useState([]);
    const [instituteInfo, setInstituteInfo] = useState([]);
    useEffect(() => {
        let infoConfig = {
            url: `${BASE_URL}getdetilse-institution/manage{}?phone_number=${phone}`,
            method: "GET",
        };
        axios(infoConfig)
            .then((res) => {
                setInstituteInfo(res.data.InstitutionManageCurrentDetails);
                let config = {
                    url: `${BASE_URL}getdetilse-drivers/institution%7B%7D?id_institution=${res.data.InstitutionManageCurrentDetails.id}`,
                    method: "GET",
                };
                axios(config)
                    .then((res) => {
                        setDriversList(res.data.ListDriverAtInstitution);
                    })
                    .catch((error) => {});
                let config2 = {
                    url: `${BASE_URL}get-list-student-active-at-service/institution{}?id_institution=${res.data.InstitutionManageCurrentDetails.id}`,
                    method: "GET",
                };
                axios(config2)
                    .then((ress) => {
                        setStudent(
                            ress.data.user_active_list_service_institution
                        );
                    })
                    .catch((error) => {});
                let config3 = {
                    url: `${BASE_URL}get-list-name-school-at/service{}?institution_id=${res.data.InstitutionManageCurrentDetails.id}`,
                    method: "GET",
                };
                axios(config3)
                    .then((ress) => {
                        setSchools(ress.data.ListNameAndIdShool);
                    })
                    .catch((error) => {});
            })
            .catch((error) => {});
    }, []);

    const [activeFilter, setActiveFilter] = useState(1);
    const [selectedSchool, setSelectedSchool] = useState("");
    const [selectedStudent, setSelectedStudent] = useState("");
    const [selectedDriver, setSelectedSDriver] = useState("");
    const [checkAmount, setCheckAmount] = useState("");
    const [bankName, setBankName] = useState("");
    const [checkDate, setCheckDate] = useState(new Date());
    const [deliveryCheckDate, setDeliveryCheckDate] = useState(new Date());
    const [checkNumber, setCheckNumber] = useState("");
    const [sayadiNumber, setSayadiNumber] = useState("");
    const [checkStatus, setCheckStatus] = useState("");
    const [foCheck, setFoCheck] = useState("");

    function handleCheckDate(vals) {
        setCheckDate(vals.toDate());
    }
    function handleDeliveryCheckDate(vals) {
        setDeliveryCheckDate(vals.toDate());
    }

    const checkHandler = (e) => {
        let data = new FormData();
        data.append("id_institution", instituteInfo.id);
        activeFilter == 1
            ? data.append("id_dri_stu_sch", selectedSchool)
            : activeFilter == 2
            ? data.append("id_dri_stu_sch", selectedStudent)
            : data.append("id_dri_stu_sch", selectedDriver);

        data.append("type_transaction", sttsOne);
        data.append("payment_method", "چک");

        activeFilter == 1
            ? data.append("receiver_type", "school")
            : activeFilter == 2
            ? data.append("receiver_type", "student")
            : data.append("receiver_type", "driver");
        activeFilter == 1
            ? data.append("receiver_name", selectedSchool)
            : activeFilter == 2
            ? data.append("receiver_name", selectedStudent)
            : data.append("receiver_name", selectedDriver);
        data.append("check_amount", checkAmount);
        data.append("bank_name", bankName);
        data.append(
            "date_check",
            shamsi
                .gregorianToJalali(checkDate.toLocaleDateString("en-CA"))
                .join("/")
        );
        data.append(
            "delivery_date",
            shamsi
                .gregorianToJalali(
                    deliveryCheckDate.toLocaleDateString("en-CA")
                )
                .join("/")
        );
        data.append("number_check", checkNumber);
        data.append("number_sayadi", sayadiNumber);
        data.append("status_check", checkStatus);
        data.append("fo_check", foCheck);
        let config = {
            method: "POST",
            url: `${BASE_URL}create-transaction_check/institution`,
            data: data,
        };
        axios(config)
            .then((response) => {
                toast.success(response.data, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
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

    // Cash

    const [cashAmount, setCashAmount] = useState("");
    const [receiptNumber, setReceiptNumber] = useState("");
    const [trackingNumber, setTrackingNumber] = useState("");
    const [cashDeliveryDate, setCashDeliveryDate] = useState(new Date());
    const [foCash, setFoCash] = useState("");
    function handleDeliveryDate(vals) {
        setCashDeliveryDate(vals.toDate());
    }

    const cashHandler = (e) => {
        let data = new FormData();
        data.append("id_institution", instituteInfo.id);
        activeFilter == 1
            ? data.append("id_dri_stu_sch", selectedSchool)
            : activeFilter == 2
            ? data.append("id_dri_stu_sch", selectedStudent)
            : data.append("id_dri_stu_sch", selectedDriver);

        data.append("type_transaction", sttsOne);
        data.append("payment_method", "نقدی");

        activeFilter == 1
            ? data.append("receiver_type", "school")
            : activeFilter == 2
            ? data.append("receiver_type", "student")
            : data.append("receiver_type", "driver");
        activeFilter == 1
            ? data.append("receiver_name", selectedSchool)
            : activeFilter == 2
            ? data.append("receiver_name", selectedStudent)
            : data.append("receiver_name", selectedDriver);
        data.append("check_amount", cashAmount);
        data.append("receipt_number", receiptNumber);
        data.append("tracking_number", trackingNumber);
        data.append(
            "delivery_date",
            shamsi
                .gregorianToJalali(cashDeliveryDate.toLocaleDateString("en-CA"))
                .join("/")
        );

        data.append("fo_cash", foCash);
        data.append("status_cash", "ok");

        let config = {
            method: "POST",
            url: `${BASE_URL}create-transaction_cash/institution`,
            data: data,
        };
        axios(config)
            .then((response) => {
                toast.success(response.data.message, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
            .catch((err) => {
                toast.error(err.response.data.message, {
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

    console.log(selectedSchool, selectedStudent, selectedDriver);
    return (
        <Main>
            <div className="head">
                <h6>ثبت عملیات حسابداری جدید</h6>
                <button className="remove">
                    حذف تراکنش
                    <svg
                        width="18"
                        height="19"
                        viewBox="0 0 18 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M4.5 6.36914V15.3691C4.5 16.1976 5.17157 16.8691 6 16.8691H12C12.8284 16.8691 13.5 16.1976 13.5 15.3691V6.36914H4.5Z"
                            fill="#3699FF"
                        />
                        <path
                            opacity="0.3"
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M10.5 3.74414V3.61914C10.5 3.06686 10.0523 2.61914 9.5 2.61914H8.5C7.94772 2.61914 7.5 3.06686 7.5 3.61914V3.74414H4.25C3.97386 3.74414 3.75 3.968 3.75 4.24414V4.36914C3.75 4.64528 3.97386 4.86914 4.25 4.86914H13.75C14.0261 4.86914 14.25 4.64528 14.25 4.36914V4.24414C14.25 3.968 14.0261 3.74414 13.75 3.74414H10.5Z"
                            fill="#3699FF"
                        />
                    </svg>
                </button>
            </div>
            <div className="row-inp">
                <label>
                    <span>نوع تراکنش</span>
                    <select
                        onChange={(e) => {
                            setSttsOne(e.target.value);
                        }}
                        name=""
                        id=""
                    >
                        <option value="پرداخت">پرداخت</option>
                        <option value="دریافت">دریافت</option>
                    </select>
                    <small>لطفا نوع تراکنش را وارد کنید.</small>
                </label>
                <label>
                    <span>روش پرداخت</span>
                    <select
                        onChange={(e) => {
                            setCashOrCheck(e.target.value);
                        }}
                        name=""
                        id=""
                    >
                        <option value="check">چک</option>
                        <option value="cash">نقد</option>
                    </select>
                    <small>لطفا روش پرداخت را وارد کنید.</small>
                </label>
                <label className="filter">
                    {sttsOne == "پرداخت" ? (
                        <div className="d-flex">
                            <span>پرداخت به</span>
                            <button
                                className={activeFilter == 1 && "active"}
                                onClick={() => {
                                    setActiveFilter(1);
                                }}
                            >
                                مدرسه
                            </button>
                            <button
                                className={activeFilter == 2 && "active"}
                                onClick={() => {
                                    setActiveFilter(2);
                                }}
                            >
                                دانش آموز
                            </button>
                            <button
                                className={activeFilter == 3 && "active"}
                                onClick={() => {
                                    setActiveFilter(3);
                                }}
                            >
                                راننده
                            </button>
                        </div>
                    ) : (
                        <div className="d-flex">
                            <span>دریافت از</span>
                            <button
                                className={activeFilter == 1 && "active"}
                                onClick={() => {
                                    setActiveFilter(1);
                                }}
                            >
                                مدرسه
                            </button>
                            <button
                                className={activeFilter == 2 && "active"}
                                onClick={() => {
                                    setActiveFilter(2);
                                }}
                            >
                                دانش آموز
                            </button>
                            <button
                                className={activeFilter == 3 && "active"}
                                onClick={() => {
                                    setActiveFilter(3);
                                }}
                            >
                                راننده
                            </button>
                        </div>
                    )}
                    {activeFilter == 1 ? (
                        <select
                            name=""
                            id=""
                            onChange={(e) => {
                                setSelectedSchool(e.target.value);
                            }}
                            value={selectedSchool}
                        >
                            <option value="">انتخاب مدرسه</option>
                            {schools !== undefined &&
                                schools.map((item) => {
                                    return (
                                        <option value={item.id}>
                                            {item.name}
                                        </option>
                                    );
                                })}
                        </select>
                    ) : activeFilter == 2 ? (
                        <select
                            onChange={(e) => {
                                setSelectedStudent(e.target.value);
                            }}
                        >
                            <option value="">انتخاب دانش آموز</option>
                            {student !== undefined &&
                                student.map((item) => {
                                    return (
                                        <option value={item.student_id}>
                                            {item.student_name}{" "}
                                            {item.student_l_name}
                                        </option>
                                    );
                                })}
                        </select>
                    ) : (
                        <select
                            onChange={(e) => {
                                setSelectedSDriver(e.target.value);
                            }}
                            name=""
                            id=""
                        >
                            <option value="">انتخاب راننده</option>
                            {driversList !== undefined &&
                                driversList.map((item) => {
                                    return (
                                        <option value={item.id_driver}>
                                            {item.name_driver}
                                            {item.family_driver}
                                        </option>
                                    );
                                })}
                        </select>
                    )}
                    <small>لطفا نام گیرنده چک را وارد کنید.</small>
                </label>
            </div>
            {cashOrCheck == "check" ? (
                <>
                    <div className="row-inp">
                        <label>
                            <span>مبلغ چک</span>
                            <input
                                onChange={(e) => {
                                    setCheckAmount(e.target.value);
                                }}
                                type="text"
                                name=""
                                id=""
                            />
                            <span className="abs-span">ریال</span>

                            <small>لطفامبلغ چک را وارد کنید.</small>
                        </label>
                        <label>
                            <span>نام بانک</span>
                            <select
                                name=""
                                id=""
                                onChange={(e) => {
                                    setBankName(e.target.value);
                                }}
                            >
                                <option value="ملی">ملی</option>
                                <option value="مسکن">مسکن</option>
                            </select>
                            <small>لطفا نام بانک را وارد کنید.</small>
                        </label>
                        <label>
                            <span>تاریخ چک</span>
                            <div className="date-rel">
                                <DatePicker
                                    calendar={persian}
                                    locale={persian_fa}
                                    onChange={handleCheckDate}
                                    value={checkDate}
                                    format="YYYY/MM/DD"
                                    calendarPosition="bottom-right"
                                    placeholder="از تاریخ 1401.07.12"
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
                            <small>لطفا تاریخ چک را وارد کنید.</small>
                        </label>
                    </div>
                    <div className="row-inp">
                        <label>
                            <span>تاریخ تحویل</span>
                            <div className="date-rel">
                                <DatePicker
                                    calendar={persian}
                                    locale={persian_fa}
                                    onChange={handleDeliveryCheckDate}
                                    value={deliveryCheckDate}
                                    format="YYYY/MM/DD"
                                    calendarPosition="bottom-right"
                                    placeholder="از تاریخ 1401.07.12"
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
                            <small>لطفا تاریخ تحویل را وارد کنید.</small>
                        </label>
                        <label>
                            <span>شماره چک</span>
                            <input
                                onChange={(e) => {
                                    setCheckNumber(e.target.value);
                                }}
                                type="text"
                                name=""
                                id=""
                            />
                            <small>لطفا شماره چک را وارد کنید.</small>
                        </label>
                        <label>
                            <span>شماره صیادی</span>
                            <input
                                onChange={(e) => {
                                    setSayadiNumber(e.target.value);
                                }}
                                type="text"
                                name=""
                                id=""
                            />
                            <small>لطفا شماره صیادی چک را وارد کنید.</small>
                        </label>
                    </div>
                    <div className="row-inp">
                        <label>
                            <span>وضعیت چک</span>
                            <select
                                name=""
                                id=""
                                onChange={(e) => {
                                    setCheckStatus(e.target.value);
                                }}
                            >
                                <option value="wating">در انتظار وصول</option>
                                <option value="reject">پاس نشده</option>
                                <option value="ok">پاس شده</option>
                                <option value="return">برگشت خورده</option>
                            </select>
                            <small>لطفا وضعیت چک را وارد کنید.</small>
                        </label>
                    </div>
                    <div className="row-inp">
                        <label className="w-100">
                            <span>بابت</span>
                            <input
                                type="text"
                                className="w-100"
                                onChange={(e) => {
                                    setFoCheck(e.target.value);
                                }}
                            />
                            <small>لطفا بابت چک را وارد کنید.</small>
                        </label>
                    </div>
                    <hr />
                    <div className="btnss">
                        <span
                            className="cancle"
                            onClick={() => {
                                props.setshow(false);
                            }}
                        >
                            انصراف
                        </span>
                        <button onClick={checkHandler}>ثبت</button>
                    </div>
                </>
            ) : (
                <>
                    <div className="row-inp">
                        <label>
                            <span>مبلغ </span>
                            <input
                                onChange={(e) => {
                                    setCashAmount(e.target.value);
                                }}
                                type="text"
                                name=""
                                id=""
                            />
                            <span className="abs-span">ریال</span>

                            <small>لطفا مبلغ را وارد کنید.</small>
                        </label>
                        <label>
                            <span>شماره رسید</span>
                            <input
                                onChange={(e) => {
                                    setReceiptNumber(e.target.value);
                                }}
                                type="text"
                                name=""
                                id=""
                            />

                            <small>لطفا شماره رسید را وارد کنید.</small>
                        </label>
                        <label>
                            <span>شماره پیگیری</span>
                            <input
                                onChange={(e) => {
                                    setTrackingNumber(e.target.value);
                                }}
                                type="text"
                                id=""
                            />
                            <small>لطفا شماره پیگیری را وارد کنید.</small>
                        </label>
                    </div>
                    <div className="row-inp">
                        <label>
                            <span>تاریخ تحویل</span>
                            <div className="date-rel">
                                <DatePicker
                                    calendar={persian}
                                    locale={persian_fa}
                                    onChange={handleDeliveryDate}
                                    value={cashDeliveryDate}
                                    format="YYYY/MM/DD"
                                    calendarPosition="bottom-right"
                                    placeholder="از تاریخ 1401.07.12"
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
                            <small>لطفا تاریخ تحویل را وارد کنید.</small>
                        </label>
                    </div>
                    <div className="row-inp">
                        <label className="w-100">
                            <span>بابت</span>
                            <input
                                onChange={(e) => {
                                    setFoCash(e.target.value);
                                }}
                                type="text"
                                name=""
                                id=""
                                className="w-100"
                            />
                            <small>لطفا بابت چک را وارد کنید.</small>
                        </label>
                    </div>
                    <hr />
                    <div className="btnss">
                        <span
                            className="cancle"
                            onClick={() => {
                                props.setshow(false);
                            }}
                        >
                            انصراف
                        </span>
                        <button onClick={cashHandler}>ثبت</button>
                    </div>
                </>
            )}
        </Main>
    );
};

export default EditCheckInfo;
