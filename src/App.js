import { Link } from "react-router-dom";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Main = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #008080;
`;

function App() {
    let navigate = useNavigate();
    useEffect(() => {
        return navigate("/login");
    }, []);
    return (
        <Main>
        </Main>
    );
}

export default App;
