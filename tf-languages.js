/* Shared language support. Static text is translated in each HTML file. */
window.tfLanguage = document.documentElement.lang || 'de';
window.tfLocale = function(de,en,da){ return window.tfLanguage==='en'?en:window.tfLanguage==='da'?da:de; };
