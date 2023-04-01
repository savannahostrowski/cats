from pydantic import BaseModel


class RatingBase(BaseModel):
    rating: int


class RatingCreate(RatingBase):
    pass


class Rating(RatingBase):
    id: int
    cat_id: int

    class Config:
        orm_mode = True


class CatBase(BaseModel):
    name: str
    age: int
    type: str
    funfact: str
    image: str
    average_rating: int


class CatCreate(CatBase):
    pass


class Cat(CatBase):
    id: int

    class Config:
        orm_mode = True
