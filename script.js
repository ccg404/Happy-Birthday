/* ============================================================
   USER CONFIG — edit everything in here to make it yours
   ============================================================ */
const CONFIG = {
  partnerName: "My Love",          // her name — shows on the Home page
  yourName: "Christian",           // your name — shows as the letter signature

  homeSubtitle: "one more year of being wonderfully, completely you.",

  loveLetter:
`My dearest {partnerName},

I don't think a single page is enough to say everything I feel about you, but I wanted to try anyway.

Thank you for the way you make ordinary days feel like something worth remembering. For your patience with me, for the way you listen, and for loving me exactly as I am.

Today is about you — all of you. I hope it's as wonderful as you make every day feel for me.

Happy birthday. I love you more than I know how to put into words, but I'll keep trying, for as long as you'll let me.`,

  // Flip cards on the "Why I Love You" page — edit the text, add or remove entries freely
  reasons: [
    { front: "Your laugh", back: "It was the first thing I fell for — I could listen to it every day and never get tired of it." },
    { front: "How you listen", back: "You make me feel truly heard, like every word I say actually matters to you." },
    { front: "Lazy mornings", back: "Even doing nothing feels like something special when it's with you." },
    { front: "Your kindness", back: "The way you care for everyone around you, without ever asking for anything back." },
    { front: "You believe in me", back: "On the days I doubt myself, you're the one who reminds me what I'm capable of." },
    { front: "Our inside jokes", back: "No one else will ever get them, and that's exactly what makes them ours." },
    { front: "Your strength", back: "I've watched you handle hard days with so much grace — it amazes me every time." },
    { front: "The little things", back: "Every small thing you do for me, I notice, and I love you more for it." },
    { front: "Simply, you", back: "Out of everyone in the world, I still can't believe I get to love you." },
    { front: "Your patience with me", back: "Even on my worst days, you never make me feel like too much to handle." },
    { front: "The way you say my name", back: "It sounds different coming from you — softer, like it actually means something." },
    { front: "Growing with you", back: "I love who I am becoming, and I know it's because you're right here beside me." }
  ],

  musicCaption: "sung a little off-key, just for you. Please pag earphones haha", 

  // Put your recorded voice file next to this HTML file and set the filename here.
  // Supported: mp3, m4a, wav, ogg. Example: "our-song.mp3"
  audioSrc: "song.mp3"
};

/* ============================================================
   Rendering — no need to touch anything below unless you want to
   ============================================================ */
function fillTemplate(str){
  return str.replaceAll("{partnerName}", CONFIG.partnerName).replaceAll("{yourName}", CONFIG.yourName);
}

document.getElementById('home-title').textContent = `Happy Birthday, ${CONFIG.partnerName}`;
document.getElementById('home-sub').textContent = CONFIG.homeSubtitle;
document.getElementById('letter-body').textContent = fillTemplate(CONFIG.loveLetter);
document.getElementById('letter-signature').textContent = `— always yours, ${CONFIG.yourName}`;
document.getElementById('music-caption').textContent = CONFIG.musicCaption;
document.getElementById('fallback-filename').textContent = CONFIG.audioSrc;

// reason cards
const grid = document.getElementById('card-grid');
CONFIG.reasons.forEach((r, i) => {
  const card = document.createElement('div');
  card.className = 'flip-card';
  card.innerHTML = `
    <div class="flip-inner">
      <div class="flip-face flip-front"><span>${r.front}</span></div>
      <div class="flip-face flip-back">${r.back}</div>
    </div>`;
  card.addEventListener('click', () => card.classList.toggle('flipped'));
  card.tabIndex = 0;
  card.setAttribute('role', 'button');
  card.addEventListener('keydown', e => { if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); card.classList.toggle('flipped'); }});
  grid.appendChild(card);
});

// envelope intro
const envelope = document.getElementById('envelope');
const tapHint = document.getElementById('tap-hint');
const enterBtn = document.getElementById('enter-btn');
const envScreen = document.getElementById('envelope-screen');
const app = document.getElementById('app');

function openEnvelope(){
  if(envelope.classList.contains('open')) return;
  envelope.classList.add('open');
  tapHint.style.opacity = '0';
  setTimeout(() => enterBtn.classList.add('show'), 500);
}
envelope.addEventListener('click', openEnvelope);
envelope.addEventListener('keydown', e => { if(e.key==='Enter' || e.key===' '){ e.preventDefault(); openEnvelope(); }});

enterBtn.addEventListener('click', () => {
  envScreen.classList.add('hidden');
  app.classList.add('show');
});

// tab navigation
const tabs = document.querySelectorAll('nav.tabs button');
tabs.forEach(btn => {
  btn.addEventListener('click', () => {
    tabs.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('page-' + btn.dataset.page).classList.add('active');
  });
});

// music player
const audio = document.getElementById('audio');
const playBtn = document.getElementById('play-btn');
const vinyl = document.getElementById('vinyl');
const seek = document.getElementById('seek');
const curTime = document.getElementById('cur-time');
const durTime = document.getElementById('dur-time');
const fallback = document.getElementById('audio-fallback');

audio.src = CONFIG.audioSrc;

function fmt(t){
  if(!isFinite(t)) return '0:00';
  const m = Math.floor(t/60), s = Math.floor(t%60);
  return `${m}:${s.toString().padStart(2,'0')}`;
}

audio.addEventListener('loadedmetadata', () => {
  durTime.textContent = fmt(audio.duration);
  seek.max = Math.floor(audio.duration);
});
audio.addEventListener('timeupdate', () => {
  curTime.textContent = fmt(audio.currentTime);
  seek.value = Math.floor(audio.currentTime);
});
audio.addEventListener('error', () => { fallback.classList.add('show'); playBtn.disabled = true; });
audio.addEventListener('ended', () => { playBtn.textContent = '▶'; vinyl.classList.remove('playing'); });

playBtn.addEventListener('click', () => {
  if(audio.paused){
    audio.play().then(() => {
      playBtn.textContent = '❚❚';
      vinyl.classList.add('playing');
    }).catch(() => fallback.classList.add('show'));
  } else {
    audio.pause();
    playBtn.textContent = '▶';
    vinyl.classList.remove('playing');
  }
});
seek.addEventListener('input', () => { audio.currentTime = seek.value; });

// gentle falling petals
const petalField = document.getElementById('petals');
const petalChars = ['❀','✿','❁'];
for(let i=0;i<14;i++){
  const p = document.createElement('span');
  p.className = 'petal';
  p.textContent = petalChars[i % petalChars.length];
  p.style.left = Math.random()*100 + 'vw';
  p.style.animationDuration = (12 + Math.random()*10) + 's';
  p.style.animationDelay = (Math.random()*12) + 's';
  p.style.fontSize = (10 + Math.random()*10) + 'px';
  petalField.appendChild(p);
}