import json
import base64
import requests

# private ip for web server deploying the trained model
base_url = "http://10.0.0.43:8000/"
def predict_posture(image):
    body = {"image":  base64.b64encode(image).decode('utf-8')}
    res = requests.post(f"{base_url}predict", json=body)
    return_obj = json.loads(res.text)["prediction"]
    return json.dumps({
        "statusCode": 200,
        "prediction":  return_obj
    })


def lambda_handler(event, context):

    method = event["requestContext"]["http"]["method"]
    path =  event["requestContext"]["http"]["path"]
    

    if method == "POST" and path == "/default/predict-posture":
        body = json.loads(event["body"])
        return predict_posture(base64.b64decode(body['image']))
    else:
        return 400
    