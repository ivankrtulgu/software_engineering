from datetime import datetime
from sqlalchemy import create_engine, Column, Integer, String, Boolean, Text, Date, DateTime, ForeignKey, Numeric, select, func, text
from sqlalchemy.orm import declarative_base, relationship, sessionmaker
from sqlalchemy.sql import func
from config import DataBase
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash

Base = declarative_base()

class User(Base, UserMixin):
    __tablename__ = "Users"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    full_name = Column(String(255), nullable=False)
    login = Column(String(100), nullable=False, unique=True)
    password_hash = Column(String(255), nullable=False)

    # Relationships
    worker = relationship("Worker", back_populates="user", uselist=False)
    client = relationship("Client", back_populates="user", uselist=False)

    def get_id(self):
        """Требуется для Flask-Login"""
        return str(self.id)
    
    def set_password(self, password):
        """Установка хэша пароля"""
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        """Проверка пароля"""
        return check_password_hash(self.password_hash, password)
    
    @property
    def role(self):
        if self.worker:
            return self.worker.role
        elif self.client:
            return "client"
        return None

    def to_dict(self):
        return {
            'id': self.id,
            'full_name': self.full_name,
            'login': self.login,
            'email': self.email,
            'phone': self.phone,
            'role': self.role,
            'is_active': self.is_active,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }
    
    def __repr__(self):
        return f"<User(id={self.id}, full_name='{self.full_name}', role='{self.role}')>"


class Worker(Base):
    __tablename__ = "Workers"
    
    user_id = Column(Integer, ForeignKey('Users.id'), primary_key=True)
    role = Column(String(50), nullable=False)  # master|admin|operator|boogalter
    
    user = relationship("User", back_populates="worker")
    
    def to_dict(self):
        return {
            'user_id': self.user_id,
            'role': self.role
        }


class Client(Base):
    __tablename__ = "Clients"
    
    user_id = Column(Integer, ForeignKey('Users.id'), primary_key=True)
    
    user = relationship("User", back_populates="client")
    tasks = relationship("Task", back_populates="client_user")
    
    def to_dict(self):
        return {
            'user_id': self.user_id
        }


class Task(Base):
    __tablename__ = "Tasks"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    client_id = Column(Integer, ForeignKey('Client.id'), nullable=False)
    master_id = Column(Integer, ForeignKey('Worker.id'))
    date = Column(DateTime, default=func.now())
    status = Column(String(50), default='новая')
    pay = Column(Numeric(10, 2))
    description = Column(Text)
    
    client = relationship("Client", foreign_keys=[client_id], back_populates="created_tasks")
    master = relationship("Worker", foreign_keys=[master_id], back_populates="assigned_tasks")
    spent_materials = relationship("SpentMaterial", back_populates="task")
    
    def to_dict(self):
        return {
            'id': self.id,
            'client_id': self.client_id,
            'master_id': self.master_id,
            'date': self.date.isoformat() if self.date else None,
            'status': self.status,
            'pay': float(self.pay) if self.pay else None,
            'description': self.description
        }


class SpentMaterial(Base):
    __tablename__ = "SpentMaterial"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    master_id = Column(Integer, ForeignKey('Users.id'), nullable=False)
    task_id = Column(Integer, ForeignKey('Tasks.id'), nullable=False)
    name = Column(String(255), nullable=False)
    number = Column(Integer, nullable=False)
    spent_date = Column(DateTime, default=func.now())
    
    master = relationship("Master", back_populates="spent_materials")
    task = relationship("Task", back_populates="spent_materials")
    
    def to_dict(self):
        return {
            'id': self.id,
            'master_id': self.master_id,
            'task_id': self.task_id,
            'name': self.name,
            'number': self.number,
            'spent_date': self.spent_date.isoformat() if self.spent_date else None
        }


class Purchase(Base):
    __tablename__ = "Purchases"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    boogalter_id = Column(Integer, ForeignKey('Worker.id'), nullable=False)
    name = Column(String(255), nullable=False)
    number = Column(Integer, nullable=False)
    is_done = Column(Boolean, default=False)
    date = Column(DateTime, default=func.now())
    price = Column(Numeric(10, 2))
    
    boogalter = relationship("Worker", back_populates="purchases")
    
    def to_dict(self):
        return {
            'id': self.id,
            'boogalter_id': self.boogalter_id,
            'name': self.name,
            'number': self.number,
            'is_done': self.is_done,
            'date': self.date.isoformat() if self.date else None,
            'price': float(self.price) if self.price else None
        }


# Представление (View) для доступных материалов
class AvailableMaterial(Base):
    """Материализованное представление для доступных материалов"""
    __tablename__ = 'available_materials_view'
    
    # Эти поля будут созданы представлением
    name = Column(String(255), primary_key=True)
    total_purchased = Column(Integer)
    total_spent = Column(Integer)
    available = Column(Integer)
    
    # Указываем, что это представление, а не таблица
    __table_args__ = {'info': dict(is_view=True)}
    
    def to_dict(self):
        return {
            'name': self.name,
            'total_purchased': self.total_purchased,
            'total_spent': self.total_spent,
            'available': self.available
        }


# Функции для создания и обновления представления
def create_available_materials_view(engine):
    """Создать или заменить представление доступных материалов"""
    
    view_definition = """
    CREATE OR REPLACE VIEW available_materials_view AS
    SELECT 
        COALESCE(p.name, s.name) as name,
        COALESCE(p.total_purchased, 0) as total_purchased,
        COALESCE(s.total_spent, 0) as total_spent,
        (COALESCE(p.total_purchased, 0) - COALESCE(s.total_spent, 0)) as available
    FROM (
        SELECT 
            name,
            SUM(number) as total_purchased
        FROM "Purchases" 
        WHERE is_done = true
        GROUP BY name
    ) p
    FULL OUTER JOIN (
        SELECT 
            name,
            SUM(number) as total_spent
        FROM "SpentMaterial" 
        GROUP BY name
    ) s ON p.name = s.name
    WHERE (COALESCE(p.total_purchased, 0) - COALESCE(s.total_spent, 0)) > 0
    """
    
    with engine.connect() as conn:
        conn.execute(text(view_definition))
        conn.commit()


# Создание engine и сессии
engine = create_engine(DataBase)
Session = sessionmaker(bind=engine)

with engine.connect() as conn:
    print("✅ Подключение к базе данных успешно!")

# Создание всех таблиц
Base.metadata.create_all(engine)

# Создание представления после создания таблиц
create_available_materials_view(engine)
print("✅ Представление available_materials_view создано!")

