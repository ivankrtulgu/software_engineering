from flask_login import current_user
from ..app import app, role_required
from flask import render_template, request, redirect, flash
from models import Task, Session

@app.route("/client/create_task", methods=["GET", "POST"]) # type: ignore
@role_required("client")
def client_create_task():
    if request.method == "GET":
        return render_template("client/create_task.html", user=current_user.to_dict())
    
    if request.method == "POST":
        try:
            # ✅ Поля формы
            description = request.form.get('description')
            
            db_session = Session()  
            task = Task(
                client_id=current_user.id, 
                status="На рассмотрении", 
                description=description
            )
            db_session.add(task)
            db_session.commit()
            db_session.close()  
            
            flash("Заявка успешно создана!", "success")
            return redirect("/client")
            
        except Exception as e:  
            print(e)
            flash("Произошла ошибка, попробуйте еще раз.", "error")  
            return redirect("/client")