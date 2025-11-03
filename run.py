from models import db_check_connect,create_admin,db_clear
from routes.app import app

if __name__ == '__main__':

    _ = db_check_connect(debug = True) and \
        db_clear()  and \
        create_admin(password = "123456")

    #Запуск всех маршрутов
    from routes import auth,admin,boogalter,client,master,operator

    app.run(debug=True)
    print()