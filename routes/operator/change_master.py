from flask_login import current_user
from ..app import app,role_required
from flask import render_template,request,flash,redirect
from models import Task,Session, Worker


@app.route("/operator/change_master_for_task", methods = ["POST"]) # type: ignore
@role_required("operator")
def operator_change_master_for_task():
    if request.method == "POST":
        session = Session()
        task_id = request.form.get("task_id",type=int)
        master_id = request.form.get("master_id", type = int)
        session = Session()

        task = session.query(Task).get(task_id)
        master = session.query(Worker).get(task_id)
        task_status = task and task.status or None
        

        if task is None:
            flash("Нельзя назначить мастера т.к такой заявки не существует.", "error")
        elif master is None:
            flash("Нельзя назначить мастера т.к такого мастера не существует.", "error")
        elif task.status != "На рассмотрении":
            flash(f"Нельзя назначить мастера т.к заявка не находиться на рассмотрении. Сейчас у ней статус {task.status}.", "error")
        else:
            task.master_id = master.id
            task.status = "Назначена мастеру"
            session.add(task)
            session.commit()
            flash(f"Заявке успешно назначен мастер {master.full_name}","success")
        session.close()
    return redirect("/operator")