// ========================================================================
// script.js — بيتحكم في: 1) فتح/قفل نافيجيشن الموبايل  2) تفعيل التابات
// (زي اختيار الكوكب أو رائد الفضاء أو التكنولوجي) في أي صفحة موجودة فيها
// ========================================================================

// ندور على زرار الهامبرجر بتاع الموبايل باستخدام الـ data attribute بتاعه
const navToggle = document.querySelector('[data-nav-toggle]');
// ندور على قائمة النافيجيشن نفسها عشان نفتحها أو نقفلها
const primaryNav = document.querySelector('.primary-navigation');

// لو الزرار والقايمة موجودين في الصفحة دي (موجودين في كل صفحة أصلا)
if (navToggle && primaryNav) {
  // نضيف حدث كليك على زرار الهامبرجر
  navToggle.addEventListener('click', () => {
    // نجيب الحالة الحالية (مفتوح ولا مقفول) من خلال aria-expanded
    const isOpen = primaryNav.getAttribute('data-visible') === 'true';
    // نعكس الحالة: لو كانت مفتوحة تقفل والعكس صحيح
    primaryNav.setAttribute('data-visible', String(!isOpen));
    // نحدث aria-expanded عشان الأكسسيبيليتي (قاري الشاشة يعرف الحالة)
    navToggle.setAttribute('aria-expanded', String(!isOpen));
  });
}

// -------------------- دالة عامة لتفعيل نظام التابات -------------------- //
// بتستقبل: مجموعة أزرار التابات، ودالة تنفذ التغيير الفعلي في المحتوى
function setupTabs(tabListSelector, onChange) {
  // نجيب حاوية التابات (مثلا ul.tab-list أو div.dot-indicators)
  const tabList = document.querySelector(tabListSelector);
  // لو مفيش حاوية بهذا الاسم في الصفحة الحالية نوقف الدالة (يعني مش كل صفحة فيها تابات)
  if (!tabList) return;

  // نجيب كل الأزرار جوه الحاوية دي
  const tabs = Array.from(tabList.querySelectorAll('[role="tab"]'));

  // دالة بتشغل تاب معين وتقفل الباقي
  function activateTab(tab) {
    // نلغي التفعيل من كل التابات الأول
    tabs.forEach((t) => {
      t.setAttribute('aria-selected', 'false');
      t.setAttribute('tabindex', '-1'); // roving tabindex: الباقي بره ترتيب Tab
    });
    // نفعل التاب المطلوب بس
    tab.setAttribute('aria-selected', 'true');
    tab.setAttribute('tabindex', '0');  // التاب النشط هو اللي بيستقبل Tab
    // ننفذ دالة التغيير اللي جاية من بره (تغيير الصورة والنص والداتا)
    onChange(tab.dataset.value, tab);
  }

  // نضيف حدث كليك على كل تاب
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => activateTab(tab));
  });

  // ندعم كمان التنقل بالسهام لليمين والشمال عشان الأكسسيبيليتي (لوحة المفاتيح)
  tabList.addEventListener('keydown', (e) => {
    // نجيب مكان التاب اللي عليه فوكس دلوقتي
    const currentIndex = tabs.findIndex((t) => t === document.activeElement);
    let newIndex;
    // لو ضغط سهم يمين أو تحت ننقل للتاب اللي بعده (بنظام دائري)
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      newIndex = (currentIndex + 1) % tabs.length;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      // لو ضغط سهم شمال أو فوق ننقل للتاب اللي قبله (بنظام دائري برضو)
      newIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    } else {
      return; // أي زرار تاني منتجاهلوش
    }
    e.preventDefault();      // نمنع سكرول الصفحة بالسهام
    tabs[newIndex].focus();  // ننقل الفوكس للتاب الجديد
    activateTab(tabs[newIndex]); // ونفعله فورا
  });
}

// نصدر الدالة عشان تستخدمها كل صفحة براحتها (destination.html, crew.html, technology.html)
window.setupTabs = setupTabs;
