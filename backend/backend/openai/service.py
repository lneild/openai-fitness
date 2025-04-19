from openai import BaseModel, OpenAI

from backend.settings import get_settings


class WorkoutCreateDTO(BaseModel):
    gender: str
    age: int
    goals: str | None = None
    history: str | None = None
    equip: str | None = None

    def to_prompt(self):
        prompt = "I want help making a workout routine. "
        if self.gender:
            prompt += f"I am a {self.gender}. "
        if self.age:
            prompt += f"I am {self.age} years old. "
        if self.goals:
            prompt += f"\nFitness goals: {self.goals}"
        if self.history:
            prompt += f"\nFitness history: {self.history}"
        if self.equip:
            prompt += f"\nFitness equipment available (in addition to the general outdoors/commonly found things): {self.equip}"
        return prompt


class FitnessAgent:

    def __init__(self) -> None:
        self.client = OpenAI(
            api_key=get_settings().OPENAI_TOKEN,
        )

    def get_workout(self, workout_create: WorkoutCreateDTO):
        return self._chat(prompt=workout_create.to_prompt())

    def _chat(self, prompt: str):

        chat_completion = self.client.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": prompt,
                }
            ],
            model="gpt-3.5-turbo",
        )

        return chat_completion.choices[0].message.content
