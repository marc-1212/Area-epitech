# LandoApp

# Development - FRONTEND (client)
Use nvm to install node v16.10
npm install
npm install -g @ionic/cli

## Run app localhost:8000
go to /client
ionic serve
If there are issues with the path (command ionic not found):
npm config delete prefix

# Run on device
ionic capacitor run android --device

# Build
nvm use 16
ionic capacitor build

# Deploy to web server
scp -r -P 65002 ./dist/* u626713426@185.224.138.91:/home/u626713426/public_html/lando

# Build apk
whereis android-studio
echo export CAPACITOR_ANDROID_STUDIO_PATH="custom-path/android-studio/bin/studio.sh" >> ~/.bashrc
source ~/.bashrc
ionic cap open android

Inside Android Studio:
Main Menu > Build > Build Bundle(s) / APK(s) > Build APK(s)

# Upload apk to server
scp -P 65002 android/app/build/intermediates/apk/debug/lando.apk u626713426@185.224.138.91:/home/u626713426/public_html/lando/

# Development - BACKEND (server)
sudo docker-compose up

## Start server in localhost:4242
npm start
