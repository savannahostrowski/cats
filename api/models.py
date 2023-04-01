from sqlalchemy import Column, ForeignKey, Integer, String

from database import Base


class Cat(Base):
    __tablename__ = "cats"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    age = Column(Integer)
    type = Column(String)
    funfact = Column(String)
    image = Column(String)


class Rating(Base):
    __tablename__ = "ratings"

    id = Column(Integer, primary_key=True, index=True)
    cat_id = Column(Integer, ForeignKey(Cat.id))
    rating = Column(Integer)
