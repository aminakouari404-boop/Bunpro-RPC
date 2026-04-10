let currentMode = null;
let startTimestamp = null;

function updateMode(newMode) {
  if (newMode !== currentMode) {
    currentMode = newMode;
    startTimestamp = Date.now();
  }
  return { mode: currentMode, startTimestamp };
}

module.exports = { updateMode };
