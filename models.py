from datetime import datetime
from sqlalchemy import create_engine, Column, Integer, String, Boolean, Text, Date, DateTime, ForeignKey, Numeric
from sqlalchemy.orm import declarative_base, relationship, sessionmaker
from sqlalchemy.sql import func
from config import DataBase
# Исправленный импорт для SQLAlchemy 2.0
Base = declarative_base()

class User(Base):
    """
    Таблица: Пользователи системы
    Хранит информацию о всех сотрудниках сервисного центра
    """
    __tablename__ = 'users'
    
    user_id = Column(Integer, primary_key=True, autoincrement=True)
    role = Column(String(50), nullable=False)
    full_name = Column(String(255), nullable=False)
    login = Column(String(100), nullable=False, unique=True)
    password_hash = Column(String(255), nullable=False)
    email = Column(String(255))
    phone = Column(String(20))
    is_active = Column(Boolean, default=True)
    
    operator_requests = relationship("Request", foreign_keys="Request.operator_id", back_populates="operator")
    master_requests = relationship("Request", foreign_keys="Request.master_id", back_populates="master")
    created_internal_requests = relationship("InternalRequest", back_populates="created_by_user")
    
    def __repr__(self):
        return f"<User(user_id={self.user_id}, full_name='{self.full_name}', role='{self.role}')>"


class Client(Base):
    """
    Таблица: Клиенты
    """
    __tablename__ = 'clients'
    
    client_id = Column(Integer, primary_key=True, autoincrement=True)
    full_name = Column(String(255), nullable=False)
    email = Column(String(255))
    phone = Column(String(20))
    is_legal_entity = Column(Boolean, default=False)
    created_at = Column(DateTime, default=func.now())
    
    devices = relationship("Device", back_populates="client")
    notifications = relationship("Notification", back_populates="client")
    
    def __repr__(self):
        return f"<Client(client_id={self.client_id}, full_name='{self.full_name}')>"


class Device(Base):
    """
    Таблица: Устройства
    """
    __tablename__ = 'devices'
    
    device_id = Column(Integer, primary_key=True, autoincrement=True)
    client_id = Column(Integer, ForeignKey('clients.client_id'), nullable=False)
    model = Column(String(255), nullable=False)
    serial_number = Column(String(100))
    purchase_date = Column(Date)
    warranty_until = Column(Date)
    
    client = relationship("Client", back_populates="devices")
    requests = relationship("Request", back_populates="device")
    
    def __repr__(self):
        return f"<Device(device_id={self.device_id}, model='{self.model}')>"


class Request(Base):
    """
    Таблица: Заявки на ремонт
    """
    __tablename__ = 'requests'
    
    request_id = Column(Integer, primary_key=True, autoincrement=True)
    device_id = Column(Integer, ForeignKey('devices.device_id'), nullable=False)
    operator_id = Column(Integer, ForeignKey('users.user_id'), nullable=False)
    master_id = Column(Integer, ForeignKey('users.user_id'))
    status = Column(String(50), default='новая')
    priority = Column(Integer, default=3)
    description = Column(Text)
    created_at = Column(DateTime, default=func.now())
    assigned_at = Column(DateTime)
    completed_at = Column(DateTime)
    home_service = Column(Boolean, default=False)
    
    device = relationship("Device", back_populates="requests")
    operator = relationship("User", foreign_keys=[operator_id], back_populates="operator_requests")
    master = relationship("User", foreign_keys=[master_id], back_populates="master_requests")
    part_usages = relationship("PartUsage", back_populates="request")
    payments = relationship("Payment", back_populates="request")
    notifications = relationship("Notification", back_populates="request")
    
    def __repr__(self):
        return f"<Request(request_id={self.request_id}, status='{self.status}')>"


class Part(Base):
    """
    Таблица: Запчасти
    """
    __tablename__ = 'parts'
    
    part_id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255), nullable=False)
    sku = Column(String(100), unique=True)
    price = Column(Numeric(10, 2))
    min_stock_level = Column(Integer, default=0)
    
    stock_item = relationship("StockItem", uselist=False, back_populates="part")
    part_usages = relationship("PartUsage", back_populates="part")
    internal_requests = relationship("InternalRequest", back_populates="part")
    supplier_orders = relationship("SupplierOrder", back_populates="part")
    
    def __repr__(self):
        return f"<Part(part_id={self.part_id}, name='{self.name}')>"


class StockItem(Base):
    """
    Таблица: Складские позиции
    """
    __tablename__ = 'stock_items'
    
    stock_id = Column(Integer, primary_key=True, autoincrement=True)
    part_id = Column(Integer, ForeignKey('parts.part_id'), nullable=False, unique=True)
    quantity = Column(Integer, default=0)
    location = Column(String(100))
    
    part = relationship("Part", back_populates="stock_item")
    
    def __repr__(self):
        return f"<StockItem(stock_id={self.stock_id}, part_id={self.part_id}, quantity={self.quantity})>"


class PartUsage(Base):
    """
    Таблица: Использование запчастей
    """
    __tablename__ = 'part_usages'
    
    usage_id = Column(Integer, primary_key=True, autoincrement=True)
    request_id = Column(Integer, ForeignKey('requests.request_id'), nullable=False)
    part_id = Column(Integer, ForeignKey('parts.part_id'), nullable=False)
    quantity_used = Column(Integer, nullable=False)
    reserved_at = Column(DateTime, default=func.now())
    used_at = Column(DateTime)
    
    request = relationship("Request", back_populates="part_usages")
    part = relationship("Part", back_populates="part_usages")
    
    def __repr__(self):
        return f"<PartUsage(usage_id={self.usage_id}, request_id={self.request_id}, part_id={self.part_id})>"


class InternalRequest(Base):
    """
    Таблица: Внутренние заявки
    """
    __tablename__ = 'internal_requests'
    
    internal_request_id = Column(Integer, primary_key=True, autoincrement=True)
    created_by_user_id = Column(Integer, ForeignKey('users.user_id'), nullable=False)
    part_id = Column(Integer, ForeignKey('parts.part_id'), nullable=False)
    quantity_needed = Column(Integer, nullable=False)
    status = Column(String(50), default='ожидает')
    created_at = Column(DateTime, default=func.now())
    fulfilled_at = Column(DateTime)
    
    created_by_user = relationship("User", back_populates="created_internal_requests")
    part = relationship("Part", back_populates="internal_requests")
    
    def __repr__(self):
        return f"<InternalRequest(internal_request_id={self.internal_request_id}, status='{self.status}')>"


class SupplierOrder(Base):
    """
    Таблица: Заказы поставщикам
    """
    __tablename__ = 'supplier_orders'
    
    order_id = Column(Integer, primary_key=True, autoincrement=True)
    part_id = Column(Integer, ForeignKey('parts.part_id'), nullable=False)
    quantity = Column(Integer, nullable=False)
    ordered_at = Column(DateTime, default=func.now())
    expected_delivery = Column(Date)
    status = Column(String(50), default='в пути')
    
    part = relationship("Part", back_populates="supplier_orders")
    
    def __repr__(self):
        return f"<SupplierOrder(order_id={self.order_id}, status='{self.status}')>"


class Payment(Base):
    """
    Таблица: Платежи
    """
    __tablename__ = 'payments'
    
    payment_id = Column(Integer, primary_key=True, autoincrement=True)
    request_id = Column(Integer, ForeignKey('requests.request_id'), nullable=False)
    amount = Column(Numeric(10, 2), nullable=False)
    payment_method = Column(String(50))
    paid_at = Column(DateTime, default=func.now())
    status = Column(String(50), default='оплачено')
    
    request = relationship("Request", back_populates="payments")
    
    def __repr__(self):
        return f"<Payment(payment_id={self.payment_id}, amount={self.amount})>"


class Notification(Base):
    """
    Таблица: Уведомления
    """
    __tablename__ = 'notifications'
    
    notification_id = Column(Integer, primary_key=True, autoincrement=True)
    client_id = Column(Integer, ForeignKey('clients.client_id'), nullable=False)
    request_id = Column(Integer, ForeignKey('requests.request_id'), nullable=False)
    type = Column(String(50), nullable=False)
    message = Column(Text, nullable=False)
    sent_at = Column(DateTime, default=func.now())
    is_read = Column(Boolean, default=False)
    
    client = relationship("Client", back_populates="notifications")
    request = relationship("Request", back_populates="notifications")
    
    def __repr__(self):
        return f"<Notification(notification_id={self.notification_id}, type='{self.type}')>"
# Создание engine и сессии
engine = create_engine(DataBase)
Session = sessionmaker(bind=engine)

with engine.connect() as conn:
    print("✅ Подключение к базе данных успешно!")
# Создание всех таблиц
Base.metadata.create_all(engine)

# Пример работы с данными
with Session() as session:
    # Создание тестового пользователя
    admin_user = User(
        role='admin',
        full_name='Администратор Системы',
        login='admin',
        password_hash='hashed_password_here',
        email='admin@service-center.ru',
        phone='+79991234567'
    )
    session.add(admin_user)
    session.commit()
    print(f"Создан пользователь: {admin_user}")
    
    # Создание тестового клиента
    client = Client(
        full_name='Иванов Иван Иванович',
        email='ivanov@example.com',
        phone='+79998887766',
        is_legal_entity=False
    )
    session.add(client)
    session.commit()
    print(f"Создан клиент: {client}")