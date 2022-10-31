import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../BaseUrl";
import axios from "axios";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import * as shamsi from "shamsi-date-converter";

const Main = styled.div`
    .Toastify__toast-container {
        white-space: nowrap;
        width: unset !important;
    }
    .status-div {
        margin-top: 20px;
        span {
            font-weight: 700;
            font-size: 14px;
            line-height: 16px;
            text-align: right;
        }
        .red-c {
            color: #f64e60;
        }
        .green-c {
            color: #119f3e;
        }
        p {
            font-weight: 500;
            font-size: 16px;
            line-height: 24px;
            color: #7e8299;
            margin-top: 12px;
        }
    }
    .btns {
        display: flex;
        margin-top: 12px;
        justify-content: flex-end;
        .submit {
            width: 136px;
            height: 42px;
            background: #00a3ff;
            border-radius: 6px;
            font-weight: 500;
            font-size: 15px;
            line-height: 18px;
            text-align: center;
            color: #ffffff;
        }
        .cancle {
            font-weight: 500;
            font-size: 15px;
            line-height: 18px;
            color: #b5b5c3;
            background-color: transparent;
            margin-left: 23px;
        }
    }
    .rmdp-time-picker {
        width: 200px;
        input {
            width: 39px !important;
        }
    }
    .bot-rad {
        border-radius: 12px !important;
    }
    .rotate {
        transform: rotate(180deg);
    }
    .ssv {
        transition: all 0.3s;
    }
    .w-0 {
        height: 0 !important;
        overflow: hidden;
    }
    .not-found {
        padding: 14px;
        font-size: 15px;
        font-weight: 500;
        color: #ce1f1f;
    }
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
    .map-div {
        position: relative;
        .students {
            position: absolute;
            width: 373px;
            height: 44px;
            right: 20px;
            top: 20px;
            background: #ffffff;
            border-radius: 12px 12px 0 0;
            .head {
                border-radius: 12px 12px 0 0;
                padding: 12px;
                border-bottom: 1px solid #eff2f5;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .inp-div {
                    position: relative;
                    svg {
                        position: absolute;
                        right: 8px;
                        top: 8px;
                    }
                    input {
                        background: #ffffff;
                        border: 1px solid rgba(210, 201, 197, 0.3);
                        border-radius: 6px;
                        width: 258px;
                        height: 38px;
                        padding-right: 28px;
                        font-weight: 400;
                        font-size: 12px;
                        color: #7e8299;
                    }
                }
                button {
                    width: 66.69px;
                    height: 32px;
                    background: #f3f6f9;
                    border-radius: 6px;
                    font-weight: 400;
                    font-size: 12px;
                    line-height: 14px;
                    color: #a1a5b7;
                }
            }
            .content {
                height: 370px;
                transition: all 0.3s;
                background-color: #fff;
                border-radius: 0 0 12px 12px;
                overflow: auto;
                .add {
                    width: 25px;
                    height: 20px;
                    line-height: 0;
                    background-color: #407dde;
                    color: #fff;
                    border-radius: 4px;
                    font-size: 19px;
                }
                .item {
                    display: flex;
                    align-items: center;
                    padding: 12px;
                    border-bottom: 1px dashed #e4e6ef;

                    input {
                        width: 24px;
                        height: 24px;
                        margin-left: 8px;
                    }
                    .div-1 {
                        display: flex;
                        justify-content: space-between;
                        margin: 0 8px;
                        span {
                            :first-child {
                                font-weight: 600;
                                font-size: 14px;
                                line-height: 21px;
                                text-align: right;
                                color: #464e5f;
                            }
                            :last-child {
                                font-weight: 500;
                                font-size: 13px;
                                line-height: 20px;
                                color: #b5b5c3;
                            }
                        }
                    }
                    .address {
                        font-weight: 500;
                        font-size: 12px;
                        line-height: 18px;
                        text-align: right;
                        color: #b5b5c3;
                        margin: 0 8px;
                        margin-top: 3px;
                    }
                }
            }
        }
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
            width: 339.95px;
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

const DeleteModal = styled.div`
    position: fixed;
    right: 50%;
    top: 50%;
    width: 500px;
    height: 200px;
    z-index: 99999;
    transform: translate(50%, -50%);
    background-color: #fff;
    border: 1px solid #dcdcdc;
    border-radius: 12px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    span {
        font-weight: 500;
    }
    .btns {
        margin-top: 40px;
        display: flex;
        align-items: center;
        .btn-danger {
            width: 100px;
        }
        .cancles {
            margin-left: 16px;
            width: 100px;
        }
    }
`;

const DriverServiceInfo = (props) => {
    const [info, setInfo] = useState([]);
    const [info2, setInfo2] = useState([]);
    const [serviceType, setServiceType] = useState();
    const [schoolList, setSchoolList] = useState([]);
    const [schoolName, setSchoolName] = useState(info.school_name);
    const [driver, setDriver] = useState("");
    const [car, setCar] = useState("");
    const [timeOfGo, setTimeOfGo] = useState(new Date());
    const [timeOfReturn, setTimeOfReturn] = useState(new Date());
    const [serviceStartDate, setServiceStartDate] = useState();
    const [serviceEndDate, setServiceEndDate] = useState(new Date());
    const [studentList, setStudentList] = useState([]);
    let infoConfig = {
        url: `${BASE_URL}get-service/select{}?service_id=${props.data.id}`,
        method: "GET",
    };

    useEffect(() => {
        axios(infoConfig)
            .then((res) => {
                setInfo2(res.data);
                setServiceType(
                    res.data.InfoService.service_type == "return_go"
                        ? "رفت و برگشت"
                        : res.data.InfoService.service_type == "return"
                        ? "برگشت"
                        : "رفت"
                );
                setServiceStartDate(res.data.InfoService.service_start_date);
                setServiceEndDate(res.data.InfoService.service_end_date);
            })
            .catch((error) => {});
    }, []);

    let phone;
    if (typeof window !== "undefined") {
        phone = localStorage.getItem("phone_number");
    }
    const [activeStudents, setActiveStudents] = useState([]);
    let infoConfigs = {
        url: `${BASE_URL}getdetilse-institution/manage{}?phone_number=${phone}`,
        method: "GET",
    };
    useEffect(() => {
        axios(infoConfigs)
            .then((res) => {
                setInfo(res.data.InstitutionManageCurrentDetails);
                let config = {
                    url: `${BASE_URL}get-list-student-active-at-service/institution{}?id_institution=${res.data.InstitutionManageCurrentDetails.id}`,
                    method: "GET",
                };
                axios(config)
                    .then((ress) => {
                        setActiveStudents(
                            ress.data.user_active_list_service_institution
                        );
                    })
                    .catch((error) => {});
            })
            .catch((error) => {});
    }, []);

    function handleTimeGo(vals) {
        setTimeOfGo(vals.toDate());
    }
    function handleTimeReturn(vals) {
        setTimeOfReturn(vals.toDate());
    }
    function handleStartDate(vals) {
        setServiceStartDate(vals.toDate());
    }
    function handleEndDate(vals) {
        setServiceEndDate(vals.toDate());
    }
    let schoolsConfig = {
        url: `${BASE_URL}get-list-name-school-at/service{}?institution_id=${props.infoid}`,
        method: "GET",
    };
    useEffect(() => {
        axios(schoolsConfig)
            .then((res) => {
                setSchoolList(res.data);
            })
            .catch((error) => {});
    }, []);

    const [list, setList] = useState([]);

    // Search
    const [text, setText] = useState("");
    const [resault, setResault] = useState([]);
    const [close, setClose] = useState(false);
    let newList = [];
    const subHandler = (e) => {
        let data = new FormData();
        data.append("type", "update");
        data.append("id_driver", props.driver.id);
        data.append("id_school", schoolName.split(",")[1]);
        data.append("id_institution", props.infoid);
        data.append("name_school", schoolName.split(",")[0]);
        list.map((item) => {
            newList.push(item.student_id);
        });
        data.append("ides_student", JSON.stringify(newList));
        data.append("name_driver_and_car", 2);
        data.append(
            "service_type",
            serviceType == "رفت"
                ? "go"
                : serviceType == "برگشت"
                ? "return"
                : "return_go"
        );
        data.append("time_to_go", timeOfGo);
        data.append("retutning_time", timeOfReturn);
        data.append(
            "service_start_date",
            serviceStartDate !== undefined &&
                shamsi.gregorianToJalali(serviceStartDate).join("/")
        );
        data.append(
            "service_end_date",
            serviceEndDate !== undefined &&
                shamsi.gregorianToJalali(serviceEndDate).join("/")
        );
        data.append("start_km_student", 5);
        data.append("end_km_student", 5);

        let config = {
            method: "POST",
            url: `${BASE_URL}make-service/manage`,
            data: data,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
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
    const [deleteModal, setDeleteModal] = useState(false);

    const deleteHandler = (e) => {
        props.remove(info2.InfoService.service_id);
        setDeleteModal(false);
        props.setshow(false);
    };
    return (
        <Main>
            {deleteModal && (
                <DeleteModal>
                    <span>آیا از حذف این سرویس مطمئن هستید ؟</span>
                    <div className="btns">
                        <button
                            onClick={() => {
                                setDeleteModal(false);
                            }}
                            className="cancles btn btn-info"
                        >
                            انصراف
                        </button>
                        <button
                            onClick={deleteHandler}
                            className="btn btn-danger"
                        >
                            حذف
                        </button>
                    </div>
                </DeleteModal>
            )}
            <Box>
                <div className="box-head">
                    <h6>ویرایش سرویس</h6>
                    <button
                        onClick={() => {
                            setDeleteModal(true);
                        }}
                    >
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
                <div className="status-div">
                    {setInfo2 !== undefined &&
                    setInfo2.InfoService !== undefined &&
                    setInfo2.InfoService.status !== undefined &&
                    setInfo2.InfoService.status == "ok" ? (
                        <span className="green-c">سرویس در حال اجرا است.</span>
                    ) : (
                        <span className="red-c">
                            این سرویس به علت زیر توسط مدرسه رد شده است.
                        </span>
                    )}

                    <p>
                        {setInfo2 !== undefined &&
                            setInfo2.InfoService !== undefined &&
                            setInfo2.InfoService.reason_reject !== undefined &&
                            setInfo2.InfoService.reason_reject}
                    </p>
                </div>
                <div className="row-inp">
                    <label>
                        <span>نام مدرسه</span>
                        <select
                            onChange={(e) => setSchoolName(e.target.value)}
                            name=""
                            id=""
                        >
                            <option value="">انتخاب مدرسه</option>
                            {schoolList.ListNameAndIdShool !== undefined &&
                                schoolList.ListNameAndIdShool.map((item) => {
                                    return (
                                        <option value={[item.name, item.id]}>
                                            {item.name}
                                        </option>
                                    );
                                })}
                        </select>
                        <small>لطفا مدرسه را جهت سرویس دهی انتخاب کنید.</small>
                    </label>
                    <label>
                        <span>راننده و خودرو</span>
                        <select
                            onChange={(e) => setDriver(e.target.value)}
                            name=""
                            id=""
                            disabled
                        >
                            <option value="">
                                {info.InfoService !== undefined &&
                                    info.InfoService.driver_name}{" "}
                                {info.InfoService !== undefined &&
                                    info.InfoService.driver_l_name}{" "}
                                {props.car.model} {props.car.color}
                            </option>
                        </select>
                        <small>لطفا راننده و خودرو را انتخاب کنید.</small>
                    </label>
                    <label>
                        <span>نوع سرویس</span>
                        <select
                            onChange={(e) => setServiceType(e.target.value)}
                            name=""
                            id=""
                            value={serviceType}
                        >
                            <option value="رفت">رفت</option>
                            <option value="برگشت">برگشت</option>
                            <option value="رفت و برگشت">رفت و برگشت</option>
                        </select>
                        <small>لطفا نوع سرویس را انتخاب کنید.</small>
                    </label>
                </div>
                <div className="row-inp">
                    <label>
                        <span>زمان رفت</span>
                        <div className="date-rel">
                            {/* <DatePicker
                                calendar={persian}
                                locale={persian_fa}
                                format="YYYY/MM/DD"
                                calendarPosition="bottom-right"
                                placeholder=" 1401.07.12"
                            /> */}

                            <DatePicker
                                onChange={handleTimeGo}
                                value={timeOfGo}
                                disableDayPicker
                                format="HH:mm"
                                plugins={[<TimePicker />]}
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
                        </div>{" "}
                        <small>لطفا زمان رسیدن به مدرسه را انتخاب کتید.</small>
                    </label>
                    <label>
                        <span>زمان برگشت</span>
                        <div className="date-rel">
                            {/* <DatePicker
                                calendar={persian}
                                locale={persian_fa}
                                onChange={handleTimeReturn}
                                value={timeOfReturn}
                                format="YYYY/MM/DD"
                                calendarPosition="bottom-right"
                                placeholder=" 1401.07.12"
                            /> */}
                            <DatePicker
                                onChange={handleTimeReturn}
                                value={timeOfReturn}
                                disableDayPicker
                                format="HH:mm"
                                plugins={[<TimePicker />]}
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
                        <small>لطفا زمان خروج از مدرسه را وارد نمایید.</small>
                    </label>
                    <label>
                        <span>تاریخ شروع سرویس‌دهی</span>
                        <div className="date-rel">
                            <DatePicker
                                calendar={persian}
                                locale={persian_fa}
                                onChange={handleStartDate}
                                value={serviceStartDate}
                                format="YYYY/MM/DD"
                                calendarPosition="bottom-right"
                                placeholder=" 1401.07.12"
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
                        <small>لطفا تاریخ شروع سرویس‌دهی را وارد نمایید.</small>
                    </label>
                </div>
                <div className="row-inp">
                    <label>
                        <span>تاریخ پایان سرویس‌دهی</span>
                        <div className="date-rel">
                            <DatePicker
                                calendar={persian}
                                locale={persian_fa}
                                onChange={handleEndDate}
                                value={serviceEndDate}
                                format="YYYY/MM/DD"
                                calendarPosition="bottom-right"
                                placeholder=" 1401.07.12"
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
                        </div>{" "}
                        <small>
                            لطفا تاریخ پایان سرویس‌دهی را وارد نمایید.
                        </small>
                    </label>
                </div>
                <div className="title">لوکیشن دانش آموزان </div>
                <div className="map-div">
                    <img src="/images/map.png" alt="" />
                    <div className="students">
                        <div className={close ? "head bot-rad" : "head"}>
                            <div className="inp-div">
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        opacity="0.3"
                                        d="M8.28277 14.2226C8.59194 13.9134 8.59194 13.4121 8.28277 13.103C7.97361 12.7938 7.47235 12.7938 7.16319 13.103L3.99652 16.2696C3.68736 16.5788 3.68736 17.0801 3.99652 17.3892C4.30569 17.6984 4.80694 17.6984 5.11611 17.3892L8.28277 14.2226Z"
                                        fill="#4A4B68"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M16.4307 9.70378C16.4307 12.7644 13.9496 15.2454 10.889 15.2454C7.82842 15.2454 5.34733 12.7644 5.34733 9.70378C5.34733 6.6432 7.82842 4.16211 10.889 4.16211C13.9496 4.16211 16.4307 6.6432 16.4307 9.70378ZM6.93066 9.70378C6.93066 11.8899 8.70287 13.6621 10.889 13.6621C13.0751 13.6621 14.8473 11.8899 14.8473 9.70378C14.8473 7.51765 13.0751 5.74545 10.889 5.74545C8.70287 5.74545 6.93066 7.51765 6.93066 9.70378Z"
                                        fill="#4A4B68"
                                    />
                                </svg>
                                <input
                                    type="text"
                                    placeholder="جستجو دانش آموزان..."
                                    name=""
                                    id=""
                                    onChange={(e) => {
                                        setText(e.target.value);
                                        setResault(
                                            activeStudents.filter(
                                                (item) =>
                                                    item.student_name.includes(
                                                        e.target.value
                                                    ) ||
                                                    item.student_l_name.includes(
                                                        e.target.value
                                                    )
                                                // ||
                                                // item.student_address.includes(
                                                //      e.target.value
                                                // )
                                            )
                                        );
                                    }}
                                />
                            </div>
                            <button
                                onClick={() => {
                                    setClose(!close);
                                }}
                            >
                                {close ? "نمایش" : "بستن"}
                                <svg
                                    className={close ? "rotate ssv" : "ssv"}
                                    width="21"
                                    height="20"
                                    viewBox="0 0 21 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M15.029 12.5757C15.3494 12.8962 15.8689 12.8962 16.1894 12.5757C16.5098 12.2553 16.5098 11.7358 16.1894 11.4154L11.2663 6.49228C10.9557 6.18165 10.4555 6.17078 10.1317 6.46762L5.20858 10.9804C4.87453 11.2867 4.85197 11.8057 5.15818 12.1397C5.46439 12.4738 5.98342 12.4963 6.31746 12.1901L10.6614 8.20817L15.029 12.5757Z"
                                        fill="#3699FF"
                                    />
                                </svg>
                            </button>
                        </div>

                        <div className={close ? "content w-0" : "content"}>
                            {text !== undefined && text.length > 0 ? (
                                resault !== undefined &&
                                resault.length !== 0 ? (
                                    resault.map((i) => {
                                        return (
                                            <div className="item">
                                                <img
                                                    width={50}
                                                    src={i.student_image}
                                                    alt=""
                                                />
                                                <div className="w-100">
                                                    <div className="div-1">
                                                        <span>
                                                            {i.student_name}{" "}
                                                            {i.student_l_name}
                                                        </span>
                                                        <span>
                                                            {i.student_phone}
                                                        </span>
                                                    </div>
                                                    <div className="address">
                                                        {i.student_address !==
                                                            undefined &&
                                                            i.student_address}
                                                    </div>
                                                </div>
                                                <button
                                                    className="add"
                                                    onClick={() => {
                                                        if (!list.includes(i)) {
                                                            setList((old) => [
                                                                ...old,
                                                                i,
                                                            ]);
                                                        }
                                                    }}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="not-found">
                                        دانش آموزی یافت نشد !
                                    </div>
                                )
                            ) : (
                                activeStudents !== undefined &&
                                activeStudents.map((i) => {
                                    return (
                                        <div className="item">
                                            <img
                                                width={50}
                                                src={i.student_image}
                                                alt=""
                                            />
                                            <div className="w-100">
                                                <div className="div-1">
                                                    <span>
                                                        {i.student_name}{" "}
                                                        {i.student_l_name}
                                                    </span>
                                                    <span>
                                                        {i.student_phone}
                                                    </span>
                                                </div>
                                                <div className="address">
                                                    {i.student_address !==
                                                        undefined &&
                                                        i.student_address}
                                                </div>
                                            </div>
                                            <button
                                                className="add"
                                                onClick={() => {
                                                    if (!list.includes(i)) {
                                                        setList((old) => [
                                                            ...old,
                                                            i,
                                                        ]);
                                                    }
                                                }}
                                            >
                                                +
                                            </button>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>
                </div>
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
                            {list.map((item) => {
                                return (
                                    <tr>
                                        <td>
                                            <div className="img-div">
                                                <img
                                                    width={50}
                                                    height={50}
                                                    src={item.student_image}
                                                    alt=""
                                                />
                                                <div>
                                                    <span className="span-1">
                                                        {item.student_name}{" "}
                                                        {item.student_l_name}
                                                    </span>
                                                    <span className="span-2">
                                                        {item.student_phone}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="img-div">
                                                <div>
                                                    <span className="span-1">
                                                        5km
                                                    </span>
                                                    <span className="span-2">
                                                        {item.student_address !==
                                                            undefined &&
                                                            item.student_address}
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
                                            <button
                                                className="delete"
                                                onClick={() => {
                                                    setList(
                                                        list.filter(
                                                            (i) =>
                                                                i.id !== item.id
                                                        )
                                                    );
                                                }}
                                            >
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
                                );
                            })}
                        </tbody>
                    </table>
                    <div className="btns">
                        <button
                            onClick={() => {
                                props.setshow(false);
                            }}
                            className="cancle"
                        >
                            انصراف
                        </button>
                        <button onClick={subHandler} className="submit">
                            ذخیره تغییرات
                        </button>
                    </div>
                </TableDiv>
            </Box>
        </Main>
    );
};

export default DriverServiceInfo;
