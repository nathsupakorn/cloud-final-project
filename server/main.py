import tensorflow as tf
from object_detection.utils import config_util
from object_detection.utils import label_map_util
from object_detection.builders import model_builder
import numpy as np
import base64
from PIL import Image
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import sys
from io import BytesIO
import warnings
warnings.filterwarnings('ignore')

os.environ['PYTHONPATH']+=f":{os.getcwd()}/models"
sys.path.append(f"{os.getcwd()}/models/research")

app = FastAPI()

app.add_middleware(CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
    )
CHECKPOINT_PATH="./trained-model/model"
CONFIG_PATH="./trained-model/pipeline.config"

# Load pipeline config and build a detection model
configs = config_util.get_configs_from_pipeline_file(CONFIG_PATH)
detection_model = model_builder.build(model_config=configs['model'], is_training=False)

# Restore checkpoint
ckpt = tf.compat.v2.train.Checkpoint(model=detection_model)
ckpt.restore(os.path.join(CHECKPOINT_PATH, 'ckpt-20')).expect_partial()

class PredictedImage(BaseModel):
    image: bytes


@tf.function
def detect_fn(predicted_image):
    predicted_image, shapes = detection_model.preprocess(predicted_image)
    prediction_dict = detection_model.predict(predicted_image, shapes)
    detections = detection_model.postprocess(prediction_dict, shapes)
    return detections

def predict(image_np):
    input_tensor = tf.convert_to_tensor(np.expand_dims(image_np, 0), dtype=tf.float32)
    detections = detect_fn(input_tensor)

    label_id_offset = 1
    category_index = label_map_util.create_category_index_from_labelmap('./trained-model/label_map.pbtxt')
    my_classes = detections['detection_classes'][0].numpy() + label_id_offset
    my_scores = detections['detection_scores'][0].numpy()

    output = {}
    for index,value in enumerate(my_classes):
        if  category_index.get(int(value))['name'] in output:
            if output[category_index.get(int(value))['name']] <  float(my_scores[index]):
                output[category_index.get(int(value))['name']] = float(my_scores[index])
        else:
            output[category_index.get(int(value))['name']] =  float(my_scores[index])

    return output

def load_image_into_numpy_array(blob):
    return np.array(Image.open(blob))

@app.get("/")
def root():
    return {"message": "server is running"}

@app.post("/predict")
async def predict_endpoint(request_body: PredictedImage):
    image_dict = request_body.dict()
    im_bytes = base64.b64decode(image_dict['image'])
    image_array = load_image_into_numpy_array(BytesIO(im_bytes))

    output =  predict(image_array)
    return {'prediction': output}
