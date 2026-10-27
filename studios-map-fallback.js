/* Studio-Finder: klickbare Standortliste, wenn Leaflet nicht verfügbar ist. */
(function(){
function fallback(){
 const el=document.getElementById('map');if(!el)return;
 if(window.L && el.classList.contains('leaflet-container')) return;
 if(el.querySelector('.tf-map-backup'))return;
 const cities=[['Hamburg','Deutschland'],['Flensburg','Deutschland'],['Augsburg','Deutschland'],['Eckernförde','Deutschland'],['Sønderborg','Dänemark'],['Herning','Dänemark'],['Skive','Dänemark'],['Malmö','Schweden']];
 const panel=document.createElement('div');panel.className='tf-map-backup';
 panel.style.cssText='min-height:410px;padding:28px;display:flex;flex-direction:column;gap:18px;justify-content:center;background:#0a0a0a;color:#eee;border:1px solid #8e713f';
 const heading=document.createElement('div');heading.textContent='Standorte auswählen';heading.style.cssText='font-size:22px;text-align:center;color:#d4b074;font-weight:700';panel.append(heading);
 const text=document.createElement('p');text.textContent='Die Kartenansicht konnte nicht geladen werden. Du kannst die Studios trotzdem auswählen.';text.style.cssText='text-align:center;font-size:14px';panel.append(text);
 const grid=document.createElement('div');grid.style.cssText='display:flex;justify-content:center;flex-wrap:wrap;gap:10px';
 for(const [name,country] of cities){const b=document.createElement('button');b.type='button';b.textContent=name+' · '+country;b.style.cssText='padding:10px 13px;color:#dfc38e;background:#141414;border:1px solid #987845;cursor:pointer;border-radius:3px';b.addEventListener('click',()=>{const s=document.getElementById('search');if(s){s.value=name;s.dispatchEvent(new Event('input',{bubbles:true}));document.getElementById('cards')?.scrollIntoView({behavior:'smooth'});}});grid.append(b);}panel.append(grid);el.replaceChildren(panel);
 const note=document.getElementById('map-fallback');if(note)note.hidden=true;
}
window.addEventListener('load',()=>{if(!window.L)fallback();else{setTimeout(()=>{const el=document.getElementById('map');if(el&&!el.classList.contains('leaflet-container'))fallback();},1200);}});
})();
