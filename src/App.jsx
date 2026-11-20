import { useState, useEffect } from "react";
import "./App.css";

const services = [
  { icon: "✦", title: "تجميل الأسنان", desc: "ابتسامة متناسقة وجذابة بتقنيات تجميلية حديثة." },
  { icon: "◇", title: "زراعة الأسنان", desc: "حلول متقدمة لتعويض الأسنان المفقودة." },
  { icon: "✧", title: "تقويم الأسنان", desc: "تصحيح اصطفاف الأسنان وتحسين الابتسامة." },
  { icon: "❋", title: "تبييض الأسنان", desc: "استعيدي إشراقة ابتسامتك بطريقة آمنة." },
  { icon: "⌁", title: "علاج العصب", desc: "عناية دقيقة للحفاظ على أسنانك الطبيعية." },
  { icon: "♡", title: "طب أسنان الأطفال", desc: "رعاية لطيفة ومريحة لأطفالكم." },
];

function App() {
  const [sent, setSent] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll(".section").forEach((section) => {
      section.classList.add("reveal");
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const data = new FormData(form);

    const message =
      "مرحبا، أريد حجز موعد في عيادة لؤلؤة\n" +
      "الاسم: " + data.get("name") + "\n" +
      "رقم الهاتف: " + data.get("phone") + "\n" +
      "الخدمة: " + data.get("service") + "\n" +
      "التاريخ: " + data.get("date") + "\n" +
      "الوقت: " + data.get("time") + "\n" +
      "ملاحظات: " + data.get("notes");

    window.open(
      "https://wa.me/963932768982?text=" + encodeURIComponent(message),
      "_blank"
    );

    setSent(true);
  }

  return (
    <div className="site" dir="rtl">
      <header className="header">
        <a className="logo" href="#home">
          <span className="logo-mark">✦</span>
          <span>
            لؤلؤة
            <small>للعناية بالأسنان</small>
          </span>
        </a>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="القائمة"
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        <nav className={`nav ${menuOpen ? "nav-open" : ""}`}>          <a href="#home" onClick={() => setMenuOpen(false)}>الرئيسية</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>عن العيادة</a>
          <a href="#services" onClick={() => setMenuOpen(false)}>خدماتنا</a>
          <a href="#doctor" onClick={() => setMenuOpen(false)}>طبيبنا</a>
          <a href="#reviews" onClick={() => setMenuOpen(false)}>آراء المرضى</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>تواصل معنا</a>
        </nav>

        <a className="header-btn" href="#booking">
          احجز موعدك <span>←</span>
        </a>
      </header>
      <main>
        <section className="hero" id="home">
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <span className="eyebrow"><i></i> عناية استثنائية بابتسامتك</span>
            <h1>ابتسامتك الجميلة<br />تستحق <em>الأفضل.</em></h1>
            <p>
              في عيادة لؤلؤة، نجمع بين الخبرة الطبية والتقنيات الحديثة
              لنمنحك تجربة علاجية مريحة وابتسامة تثقين بها.
            </p>
            <div className="hero-actions">
              <a href="#booking" className="primary-btn">احجزي استشارتك <span>↗</span></a>
              <a href="#services" className="text-btn">اكتشفي خدماتنا <span>←</span></a>
            </div>
            <div className="hero-note">
              <span className="note-icon">✧</span>
              <span>اهتمام بالتفاصيل، وابتسامة تدوم</span>
            </div>
          </div>
          <div className="hero-side-label">LOLO DENTAL CLINIC </div>
          <a href="#about" className="scroll-down">اكتشفي المزيد <span>↓</span></a>
        </section>

        <section className="trust-strip">
          <div><strong>01</strong><span>رعاية شخصية</span></div>
          <div><strong>02</strong><span>تقنيات حديثة</span></div>
          <div><strong>03</strong><span>بيئة مريحة</span></div>
          <div><strong>04</strong><span>اهتمام بكل التفاصيل</span></div>
        </section>

        <section className="about section" id="about">
          <div className="about-image">
            <img
              src="https://www.dentalspecialitycentre.in/images/hero-04.webp"
              alt="عيادة لؤلؤة للأسنان"
            />
          </div>
          <div className="about-copy">
            <span className="eyebrow dark">مرحباً بك في لؤلؤة</span>
            <h2>عناية تليق بك،<br /><em>وابتسامة تشبهك.</em></h2>
            <p>
              نؤمن أن زيارة طبيب الأسنان يجب أن تكون تجربة مطمئنة ومميزة.
              لذلك نهتم بكل تفصيل، من استقبالكم وحتى متابعة نتائج العلاج.
            </p>
            <p>
              هدفنا أن نقدم رعاية متكاملة تجمع بين الدقة الطبية والراحة
              والاهتمام الحقيقي باحتياجات كل مراجع.
            </p>
            <a href="#booking" className="under-link">تعرفي علينا أكثر <span>←</span></a>
          </div>
        </section>

        <section className="services section" id="services">
          <div className="section-heading">
            <div>
              <span className="eyebrow dark">خدماتنا الطبية</span>
              <h2>كل ما تحتاجه<br /><em>ابتسامتك في مكان واحد.</em></h2>
            </div>
            <p>نقدم مجموعة من خدمات طب الأسنان بعناية واهتمام، مع مراعاة احتياجات كل حالة.</p>
          </div>
          <div className="service-grid">
            {services.map((service, index) => (
              <article className="service-card" key={service.title}>
                <div className="service-top"><span>{service.icon}</span><small>0{index + 1}</small></div>
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
                <a href="#booking" aria-label="احجزي موعداً">↙️</a>
              </article>
            ))}
          </div>
        </section>

        <section className="quote-section">
          <span className="quote-mark">“</span>
          <p>الابتسامة الجميلة ليست مجرد مظهر،<br />بل شعور بالثقة يبدأ من الداخل.</p>
          <span className="quote-line"></span>
          <small>PEARL DENTAL CLINIC</small>
        </section>

        <section className="doctor section" id="doctor">
          <div className="doctor-copy">
            <span className="eyebrow dark">خبرة واهتمام</span>
            <h2>رعاية طبية<br /><em>بلمسة إنسانية.</em></h2>
            <p>
              نضع راحتك وصحة ابتسامتك في مقدمة أولوياتنا.
              نحرص على شرح خيارات العلاج بوضوح ومرافقتك في كل خطوة.
            </p>
            <div className="doctor-points">
              <span>✦ اهتمام بكل حالة على حدة</span>
              <span>✦ شرح واضح لخطوات العلاج</span>
              <span>✦ متابعة مستمرة لراحتك</span>
            </div>
            <a href="#booking" className="under-link">احجزي موعداً الآن <span>←</span></a>
          </div>
          <div className="doctor-image">
            <img
              src="https://www.medizin.uni-tuebingen.de/cache/images/c/a/f/3/e/caf3ece4577fdd6675b81393ed4ff81739e82adb.jpeg"
              alt="طبيب أسنان داخل عيادته"
            />
            <div className="doctor-tag"><span>✦</span><div><strong>فريقنا الطبي</strong><small>خبرة واهتمام بصحتك</small></div></div>
          </div>
        </section>
        <section className="reviews section" id="reviews">
          <div className="reviews-top">
            <span className="reviews-label">PATIENT STORIES</span>
            <h2>
              ابتسامات تحكي
              <br />
              <em>حكايات من الثقة</em>
            </h2>
            <p>لأن أجمل تقييم هو ابتسامة راضية.</p>
          </div>

          <div className="reviews-grid">
            <div className="review-card">
              <span className="review-number">01</span>
              <div className="stars">★★★★★</div>
              <p>«من أول زيارة شعرت بالراحة والاهتمام. تجربة راقية بكل تفاصيلها.»</p>
              <div className="review-author">
                <span className="author-line"></span>
                <div>
                  <h4>مراجعة من العيادة</h4>
                  <small>تجربة علاجية</small>
                </div>
              </div>
            </div>

            <div className="review-card featured-review">
              <span className="review-number">02</span>
              <div className="stars">★★★★★</div>
              <p>«احترافية في العمل واهتمام بالتفاصيل. شعرت أنني في المكان الصحيح.»</p>
              <div className="review-author">
                <span className="author-line"></span>
                <div>
                  <h4>مراجع من العيادة</h4>
                  <small>عناية بالأسنان</small>
                </div>
              </div>
            </div>

            <div className="review-card">
              <span className="review-number">03</span>
              <div className="stars">★★★★★</div>
              <p>«مكان أنيق وفريق لطيف، والأهم أن النتيجة كانت رائعة.»</p>
              <div className="review-author">
                <span className="author-line"></span>
                <div>
                  <h4>مراجعة من العيادة</h4>
                  <small>زيارة للعيادة</small>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="booking section" id="booking">
          <div className="booking-intro">
            <span className="eyebrow">خطوتك الأولى نحو ابتسامة أجمل</span>
            <h2>موعدك يبدأ<br /><em>من هنا.</em></h2>
            <p>املئي البيانات وسنتواصل معك لتأكيد تفاصيل الموعد.</p>
            <div className="booking-detail"><span>✦</span> راحتك ووقتك محل اهتمامنا</div>
          </div>

          <form className="booking-form" onSubmit={handleSubmit}>
            <h3>طلب حجز موعد</h3>
            <p>يرجى إدخال معلومات التواصل الخاصة بك.</p>

            <label>الاسم الكامل</label>
            <input name="name" required type="text" placeholder="اكتبي اسمك الكامل" />

            <label>رقم الهاتف</label>
            <input name="phone" required type="tel" placeholder="رقم الهاتف للتواصل" />

            <label>تاريخ الموعد</label>
            <input name="date" type="date" required />

            <label>وقت الموعد</label>
            <input name="time" type="time" required />

            <label>الخدمة المطلوبة</label>
            <select name="service" defaultValue="" required>
              <option value="" disabled>اختاري الخدمة</option>
              {services.map((service) => (
                <option key={service.title} value={service.title}>
                  {service.title}
                </option>
              ))}
            </select>

            <label>ملاحظات إضافية</label>
            <textarea
              name="notes"
              rows="3"
              placeholder="أخبرينا إن كان لديك أي استفسار (اختياري)"
            />

            <button type="submit" className="primary-btn form-btn">
              إرسال طلب الحجز <span>←</span>
            </button>

            {sent && (
              <div className="success-message">
                تم فتح واتساب لإرسال طلب الحجز.
              </div>
            )}

            <small className="form-note">
              سيتم إرسال طلبك عبر واتساب، ثم نتواصل معك لتأكيد الموعد.
            </small>
          </form>

        </section>
      </main>

      <footer className="footer" id="contact">
        <div className="footer-main">

          <div className="footer-brand">
            <a className="logo footer-logo" href="#home">
              <span className="logo-mark">✦</span>
              <span>لؤلؤة <small>للعناية بالأسنان</small></span>
            </a>
            <p>
              ابتسامتك هي أجمل ما ترتدينه.
              <br />
              نحن هنا لنعتني بها.
            </p>
          </div>

          <div className="footer-links">
            <h3>روابط سريعة</h3>
            <a href="#home">الرئيسية</a>
            <a href="#about">عن العيادة</a>
            <a href="#services">خدماتنا</a>
            <a href="#doctor">طبيبنا</a>
            <a href="#reviews">آراء المرضى</a>
          </div>

          <div className="footer-contact">
            <h3>تواصلي معنا</h3>
            <a href="tel:0932768982">0932768982</a>
            <a href="https://wa.me/963932768982" target="_blank" rel="noreferrer">
              واتساب
            </a>
            <a href="#booking">احجزي موعدك</a>
          </div>

        </div>

        <div className="footer-bottom">
          <span>© لؤلؤة لطب الأسنان</span>
          <span>صُمم بعناية لابتسامتك ✦</span>
        </div>
      </footer>
      <a
        href="https://wa.me/963932768982"
        target="_blank"
        rel="noreferrer"
        style={{
          position: "fixed",
          bottom: "25px",
          left: "25px",
          zIndex: 999999,
          backgroundColor: "#25D366",
          color: "white",
          padding: "15px 22px",
          borderRadius: "50px",
          fontWeight: "bold",
          textDecoration: "none",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          gap: "8px",
          whiteSpace: "nowrap"
        }}
      >
        <svg
          viewBox="0 0 32 32"
          width="22"
          height="22"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M16 3C8.8 3 3 8.7 3 15.8c0 2.3.6 4.5 1.8 6.4L3 29l7-1.8c1.8 1 3.9 1.5 6 1.5 7.2 0 13-5.8 13-12.9S23.2 3 16 3zm0 23.4c-1.9 0-3.7-.5-5.3-1.5l-.4-.2-4.1 1.1 1.1-4-.3-.4a10.5 10.5 0 1 1 9 5zm5.8-7.9c-.3-.2-1.8-.9-2.1-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7.1c-.3-.2-1.3-.5-2.5-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.7l.5-.5c.2-.2.2-.4.3-.6.1-.2 0-.4 0-.6s-.7-1.7-1-2.3c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.1 1.1-1.1 2.6s1.1 3 1.3 3.2c.2.2 2.2 3.4 5.3 4.6 3.1 1.2 3.1.8 3.7.7.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.2-.3-.3-.6-.4z" />
        </svg>
        <span> تواصلي معنا عبر واتساب </span>
      </a>
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            position: "fixed",
            bottom: "28px",
            right: "25px",
            zIndex: 999999,
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            border: "2px solid #d5b47c",
            outline: "none",
            boxShadow: "0 4px 15px rgba(185, 154, 104, 0.3)",
            appearance: "none",
            background: "#b99a68",
            color: "#172d36",
            fontSize: "32px",
            cursor: "pointer",
          }}
        >
          ↑
        </button>
      )}
    </div>
  );
}

export default App;