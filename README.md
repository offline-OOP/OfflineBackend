# Offline backend

## Настройка
1. Запуск баз в докере
```console
foo@bar:~$ docker-compose up -d
```
2. Установка зависимостей
```console
foo@bar:~$ npm ci
```
3. Запуск миграций
```console
foo@bar:~$ npm run typeorm migration:run
```
4. Запуск приложения
```console
foo@bar:~$ npm run start:dev
```