from flask_login import current_user
from ..app import app,role_required
from flask import render_template,request,flash,redirect, session
from models import Task,Session, User, Worker


@app.route("/operator") # type: ignore
@role_required("operator")
def operator():
    session = Session()
    tasks = [ task.to_dict() 
             for task in session.query(Task).order_by(Task.date.desc()).all()
             ]
    masters = [master.to_dict()
               for master in session.query(Worker).join(User).order_by(User.full_name).all()]
    
    session.close()
    
    return render_template("operator/index.html",tasks = tasks,  masters = masters, user = current_user.to_dict())