from flask_login import current_user
from ..app import app,role_required
from flask import render_template,request,flash,redirect
from models import Task,Session


@app.route("/operator/decline_task",methods = ["POST"]) # type: ignore
@role_required("operator")
def operator_decline_task():
    if request.method == "POST":
        task_id = request.form.get("id",type=int)

        session = Session()

        select_task = session.query(Task).get(task_id)
        master_id = select_task and select_task.master_id or None
        task_status = select_task and select_task.status or None
        

        match(select_task,task_status):
            case None,_:
                flash("Нельзя отклонить эту заявку т.к она отсутствует.","error")

            case _, "На рассмотрении":
                select_task.status = "Отклонена"
                select_task.master_id = None
                session.add(select_task)
                session.commit()
                flash("Заявка была отклонена.","success")


            case _, _:
                flash(f"Нельзя отклонить эту заявку т.к. она имеет статус: {task_status}.","error")
        session.close()
    return redirect("/operator")