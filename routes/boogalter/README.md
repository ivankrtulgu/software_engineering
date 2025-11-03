# index   
Видит меню:
     склад                 -> available_material
     заказать запчасти     -> create_purchase
     потраченные материалы -> spent_materials
     выполненные закупки   ->  done_purchase
     невыполненные закупки -> not_done_purchase 

# available_material
просмотр товаров
# create_purchase GET,POST "material[(name,number,price), ...]"
форма заказа
# spent_materials GET,POST{id}
просмотр потраченных товаров, возможность отмены их утраты
# done_purchase
просмотр доставленных товаров
# not_done_purchase {id}
просмотр и возможность отмены заказа или что он выполнен