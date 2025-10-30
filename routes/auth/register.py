from ..app import app
from flask import render_template, request, redirect, flash, url_for
from flask_login import login_user, current_user
from models import Client, User, Session  # Добавь импорт User

@app.route("/auth/register", methods=["GET", "POST"])  # type: ignore
def register():
    # Если пользователь уже авторизован, перенаправляем
    if current_user.is_authenticated:
        return redirect("/" + current_user.role)
    
    if request.method == "GET":
        return render_template("auth/register.html")
    
    if request.method == "POST":
        session = Session()
        try:
            # ✅ Поля формы
            full_name = request.form.get("full_name")
            login = request.form.get('login')
            password = request.form.get('password')



            
            existing_user = session.query(User).filter(User.login == login).first()
            if existing_user:
                flash("Пользователь с таким логином уже существует", "error")
                return render_template("auth/register.html")
            
            client = Client(
                full_name=full_name,
                login=login,
                password=password
            )
            session.add(client)
            session.commit()

            login_user(client.user)
            flash("Аккаунт успешно создан!", "success")
            return redirect("/client")
            
        except Exception as e:  
            print(f"Registration error: {e}")
            flash("Произошла ошибка, попробуйте еще раз.", "error") 
            return render_template("auth/register.html")
        finally:
            if session:
                session.close()

auth_register = register