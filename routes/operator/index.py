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
    
    masters_db = session.query(Worker).join(User).order_by(User.full_name).all()
    masters = []
    for master in masters_db:
        counter = 0
        for task in master.assigned_tasks:
            if task.status in  ["Назначена мастеру", "В процессе выполнения"]:
                counter += 1

        masters.append(master.to_dict()|{"number_active_tasks":counter})
    clients = [
        user.to_dict()
        for user in session.query(User)
            .join(User.client)  # только те, у кого есть клиентская запись
            .order_by(User.full_name)
            .all()
    ]
    session.close()

    sidebar_menu = [
        {
            "title": "Клиенты",
            "endpoint": None,        # активная страница — без ссылки
            "active": True
        },
        {
            "title": "Заявки",
            "endpoint": None,
            "active": False
        },
        {
            "title": "Мастера",
            "endpoint": None,
            "active": False
        },
    ]   
    
    return render_template("operator/index.html",tasks = tasks,  masters = masters, user = current_user.to_dict(), sidebar_menu=sidebar_menu, clients=clients)