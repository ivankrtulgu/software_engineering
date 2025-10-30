from flask_login import current_user
from ..app import app,role_required
from flask import render_template
from models import Task,Session


@app.route("/client",methods = ["GET"])
@role_required("client")
def client():
    session = Session()
    tasks = map(lambda task:task.to_dict(),
                session.query(Task) \
                    .filter(Task.client_id == current_user.get_id()) \
                    .order_by(Task.date) \
                    .all()
                    )
    user = current_user.client.to_dict()
    session.close()
    return render_template("сlient/index.html",tasks = tasks, user = user)
