from flask_login import current_user
from ..app import app,role_required
from flask import render_template,request,redirect
from sqlalchemy.orm import joinedload
from models import *


@app.route("/client",methods = ["GET"])
@role_required("client")
def index():
    requests = Request.query \
        .join(Device)\
        .filter(Device.client_id == current_user.get_id())\
        .options(
            joinedload(Request.device),
            joinedload(Request.operator),
            joinedload(Request.master)
        ) \
        .order_by(Request.created_at.desc())\
        .all()
    return render_template("client/index.html",requests = requests)
