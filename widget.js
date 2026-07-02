/* Assistant M'Eye Clinic — widget embarquable (marque blanche).
   Intégration : <script src="https://assistant.meyeclinic.fr/widget.js" data-client="meyeclinic" defer></script>
   Attributs optionnels : data-name, data-sub, data-phone, data-color, data-color2, data-intro, data-api */
(function () {
  if (window.__mecWidgetLoaded) return;
  window.__mecWidgetLoaded = true;

  var S = document.currentScript || (function () {
    var s = document.getElementsByTagName('script');
    for (var i = s.length - 1; i >= 0; i--) { if (/widget\.js/.test(s[i].src)) return s[i]; }
    return s[s.length - 1];
  })();
  function attr(n, d) { var v = S && S.getAttribute(n); return (v === null || v === undefined || v === '') ? d : v; }

  var CLIENT = attr('data-client', 'meyeclinic');
  var NAME   = attr('data-name', "Assistant M'Eye Clinic");
  var SUB    = attr('data-sub', 'Vos yeux, vos questions · 24h/24');
  var PHONE  = attr('data-phone', '04 97 19 30 46');
  var TEL    = 'tel:+' + PHONE.replace(/[^0-9]/g, '').replace(/^0/, '33');
  var C1     = attr('data-color', '#2C6FA0');
  var C2     = attr('data-color2', '#13314F');
  var API    = attr('data-api', 'https://assistant.meyeclinic.fr/api/chat');
  var LABEL  = attr('data-label', 'Une question ?');
  var INTRO  = attr('data-intro', "Bonjour 👋 Je suis l'assistant de M'Eye Clinic. Posez-moi vos questions sur vos yeux, vos examens ou une intervention.");

  var hist = [], busy = false, started = false;

  var css = ''
    + '#mecw-root *{box-sizing:border-box}'
    + '#mecw-fab{position:fixed;right:20px;bottom:20px;z-index:2147483000;display:flex;align-items:center;gap:10px;'
    + 'background:linear-gradient(135deg,' + C1 + ',' + C2 + ');color:#fff;border:none;cursor:pointer;padding:12px 18px 12px 14px;'
    + 'border-radius:999px;box-shadow:0 14px 34px -10px rgba(19,49,79,.55);font-family:inherit;font-weight:700;font-size:14px;line-height:1;'
    + 'transition:transform .2s;animation:mecwpulse 2.8s infinite}'
    + '#mecw-fab:hover{transform:translateY(-3px)}'
    + '@keyframes mecwpulse{0%,100%{box-shadow:0 14px 34px -10px rgba(19,49,79,.5)}50%{box-shadow:0 16px 44px -6px ' + hexa(C1, .8) + '}}'
    + '#mecw-panel{position:fixed;right:20px;bottom:20px;z-index:2147483001;width:min(380px,92vw);height:min(560px,80vh);'
    + 'background:#fff;border-radius:20px;box-shadow:0 30px 80px -20px rgba(19,49,79,.55);display:none;flex-direction:column;'
    + 'overflow:hidden;border:1px solid #dce8f2;font-family:inherit}'
    + '#mecw-root.open #mecw-panel{display:flex;animation:mecwpop .22s ease}'
    + '#mecw-root.open #mecw-fab{display:none}'
    + '@keyframes mecwpop{from{opacity:0;transform:translateY(14px) scale(.98)}to{opacity:1;transform:none}}'
    + '.mecw-head{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:15px 16px;background:linear-gradient(135deg,' + C1 + ',' + C2 + ');color:#fff}'
    + '.mecw-head b{font-size:16px;display:block;line-height:1.2;font-weight:700}'
    + '.mecw-head span{font-size:11px;opacity:.85}'
    + '.mecw-x{background:rgba(255,255,255,.15);border:none;color:#fff;width:30px;height:30px;border-radius:50%;font-size:19px;cursor:pointer;line-height:1;flex:none}'
    + '.mecw-x:hover{background:rgba(255,255,255,.3)}'
    + '#mecw-msgs{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:10px;background:#f5f9fc}'
    + '.mecw-b{max-width:85%;padding:10px 13px;border-radius:14px;font-size:14px;line-height:1.5;white-space:pre-wrap;word-wrap:break-word}'
    + '.mecw-b.bot{align-self:flex-start;background:#fff;border:1px solid #e3edf5;color:#1f2d3d;border-bottom-left-radius:4px}'
    + '.mecw-b.me{align-self:flex-end;background:' + C1 + ';color:#fff;border-bottom-right-radius:4px}'
    + '.mecw-b.typing{color:#7d93a6;font-style:italic}'
    + '#mecw-form{display:flex;gap:8px;padding:12px;border-top:1px solid #eaf1f7;background:#fff}'
    + '#mecw-input{flex:1;border:1px solid #cfe0ee;border-radius:999px;padding:11px 15px;font-family:inherit;font-size:14px;outline:none;color:#1f2d3d}'
    + '#mecw-input:focus{border-color:' + C1 + '}'
    + '.mecw-send{flex:none;width:42px;height:42px;border:none;border-radius:50%;background:linear-gradient(135deg,' + C1 + ',' + C2 + ');cursor:pointer;display:flex;align-items:center;justify-content:center}'
    + '.mecw-send:hover{filter:brightness(1.08)}'
    + '.mecw-disc{font-size:11px;color:#7d93a6;text-align:center;padding:0 12px 12px;background:#fff}'
    + '.mecw-disc a{color:' + C1 + ';font-weight:600;text-decoration:none}'
    + '@media(max-width:560px){#mecw-fab .mecw-lbl{display:none}#mecw-fab{padding:15px;right:16px;bottom:16px}#mecw-panel{right:0;bottom:0;width:100vw;height:100dvh;border-radius:0}}';

  function hexa(hex, a) {
    var h = hex.replace('#', ''); if (h.length === 3) h = h.replace(/(.)/g, '$1$1');
    var r = parseInt(h.substr(0, 2), 16), g = parseInt(h.substr(2, 2), 16), b = parseInt(h.substr(4, 2), 16);
    return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
  }
  function esc(t) { return t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function fmt(t) { return esc(t).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>'); }
  function el(id) { return document.getElementById(id); }

  function build() {
    var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
    var root = document.createElement('div'); root.id = 'mecw-root'; root.setAttribute('aria-live', 'polite');
    root.innerHTML =
        '<button id="mecw-fab" type="button" aria-label="Ouvrir l\'assistant">'
      +   '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z"/></svg>'
      +   '<span class="mecw-lbl">' + esc(LABEL) + '</span>'
      + '</button>'
      + '<div id="mecw-panel" role="dialog" aria-label="' + esc(NAME) + '">'
      +   '<div class="mecw-head"><div><b>' + esc(NAME) + '</b><span>' + esc(SUB) + '</span></div>'
      +     '<button type="button" class="mecw-x" aria-label="Fermer">&times;</button></div>'
      +   '<div id="mecw-msgs"></div>'
      +   '<form id="mecw-form"><input id="mecw-input" type="text" autocomplete="off" placeholder="Écrivez votre question…">'
      +     '<button type="submit" class="mecw-send" aria-label="Envoyer"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7Z"/></svg></button></form>'
      +   '<div class="mecw-disc">Informations générales — ne remplace pas une consultation. Urgence : <a href="' + TEL + '">' + esc(PHONE) + '</a>.</div>'
      + '</div>';
    document.body.appendChild(root);

    el('mecw-fab').addEventListener('click', toggle);
    root.querySelector('.mecw-x').addEventListener('click', toggle);
    el('mecw-form').addEventListener('submit', send);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { var r = el('mecw-root'); if (r && r.classList.contains('open')) toggle(); } });
  }

  function toggle() {
    var r = el('mecw-root'); r.classList.toggle('open');
    if (r.classList.contains('open')) {
      if (!started) { started = true; add(INTRO, 'bot'); }
      setTimeout(function () { el('mecw-input').focus(); }, 100);
    }
  }
  function add(txt, cls) {
    var d = document.createElement('div'); d.className = 'mecw-b ' + cls; d.innerHTML = fmt(txt);
    var m = el('mecw-msgs'); m.appendChild(d); m.scrollTop = 1e9; return d;
  }
  function send(e) {
    e.preventDefault(); if (busy) return false;
    var i = el('mecw-input'), q = i.value.trim(); if (!q) return false;
    i.value = ''; add(q, 'me'); hist.push({ role: 'user', content: q }); busy = true;
    var t = add('…', 'bot typing');
    fetch(API, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ client: CLIENT, messages: hist }) })
      .then(function (r) { return r.json(); })
      .then(function (d) {
        t.remove();
        var rep = (d && d.reply) ? d.reply : "Désolé, je n'ai pas pu répondre. Réessayez, ou appelez le " + PHONE + ".";
        rep = rep.replace(/\[\[RAPPEL\]\]/g, '').trim();
        add(rep, 'bot'); hist.push({ role: 'assistant', content: rep }); busy = false;
      })
      .catch(function () { t.remove(); add('Une erreur est survenue. Réessayez, ou appelez le ' + PHONE + '.', 'bot'); busy = false; });
    return false;
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build); else build();
})();
