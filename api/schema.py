from pydantic import BaseModel

class Cat(BaseModel):
    name: str
    age: int
    type: str
    funfact: str
    image: str
    rating: int

    class Config:
        orm_mode = True
