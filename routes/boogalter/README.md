# index   
Видит меню:
     склад
     заказать запчасти
     потраченные материалы
     выполненные закупки
     невыполненные закупки

# available_material
просмотр товаров
# create_purchase GET,POST "materials{name:number,name1:number2 ...}"
форма заказа
# spent_materials GET,POST{id}
просмотр потраченных товаров, возможность отмены их утраты
# done_purchase
просмотр доставленных товаров
# not_done_purchase 
просмотр и возможность отмены заказа или что он выполнен