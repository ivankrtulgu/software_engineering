from models import db_check_connect,create_admin,db_clear, load_seed_from_json
from routes.app import app

if __name__ == '__main__':

    # _ = db_check_connect(debug = True) and \
    #     db_clear()  and \
    #     create_admin(password = "123456")

    db_check_connect(debug=True)
    db_clear()
    load_seed_from_json("initial_data.json") #добавил загрузку стоковых данных из файла initial_data.json

    # seed_full_data()
    # create_admin(password="123456")

    #Запуск всех маршрутов
    from routes import auth,admin,boogalter,client,master,operator

    app.run(debug=True)
    print()