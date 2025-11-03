from flask_login import current_user
from ..app import app,role_required
from flask import render_template,request,flash,redirect, session
from models import Task,Session


@app.route("/operator/look_task<int:id") # type: ignore
@role_required("operator")
def operator_look_task(task_id = None):
    session = Session()
    task = session.query(Task).get(task_id)

    task = task and task.to_dict()
    session.close()
    return render_template("operator/look_task.html",task = task, user = current_user.to_dict())