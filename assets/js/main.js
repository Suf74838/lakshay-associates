/* ==========================================================================
   LAKSHAY - SITE BEHAVIOUR
   Plain JavaScript, no libraries. Editable values live in config.js.
   ========================================================================== */
(function () {
  "use strict";

  var CFG = window.LAKSHAY || {};
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---------------------------------------------------------------- LINKS */
  function buildLinks() {
    var wa = "https://wa.me/" + (CFG.WHATSAPP_NUMBER || "") +
             "?text=" + encodeURIComponent(CFG.WHATSAPP_MESSAGE || "");
    $$("[data-wa]").forEach(function (el) {
      el.setAttribute("href", wa);
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener");
    });
    $$("[data-tel]").forEach(function (el) {
      var key = el.getAttribute("data-tel");
      var num = key === "2" ? CFG.PHONE_SECONDARY : CFG.PHONE_PRIMARY;
      el.setAttribute("href", "tel:+" + num);
    });
    $$("[data-mail]").forEach(function (el) {
      el.setAttribute("href", "mailto:" + CFG.EMAIL);
    });
    $$("[data-year]").forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }

  /* ---------------------------------------------------------------- INTRO
     Logo opens centre screen, then travels up and docks into the header.  */
  function intro() {
    var overlay = $("#intro");
    if (!overlay) { return; }

    var seen = false;
    try { seen = sessionStorage.getItem("lk_intro") === "1"; } catch (e) { seen = false; }

    if (!CFG.INTRO_ENABLED || reduced || (CFG.INTRO_SHOW_ONCE && seen)) {
      overlay.parentNode.removeChild(overlay);
      document.body.classList.remove("is-locked");
      return;
    }
    try { sessionStorage.setItem("lk_intro", "1"); } catch (e) {}

    document.body.classList.add("is-locked");
    var logo = $(".intro__mark", overlay);
    var target = $(".brand__mark");

    function dock() {
      if (!target) { finish(); return; }
      var a = logo.getBoundingClientRect();
      var b = target.getBoundingClientRect();
      if (!a.width || !b.width) { finish(); return; }

      var scale = b.width / a.width;
      var dx = (b.left + b.width / 2) - (a.left + a.width / 2);
      var dy = (b.top + b.height / 2) - (a.top + a.height / 2);

      var brandEl = $(".brand");
      if (brandEl) { brandEl.classList.add("is-hidden"); }
      overlay.classList.add("is-docking");
      // next frame so the transition definition is applied before it runs
      requestAnimationFrame(function () {
        logo.style.transform = "translate(" + dx + "px," + dy + "px) scale(" + scale + ")";
      });
      setTimeout(finish, 1000);
    }

    function finish() {
      overlay.classList.add("is-done");
      var brand = $(".brand");
      if (brand) { brand.classList.remove("is-hidden"); }
      document.body.classList.remove("is-locked");
      setTimeout(function () {
        if (overlay.parentNode) { overlay.parentNode.removeChild(overlay); }
      }, 800);
    }

    setTimeout(dock, 1300);
    // safety net so the page can never stay covered
    setTimeout(function () {
      if (overlay.parentNode && !overlay.classList.contains("is-done")) { finish(); }
    }, 4200);
  }

  /* --------------------------------------------------------------- HEADER */
  function header() {
    var head = $(".site-header");
    var toggle = $(".nav-toggle");
    var drawer = $("#drawer");
    if (head) {
      var onScroll = function () {
        head.classList.toggle("is-stuck", window.scrollY > 40);
        var top = $(".to-top");
        if (top) { top.classList.toggle("is-visible", window.scrollY > 900); }
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }
    if (toggle && drawer) {
      var setOpen = function (open) {
        toggle.setAttribute("aria-expanded", String(open));
        drawer.classList.toggle("is-open", open);
        drawer.setAttribute("aria-hidden", String(!open));
        document.body.classList.toggle("is-locked", open);
        if (open) {
          $$("nav a", drawer).forEach(function (a, i) {
            a.style.transitionDelay = (0.12 + i * 0.06) + "s";
          });
        } else {
          $$("nav a", drawer).forEach(function (a) { a.style.transitionDelay = "0s"; });
        }
      };
      toggle.addEventListener("click", function () {
        setOpen(toggle.getAttribute("aria-expanded") !== "true");
      });
      $$("a", drawer).forEach(function (a) {
        a.addEventListener("click", function () { setOpen(false); });
      });
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") { setOpen(false); }
      });
    }
    var top = $(".to-top");
    if (top) {
      top.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
      });
    }
  }

  /* -------------------------------------------------------------- REVEALS */
  function reveals() {
    var items = $$("[data-reveal],[data-stagger]");
    if (!items.length) { return; }

    var show = function (el) {
      if (el.classList.contains("is-in")) { return; }
      if (el.hasAttribute("data-stagger")) {
        var step = parseFloat(el.getAttribute("data-stagger")) || 0.09;
        Array.prototype.forEach.call(el.children, function (child, i) {
          child.style.transitionDelay = (i * step) + "s";
        });
      }
      el.classList.add("is-in");
    };

    if (reduced || !("IntersectionObserver" in window)) {
      items.forEach(show);
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) { return; }
        show(en.target);
        io.unobserve(en.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    items.forEach(function (el) { io.observe(el); });

    /* Safety sweep. A fast flick or an anchor jump can move an element
       past the viewport between observer frames, which would leave it
       invisible. This catches anything the observer missed. */
    var pending = items.slice();
    var ticking = false;
    var sweep = function () {
      ticking = false;
      pending = pending.filter(function (el) {
        var r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.94) { show(el); io.unobserve(el); return false; }
        return true;
      });
      if (!pending.length) {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
      }
    };
    var onScroll = function () {
      if (!ticking) { ticking = true; requestAnimationFrame(sweep); }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    sweep();
  }

  /* ------------------------------------------------------------- COUNTERS */
  function counters() {
    var nodes = $$("[data-count]");
    if (!nodes.length) { return; }

    var run = function (el) {
      var end = parseFloat(el.getAttribute("data-count")) || 0;
      var suffix = el.getAttribute("data-suffix") || "";
      var card = el.closest(".stat");
      if (card) { card.classList.add("is-in"); }
      if (reduced) { el.textContent = end + suffix; return; }
      var dur = 1700, t0 = null;
      var tick = function (ts) {
        if (!t0) { t0 = ts; }
        var p = Math.min((ts - t0) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(end * eased) + suffix;
        if (p < 1) { requestAnimationFrame(tick); }
      };
      requestAnimationFrame(tick);
    };

    if (!("IntersectionObserver" in window)) { nodes.forEach(run); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { run(en.target); io.unobserve(en.target); }
      });
    }, { threshold: 0.5 });
    nodes.forEach(function (el) { io.observe(el); });
  }

  /* --------------------------------------------- PROCESS LINE + PARALLAX */
  function scrollFx() {
    var lines = $$(".process__line i");
    var layers = $$("[data-parallax]");
    if (!lines.length && !layers.length) { return; }
    if (reduced) {
      lines.forEach(function (el) { el.style.width = "100%"; });
      return;
    }

    var ticking = false;
    var frame = function () {
      ticking = false;
      if (lines.length) {
        var track = $(".process__track");
        var r = track.getBoundingClientRect();
        var p = (window.innerHeight * 0.80 - r.top) / (r.height * 0.72);
        p = Math.max(0, Math.min(1, p));
        lines.forEach(function (el, k) {
          var seg = Math.max(0, Math.min(1, p * lines.length - k));
          el.style.width = (seg * 100).toFixed(1) + "%";
        });
      }
      layers.forEach(function (el) {
        var speed = parseFloat(el.getAttribute("data-parallax")) || 0.12;
        var rect = el.parentNode.getBoundingClientRect();
        if (rect.bottom < -200 || rect.top > window.innerHeight + 200) { return; }
        var offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * speed;
        /* never travel further than the media overhang, or an edge shows */
        var cap = rect.height * 0.1;
        offset = Math.max(-cap, Math.min(cap, offset));
        el.style.transform = "translate3d(0," + offset.toFixed(1) + "px,0)";
      });
    };
    var onScroll = function () {
      if (!ticking) { ticking = true; requestAnimationFrame(frame); }
    };
    frame();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
  }

  /* ------------------------------------------------------- HERO PARTICLES */
  function particles() {
    var cv = $("#heroParticles");
    if (!cv || reduced || window.innerWidth < 720) { if (cv) { cv.style.display = "none"; } return; }
    var ctx = cv.getContext("2d");
    var dots = [], w = 0, h = 0, raf;

    var size = function () {
      var r = cv.parentNode.getBoundingClientRect();
      w = cv.width = r.width; h = cv.height = r.height;
      var count = Math.min(42, Math.round(w / 34));
      dots = [];
      for (var i = 0; i < count; i++) {
        dots.push({
          x: Math.random() * w, y: Math.random() * h,
          r: Math.random() * 1.5 + 0.4,
          vy: -(Math.random() * 0.16 + 0.04),
          vx: (Math.random() - 0.5) * 0.06,
          a: Math.random() * 0.4 + 0.12
        });
      }
    };
    var draw = function () {
      ctx.clearRect(0, 0, w, h);
      dots.forEach(function (d) {
        d.y += d.vy; d.x += d.vx;
        if (d.y < -6) { d.y = h + 6; d.x = Math.random() * w; }
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(220,182,100," + d.a + ")";
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    size(); draw();
    window.addEventListener("resize", function () { cancelAnimationFrame(raf); size(); draw(); });
  }

  /* ---------------------------------------------------------- TESTIMONIALS */
  function carousel() {
    var track = $(".tst-grid");
    var dots = $(".tst-dots");
    if (!track || !dots) { return; }
    var cards = $$(".tst", track);
    dots.innerHTML = "";
    cards.forEach(function (c, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.setAttribute("aria-label", "Show testimonial " + (i + 1));
      if (i === 0) { b.classList.add("is-active"); }
      b.addEventListener("click", function () {
        track.scrollTo({ left: c.offsetLeft - track.offsetLeft, behavior: reduced ? "auto" : "smooth" });
      });
      dots.appendChild(b);
    });
    track.addEventListener("scroll", function () {
      var i = Math.round(track.scrollLeft / (track.scrollWidth / cards.length));
      $$("button", dots).forEach(function (b, k) { b.classList.toggle("is-active", k === i); });
    }, { passive: true });
  }

  /* ------------------------------------------------------------ MAP EMBED */
  function map() {
    var slot = $("#mapSlot");
    if (!slot || !CFG.MAP_EMBED_URL) { return; }
    slot.innerHTML = '<iframe title="Lakshay Associates and Consultants office location" ' +
      'src="' + CFG.MAP_EMBED_URL + '" width="100%" height="380" style="border:0;border-radius:10px" ' +
      'loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>';
    slot.classList.remove("map-slot");
  }

  /* ----------------------------------------------------------------- FORM */
  function form() {
    var f = $("#enquiryForm");
    if (!f) { return; }
    var status = $("#formStatus");

    var fail = function (field, msg) {
      var wrap = field.closest(".field");
      wrap.classList.add("has-error");
      var err = $(".err", wrap);
      if (err) { err.textContent = msg; }
    };

    f.addEventListener("submit", function (e) {
      e.preventDefault();
      $$(".field", f).forEach(function (w) { w.classList.remove("has-error"); });

      var data = {
        name: f.name_full.value.trim(),
        company: f.company.value.trim(),
        phone: f.phone.value.trim(),
        email: f.email.value.trim(),
        standard: f.standard.value,
        message: f.message.value.trim()
      };

      var ok = true;
      if (data.name.length < 2) { fail(f.name_full, "Enter your full name."); ok = false; }
      if (!/^[0-9+\-\s()]{8,16}$/.test(data.phone)) { fail(f.phone, "Enter a valid phone number."); ok = false; }
      if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email)) {
        fail(f.email, "Enter a valid email address."); ok = false;
      }
      if (!ok) { $(".has-error input, .has-error select", f).focus(); return; }

      /* Option B: post to a form endpoint if one is configured */
      if (CFG.FORM_ENDPOINT) {
        var btn = $("button[type=submit]", f);
        btn.disabled = true;
        fetch(CFG.FORM_ENDPOINT, {
          method: "POST",
          headers: { "Accept": "application/json", "Content-Type": "application/json" },
          body: JSON.stringify(data)
        }).then(function (r) {
          btn.disabled = false;
          if (r.ok) {
            f.reset();
            show("Thank you. Your enquiry has been sent. We will get back to you shortly.");
          } else {
            show("That did not send. Please call " + fmt(CFG.PHONE_PRIMARY) + " or message us on WhatsApp.");
          }
        }).catch(function () {
          btn.disabled = false;
          show("That did not send. Please call " + fmt(CFG.PHONE_PRIMARY) + " or message us on WhatsApp.");
        });
        return;
      }

      /* Option A: hand the enquiry over to WhatsApp, already written out */
      var text = "New enquiry from the Lakshay website" +
        "\n\nName: " + data.name +
        (data.company ? "\nCompany: " + data.company : "") +
        "\nPhone: " + data.phone +
        (data.email ? "\nEmail: " + data.email : "") +
        (data.standard ? "\nStandard: " + data.standard : "") +
        (data.message ? "\nMessage: " + data.message : "");
      window.open("https://wa.me/" + CFG.WHATSAPP_NUMBER + "?text=" + encodeURIComponent(text), "_blank", "noopener");
      show("WhatsApp is opening with your enquiry. Send the message and we will reply shortly.");
      f.reset();
    });

    function fmt(n) { return "+" + n; }
    function show(msg) {
      if (!status) { return; }
      status.textContent = msg;
      status.classList.add("is-visible");
    }
  }

  /* ------------------------------------------------------ PAGE TRANSITION */
  function pageFade() {
    if (reduced) { return; }
    document.addEventListener("click", function (e) {
      var a = e.target.closest ? e.target.closest("a") : null;
      if (!a) { return; }
      var href = a.getAttribute("href") || "";
      if (a.target === "_blank" || a.hasAttribute("download")) { return; }
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) { return; }
      if (!href || href.charAt(0) === "#" || /^(mailto:|tel:|https?:)/i.test(href)) { return; }
      e.preventDefault();
      document.body.classList.add("is-leaving");
      setTimeout(function () { window.location.href = href; }, 260);
    });
  }

  /* ----------------------------------------------------------------- BOOT */
  function boot() {
    try { buildLinks(); } catch (e) {}
    try { header(); } catch (e) {}
    try { reveals(); } catch (e) {}
    try { counters(); } catch (e) {}
    try { scrollFx(); } catch (e) {}
    try { particles(); } catch (e) {}
    try { carousel(); } catch (e) {}
    try { map(); } catch (e) {}
    try { form(); } catch (e) {}
    try { pageFade(); } catch (e) {}
    try { intro(); } catch (e) {
      var o = document.getElementById("intro");
      if (o && o.parentNode) { o.parentNode.removeChild(o); }
      document.body.classList.remove("is-locked");
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
