// Chatbot FAQ محتوى الأسئلة والأجوبة لكل صفحة
const chatbotFAQs = {
  'index.html': [
    { q: { ar: 'إيه الخدمات اللي بتقدمها ultra solar؟', en: 'What services does ultra solar offer?' }, a: { ar: 'إحنا متخصصين في حلول الطاقة الشمسية والأتمتة الصناعية، من أول التصميم والتركيب لحد الصيانة والدعم.', en: 'We specialize in solar energy and industrial automation solutions, from design and installation to maintenance and support.' } },
    { q: { ar: 'ليه أختار ultra solar؟', en: 'Why choose ultra solar?' }, a: { ar: 'لأننا وكيل معتمد من شركات عالمية، وعندنا خبرة كبيرة وضمان جودة ودعم فني 24 ساعة.', en: 'We are an authorized agent for global brands, with extensive experience, quality assurance, and 24/7 technical support.' } },
    { q: { ar: 'هل بتوفروا حلول للمصانع وكمان البيوت؟', en: 'Do you provide solutions for factories and homes?' }, a: { ar: 'أيوه، عندنا حلول متكاملة للمصانع، الشركات، وكمان المنازل.', en: 'Yes, we offer integrated solutions for factories, companies, and homes.' } },
    { q: { ar: 'إزاي أقدر أطلب استشارة أو عرض سعر؟', en: 'How can I request a consultation or a quote?' }, a: { ar: 'كل اللي عليك تتواصل معانا من خلال الموقع أو واتساب، وفريقنا هيرد عليك بسرعة.', en: 'Just contact us through the website or WhatsApp, and our team will respond quickly.' } },
    { q: { ar: 'هل عندكم صيانة أو دعم بعد البيع؟', en: 'Do you offer after-sales maintenance or support?' }, a: { ar: 'طبعًا! عندنا مركز صيانة معتمد ودعم فني مستمر لأي مشكلة.', en: 'Of course! We have a certified maintenance center and ongoing technical support for any issue.' } },
  ],
  'about.html': [
    { q: { ar: 'إمتى بدأت ultra solar؟', en: 'When was ultra solar founded?' }, a: { ar: 'إحنا بدأنا سنة 2011، وعندنا خبرة أكتر من 15 سنة في السوق.', en: 'We started in 2011, with over 15 years of experience in the market.' } },
    { q: { ar: 'إيه رؤيتكم ورسالتكم؟', en: 'What is your vision and mission?' }, a: { ar: 'هدفنا نبقى الشركة رقم واحد للطاقة المتجددة والأتمتة في مصر ونساعد عملائنا ينجحوا.', en: 'Our goal is to be the number one company for renewable energy and automation in Egypt and help our clients succeed.' } },
    { q: { ar: 'إيه اللي بيميز فريقكم؟', en: 'What makes your team special?' }, a: { ar: 'فريقنا كله مهندسين متخصصين وعندهم خبرة كبيرة في المجال.', en: 'Our team consists of specialized engineers with great experience in the field.' } },
    { q: { ar: 'شركاءكم مين؟', en: 'Who are your partners?' }, a: { ar: 'إحنا وكلاء وموزعين لشركات عالمية زي FRECON وSAKO وBLUE CARBON.', en: 'We are agents and distributors for global companies like FRECON, SAKO, and BLUE CARBON.' } },
  ],
  'products-solutions.html': [
    { q: { ar: 'إيه أشهر المنتجات عندكم؟', en: 'What are your most popular products?' }, a: { ar: 'بطاريات SAKO، انفرترات FRECON، إضاءة Blue Carbon، وكمان كابلات KVK.', en: 'SAKO batteries, FRECON inverters, Blue Carbon lighting, and also KVK cables.' } },
    { q: { ar: 'هل المنتجات أصلية؟', en: 'Are the products original?' }, a: { ar: 'كل منتجاتنا أصلية وبضمان رسمي من الشركة.', en: 'All our products are original and come with official warranty.' } },
    { q: { ar: 'ممكن أطلب منتج معين مش موجود على الموقع؟', en: 'Can I request a specific product not listed on the website?' }, a: { ar: 'أكيد! ابعتلنا طلبك وفريقنا هيرد عليك بسرعة.', en: 'Absolutely! Send us your request and our team will get back to you quickly.' } },
    { q: { ar: 'فيه ضمان على المنتجات؟', en: 'Is there a warranty on the products?' }, a: { ar: 'أيوه، كل منتج عليه ضمان رسمي.', en: 'Yes, every product has an official warranty.' } },
  ],
  'services.html': [
    { q: { ar: 'إيه الخدمات اللي بتقدموها؟', en: 'What services do you offer?' }, a: { ar: 'توريد وتركيب أنظمة طاقة شمسية وأتمتة صناعية، صيانة معتمدة، ودعم فني 24 ساعة.', en: 'Supplying and installing solar energy and industrial automation systems, certified maintenance, and 24/7 technical support.' } },
    { q: { ar: 'هل بتعملوا صيانة لأي ماركة؟', en: 'Do you provide maintenance for any brand?' }, a: { ar: 'إحنا مركز صيانة معتمد لعدة ماركات عالمية زي ABB وSiemens وFRECON.', en: 'We are a certified maintenance center for several global brands like ABB, Siemens, and FRECON.' } },
    { q: { ar: 'ممكن أطلب استشارة هندسية؟', en: 'Can I request engineering consultation?' }, a: { ar: 'طبعًا! عندنا فريق استشاري جاهز يساعدك في أي وقت.', en: 'Of course! We have a consulting team ready to help you anytime.' } },
    { q: { ar: 'هل بتوفروا قطع غيار أصلية؟', en: 'Do you provide original spare parts?' }, a: { ar: 'أيوه، كل قطع الغيار أصلية وبضمان.', en: 'Yes, all spare parts are original and guaranteed.' } },
  ],
  'solar-calculator.html': [
    { q: { ar: 'حاسبة الطاقة دي بتفيدني في إيه؟', en: 'What does this solar calculator help me with?' }, a: { ar: 'بتحسب لك استهلاكك وتساعدك تختار النظام الشمسي المناسب ليك.', en: 'It calculates your consumption and helps you choose the right solar system.' } },
    { q: { ar: 'هل الحسابات دقيقة 100%؟', en: 'Are the calculations 100% accurate?' }, a: { ar: 'الحاسبة بتديك تقدير مبدأي، للتصميم الدقيق تواصل معانا.', en: 'The calculator gives you an initial estimate. For precise design, contact us.' } },
    { q: { ar: 'ممكن أطلب عرض سعر بعد الحساب؟', en: 'Can I request a quote after the calculation?' }, a: { ar: 'أكيد! ابعتلنا بياناتك وفريقنا هيتواصل معاك.', en: 'Absolutely! Send us your details and our team will contact you.' } },
  ],
  'case-studies.html': [
    { q: { ar: 'إيه نوع المشاريع اللي نفذتوها؟', en: 'What types of projects have you completed?' }, a: { ar: 'اشتغلنا على مصانع، شركات، مزارع، ومشاريع كتير للطاقة الشمسية والأتمتة.', en: 'We have worked on factories, companies, farms, and many solar and automation projects.' } },
    { q: { ar: 'فيه أمثلة لنجاحاتكم؟', en: 'Do you have examples of your successes?' }, a: { ar: 'آه، عندنا دراسات حالة بتوضح إزاي ساعدنا عملاءنا يوفروا في الطاقة ويزودوا الإنتاج.', en: 'Yes, we have case studies showing how we helped clients save energy and increase productivity.' } },
    { q: { ar: 'ممكن أزور مشروع من مشاريعكم؟', en: 'Can I visit one of your projects?' }, a: { ar: 'اتواصل معانا ونرتب لك زيارة لو حابب.', en: 'Contact us and we can arrange a visit if you like.' } },
  ],
  'agencies.html': [
    { q: { ar: 'إيه الشركات اللي أنتم وكلاء ليها؟', en: 'Which companies are you agents for?' }, a: { ar: 'إحنا وكلاء FRECON، SAKO، BLUE CARBON، وغيرهم.', en: 'We are agents for FRECON, SAKO, BLUE CARBON, and others.' } },
    { q: { ar: 'هل المنتجات أصلية ومضمونة؟', en: 'Are the products original and guaranteed?' }, a: { ar: 'كل منتجاتنا أصلية وبضمان رسمي من الشركة الأم.', en: 'All our products are original and officially guaranteed by the parent company.' } },
    { q: { ar: 'لو عندي مشكلة في منتج من وكالة عندكم، أعمل إيه؟', en: 'If I have an issue with a product from your agency, what should I do?' }, a: { ar: 'اتواصل مع مركز الصيانة المعتمد عندنا ونحلها لك بسرعة.', en: 'Contact our certified maintenance center and we will solve it quickly.' } },
  ],
  'blog.html': [
    { q: { ar: 'إيه نوعية المقالات اللي بتنزل هنا؟', en: 'What kind of articles are posted here?' }, a: { ar: 'مقالات عن الطاقة الشمسية، الأتمتة، نصائح، ودراسات حالة من السوق المصري.', en: 'Articles about solar energy, automation, tips, and case studies from the Egyptian market.' } },
    { q: { ar: 'ممكن أشارك بمقال أو تجربة؟', en: 'Can I contribute an article or experience?' }, a: { ar: 'أكيد! ابعتلنا تجربتك أو مقالك وفريقنا يراجعه.', en: 'Absolutely! Send us your experience or article and our team will review it.' } },
    { q: { ar: 'هل فيه جديد دايمًا في المدونة؟', en: 'Is there always something new on the blog?' }, a: { ar: 'بنحدث المدونة باستمرار بكل جديد في المجال.', en: 'We constantly update the blog with the latest in the field.' } },
  ],
  'testimonials.html': [
    { q: { ar: 'آراء العملاء هنا حقيقية؟', en: 'Are the testimonials here real?' }, a: { ar: 'كل الآراء من عملاء فعليين جربوا خدماتنا ومنتجاتنا.', en: 'All testimonials are from real clients who have tried our services and products.' } },
    { q: { ar: 'إزاي أقدر أشارك رأيي؟', en: 'How can I share my feedback?' }, a: { ar: 'ابعتلنا رأيك أو تقييمك من خلال صفحة تواصل معنا.', en: 'Send us your feedback or review through the Contact Us page.' } },
    { q: { ar: 'هل فيه عملاء كبار اتعاملوا معاكم؟', en: 'Do you have major clients who worked with you?' }, a: { ar: 'آه، عندنا عملاء من أكبر الشركات والمصانع في مصر.', en: 'Yes, we have clients from the largest companies and factories in Egypt.' } },
  ],
  'contact.html': [
    { q: { ar: 'إزاي أتواصل معاكم بسرعة؟', en: 'How can I contact you quickly?' }, a: { ar: 'ممكن تكلمنا على واتساب أو تتصل بينا في أي وقت.', en: 'You can contact us on WhatsApp or call us anytime.' } },
    { q: { ar: 'فين عنوانكم؟', en: 'Where is your address?' }, a: { ar: 'الفيوم -أمام قاعة RED FLOWER، أعلى مركز أحمد علي', en: 'Address: Fayoum - Opposite RED FLOWER Hall, Above Ahmed Ali Center' } },
    { q: { ar: 'هل فيه دعم فني مباشر؟', en: 'Is there direct technical support?' }, a: { ar: 'أيوه، عندنا دعم فني متاح 24 ساعة لأي استفسار.', en: 'Yes, we have 24/7 technical support for any inquiry.' } },
  ],
};

// تحديد اللغة الحالية
function getCurrentLang() {
  return localStorage.getItem('language') || document.documentElement.lang || 'ar';
}

// تحديد اسم الصفحة الحالية
function getCurrentPage() {
  const path = window.location.pathname;
  const file = path.substring(path.lastIndexOf('/') + 1) || 'index.html';
  return file;
}

// إنشاء الشات بوت
function createChatbot() {
  // عناصر الشات بوت
  const container = document.getElementById('chatbot-container');
  if (!container) return;

  // نافذة الشات
  const chatbotBox = document.createElement('div');
  chatbotBox.className = 'chatbot-box';
  chatbotBox.innerHTML = `
    <div class="chatbot-header">
      <span class="chatbot-header-title">
        <img src="images/Screenshot_1 (1).png" alt="logo" class="chatbot-header-logo" />
        <span class="chatbot-title-text">اسأل ultra solar</span>
      </span>
      <button class="chatbot-close" title="إغلاق">&times;</button>
    </div>
    <div class="chatbot-body"></div>
    <div class="chatbot-footer">
      <a href="https://wa.me/201034550554" target="_blank" class="whatsapp-support">
        <i class="fab fa-whatsapp"></i> <span class="wa-text">تواصل معنا مباشرة عبر واتساب</span>
      </a>
    </div>
  `;
  container.appendChild(chatbotBox);

  // أيقونة الشات
  const chatIcon = document.createElement('button');
  chatIcon.className = 'chatbot-fab';
  chatIcon.title = 'اسأل ultra solar';
  chatIcon.innerHTML = '<i class="fas fa-comments"></i>';
  container.appendChild(chatIcon);

  // منطق الفتح/الإغلاق
  let logoAnimated = false;
  chatIcon.addEventListener('click', () => {
    chatbotBox.classList.add('open');
    chatIcon.style.display = 'none';
    // حركة اللوجو الدائرية
    const headerTitle = chatbotBox.querySelector('.chatbot-header-title');
    const logo = chatbotBox.querySelector('.chatbot-header-logo');
    const titleText = chatbotBox.querySelector('.chatbot-title-text');
    // أخفي العنوان
    headerTitle.classList.add('hide-title');
    titleText.classList.remove('reveal');
    // أضف كلاس الحركة
    logo.classList.add('animating');
    // بعد انتهاء الأنيميشن + ثانية، أظهر العنوان
    setTimeout(() => {
      logo.classList.remove('animating');
      headerTitle.classList.remove('hide-title');
      titleText.classList.add('reveal');
    }, 1600); // مدة الأنيميشن (1.1s) + 0.5s
  });
  chatbotBox.querySelector('.chatbot-close').addEventListener('click', () => {
    chatbotBox.classList.remove('open');
    chatIcon.style.display = 'block';
  });

  // عرض الأسئلة حسب الصفحة واللغة
  const page = getCurrentPage();
  const lang = getCurrentLang();
  const faqs = chatbotFAQs[page] || chatbotFAQs['index.html'];
  const body = chatbotBox.querySelector('.chatbot-body');
  body.innerHTML = '';
  faqs.forEach((item, idx) => {
    const qDiv = document.createElement('div');
    qDiv.className = 'chatbot-faq-question';
    qDiv.textContent = item.q[lang] || item.q['ar'];
    qDiv.setAttribute('tabindex', 0);
    qDiv.setAttribute('aria-expanded', 'false');
    const aDiv = document.createElement('div');
    aDiv.className = 'chatbot-faq-answer';
    aDiv.textContent = item.a[lang] || item.a['ar'];
    aDiv.style.display = 'none';
    qDiv.addEventListener('click', () => {
      const expanded = aDiv.style.display === 'block';
      aDiv.style.display = expanded ? 'none' : 'block';
      qDiv.setAttribute('aria-expanded', !expanded);
    });
    qDiv.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') qDiv.click();
    });
    body.appendChild(qDiv);
    body.appendChild(aDiv);
  });

  // ترجمة العناوين حسب اللغة
  const titleText = chatbotBox.querySelector('.chatbot-title-text');
  const waText = chatbotBox.querySelector('.wa-text');
  if (lang === 'en') {
    titleText.textContent = 'Ask ultra solar';
    waText.textContent = 'Contact us directly via WhatsApp';
    chatIcon.title = 'Ask ultra solar';
  } else {
    titleText.textContent = 'اسأل ultra solar';
    waText.textContent = 'تواصل معنا مباشرة عبر واتساب';
    chatIcon.title = 'اسأل ultra solar';
  }

  // إظهار الشات بعد 3 ثواني
  setTimeout(() => {
    chatIcon.classList.add('show');
  }, 3000);
}

document.addEventListener('DOMContentLoaded', createChatbot);

// إعادة بناء الشات بوت عند تغيير اللغة
function rebuildChatbot() {
  const container = document.getElementById('chatbot-container');
  if (container) container.innerHTML = '';
  createChatbot();
}

// مراقبة زر تغيير اللغة (لو موجود)
const langBtn = document.getElementById('language-toggle');
if (langBtn) {
  langBtn.addEventListener('click', () => {
    setTimeout(rebuildChatbot, 150); // ننتظر حتى تتغير اللغة فعليًا
  });
}

// مراقبة تغيير اللغة عبر localStorage (للتبويبات الأخرى)
window.addEventListener('storage', function(e) {
  if (e.key === 'language') {
    rebuildChatbot();
  }
}); 