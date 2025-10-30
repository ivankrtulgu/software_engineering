from flask_login import current_user
from ..app import app,role_required
from flask import render_template,flash,redirect,url_for
from models import Task,Session


@app.route("/client/look_task/<int:id>", methods=["GET"])
@role_required("client")
def client_look_task(id):
    session = Session()
    try:
        task = session.query(Task) \
            .filter(Task.id == id, Task.client_id == current_user.id) \
            .first()
        
        if not task:
            flash("Задача не найдена", "error")
            return redirect(url_for('client'))
        
        task = task.to_dict()
        user = current_user.client.to_dict()
        
        session.close()
        
        return render_template("client/index.html", task=task, user=user) 
    
    except Exception as e:
        session.close()
        print(f"Error: {e}")
        flash("Произошла ошибка", "error")
        return redirect(url_for('client_index'))
