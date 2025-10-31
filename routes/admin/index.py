from flask_login import current_user
from ..app import app,role_required
from flask import render_template,request,flash,redirect
from models import Worker,User,Session


@app.route("/admin",methods = ["GET","POST"]) # type: ignore
@role_required("admin")
def admin():
    if request.method == "GET":
        session = Session()
        workers = map(lambda worker:worker.to_dict(),
                    session.query(Worker) \
                        .join(User) \
                        .order_by(Worker.role, User.full_name)
                        .all()
                        )
        user = current_user.to_dict()
        session.close()
        return render_template("admin/index.html",workers = workers, user = user)
    if request.method == "POST":
        session = Session()
        #Поля формы

        user_id = request.form.get("user_id")
        role = request.form.get("role")

        user_id = user_id and int(user_id) or -1
        worker = session.query(Worker).get(user_id)

        worker_role = worker and worker.role
        
        match(worker is not None,worker_role):
            case True, "admin":
                flash("Нельзя изменить роль у администратора.","error")
            case False,_:
                flash("Такого работника не существует.","error")
            case True,_:
                worker.role = role # type: ignore
                session.add(worker)
                session.commit()
                flash(f"Роль успешна изменена на {role}","success")
        session.close()
        return redirect("/admin")
    
    if request.method == "POST":
        session = Session()
        #Поля формы
        user_id = request.form.get("user_id")

        user_id = user_id and int(user_id) or -1
        worker = session.query(Worker).get(user_id)

        worker_role = worker and worker.role
        
        match(worker is not None,worker_role):
            case True, "admin":
                flash("Нельзя удалить администратора.","error")
            case False,_:
                flash("Такого работника не существует.","error")
            case True,_:
                worker.role = "client" # type: ignore
                session.add(worker)
                session.commit()
                flash(f"Работник успешно удален ФИО: {worker.full_name} роль: {worker.role}","success") # type: ignore
        session.close()
        return redirect("/admin")