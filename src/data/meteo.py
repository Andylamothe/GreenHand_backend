#!/usr/bin/env python3
import sys
import os

# Ensure we can import installed packages
sys.path.insert(0, os.path.dirname(__file__))

import requests
import pandas as pd
import json

LAT = 45.50884
LON = -73.58781

url = f"https://api.open-meteo.com/v1/forecast?latitude={LAT}&longitude={LON}&hourly=temperature_2m,relative_humidity_2m,precipitation,windspeed_10m&daily=temperature_2m_max,temperature_2m_min&timezone=auto"

response = requests.get(url)
data = response.json()

df = pd.DataFrame({
    "time": data["hourly"]["time"],
    "temperature": data["hourly"]["temperature_2m"],
    "humidity": data["hourly"]["relative_humidity_2m"],
    "precipitation": data["hourly"]["precipitation"]
})

df["time"] = pd.to_datetime(df["time"])
df["date"] = df["time"].dt.strftime("%Y-%m-%d")
df["windSpeed"] = data["hourly"]["windspeed_10m"]



weekly = df.groupby("date").agg({
    "humidity": "mean",
    "precipitation": "sum"
}).reset_index()

daily_wind = df.groupby("date").agg({"windSpeed": "mean"}).reset_index()

result = {
    "humidity": weekly[["date", "humidity"]].to_dict(orient="records"),
    "precipitation": weekly[["date", "precipitation"]].to_dict(orient="records"),
    "temperature": data["daily"],
    "windDaily": daily_wind.to_dict(orient="records")
    
}

print(json.dumps(result))