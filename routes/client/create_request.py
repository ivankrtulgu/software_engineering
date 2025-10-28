from ..app import app,role_required
from flask import render_template,request,redirect


@app.route("/client/create_request",methods = ["GET","POST"])
@role_required("client")
def request_create():
    if request.method == "GET":
        return render_template("client/create_request.html")
    if request.method == "POST":
        return redirect("/client")
    
