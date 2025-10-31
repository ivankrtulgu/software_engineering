from ..app import app,role_required
from flask import request,flash,redirect
from models import Worker,Session


@app.route("/admin/delete_worker",methods = ["POST"]) # type: ignore
@role_required("admin")
def admin_delete_worker():
    
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