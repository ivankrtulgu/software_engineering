from datetime import datetime
from sqlalchemy import create_engine, Column, Integer, String, Boolean, Text, Date, DateTime, ForeignKey, Numeric
from sqlalchemy.orm import declarative_base, relationship, sessionmaker
from sqlalchemy.sql import func
from config import DataBase
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash

Base = declarative_base()

class User(Base, UserMixin):
    id = 

    def get_id(self):
        """Требуется для Flask-Login"""
        return str(self.user_id)
    
    # Password methods
    def set_password(self, password):
        """Установка хэша пароля"""
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        """Проверка пароля"""
        return check_password_hash(self.password_hash, password)
    
    # Role methods
    def is_role(self, role_name):
        """Проверка наличия конкретной роли"""
        return self.role == role_name
    
    def __repr__(self):
        return f"<User(user_id={self.user_id}, full_name='{self.full_name}', role='{self.role}')>"

# Создание engine и сессии
engine = create_engine(DataBase)
Session = sessionmaker(bind=engine)

with engine.connect() as conn:
    print("✅ Подключение к базе данных успешно!")

# Создание всех таблиц
Base.metadata.create_all(engine)