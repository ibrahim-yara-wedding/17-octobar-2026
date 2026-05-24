// Countdown timer
(function () {
  var targetDate = new Date("Oct 17, 2026 20:00:00").getTime();

  function update() {
    var diff = targetDate - Date.now();
    if (diff < 0) {
      document.getElementById("countdown").innerHTML = '<div class="relative max-w-xl mx-auto text-center"><h2 class="font-display text-4xl md:text-7xl text-sage-dark mb-1">The Big Day Has Arrived!</h2></div>';
      clearInterval(timer);
      return;
    }
    document.getElementById("days").innerText = Math.floor(diff / 86400000);
    document.getElementById("hours").innerText = String(Math.floor((diff % 86400000) / 3600000)).padStart(2, "0");
    document.getElementById("minutes").innerText = String(Math.floor((diff % 3600000) / 60000)).padStart(2, "0");
    document.getElementById("seconds").innerText = String(Math.floor((diff % 60000) / 1000)).padStart(2, "0");
  }

  update();
  var timer = setInterval(update, 1000);
})();

// Scroll reveal animation
(function () {
  var targets = document.querySelectorAll("main > section:not(:first-of-type), main > div.bg-ivory, main > footer");
  targets.forEach(function (el) { el.classList.add("reveal"); });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.06, rootMargin: "0px 0px -30px 0px" });

  targets.forEach(function (el) { observer.observe(el); });
})();

// RSVP form AJAX submission
(function () {
  var form = document.getElementById("rsvpForm");
  var successDiv = document.getElementById("rsvpSuccess");
  var submitBtn = document.getElementById("rsvpSubmitBtn");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>Sending...</span>';

    var formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
          },
          body: json
      }).then(async (response) => {
      let json = await response.json();
      if (response.status == 200) {
        form.classList.add("hidden");
        successDiv.classList.remove("hidden");
      } else {
        throw new Error("Form submission failed");
      }
    }).catch(function () {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<span>Something went wrong. Try again.</span>';
      setTimeout(function () {
        submitBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"></path><path d="m21.854 2.147-10.94 10.939"></path></svg><span data-i18n="rsvp.submit">Send RSVP</span>';
      }, 3000);
    });
  });
})();

// i18n — Arabic/English toggle
(function () {
  var AR = {
    'hero.subtitle': 'احنا هنتجوز',
    'hero.rsvp': 'مستعد للاحتفال؟',
    'countdown.title': 'العد التنازلي',
    'countdown.days': 'أيام',
    'countdown.hours': 'ساعات',
    'countdown.minutes': 'دقائق',
    'countdown.seconds': 'ثواني',
    'welcome.title': 'أهلًا بيك!',
    'welcome.body': 'يسعدنا دعوتكم للاحتفال معنا بيوم فرحنا. مستنيين نشارك اللحظة دي مع أغلى الناس على قلوبنا.',
    'venue.title': 'القاعة',
    'venue.subtitle': 'مكان الاحتفال',
    'venue.name': 'فندق الماسة',
    'venue.hall': 'حديقة اللونج',
    'venue.location': 'فندق الماسة، شارع د. عبد العزيز الشناوي، جامعة الأزهر - القاهرة',
    'venue.openMaps': 'افتح في الخرائط',
    'transport.title': 'الوصول إلى المكان',
    'transport.subtitle': 'حاجات مهم تعرفوها',
    'programme.title': 'برنامج الفرح',
    'programme.arrival': 'الاستقبال',
    'programme.katb': 'كتب الكتاب',
    'programme.cake': 'تقطيع التورتة',
    'programme.dinner': 'العشاء',
    'programme.photos': 'التصوير',
    'programme.finish': 'نهاية الفرح',
    'dresscode.women': 'المواصلات',
    'dresscode.women.desc': 'لازم تركب عربية جولف عشان توصل لقاعة حديقة اللونج، يرجى الاتصال بهذا الرقم لو ملقتش عربية',
    'dresscode.men': 'ركنة العربيات',
    'dresscode.men.desc': 'ممكن تركن عربيتك في الشارع خارج فندق الماسة من غير رسوم أو داخل الفندق برسوم بسيطة بالساعة',
    'gifts.title': 'نوماً هنيًا للأطفال',
    'gifts.desc': 'دا فرح للكبار — استمتعوا بليلة هادية!',
    'rsvp.title': 'قائمة العازيم',
    'rsvp.subtitle': 'قولولنا لو هتقدروا تيجوا',
    'rsvp.attending': 'هل هتيجي *',
    'rsvp.yes': 'أيوه، هكون موجود',
    'rsvp.no': 'للأسف مش هقدر أجي',
    'rsvp.name.placeholder': 'الاسم',
    'rsvp.message.label': 'رسالة للعروسين',
    'rsvp.message.placeholder': 'في حاجة حابين تقولوهالنا؟',
    'rsvp.submit': 'إرسال',
    'rsvp.thanks': 'شكراً لك!',
    'rsvp.thanks.msg': 'إحنا متحمسين جداً نحتفل معاكم! وصلنا ردكم — نشوفكم في الفرح!'
  };

  var EN_TEXT = {}, EN_PLACEHOLDER = {};
  document.querySelectorAll("[data-i18n]").forEach(function (el) {
    var k = el.getAttribute("data-i18n");
    if (!EN_TEXT[k]) EN_TEXT[k] = el.textContent.trim();
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
    var k = el.getAttribute("data-i18n-placeholder");
    if (!EN_PLACEHOLDER[k]) EN_PLACEHOLDER[k] = el.placeholder;
  });

  function applyLanguage(lang) {
    var isAR = lang === "ar";
    var t = isAR ? AR : EN_TEXT;
    var tp = isAR ? AR : EN_PLACEHOLDER;

    document.documentElement.lang = lang;
    document.body.dir = isAR ? "rtl" : "ltr";
    history.replaceState(null, "", window.location.pathname + window.location.search + "#" + lang);

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var v = t[el.getAttribute("data-i18n")];
      if (v !== undefined) el.textContent = v;
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      var v = tp[el.getAttribute("data-i18n-placeholder")];
      if (v !== undefined) el.placeholder = v;
    });

    var golfCartImg = document.getElementById("golf-cart-img");
    if (golfCartImg) {
      golfCartImg.src = isAR ? "images/golf-cart-ar.webp" : "images/golf-cart-en.webp";
    }

    var btnEn = document.getElementById("btn-en");
    var btnAr = document.getElementById("btn-ar");
    if (btnEn && btnAr) {
      var active = ["bg-sage-dark", "text-white"];
      var inactive = ["text-sage-dark", "hover:bg-sage/10"];
      [btnEn, btnAr].forEach(function (b) {
        b.classList.remove.apply(b.classList, active.concat(inactive));
      });
      var actBtn = isAR ? btnAr : btnEn;
      var inacBtn = isAR ? btnEn : btnAr;
      active.forEach(function (c) { actBtn.classList.add(c); });
      inactive.forEach(function (c) { inacBtn.classList.add(c); });
    }
  }

  applyLanguage(window.location.hash === "#ar" ? "ar" : "en");

  document.getElementById("btn-en").addEventListener("click", function () { applyLanguage("en"); });
  document.getElementById("btn-ar").addEventListener("click", function () { applyLanguage("ar"); });
})();
