from typing import Callable
from flask import Flask
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user
from functools import wraps
from flask import session, redirect, url_for, flash, abort
from flask_login import current_user
from pathlib import Path
from os.path import abspath


app = Flask(__name__)

#Временный костыль для удобства, при деплое убрать
@app.route("/")
def index():
    return redirect("/auth/login")

app.template_folder = Path(abspath(__file__)).parent.parent / "static" / "templates"
print(app.template_folder)
app.secret_key = "secret"

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'auth/login'  # type: ignore 
login_manager.login_message = 'Пожалуйста, войдите в систему'
login_manager.login_message_category = 'info'

@login_manager.user_loader
def load_user(user_id):
    """Загрузка пользователя по ID для Flask-Login"""
    from models import Session,User
    try:
        session = Session()
        user = session.query(User).get(int(user_id))
        session.close()
        return user
    except Exception as e:
        print(f"Error loading user: {e}")
        return None


@login_manager.unauthorized_handler
def unauthorized():
    """Обработчик для неавторизованных запросов"""
    flash('Пожалуйста, войдите в систему для доступа к этой странице', 'warning')
    return redirect("auth/login")

def role_required(required_role) -> Callable:
    """Декоратор для проверки конкретной роли"""
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            if not current_user.is_authenticated:
                return redirect(url_for('login'))
            
            if current_user.role != required_role:
                flash('Недостаточно прав для доступа к этой странице', 'error')
                return redirect(url_for('login'))
            
            return f(*args, **kwargs)
        return decorated_function
    return decorator