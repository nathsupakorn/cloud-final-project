import React, { useEffect, useRef, useState } from "react";
import { Col, Row, Layout, Button, Space, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import {
    CameraOutlined,
    CameraFilled,
} from '@ant-design/icons';

const { Content } = Layout;

const GamePage = () => {
    const navigate = useNavigate();
    const videoRef = useRef(null);
    const photoRef = useRef(null);
    const stripRef = useRef(null);
    const colorRef = useRef(null);
    const [photoWidth, setPhotoWidth] = useState(undefined);
    const [photoHeight, setPhotoHeight] = useState(undefined);
    const [countDown, setCountDown] = useState(3);
    const [disabledButton, setDisabledButton] = useState(true);

    useEffect(() => {
        getVideo();
    }, [videoRef]);

    const getVideo = () => {
        navigator.mediaDevices
            .getUserMedia({ video: {} })
            .then(stream => {
                let video = videoRef.current;
                video.srcObject = stream;
                video.play();
            })
            .catch(err => {
                console.error("error:", err);
            });
    };

    const paintToCanvas = () => {
        let video = videoRef.current;
        let photo = photoRef.current;
        let ctx = photo.getContext("2d");

        const width = document.getElementById('player').offsetWidth;
        const height = document.getElementById('player').offsetHeight;
        photo.width = width;
        photo.height = height;

        return setInterval(() => {
            let color = colorRef.current;

            ctx.drawImage(video, 0, 0, width, height);
            let pixels = ctx.getImageData(0, 0, width, height);

            // color.style.backgroundColor = `rgb(${pixels.data[0]},${pixels.data[1]},${
            //     pixels.data[2]
            // })`;
            // color.style.borderColor = `rgb(${pixels.data[0]},${pixels.data[1]},${
            //     pixels.data[2]
            // })`;
        }, 200);
    };

    const takePhoto = () => {
        let photo = photoRef.current;
        let strip = stripRef.current;
        const width = document.getElementById('player').offsetWidth;
        const height = document.getElementById('player').offsetHeight;

        setPhotoWidth(width);
        setPhotoHeight(height);

        const data = photo.toDataURL("image/jpeg");

        // console.warn(data);
        const link = document.createElement("a");
        link.href = data;
        link.setAttribute("download", "myWebcam");
        link.innerHTML = `<img src='${data}' alt='thumbnail'/>`;
        strip.insertBefore(link, strip.firstChild);
    };

    return (
        <Content style={{padding: "5%"}}>
            <div className="webcam-video">
                <Row justify="center">
                    <Col span={24}>
                        <Space direction="vertical">
                            <video
                                onCanPlay={() => paintToCanvas()}
                                ref={videoRef}
                                className="player"
                                id="player"
                                style={{minWidth: 300, width: "100%", maxWidth: 1000, borderRadius: '1em'}}
                            />
                            <Space wrap style={{width: "100%", display: "flex", justifyContent: "end"}}>
                                {/* <Button onClick={() => takePhoto()}>Take a photo</Button> */}
                                { !disabledButton && 
                                <Typography.Title style={{padding: 0, margin: 0, backgroundColor: "#00b372", color: "white",width: 50, height: 50, borderRadius: 50}}>{countDown}</Typography.Title>
                                }
                                {disabledButton && <Button
                                    type="primary"
                                    icon={<CameraFilled />}
                                    disabled={!disabledButton}
                                    onClick={() => {
                                        setDisabledButton(false);
                                        let myAudio = new Audio( require("../audios/mixkit-simple-game-countdown-921.wav"));
                                        myAudio.play();
                                        setInterval(() => {setCountDown(countDown => countDown - 1);}, 1000);
                                        return setTimeout(() => {
                                            navigate("/main", { state : {
                                                photo: photoRef.current.toDataURL("image/jpeg")
                                            }});
                                        }, 3100);
                                    }}>Shoot</Button>}
                            </Space>
                        </Space>
                    </Col>
                    <Col span={24}>
                        <Space>
                            <canvas ref={photoRef} className="photo" style={{opacity: 0}}/>
                            <div className="photo-booth">
                                <div ref={stripRef} className="strip" />
                            </div>
                        </Space>
                    </Col>
                </Row>
            </div>
        </Content>
    );
};

export default GamePage;