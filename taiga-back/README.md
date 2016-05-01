# curiosityio/taiga-back

[Taiga](https://taiga.io/) is a project management platform for startups and agile developers & designers who want a simple, beautiful tool that makes work truly enjoyable.

This Docker image can be used for running the Taiga backend. It works together with the [curiosityio/taiga-front-dist](https://registry.hub.docker.com/u/curiosityio/taiga-front-dist/) image.

## Running

A [postgres](https://registry.hub.docker.com/_/postgres/) container should be linked to the taiga-back container. The taiga-back container will use the ``POSTGRES_USER`` and ``POSTGRES_PASSWORD`` environment variables that are supplied to the postgres container.

```
docker run --name taiga_back_container_name --link postgres_container_name:postgres curiosityio/taiga-back
```

## Docker-compose

For a complete taiga installation (``curiosityio/taiga-back`` and ``curiosityio/taiga-front-dist``) you can use this docker-compose configuration:

```
postgres:
  image: postgres
  environment:
    POSTGRES_DB: taiga
    POSTGRES_USER: postgres
    POSTGRES_PASSWORD: postgres-user-password
  volumes:
    - ./data:/var/lib/postgresql/data
taigaback:
  image: curiosityio/taiga-back
  hostname: dev.example.com
  environment:
    TAIGA_DB_NAME: taiga # same as POSTGRES_DB
    TAIGA_DB_USER: postgres # same as POSTGRES_USER
    TAIGA_DB_PASSWORD: postgres-user-password # same as POSTGRES_PASSWORD
    TAIGA_HOST_DB: postgres # honestly, not sure why this points to and why it works.
    HOSTNAME: dev.example.com
    SECRET_KEY: examplesecretkey
    EMAIL_USE_TLS: True
    EMAIL_HOST: smtp.gmail.com
    EMAIL_PORT: 587
    EMAIL_HOST_USER: youremail@gmail.com
    EMAIL_HOST_PASSWORD: yourpassword
  links:
    - postgres
  volumes:
    - ./media:/usr/local/taiga/media
    - ./static:/usr/local/taiga/static
    - ./logs:/usr/local/taiga/logs
taigafront:
  image: curiosityio/taiga-front-dist
  hostname: dev.example.com
  links:
    - taigaback
  volumes_from:
    - taigaback
  ports:
    - 0.0.0.0:80:80
```

## Environment

* ``SECRET_KEY`` defaults to ``"insecurekey"``, but you might want to change this.
* ``DEBUG`` defaults to ``False``
* ``TEMPLATE_DEBUG`` defaults to ``False``
* ``PUBLIC_REGISTER_ENABLED`` defaults to ``False``

URLs for static files and media files from taiga-back:

* ``MEDIA_URL`` defaults to ``"http://$HOSTNAME/media/"``
* ``STATIC_URL`` defaults to ``"http://$HOSTNAME/static/"``

Domain configuration:

* ``HOSTNAME`` no default. Specify your domain name. 
* ``API_SCHEME`` defaults to ``"http"``. Use ``https`` if ``htdvisser/taiga-front-dist`` is used and SSL enabled.
* ``API_DOMAIN`` defaults to ``"$HOSTNAME"``
* ``FRONT_SCHEME`` defaults to ``"http"``. Use ``https`` if ``htdvisser/taiga-front-dist`` is used and SSL enabled.
* ``FRONT_DOMAIN`` defaults to ``"$HOSTNAME"``

Email configuration:

* ``EMAIL_USE_TLS`` defaults to ``False``
* ``EMAIL_HOST`` defaults to ``"localhost"``
* ``EMAIL_PORT`` defaults to ``"587"``
* ``EMAIL_HOST_USER`` defaults to ``""``
* ``EMAIL_HOST_PASSWORD`` defaults to ``""``
* ``DEFAULT_FROM_EMAIL`` defaults to ``"$EMAIL_HOST_USER"``

Database configuration:

* ``POSTGRES_DB``. Database name. 
* ``POSTGRES_USER``. Username to use for postgres. 
* ``POSTGRES_PASSWORD``. Password for postgres username. 
