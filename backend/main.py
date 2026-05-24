from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import json, os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

STATE_FILE = "/data/state.json"

DEFAULT_STATE = {
    "points": {"matt": 0, "erin": 0, "hazel": 0},
    "dailyDone": {},
    "weeklyDone": {},
    "weekKey": "",
    "todayKey": "",
    "selected": None,
    "history": [],
    "monsterDamage": {},
    "monsterPenalties": {},
}


def read_state():
    if os.path.exists(STATE_FILE):
        try:
            with open(STATE_FILE) as f:
                return json.load(f)
        except Exception:
            pass
    return DEFAULT_STATE.copy()


def write_state(data):
    os.makedirs(os.path.dirname(STATE_FILE), exist_ok=True)
    with open(STATE_FILE, "w") as f:
        json.dump(data, f)


@app.get("/state")
def get_state():
    return read_state()


@app.post("/state")
async def post_state(request: Request):
    data = await request.json()
    write_state(data)
    return {"ok": True}
