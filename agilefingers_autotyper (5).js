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
    '#at-panel{width:240px;background:#0d0d14;border:1px solid rgba(255,255,255,0.09);border-radius:16px;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,0.8),inset 0 1px 0 rgba(255,255,255,0.06);display:none}' +
    '#at-drag{padding:11px 16px;cursor:grab;background:rgba(255,255,255,0.03);border-bottom:1px solid rgba(255,255,255,0.06);display:flex;align-items:center;justify-content:space-between}' +
    '#at-drag:active{cursor:grabbing}' +
    '#at-drag-title{font-size:9px;letter-spacing:0.2em;text-transform:uppercase;color:rgba(255,255,255,0.4)}' +
    '#at-dot{width:7px;height:7px;border-radius:50%;background:#2a2a3a;transition:all 0.3s}' +
    '#at-dot.run{background:#6366f1;box-shadow:0 0 10px #6366f1}' +
    '#at-dot.man{background:#f59e0b;box-shadow:0 0 10px #f59e0b}' +
    '#at-body{padding:16px}' +
    '.at-lbl{font-size:9px;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.35);margin-bottom:6px}' +
    '.at-block{margin-bottom:14px}' +
    '#at-wpm-big{font-size:44px;font-weight:700;color:#fff;line-height:1;letter-spacing:-0.03em;cursor:ns-resize}' +
    '#at-wpm-big sub{font-size:12px;color:rgba(255,255,255,0.3);font-weight:400;margin-left:3px;vertical-align:baseline}' +
    '#at-wrange{-webkit-appearance:none;width:100%;height:3px;border-radius:2px;margin-top:10px;background:linear-gradient(to right,#6366f1 var(--p,17%),rgba(255,255,255,0.1) var(--p,17%));outline:none;cursor:pointer}' +
    '#at-wrange::-webkit-slider-thumb{-webkit-appearance:none;width:12px;height:12px;border-radius:50%;background:#fff;cursor:pointer;box-shadow:0 0 6px rgba(99,102,241,0.5)}' +
    '.at-num{width:100%;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);border-radius:7px;color:#fff;font:12px "Courier New",monospace;padding:7px 6px;text-align:center;outline:none;box-sizing:border-box}' +
    '.at-num:focus{border-color:rgba(99,102,241,0.5)}' +
    '.at-btns{display:flex;gap:8px;margin-bottom:10px}' +
    '.at-btn{flex:1;padding:10px 0;border:none;border-radius:8px;font:700 10px "Courier New",monospace;letter-spacing:0.12em;cursor:pointer;transition:all 0.15s}' +
    '#at-start{background:#6366f1;color:#fff;border:1px solid transparent}' +
    '#at-start:hover{background:#818cf8;box-shadow:0 0 16px rgba(99,102,241,0.4)}' +
    '#at-start.on{background:rgba(99,102,241,0.15);color:#818cf8;border:1px solid rgba(99,102,241,0.4)}' +
    '#at-stop{background:rgba(255,255,255,0.06);color:rgba(255,255,255,0.5);border:1px solid rgba(255,255,255,0.1)}' +
    '#at-stop:hover{background:rgba(255,255,255,0.12);color:#fff}' +
    '#at-manual{width:100%;padding:9px 0;border-radius:8px;font:700 10px "Courier New",monospace;letter-spacing:0.12em;cursor:pointer;transition:all 0.2s;background:rgba(255,255,255,0.04);color:rgba(255,255,255,0.45);border:1px solid rgba(255,255,255,0.1);margin-bottom:10px}' +
    '#at-manual.on{background:rgba(245,158,11,0.12);color:#f59e0b;border-color:rgba(245,158,11,0.4)}' +
    '#at-manual:hover{border-color:rgba(255,255,255,0.2);color:rgba(255,255,255,0.7)}' +
    '.at-switch-row{display:flex;align-items:center;justify-content:space-between;padding:10px 0;border-top:1px solid rgba(255,255,255,0.06)}' +
    '.at-switch-lbl{font-size:9px;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.45)}' +
    '.at-sw{display:flex;align-items:center;cursor:pointer;gap:0}' +
    '.at-sw-track{width:40px;height:22px;background:#1a1a28;border:1.5px solid #2a2a3a;border-radius:11px;position:relative;transition:all 0.3s ease;flex-shrink:0}' +
    '.at-sw-track.on{background:rgba(99,102,241,0.2);border-color:#6366f1;box-shadow:0 0 12px rgba(99,102,241,0.35)}' +
    '.at-sw-thumb{position:absolute;top:3px;left:3px;width:14px;height:14px;border-radius:50%;background:rgba(255,255,255,0.25);transition:all 0.3s cubic-bezier(0.23,1,0.32,1)}' +
    '.at-sw-track.on .at-sw-thumb{left:21px;background:#6366f1;box-shadow:0 0 8px rgba(99,102,241,0.7)}' +
    '#at-status{font-size:9px;letter-spacing:0.06em;color:rgba(255,255,255,0.2);text-align:center;margin-top:10px;min-height:12px}' +
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
        '<div class="at-block"><div class="at-lbl">Variance %</div>' +
          '<div class="at-var-row"><input type="number" id="at-var" class="at-num" min="0" max="50" value="8"><span style="font-size:9px;color:rgba(255,255,255,0.25)">% random timing</span></div>' +
        '</div>' +
        '<div class="at-btns">' +
          '<button class="at-btn" id="at-start">&#9654; AUTO</button>' +
          '<button class="at-btn" id="at-stop">&#9632; STOP</button>' +
        '</div>' +
        '<button id="at-manual">&#9995; MANUAL  (Alt+M)</button>' +
        '<div class="at-switch-row">' +
          '<span class="at-switch-lbl">&#127918; Mistake mode</span>' +
          '<div class="at-sw" id="sw-mistake-wrap" onclick="(function(){var el=document.getElementById(\'sw-mistake\');el.checked=!el.checked;document.getElementById(\'sw-mistake-track\').classList.toggle(\'on\',el.checked)})()">' +
          '<input type="checkbox" id="sw-mistake" style="display:none">' +
          '<div class="at-sw-track" id="sw-mistake-track"><div class="at-sw-thumb"></div></div>' +
        '</div>' +
        '</div>' +
        '<div class="at-switch-row">' +
          '<span class="at-switch-lbl">&#9889; Burst mode</span>' +
          '<div class="at-sw" id="sw-burst-wrap" onclick="(function(){var el=document.getElementById(\'sw-burst\');el.checked=!el.checked;document.getElementById(\'sw-burst-track\').classList.toggle(\'on\',el.checked)})()">' +
          '<input type="checkbox" id="sw-burst" style="display:none">' +
          '<div class="at-sw-track" id="sw-burst-track"><div class="at-sw-thumb"></div></div>' +
        '</div>' +
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
  var swBurst    = document.getElementById('sw-burst');
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

  var burstLeft = 0, nextBurstAt = 0;
  var runStart  = 0; // timestamp when typing started

  // The site uses: WPM = totalChars / 5 / minutesElapsed
  // So to hit target WPM we need: totalChars / 5 / (elapsed/60000) = targetWPM
  // Which means each char should take: 60000 / (targetWPM * 5) ms on average
  // We apply variance on top of that base delay.
  function charMs(charNum) {
    var target = parseInt(wrange.value) || 120;
    var base   = 60000 / (target * 5); // exact ms per char to hit target WPM
    var pct    = (parseInt(varInput.value) || 0) / 100;
    var ms     = Math.max(8, base + base * pct * (Math.random() * 2 - 1));

    // Burst mode: occasionally type 3-5 chars at 2.5x speed
    if (swBurst.checked) {
      if (burstLeft > 0) {
        burstLeft--;
        return ms * 0.4;
      }
      if (charNum >= nextBurstAt) {
        burstLeft   = 2 + Math.floor(Math.random() * 4);
        nextBurstAt = charNum + 8 + Math.floor(Math.random() * 8);
        return ms * 0.4;
      }
    }
    return ms;
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
    mistakesLeft = 0; correctingLeft = 0; burstLeft = 0; nextBurstAt = 8 + Math.floor(Math.random()*8);
    runStart = Date.now();
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
