
# MangoDoc

A Novel Deep Ensemble Learning approach for mango diseases detection

## Project Overview

Agriculture plays a vital role in the economic growth and balance of the country however, the agriculture domain faces many challenges like diseases and pests which causes 30% of cultivation to destruct annually. Hence this research is focused on providing a solution to identify mango diseases, pests, and nutrient deficiencies and provide management and precautionary measures to avoid mass destruction in cultivation. MangoDoc introduces a novel deep ensemble learning approach for multi-class classification and a large dataset used to train the built ensemble model. The implemented approach was benchmarked and tested with a range of evaluation metrics, and the results show that the proposed approach has outperformed all the existing work in the multi-class classification. A cross-platform mobile application was developed under this project with multiple features targeting the end users.


## Research Overview

A novel deep learning approach is introduced here for multi-class classification. A deep ensemble approach was implemented here with the use of pre-trained ResNet50, InceptionV3 and Xception models and these 3 models were used as the base models of the ensemble approach.

Classification addressed here is based on mango diseases and the classification is carried out across 8 classes. The dataset that has been used in this implementation includes 8,000  images of mango diseases, pest attacks, pests and nutrition deficiencies. Dataset has been divided into 7:2:1 ratio as train, test and validate respectively.

In this implementation, several base models have been tested with the created dataset to identify the best performing Keras pre-trained model and according to the received results ResNet50, InceptionV3 and Xception models with ImageNet weights were selected. Each chosen base model was modified by removing, adding and freezing layers to achieve the best performance from each model for classification. Base models were subjected to two ensemble techniques, averaging and weighted averaging and from the test results weighted average has performed with better results hence weighted averaging was utilized when building the Ensemble model.

The Deep Ensemble approach has outperformed the performance of the base models from all the selected evaluation metrics. Apart from Accuracy, Precision, Recall and F1-Score few more evaluation metrics were selected to avoid the error from data imbalance across the classes. (ROC AUC Score, Log Loss)

## Technology Stack

### Machine Learning Model - Libraries

 - os
 - numpy
 - sklearn
 - tensorflow
 - keras
 - matplotlib
 - seaborn
 - pandas
 - random


### Back-End - Flask

### Mobile Application - React Native

