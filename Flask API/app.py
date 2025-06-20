from __future__ import division, print_function

from flask import Flask

import tensorflow as tf
from tensorflow.keras.models import load_model
import sys
import os
import glob
import re
import numpy as np

from keras.applications.imagenet_utils import preprocess_input, decode_predictions
from keras.models import load_model
from keras.preprocessing import image

from flask import Flask, redirect, url_for, request, render_template, jsonify
from werkzeug.utils import secure_filename
from gevent.pywsgi import WSGIServer

app = Flask(__name__)


custom_object1= {'preprocess_input': tf.keras.applications.resnet50.preprocess_input}
custom_object2= {'preprocess_input': tf.keras.applications.inception_v3.preprocess_input}
custom_object3= {'preprocess_input': tf.keras.applications.xception.preprocess_input}

model_1 = load_model('Resnet.h5', custom_objects=custom_object1)
model_2 = load_model('Inception.h5', custom_objects=custom_object2)
model_3 = load_model('Xception.h5', custom_objects=custom_object3)

models = [model_1, model_2, model_3]
best_weights =[0.2, 0.1, 0.1]


class_names = ['Anthracnose', 'Bacterial Canker', 'Cutting Weevil', 'Die Back', 'Gall Midge', 'Healthy', 'Powdery Mildew', 'Sooty Mould']

print('Model loaded. Check http://127.0.0.1:5000/')


def model_predict(img_path):
    img = image.load_img(img_path, target_size=(256, 256))

    # Preprocessing the image
    x = image.img_to_array(img)
    # x = np.true_divide(x, 255)
    x = np.expand_dims(x, axis=0)

    pred = [model.predict(x) for model in models]
    
    pred=np.array(pred)
        
    preds = np.tensordot(pred, best_weights, axes=((0), (0))) 
    return preds


@app.route('/predict', methods=['GET', 'POST'])
def upload():
    if request.method == 'POST':
        # Get the file from post request
        f = request.files['file']

        # Save the file to ./uploads
        basepath = os.path.dirname(__file__)
        file_path = os.path.join(
            basepath, 'uploads', secure_filename(f.filename))
        f.save(file_path)

        # Make prediction
        preds = model_predict(file_path)

        if np.amax(preds) > 0.3:
            result = class_names[int(np.argmax(preds,axis=1))]
        else:
            result = "Can't identify the image, Enter a new valid image"

        return jsonify({'prediction' : result})
    print(jsonify({'prediction' : result}))
    return None


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

