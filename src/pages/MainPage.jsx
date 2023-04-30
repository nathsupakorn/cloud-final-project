import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Spin, Button, Layout, Row, Col, Checkbox, Space, Select, message, Popconfirm, Divider, Card, Empty, Typography} from "antd";
import { fabric } from 'fabric';
import {LINKSTICKER, ARRAYLINK } from "../models/LinkImages";
import { CAPTIONS, ARRAYWORD, NEUTRAL_WORDS } from "../models/WordList";
import { ReactComponent as FlipIcon } from "../icons/teenyicons_flip-vertical-solid.svg";

import Icon, {
    DeleteFilled,
    CloseOutlined,
    FontSizeOutlined,
    SmileFilled,
    ExperimentFilled,
    SaveFilled
} from '@ant-design/icons';
import { getFacePredict } from "../api/apiService";


const MainPage = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const location = useLocation();
    const fabricRef = useRef(null);
    const canvasRef = useRef(null);
    const targetObject = useRef(null);
    const [face, setFace] = useState(undefined);
    const [isClickPhoto, setIsClickPhoto] = useState(false);
    const [previewSticker, setPreviewSticker] = useState('');
    const [checkedGrayScale, setCheckedGrayScale] = useState(false);
    const [checkedBlackWhite, setCheckedBlackWhite] = useState(false);
    const [checkedBrownie, setCheckedBrownie] = useState(false);
    const [checkedVintage, setCheckedVintage] = useState(false);
    const [checkedTechnicolor, setCheckedTechnicolor] = useState(false);
    const [checkedPolaroid, setCheckedPolaroid] = useState(false);
    const [checkedKodachrome, setCheckedKodachrome] = useState(false);
    const [canFlip, setCanFlip] = useState(false);
    const [colorPicker, setColorPicker] = useState("#00000000");
    const [canChangeColor, setCanChangColor] = useState(false);

    const navigate = useNavigate();
    const [photo, setPhoto] = useState('');
    const [spin, setSpin] = useState(true);

    const fetchFace = async (image) => {
        const face = await getFacePredict(image.split(",")[1]);
        console.log(face);
        setFace(face);
        return face;
    };

    useEffect(() => {
        setSpin(true);
        const initFabric = () => {
            fabricRef.current = new fabric.Canvas(canvasRef.current);
            fabricRef.current.setHeight(500);
            fabricRef.current.setWidth(0.94*window.innerWidth);
            fabricRef.current.on('mouse:down', (e) => {
                targetObject.current = e.target;
                if (targetObject.current !== null && targetObject.current.filters ) {
                    setIsClickPhoto(true);
                    setCanFlip(true);
                } else if (targetObject.current !== null && targetObject.current.fill) {
                    setCanChangColor(true);
                } else if (targetObject.current !== null) {
                    setCanFlip(true);
                } else {
                    setIsClickPhoto(false);
                    setCanFlip(false);
                    setCanChangColor(false);
                }
            });
        };

        const disposeFabric = () => {
            fabricRef.current.dispose();
            fabricRef.current.off('mouse:down');
        };
        initFabric();

        if (location.state === null || !(Object.keys(location.state).includes('photo'))) {
            navigate("/game");
        } else {
            const img = location.state.photo;
            if (img) {
                setPhoto(img);
                fetchFace(img);
                setSpin(false);
            }
        }
        setSpin(false);
        return () => {
            disposeFabric();
        };
    }, []);

    const fetchSticker = (previewSticker, position) => {
        const {left, top, scale} = position;
        fetch(previewSticker)
            .then(response => response.blob())
            .then(blob => {
                var reader = new FileReader();
                reader.onloadend = function() {
                    // Retrieve the Base64-encoded data URL of the image
                    var base64data = reader.result;

                    // // Use the Base64-encoded data URL as needed (e.g. to create a Fabric.js Image object)
                    fabric.Image.fromURL(base64data, function(img) {
                        var oImg = img.set({ left: left, top: top}).scale(scale);
                        fabricRef.current.add(oImg);
                    });
                };
                // Load the image data into the FileReader
                reader.readAsDataURL(blob);
            })
            .catch(error => {
                // Handle any errors that occur during the fetch operation
                console.error('Error fetching image:', error);
                messageApi.error("Cannot load sticker");
            });
    };

    const applyFilter = (filter) => {
        var obj = fabricRef.current.getActiveObject();
        if (obj.filters) {
            try {
                obj.filters.push(filter);
                obj.applyFilters();
                fabricRef.current.renderAll();
            }
            catch (error) {
                messageApi.warning("Cannot apply filters on Sticker");
            }
        }
    };

    const removeFilter = (type) => {
        var obj = fabricRef.current.getActiveObject();
        if (obj.filters) {
            try {
                obj.filters = obj.filters.filter((filter) => filter.type !== type);
                obj.applyFilters();
                fabricRef.current.renderAll();
            } catch (error) {
                messageApi.warning("Cannot apply filters on Sticker");
            }
            
        }
    };

    const clearCanvas = () => {
        setIsClickPhoto(false);
        setCheckedGrayScale(false);
        setCheckedBlackWhite(false);
        setCheckedBrownie(false);
        setCheckedVintage(false);
        setCheckedTechnicolor(false);
        setCheckedPolaroid(false);
        setCheckedKodachrome(false);
        setCanFlip(false);
        setCanChangColor(false);
        fabricRef.current.clear();

    };

    const deleteObject = () => {
        var obj = fabricRef.current.getActiveObject();
        if (obj) {
            setIsClickPhoto(false);
            setCheckedGrayScale(false);
            setCheckedBlackWhite(false);
            setCheckedBrownie(false);
            setCheckedVintage(false);
            setCheckedTechnicolor(false);
            setCheckedPolaroid(false);
            setCheckedKodachrome(false);
            setCanFlip(false);
            setCanChangColor(false);
            fabricRef.current.remove(obj);
        }
    };

    const getRandomStickerLink = () => {
        const arrayLink = ARRAYLINK;
        const idxArray = parseInt(Math.random() * arrayLink.length);
        return arrayLink[idxArray];
    };

    const addStickers = (type, position, imageSize) => {
        const { width, height } = imageSize;
        const {startX, startY, endX, endY} = position;
        if (type === 1) {
            if (Math.random() < 0.5) {
                //left
                const sticker = getRandomStickerLink();
                const limitWidth = 0.1 * width;
                const padRatio = 0.5;
                const scale = (Math.random() * 0.2) + 0.3; //[0.3 - 0.5]
                const left = (Math.random() * (limitWidth*500/height)) - (scale*512*padRatio) + startX;
                const top = (Math.random() * 500) - (scale*512*padRatio) + startY;
                fetchSticker( sticker, {left, top, scale});
            } else {
                //right
                const sticker = getRandomStickerLink();
                const limitWidth = 0.1 * width;
                const padRatio = 0.5;
                const scale = (Math.random() * 0.2) + 0.3; //[0.3 - 0.5]
                const left = (Math.random() * (limitWidth*500/height)) - (scale*512*padRatio) + endX;
                const top = (Math.random() * 500) - (scale*512*padRatio) + startY;
                fetchSticker( sticker, {left, top, scale});
            }
        } else if (type === 2) {
            //pass
            const sticker1 = getRandomStickerLink();
            const limitWidth1 = 0.1 * width;
            const padRatio1 = 0.5;
            const scale1 = (Math.random() * 0.2) + 0.3; //[0.3 - 0.5]
            const left1 = (Math.random() * (limitWidth1*500/height)) - (scale1*512*padRatio1) + startX;
            const top1 = (Math.random() * 500) - (scale1*512*padRatio1) + startY;
            fetchSticker( sticker1, {left: left1, top: top1, scale: scale1});

            const sticker = getRandomStickerLink();
            const limitWidth = 0.1 * width;
            const padRatio = 0.5;
            const scale = (Math.random() * 0.2) + 0.3; //[0.3 - 0.5]
            const left = (Math.random() * (limitWidth*500/height)) - (scale*512*padRatio) + endX;
            const top = (Math.random() * 500) - (scale*512*padRatio) + startY;
            fetchSticker( sticker, {left, top, scale});
        } else if (type === 3) {
            if (Math.random() < 0.5) {
                const sticker1 = getRandomStickerLink();
                const limitWidth1 = 0.1 * width;
                const padRatio1 = 0.5;
                const scale1 = (Math.random() * 0.2) + 0.3; //[0.3 - 0.5]
                const left1 = (Math.random() * (limitWidth1*500/height)) - (scale1*512*padRatio1) + startX;
                const top1 = (Math.random() * 250) - (scale1*512*padRatio1) + startY;
                fetchSticker( sticker1, {left: left1, top: top1, scale: scale1});

                const sticker = getRandomStickerLink();
                const limitWidth = 0.1 * width;
                const padRatio = 0.5;
                const scale = (Math.random() * 0.2) + 0.3; //[0.3 - 0.5]
                const left = (Math.random() * (limitWidth*500/height)) - (scale*512*padRatio) + startX;
                const top = (Math.random() * 250) - (scale*512*padRatio) + startY + 250;
                fetchSticker( sticker, {left, top, scale});
    
                const sticker2 = getRandomStickerLink();
                const limitWidth2 = 0.1 * width;
                const padRatio2 = 0.5;
                const scale2 = (Math.random() * 0.2) + 0.3; //[0.3 - 0.5]
                const left2 = (Math.random() * (limitWidth2*500/height)) - (scale2*512*padRatio2) + endX;
                const top2 = (Math.random() * 500) - (scale2*512*padRatio2) + startY;
                fetchSticker( sticker2, {left: left2, top: top2, scale: scale2});
            } else {
                const sticker1 = getRandomStickerLink();
                const limitWidth1 = 0.1 * width;
                const padRatio1 = 0.5;
                const scale1 = (Math.random() * 0.2) + 0.3; //[0.3 - 0.5]
                const left1 = (Math.random() * (limitWidth1*500/height)) - (scale1*512*padRatio1) + startX;
                const top1 = (Math.random() * 500) - (scale1*512*padRatio1) + startY;
                fetchSticker( sticker1, {left: left1, top: top1, scale: scale1});
    
                const sticker2 = getRandomStickerLink();
                const limitWidth2 = 0.1 * width;
                const padRatio2 = 0.5;
                const scale2 = (Math.random() * 0.2) + 0.3; //[0.3 - 0.5]
                const left2 = (Math.random() * (limitWidth2*500/height)) - (scale2*512*padRatio2) + endX;
                const top2 = (Math.random() * 250) - (scale2*512*padRatio2) + startY;
                fetchSticker( sticker2, {left: left2, top: top2, scale: scale2});

                const sticker = getRandomStickerLink();
                const limitWidth = 0.1 * width;
                const padRatio = 0.5;
                const scale = (Math.random() * 0.2) + 0.3; //[0.3 - 0.5]
                const left = (Math.random() * (limitWidth*500/height)) - (scale*512*padRatio) + endX;
                const top = (Math.random() * 250) - (scale*512*padRatio) + startY + 250;
                fetchSticker( sticker, {left, top, scale});
            }
        } else {
            const sticker1 = getRandomStickerLink();
            const limitWidth1 = 0.1 * width;
            const padRatio1 = 0.5;
            const scale1 = (Math.random() * 0.2) + 0.3; //[0.3 - 0.5]
            const left1 = (Math.random() * (limitWidth1*500/height)) - (scale1*512*padRatio1) + startX;
            const top1 = (Math.random() * 250) - (scale1*512*padRatio1) + startY;
            fetchSticker( sticker1, {left: left1, top: top1, scale: scale1});

            const sticker3 = getRandomStickerLink();
            const limitWidth3 = 0.1 * width;
            const padRatio3 = 0.5;
            const scale3 = (Math.random() * 0.2) + 0.3; //[0.3 - 0.5]
            const left3 = (Math.random() * (limitWidth3*500/height)) - (scale3*512*padRatio3) + startX;
            const top3 = (Math.random() * 250) - (scale3*512*padRatio3) + startY + 250;
            fetchSticker( sticker3, {left: left3, top: top3, scale: scale3});
    
            const sticker2 = getRandomStickerLink();
            const limitWidth2 = 0.1 * width;
            const padRatio2 = 0.5;
            const scale2 = (Math.random() * 0.2) + 0.3; //[0.3 - 0.5]
            const left2 = (Math.random() * (limitWidth2*500/height)) - (scale2*512*padRatio2) + endX;
            const top2 = (Math.random() * 250) - (scale2*512*padRatio2) + startY;
            fetchSticker( sticker2, {left: left2, top: top2, scale: scale2});

            const sticker = getRandomStickerLink();
            const limitWidth = 0.1 * width;
            const padRatio = 0.5;
            const scale = (Math.random() * 0.2) + 0.3; //[0.3 - 0.5]
            const left = (Math.random() * (limitWidth*500/height)) - (scale*512*padRatio) + endX;
            const top = (Math.random() * 250) - (scale*512*padRatio) + startY + 250;
            fetchSticker( sticker, {left, top, scale});
        }
    };

    const getPositionTextBoxObject = (calInnerWidth, imageSize) => {
        const {width, height} = imageSize;
        if (face && face.BoundingBox) {
            const endTop = face.BoundingBox.Top + face.BoundingBox.Height;
            if (endTop <= 0.8) {
                //btm
                return {
                    left: (calInnerWidth/2) - (Math.min(width*500/height, calInnerWidth)/2),
                    width: Math.min(width*500/height, calInnerWidth),
                    top: 445,
                    fontSize: 50,
                    fill: 'green',
                    textAlign: "center",
                };
            }
            return {
                left: (calInnerWidth/2) - (Math.min(width*500/height, calInnerWidth)/2),
                width: Math.min(width*500/height, calInnerWidth),
                top: 5,
                fontSize: 50,
                fill: 'green',
                textAlign: "center",
            };
        }
        return {
            left: (calInnerWidth/2) - (Math.min(width*500/height, calInnerWidth)/2),
            width: Math.min(width*500/height, calInnerWidth),
            top: 5,
            fontSize: 50,
            fill: 'green',
            textAlign: "center",
        };
    };

    const randomWord = () => {
        if (face && face.Emotions) {
            const sortedEmotion = face.Emotions.sort((a,b) => b.Confidence - a.Confidence);
            if (sortedEmotion[0]) {
                const obj = CAPTIONS.find((e) => e.type === sortedEmotion[0].Type);
                const captionPool = obj.captions.concat(NEUTRAL_WORDS);
                return captionPool[parseInt(Math.random() * captionPool.length)];
            } 
            
        }
        const arrayWord = ARRAYWORD.concat(NEUTRAL_WORDS);
        return arrayWord[parseInt(Math.random() * arrayWord.length)];
    };

    const surprise = () => {
        setSpin(true);
        const calInnerWidth = 0.94*window.innerWidth;
        fabricRef.current.clear();
        fabric.Image.fromURL(photo, (img) => {
            // set the size of the image
            const startX = (calInnerWidth/2) - (img.width*500/img.height/2);
            const startY = 0;
            const endX = (calInnerWidth/2) + (img.width*500/img.height/2);
            const endY = fabricRef.current.height;
            img.scaleToHeight(fabricRef.current.height);
            img.set({left: startX});
      
            // add the image to the fabricRef.current
            fabricRef.current.add(img);
            // create a new rectangle object to add on top of the image
            addStickers(parseInt(Math.random() * 4) + 1, {startX, startY, endX, endY}, {width: img.width, height: img.height});

            const caption = randomWord();
            const objects = [
                new fabric.Textbox(caption, 
                    caption === "Hello, world!" ? 
                        {...getPositionTextBoxObject(calInnerWidth, {width: img.width, height: img.height}), fontFamily: "Menlo"} :
                        getPositionTextBoxObject(calInnerWidth, {width: img.width, height: img.height})
                ),
            ];

            fabricRef.current.add(...objects);
        });
        fabricRef.current.renderAll();
        setSpin(false);
    };


    return (
        <Layout.Content style={{margin: 0, padding: "3%"}}>
            <div style={{margin: 0, padding: 0}}>
                {contextHolder}
                <Spin spinning={spin}>
                    <Row gutter={[16,16]}>
                        <Col span={24} style={{margin: 0, padding: 0}}>
                            <Card style={{boxShadow: "0px 0px 10px #EEEEEE", padding: "5", margin: "1% 5%"}}>
                                <Space wrap style={{display: "flex", justifyContent: "space-between", alignItems: "end"}}>
                                    {photo && <img alt="imgSrc" id="imgSrc" src={photo} style={{borderRadius: "1em", maxWidth: 500}}></img>}
                                    <Space wrap style={{display: "flex", justifyContent: "center", alignItems: "end"}}>
                                        <Button onClick={surprise}>&#x1F389; SURPRISE</Button>
                                        <Button 
                                            type="primary"
                                            icon={<SmileFilled />}
                                            onClick={() => {
                                                fabric.Image.fromURL(photo, function(img) {
                                                    var oImg = img.set({ left: 0, top: 0}).scale(1);
                                                    fabricRef.current.add(oImg);
                                                });
                                            }} ></Button>
                                        <Button 
                                            type="primary"
                                            icon={<FontSizeOutlined />}
                                            onClick={() => {
                                                const text = new fabric.Textbox("Hello", {width: "20"});
                                                fabricRef.current.add(text);
                                                // canvas.add(text);
                                            }}></Button>
                                        <Button 
                                            type="primary"
                                            icon={<Icon component={ () => (
                                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="7.5" cy="7.5" r="6.5" fill="white" />
                                                </svg>
                                            )
                                            }></Icon>}
                                            onClick={() => {
                                                const circle = new fabric.Circle({
                                                    radius: 65,
                                                    fill: 'pink',
                                                    left: 0,
                                                });
                                                fabricRef.current.add(circle);
                                            }}></Button>

                                        <Button 
                                            type="primary"
                                            icon={<Icon component={ () => (
                                                <svg width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" className="" viewBox="0 0 1024 1024"><path d="M864 64H160C107 64 64 107 64 160v704c0 53 43 96 96 96h704c53 0 96-43 96-96V160c0-53-43-96-96-96z"></path></svg>
                                            )
                                            }></Icon>}
                                            onClick={() => {
                                                const rect = new fabric.Rect({
                                                    width: 130,
                                                    height: 120,
                                                    fill: 'red',
                                                });
                                                fabricRef.current.add(rect);
                                            }}></Button>

                                        <Divider></Divider>
                                        <Space wrap size="large" direction="vertical" style={{justifyContent: "end", display: "flex"}}>
                                            {previewSticker && <img src={previewSticker} width={128} height={128}></img>}
                                            {!previewSticker && 
                                                <div style={{display: "flex", justifyContent: "center"}}>
                                                    <Empty style={{width: 128, height: 128}} description={"No preview sticker"} />
                                                </div>
                                            }
                                            <Space wrap style={{justifyContent: "end", display: "flex"}}>
                                                <Select
                                                    showSearch
                                                    style={{width: "100%", minWidth: 200}}
                                                    defaultValue={undefined}
                                                    onChange={(value) => {
                                                        setPreviewSticker(value);
                                                    }}
                                                    filterOption={(input, option) =>
                                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                                    }
                                                    options={LINKSTICKER}
                                                ></Select>
                                                <Button 
                                                    type="primary"
                                                    disabled={!previewSticker}
                                                    onClick={() => {
                                                        fetchSticker(previewSticker, {left: 0, top: 0, scale: 0.5});
                                                    }}
                                                >Add sticker</Button>
                                            </Space>
                                        </Space>
                                    
                                    </Space>
                                </Space>

                            </Card>
                        </Col>
                        <Col span={24} style={{margin: 0, padding: 0}}>
                            <Space wrap style={{justifyContent: "center"}}>
                                <Checkbox checked={checkedGrayScale} disabled={!isClickPhoto} onChange={(e) => {
                                    if (e.target.checked) {
                                        applyFilter(new fabric.Image.filters.Grayscale());
                                    } else {
                                        removeFilter("Grayscale");
                                    }
                                    setCheckedGrayScale(e.target.checked);
                                }}>Grayscale</Checkbox>
                                <Checkbox checked={checkedBlackWhite} disabled={!isClickPhoto} onChange={(e) => {
                                    if (e.target.checked) {
                                        applyFilter(new fabric.Image.filters.BlackWhite());
                                    } else {
                                        removeFilter("BlackWhite");
                                    }
                                    setCheckedBlackWhite(e.target.checked);
                                }}>BlackWhite</Checkbox>
                                <Checkbox checked={checkedBrownie} disabled={!isClickPhoto} onChange={(e) => {
                                    if (e.target.checked) {
                                        applyFilter(new fabric.Image.filters.Brownie());
                                    } else {
                                        removeFilter("Brownie");
                                    }
                                    setCheckedBrownie(e.target.checked);
                                }}>Brownie</Checkbox>
                                <Checkbox checked={checkedVintage} disabled={!isClickPhoto} onChange={(e) => {
                                    if (e.target.checked) {
                                        applyFilter(new fabric.Image.filters.Vintage());
                                    } else {
                                        removeFilter("Vintage");
                                    }
                                    setCheckedVintage(e.target.checked);
                                }}>Vintage</Checkbox>
                                <Checkbox checked={checkedTechnicolor} disabled={!isClickPhoto} onChange={(e) => {
                                    if (e.target.checked) {
                                        applyFilter(new fabric.Image.filters.Technicolor());
                                    } else {
                                        removeFilter("Technicolor");
                                    }
                                    setCheckedTechnicolor(e.target.checked);
                                }}>Technicolor</Checkbox>
                                <Checkbox checked={checkedPolaroid} disabled={!isClickPhoto} onChange={(e) => {
                                    if (e.target.checked) {
                                        applyFilter(new fabric.Image.filters.Polaroid());
                                    } else {
                                        removeFilter("Polaroid");
                                    }
                                    setCheckedPolaroid(e.target.checked);
                                }}>Polaroid</Checkbox>
                                <Checkbox checked={checkedKodachrome} disabled={!isClickPhoto} onChange={(e) => {
                                    if (e.target.checked) {
                                        applyFilter(new fabric.Image.filters.Kodachrome());
                                    } else {
                                        removeFilter("Kodachrome");
                                    }
                                    setCheckedKodachrome(e.target.checked);
                                }}>Kodachrome</Checkbox>
                                <Button 
                                    disabled={!canFlip} 
                                    onClick={() => {
                                        try {
                                            fabricRef.current.getActiveObject().flipX = !(fabricRef.current.getActiveObject().flipX);
                                            fabricRef.current.renderAll();
                                        } catch (error) {
                                        //pass
                                        }
                                        
                                    }}
                                    icon={<Icon component={FlipIcon} />}
                                ></Button>
                                <Button 
                                    disabled={!canFlip} 
                                    onClick={() => {
                                        try {
                                            fabricRef.current.getActiveObject().flipY = !(fabricRef.current.getActiveObject().flipY);
                                            fabricRef.current.renderAll();
                                        } catch (error) {
                                        //pass
                                        }
                                    }}
                                    icon={<Icon component={FlipIcon} rotate={90} />}
                                ></Button>
                                {!canChangeColor && <input
                                    onChange={(value) => {
                                        setColorPicker(value.target.value);
                                        try {
                                            if (fabricRef.current.getActiveObject() && fabricRef.current.getActiveObject().fill) {
                                                fabricRef.current.getActiveObject().set({fill: value.target.value});
                                            }
                                        } catch (error) {
                                            //pass
                                        }
                                    }}
                                    style={
                                        canChangeColor ?
                                            {
                                                appearance: "none",
                                                background: 'none',
                                                border: "0",
                                                borderColor: "transparent",
                                                MozAppearance: "none",
                                                WebkitAppearance: "none",
                                                height: '2.4em',
                                                padding: 0,
                                                width: '2.4em',
                                                cursor: 'pointer',
                                                boxShadow: "0px 0px 10px #EEEEEE"
                                            } : 
                                            {
                                                appearance: "none",
                                                background: 'none',
                                                border: "0",
                                                borderColor: "transparent",
                                                MozAppearance: "none",
                                                WebkitAppearance: "none",
                                                height: '2.4em',
                                                padding: 0,
                                                width: '2.4em',
                                                cursor: 'no-drop',
                                                boxShadow: "0px 0px 10px #EEEEEE"
                                            }
                                    }
                                    disabled
                                    type="color"
                                    value={colorPicker}>
                                </input>}
                                {canChangeColor && <input
                                    onChange={(value) => {
                                        setColorPicker(value.target.value);
                                        try {
                                            if (fabricRef.current.getActiveObject() && fabricRef.current.getActiveObject().fill) {
                                                fabricRef.current.getActiveObject().set({fill: value.target.value});
                                            }
                                        } catch (error) {
                                            //pass
                                        }
                                    }}
                                    style={
                                        canChangeColor ?
                                            {
                                                appearance: "none",
                                                background: 'none',
                                                border: "0",
                                                borderColor: "transparent",
                                                MozAppearance: "none",
                                                WebkitAppearance: "none",
                                                height: '2.4em',
                                                padding: 0,
                                                width: '2.4em',
                                                cursor: 'pointer',
                                                boxShadow: "0px 0px 10px #EEEEEE"
                                            } : 
                                            {
                                                appearance: "none",
                                                background: 'none',
                                                border: "0",
                                                borderColor: "transparent",
                                                MozAppearance: "none",
                                                WebkitAppearance: "none",
                                                height: '2.4em',
                                                padding: 0,
                                                width: '2.4em',
                                                cursor: 'no-drop',
                                                boxShadow: "0px 0px 10px #EEEEEE"
                                            }
                                    }
                                    type="color"
                                    value={colorPicker}>
                                </input>}

                                <Button
                                    onClick={deleteObject}
                                    icon={<DeleteFilled />}
                                >DELETE</Button>
                                <Popconfirm
                                    title="Are you sure to delete this canvas?"
                                    description="Do you want to do this? อยากจะทำไหมภารกิจแห่งจักรวาล"
                                    onConfirm={clearCanvas}
                                    onCancel={undefined}
                                    okText="YES"
                                    cancelText="NO"
                                >
                                    <Button
                                        icon={<CloseOutlined />}
                                        type="primary"
                                        danger
                                    >CLEAR</Button>
                                </Popconfirm>
                                <Button 
                                    icon={<SaveFilled />}
                                    onClick={ () => {
                                        let link = document.createElement('a');
                                        link.download = 'JongTamTha';
                                        link.href = document.getElementById('fabric-canvas').toDataURL();
                                        link.click();
                                    }}
                                    type="primary"
                                > Download </Button>
                            </Space>
                            
                        </Col>
                        <Col span={24} style={{margin: 0, padding: 0}}>
                            <canvas id="fabric-canvas" ref={canvasRef} style={{border: "1px solid #d9d9d9"}}/>
                        </Col>
                    </Row>
                </Spin>
            </div>
        </Layout.Content>
    );
};

export default MainPage;