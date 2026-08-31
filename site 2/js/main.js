/* Dear Black Boy — site behavior: FAQ accordion, donate tiers, inquiry form. */
(function () {
  'use strict';

  /* --- FAQ accordion (one open at a time) ------------------------------- */
  var faq = document.getElementById('faq');
  if (faq) {
    faq.addEventListener('click', function (e) {
      var btn = e.target.closest('.faq__q');
      if (!btn) return;
      var item = btn.parentElement;
      var wasOpen = item.classList.contains('is-open');

      faq.querySelectorAll('.faq__item').forEach(function (el) {
        el.classList.remove('is-open');
        el.querySelector('.faq__q').setAttribute('aria-expanded', 'false');
        el.querySelector('.faq__sign').textContent = '+';
      });

      if (!wasOpen) {
        item.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
        item.querySelector('.faq__sign').textContent = '–';
      }
    });
  }

  /* --- Donate tier selection -------------------------------------------- */
  var tiers = document.getElementById('tiers');
  var donateCta = document.getElementById('donate-cta');
  if (tiers && donateCta) {
    tiers.addEventListener('click', function (e) {
      var btn = e.target.closest('.tier');
      if (!btn) return;
      tiers.querySelectorAll('.tier').forEach(function (el) {
        el.setAttribute('aria-pressed', String(el === btn));
      });
      donateCta.textContent = 'Donate ' + btn.dataset.amount;
    });
  }

  /* --- Inquiry form ------------------------------------------------------
     Replace this handler with your host's form action (GoDaddy form block,
     Formspree, etc.). Until then it confirms in place without navigating.  */
  var form = document.getElementById('inquiry-form');
  var submit = document.getElementById('inquiry-submit');
  if (form && submit) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      submit.textContent = "Thank you — we'll be in touch";
      submit.disabled = true;
    });
  }
})();
