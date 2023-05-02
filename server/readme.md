# Installation

### Install virtualenv
```
pip3 install virtualenv 
```

### Create a virtual environment
```
virtualenv env or
python3 -m virtualenv env
```

### Activate virtual environment
```
source ./env/bin/activate
```

### Download Tensorflow model
```
git clone https://github.com/tensorflow/models.git
```

### Downlaod protobuf compiler
#### Mac user
```
brew install protobuf
```
#### Ubuntu or Linux user
```
sudo apt update
sudo apt install protobuf-compiler
```

### Compiling Protocol Buffers 
#### Go to models/research/
```
protoc object_detection/protos/*.proto --python_out=.
```

### Install object detection dependency
#### Go to models/research/
```
cp object_detection/packages/tf2/setup.py .
python3 -m pip install .
```

### Install fastapi and uvicorn
```
pip install fastapi
pip install "uvicorn[standard]" 
```
# There are 4 parts in this folder

## Part1: ml-workspace folder
```text
This folder contains files for training the model. 
In script folder, there is a file for generate tf-record which is a format for tensorflow to train the model.
In train-data and test-data, there are files for train and test data. We already create XML annotations [bounding box].
You can train model by running object_detection.ipynb.
```

## Part2: trained-model folder
```text
This folder contains trained model. You can load this model to server.
```

## Part3: aws-lambda-code
```text
This folder contain three files which is no-vpc-setup.py and final-project-vpc.py.
First, no-vpc-setup.py is a file for lambda function which does not set up vpc.
Second, final-project-vpc.py is a file for lambda function which set up the vpc. 
Third final-project-vpc.zip, we already have installed additional library. You can upload this zip to lambda workspace.
```

## Part4: server (main.py)
### To run this file

#### First, export python path
Go to models/research/
```
export PYTHONPATH=$PYTHONPATH:`pwd`:`pwd`/slim
```

#### Start the server
```
python3 -m uvicorn --host 0.0.0.0 main:app
```

### The server will be running on http://0.0.0.0:8000/