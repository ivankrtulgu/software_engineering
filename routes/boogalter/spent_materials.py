from models import Session, SpentMaterial
from ..app import app,role_required
from flask import redirect, render_template, request, session,flash
from flask_login import current_user


app.route("/boogalter/spent_materials",methods = ["GET","POST"])
@role_required("boogalter")
def boogalter_spent_materials():
    if request.method == "POST":
        spent_material_id = request.form.get("id", None)

        
        session = Session()
        spent_material = session.query(SpentMaterial).get(spent_material_id)
        material = spent_material and spent_material.name
        number = spent_material and spent_material.number
        session.delete(spent_material)
        session.commit()
        session.close()
        flash(f"Информация об утрате материала {material} в кол-ве {number} была успешно удалена","success")
        redirect("/boogalter/spent_materials")
    return render_template("/boogalter/spent_materials.html", user = current_user.to_dict())
