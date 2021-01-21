# React-Redux Paint
## Описание проекта
Упрощенная копия графического редактора Paint, разработанная на стеке React-Redux.
Текущая версия позволяет:
- рисовать на холсте
- менять цвет и задавать размер кисти
- отменять действия и возвращаться к отмененным действиям
- загружать работы и сохранять их в локальной базе данных

## Установка и запуск
Для __установки__ нужно запустить команду `npm i`, находясь в директории с проектом.
Запуск проекта осуществляется в двух режимах: с серверной частью и без:
  * `npm run dev` - для запуска приложения вместе с сервером, обрабатывающим запросы на сохранение рисунков и загрузку сохраненных работ из базы.
  * `npm start` - запуск только клиентской части - взаимодействие с сервером не предусмотрено.