from ..app import app
from flask import render_template, request, redirect, flash
from flask_login import login_user, current_user
from models import User, Session

@app.route("/auth/login", methods=["GET", "POST"])  # type: ignore
def login():
    # Если пользователь уже авторизован, перенаправляем
    if current_user.is_authenticated:
        return redirect("/" + current_user.role)
    
    if request.method == "GET":
        return render_template("auth/login.html")
    
    if request.method == "POST":
        session = Session()
        # ✅ Поля формы
        login = request.form.get('login')
        password = request.form.get('password')

        
        user = session.query(User).filter(User.login == login).first()
        user_role = user and user.role
        session.close()

        if user and user.check_password(password):
            login_user(user)
            flash("Вход был выполнен успешно", "success")
            return redirect("/" + str(user_role))
    
        elif user and user.check_password(password) == False:
            flash("Неверно указан пароль", "error")
            return render_template("auth/login.html") #исправил шаблоны
        
        else:
            flash("Такой пользователь не зарегистрирован", "error")
            return render_template("auth/login.html") #исправил шаблоны


auth_login = login