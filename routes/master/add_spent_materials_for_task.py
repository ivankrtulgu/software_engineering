from models import Purchase, Session, SpentMaterial, Task
from ..app import app,role_required
from flask import render_template, request,session,flash,redirect
from flask_login import current_user
import json

app.route("/master/add_spent_materials_for_task",methods = ["GET","POST"])
@role_required("master")
def master_add_spent_materials_for_task():
    if request.method == "POST":
        task_id = request.form.get("task_id",int)
        purchase_materials = request.form.get("materials","()")

        session = Session()
        master_id = current_user.id
        task = session.query(Task).get(task_id)
        if task is None or task.master_id != master_id:
            flash("Вы не можете добавить материалы заявке, которая вам не принадлежит","error")
        elif task.status == "В процессе выполнения":
            spent_materials = [SpentMaterial(master_id = master_id,task_id = task_id,name = material, number = number) 
                               for material,number in json.loads(purchase_materials)]
            session.add_all(spent_materials)
            session.commit()
            flash("Расходники успешно добавлены. Задание выполнено!","success")
        else:
            flash("Нельзя добавить материалы заявке со статусом {task.state}. Должен быть статус 'В процессе выполнения'","error")

        session.close()
        flash("Оформление закупки прошло успешно","success")
        redirect("/master/add_spent_materials_for_task")

    if request.method == "GET":
        return render_template("master/add_spent_materials_for_task.html", user = current_user.to_dict())
