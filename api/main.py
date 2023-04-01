from typing import List
from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import crud, database, models, schemas

models.Base.metadata.create_all(bind=database.engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Create a new cat submission
@app.post("/api/cats/", response_model=schemas.Cat)
def create_cat(cat: schemas.CatCreate, db: Session = Depends(get_db)):
    return crud.create_cat(db=db, cat=cat)


# Get all cats
@app.get("/api/cats/", response_model=List[schemas.Cat])
def read_cats(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    cats = crud.get_cats(db, skip=skip, limit=limit)
    return cats


@app.get("/api/cats/{cat_id}", response_model=schemas.Cat)
def read_cat(cat_id: int, db: Session = Depends(get_db)):
    db_cat = crud.get_cat(db, cat_id=cat_id)
    if db_cat is None:
        raise HTTPException(status_code=404, detail="Cat not found")
    return db_cat


@app.post("/api/cats/{cat_id}/rating", response_model=schemas.Rating)
def create_rating(
    rating: schemas.RatingCreate, cat_id: int, db: Session = Depends(get_db)
):
    return crud.create_rating(db=db, rating=rating, cat_id=cat_id)


# Get average rating for a cat
@app.get("/api/cats/{cat_id}/rating", response_model=int)
def get_average_rating(cat_id: int, db: Session = Depends(get_db)):
    ratings = crud.get_ratings(db, cat_id=cat_id)
    if ratings is None:
        raise HTTPException(status_code=404, detail="Rating not found")
    average = sum(ratings) / len(ratings)

    return average * 100
