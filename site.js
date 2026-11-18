const menu=document.querySelector('.menu-btn');const nav=document.querySelector('.nav');menu?.addEventListener('click',()=>{let on=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(on));menu.textContent=on?'✕ Schließen':'☰ Menü'});document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>{nav?.classList.remove('open');menu?.setAttribute('aria-expanded','false')}));if('IntersectionObserver' in window){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.09});document.querySelectorAll('.reveal').forEach(e=>io.observe(e));}else{document.querySelectorAll('.reveal').forEach(e=>e.classList.add('visible'));}

/* Auf der offiziellen Tattoo-Fashion-Studioübersicht am 18.11.2026 gelistete Standorte.
   Marker sind ungefähre Stadtmittelpunkte, keine verifizierten Studioadressen. */
if (document.getElementById('cards')) {
  const studios = [
  {
    "city": "Flensburg",
    "country": "Deutschland",
    "lat": 54.7938,
    "lon": 9.4469,
    "url": "https://tattoo-fashion-online.de/flensburg"
  },
  {
    "city": "Sønderborg",
    "country": "Dänemark",
    "lat": 54.9093,
    "lon": 9.7923,
    "url": "https://tattoo-fashion-online.de/sonderborg"
  },
  {
    "city": "Aarhus",
    "country": "Dänemark",
    "lat": 56.1629,
    "lon": 10.2039,
    "url": "https://tattoo-fashion-online.de/aarhus"
  },
  {
    "city": "Augsburg",
    "country": "Deutschland",
    "lat": 48.3705,
    "lon": 10.8978,
    "url": "https://tattoo-fashion-online.de/augsburg"
  },
  {
    "city": "Bremerhaven",
    "country": "Deutschland",
    "lat": 53.5396,
    "lon": 8.5809,
    "url": "https://tattoo-fashion-online.de/bremerhaven"
  },
  {
    "city": "Kopenhagen",
    "country": "Dänemark",
    "lat": 55.6761,
    "lon": 12.5683,
    "url": "https://tattoo-fashion-online.de/copenhagen"
  },
  {
    "city": "Eckernförde",
    "country": "Deutschland",
    "lat": 54.4717,
    "lon": 9.838,
    "url": "https://tattoo-fashion-online.de/eckernfoerde-de"
  },
  {
    "city": "Hamburg",
    "country": "Deutschland",
    "lat": 53.5511,
    "lon": 9.9937,
    "url": "https://tattoo-fashion-online.de/hamburg-hafencity"
  },
  {
    "city": "Haderslev",
    "country": "Dänemark",
    "lat": 55.2494,
    "lon": 9.4871,
    "url": "https://tattoo-fashion-online.de/haderslev"
  },
  {
    "city": "Heide",
    "country": "Deutschland",
    "lat": 54.195,
    "lon": 9.101,
    "url": "https://tattoo-fashion-online.de/heide"
  },
  {
    "city": "Helsingborg",
    "country": "Schweden",
    "lat": 56.0465,
    "lon": 12.6945,
    "url": "https://tattoo-fashion-online.de/helsingborg"
  },
  {
    "city": "Herning",
    "country": "Dänemark",
    "lat": 56.1386,
    "lon": 8.9745,
    "url": "https://tattoo-fashion-online.de/herning"
  },
  {
    "city": "Hobro",
    "country": "Dänemark",
    "lat": 56.6431,
    "lon": 9.7903,
    "url": "https://tattoo-fashion-online.de/kolding"
  },
  {
    "city": "Holzminden",
    "country": "Deutschland",
    "lat": 51.827,
    "lon": 9.446,
    "url": "https://tattoo-fashion-online.de/holzminden"
  },
  {
    "city": "Horsens",
    "country": "Dänemark",
    "lat": 55.8607,
    "lon": 9.8503,
    "url": "https://tattoo-fashion-online.de/esbjerg"
  },
  {
    "city": "Husum",
    "country": "Deutschland",
    "lat": 54.485,
    "lon": 9.051,
    "url": "https://tattoo-fashion-online.de/husum-de"
  },
  {
    "city": "Hadsten",
    "country": "Dänemark",
    "lat": 56.328,
    "lon": 10.05,
    "url": "https://tattoo-fashion-online.de/hadsten"
  },
  {
    "city": "Itzehoe",
    "country": "Deutschland",
    "lat": 53.925,
    "lon": 9.515,
    "url": "https://tattoo-fashion-online.de/itzehoe"
  },
  {
    "city": "Landshut",
    "country": "Deutschland",
    "lat": 48.5442,
    "lon": 12.1469,
    "url": "https://tattoo-fashion-online.de/landshut-de"
  },
  {
    "city": "München",
    "country": "Deutschland",
    "lat": 48.1351,
    "lon": 11.582,
    "url": "https://tattoo-fashion-online.de/aabenraa"
  },
  {
    "city": "Neukirchen am Großvenediger",
    "country": "Österreich",
    "lat": 47.251,
    "lon": 12.273,
    "url": "https://tattoo-fashion-online.de/neukrichen-at"
  },
  {
    "city": "Osnabrück",
    "country": "Deutschland",
    "lat": 52.2799,
    "lon": 8.0472,
    "url": "https://tattoo-fashion-online.de/osnabrueck-de"
  },
  {
    "city": "Odense",
    "country": "Dänemark",
    "lat": 55.4038,
    "lon": 10.4024,
    "url": "https://tattoo-fashion-online.de/odense"
  },
  {
    "city": "Palma de Mallorca",
    "country": "Spanien",
    "lat": 39.5696,
    "lon": 2.6502,
    "url": "https://tattoo-fashion-online.de/palma-city-esp"
  },
  {
    "city": "Puerto Banús",
    "country": "Spanien",
    "lat": 36.4893,
    "lon": -4.955,
    "url": "https://tattoo-fashion-online.de/puerto-banus-es"
  },
  {
    "city": "Rødovre",
    "country": "Dänemark",
    "lat": 55.683,
    "lon": 12.453,
    "url": "https://tattoo-fashion-online.de/rodovre"
  },
  {
    "city": "Schleswig",
    "country": "Deutschland",
    "lat": 54.5214,
    "lon": 9.558,
    "url": "https://tattoo-fashion-online.de/schleswig-de"
  },
  {
    "city": "Skive",
    "country": "Dänemark",
    "lat": 56.5667,
    "lon": 9.0271,
    "url": "https://tattoo-fashion-online.de/skive"
  },
  {
    "city": "Vejle",
    "country": "Dänemark",
    "lat": 55.7093,
    "lon": 9.5357,
    "url": "https://tattoo-fashion-online.de/vejle"
  },
  {
    "city": "Viborg",
    "country": "Dänemark",
    "lat": 56.4532,
    "lon": 9.402,
    "url": "https://tattoo-fashion-online.de/viborg"
  }
];
  window.TF_STUDIOS = studios;
  const cards = document.getElementById('cards');
  const count = document.getElementById('count');
  const search = document.getElementById('search');
  let selectedCountry = 'Alle';
  let query = '';
  let selectedCity = null;
  let map = null;
  const markers = [];
  const normalized = value => String(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('de');
  const arrow = '<span class="tf-arrow-icon" aria-hidden="true"></span>';
  const filtered = () => studios.filter(s =>
    (selectedCountry === 'Alle' || s.country === selectedCountry) &&
    normalized(`${s.city} ${s.country}`).includes(normalized(query))
  );

  function showCity(city) {
    selectedCity = city;
    render();
    const studio = studios.find(s => s.city === city);
    if (studio && map) {
      map.flyTo([studio.lat, studio.lon], Math.max(map.getZoom(), 8), {animate:true,duration:.8});
      const matching = markers.find(m => m.city === city);
      if (matching) matching.marker.openPopup();
    }
    cards.querySelector('.studio-card.selected')?.scrollIntoView({behavior:'smooth',block:'nearest'});
  }

  function render() {
    const items = filtered();
    count.textContent = `${items.length} von ${studios.length} gelisteten Standorten`;
    cards.replaceChildren();
    items.forEach((s, i) => {
      const card = document.createElement('article');
      card.className = 'studio-card' + (selectedCity === s.city ? ' selected' : '');
      card.style.setProperty('--pos', `${18 + i * 9}%`);
      const illustration = document.createElement('div');
      illustration.className = 'card-image';
      illustration.setAttribute('role','img');
      illustration.setAttribute('aria-label','Dekoratives Tattoo-Studio-Motiv, kein Originalfoto des Standortes');
      const body = document.createElement('div');
      body.className = 'card-body';
      const title = document.createElement('h3');
      title.textContent = s.city;
      const country = document.createElement('p');
      country.textContent = s.country;
      const links = document.createElement('div');
      links.className = 'card-links';
      const button = document.createElement('button');
      button.type = 'button';
      button.innerHTML = 'Auf Karte zeigen ' + arrow;
      button.addEventListener('click', () => showCity(s.city));
      const link = document.createElement('a');
      link.href = s.url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.innerHTML = 'Studio-Details ' + arrow;
      link.setAttribute('aria-label', `Original-Studioseite für ${s.city} öffnen`);
      links.append(button, link);
      body.append(title,country,links);
      card.append(illustration,body);
      cards.append(card);
    });
    if (!items.length) {
      const empty = document.createElement('div');
      empty.className = 'empty';
      empty.textContent = 'Keine Standorte gefunden. Bitte Suchbegriff oder Länderfilter ändern.';
      cards.append(empty);
    }
    markers.forEach(({marker,city}) => {
      if(!map)return;
      const visible = items.some(s => s.city === city);
      if(visible && !map.hasLayer(marker)) marker.addTo(map);
      if(!visible && map.hasLayer(marker)) map.removeLayer(marker);
      marker.getElement()?.querySelector('.gold-pin')?.classList.toggle('selected',selectedCity===city);
    });
  }

  document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => {
    selectedCountry = button.dataset.country;
    selectedCity = null;
    document.querySelectorAll('.filter').forEach(other => {
      const selected = other === button;
      other.classList.toggle('active',selected);
      other.setAttribute('aria-pressed', String(selected));
    });
    render();
    if(map) {
      const visible = filtered();
      if(visible.length) map.flyToBounds(visible.map(s=>[s.lat,s.lon]),{padding:[35,35],maxZoom:8,duration:.8});
    }
  }));
  search.addEventListener('input', event => {
    query = event.target.value.trim();
    selectedCity = null;
    render();
  });

  if(typeof L !== 'undefined') {
    map = L.map('map',{scrollWheelZoom:false,zoomControl:true}).setView([51,9],5);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{
      maxZoom:19,
      attribution:'&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap contributors</a>'
    }).addTo(map);
    studios.forEach(s => {
      const icon = L.divIcon({className:'',html:'<div class="gold-pin"></div>',iconSize:[15,15],iconAnchor:[7,7]});
      const marker = L.marker([s.lat,s.lon],{icon,title:s.city}).addTo(map);
      const popup = document.createElement('div');
      const label = document.createElement('strong');
      label.textContent = s.city;
      label.style.color = '#9F7A34';
      const subtitle = document.createElement('div');
      subtitle.textContent = `${s.country} · ungefährer Stadtbereich`;
      const link = document.createElement('a');
      link.href = s.url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = 'Studio-Details';
      popup.append(label,subtitle,link);
      marker.bindPopup(popup);
      marker.on('click', () => {
        selectedCity = s.city;
        render();
        cards.querySelector('.studio-card.selected')?.scrollIntoView({behavior:'smooth',block:'nearest'});
      });
      markers.push({marker,city:s.city});
    });
    map.fitBounds(studios.map(s=>[s.lat,s.lon]),{padding:[30,30],maxZoom:6});
  } else {
    const fallback = document.getElementById('map-fallback');
    if(fallback) fallback.hidden = false;
  }
  render();
}
