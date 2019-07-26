

https://mongoose-os.com/docs/mongoose-os/quickstart/setup.md

mos build  --platform esp8266 --build-var BOARD=esp8266-1M 
mos flash --port /dev/cu.wchusbserial1410

// create iot registry called 
mos gcp-iot-setup --gcp-project doorbell-demo --gcp-region europe-west1 --gcp-registry iot-registry --port /dev/cu.wchusbserial1410


mos console  --port /dev/cu.wchusbserial1410
mos put fs/init.js   --port /dev/cu.wchusbserial1410





ESP32
mos build --platform esp32
mos flash --port /dev/tty.wchusbserial1410 
