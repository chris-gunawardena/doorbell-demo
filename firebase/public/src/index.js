import PatternLock from '@phenax/pattern-lock-js';
const lock = PatternLock({
  $canvas: document.querySelector('#patternLock'),
  width: 300,
  height: 430,
  grid: [ 3, 3 ],
})
.onComplete(async({ hash }) => {
  lock.setTheme('default')
  let response = await fetch('/api/unlock', {
      method: 'post',
      body: JSON.stringify({
        deviceId: "esp8266_23F44B",
        key: hash
      })
  });
  lock.setTheme(response.ok ? 'success' : 'failure')
});
