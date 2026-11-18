/* Tastaturbedienbare Standortauswahl, falls Leaflet blockiert wird. */
(function () {
  function activate() {
    const el = document.getElementById('map');
    if (!el || (window.L && el.classList.contains('leaflet-container')) || el.querySelector('.tf-map-backup')) return;
    const studios = window.TF_STUDIOS || [];
    const panel = document.createElement('div');
    panel.className = 'tf-map-backup';
    panel.style.cssText = 'min-height:410px;padding:22px;display:flex;flex-direction:column;gap:18px;justify-content:center;background:#050505;color:#eee;border:1px solid #9F7A34';
    const title = document.createElement('h3');
    title.textContent = 'Standorte auswählen';
    title.style.cssText = 'margin:0;text-align:center;color:#9F7A34;font-size:22px';
    const info = document.createElement('p');
    info.textContent = 'Die Karte konnte nicht geladen werden. Alle gelisteten Städte sind trotzdem unten auswählbar.';
    info.style.cssText = 'text-align:center;font-size:14px';
    const grid = document.createElement('div');
    grid.style.cssText = 'display:flex;justify-content:center;flex-wrap:wrap;gap:8px';
    for(const studio of studios) {
      const b=document.createElement('button');
      b.type='button';
      b.textContent=studio.city;
      b.style.cssText='padding:9px;color:#9F7A34;background:#050505;border:1px solid #9F7A34;cursor:pointer';
      b.addEventListener('click',()=>{
        const input=document.getElementById('search');
        const allButton=document.querySelector('.filter[data-country="Alle"]');
        if(allButton)allButton.click();
        if(input){input.value=studio.city;input.dispatchEvent(new Event('input',{bubbles:true}));}
        document.getElementById('cards')?.scrollIntoView({behavior:'smooth',block:'nearest'});
      });
      grid.append(b);
    }
    panel.append(title,info,grid);
    el.replaceChildren(panel);
    const note=document.getElementById('map-fallback');
    if(note) note.hidden=true;
  }
  window.addEventListener('load',()=>{
    if (!window.L) activate();
    else window.setTimeout(()=>{
      const el=document.getElementById('map');
      if(el && !el.classList.contains('leaflet-container'))activate();
    },1200);
  });
})();
