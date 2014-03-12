FROM ubuntu:12.04
MAINTAINER Cameron Maske "cam@trackmaven.com"
RUN apt-get -y update

# Allow added custom Node PPA
RUN apt-get install -y --force-yes software-properties-common python-software-properties
RUN add-apt-repository -y ppa:chris-lea/node.js
RUN apt-get -y update --fix-missing

# Install NodeJS.
RUN apt-get install -y -q nodejs

# Install Gulp
RUN npm install -g gulp

WORKDIR /code/

CMD gulp --require coffee-script/register