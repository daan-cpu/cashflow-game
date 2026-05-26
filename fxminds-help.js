/* fxminds-help.js — FXminds Guidance System
 * Dutch UI | Brand: FXminds
 * Factually correct copy aligned with actual game tile types:
 *   Groen  (#10b981) = PAYDAY   = Salaris
 *   Blauw  (#3b82f6) = KANS     = Investeringsmogelijkheid  ← groei hier
 *   Rood   (#f43f5e) = TEGENSLAG = Kosten
 *   Oranje (#f59e0b) = KEUZE    = Strategische beslissing
 *   Paars  (#8b5cf6) = RUST     = Niets
 */
;(function FXHelpSystem() {
  'use strict';

  var LS_INTRO = 'fxh_seen_intro';
  var LS_NAME  = 'fxh_user_name';
  var LS_SEEN  = 'fxh_hints_seen';
  var SKOOL    = 'https://www.fxminds.nl/skool';

  function lsGet(k)   { try { return localStorage.getItem(k); }    catch(e) { return null; } }
  function lsSet(k,v) { try { localStorage.setItem(k,v); }         catch(e) {} }
  function lsArr(k)   { try { return JSON.parse(lsGet(k)||'[]'); } catch(e) { return []; } }
  function qs(s)      { try { return document.querySelector(s); }  catch(e) { return null; } }

  // ── Name ──────────────────────────────────────────────────────────────────
  function getName() {
    var s = lsGet(LS_NAME);
    if (s && s !== 'Alex' && s !== 'Player') return s;
    var ids = ['sp-name-sit','sp-name-char','player-name','eg-name','lp-name'];
    for (var i=0; i<ids.length; i++) {
      var el = document.getElementById(ids[i]);
      if (el && el.value && el.value !== 'Alex' && el.value.trim()) {
        lsSet(LS_NAME, el.value.trim()); return el.value.trim();
      }
    }
    try {
      var st = window._game&&window._game.engine&&window._game.engine.getState
               ? window._game.engine.getState() : null;
      var p = st && st.activePlayer;
      if (p && p.name && p.name !== 'Alex' && p.name !== 'Player') {
        lsSet(LS_NAME, p.name); return p.name;
      }
    } catch(e) {}
    return '';
  }

  // Layer 1: capture name as user types
  document.addEventListener('input', function(e) {
    try {
      var t = e.target;
      if (t && (t.id==='sp-name-sit'||t.id==='sp-name-char'||
                t.id==='player-name'||t.id==='eg-name'||t.id==='lp-name')) {
        var v = t.value.trim();
        if (v && v !== 'Alex' && v !== 'Player') lsSet(LS_NAME, v);
      }
    } catch(e2) {}
  });

  function isGameActive() {
    var gs = qs('#game-screen');
    return gs && !gs.classList.contains('hidden') && !!qs('#btn-roll');
  }

  // ══════════════════════════════════════════════════════════════════════════
  // INTRO MODAL — factually correct game loop teaching
  // ══════════════════════════════════════════════════════════════════════════
  function fxh_showIntro(onDone) {
    var name    = getName();
    var step    = 0;
    var STEPS   = [
      {
        title: 'Ontsnap uit de Ratrace 🎯',
        body:
          '<p style="color:#9ca3af;line-height:1.7;margin-bottom:18px">' +
          'De meeste mensen werken hun hele leven voor geld, maar het geld werkt nooit voor hen. ' +
          'In dit spel leer je hoe <strong style="color:#f9fafb">passief inkomen</strong> werkt — ' +
          'geld dat binnenkomt <em style="color:#00c896;font-style:normal">zonder dat jij werkt</em>.' +
          '</p>' +
          '<p style="color:#9ca3af;line-height:1.65">' +
          '<strong style="color:#f9fafb">Jouw doel:</strong> ' +
          'bouw genoeg passief inkomen op zodat het jouw maandelijkse uitgaven overstijgt. ' +
          'Doe dat — en jij bent vrij.' +
          '</p>'
      },
      {
        title: 'Inkomen vs Uitgaven 💰',
        body:
          '<div style="display:flex;flex-direction:column;gap:12px;margin-bottom:4px">' +
            '<div style="padding:12px 14px;background:rgba(16,185,129,.08);border:1px solid rgba(16,185,129,.25);border-radius:8px">' +
              '<div style="font-family:IBM Plex Mono,monospace;font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:#10b981;margin-bottom:4px">Actief inkomen</div>' +
              '<div style="font-size:13px;color:#d1d5db">Salaris — je werkt, je verdient. Stop je met werken, stopt het inkomen.</div>' +
            '</div>' +
            '<div style="padding:12px 14px;background:rgba(59,130,246,.08);border:1px solid rgba(59,130,246,.25);border-radius:8px">' +
              '<div style="font-family:IBM Plex Mono,monospace;font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:#3b82f6;margin-bottom:4px">Passief inkomen</div>' +
              '<div style="font-size:13px;color:#d1d5db">Huurinkomsten, dividenden, bedrijfswinst — werkt 24/7, ook als jij slaapt.</div>' +
            '</div>' +
            '<div style="padding:12px 14px;background:rgba(244,63,94,.08);border:1px solid rgba(244,63,94,.2);border-radius:8px">' +
              '<div style="font-family:IBM Plex Mono,monospace;font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:#f43f5e;margin-bottom:4px">Uitgaven</div>' +
              '<div style="font-size:13px;color:#d1d5db">Vaste lasten elke maand. Zolang passief inkomen &lt; uitgaven zit je in de ratrace.</div>' +
            '</div>' +
          '</div>'
      },
      {
        title: 'Het bord begrijpen 🗺️',
        body:
          '<div style="display:flex;flex-direction:column;gap:9px">' +
            '<div style="display:flex;align-items:center;gap:10px;font-size:13px;color:#d1d5db">' +
              '<span style="width:12px;height:12px;border-radius:50%;background:#10b981;flex-shrink:0"></span>' +
              '<span><strong style="color:#f9fafb">Salaris</strong> — je ontvangt je maandloon. Overleving, geen groei.</span>' +
            '</div>' +
            '<div style="display:flex;align-items:center;gap:10px;font-size:13px;color:#d1d5db;padding:8px 10px;background:rgba(59,130,246,.08);border:1px solid rgba(59,130,246,.22);border-radius:7px">' +
              '<span style="width:12px;height:12px;border-radius:50%;background:#3b82f6;flex-shrink:0"></span>' +
              '<span><strong style="color:#3b82f6">Kans</strong> — investeringsmogelijkheid. Hier bouw je passief inkomen. <em style="color:#00c896;font-style:normal">Pak altijd deze kansen.</em></span>' +
            '</div>' +
            '<div style="display:flex;align-items:center;gap:10px;font-size:13px;color:#d1d5db">' +
              '<span style="width:12px;height:12px;border-radius:50%;background:#f43f5e;flex-shrink:0"></span>' +
              '<span><strong style="color:#f43f5e">Tegenslag</strong> — onverwachte kosten. Deel van het spel.</span>' +
            '</div>' +
            '<div style="display:flex;align-items:center;gap:10px;font-size:13px;color:#d1d5db">' +
              '<span style="width:12px;height:12px;border-radius:50%;background:#f59e0b;flex-shrink:0"></span>' +
              '<span><strong style="color:#f59e0b">Keuze</strong> — strategische beslissing. Denk na voor je kiest.</span>' +
            '</div>' +
            '<div style="display:flex;align-items:center;gap:10px;font-size:13px;color:#d1d5db">' +
              '<span style="width:12px;height:12px;border-radius:50%;background:#8b5cf6;flex-shrink:0"></span>' +
              '<span><strong style="color:#8b5cf6">Rust</strong> — niets. Je bezittingen verdienen gewoon door.</span>' +
            '</div>' +
          '</div>'
      },
      {
        title: 'Klaar om te spelen 🚀',
        body:
          '<p style="color:#9ca3af;line-height:1.7;margin-bottom:16px">' +
          (name ? '<strong style="color:#f9fafb">' + name + '</strong>, je begrijpt nu de basis.' :
                   'Je begrijpt nu de basis.') +
          ' Onthoud één ding:' +
          '</p>' +
          '<div style="background:rgba(0,200,150,.07);border:1px solid rgba(0,200,150,.25);border-left:3px solid #00c896;border-radius:8px;padding:14px 16px;font-size:13px;color:#9ca3af;line-height:1.65">' +
            '<strong style="color:#f9fafb">Salaris overleeft je. Kansen bevrijden je.</strong><br>' +
            'Focus op de blauwe Kans-vakjes. Elke investering die je doet brengt je een stap dichter bij financiële vrijheid.' +
          '</div>'
      }
    ];

    var modal = document.createElement('div');
    modal.className = 'fxh-intro';

    function render() {
      var s        = STEPS[step];
      var isLast   = step === STEPS.length - 1;
      var isFirst  = step === 0;
      modal.innerHTML =
        '<div class="fxh-intro-box">' +
          '<div class="fxh-intro-brand">FXminds · Cashflow Simulator</div>' +
          '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:18px">' +
            '<h2 style="margin:0;font-size:18px">' + s.title + '</h2>' +
            '<span style="font-family:IBM Plex Mono,monospace;font-size:10px;color:#566a8f;letter-spacing:.06em">' +
              (step+1) + ' / ' + STEPS.length +
            '</span>' +
          '</div>' +
          s.body +
          '<div style="display:flex;justify-content:space-between;align-items:center;margin-top:22px;gap:10px">' +
            '<button class="fxh-ob-skip" style="background:transparent;border:1px solid #1e2840;border-radius:6px;padding:8px 14px;font-family:IBM Plex Mono,monospace;font-size:11px;font-weight:600;color:#566a8f;cursor:pointer">Overslaan</button>' +
            '<div style="display:flex;gap:8px">' +
              (!isFirst ? '<button class="fxh-ob-back" style="background:transparent;border:1px solid #2a3858;border-radius:6px;padding:8px 16px;font-family:IBM Plex Mono,monospace;font-size:11px;font-weight:600;color:#dce6f5;cursor:pointer">← Terug</button>' : '') +
              '<button class="fxh-ob-next" style="background:#00c896;border:none;border-radius:6px;padding:8px 20px;font-family:IBM Plex Mono,monospace;font-size:12px;font-weight:700;color:#000;cursor:pointer">' +
                (isLast ? 'Start spel →' : 'Volgende →') +
              '</button>' +
            '</div>' +
          '</div>' +
          '<div style="display:flex;justify-content:center;gap:6px;margin-top:16px">' +
            STEPS.map(function(_,i) {
              return '<span style="width:6px;height:6px;border-radius:50%;background:' +
                (i===step ? '#00c896' : '#1e2840') + '"></span>';
            }).join('') +
          '</div>' +
        '</div>';

      modal.querySelector('.fxh-ob-skip').onclick = function() { modal.remove(); if (typeof onDone === 'function') { onDone(); } };
      modal.querySelector('.fxh-ob-next').onclick = function() {
        if (step < STEPS.length - 1) { step++; render(); }
        else { modal.remove(); if (typeof onDone === 'function') { onDone(); } }
      };
      var backBtn = modal.querySelector('.fxh-ob-back');
      if (backBtn) backBtn.onclick = function() { if (step > 0) { step--; render(); } };
    }

    document.body.appendChild(modal);
    render();
  }

  // ── fxh_triggerIntro — called by engine.startGame patch in script.js ─────────
  // This is the ONLY entry point. It runs after engine.startGame() has completed
  // its synchronous render cycle, so the board is always live when modal appears.
  function fxh_triggerIntro(onDone) {
    if (lsGet(LS_INTRO)) {
      if (typeof onDone === 'function') { onDone(); }
      return;
    }
    lsSet(LS_INTRO, '1');
    _attachTitles();
    fxh_showIntro(onDone);
  }

  // ── First-turn signals ─────────────────────────────────────────────────────
  function _pulseRollBtn() {
    try {
      var btn = qs('#btn-roll');
      if (!btn) return;
      btn.style.transition = 'box-shadow .3s ease';
      btn.style.boxShadow  = '0 0 0 4px rgba(59,130,246,.8), 0 0 20px rgba(59,130,246,.45)';
      setTimeout(function() { btn.style.boxShadow = ''; }, 3000);
    } catch(e) {}
  }

  function _showRollTooltip() {
    try {
      var btn = qs('#btn-roll');
      if (!btn) return;
      var tip = document.createElement('div');
      tip.className = 'fxh-roll-tip';
      tip.innerHTML = '▲ Start hier — dit is je eerste zet';
      document.body.appendChild(tip);
      var r = btn.getBoundingClientRect();
      tip.style.top  = (r.top - 48 + window.scrollY) + 'px';
      tip.style.left = (r.left + r.width/2) + 'px';
      requestAnimationFrame(function() { tip.classList.add('fxh-roll-tip-show'); });
      setTimeout(function() {
        tip.classList.remove('fxh-roll-tip-show');
        setTimeout(function() { if (tip.parentNode) tip.remove(); }, 400);
      }, 3500);
    } catch(e) {}
  }

  // ── showFirstTurnGuide — called by script.js render hook ──────────────────
  function showFirstTurnGuide(playerName) {
    try {
      if (!isGameActive()) return;
      _pulseRollBtn();
    } catch(e) {}
  }

  // ── Tooltips on key buttons (title attr — zero DOM complexity) ───────────
  // Tooltip titles — called once when game is active (by fxh_triggerIntro)
  function _attachTitles() {
    var map = {
      '#btn-roll':      'Start je beurt — je beweegt en maakt een keuze',
      '#btn-statement': 'Bekijk je financiële overzicht',
      '#btn-restart':   'Herstart het spel — voortgang gaat verloren',
      '#btn-challenge': 'Dagelijkse uitdaging voor bonus XP',
      '#btn-community': 'FXminds community',
      '#btn-sfx':       'Geluid aan/uit'
    };
    Object.keys(map).forEach(function(sel) {
      var el = qs(sel);
      if (el && !el.title) el.title = map[sel];
    });
  }

  // ══════════════════════════════════════════════════════════════════════════
  // CONTEXT HINTS — factually correct, situation-aware
  // ══════════════════════════════════════════════════════════════════════════
  var CTX = {
    // Corrected: investments come from BLUE Kans tiles, not green Salaris tiles
    negative_cashflow: {
      title: 'Negatieve cashflow ⚠️',
      body:  'Je geeft meer uit dan je passief verdient. ' +
             'Land op een <strong style="color:#3b82f6">🎯 Kans-vakje</strong> (blauw) ' +
             'en investeer — dat genereert maandelijkse cashflow. ' +
             'Salaris betaalt de rekeningen; kansen bouwen vermogen.'
    },

    only_salary: {
      title: 'Alleen salaris is niet genoeg',
      body:  'Je hebt nog geen bezittingen. Zonder investeringen blijf je in de ratrace. ' +
             'Pak de eerstvolgende <strong style="color:#3b82f6">🎯 Kans</strong> ' +
             'en koop een bezitting — elke euro passief inkomen telt.'
    },

    first_asset_bought: {
      title: 'Eerste bezitting! 🎉',
      body:  'Je genereert nu passief inkomen — elke maand, automatisch. ' +
             'Blijf <strong style="color:#3b82f6">Kans-vakjes</strong> pakken ' +
             'en diversifieer: vastgoed, aandelen, bedrijven. ' +
             'Zo ontsnapt je uit de ratrace.'
    },

    fast_track_entered: {
      title: 'Fast Track bereikt 🚀',
      body:  'Grotere kansen, hoger rendement, snellere groei. ' +
             'Blijf gefocust op cashflow — hier versnel je richting financiële vrijheid.'
    }
  };

  function showContextHint(key, override) {
    try {
      var hint = override || CTX[key]; if (!hint) return;
      if (!override) {
        var seen = lsArr(LS_SEEN);
        if (seen.indexOf(key) !== -1) return;
        seen.push(key); lsSet(LS_SEEN, JSON.stringify(seen));
      }
      _showBanner(hint.title, hint.body);
    } catch(e) {}
  }

  function _showBanner(title, body) {
    try {
      // Remove any existing banner
      var old = document.querySelector('.fxh-banner');
      if (old) old.remove();

      var el = document.createElement('div');
      el.className = 'fxh-banner';
      el.innerHTML =
        '<div class="fxh-banner-inner">' +
          '<div class="fxh-banner-title">' + title + '</div>' +
          '<div class="fxh-banner-body">'  + body  + '</div>' +
          '<button class="fxh-banner-close">Begrepen ✓</button>' +
        '</div>';
      el.querySelector('.fxh-banner-close').onclick = function() { _dismiss(el); };
      document.body.appendChild(el);
      requestAnimationFrame(function() { el.classList.add('fxh-banner-show'); });
      setTimeout(function() { _dismiss(el); }, 8000);
    } catch(e) {}
  }

  function _dismiss(el) {
    try {
      el.classList.remove('fxh-banner-show');
      setTimeout(function() { if (el && el.parentNode) el.remove(); }, 350);
    } catch(e) {}
  }

  // ══════════════════════════════════════════════════════════════════════════
  // HELP BUTTON + MENU
  // ══════════════════════════════════════════════════════════════════════════
  var _root = null, _menuEl = null, _modalEl = null;

  function _getRoot() {
    if (!_root) {
      _root = document.getElementById('fxh-root');
      if (!_root) { _root = document.createElement('div'); _root.id = 'fxh-root'; document.body.appendChild(_root); }
    }
    return _root;
  }

  function _buildHelpBtn() {
    var btn = document.createElement('button');
    btn.className = 'fxh-help-btn'; btn.title = 'Help & uitleg'; btn.textContent = '?';
    btn.onclick = _toggleMenu;
    _getRoot().appendChild(btn);
  }

  function _toggleMenu() {
    var r = _getRoot();
    _menuEl && r.contains(_menuEl) ? _closeMenu() : _openMenu();
  }

  function _openMenu() {
    _closeMenu();
    _menuEl = document.createElement('div');
    _menuEl.className = 'fxh-menu';
    _menuEl.innerHTML =
      '<div class="fxh-menu-head">FXminds Hulp</div>' +
      '<button class="fxh-menu-btn" data-a="intro">▶ Uitleg opnieuw tonen</button>' +
      '<button class="fxh-menu-btn" data-a="uitleg">📖 Hoe werkt het spel?</button>' +
      '<button class="fxh-menu-btn" data-a="tips">💡 Tips om sneller te winnen</button>' +
      '<div class="fxh-menu-div"></div>' +
      '<a class="fxh-menu-cta" href="' + SKOOL + '" target="_blank" rel="noopener">🎓 Leer dit in het echt via FXminds →</a>';
    _menuEl.querySelectorAll('[data-a]').forEach(function(b) {
      b.onclick = function() {
        _closeMenu();
        if (b.dataset.a === 'intro') { lsSet(LS_INTRO,''); fxh_showIntro(); }
        else _openModal(b.dataset.a);
      };
    });
    _getRoot().appendChild(_menuEl);
    requestAnimationFrame(function() { _menuEl && _menuEl.classList.add('fxh-on'); });
    setTimeout(function() { document.addEventListener('click', _outside, {once:true}); }, 20);
  }

  function _outside(e) { if (_menuEl && !_menuEl.contains(e.target)) _closeMenu(); }
  function _closeMenu() { if (_menuEl) { _menuEl.remove(); _menuEl = null; } }

  var _HELP = {
    uitleg: {
      title: 'Hoe werkt het spel?',
      body:
        '<ol>' +
        '<li>Je start met een baan en vaste maandlasten.</li>' +
        '<li>Gooi elke beurt de dobbelstenen en beweeg over het bord.</li>' +
        '<li>Land op <strong style="color:#3b82f6">Kans (blauw)</strong>? Kies een investering → passief inkomen stijgt.</li>' +
        '<li>Land op <strong style="color:#10b981">Salaris (groen)</strong>? Je ontvangt je maandloon.</li>' +
        '<li>Land op <strong style="color:#f43f5e">Tegenslag (rood)</strong>? Onverwachte kosten.</li>' +
        '<li>Passief inkomen ≥ uitgaven = <strong>je wint.</strong></li>' +
        '</ol>'
    },
    tips: {
      title: 'Tips om sneller te winnen 💡',
      body:
        '<ul>' +
        '<li><strong>Kans-vakjes zijn je prioriteit.</strong> Elke gemiste kans is een gemiste maand cashflow.</li>' +
        '<li><strong>Diversifieer:</strong> Mix vastgoed, aandelen en bedrijven — spreid het risico.</li>' +
        '<li><strong>Betaal dure schulden</strong> af zodat je meer cashflow overhoudt om te herinvesteren.</li>' +
        '<li><strong>Fast Track:</strong> Betreed hem zodra je kan — grotere kansen, snellere vrijheid.</li>' +
        '</ul>'
    }
  };

  function _openModal(key) {
    _closeModal();
    var c = _HELP[key]; if (!c) return;
    _modalEl = document.createElement('div');
    _modalEl.className = 'fxh-modal';
    _modalEl.innerHTML =
      '<div class="fxh-modal-box">' +
        '<button class="fxh-modal-close">✕</button>' +
        '<div class="fxh-modal-title">' + c.title + '</div>' +
        '<div class="fxh-modal-body">'  + c.body  + '</div>' +
        '<div class="fxh-modal-cta"><a href="' + SKOOL + '" target="_blank" rel="noopener">Wil je dit in het echt leren? → FXminds Skool</a></div>' +
      '</div>';
    _modalEl.querySelector('.fxh-modal-close').onclick = _closeModal;
    _modalEl.addEventListener('click', function(e) { if (e.target===_modalEl) _closeModal(); });
    _getRoot().appendChild(_modalEl);
    requestAnimationFrame(function() { _modalEl && _modalEl.classList.add('fxh-on'); });
  }
  function _closeModal() { if (_modalEl) { _modalEl.remove(); _modalEl = null; } }

  // ── FXEvents ───────────────────────────────────────────────────────────────
  function _hookEvents() {
    if (typeof FXEvents === 'undefined') return;
    FXEvents.on('assetBought', function() {
      setTimeout(function() { showContextHint('first_asset_bought'); }, 700);
    });
    FXEvents.on('enteredFastTrack', function() {
      setTimeout(function() { showContextHint('fast_track_entered'); }, 700);
    });
  }

  function _init() {
    _buildHelpBtn();
    _hookEvents();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', _init);
  } else { _init(); }

  // Public API
  window.FXHelpSystem = {
    showIntro:          fxh_showIntro,
    triggerIntro:       fxh_triggerIntro,
    showContextHint:    showContextHint,
    showFirstTurnGuide: showFirstTurnGuide,
    getName:            getName
  };
  window.fxh_showIntro    = fxh_showIntro;
  window.fxh_triggerIntro = fxh_triggerIntro;

}());
