/* Dear Black Boy — site behavior: FAQ accordion, donate tiers, inquiry form. */
(function () {
  'use strict';

  /* ======================================================================
     STRIPE PAYMENT LINKS  —  paste your four URLs here and nothing else.

     Create them at: dashboard.stripe.com → Payment links → + New
       · Product: "Donation" (or "Sponsor a scholar")
       · Price: one-time, fixed amount ($50 / $250 / $1,000)
       · Turn ON "Let customers adjust quantity" if you want $50 × 4, etc.
       · Under "After payment", set the redirect back to
         https://dearblackboyaffirmations.org
     Copy each generated URL (looks like https://buy.stripe.com/xxxxxxxx)
     into the matching slot below. Leave a slot empty and that button
     falls back to the contact form.
     ====================================================================== */
  var STRIPE_LINKS = {
    '$50':     'https://buy.stripe.com/28EaEW1G4gIc2RZgBc6g800',
    '$250':    'https://buy.stripe.com/8x26oG98w0Je1NV84G6g801',
    '$1,000':  'https://buy.stripe.com/3cI3cu1G43Vqcsz70C6g802',
    corporate: ''   // recurring / invoice-style link for corporate giving
  };
  /* ===================================================================== */

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

  /* --- Donate tiers → Stripe -------------------------------------------- */
  var tiers = document.getElementById('tiers');
  var donateCta = document.getElementById('donate-cta');

  function applyTier(amount) {
    if (!donateCta) return;
    var url = STRIPE_LINKS[amount];
    donateCta.textContent = 'Donate ' + amount;
    if (url) {
      donateCta.href = url;
      donateCta.target = '_blank';
      donateCta.rel = 'noopener';
    } else {
      donateCta.href = '#contact';
      donateCta.removeAttribute('target');
    }
  }

  if (tiers && donateCta) {
    tiers.addEventListener('click', function (e) {
      var btn = e.target.closest('.tier');
      if (!btn) return;
      tiers.querySelectorAll('.tier').forEach(function (el) {
        el.setAttribute('aria-pressed', String(el === btn));
      });
      applyTier(btn.dataset.amount);
    });

    var preselected = tiers.querySelector('.tier[aria-pressed="true"]');
    if (preselected) applyTier(preselected.dataset.amount);
  }

  var corporateCta = document.getElementById('corporate-cta');
  if (corporateCta) {
    if (STRIPE_LINKS.corporate) {
      corporateCta.href = STRIPE_LINKS.corporate;
      corporateCta.target = '_blank';
      corporateCta.rel = 'noopener';
    } else {
      /* No corporate Stripe link: send them to the form with "Corporate
         giving" preselected, so you can reply with a custom payment link. */
      corporateCta.addEventListener('click', function () {
        var select = document.getElementById('package-select');
        if (!select) return;
        select.value = 'Corporate Giving / Sponsorship';
      });
    }
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
