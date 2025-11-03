from models import check_connect_db,create_admin
from routes.app import app

if __name__ == '__main__':

    _ = check_connect_db(debug = True) and create_admin(password = "123456")

    #Запуск всех маршрутов
    from routes import auth,admin,boogalter,client,master,operator

    app.run(debug=True)
    