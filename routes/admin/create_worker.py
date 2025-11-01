from flask_login import current_user
from ..app import app, role_required
from flask import render_template, request, redirect, flash
from models import Worker,User, Session

@app.route("/admin/create_worker", methods=["GET", "POST"]) # type: ignore
@role_required("admin")
def admin_create_worker():
    if request.method == "GET":
        return render_template("admin/create_worker.html", user=current_user.worker.to_dict(), roles = ["client","master","operator","boogalter","admin"])
    
    if request.method == "POST":
        session = Session()
        try:
            # ✅ Поля формы
            full_name = request.form.get("full_name")
            role = request.form.get("role")
            login = request.form.get('login')
            password = request.form.get('password')
              
            user = session.query(User).filter(User.login == login).first()
            if user:
                if user.worker:
                    flash("Работник с таким логином уже существует", "error")
                    return redirect("/admin/create_worker")
                else:
                    flash("Клиент с таким логином уже существует", "error")
                    return redirect("/admin/create_worker")
            else:
                worker = Worker(
                    full_name = full_name,
                    role = role,                 
                    login = login,
                    password = password,
                )
                session.add(worker)
                session.commit() 
                
                flash("Заявка успешно создана!", "success")
                return redirect("/admin")
            
        except Exception as e:  
            print(e)
            flash("Произошла ошибка, попробуйте еще раз.", "error")  
            render_template("admin/create_worker.html", user=current_user.worker.to_dict(), roles = ["client","master","operator","boogalter","admin"])
        finally:
            session.close()