import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
load_dotenv(os.path.join(BASE_DIR, ".env"))

POSTGRES_DATABASE_URL=os.environ["DATABASE_URL"]

engine = create_engine(POSTGRES_DATABASE_URL)

SessionLocal=sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()