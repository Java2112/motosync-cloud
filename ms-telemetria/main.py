from fastapi import FastAPI
import os

app = FastAPI()

@app.get("/status")
def get_telemetry():
    return {
        "servicio": "ms-telemetria",
        "moto": os.getenv("MOTO_MODEL", "Honda Invicta 160"),
        "kilometraje": 24850,
        "temp_motor_c": 88,
        "voltaje_bateria": 13.8
    }
