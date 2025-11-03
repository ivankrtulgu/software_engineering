from flask_login import current_user
from ..app import app,role_required
from flask import render_template,request,flash,redirect
from models import Task,Session


@app.route("/master",methods = ["GET"]) # type: ignore
@role_required("master")
def master():
    if request.method == "GET":
        session = Session()

        select_task = session.query(Task) \
                        .filter(Task.master_id == current_user.id, Task.status == "В процессе выполнения") \
                        .first()
        user = current_user.worker.dict()

        tasks = None
        if select_task is None:
            tasks = map(lambda task:task.to_dict(),session.query(Task) \
                        .filter(Task.master_id == current_user.id,Task.status == "Назначена мастеру")\
                        .order_by(Task.date) \
                        .all())
        session.close()
        render_template("master/index.html",select_task = select_task, tasks = tasks,user = user)
