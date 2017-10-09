#!/bin/bash

set +e

wget -N http://iweb.dl.sourceforge.net/project/jboss/JBoss/JBoss-4.2.3.GA/jboss-4.2.3.GA.zip

unzip jboss-4.2.3.GA.zip

SERVER_HOME=$(pwd)/jboss-4.2.3.GA

cp app.war ${SERVER_HOME}/server/default/deploy/

cp -R rasp ${SERVER_HOME}/

chmod 777 ${SERVER_HOME}/rasp

export JAVA_OPTS="-javaagent:${SERVER_HOME}/rasp/rasp.jar -Dlog4j.rasp.configuration=file://${SERVER_HOME}/rasp/conf/rasp-log4j.xml ${JAVA_OPTS}"

nohup sh ${SERVER_HOME}/bin/run.sh &