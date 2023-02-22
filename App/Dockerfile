FROM ubuntu:20.04

USER root 

# https://forum.ionicframework.com/t/ionic-docker/145448/3 <--- link of the forum
# https://hub.docker.com/r/marcoturi/ionic/dockerfile/ <---- link of the docker 

ENV DEBIAN_FRONTEND=noninteractive \
    ANDROID_HOME=/opt/android-sdk-linux \
    NPM_VERSION=8.19.2 \
    IONIC_VERSION=6.20.3  \
    CAPACITOR_VERSION=4.3.0 \
    GRADLE_VERSION=7.4.2 \
    # Fix for the issue with Selenium, as described here:
    # https://github.com/SeleniumHQ/docker-selenium/issues/87
    DBUS_SESSION_BUS_ADDRESS=/dev/null

# Install basics marc of the future maybe it crashes due to the capacitor/android you have write that :) 
RUN apt-get update &&  \
    apt-get install -y git wget curl unzip build-essential && \
    curl -sL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get update &&  \
    apt-get install -y nodejs && \
    npm install -g npm@"$NPM_VERSION" @ionic/cli  @capacitor/core && \
    npm cache clear --force && \  
    wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb && \
    dpkg --unpack google-chrome-stable_current_amd64.deb && \
    apt-get install -f -y && \
    apt-get clean && \
    rm google-chrome-stable_current_amd64.deb && \
    mkdir Sources && \
    mkdir -p /root/.cache/yarn/ && \
    # Font libraries
    apt-get -qqy install fonts-ipafont-gothic xfonts-100dpi xfonts-75dpi xfonts-cyrillic xfonts-scalable libfreetype6 libfontconfig

#install openjdk-11 java    
RUN  apt-get update && apt-get -y install openjdk-11-jdk-headless && rm -rf /var/lib/apt

# Set the locale
RUN apt-get clean && apt-get update && apt-get install -y locales
RUN echo "LC_ALL=en_US.UTF-8" >> /etc/environment
RUN echo "en_US.UTF-8 UTF-8" >> /etc/locale.gen
RUN echo "LANG=en_US.UTF-8" > /etc/locale.conf
RUN locale-gen en_US.UTF-8

## JAVA INSTALLATION
RUN apt-get update && \
    DEBIAN_FRONTEND=noninteractive \
    apt-get -y install default-jre-headless && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*
    
# System libs for android enviroment
RUN echo ANDROID_HOME="${ANDROID_HOME}" >> /etc/environment && \
    dpkg --add-architecture i386 && \
    apt-get update -o Acquire::Check-Valid-Until=false && \
    apt-get install -y --force-yes  expect ant wget libc6-i386 lib32stdc++6 lib32gcc1 libncurses5:i386 lib32z1 qemu-kvm kmod

RUN apt-get clean && \
    apt-get autoclean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN sed 's/deb http:\/\/archive.debian.org\/debian\/ jessie-backports main//g' /etc/apt/sources.list > /etc/apt/sources.list

# Install Android Tools
RUN    mkdir  /opt/android-sdk-linux && cd /opt/android-sdk-linux && \
    wget --output-document=android-tools-sdk.zip --quiet https://dl.google.com/android/repository/commandlinetools-linux-8512546_latest.zip && \
    unzip -q android-tools-sdk.zip && \
    rm -f android-tools-sdk.zip && \ 
    mkdir /opt/android-sdk-linux/cmdline-tools/latest && \
    mv /opt/android-sdk-linux/cmdline-tools/bin /opt/android-sdk-linux/cmdline-tools/latest && \
    mv /opt/android-sdk-linux/cmdline-tools/lib /opt/android-sdk-linux/cmdline-tools/latest && \
    mv /opt/android-sdk-linux/cmdline-tools/source.properties /opt/android-sdk-linux/cmdline-tools/latest

# Install Gradle

# Setup environment
ENV PATH ${PATH}:${ANDROID_HOME}/tools:${ANDROID_HOME}/cmdline-tools:/opt/gradle/gradle-${GRADLE_VERSION}/bin

# Install Android SDK you have deleted this RUN cordova telemetry off

RUN yes Y | ${ANDROID_HOME}/cmdline-tools/latest/bin/sdkmanager "build-tools;30.0.1" "platforms;android-29" "platform-tools"

COPY . /home/

WORKDIR /home/

RUN  npm install 

RUN  npm i @capacitor/android

RUN  ionic capacitor update

RUN npx cap add android 

RUN npm run build 

RUN  npx cap sync android

WORKDIR /home/android/

RUN ./gradlew assembleDebug

WORKDIR /home/   

RUN mv android/app/build/outputs/apk/debug/app-debug.apk android/area.apk

