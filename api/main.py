import os
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException
from fastapi_sqlalchemy import DBSessionMiddleware, db
from schema import Cat as SchemaCat
from models import Cat as ModelCat
from services import engine, create_db_and_tables
from sqlalchemy import create_engine

BASE_DIR=os.path.dirname(os.path.abspath(__file__))
load_dotenv(os.path.join(BASE_DIR, ".env"))


app = FastAPI()

app.add_middleware(DBSessionMiddleware, db_url=os.environ["DATABASE_URL"])

@app.post("/cat", response_model=SchemaCat)
def create_cat(cat: SchemaCat):
    db_cat = ModelCat(
        name=cat.name,
        age=cat.age,
        type=cat.type,
        funfact=cat.funfact,
        image=cat.image,
        rating=cat.rating
    )

    db.session.add(db_cat)
    db.session.commit()
    return db.cat



# @app.get("/")
# def show_cat():
#     cat = Cat(
#         name="Mittens",
#         age=3,
#         type="Tabby",
#         funfact="Mittens is a very good cat.",
#         image="/images/mittens.jpg"
#     )
#     return cat
    

# @app.get("/cats")
# def get_cats():
#     # Get all cats from the database
#     cats = Cat.all(engine)
#     return cats


# @app.get("/submit-your-cat")
# def submit_cat(cat: str):
#     return {"cat": cat}


# @app.post("/cats")
# def create_cat(cat: Union[str, int]):
#     return {"cat": cat}
