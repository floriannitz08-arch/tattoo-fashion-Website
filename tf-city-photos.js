/* Tattoo Fashion: Stadtansichten für die 30 Standorte.
   Leichte Wikipedia-Thumbnails, nur auf Sicht; keine Bilder von Studios.
   Wikipedia/Wikimedia liefert die Bilddatei; der Foto-/Lizenzlink führt zur
   Commons-Dateiseite. Keine Tracking- oder Analytics-Funktion. */
(() => {
'use strict';
const wiki = {
 'Flensburg':'Flensburg', 'Sønderborg':'Sønderborg', 'Aarhus':'Aarhus',
 'Augsburg':'Augsburg', 'Bremerhaven':'Bremerhaven', 'Kopenhagen':'Copenhagen',
 'Eckernförde':'Eckernförde', 'Hamburg':'Hamburg', 'Haderslev':'Haderslev',
 'Heide':'Heide_(Holstein)', 'Helsingborg':'Helsingborg', 'Herning':'Herning',
 'Hobro':'Hobro', 'Holzminden':'Holzminden', 'Horsens':'Horsens',
 'Husum':'Husum', 'Hadsten':'Hadsten', 'Itzehoe':'Itzehoe',
 'Landshut':'Landshut', 'München':'Munich',
 'Neukirchen am Großvenediger':'Neukirchen_am_Großvenediger',
 'Osnabrück':'Osnabrück', 'Odense':'Odense',
 'Palma de Mallorca':'Palma_de_Mallorca', 'Puerto Banús':'Puerto_Banús',
 'Rødovre':'Rødovre', 'Schleswig':'Schleswig_(city)', 'Skive':'Skive',
 'Vejle':'Vejle', 'Viborg':'Viborg'
};
const language = document.documentElement.lang || 'de';
const t = (de,en,da)=>language==='en'?en:language==='da'?da:de;
const cache = new Map();
const queue = [];
const queued = new WeakSet();
let busy = 0;
const concurrency = 2;
const safe = (url)=> { try {const u=new URL(url);return u.protocol==='https:'&&(
  u.hostname==='upload.wikimedia.org'||u.hostname==='thumb.wikimedia.org');}catch{} return false; };
const filePage = (url) => {
 try {
  let path = new URL(url).pathname;
  let file = decodeURIComponent(path.split('/').pop());
  file=file.replace(/^\d+px-/,'');
  return 'https://commons.wikimedia.org/wiki/File:'+encodeURIComponent(file).replace(/%20/g,'_');
 } catch { return 'https://commons.wikimedia.org/'; }
};
async function query(city) {
 const title=wiki[city];
 if(!title) return null;
 if(!cache.has(city)) cache.set(city,(async()=>{
  // Wikipedia's page-summary thumbnail is normally a small (330px) city photo.
  // Try English first, then German for cities without suitable photo.
  for (const host of ['en.wikipedia.org','de.wikipedia.org']) {
   try {
    const url=`https://${host}/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
    const r=await fetch(url,{mode:'cors',credentials:'omit',cache:'force-cache',headers:{'Accept':'application/json'}});
    if(!r.ok) continue;
    const data=await r.json();
    const thumbnail=data?.thumbnail;
    const path=thumbnail?.source||'';
    // No coat of arms, flags, locators, maps or icons presented as a city photo.
    if(!safe(path) ||
       /(wappen|coat.of.arms|flag|locator|location.map|karte|map.of|logo|seal|svg\.png)/i.test(path)) continue;
    if((thumbnail.width||0)<180 || (thumbnail.height||0)<100) continue;
    return {src:path,credits:filePage(path)};
   }catch(e){/* preserve the readable city card on unavailable image servers */}
  }
  return null;
 })());
 return cache.get(city);
}
function removeOldCredits(image){ image.parentNode?.querySelector('.tf-city-photo-credit')?.remove(); }
async function paint(el) {
 const city=el.dataset.city;
 const result=await query(city);
 if(!el.isConnected || el.dataset.city!==city || !result) return;
 const img=new Image();
 img.className='tf-city-photo';
 img.alt=t(`Stadtansicht von ${city}`,`View of ${city}`,`Bybillede af ${city}`);
 img.loading='lazy';
 img.decoding='async';
 img.width=330;
 img.height=220;
 img.referrerPolicy='no-referrer';
 img.src=result.src;
 img.addEventListener('load',()=>{
  if(!el.isConnected) return;
  el.classList.add('tf-city-photo-loaded');
  const a=document.createElement('a');
  a.className='tf-city-photo-credit';
  a.href=result.credits;
  a.target='_blank';
  a.rel='noopener noreferrer';
  a.textContent=t('Foto & Lizenz','Photo & licence','Foto & licens');
  a.title=t('Urheber und Lizenz der Datei auf Wikimedia Commons ansehen','View author and licence on Wikimedia Commons','Se fotograf og licens på Wikimedia Commons');
  el.append(a);
 },{once:true});
 img.addEventListener('error',()=>{ img.remove(); removeOldCredits(img); },{once:true});
 el.prepend(img);
}
function drain(){ while(busy<concurrency && queue.length){
  const el=queue.shift();if(!el.isConnected)continue;
  busy++;paint(el).finally(()=>{busy--;drain();});
 }}
const observer='IntersectionObserver' in window ? new IntersectionObserver(entries=>{
 for(const e of entries)if(e.isIntersecting){observer.unobserve(e.target);if(!queued.has(e.target)){
  queued.add(e.target);queue.push(e.target);}}
 drain();
},{rootMargin:'220px 0px',threshold:0.01}):null;
window.TF_CITY_PHOTOS={observe(el){if(observer)observer.observe(el);else if(!queued.has(el)){
 queued.add(el);queue.push(el);drain();}}};
})();
