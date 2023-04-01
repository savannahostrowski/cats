from sqlmodel import SQLModel, Field
from sqlalchemy import create_engine
import models

DATABASE_URL = "postgresql://sea:sea@localhost:5432/cats"

engine = create_engine(DATABASE_URL)

def create_db_and_tables(DATABASE_URL):
    SQLModel.metadata.create_all(engine)