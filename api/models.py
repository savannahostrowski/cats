from sqlmodel import Field, SQLModel
from datetime import datetime
from typing import Optional

class Cat(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    age: int
    type: str
    funfact: str
    image: str
    rating: int = Field(default=10)
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)