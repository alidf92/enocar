import { useEffect, useState } from "react";
import styled from "styled-components";
import * as shamsi from "shamsi-date-converter";
import axios from "axios";
import { BASE_URL } from "../BaseUrl";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Main = styled.div`
    padding: 30px 36px;
    .Toastify__toast-container {
        white-space: nowrap;
        width: unset !important;
    } 
    .head { 
        width: 100%;
        background: #ffffff;
        border-radius: 12px;
        padding: 14px 30px;
        padding-bottom: 0;
        .rows {
            margin-top: 10px;
            display: flex;
            justify-content: space-between;
            width: 100%;
            padding-bottom: 20px;
            border-bottom: 1px solid #eff2f5;
            .right {
                display: flex;
                align-items: center;
                img {
                    margin-left: 22px;
                }
                .name {
                    font-weight: 700;
                    font-size: 19px;
                    line-height: 22px;
                    text-align: right;
                    color: #3f4254;
                    display: block;
                    margin-bottom: 20px;
                }
                .number {
                    font-weight: 700;
                    font-size: 19px;
                    line-height: 22px;
                    text-align: right;
                    color: #3f4254;
                    margin-bottom: 20px;
                    display: block;
                }
                .svgs {
                    display: flex;
                    small {
                        margin: 0 2px;
                        font-weight: 500;
                        font-size: 14px;
                        text-align: right;

                        color: #b5b5c3;
                    }
                }
            }
            .left {
                .btns {
                    display: flex;
                    justify-content: flex-end;
                    button {
                        display: flex;
                        align-items: center;
                        font-weight: 700;
                        font-size: 12px;
                        line-height: 14px;
                        color: #ffffff;
                        height: 34px;
                        border-radius: 6px;
                        margin: 0 6px;
                        padding: 0 14px;
                        svg {
                            margin: 0 9px;
                        }
                    }
                    .p-btn {
                        background: #8950fc;
                    }
                    .r-btn {
                        background: #f64e60;
                    }
                    .g-btn {
                        background: #1bc5bd;
                    }
                }
                .dasheds {
                    display: flex;
                    margin-top: 24px;
                    .div-1 {
                        width: 193px;
                        height: 50px;
                        background: #ffffff;
                        border: 1px dashed #e4e6ef;
                        border-radius: 6px;
                        padding: 14px;
                        font-weight: 900;
                        font-size: 19px;
                        line-height: 22px;
                        display: flex;
                        align-items: center;
                        text-align: right;
                        margin-left: 20px;
                    }
                    .div-2 {
                        width: 193px;
                        height: 50px;
                        background: #ffffff;
                        border: 1px dashed #e4e6ef;
                        border-radius: 6px;
                        padding: 14px;
                        font-weight: 900;
                        font-size: 19px;
                        line-height: 22px;
                        display: flex;
                        align-items: center;
                        text-align: right;
                        color: #3f4254;
                    }
                }
            }
        }
        .tabs {
            display: flex;
            align-items: center;
            .item {
                padding: 18px;
                border-bottom: 2px solid #fff;
                cursor: pointer;
            }
            .active {
                border-bottom: 2px solid #00a3ff;
                color: #00a3ff;
            }
        }
    }
    .cont {
        margin-top: 23px;
        display: flex;
        justify-content: space-between;
        .form-1 {
            background: #ffffff;
            border-radius: 12px;
            margin-bottom: 47px;
            .file {
                width: 100%;
                height: 243px;
                background: #eff2f5;
                border-radius: 6px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .img-s {
                height: 243px;
                border-radius: 6px;
                margin-right: auto;
                margin-left: auto;
            }
            .to-full {
                width: 600px;
                position: fixed;
                top: 50%;
                right: 50%;
                transform: translate(50%, -50%);
            }
            input[type="file"] {
                display: none;
            }
        }
        .head {
            padding: 22px 30px;
            border-bottom: 1px solid #eff2f5;
            display: flex;
            align-items: center;
            justify-content: space-between;
            h6 {
                font-weight: 700;
                font-size: 20px;
                line-height: 23px;
                text-align: right;
                color: #3f4254;
            }
            span {
                font-weight: 500;
                font-size: 16px;
                line-height: 19px;
                color: #a1a5b7;
            }
        }
        form {
            padding: 25px 30px;
        }
        .no-jus {
            width: 50%;
            justify-content: flex-start !important;
        }
        label {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            margin-bottom: 30px;
            font-weight: 500;
            font-size: 15px;
            line-height: 18px;
            text-align: right;
            white-space: nowrap;
            color: #3f4254;
            input {
                background: #f5f8fa;
                border-radius: 6px;
                width: 100%;
                max-width: 359px;

                height: 42px;
                margin: 10px;
            }
            label {
                justify-content: flex-start;
                margin-bottom: 0 !important;
            }
            input[type="radio"] {
                width: 30px;
                height: 30px;
                :first-child {
                    margin-right: 64px;
                }
            }
        }
        .right,
        .left {
            width: 49%;
        }
    }
    .center {
        width: 100%;
        display: flex;
        justify-content: center;
    }
    .sub {
        height: 52px;
        background: #00a3ff;
        border-radius: 6px;
        color: #fff;
        width: 100%;
        margin-right: auto;
        margin-left: auto;
    }
`;
const InstituteInfo = (props) => {
    const [activeTab, setActiveTab] = useState(1);
    // const [toFull, setToFull] = useState(false);
    // console.log(props.data.Driver);
    // const [name, setName] = useState("");

    // const [lastName, setLastName] = useState("");
    // const [fatherName, setFatherName] = useState("");
    // const [gender, setGender] = useState("");
    // const [phoneNumber, setPhoneNumber] = useState("");
    // const [duty, setDuty] = useState("");
    // const [birthDay, setBirthDay] = useState("");
    // const [nationalCode, setNationalCode] = useState("");
    // const [shenas, setShenas] = useState("");
    // const [issuanceCity, setIssuanceCity] = useState("");
    // const [marry, setMarry] = useState("");
    // const [email, setEmail] = useState("");
    // const [sheba, setSheba] = useState("");
    // const [bank, setBank] = useState("");
    // const [sooImg, setSooImg] = useState("");
    // const [issuanceCertificateDate, setIssuanceCertificateDate] = useState("");
    // const [certificateExpireDate, setCertificateExpireDate] = useState("");
    // const [certificateType, setCertificateType] = useState("");
    // const [certificateImg, setCertificateImg] = useState("");
    // const [state, setState] = useState("");
    // const [city, setCity] = useState("");
    // const [address, setAddress] = useState("");
    // const [constPhone, setConstPhone] = useState("");
    // const [location, setLocation] = useState("");

    // // Car
    // const [model, setModel] = useState("");
    // const [pelakType, setPelakType] = useState("");
    // const [pelak, setPelak] = useState("");
    // const [color, setColor] = useState("");
    // const [construcYear, setConstrucYear] = useState("");
    // const [ownerName, setOwnerName] = useState("");
    // const [ownerNationalCode, setOwnerNationalCode] = useState("");
    // const [cartImg, setCartImg] = useState("");
    // const [bimeh, setBimeh] = useState("");
    // const [examinExpireDate, setExaminExpireDate] = useState("");

    // useEffect(() => {
    //     if (props.data.Driver !== undefined) {
    //         setName(props.data.Driver.name);
    //         setLastName(props.data.Driver.l_name);
    //         setFatherName(props.data.Driver.father_name);
    //         setGender(props.data.Driver.gender);
    //         setPhoneNumber(props.data.Driver.phone_number);
    //         setDuty(props.data.Driver.duty_system_status);
    //         setBirthDay(props.data.Driver.date_birth);
    //         setNationalCode(props.data.Driver.national_code);
    //         setShenas(props.data.Driver.identification_code);
    //         setIssuanceCity(props.data.Driver.exporting_city);
    //         setMarry(props.data.Driver.marital_status);
    //         setEmail(props.data.Driver.email);
    //         setSheba(props.data.Driver.shaba_number);
    //         setBank(props.data.Driver.bank_name);
    //         setSooImg(props.data.Driver.l_name);
    //         setIssuanceCertificateDate(props.data.Driver.certificate_issu_date);
    //         setCertificateExpireDate(
    //             props.data.Driver.certificate_validity_per
    //         );
    //         setCertificateType(props.data.Driver.certificate_type);
    //         setCertificateImg(props.data.Driver.certificate_image);
    //         setState(props.data.Driver.state);
    //         setCity(props.data.Driver.city);
    //         setAddress(props.data.Driver.address);
    //         setConstPhone(props.data.Driver.const_phone);
    //         setLocation(props.data.Driver.map_driver);

    //         // Car
    //         setModel(props.data.CarDriver.model);
    //         setPelakType(props.data.CarDriver);
    //         setPelak(props.data.CarDriver.number_plates);
    //         setColor(props.data.CarDriver.color);
    //         setConstrucYear(props.data.CarDriver.year_construction);
    //         setOwnerName(props.data.CarDriver.name_car_owner);
    //         setOwnerNationalCode(props.data.CarDriver.national_code_owner);
    //         setCartImg(props.data.CarDriver.car_cart_image);
    //         setBimeh(props.data.CarDriver.insurance_image);
    //         setExaminExpireDate(props.data.CarDriver.expiry_date_tech_examin);
    //     }
    // }, [props]);
    // // Confirm
    const confirmHandler = (e) => {
        let data = new FormData();
        data.append("Id_RequestInstitutionSchool", props.toreq);
        data.append("type", "ok");
        let config = {
            method: "POST",
            url: `${BASE_URL}reject-or-accept-request-institution-for/school`,
            data: data,
        };
        axios(config).then((response) => {
            toast.success("مدرسه با موفقیت تایید شد.", {
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
    // // Regect
    const rejectHandler = (e) => {
        let data = new FormData();
        data.append("Id_RequestInstitutionSchool", props.toreq);
        data.append("type", "reject");
        let config = {
            method: "POST",
            url: `${BASE_URL}reject-or-accept-request-institution-for/school`,
            data: data,
        };
        axios(config).then((response) => {
            toast.error("رد درخواست انجام شد.", {
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

    // // Breach
    // const breachHandler = (e) => {
    //     let data = new FormData();
    //     data.append("id_request", props.idtoreq);
    //     data.append("type", "breach");
    //     let config = {
    //         method: "POST",
    //         url: `${BASE_URL}reject-or-accept-request-driver-for/institution`,
    //         data: data,
    //     };
    //     axios(config).then((response) => {
    //         toast.success("وضعیت مدرسه به نقص اطلاعات تغییر یافت.", {
    //             position: "top-center",
    //             autoClose: 5000,
    //             hideProgressBar: false,
    //             closeOnClick: true,
    //             pauseOnHover: true,
    //             draggable: true,
    //             progress: undefined,
    //         });
    //     });
    // };
    console.log(props.data.SchoolManage);
    return (
        <Main>
            <div className="head">
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
                <svg
                    onClick={() => {
                        props.setshow(false);
                    }}
                    className="c-p"
                    width="21"
                    height="16"
                    viewBox="0 0 21 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M12.2241 14.3758C11.9271 14.6645 11.9204 15.1393 12.2091 15.4363C12.4978 15.7334 12.9727 15.7401 13.2697 15.4514L12.2241 14.3758ZM20.3817 8.53777C20.6787 8.24905 20.6854 7.77423 20.3967 7.47722C20.1079 7.18021 19.6331 7.17349 19.3361 7.46222L20.3817 8.53777ZM19.3361 8.53777C19.6331 8.82649 20.1079 8.81978 20.3967 8.52277C20.6854 8.22576 20.6787 7.75094 20.3817 7.46222L19.3361 8.53777ZM13.2697 0.548635C12.9727 0.259913 12.4978 0.266631 12.2091 0.563638C11.9204 0.860645 11.9271 1.33547 12.2241 1.62419L13.2697 0.548635ZM19.8589 8.74999C20.2731 8.74999 20.6089 8.41421 20.6089 7.99999C20.6089 7.58578 20.2731 7.24999 19.8589 7.24999V8.74999ZM0.893551 7.24999C0.479338 7.24999 0.143551 7.58578 0.143551 7.99999C0.143551 8.41421 0.479338 8.74999 0.893551 8.74999V7.24999ZM13.2697 15.4514L20.3817 8.53777L19.3361 7.46222L12.2241 14.3758L13.2697 15.4514ZM20.3817 7.46222L13.2697 0.548635L12.2241 1.62419L19.3361 8.53777L20.3817 7.46222ZM19.8589 7.24999L0.893551 7.24999V8.74999L19.8589 8.74999V7.24999Z"
                        fill="#2B2B2B"
                    ></path>
                </svg>
                <div className="rows">
                    <div className="right">
                        <img
                            src={
                                props.data !== undefined &&
                                props.data.SchoolManage !== undefined &&
                                props.data.SchoolManage.logo !== undefined &&
                                props.data.SchoolManage.logo
                            }
                            width={122}
                            height={122}
                            alt=""
                        />
                        <div>
                            <span className="name">
                                {props.data !== undefined &&
                                    props.data.SchoolManage !== undefined &&
                                    props.data.SchoolManage.name !==
                                        undefined &&
                                    props.data.SchoolManage.name}
                            </span>
                            <span className="number">
                                {props.data !== undefined &&
                                    props.data.SchoolManage !== undefined &&
                                    props.data.SchoolManage.const_phone !==
                                        undefined &&
                                    props.data.SchoolManage.const_phone}
                            </span>
                            <span className="svgs">
                                <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 14 14"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M9.91683 3.50065C9.91683 5.11148 8.61099 6.41732 7.00016 6.41732C5.38933 6.41732 4.0835 5.11148 4.0835 3.50065C4.0835 1.88982 5.38933 0.583984 7.00016 0.583984C8.61099 0.583984 9.91683 1.88982 9.91683 3.50065Z"
                                        fill="#3699FF"
                                    />
                                    <path
                                        opacity="0.25"
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M10.9772 8.23869C10.6176 7.82179 9.99998 7.84327 9.51705 8.1076C8.76973 8.51665 7.91202 8.7492 7 8.7492C6.08798 8.7492 5.23027 8.51665 4.48295 8.1076C4.00001 7.84327 3.38241 7.82179 3.02284 8.23869C2.22963 9.15835 1.75 10.3561 1.75 11.6659V12.2492C1.75 12.8935 2.27233 13.4159 2.91667 13.4159H11.0833C11.7277 13.4159 12.25 12.8935 12.25 12.2492V11.6659C12.25 10.3561 11.7704 9.15835 10.9772 8.23869Z"
                                        fill="#3699FF"
                                    />
                                </svg>
                                <small>مدرسه</small>
                                <small>
                                    {props.data !== undefined &&
                                        props.data.SchoolManage !== undefined &&
                                        props.data.SchoolManage.gender !==
                                            undefined &&
                                        props.data.SchoolManage.gender}
                                </small>
                                <small>
                                    {props.data !== undefined &&
                                        props.data.SchoolManage !== undefined &&
                                        props.data.SchoolManage.dore !==
                                            undefined &&
                                        props.data.SchoolManage.dore}
                                </small>
                            </span>
                        </div>
                    </div>
                    <div className="left">
                        <div className="btns">
                            <button className="r-btn" onClick={rejectHandler}>
                                رد درخواست
                                <svg
                                    width="16"
                                    height="15"
                                    viewBox="0 0 16 15"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        opacity="0.25"
                                        d="M8.89106 9.67027C8.99872 8.92033 9.612 8.33526 10.3981 8.23256C10.849 8.17365 11.3387 8.125 11.7264 8.125C12.1142 8.125 12.6039 8.17365 13.0547 8.23256C13.8408 8.33526 14.4541 8.92033 14.5618 9.67027C14.6235 10.1004 14.6745 10.5676 14.6745 10.9375C14.6745 11.3074 14.6235 11.7746 14.5618 12.2047C14.4541 12.9547 13.8408 13.5397 13.0547 13.6424C12.6039 13.7014 12.1142 13.75 11.7264 13.75C11.3387 13.75 10.849 13.7014 10.3981 13.6424C9.612 13.5397 8.99872 12.9547 8.89106 12.2047C8.82931 11.7746 8.77832 11.3074 8.77832 10.9375C8.77832 10.5676 8.82931 10.1004 8.89106 9.67027Z"
                                        fill="white"
                                    />
                                    <path
                                        opacity="0.25"
                                        d="M1.68452 9.67027C1.79218 8.92033 2.40546 8.33526 3.19155 8.23256C3.64242 8.17365 4.13215 8.125 4.51988 8.125C4.90761 8.125 5.39734 8.17365 5.84821 8.23256C6.6343 8.33526 7.24758 8.92033 7.35524 9.67027C7.41699 10.1004 7.46798 10.5676 7.46798 10.9375C7.46798 11.3074 7.41699 11.7746 7.35524 12.2047C7.24758 12.9547 6.6343 13.5397 5.84821 13.6424C5.39734 13.7014 4.90761 13.75 4.51988 13.75C4.13215 13.75 3.64242 13.7014 3.19155 13.6424C2.40546 13.5397 1.79218 12.9547 1.68452 12.2047C1.62277 11.7746 1.57178 11.3074 1.57178 10.9375C1.57178 10.5676 1.62277 10.1004 1.68452 9.67027Z"
                                        fill="white"
                                    />
                                    <path
                                        opacity="0.25"
                                        d="M8.89106 2.79527C8.99872 2.04533 9.612 1.46026 10.3981 1.35756C10.849 1.29865 11.3387 1.25 11.7264 1.25C12.1142 1.25 12.6039 1.29865 13.0547 1.35756C13.8408 1.46026 14.4541 2.04533 14.5618 2.79527C14.6235 3.2254 14.6745 3.6926 14.6745 4.0625C14.6745 4.4324 14.6235 4.8996 14.5618 5.32973C14.4541 6.07967 13.8408 6.66474 13.0547 6.76744C12.6039 6.82635 12.1142 6.875 11.7264 6.875C11.3387 6.875 10.849 6.82635 10.3981 6.76744C9.612 6.66474 8.99872 6.07967 8.89106 5.32973C8.82931 4.8996 8.77832 4.4324 8.77832 4.0625C8.77832 3.6926 8.82931 3.2254 8.89106 2.79527Z"
                                        fill="white"
                                    />
                                    <path
                                        d="M1.68452 2.79527C1.79218 2.04533 2.40546 1.46026 3.19155 1.35756C3.64242 1.29865 4.13215 1.25 4.51988 1.25C4.90761 1.25 5.39734 1.29865 5.84821 1.35756C6.6343 1.46026 7.24758 2.04533 7.35524 2.79527C7.41699 3.2254 7.46798 3.6926 7.46798 4.0625C7.46798 4.4324 7.41699 4.8996 7.35524 5.32973C7.24758 6.07967 6.6343 6.66474 5.84821 6.76744C5.39734 6.82635 4.90761 6.875 4.51988 6.875C4.13215 6.875 3.64242 6.82635 3.19155 6.76744C2.40546 6.66474 1.79218 6.07967 1.68452 5.32973C1.62277 4.8996 1.57178 4.4324 1.57178 4.0625C1.57178 3.6926 1.62277 3.2254 1.68452 2.79527Z"
                                        fill="white"
                                    />
                                </svg>
                            </button>
                            <button className="g-btn"
                            onClick={confirmHandler}
                            >
                                تایید
                                <svg
                                    width="16"
                                    height="15"
                                    viewBox="0 0 16 15"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        opacity="0.25"
                                        d="M8.89106 9.67027C8.99872 8.92033 9.612 8.33526 10.3981 8.23256C10.849 8.17365 11.3387 8.125 11.7264 8.125C12.1142 8.125 12.6039 8.17365 13.0547 8.23256C13.8408 8.33526 14.4541 8.92033 14.5618 9.67027C14.6235 10.1004 14.6745 10.5676 14.6745 10.9375C14.6745 11.3074 14.6235 11.7746 14.5618 12.2047C14.4541 12.9547 13.8408 13.5397 13.0547 13.6424C12.6039 13.7014 12.1142 13.75 11.7264 13.75C11.3387 13.75 10.849 13.7014 10.3981 13.6424C9.612 13.5397 8.99872 12.9547 8.89106 12.2047C8.82931 11.7746 8.77832 11.3074 8.77832 10.9375C8.77832 10.5676 8.82931 10.1004 8.89106 9.67027Z"
                                        fill="white"
                                    />
                                    <path
                                        opacity="0.25"
                                        d="M1.68452 9.67027C1.79218 8.92033 2.40546 8.33526 3.19155 8.23256C3.64242 8.17365 4.13215 8.125 4.51988 8.125C4.90761 8.125 5.39734 8.17365 5.84821 8.23256C6.6343 8.33526 7.24758 8.92033 7.35524 9.67027C7.41699 10.1004 7.46798 10.5676 7.46798 10.9375C7.46798 11.3074 7.41699 11.7746 7.35524 12.2047C7.24758 12.9547 6.6343 13.5397 5.84821 13.6424C5.39734 13.7014 4.90761 13.75 4.51988 13.75C4.13215 13.75 3.64242 13.7014 3.19155 13.6424C2.40546 13.5397 1.79218 12.9547 1.68452 12.2047C1.62277 11.7746 1.57178 11.3074 1.57178 10.9375C1.57178 10.5676 1.62277 10.1004 1.68452 9.67027Z"
                                        fill="white"
                                    />
                                    <path
                                        opacity="0.25"
                                        d="M8.89106 2.79527C8.99872 2.04533 9.612 1.46026 10.3981 1.35756C10.849 1.29865 11.3387 1.25 11.7264 1.25C12.1142 1.25 12.6039 1.29865 13.0547 1.35756C13.8408 1.46026 14.4541 2.04533 14.5618 2.79527C14.6235 3.2254 14.6745 3.6926 14.6745 4.0625C14.6745 4.4324 14.6235 4.8996 14.5618 5.32973C14.4541 6.07967 13.8408 6.66474 13.0547 6.76744C12.6039 6.82635 12.1142 6.875 11.7264 6.875C11.3387 6.875 10.849 6.82635 10.3981 6.76744C9.612 6.66474 8.99872 6.07967 8.89106 5.32973C8.82931 4.8996 8.77832 4.4324 8.77832 4.0625C8.77832 3.6926 8.82931 3.2254 8.89106 2.79527Z"
                                        fill="white"
                                    />
                                    <path
                                        d="M1.68452 2.79527C1.79218 2.04533 2.40546 1.46026 3.19155 1.35756C3.64242 1.29865 4.13215 1.25 4.51988 1.25C4.90761 1.25 5.39734 1.29865 5.84821 1.35756C6.6343 1.46026 7.24758 2.04533 7.35524 2.79527C7.41699 3.2254 7.46798 3.6926 7.46798 4.0625C7.46798 4.4324 7.41699 4.8996 7.35524 5.32973C7.24758 6.07967 6.6343 6.66474 5.84821 6.76744C5.39734 6.82635 4.90761 6.875 4.51988 6.875C4.13215 6.875 3.64242 6.82635 3.19155 6.76744C2.40546 6.66474 1.79218 6.07967 1.68452 5.32973C1.62277 4.8996 1.57178 4.4324 1.57178 4.0625C1.57178 3.6926 1.62277 3.2254 1.68452 2.79527Z"
                                        fill="white"
                                    />
                                </svg>
                            </button>
                        </div>
                        <div className="dasheds">
                            <div className="div-1">
                                {/* {props.data.CarDriver !== undefined &&
                                    props.data.CarDriver.number_plates}{" "} */}
                            </div>
                            <div className="div-2">
                                {/* {props.data.CarDriver !== undefined &&
                                    props.data.CarDriver.car_type}{" "}
                                {props.data.CarDriver !== undefined &&
                                    props.data.CarDriver.model}{" "}
                                -{" "}
                                {props.data.CarDriver !== undefined &&
                                    props.data.CarDriver.color}{" "} */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="tabs">
                    <div
                        onClick={() => {
                            setActiveTab(1);
                        }}
                        className={activeTab === 1 ? "item active" : "item"}
                    >
                        اطلاعات مدرسه
                    </div>
                    <div
                        onClick={() => {
                            setActiveTab(3);
                        }}
                        className={activeTab === 3 ? "item active" : "item"}
                    >
                        پیام‌ها
                    </div>
                    <div
                        onClick={() => {
                            setActiveTab(4);
                        }}
                        className={activeTab === 4 ? "item active" : "item"}
                    >
                        نظرات و شکایات
                    </div>
                </div>
            </div>
            {activeTab === 1 ? (
                <div className="cont">
                    <div className="right">
                        <div className="form-1">
                            <div className="head">
                                <h6>اطلاعات مدرسه</h6>
                                <span>
                                    آغاز همکاری :{" "}
                                    {/* {props.data.Driver !== undefined &&
                                        console.log(
                                            props.data.Driver.created_at.substr(
                                                0,
                                                10
                                            )
                                        )}
                                    {props.data.Driver !== undefined &&
                                        shamsi
                                            .gregorianToJalali(
                                                props.data.Driver.created_at
                                                    .substr(0, 10)
                                                    .toLocaleDateString("en-CA")
                                            )
                                            .join("/")} */}
                                    {props.data !== undefined &&
                                        props.data.SchoolManage !== undefined &&
                                        props.data.SchoolManage.created_at !==
                                            undefined &&
                                        shamsi
                                            .gregorianToJalali(
                                                props.data.SchoolManage.created_at.substr(
                                                    0,
                                                    10
                                                )
                                                // .toLocaleDateString("en-CA")
                                            )
                                            .join("/")}
                                </span>
                            </div>
                            <form>
                                <label>
                                    نام مدرسه
                                    {console.log(props.data)}
                                    <input
                                        disabled
                                        // onChange={(e) => {
                                        // setName(e.target.value);
                                        // }}
                                        // value={name}
                                        value={
                                            props.data !== undefined &&
                                            props.data.SchoolManage !==
                                                undefined &&
                                            props.data.SchoolManage.name !==
                                                undefined &&
                                            props.data.SchoolManage.name
                                        }
                                        // type="text"
                                    />
                                </label>
                                <label>
                                    کد مدرسه
                                    <input
                                        disabled
                                        // onChange={(e) => {
                                        // setLastName(e.target.value);
                                        // }}
                                        // value={lastName}
                                        // type="text"
                                        value={
                                            props.data !== undefined &&
                                            props.data.SchoolManage !==
                                                undefined &&
                                            props.data.SchoolManage.code !==
                                                undefined &&
                                            props.data.SchoolManage.code
                                        }
                                    />
                                </label>
                                <label>
                                    دوره
                                    <input
                                        disabled
                                        // onChange={(e) => {
                                        // setFatherName(e.target.value);
                                        // }}
                                        // value={fatherName}
                                        // type="text"
                                        value={
                                            props.data !== undefined &&
                                            props.data.SchoolManage !==
                                                undefined &&
                                            props.data.SchoolManage.dore !==
                                                undefined &&
                                            props.data.SchoolManage.dore
                                        }
                                    />
                                </label>
                                <label className="no-jus">
                                    جنسیت
                                    <label htmlFor="femail">
                                        <input
                                            disabled
                                            type="radio"
                                            name="gender"
                                            id="femail"
                                            // checked={gender == "زن"}
                                            checked={
                                                props.data !== undefined &&
                                                props.data.SchoolManage !==
                                                    undefined &&
                                                props.data.SchoolManage
                                                    .gender !== undefined &&
                                                props.data.SchoolManage
                                                    .gender == "دخترانه"
                                            }
                                        />
                                        دخترانه
                                    </label>
                                    <label htmlFor="mail">
                                        <input
                                            disabled
                                            type="radio"
                                            name="gender"
                                            id="mail"
                                            // checked={gender == "مرد"}
                                            checked={
                                                props.data !== undefined &&
                                                props.data.SchoolManage !==
                                                    undefined &&
                                                props.data.SchoolManage
                                                    .gender !== undefined &&
                                                props.data.SchoolManage
                                                    .gender == "پسرانه"
                                            }
                                        />
                                        پسرانه
                                    </label>
                                </label>
                                <label>
                                    مدیر مدرسه
                                    <input
                                        disabled
                                        // onChange={(e) => {
                                        //     setPhoneNumber(e.target.value);
                                        // }}
                                        // value={phoneNumber}
                                        type="text"
                                        value={
                                            props.data !== undefined &&
                                            props.data.SchoolManage !==
                                                undefined &&
                                            props.data.SchoolManage
                                                .name_in_manage !== undefined &&
                                            props.data.SchoolManage
                                                .name_in_manage
                                        }
                                    />{" "}
                                </label>
                                <label>
                                    شماره تلفن همراه
                                    <input
                                        disabled
                                        // onChange={(e) => {
                                        //     setDuty(e.target.value);
                                        // }}
                                        // value={duty}
                                        type="text"
                                        value={
                                            props.data !== undefined &&
                                            props.data.SchoolManage !==
                                                undefined &&
                                            props.data.SchoolManage
                                                .phone_number !== undefined &&
                                            props.data.SchoolManage.phone_number
                                        }
                                    />{" "}
                                </label>
                                <label>
                                    شماره شبا مدرسه
                                    <input
                                        disabled
                                        // onChange={(e) => {
                                        //     setBirthDay(e.target.value);
                                        // }}
                                        // value={birthDay}
                                        type="text"
                                        value={
                                            props.data !== undefined &&
                                            props.data.SchoolManage !==
                                                undefined &&
                                            props.data.SchoolManage
                                                .shaba_number !== undefined &&
                                            props.data.SchoolManage.shaba_number
                                        }
                                    />{" "}
                                </label>
                                <label>
                                    نام بانک
                                    <input
                                        disabled
                                        // onChange={(e) => {
                                        //     setNationalCode(e.target.value);
                                        // }}
                                        // value={nationalCode}
                                        type="text"
                                        value={
                                            props.data !== undefined &&
                                            props.data.SchoolManage !==
                                                undefined &&
                                            props.data.SchoolManage
                                                .bank_name !== undefined &&
                                            props.data.SchoolManage.bank_name
                                        }
                                    />{" "}
                                </label>
                                <label>
                                    شناسه حقوقی
                                    <input
                                        disabled
                                        // onChange={(e) => {
                                        //     setShenas(e.target.value);
                                        // }}
                                        // value={shenas}
                                        type="text"
                                        value={
                                            props.data !== undefined &&
                                            props.data.SchoolManage !==
                                                undefined &&
                                            props.data.SchoolManage.legel_id !==
                                                undefined &&
                                            props.data.SchoolManage.legel_id
                                        }
                                    />{" "}
                                </label>
                            </form>
                        </div>
                    </div>
                    <div className="left">
                        <div className="form-1">
                            <div className="head">
                                <h6>نشانی مدرسه</h6>
                            </div>
                            <form>
                                <label>
                                    استان
                                    <input
                                        disabled
                                        type="text"
                                        // onChange={(e) => {
                                        //     setState(e.target.value);
                                        // }}
                                        // value={state}
                                        value={
                                            props.data !== undefined &&
                                            props.data.SchoolManage !==
                                                undefined &&
                                            props.data.SchoolManage.state !==
                                                undefined &&
                                            props.data.SchoolManage.state
                                        }
                                    />
                                </label>
                                <label>
                                    شهر
                                    <input
                                        disabled
                                        type="text"
                                        // onChange={(e) => {
                                        //     setCity(e.target.value);
                                        // }}
                                        // value={city}
                                        value={
                                            props.data !== undefined &&
                                            props.data.SchoolManage !==
                                                undefined &&
                                            props.data.SchoolManage.city !==
                                                undefined &&
                                            props.data.SchoolManage.city
                                        }
                                    />
                                </label>
                                <label>
                                    نشانی
                                    <input
                                        disabled
                                        type="text"
                                        // onChange={(e) => {
                                        //     setAddress(e.target.value);
                                        // }}
                                        // value={address}
                                        value={
                                            props.data !== undefined &&
                                            props.data.SchoolManage !==
                                                undefined &&
                                            props.data.SchoolManage.address !==
                                                undefined &&
                                            props.data.SchoolManage.address
                                        }
                                    />
                                </label>
                                <label>
                                    تلفن ثابت
                                    <input
                                        disabled
                                        type="text"
                                        // onChange={(e) => {
                                        //     setConstPhone(e.target.value);
                                        // }}
                                        // value={constPhone}
                                        value={
                                            props.data !== undefined &&
                                            props.data.SchoolManage !==
                                                undefined &&
                                            props.data.SchoolManage
                                                .const_phone !== undefined &&
                                            props.data.SchoolManage.const_phone
                                        }
                                    />
                                </label>
                                <div className="form-1">
                                    <label htmlFor="file" className="file">
                                        <input disabled type="file" id="file" />
                                        لوکیشن مدرسه
                                    </label>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            ) : activeTab === 2 ? (
                ""
            ) : (
                ""
            )}
        </Main>
    );
};
export default InstituteInfo;
