import pandas as pd
import numpy as np
import joblib
from sklearn.ensemble import RandomForestClassifier
import os

# Function to train the crop recommendation model
def train_crop_recommendation_model():
    # Load the dataset
    csv_path = os.path.join('static', 'data', 'Crop_recommendation.csv')
    df = pd.read_csv(csv_path)
    
    # Features and target
    X = df.drop('label', axis=1)
    y = df['label']
    
    # Initialize the model
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    
    # Train the model
    model.fit(X, y)
    
    # Save the model
    model_path = os.path.join('static', 'models')
    os.makedirs(model_path, exist_ok=True)
    joblib.dump(model, os.path.join(model_path, 'crop_recommendation_model.joblib'))
    
    return model

# Function to load the model (or train if it doesn't exist)
def load_model():
    model_path = os.path.join('static', 'models', 'crop_recommendation_model.joblib')
    
    if os.path.exists(model_path):
        model = joblib.load(model_path)
    else:
        model = train_crop_recommendation_model()
    
    return model

# Function to predict the crop
def predict_crop(N, P, K, temperature, humidity, ph, rainfall):
    # Load the model
    model = load_model()
    
    # Create a features array
    features = np.array([[N, P, K, temperature, humidity, ph, rainfall]])
    
    # Predict the crop
    prediction = model.predict(features)
    
    # Return the predicted crop
    return prediction[0]