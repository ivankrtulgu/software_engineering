from models import Purchase, Session, SpentMaterial
from ..app import app,role_required
from flask import redirect, render_template, request, session,flash
from flask_login import current_user


app.route("/boogalter/done_purchase")
@role_required("boogalter")
def boogalter_spent_materials():
    session = Session()
    
    purchases = [p.to_dict() for p in session.query(Purchase).filter(Purchase.is_done == True).all()]

    session.close()
    return render_template("/boogalter/done_purchase.html", purchases = purchases,user = current_user.to_dict())
