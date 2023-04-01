from sqlalchemy.orm import Session
import models, schemas


def get_cat(db: Session, cat_id: int):
    return db.query(models.Cat).filter(models.Cat.id == cat_id).first()


def get_cats(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Cat).offset(skip).limit(limit).all()


def create_cat(db: Session, cat: schemas.CatCreate):
    db_cat = models.Cat(
        name=cat.name, age=cat.age, type=cat.type, funfact=cat.funfact, image=cat.image
    )
    db.add(db_cat)
    db.commit()
    db.refresh(db_cat)
    return db_cat


def create_rating(db: Session, rating: schemas.RatingCreate, cat_id: int):
    db_rating = models.Rating(rating=rating.rating, cat_id=cat_id)
    db.add(db_rating)
    db.commit()
    db.refresh(db_rating)
    return db_rating


def get_ratings(db: Session, cat_id: int):
    db_ratings = db.query(models.Rating).filter(models.Rating.cat_id == cat_id).all()
    ratings = [rating.rating for rating in db_ratings]
    return ratings
