from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException
from models import Cat
from services import engine, create_db_and_tables
from sqlalchemy import create_engine

engine = create_engine("postgresql://sea:sea@localhost:5432/cats")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    create_db_and_tables(engine)


@app.get("/")
def show_cat():
    cat = Cat(
        name="Mittens",
        age=3,
        type="Tabby",
        funfact="Mittens is a very good cat.",
        image="/images/mittens.jpg"
    )
    return cat
    

@app.get("/cats")
def get_cats():
    # Get all cats from the database
    cats = Cat.all(engine)
    return cats


# @app.get("/submit-your-cat")
# def submit_cat(cat: str):
#     return {"cat": cat}


# @app.post("/cats")
# def create_cat(cat: Union[str, int]):
#     return {"cat": cat}
