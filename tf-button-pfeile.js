/* Ersetzt Unicode- und Emoji-Pfeile in Aktionsbuttons durch einfarbige SVG-Pfeile. */
(function () {
 function update() {
  var selector = 'a.btn,button.btn,a.tf-film-cta,button.tf-film-cta,a.tf-header-cta,button.tf-header-cta,a.shop-buy,button.shop-buy,a[class*="-cta"],button[class*="-cta"],a[class*="cta-"],button[class*="cta-"]';
  document.querySelectorAll(selector).forEach(function(el){
   if(el.querySelector('.tf-arrow-icon') || el.closest('nav, .nav, .mobile-menu')) return;
   if(el.matches('[aria-label*="play" i], [aria-label*="video" i]')) return;
   // Alte Pfeile in eigenen <span>s entfernen, einschliesslich Emoji-Praesentationszeichen.
   Array.from(el.querySelectorAll('span,i')).forEach(function(n){
     if(/^[\s\uFE0F\u200D↗→➜➔➡➝⟶⇗↑\u2190-\u21FF]+$/.test(n.textContent||'')) n.remove();
   });
   Array.from(el.childNodes).forEach(function(n){
     if(n.nodeType===3) n.textContent=n.textContent.replace(/[\s]*[↗→➜➔➡➝⟶⇗]\uFE0F?\s*$/u,'').trimEnd();
   });
   var svg=document.createElementNS('http://www.w3.org/2000/svg','svg');
   svg.setAttribute('viewBox','0 0 24 24');svg.setAttribute('aria-hidden','true');svg.setAttribute('focusable','false');svg.setAttribute('class','tf-arrow-icon');
   var path=document.createElementNS('http://www.w3.org/2000/svg','path');
   path.setAttribute('d','M5 19 19 5 M8 5h11v11');svg.appendChild(path);
   el.appendChild(svg);el.classList.add('tf-arrow-target');
  });
 }
 if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',update); else update();
})();
