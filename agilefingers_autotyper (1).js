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
    '#at-var{width:36px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);border-radius:5px;color:#fff;font:11px "Courier New",monospace;padding:3px 5px;text-align:center;outline:none}' +
    '.at-var-row{display:flex;align-items:center;gap:7px;font-size:10px;color:rgba(255,255,255,0.2)}' +
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
    '.at-switch{width:30px;height:16px;border-radius:8px;background:rgba(255,255,255,0.07);border:none;cursor:pointer;position:relative;transition:background 0.2s;padding:0;flex-shrink:0}' +
    '.at-switch.on{background:#6366f1}' +
    '.at-switch::after{content:"";position:absolute;top:2px;left:2px;width:12px;height:12px;border-radius:50%;background:rgba(255,255,255,0.4);transition:all 0.2s}' +
    '.at-switch.on::after{left:16px;background:#fff}' +
    '#at-status{font-size:8px;letter-spacing:0.06em;color:rgba(255,255,255,0.15);text-align:center;margin-top:9px;min-height:11px}' +
    '#at-status.run{color:#818cf8}' +
    '#at-status.err{color:#f87171}' +
    '#at-status.man{color:#f59e0b}' +
    '#at-status.ok{color:#4ade80}';
  document.head.appendChild(style);

  // ── HTML ─────────────────────────────────────────────────────────────────
  var root = document.createElement('div');
  root.id = 'at-root';
  root.innerHTML =
    '<div id="at-panel">' +
      '<div id="at-drag"><span id="at-drag-title">Auto Typer</span><div id="at-dot"></div></div>' +
      '<div id="at-body">' +
        '<div class="at-block"><div class="at-lbl">Speed</div>' +
          '<div id="at-wpm-big"><span id="at-wval">120</span><sub>wpm</sub></div>' +
          '<input type="range" id="at-wrange" min="20" max="600" step="5" value="120">' +
        '</div>' +
        '<div class="at-block"><div class="at-lbl">Variance</div>' +
          '<div class="at-var-row"><input type="number" id="at-var" min="0" max="50" value="8"><span>% timing randomness</span></div>' +
        '</div>' +
        '<div class="at-btns">' +
          '<button class="at-btn" id="at-start">&#9654; AUTO</button>' +
          '<button class="at-btn" id="at-stop">&#9632; STOP</button>' +
        '</div>' +
        '<button id="at-manual">&#9995; MANUAL  (Alt+M)</button>' +
        // Human mode toggle
        '<div class="at-switch-row">' +
          '<span class="at-switch-lbl">&#129504; Human mode</span>' +
          '<button class="at-switch" id="sw-human"></button>' +
        '</div>' +
        // Stealth mode toggle — hides the panel while running so no one sees it
        '<div class="at-switch-row">' +
          '<span class="at-switch-lbl">&#128065; Stealth mode</span>' +
          '<button class="at-switch" id="sw-stealth"></button>' +
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
  var varInput   = document.getElementById('at-var');
  var startBtn   = document.getElementById('at-start');
  var stopBtn    = document.getElementById('at-stop');
  var manualBtn  = document.getElementById('at-manual');
  var swHuman    = document.getElementById('sw-human');
  var swStealth  = document.getElementById('sw-stealth');
  var statusEl   = document.getElementById('at-status');
  var humanOn    = false;
  var stealthOn  = false;

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

  // ── TOGGLES ──────────────────────────────────────────────────────────────
  swHuman.addEventListener('click', function() {
    humanOn = !humanOn;
    humanOn ? swHuman.classList.add('on') : swHuman.classList.remove('on');
  });

  swStealth.addEventListener('click', function() {
    stealthOn = !stealthOn;
    stealthOn ? swStealth.classList.add('on') : swStealth.classList.remove('on');
  });

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

  function charMs() {
    var wpm  = parseInt(wrange.value) || 120;
    var base = 60000 / (wpm * 5);
    if (humanOn) {
      // Human mode: bell curve timing with occasional pauses and bursts
      var r = Math.random();
      if (r < 0.03) return base * (4 + Math.random() * 6);   // thinking pause
      if (r < 0.11) return base * (1.8 + Math.random() * 1.5); // stumble
      var g = (Math.random() + Math.random() + Math.random() - 1.5) / 1.5;
      return Math.max(20, base + base * 0.28 * g);
    }
    var pct = (parseInt(varInput.value) || 0) / 100;
    return Math.max(8, base + base * pct * (Math.random() * 2 - 1));
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
    if (!stealthOn) setStatus('Typing \xb7 ' + total + ' chars', 'run');
    timer = setTimeout(typeNext, charMs());
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
      // Un-stealth when stopped
      if (stealthOn) { panel.style.opacity = '1'; panel.style.pointerEvents = 'all'; }
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
    startBtn.classList.add('on'); dot.className = 'run';
    document.addEventListener('keydown',  blockHandler, true);
    document.addEventListener('keypress', blockHandler, true);
    inp.focus();
    setStatus('Running...', 'run');
    // Stealth: hide panel after short delay so user sees it started
    if (stealthOn) {
      setTimeout(function() {
        if (running) { panel.style.opacity = '0'; panel.style.pointerEvents = 'none'; }
      }, 800);
    }
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
    if (e.key === 'h' || e.key === 'H') {
      // If stealth-hidden, always show on Alt+H
      panel.style.opacity = '1'; panel.style.pointerEvents = 'all';
      panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
    }
    if (e.key === 't' || e.key === 'T') running ? stopBtn.click() : startBtn.click();
    if (e.key === 'm' || e.key === 'M') manualBtn.click();
  }
  document.addEventListener('keydown', shortcutHandler, true);

})();
