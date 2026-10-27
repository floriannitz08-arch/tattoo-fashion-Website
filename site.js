const menu=document.querySelector('.menu-btn');const nav=document.querySelector('.nav');menu?.addEventListener('click',()=>{let on=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(on));menu.textContent=on?'✕ Schließen':'☰ Menü'});document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>{nav?.classList.remove('open');menu?.setAttribute('aria-expanded','false')}));const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.09});document.querySelectorAll('.reveal').forEach(e=>io.observe(e));
if(document.getElementById('cards')){
 const studios=[
 {city:'Hamburg',country:'Deutschland',lat:53.5511,lon:9.9937},
 {city:'Flensburg',country:'Deutschland',lat:54.7938,lon:9.4469},
 {city:'Augsburg',country:'Deutschland',lat:48.3705,lon:10.8978},
 {city:'Eckernförde',country:'Deutschland',lat:54.4717,lon:9.8380},
 {city:'Sønderborg',country:'Dänemark',lat:54.9093,lon:9.7923},
 {city:'Herning',country:'Dänemark',lat:56.1386,lon:8.9745},
 {city:'Skive',country:'Dänemark',lat:56.5667,lon:9.0271},
 {city:'Malmö',country:'Schweden',lat:55.60498,lon:13.0038}
 ];
 let selectedCountry='Alle',query='',selectedCity=null,map=null,markers=[];
 const cards=document.getElementById('cards'),count=document.getElementById('count');
 function filtered(){return studios.filter(s=>(selectedCountry==='Alle'||s.country===selectedCountry)&&s.city.toLocaleLowerCase('de').includes(query.toLocaleLowerCase('de')))}
 function pick(city){selectedCity=city;render();const studio=studios.find(s=>s.city===city);if(map&&studio){map.flyTo([studio.lat,studio.lon],8,{animate:true,duration:1.2});let mark=markers.find(x=>x.city===city);mark?.marker.openPopup()}document.getElementById('cards').scrollIntoView({behavior:'smooth',block:'nearest'})}
 function render(){let items=filtered();count.textContent=`${items.length} Studio${items.length===1?'':'s'} in dieser Auswahl`;cards.innerHTML='';items.forEach((s,i)=>{const card=document.createElement('article');card.className='studio-card'+(selectedCity===s.city?' selected':'');card.style.setProperty('--pos',`${18+i*9}%`);card.innerHTML=`<div class="card-image" role="img" aria-label="Atmosphärisches Tattoo-Studio-Designmotiv"></div><div class="card-body"><h3>${s.city}</h3><p>${s.country}</p><div class="card-links"><button type="button">Auf Karte zeigen ↗</button><a href="https://tattoo-fashion-online.de/" target="_blank" rel="noopener">Offizielle Website ↗</a></div></div>`;card.querySelector('button').addEventListener('click',()=>pick(s.city));cards.appendChild(card)});if(!items.length)cards.innerHTML='<div class="empty">Keine Standorte gefunden. Bitte anderen Suchbegriff wählen.</div>';markers.forEach(({marker,city})=>{const item=studios.find(s=>s.city===city);let visible=items.includes(item);if(map){if(visible&&!map.hasLayer(marker))marker.addTo(map);if(!visible&&map.hasLayer(marker))map.removeLayer(marker)}const el=marker.getElement();if(el)el.querySelector('.gold-pin')?.classList.toggle('selected',selectedCity===city)});}
 document.querySelectorAll('.filter').forEach(b=>b.addEventListener('click',()=>{selectedCountry=b.dataset.country;document.querySelectorAll('.filter').forEach(x=>{let a=x===b;x.classList.toggle('active',a);x.setAttribute('aria-pressed',String(a))});selectedCity=null;render();if(map){const visible=filtered();if(visible.length)map.flyToBounds(visible.map(s=>[s.lat,s.lon]),{padding:[45,45],maxZoom:7,duration:1.2});else map.flyTo([54,10],5)}}));document.getElementById('search').addEventListener('input',e=>{query=e.target.value.trim();selectedCity=null;render()});
 if(typeof L!=='undefined'){
 map=L.map('map',{scrollWheelZoom:false,zoomControl:true}).setView([54.6,10.5],5);
 L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap contributors</a>'}).addTo(map);
 studios.forEach(s=>{const icon=L.divIcon({className:'',html:'<div class="gold-pin"></div>',iconSize:[15,15],iconAnchor:[7,7]});const marker=L.marker([s.lat,s.lon],{icon,title:s.city}).addTo(map);marker.bindPopup(`<strong style="color:#efd29a">${s.city}</strong><br>${s.country}<br><a href="https://tattoo-fashion-online.de/" target="_blank">Tattoo Fashion ↗</a>`);marker.on('click',()=>{selectedCity=s.city;render();document.querySelector('.studio-card.selected')?.scrollIntoView({behavior:'smooth',block:'nearest'})});markers.push({marker,city:s.city})});
 map.fitBounds(studios.map(s=>[s.lat,s.lon]),{padding:[48,48]});
 }else{document.getElementById('map-fallback').hidden=false}
 render();
}
