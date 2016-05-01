# curiosityio/taiga-front-dist

[Taiga](https://taiga.io/) is a project management platform for startups and agile developers & designers who want a simple, beautiful tool that makes work truly enjoyable.

This Docker image can be used for running the Taiga frontend. It works together with the [curiosityio/taiga-back](https://registry.hub.docker.com/r/curiosityio/taiga-back/) image.

Linking the 2 images together provides a full Taiga experience saving to a postgres database, email, and slack and gogs integration.

## Running

A [curiosityio/taiga-back](https://registry.hub.docker.com/r/curiosityio/taiga-back/) container should be linked to the taiga-front-dist container. Also connect the volumes of this the taiga-back container if you want to serve the static files for the admin panel.

```
docker run --name taiga_front_dist_container_name --link taiga_back_container_name:taigaback --volumes-from taiga_back_container_name curiosityio/taiga-front-dist
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
    TAIGA_DB_HOST: postgres # honestly, not sure what this points to and why it works
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

This compose file works well. Make sure to change:

* image `hostname:` properties
* `EMAIL_` properties. I prefer to use mailgun to send SMTP emails with Taiga.
* `POSTGRES_DB_PASSWORD` and `TAIGA_DB_PASSWORD`.
* `SECRET_KEY` to a randomly generated string.

## SSL Support

HTTPS can be enabled by setting ``SCHEME`` to ``https`` and filling ``SSL_CRT``
and ``SSL_KEY`` env variables (see Environment section below). *http* (port 80) 
requests will be redirected to *https* (port 443).

Example:

```
postgres:
  ...
taigaback:
  image: curiosityio/taiga-back
  hostname: dev.example.com
  environment:
    ...
    API_SCHEME: https
    FRONT_SCHEME: https
  links:
    - postgres
  ...
taigafront:
  image: curiosityio/taiga-front-dist
  hostname: dev.example.com
  environment:
    SCHEME: https
    SSL_CRT: |
        -----BEGIN CERTIFICATE-----
        ...
        -----END CERTIFICATE-----
    SSL_KEY: |
        -----BEGIN RSA PRIVATE KEY-----
        ...
        -----END RSA PRIVATE KEY-----
  links:
    - taigaback
  ...
  ports:
    - 0.0.0.0:80:80
    - 0.0.0.0:443:443
```

## Environment

* ``PUBLIC_REGISTER_ENABLED`` defaults to ``false``
* ``API`` defaults to ``"/api/v1"``
* ``SCHEME`` defaults to ``http``. If ``https`` is used either
  * ``SSL_CRT`` and ``SSL_KEY`` needs to be set **or** 
  * ``/etc/nginx/ssl/`` volume attached with ``ssl.crt`` and ``ssl.key`` files
* ``SSL_CRT`` SSL certificate value. Valid only when ``SCHEME`` set to https.
* ``SSL_KEY`` SSL certificate key. Valid only when ``SCHEME`` set to https.
