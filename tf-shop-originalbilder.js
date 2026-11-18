/* Tattoo Fashion – Originalbilder aus dem bestehenden WooCommerce-Shop.
   Die Grafiken werden NICHT von GitHub ausgeliefert, sondern nur im Browser
   vom alten Shop geladen. Falls die öffentliche Shop-Schnittstelle blockiert
   oder geändert wird, bleiben die bisherigen Platzhalter erhalten. */
(() => {
  'use strict';
  const cards = Array.from(document.querySelectorAll('.tf-product[data-name]'));
  if (!cards.length) return;

  const base = 'https://tattoo-fashion-online.de';
  const endpoints = [
    base + '/wp-json/wc/store/v1/products?per_page=100',
    base + '/?rest_route=%2Fwc%2Fstore%2Fv1%2Fproducts&per_page=100'
  ];

  const normalize = value => String(value || '')
    .toLocaleLowerCase('de-DE')
    .normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
    .replace(/&amp;/g, '&').replace(/[^\p{L}\p{N}]+/gu, ' ').trim();

  function bestMatch(name, products) {
    const key = normalize(name);
    const exact = products.find(p => normalize(p.name) === key);
    if (exact) return exact;
    // Use only conservative aliases, not loose fuzzy matches to avoid wrong photos.
    const alias = {
      'hoodie tattoo fashion city': 'hoodie tattoo fashion city',
      'shirt atlethic tcb': 'shirt atlethic tcb',
      'sticker aufkleber': 'sticker aufkleber'
    };
    return products.find(p => normalize(p.name) === alias[key]) || null;
  }

  const parentPhoto = card => card.querySelector('.tf-product-photo');
  function applyImage(card, product) {
    const photo = parentPhoto(card);
    if (!photo) return false;
    const candidates = Array.isArray(product.images) ? product.images : [];
    const image = candidates.find(item => item && (item.thumbnail || item.src));
    if (!image) return false;
    const url = image.thumbnail || image.src;
    if (!/^https:\/\//i.test(url)) return false;
    const el = document.createElement('img');
    el.className = 'tf-original-product-img';
    el.loading = 'lazy';
    el.decoding = 'async';
    el.alt = (document.documentElement.lang === 'en' ? 'Original product photo: ' : document.documentElement.lang === 'da' ? 'Originalt produktfoto: ' : 'Original-Produktbild: ') + (product.name || card.getAttribute('data-name'));
    el.src = url;
    el.addEventListener('load', () => {
      photo.classList.add('tf-original-photo-loaded');
      card.dataset.originalImage = 'ja';
    }, { once: true });
    el.addEventListener('error', () => {
      el.remove();
      card.dataset.originalImage = 'nicht-ladbar';
    }, { once: true });
    photo.prepend(el);
    return true;
  }

  async function getProducts(url) {
    const response = await fetch(url, {mode:'cors', cache:'no-store'});
    if (!response.ok) throw new Error('HTTP ' + response.status);
    const data = await response.json();
    return Array.isArray(data) ? data : (Array.isArray(data.products) ? data.products : []);
  }

  (async () => {
    let products = [];
    for (const url of endpoints) {
      try {
        products = await getProducts(url);
        if (products.length) break;
      } catch (error) {
        console.info('[Tattoo Fashion Shop] Bildquelle nicht erreichbar:', error.message);
      }
    }
    if (!products.length) {
      console.warn('[Tattoo Fashion Shop] Die Originalbilder konnten nicht geladen werden (evtl. CORS oder Schnittstelle deaktiviert).');
      return;
    }
    let matched = 0;
    for (const card of cards) {
      const product = bestMatch(card.dataset.name, products);
      if (product && applyImage(card, product)) matched++;
    }
    console.info('[Tattoo Fashion Shop] Originalbilder zugeordnet:', matched, 'von', cards.length);
  })();
})();
