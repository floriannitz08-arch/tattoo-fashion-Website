/* Tattoo Fashion: GitHub-Pages-kompatibles Kontaktformular.
 * Erstellt einen E-Mail-ENTWURF. Kein Versand und kein Server-Upload. */
(function () {
  'use strict';
  const form = document.querySelector('form.tf-mail-draft');
  if (!form) return;
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const name = form.elements.namedItem('name').value.trim();
    const email = form.elements.namedItem('email').value.trim();
    const topic = form.elements.namedItem('topic').value.trim();
    const message = form.elements.namedItem('message').value.trim();
    if (!name || !email || !topic || !message) return;
    const lang = document.documentElement.lang || 'de';
    const labels = lang === 'en'
      ? ['Name','Email','Enquiry','Message']
      : lang === 'da' ? ['Navn','E-mail','Emne','Besked']
      : ['Name','E-Mail','Anliegen','Nachricht'];
    const body = [
      labels[0] + ': ' + name,
      labels[1] + ': ' + email,
      labels[2] + ': ' + topic,
      '', labels[3] + ':', message
    ].join('\n');
    const subject = 'Tattoo Fashion – ' + topic;
    const url = 'mailto:info@fashionista-online.dk?subject='
      + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    const status = form.querySelector('.tf-form-status');
    if (status) {
      status.hidden = false;
      status.textContent = lang === 'en'
        ? 'Your email app should open now. Please send the draft there.'
        : lang === 'da'
        ? 'Dit mailprogram bør nu åbne. Husk selv at sende beskeden.'
        : 'Dein E-Mail-Programm sollte sich jetzt öffnen. Bitte sende den Entwurf dort selbst ab.';
    }
    window.location.href = url;
  });
})();
