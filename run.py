
if __name__ == '__main__':

    from models import check_connect_db,create_admin

    if check_connect_db(debug =True):
        create_admin(password = "123456")

    from routes.app import app
    from routes import auth,admin,boogalter,client,master,operator
    
    app.run(debug=True)
