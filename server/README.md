# TypeScript + Node + Docker + MySql (with code hot-reloading in the container)

## build and run project (must have docker downloaded)

sudo docker-compose build
sudo docker-compose up

## open new terminal in same folder

sudo docker exec -it mysql-db bash
mysql -u root -p

## type password: 12345

use area_db
source /data/application/create_tables.sql;
source /data/application/insert_values.sql;
exit
exit

## now the project is ready to work

## how to exit docker

'ctrl + C'
