import React, { useEffect, useRef } from "react";
import { Col, Row, Layout, Button, Space } from "antd";

const { Content } = Layout;

const GamePage = () => {
    const videoRef = useRef(null);
    const photoRef = useRef(null);
    const stripRef = useRef(null);
    const colorRef = useRef(null);

    useEffect(() => {
        getVideo();
    }, [videoRef]);

    const getVideo = () => {
        navigator.mediaDevices
            .getUserMedia({ video: { width: 300 } })
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

        const width = 320;
        const height = 240;
        photo.width = width;
        photo.height = height;

        return setInterval(() => {
            let color = colorRef.current;

            ctx.drawImage(video, 0, 0, width, height);
            let pixels = ctx.getImageData(0, 0, width, height);
            console.log(color, pixels);

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

        const data = photo.toDataURL("image/jpeg");

        console.warn(data);
        const link = document.createElement("a");
        link.href = data;
        link.setAttribute("download", "myWebcam");
        link.innerHTML = `<img src='${data}' alt='thumbnail'/>`;
        strip.insertBefore(link, strip.firstChild);
    };

    return (
        <Content>
            <div className="webcam-video">
                <Row justify="center">
                    <Col span={24}>
                        <Space direction="vertical">
                            <video
                                onCanPlay={() => paintToCanvas()}
                                ref={videoRef}
                                className="player"
                                style={{minWidth: 300, width: "100%", maxWidth: 500}}
                            />
                            <Button onClick={() => takePhoto()}>Take a photo</Button>
                        </Space>
                    </Col>
                    <Col span={24}>
                        <Space>
                            <canvas ref={photoRef} className="photo" />
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