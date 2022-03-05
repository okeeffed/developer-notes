---
name: My SQL Development
menu: Docker
---

# MySQL Development using Docker

Firstly, pull `docker pull mysql/mysql-server`.

Then `docker run --name sql-test -e MYSQL_ROOT_PASSWORD=password -p 6000:3306 -d mysql/mysql-server:latest`. If there a replacement or commited image, run that instead.

If you are running it on a network, first create the network `docker network create dev-env`, then run with the `--net` flag to hook it up.

`docker run --name sql-test -e MYSQL_ROOT_PASSWORD=password -p 6000:3306 --net dev-env -d mysql/mysql-server:latest`.

Linking `docker run -d -name app-container-name --link mysql-container-name app-image-name`.

## Updating the local Docker MySQL instance

Log into the container `docker exec -it CONTAINER_ID /bin/bash` and first log into `mysql` using `mysql -u root -p`. This will prompt you for that password we created, so now type that in and enter the command line terminal. First, run `CREATE USER 'admin'@'%' IDENTIFIED BY 'password';` Run `GRANT ALL PRIVILEGES ON *.* TO 'admin'@'%' WITH GRANT OPTION;`. Finally, run `FLUSH PRIVILEGES;`.
