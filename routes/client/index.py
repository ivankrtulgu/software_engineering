from flask_login import current_user
from ..app import app, login_required, role_required
from flask import render_template
from models import Task, User, Session
from sqlalchemy.orm import joinedload

@app.route("/client", methods=["GET"])
@login_required
@role_required("client")
def client():
    session = Session()
    try:
        # Загружаем current_user с клиентом сразу
        user = session.query(User)\
                      .options(joinedload(User.client))\
                      .filter(User.id == current_user.get_id())\
                      .one()

        tasks = [task.to_dict() for task in user.client.tasks]
        user_dict = user.client.to_dict()
        print(tasks)
    finally:
        session.close()

    sidebar_menu = [
        {
            "title": "Мои заявки",
            "endpoint": None,        # активная страница — без ссылки
            "active": True
        },
        {
            "title": "О нас",
            "endpoint": "client_about",
            "active": False
        },
    ]   

    return render_template("client/index.html", tasks=tasks, user=user_dict, sidebar_menu=sidebar_menu)

@app.route("/client/about", methods=["GET"])
@login_required
@role_required("client")
def client_about():
    sidebar_menu = [
        {"title": "Мои заявки", "endpoint": "client", "active": False},
        {"title": "О нас", "endpoint": None, "active": True},
    ]
    return render_template("client/index_client_about.html", sidebar_menu=sidebar_menu)
