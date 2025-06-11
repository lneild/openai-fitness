from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.openai.service import FitnessAgent, WorkoutCreateDTO

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # local development
        "https://openai-fitness.vercel.app/",  # Your Vercel domain
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "hello"}


@app.post("/workout")
async def workout_create(workout_create: WorkoutCreateDTO):
    return FitnessAgent().get_workout(workout_create=workout_create)
