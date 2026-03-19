(function () {

  if (document.getElementById('at-root')) return;

  // ── SUCCESS TOAST ────────────────────────────────────────────────────────
  var toast = document.createElement('div');
  toast.style.cssText = 'position:fixed;top:20px;left:20px;z-index:2147483647;background:#0a0a0f;border:1px solid rgba(99,102,241,0.4);border-radius:8px;padding:8px 14px;font:600 11px "Courier New",monospace;color:#818cf8;letter-spacing:0.1em;box-shadow:0 4px 20px rgba(99,102,241,0.2);opacity:0;transform:translateY(-8px);transition:all 0.4s ease';
  toast.textContent = '\u2713 successfully executed';
  document.body.appendChild(toast);
  setTimeout(function() { toast.style.opacity='1'; toast.style.transform='translateY(0)'; }, 50);
  setTimeout(function() { toast.style.opacity='0'; toast.style.transform='translateY(-8px)'; }, 2000);
  setTimeout(function() { toast.remove(); }, 2500);

  // ── STYLES ───────────────────────────────────────────────────────────────
  var style = document.createElement('style');
  style.textContent =
    '#at-root{position:fixed;bottom:28px;right:28px;z-index:2147483647;font-family:"Courier New",monospace;user-select:none}' +
    '#at-panel{width:232px;background:#0a0a0f;border:1px solid rgba(255,255,255,0.07);border-radius:14px;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,0.8),inset 0 1px 0 rgba(255,255,255,0.05);display:none}' +
    '#at-drag{padding:10px 14px;cursor:grab;background:rgba(255,255,255,0.02);border-bottom:1px solid rgba(255,255,255,0.05);display:flex;align-items:center;justify-content:space-between}' +
    '#at-drag:active{cursor:grabbing}' +
    '#at-drag-title{font-size:9px;letter-spacing:0.2em;text-transform:uppercase;color:rgba(255,255,255,0.25)}' +
    '#at-dot{width:6px;height:6px;border-radius:50%;background:#222;transition:all 0.3s}' +
    '#at-dot.run{background:#6366f1;box-shadow:0 0 8px #6366f1}' +
    '#at-dot.man{background:#f59e0b;box-shadow:0 0 8px #f59e0b}' +
    '#at-body{padding:14px}' +
    '.at-lbl{font-size:8px;letter-spacing:0.15em;text-transform:uppercase;color:rgba(255,255,255,0.2);margin-bottom:5px}' +
    '.at-block{margin-bottom:12px}' +
    '#at-wpm-big{font-size:40px;font-weight:700;color:#fff;line-height:1;letter-spacing:-0.03em;cursor:ns-resize}' +
    '#at-wpm-big sub{font-size:11px;color:rgba(255,255,255,0.25);font-weight:400;margin-left:2px;vertical-align:baseline}' +
    '#at-wrange{-webkit-appearance:none;width:100%;height:2px;border-radius:1px;margin-top:8px;background:linear-gradient(to right,#6366f1 var(--p,17%),rgba(255,255,255,0.08) var(--p,17%));outline:none;cursor:pointer}' +
    '#at-wrange::-webkit-slider-thumb{-webkit-appearance:none;width:10px;height:10px;border-radius:50%;background:#fff;cursor:pointer}' +
    '.at-two{display:flex;gap:8px}' +
    '.at-two>div{flex:1}' +
    '.at-num{width:100%;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);border-radius:5px;color:#fff;font:11px "Courier New",monospace;padding:5px 6px;text-align:center;outline:none;box-sizing:border-box}' +
    '.at-btns{display:flex;gap:6px;margin-bottom:8px}' +
    '.at-btn{flex:1;padding:8px 0;border:none;border-radius:7px;font:600 9px "Courier New",monospace;letter-spacing:0.1em;cursor:pointer;transition:all 0.15s}' +
    '#at-start{background:#6366f1;color:#fff;border:1px solid transparent}' +
    '#at-start:hover{background:#818cf8}' +
    '#at-start.on{background:rgba(99,102,241,0.15);color:#818cf8;border:1px solid rgba(99,102,241,0.3)}' +
    '#at-stop{background:rgba(255,255,255,0.05);color:rgba(255,255,255,0.35);border:1px solid rgba(255,255,255,0.07)}' +
    '#at-stop:hover{background:rgba(255,255,255,0.1);color:#fff}' +
    '#at-manual{width:100%;padding:7px 0;border-radius:7px;font:600 9px "Courier New",monospace;letter-spacing:0.1em;cursor:pointer;transition:all 0.2s;background:rgba(255,255,255,0.03);color:rgba(255,255,255,0.25);border:1px solid rgba(255,255,255,0.06);margin-bottom:8px}' +
    '#at-manual.on{background:rgba(245,158,11,0.1);color:#f59e0b;border-color:rgba(245,158,11,0.3)}' +
    '#at-manual:hover{border-color:rgba(255,255,255,0.12);color:rgba(255,255,255,0.4)}' +
    '.at-switch-row{display:flex;align-items:center;justify-content:space-between;padding:7px 0;border-top:1px solid rgba(255,255,255,0.04)}' +
    '.at-switch-lbl{font-size:8px;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.2)}' +
    // Custom switch matching GUI colors
    '.at-sw{font-size:17px;position:relative;display:inline-block;width:3.5em;height:2em}' +
    '.at-sw input{opacity:0;width:0;height:0}' +
    '.at-sw .slider{position:absolute;cursor:pointer;inset:0;border:2px solid #2a2a3a;border-radius:50px;transition:all 0.4s cubic-bezier(0.175,0.885,0.32,1.275)}' +
    '.at-sw .slider:before{position:absolute;content:"";height:1.4em;width:1.4em;left:0.2em;bottom:0.2em;background-color:rgba(255,255,255,0.3);border-radius:inherit;transition:all 0.4s cubic-bezier(0.23,1,0.320,1)}' +
    '.at-sw input:checked + .slider{box-shadow:0 0 20px rgba(99,102,241,0.6);border:2px solid #6366f1}' +
    '.at-sw input:checked + .slider:before{transform:translateX(1.5em);background-color:#fff}' +
    '#at-status{font-size:8px;letter-spacing:0.06em;color:rgba(255,255,255,0.15);text-align:center;margin-top:9px;min-height:11px}' +
    '#at-status.run{color:#818cf8}' +
    '#at-status.err{color:#f87171}' +
    '#at-status.man{color:#f59e0b}';
  document.head.appendChild(style);

  // ── HTML ─────────────────────────────────────────────────────────────────
  var root = document.createElement('div');
  root.id = 'at-root';
  root.innerHTML =
    '<div id="at-panel">' +
      '<div id="at-drag"><span id="at-drag-title">Auto Typer</span><div id="at-dot"></div></div>' +
      '<div id="at-body">' +
        '<div class="at-block"><div class="at-lbl">Target speed</div>' +
          '<div id="at-wpm-big"><span id="at-wval">120</span><sub>wpm</sub></div>' +
          '<input type="range" id="at-wrange" min="20" max="600" step="5" value="120">' +
        '</div>' +
        '<div class="at-block"><div class="at-two">' +
          '<div><div class="at-lbl">Start speed</div><input type="number" id="at-start-wpm" class="at-num" min="20" max="600" value="60"></div>' +
          '<div><div class="at-lbl">Variance %</div><input type="number" id="at-var" class="at-num" min="0" max="50" value="8"></div>' +
        '</div></div>' +
        '<div class="at-btns">' +
          '<button class="at-btn" id="at-start">&#9654; AUTO</button>' +
          '<button class="at-btn" id="at-stop">&#9632; STOP</button>' +
        '</div>' +
        '<button id="at-manual">&#9995; MANUAL  (Alt+M)</button>' +
        '<div class="at-switch-row">' +
          '<span class="at-switch-lbl">&#10006; Mistake mode</span>' +
          '<label class="at-sw"><input type="checkbox" id="sw-mistake"><span class="slider"></span></label>' +
        '</div>' +
        '<div id="at-status">Alt+H \xb7 Alt+T \xb7 Alt+M</div>' +
      '</div>' +
    '</div>';
  document.body.appendChild(root);

  var panel      = document.getElementById('at-panel');
  var dragEl     = document.getElementById('at-drag');
  var dot        = document.getElementById('at-dot');
  var wrange     = document.getElementById('at-wrange');
  var wval       = document.getElementById('at-wval');
  var startWpm   = document.getElementById('at-start-wpm');
  var varInput   = document.getElementById('at-var');
  var startBtn   = document.getElementById('at-start');
  var stopBtn    = document.getElementById('at-stop');
  var manualBtn  = document.getElementById('at-manual');
  var swMistake  = document.getElementById('sw-mistake');
  var statusEl   = document.getElementById('at-status');

  // ── SLIDER ───────────────────────────────────────────────────────────────
  function syncSlider() {
    var p = (wrange.value - 20) / 580 * 100;
    wrange.style.setProperty('--p', p.toFixed(1) + '%');
    wval.textContent = wrange.value;
  }
  wrange.addEventListener('input', syncSlider);
  document.getElementById('at-wpm-big').addEventListener('wheel', function(e) {
    e.preventDefault();
    wrange.value = Math.max(20, Math.min(600, parseInt(wrange.value) + (e.deltaY < 0 ? 5 : -5)));
    syncSlider();
  }, { passive: false });
  syncSlider();

  function setStatus(msg, cls) { statusEl.textContent = msg; statusEl.className = cls || ''; }

  // ── DRAG ─────────────────────────────────────────────────────────────────
  var ox = 0, oy = 0, dragging = false;
  dragEl.addEventListener('mousedown', function(e) {
    dragging = true;
    var r = root.getBoundingClientRect();
    ox = e.clientX - r.left; oy = e.clientY - r.top;
    e.preventDefault();
  });
  document.addEventListener('mousemove', function(e) {
    if (!dragging) return;
    root.style.right = 'auto'; root.style.bottom = 'auto';
    root.style.left = (e.clientX - ox) + 'px';
    root.style.top  = (e.clientY - oy) + 'px';
  });
  document.addEventListener('mouseup', function() { dragging = false; });

  // ── HELPERS ──────────────────────────────────────────────────────────────
  function getCurrentChar() {
    var el = document.querySelector('.first-letter');
    if (!el) return null;
    var ch = el.textContent;
    if (ch === '\u00a0') return ' ';
    return ch.length > 0 ? ch : null;
  }

  function findInput() {
    return document.querySelector('input.inserted-text') ||
           document.querySelector('input[type=text]') || null;
  }

  function typeChar(inp, ch) {
    var setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set;
    setter.call(inp, inp.value + ch);
    inp.dispatchEvent(new Event('input', { bubbles: true }));
    var c = ch.charCodeAt(0);
    var o = { key: ch, charCode: c, keyCode: c, which: c, bubbles: true, cancelable: true };
    inp.dispatchEvent(new KeyboardEvent('keydown',  o));
    inp.dispatchEvent(new KeyboardEvent('keypress', o));
    inp.dispatchEvent(new KeyboardEvent('keyup',    o));
  }

  function typeBackspace(inp) {
    var setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set;
    setter.call(inp, inp.value.slice(0, -1));
    inp.dispatchEvent(new Event('input', { bubbles: true }));
    var o = { key: 'Backspace', keyCode: 8, which: 8, bubbles: true, cancelable: true };
    inp.dispatchEvent(new KeyboardEvent('keydown',  o));
    inp.dispatchEvent(new KeyboardEvent('keyup',    o));
  }

  function charMs(charNum) {
    var target  = parseInt(wrange.value) || 120;
    var start   = Math.min(parseInt(startWpm.value) || 60, target);
    var rampLen = 30;
    var t    = Math.min(charNum / rampLen, 1);
    var wpm  = start + (target - start) * t;
    var base = 60000 / (wpm * 5);
    var pct  = (parseInt(varInput.value) || 0) / 100;
    return Math.max(8, base + base * pct * (Math.random() * 2 - 1));
  }

  // ── MISTAKE LOGIC ─────────────────────────────────────────────────────────
  // Every 10-30 chars, make 1-2 typos then backspace-correct them
  var nextMistakeAt = 0;
  var mistakesLeft  = 0;
  var correctingLeft= 0;
  var WRONG_CHARS   = 'abcdefghijklmnopqrstuvwxyz';

  function scheduleMistake() {
    nextMistakeAt = total + 10 + Math.floor(Math.random() * 21); // 10–30
  }

  function randWrongChar() {
    return WRONG_CHARS[Math.floor(Math.random() * WRONG_CHARS.length)];
  }

  // ── BLOCK REAL KEYBOARD ──────────────────────────────────────────────────
  function blockHandler(e) {
    if (e.altKey) return;
    if (e.isTrusted) { e.stopImmediatePropagation(); e.preventDefault(); }
  }

  // ── AUTO ENGINE ──────────────────────────────────────────────────────────
  var running = false, timer = null, total = 0, retries = 0, lastChar = null;

  function typeNext() {
    if (!running) return;

    // ── CORRECTION PHASE: backspace out mistakes ──
    if (correctingLeft > 0) {
      var inp2 = findInput();
      if (inp2) { inp2.focus(); typeBackspace(inp2); }
      correctingLeft--;
      timer = setTimeout(typeNext, charMs(total) * 1.3); // slightly slower when correcting
      return;
    }

    // ── MISTAKE PHASE: type wrong chars ──
    if (mistakesLeft > 0) {
      var inp3 = findInput();
      if (inp3) {
        inp3.focus();
        typeChar(inp3, randWrongChar());
      }
      mistakesLeft--;
      if (mistakesLeft === 0) correctingLeft = 1 + Math.floor(Math.random() * 2); // backspace 1-2 times
      timer = setTimeout(typeNext, charMs(total) * 0.9);
      return;
    }

    // ── NORMAL TYPING ──
    var ch = getCurrentChar();
    if (!ch) {
      retries++;
      if (retries > 100) { retries = 0; setStatus('Waiting...', ''); }
      timer = setTimeout(typeNext, 50);
      return;
    }
    if (ch === lastChar) {
      retries++;
      if (retries > 100) { retries = 0; lastChar = null; }
      timer = setTimeout(typeNext, 30);
      return;
    }
    retries = 0; lastChar = ch;
    var inp = findInput();
    if (!inp) { timer = setTimeout(typeNext, 50); return; }
    inp.focus();
    typeChar(inp, ch);
    total++;
    setStatus('Typing \xb7 ' + total + ' chars', 'run');

    // Check if we should trigger a mistake next
    if (swMistake.checked && total >= nextMistakeAt && mistakesLeft === 0 && correctingLeft === 0) {
      mistakesLeft = 1 + Math.floor(Math.random() * 2); // 1-2 mistakes
      scheduleMistake();
    }

    timer = setTimeout(typeNext, charMs(total));
  }

  // ── MANUAL MODE ──────────────────────────────────────────────────────────
  var manualActive = false;

  function manualHandler(e) {
    if (!e.isTrusted) return;
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    if (e.key.length > 1) return;
    e.stopImmediatePropagation(); e.preventDefault();
    var ch = getCurrentChar(); if (!ch) return;
    var inp = findInput(); if (!inp) return;
    inp.focus(); typeChar(inp, ch);
    total++;
    setStatus('Manual \xb7 ' + total + ' chars', 'man');
  }

  function startManual() {
    manualActive = true; total = 0;
    document.addEventListener('keydown', manualHandler, true);
    manualBtn.classList.add('on'); dot.className = 'man';
    setStatus('Manual ON \xb7 press any key', 'man');
  }

  function stopManual() {
    manualActive = false;
    document.removeEventListener('keydown', manualHandler, true);
    manualBtn.classList.remove('on'); dot.className = '';
  }

  // ── STOP ALL ─────────────────────────────────────────────────────────────
  function stopAll() {
    if (running) {
      running = false; clearTimeout(timer);
      document.removeEventListener('keydown',  blockHandler, true);
      document.removeEventListener('keypress', blockHandler, true);
      startBtn.classList.remove('on');
    }
    if (manualActive) stopManual();
    dot.className = '';
    setStatus('Stopped \xb7 ' + total + ' chars', 'err');
  }

  // ── BUTTONS ──────────────────────────────────────────────────────────────
  startBtn.addEventListener('click', function() {
    if (running) return;
    if (manualActive) stopManual();
    var inp = findInput();
    if (!inp) { setStatus('No input found!', 'err'); return; }
    running = true; total = 0; retries = 0; lastChar = null;
    mistakesLeft = 0; correctingLeft = 0;
    scheduleMistake();
    startBtn.classList.add('on'); dot.className = 'run';
    document.addEventListener('keydown',  blockHandler, true);
    document.addEventListener('keypress', blockHandler, true);
    inp.focus();
    setStatus('Running...', 'run');
    timer = setTimeout(typeNext, 500);
  });

  stopBtn.addEventListener('click', stopAll);

  manualBtn.addEventListener('click', function() {
    if (running) return;
    manualActive ? stopManual() : startManual();
  });

  // ── KILL SWITCH ──────────────────────────────────────────────────────────
  function killAll() {
    stopAll(); root.remove();
    document.removeEventListener('keydown', shortcutHandler, true);
  }

  // ── SHORTCUTS ────────────────────────────────────────────────────────────
  function shortcutHandler(e) {
    if (e.altKey && e.shiftKey && (e.key === 'P' || e.key === 'p')) { killAll(); return; }
    if (!e.altKey || e.shiftKey) return;
    if (e.key === 'h' || e.key === 'H') panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
    if (e.key === 't' || e.key === 'T') running ? stopBtn.click() : startBtn.click();
    if (e.key === 'm' || e.key === 'M') manualBtn.click();
  }
  document.addEventListener('keydown', shortcutHandler, true);

})();
