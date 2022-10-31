import React from "react";
import styled from "styled-components";

const Main = styled.div`
    position: fixed;
    width: 1035px;
    bottom: 50%;
    left: 50%;
    transform: translate(-50%, 50%);
    background: #ffffff;
    border-radius: 12px;
    z-index: 999;
    padding: 30px;
    .head {
        border-bottom: 1px solid #eff2f5;
        padding-bottom: 20px;
        width: 100%;
        h6 {
            font-weight: 600;
            font-size: 14px;
            line-height: 21px;
            text-align: right;
            color: #464e5f;
        }
    }
    .labels {
        display: flex;
        margin-top: 23px;
        border-bottom: 1px solid #eff2f5;
        padding-bottom: 20px;

        label {
            display: flex;
            flex-direction: column;
            margin-left: 30px;
            font-weight: 400;
            font-size: 13px;
            line-height: 20px;
            color: #464e5f;
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
    }
    .btns {
        display: flex;
        align-items: center;
        width: 100%;
        justify-content: flex-end;
        padding-top: 21px;

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

const FilterComponent = (props) => {
    return (
        <Main>
            <div className="head">
                <h6>فیلتر</h6>
            </div>
            <div className="labels">
                <label>
                    وضعیت
                    <select name="" id="">
                        <option value="">همه</option>
                    </select>
                </label>
                <label>
                    جنسیت
                    <select name="" id="">
                        <option value="">همه</option>
                    </select>
                </label>
            </div>
            <div className="btns">
                <button
                    onClick={() => {
                        props.setshow(false);
                    }}
                    className="cancle"
                >
                    انصراف
                </button>
                <button className="submit">اعمال</button>
            </div>
        </Main>
    );
};

export default FilterComponent;
