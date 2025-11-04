from flask_login import current_user
from ..app import app, login_required
from flask import render_template
from models import Task, User, Session
from sqlalchemy.orm import joinedload

@app.route("/client", methods=["GET"])
@login_required
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
    finally:
        session.close()

    return render_template("client/index.html", tasks=tasks, user=user_dict)
