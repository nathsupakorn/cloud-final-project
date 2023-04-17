import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Spin, Button, Layout, Row, Col, Checkbox, Space} from "antd";
import { fabric } from 'fabric';
import {
    DeleteFilled,
    CloseOutlined
} from '@ant-design/icons';


  
const MainPage = () => {
    const location = useLocation();
    const fabricRef = useRef(null);
    const canvasRef = useRef(null);
    const targetObject = useRef(null);
    const [isClickPhoto, setIsClickPhoto] = useState(false);
    const [checkedGrayScale, setCheckedGrayScale] = useState(false);
    const [checkedBlackWhite, setCheckedBlackWhite] = useState(false);
    const [checkedBrownie, setCheckedBrownie] = useState(false);
    const [checkedVintage, setCheckedVintage] = useState(false);
    const [checkedTechnicolor, setCheckedTechnicolor] = useState(false);
    const [checkedPolaroid, setCheckedPolaroid] = useState(false);
    const [checkedKodachrome, setCheckedKodachrome] = useState(false);

    const navigate = useNavigate();
    const [photo, setPhoto] = useState('');
    const [spin, setSpin] = useState(true);

    useEffect(() => {
        const initFabric = () => {
            fabricRef.current = new fabric.Canvas(canvasRef.current);
            fabricRef.current.setHeight(500);
            fabricRef.current.setWidth(window.innerWidth);
            fabricRef.current.on('mouse:down', (e) => {
                console.log("Helloo", e);
                targetObject.current = e.target;
                if (targetObject.current !== null && targetObject.current.filters) {
                    setIsClickPhoto(true);
                } else {
                    setIsClickPhoto(false);
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
            console.log(location.state.photo);
            const img = location.state.photo;
            if (img) {
                setPhoto(img);
                setSpin(false);
            }
        }

        return () => {
            disposeFabric();
        };
    }, [photo, fabric]);

    const applyFilter = (filter) => {
        var obj = fabricRef.current.getActiveObject();
        if (obj.filters) {
            obj.filters.push(filter);
            obj.applyFilters();
            fabricRef.current.renderAll();
            console.log(obj);
        }
    };

    const removeFilter = (type) => {
        var obj = fabricRef.current.getActiveObject();
        if (obj.filters) {
            obj.filters = obj.filters.filter((filter) => filter.type !== type);
            obj.applyFilters();
            fabricRef.current.renderAll();
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
            fabricRef.current.remove(obj);
        }
    };

    const surprise = () => {
        // const objects = [];
        // const image = new fabric.Image.fromURL(photo, function(img) {
        //     var oImg = img.set({ left: (window.innerWidth/2) - (img.width*500/img.height/2), top: 0}).scale(500/img.height);
        //     objects.push(oImg);
        //     // fabricRef.current.renderAll();
        // });
        // objects.push(new fabric.Image(require(photo), { left: (window.innerWidth/2) - (photo.width*500/photo.height/2), top: 0}));
        // objects.push(new fabric.Textbox("แกรไม่มีสิทธิ", {width: "20", left: (window.innerWidth/2), top: "5"}));
        // fabricRef.current.add(...objects);

        // const numberFilter = Math.floor(Math.random() * 7) + 1

        fabric.Image.fromURL(photo, (img) => {
            // set the size of the image
            img.scaleToHeight(fabricRef.current.height);
            img.set({left: (window.innerWidth/2) - (img.width*500/img.height/2)});
      
            // add the image to the fabricRef.current
            fabricRef.current.add(img);
            console.log(img.width*500/img.height, window.innerWidth);
            // create a new rectangle object to add on top of the image
            const objects = [
                new fabric.Rect({
                    left: 100,
                    top: 100,
                    width: 50,
                    height: 50,
                    fill: 'red',
                }),
                new fabric.Circle({
                    left: 300,
                    top: 200,
                    radius: 25,
                    fill: 'blue',
                }),
                new fabric.Textbox('Hello, world!', {
                    left: (window.innerWidth/2) - (Math.min(img.width*500/img.height, window.innerWidth)/2),
                    width: Math.min(img.width*500/img.height, window.innerWidth),
                    top: 5,
                    fontSize: 50,
                    fill: 'green',
                    textAlign: "center"
                }),
            ];
            fabricRef.current.add(...objects);
        });

        // const imgElement = new Image();
        // imgElement.src = photo;
        // imgElement.onload = () => {
        //     const img = new fabric.Image(imgElement, {
        //         left: (window.innerWidth/2) - (imgElement.width*500/imgElement.height/2),
        //         top: 0,
        //         scaleX: (500/imgElement.height),
        //         scaleY: (500/imgElement.height)
        //     });

        //     // add the image object to the canvas
        //     fabricRef.current.add(img);
        // };

        // const objects = [
        //     new fabric.Rect({
        //         left: 100,
        //         top: 100,
        //         width: 50,
        //         height: 50,
        //         fill: 'red',
        //     }),
        //     new fabric.Circle({
        //         left: 300,
        //         top: 200,
        //         radius: 25,
        //         fill: 'blue',
        //     }),
        //     new fabric.Textbox('Hello, world!', {
        //         left: (window.innerWidth/2),
        //         top: 5,
        //         fontSize: 20,
        //         fill: 'green',
        //     }),
        // ];
        // fabricRef.current.add(...objects);
    };


    return (
        <Layout.Content>
            <Spin spinning={spin}>
                <div>
                    <Row gutter={[16,16]}>
                        <Col span={24}>
                            {photo && <img alt="imgSrc" id="imgSrc" src={photo}></img>}
                            <Space>
                                <Button onClick={surprise}>Surprise</Button>
                                <Button onClick={() => {
                                    const image = new fabric.Image.fromURL(photo, function(img) {
                                        var oImg = img.set({ left: 0, top: 0}).scale(1);
                                        fabricRef.current.add(oImg);
                                    });
                                }} >Custom your meme</Button>
                                <Button onClick={() => {
                                    const text = new fabric.Textbox("Hello", {width: "20"});
                                    fabricRef.current.add(text);
                                // canvas.add(text);
                                }}> Add new Text</Button>
                                <Button onClick={() => {
                                    const circle = new fabric.Circle({
                                        radius: 65,
                                        fill: '#039BE5',
                                        left: 0,
                                        stroke: 'red',
                                        strokeWidth: 3
                                    });
                                    fabricRef.current.add(circle);
                                }}>CIrcle</Button>
                            </Space>
                        </Col>
                        <Col span={24}>
                            <Space wrap style={{justifyContent: "center"}}>
                                <Button
                                    onClick={deleteObject}
                                    icon={<DeleteFilled />}
                                >DELETE</Button>
                                <Button
                                    onClick={clearCanvas}
                                    icon={<CloseOutlined />}
                                    type="primary"
                                    danger
                                >CLEAR</Button>
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
                            </Space>
                            
                        </Col>
                        <Col span={24}>
                            <canvas id="fabric-canvas" ref={canvasRef} style={{border: "1px solid #d9d9d9"}}/>
                        </Col>
                        <Col span={24}>
                            <Button 
                                onClick={ () => {
                                    let link = document.createElement('a');
                                    link.download = 'JongTamTha.jpeg';
                                    link.href = document.getElementById('fabric-canvas').toDataURL();
                                    link.click();
                                }}
                                type="primary"
                            > Download </Button>
                        </Col>
                    </Row>
                </div>
            </Spin>
        </Layout.Content>
    );
};

export default MainPage;