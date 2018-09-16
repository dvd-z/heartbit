# From Python
# It requires OpenCV installed for Python
import sys
import cv2
import os

import json
import glob
from pathlib import Path

from sys import platform

# Remember to add your installation path here
# Option a
dir_path = os.path.dirname(os.path.realpath(__file__))
if platform == "win32": sys.path.append(dir_path + '/../openpose/build/python/openpose/');
else: sys.path.append('../openpose/build/python');
# Option b
# If you run `make install` (default path is `/usr/local/python` for Ubuntu), you can also access the OpenPose/python module from there. This will install OpenPose and the python library at your desired installation path. Ensure that this is in your python path in order to use it.
# sys.path.append('/usr/local/python')

# Parameters for OpenPose. Take a look at C++ OpenPose example for meaning of components. Ensure all below are filled
try:
    from openpose import *
except:
    raise Exception('Error: OpenPose library could not be found. Did you enable `BUILD_PYTHON` in CMake and have this Python script in the right folder?')

params = dict()
params["logging_level"] = 3
params["output_resolution"] = "-1x-1"
params["net_resolution"] = "-1x368"
params["model_pose"] = "BODY_25"
params["alpha_pose"] = 0.6
params["render_threshold"] = 0.05
params["scale_gap"] = 0.3
params["scale_number"] = 1
# If GPU version is built, and multiple GPUs are available, set the ID here
params["num_gpu_start"] = 0
params["disable_blending"] = False
# Ensure you point to the correct path where models are located
params["default_model_folder"] = dir_path + "/../../../models/"
        
openpose = OpenPose(params)

stream = cv2.VideoCapture(0)

filenames = [img for img in glob.glob("./images/*.jpg")]

if not os.path.exists(os.path.dirname("./json")):
    os.makedirs(os.path.dirname("./json"))

for filename in filenames:
    img = cv2.imread(filename)

    split = filename.split('.')
    split = split[1].split('\\')
    outputFilename = "./json/" + split[1] + ".json";

    # Output keypoints and the image with the human skeleton blended on it
    keypoints, output_image = openpose.forward(img, True)
    # Print the human pose keypoints, i.e., a [#people x #keypoints x 3]-dimensional numpy object with the keypoints of all the people on that image
    file = open(outputFilename, "w+")
    print("test test test")
    print([(i).tolist() for i in list(keypoints)])

    print([i[0] for i in list(keypoints)])
    json.dump({"keypoints": [(i).tolist() for i in list(keypoints)]}, file)
    # Display the image
    cv2.imshow("output", output_image)
    cv2.waitKey(15)

stream.release()