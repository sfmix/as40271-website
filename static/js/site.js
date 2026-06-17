/*
 * site.js — small, dependency-free, CSP-friendly (loaded from 'self').
 *
 * 1. Language negotiation: the GitHub Pages stand-in for a server reading
 *    Accept-Language. Runs in <head> before paint. Reads the per-page
 *    translation map + current language from <html data-lang data-translations>.
 *    On first visit it matches navigator.languages against the languages we
 *    publish and redirects to the best match; an explicit pick (localStorage)
 *    always wins, a session flag prevents loops, and novelty locales are never
 *    auto-selected.
 * 2. DOM handlers (after DOMContentLoaded): remember an explicit language pick,
 *    and drive the mobile nav toggle (replaces an inline onclick for CSP).
 */
(function () {
  try {
    var html = document.documentElement;
    var current = html.getAttribute("data-lang") || "en";
    var translations = {};
    try { translations = JSON.parse(html.getAttribute("data-translations") || "{}"); } catch (e) {}
    var autoLangs = ["en", "es", "de"]; // never auto-pick novelty locales

    var stored = null;
    try { stored = localStorage.getItem("as40271-lang"); } catch (e) {}

    var pref = stored;
    if (!pref) {
      var browser = navigator.languages || [navigator.language || "en"];
      for (var i = 0; i < browser.length && !pref; i++) {
        var base = String(browser[i]).toLowerCase().split("-")[0];
        if (autoLangs.indexOf(base) !== -1) pref = base;
      }
      pref = pref || "en";
    }

    if (pref && pref !== current && translations[pref]) {
      try {
        if (!sessionStorage.getItem("as40271-lang-redirected")) {
          sessionStorage.setItem("as40271-lang-redirected", "1");
          location.replace(translations[pref]);
          return; // navigating away
        }
      } catch (e) {}
    }
  } catch (e) { /* never let i18n break the page */ }

  document.addEventListener("DOMContentLoaded", function () {
    // Remember an explicit language choice so the redirect respects it.
    var opts = document.querySelectorAll(".lang-option");
    for (var i = 0; i < opts.length; i++) {
      opts[i].addEventListener("click", function () {
        try {
          localStorage.setItem("as40271-lang", this.getAttribute("data-lang"));
          sessionStorage.setItem("as40271-lang-redirected", "1");
        } catch (e) {}
      });
    }
    // Mobile nav toggle (CSP-safe replacement for the old inline onclick).
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.querySelector(".site-nav");
    if (toggle && nav) {
      toggle.addEventListener("click", function () {
        var open = nav.classList.toggle("open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
    }
  });
})();
