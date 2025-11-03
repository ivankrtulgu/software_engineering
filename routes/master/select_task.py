from flask_login import current_user
from ..app import app,role_required
from flask import render_template,request,flash,redirect
from models import Task,Session


@app.route("/master/select_task",methods = ["POST"]) # type: ignore
@role_required("master")
def master_select_task():
    if request.method == "POST":
        task_id = request.form.get("id",type=int)

        session = Session()

        select_task = session.query(Task).get(task_id)
        master_id = select_task and select_task.master_id or None
        task_status = select_task and select_task.status or None


        match(select_task, master_id,task_status):
            case None, _,_:
                flash("Нельзя выбрать эту заявку т.к она отсутствует.","error")

            case _, current_user.id, "Назначена мастеру":
                select_task.status = "В процессе выполнения"
                session.commit()
                flash("Заявка выбрана для выполнения.","success")

            case _, current_user.id, _:
                flash(f"Нельзя взять заявку на выполнение т.к. она имеет статус: {task_status}.","error")

            case _,_,_:
                flash("Эта заявка вам не назначена.","error")
        session.close()
    return redirect("/master")