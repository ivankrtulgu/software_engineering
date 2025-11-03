# index
Если есть текущая заявка:  
      Показывается  выбранная заявка.

      Отремонтировать комп на ул Вана 2  Завершить Отменить Отклонить
                                             |        |         |
              GET add_spent_materials_for_task/id     |   POST decline_task{id}
                                                POST cancel_task{id}
Если не выбрана ни одна заявка:
      Отремонтировать комп на ул Фауза 2  Выбрать Отклонить 
      Отремонтировать телек на ул Трина 1 Выбрать Отклонить
                                             |        |
                              POST select_task {id}  POST decline_task{id}


# add_spent_materials_for_task/{task_id,materials = [(name,number), ... ]}
Добавляет список потраченных материалов для заявки

