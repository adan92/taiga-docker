# taiga-docker

Dockerized [taiga](taiga.io) scrum/agile project management software.

Check out the [backend Docker image](https://hub.docker.com/r/curiosityio/taiga-back/) in Docker hub and the [front end image](https://hub.docker.com/r/curiosityio/taiga-front-dist/) in Docker hub for full documentation getting up and running.

Linking the 2 images together provides a full **Taiga v2.1** experience:

* Saving to a persistant postgres database on your host machine
* email integration 
* slack integration 
* gogs integration

Image currently running on CoreOS (Ubuntu 14.04 tested as well) 512mb VM running great. 

This image does *not* include:

* socket connections
* async operations 