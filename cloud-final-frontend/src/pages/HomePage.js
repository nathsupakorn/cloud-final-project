import React from "react";
// import logo from "../logo.svg";
import { Button, Space } from 'antd';
import { useNavigate } from "react-router-dom";


export default function HomePage() {
    const navigate = useNavigate();

    return (
        <div className="App">
            <header className="App-header">
                {/* <img src={logo} className="App-logo" alt="logo" />
                <p>
                  Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                  Learn React
                </a> */}
                <Space direction="vertical" size="large">

                    <Space wrap style={{justifyContent: "center"}} size="large">
                        <img src="https://cdn-icons-png.flaticon.com/512/8390/8390024.png" style={{width: 200, transform: "scaleX(-1)"}}></img>
                        <Space>
                            <img src="https://cdn-icons-png.flaticon.com/512/8112/8112570.png" style={{width: 70}}></img>
                            <img src="https://cdn-icons-png.flaticon.com/512/8112/8112660.png" style={{width: 70}}></img>
                            <img src="https://cdn-icons-png.flaticon.com/512/8112/8112644.png" style={{width: 70}}></img>
                            <img src="https://cdn-icons-png.flaticon.com/512/8112/8112540.png" style={{width: 70}}></img>
                        </Space>
                        <Space>
                            <img src="https://cdn-icons-png.flaticon.com/512/8112/8112750.png" style={{width: 70}}></img>
                            <img src="https://cdn-icons-png.flaticon.com/512/8112/8112525.png" style={{width: 70}}></img>
                            <img src="https://cdn-icons-png.flaticon.com/512/8112/8112623.png" style={{width: 70}}></img>
                        </Space>
                        <Space>
                            <img src="https://cdn-icons-png.flaticon.com/512/8112/8112750.png" style={{width: 70}}></img>
                            <img src="https://cdn-icons-png.flaticon.com/512/8112/8112548.png" style={{width: 70}}></img>
                            <img src="https://cdn-icons-png.flaticon.com/512/8112/8112525.png" style={{width: 70}}></img>
                        </Space>
                    </Space>
                    

                    {/* <img src="https://cdn-icons-png.flaticon.com/512/8583/8583818.png" style={{width: 200}}/> */}
                    <Button size="large" type="primary" onClick={() => navigate("/game")}>Let&apos;s play</Button>
                </Space>
            </header>
        </div>
    );
}