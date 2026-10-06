/* ============================================================
   ✏️  PERSONALIZÁ ACÁ
   ============================================================ */
// Fecha en que se pusieron de novios (año, mes, día). OJO: el mes va del 1 al 12.
const START = { year: 2023, month: 5, day: 6 };   // 06/05/2023 -> 6 de mayo de 2023

// Foto de ustedes: pegá acá una imagen en formato data URI (data:image/jpeg;base64,...)
// Si queda vacío, se muestra un marco con un corazón.
const PHOTO = "Fotoo.jpeg";

// Texto del sobre y de la firma
const ENVELOPE_TITLE = "Felices 3 años y 5 meses 💌";
const BRAND = "Para Josefina ♥";

// Carta (cada elemento es un párrafo)
const LETTER = [
  "Para el amor de mi vida:",
  "Si pudiera elegir un lugar seguro, sería junto a vos!.",
  "Cada mes que pasa me enamoro más de tu risa, de tu forma de ser y de todo lo que hacés sin darte cuenta que me llena el corazoncito.",
  "Mientras mas tiempo juntos pasamos, más me encantas.",
  "— Te amo por y para siempre Josefina♥"
];
/* ============================================================ */

const $ = id => document.getElementById(id);
document.body.dataset.ready = "1";
$('envTitle').textContent = ENVELOPE_TITLE;
$('brand').textContent = BRAND;

/* ---------- foto ---------- */
/* ---------- foto ---------- */
(function setPhoto() {
  const pic = $('pic');
  if (PHOTO) {
    const img = new Image();
    img.src = PHOTO; img.alt = "Nuestra foto";
    img.style.width = "100%";
    img.style.height = "100%";
    img.style.objectFit = "cover";
    img.style.display = "block";
    pic.innerHTML = '';
    pic.appendChild(img);
  } else {
    pic.innerHTML = '<div class="ph"><svg viewBox="0 0 32 29.6"><path d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"/></svg><div>Acá va nuestra foto</div></div>';
  }
})();

/* ---------- corazones flotantes ---------- */
const heartsLayer = $('hearts');
const EMOJIS = ['❤', '♥', '💖', '💕', '💗'];
let floatingOn = false;
function spawnFloating() {
  const h = document.createElement('span');
  h.className = 'fh';
  h.textContent = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
  const size = 14 + Math.random() * 26;
  h.style.left = Math.random() * 100 + 'vw';
  h.style.fontSize = size + 'px';
  h.style.color = ['#ffd1da', '#ff8fa3', '#fff', '#ff5c7a'][Math.floor(Math.random() * 4)];
  h.style.setProperty('--dx', (Math.random() * 120 - 60) + 'px');
  h.style.setProperty('--rot', (Math.random() * 80 - 40) + 'deg');
  h.style.animationDuration = (6 + Math.random() * 6) + 's';
  heartsLayer.appendChild(h);
  setTimeout(() => h.remove(), 12500);
}
function startFloating() {
  if (floatingOn) return;
  floatingOn = true;
  setInterval(spawnFloating, 450);
}
function burstAt(x, y) {
  for (let i = 0; i < 8; i++) {
    const b = document.createElement('span');
    b.className = 'burst';
    b.textContent = '♥';
    b.style.left = x + 'px'; b.style.top = y + 'px';
    b.style.color = ['#fff', '#ffd1da', '#ff5c7a'][i % 3];
    b.style.fontSize = (14 + Math.random() * 14) + 'px';
    const a = Math.random() * Math.PI * 2, d = 50 + Math.random() * 70;
    b.style.setProperty('--bx', Math.cos(a) * d + 'px');
    b.style.setProperty('--by', Math.sin(a) * d + 'px');
    heartsLayer.appendChild(b);
    setTimeout(() => b.remove(), 1300);
  }
}
document.addEventListener('pointerdown', e => {
  if ($('sceneHeart').classList.contains('gone')) burstAt(e.clientX, e.clientY);
});

/* ---------- ESCENA 1 -> 2 ---------- */
let expanded = false;
function expandHeart() {
  if (expanded) return;
  expanded = true;
  clearTimeout(autoTimer);
  $('hint').classList.add('hide');
  $('bigHeart').classList.add('expand');
  setTimeout(() => document.body.classList.add('red'), 1300);
  setTimeout(() => {
    $('sceneHeart').classList.add('gone');
    $('sceneEnvelope').classList.add('show');
    startFloating();
  }, 1900);
}
$('sceneHeart').addEventListener('click', expandHeart);
const autoTimer = setTimeout(expandHeart, 3200);

/* ---------- ESCENA 2: sobre ---------- */
$('btnOpen').addEventListener('click', openEnvelope);
$('btnNow').addEventListener('click', () => {
  $('laterMsg').classList.remove('show');
  $('envButtons').classList.remove('hide');
  openEnvelope();
});
$('btnLater').addEventListener('click', () => {
  $('envButtons').classList.add('hide');
  $('envTitle').textContent = "Te espero 💕";
  $('laterMsg').classList.add('show');
});

let opened = false;
function openEnvelope() {
  if (opened) return;
  opened = true;
  $('envButtons').classList.add('hide');
  $('envelope').classList.add('open');
  for (let i = 0; i < 14; i++) setTimeout(spawnFloating, i * 80);
  setTimeout(showCard, 2600);
}

/* ---------- ESCENA 3: carta ---------- */
function showCard() {
  $('sceneEnvelope').classList.remove('show');
  $('sceneCard').classList.add('show');
  document.body.style.overflow = 'hidden';
  typeLetter();
  tick();
  setInterval(tick, 1000);
}

function typeLetter() {
  const box = $('letter');
  box.innerHTML = '';
  let p = 0, c = 0, cur = null;
  function nextParagraph() {
    if (p >= LETTER.length) { if (cur) cur.classList.remove('caret'); return; }
    cur = document.createElement('p');
    if (p === LETTER.length - 1) cur.className = 'sign';
    cur.classList.add('caret');
    box.appendChild(cur);
    c = 0; typeChar();
  }
  function typeChar() {
    const txt = LETTER[p];
    if (c < txt.length) {
      cur.firstChild ? cur.firstChild.textContent += txt[c] : cur.insertBefore(document.createTextNode(txt[c]), cur.firstChild);
      c++;
      setTimeout(typeChar, 38);
    } else {
      cur.classList.remove('caret');
      p++;
      setTimeout(nextParagraph, 450);
    }
  }
  setTimeout(nextParagraph, 900);
}

/* ---------- contador ---------- */
const startDate = new Date(START.year, START.month - 1, START.day, 0, 0, 0);
const pad = n => String(n).padStart(2, '0');
function tick() {
  const now = new Date();
  let diff = Math.max(0, now - startDate);
  const secs = Math.floor(diff / 1000);
  const days = Math.floor(secs / 86400);
  const hours = Math.floor((secs % 86400) / 3600);
  const mins = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  $('cDays').textContent = days.toLocaleString('es-AR');
  $('cHours').textContent = pad(hours);
  $('cMins').textContent = pad(mins);
  $('cSecs').textContent = pad(s);

  let months = (now.getFullYear() - startDate.getFullYear()) * 12 + (now.getMonth() - startDate.getMonth());
  if (now.getDate() < startDate.getDate()) months--;
  const y = Math.floor(months / 12), m = months % 12;
  let txt = '';
  if (y > 0) txt += y + (y === 1 ? ' año' : ' años');
  if (y > 0 && m > 0) txt += ' y ';
  if (m > 0) txt += m + (m === 1 ? ' mes' : ' meses');
  $('months').textContent = txt ? 'Eso son ' + txt + ' juntos 💖' : '';
}