import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

db_user = os.environ.get("DBUSER", "postgres")
db_pass = os.environ.get("DBPASS", "postgres")
db_host = os.environ.get("DBHOST", "localhost:5432")
db_name = os.environ.get("DBNAME", "cats")
db_uri = f"postgresql://{db_user}:{db_pass}@{db_host}/{db_name}"

POSTGRES_DATABASE_URL=db_uri

engine = create_engine(POSTGRES_DATABASE_URL)

SessionLocal=sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()