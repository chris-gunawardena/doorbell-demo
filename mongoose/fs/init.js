

load('api_config.js');
load('api_gpio.js');
load('api_mqtt.js');
load('api_timer.js');

let topicBase = '/devices/' + Cfg.get('device.id');
let timers = {}; // hold timers

MQTT.sub(topicBase + '/config', function(conn, topic, msg) {
  print('Topic:', topic, 'message:', msg);
  if(!msg)
    return;

  let config = JSON.parse(msg);
  GPIO.set_mode(config.pin, GPIO.MODE_OUTPUT);

  if (!timers[config.pin]) { // prevent multiple continuous presses

    print('writing', config.pin, config.value, 1000 * config.duration);
    GPIO.write(config.pin, config.value ? 1 : 0); // set pin value

    timers[config.pin] = Timer.set(1000 * config.duration, 0, function(_config) { // store timer for that pin
      print('writing', _config.pin, _config.value, 1000 * _config.duration);
      GPIO.write(_config.pin, _config.value ? 0 : 1); // unset pin value
      timers[_config.pin] = false; // clear timer
    }, { pin: config.pin, value: config.value, duration: config.duration });
  }

}, null);
