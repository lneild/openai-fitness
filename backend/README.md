## Testing:

### Run in Terminal:

```sh
curl --location 'http://localhost:8000/workout' \
--header 'Content-Type: application/json' \
--data '{
"gender": "male",
"age": 27,
"goals": "build muscle",
"history": "limited workouts, eating around 2200 daily",
"equip": "bands"
}' | xargs -0 printf '%b'
```

To run: 
```sh
poetry run fastapi dev backend/main.py
```
