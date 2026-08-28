/* ==========================================================================
   El Noh — Academic Homepage
   assets/js/main.js
   --------------------------------------------------------------------------
   1. 테마(라이트/다크) 토글
   2. 언어(EN/KO) 토글
   3. 스크롤에 따른 내비게이션 활성 표시
   4. 푸터 연도 자동 갱신
   ========================================================================== */

(function () {
  "use strict";

  var root = document.documentElement;

  /* --- localStorage가 막힌 환경(시크릿 창 등)에서도 죽지 않도록 감쌉니다 --- */
  function store(key, value) {
    try {
      if (value === undefined) return window.localStorage.getItem(key);
      window.localStorage.setItem(key, value);
    } catch (e) { /* 무시 */ }
    return null;
  }

  /* ======================================================================
     1. 테마 토글
     ====================================================================== */

  function currentTheme() {
    var set = root.getAttribute("data-theme");
    if (set === "dark" || set === "light") return set;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  var themeBtn = document.getElementById("theme-toggle");
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var next = currentTheme() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      store("theme", next);
      themeBtn.setAttribute("aria-label", next === "dark" ? "Switch to light mode" : "Switch to dark mode");
    });
  }

  /* ======================================================================
     2. 언어 토글 (EN / KO)
     ====================================================================== */

  var langBtn = document.getElementById("lang-toggle");

  function applyLang(lang) {
    root.setAttribute("data-lang", lang);
    root.setAttribute("lang", lang === "ko" ? "ko" : "en");
    store("lang", lang);

    // <title> 과 meta description 도 함께 교체
    var t = document.getElementById("page-title");
    if (t) {
      document.title = lang === "ko"
        ? (t.dataset.ko || document.title)
        : (t.dataset.en || document.title);
    }
    var d = document.querySelector('meta[name="description"]');
    if (d && d.dataset.en) {
      d.setAttribute("content", lang === "ko" ? d.dataset.ko : d.dataset.en);
    }
    if (langBtn) {
      // 버튼에는 "전환될 언어"를 표시합니다
      langBtn.textContent = lang === "ko" ? "EN" : "한국어";
      langBtn.setAttribute("aria-label", lang === "ko" ? "Switch to English" : "한국어로 보기");
    }
  }

  if (langBtn) {
    langBtn.addEventListener("click", function () {
      applyLang(root.getAttribute("data-lang") === "ko" ? "en" : "ko");
    });
  }
  applyLang(root.getAttribute("data-lang") || "en");

  /* ======================================================================
     3. 스크롤 위치에 따라 내비게이션 항목 강조
     ====================================================================== */

  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav a[href^='#']"));
  var sections = navLinks
    .map(function (a) { return document.querySelector(a.getAttribute("href")); })
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    var visible = {};
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { visible[en.target.id] = en.isIntersecting; });

      var activeId = null;
      for (var i = 0; i < sections.length; i++) {
        if (visible[sections[i].id]) { activeId = sections[i].id; break; }
      }
      navLinks.forEach(function (a) {
        a.classList.toggle("is-active", activeId !== null && a.getAttribute("href") === "#" + activeId);
      });
    }, { rootMargin: "-70px 0px -60% 0px", threshold: 0 });

    sections.forEach(function (s) { io.observe(s); });
  }

  /* ======================================================================
     4. 푸터 연도
     ====================================================================== */

  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
