import json
import base64
import boto3
import random

rekognition_client = boto3.client("rekognition")
s3 = boto3.client("s3")

def get_random_image():
    postures = ['hello', 'no', 'iloveyou', 'yes', 'good', 'ok', 'two-finger', 'heart', 'phone', 'cool']
    emotions = ['HAPPY', 'SAD', 'CONFUSED', 'SURPRISED', 'CALM']
    postures_index = random.randint(0, len(postures)-1)
    emotion_index = random.randint(0, len(emotions)-1)
    posture = postures[postures_index]
    emotion = emotions[emotion_index]

    try:
        bucket_name = "random-images6231322621"
        filename = f'{posture}/{posture}_{emotion}.jpg'
        res = s3.get_object(Bucket=bucket_name, Key=filename)
        image = res["Body"].read()
        return {
            "statusCode": 200,
            "body": json.dumps({"data":   base64.b64encode(image).decode('utf-8'), "posture":posture, "emotion":emotion })
        }
    except:
        return {
            "statusCode": 400,
            "body": "image not found"
        }
    
def predict_emotion(image):
    response = rekognition_client.detect_faces(Image={'Bytes': image},Attributes=["ALL"])
    returnObj = {}
    details = response['FaceDetails'][0]
    returnObj = {"BoundingBox": details["BoundingBox"], 'Emotions': details['Emotions']}

    return json.dumps({
        "statusCode": 200,
        "body": returnObj
    })

def lambda_handler(event, context):

    method = event["requestContext"]["http"]["method"]
    path =  event["requestContext"]["http"]["path"]
    
    if method == "POST" and path == "/default/predict-emotion":
        body = json.loads(event["body"])
        return predict_emotion(base64.b64decode(body['image']))
    elif method == "GET" and path == "/default/getImage":
        return get_random_image()
    else:
        return 400
    