from models import Purchase, Session, SpentMaterial
from ..app import app,role_required
from flask import redirect, render_template, request, session,flash
from flask_login import current_user


app.route("/boogalter/not_done_purchase", methods = ["GET","POST"])
@role_required("boogalter")
def boogalter_not_done_purchase():
    if request.method == "POST":
        id = request.form.get("id",type = int)

        session = Session()
        purchase = session.query(Purchase).get(id)
        if purchase is None:
            flash("Такой закупки не существует","error")
        elif purchase.is_done:
            flash("Закупку нельзя отменить т.к она уже выполнена","error")
        else:
            session.delete(purchase)
        session.commit()
        session.close()
        redirect("/boogalter/not_done_purchase")
    if request.method == "GET":

        session = Session()
        
        purchases = [p.to_dict() for p in session.query(Purchase).filter(Purchase.is_done == False).all()]

        session.close()
        return render_template("/boogalter/not_done_purchase.html", purchases = purchases,user = current_user.to_dict())
