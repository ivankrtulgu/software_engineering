from ..app import app, role_required
from flask import render_template
from flask_login import current_user

app.route("/boogalter",methods = ["GET"])
@role_required("boogalter")
def boogalter():
    render_template("/boogalter/index.html", user = current_user.to_dict())