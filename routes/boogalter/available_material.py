from models import AvailableMaterial, Session
from ..app import app,role_required
from flask import render_template, session
from flask_login import current_user

app.route("/boogalter/available_material",methods = ["GET"])
@role_required("boogalter")
def boogalter_available_material():
    session = Session()
    available_materials = map(lambda m: m.to_dict(),
                              session.query(AvailableMaterial).all()
    )
    session.close()
    render_template("/boogalter/available_material.html",available_materials = available_materials, user = current_user.to_dict())