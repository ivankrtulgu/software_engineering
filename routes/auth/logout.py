from ..app import app
from flask import redirect, url_for, flash
from flask_login import logout_user, login_required

@app.route("/auth/logout")
@login_required
def logout():
    logout_user()
    flash("Вы успешно вышли из системы", "info")
    return redirect(url_for('login'))