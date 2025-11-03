from models import Purchase, Session
from ..app import app,role_required
from flask import render_template, request, session,flash,redirect
from flask_login import current_user
import json

app.route("/boogalter/create_purchase",methods = ["GET","POST"])
@role_required("boogalter")
def boogalter_create_purchase():
    if request.method == "POST":
        purchase_materials = request.form.get("materials","{}")

        boogalter_id = current_user.id
        purchase_materials = [Purchase(boogalter_id = boogalter_id, name = material, number = number) for material,number in json.loads(purchase_materials).items()]
    
        session = Session()
        session.add_all(purchase_materials)
        session.commit()
        session.close()
        flash("Оформление закупки прошло успешно","success")
        redirect("/boogalter/create_purchase")

    if request.method == "GET":
        return render_template("/boogalter/create_purchase.html", user = current_user.to_dict())
