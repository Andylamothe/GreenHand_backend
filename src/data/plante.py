#!/usr/bin/env python3
import sys
import os

# Ensure we can import installed packages
sys.path.insert(0, os.path.dirname(__file__))

import pandas as pd
import json

# --- Chemin absolu vers le dossier dataset ---
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATASET_DIR = os.path.join(BASE_DIR, 'dataset')

# Charger les CSV
fertilizers = pd.read_csv(os.path.join(DATASET_DIR, 'fertilizers.csv'), skip_blank_lines=True)
crop_recommendation = pd.read_csv(os.path.join(DATASET_DIR, 'crop_recommendation.csv'), skip_blank_lines=True)

# --- Graph 1 : Nutrition moyenne par culture ---
avg_npk = crop_recommendation.groupby("label")[["N","P","K"]].mean().reset_index()
avg_npk_json = avg_npk.to_dict(orient="records")

# --- Graph 2 : Compatibilité cultures / sol ---
soil_crop_matrix = pd.crosstab(fertilizers["Soil Type"], fertilizers["Crop Type"])
soil_crop_json = soil_crop_matrix.reset_index().to_dict(orient="records")

# --- Graph 4 : Distribution pH par culture ---
ph_json = crop_recommendation[["label","ph"]].to_dict(orient="records")

rain_temp_json = crop_recommendation[["label", "temperature", "rainfall"]].to_dict(orient="records")


# --- Graph 5 : Nutrition selon engrais ---
fert_long = fertilizers.melt(
    id_vars=["Fertilizer Name"],
    value_vars=["Nitrogen", "Phosphorous", "Potassium"],
    var_name="Nutrient",
    value_name="Value"
)
fert_long_json = fert_long.to_dict(orient="records")

# --- Créer le JSON final ---
result = {
    "avg_npk": avg_npk_json,
    "soil_crop": soil_crop_json,
    "ph": ph_json,
    "fert_long": fert_long_json,
    "rain_temp": rain_temp_json,
    
}

# --- Afficher JSON pour Node/Express ---
print(json.dumps(result))
