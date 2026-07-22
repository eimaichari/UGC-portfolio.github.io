  // ---- Interactive hero name (auto-types sample words, pauses while the visitor edits) ----
  const nameExtra = document.getElementById('nameExtra');
  const nameRender = document.getElementById('nameRender');
  const AUTO_WORDS = [' KUTI', ' Web Developer', ' UGC', ' Tech UGC'];
  const MAX_CHARS = 17;
 
  const TYPE_SPEED = 95;
  const DELETE_SPEED = 50;
  const HOLD_TIME = 1300;
  const GAP_TIME = 350;
 
  // Flips back to true when the user clicks away (blur), so the demo resumes.
  let autoTypeEnabled = true;
  let autoTypeTimer = null;
  let wordIdx = 0;
  let charCount = 0;
  let deleting = false;
 
  function autoTypeStep(){
    // Pauses here (not permanently stopped) whenever the visitor is editing.
    if(!autoTypeEnabled) return;
 
    // Enforce the 17-character limit on every word before typing it out.
    const word = AUTO_WORDS[wordIdx].slice(0, MAX_CHARS);
 
    if(!deleting){
      charCount++;
      nameExtra.textContent = word.slice(0, charCount);
 
      if(charCount === word.length){
        deleting = true;
        autoTypeTimer = setTimeout(autoTypeStep, HOLD_TIME);
      } else {
        autoTypeTimer = setTimeout(autoTypeStep, TYPE_SPEED);
      }
    } else {
      charCount--;
      nameExtra.textContent = word.slice(0, charCount);
 
      if(charCount === 0){
        deleting = false;
        wordIdx = (wordIdx + 1) % AUTO_WORDS.length;
        autoTypeTimer = setTimeout(autoTypeStep, GAP_TIME);
      } else {
        autoTypeTimer = setTimeout(autoTypeStep, DELETE_SPEED);
      }
    }
  }
 
  // Pauses the auto-type loop the moment the visitor interacts.
  function stopAutoTypeOnUserInteraction(){
    if(autoTypeEnabled){
      autoTypeEnabled = false;
      clearTimeout(autoTypeTimer);
      nameExtra.textContent = ''; // clear whatever word was mid-typing/deleting
    }
  }
 
  // Resumes the loop from the top once the visitor clicks/tabs away.
  function resumeAutoTypeOnBlur(){
    if (!autoTypeEnabled){
      autoTypeEnabled = true;
      wordIdx = 0;
      charCount = 0;
      deleting = false;
      nameExtra.textContent = '';
      autoTypeTimer = setTimeout(autoTypeStep, GAP_TIME);
    }
  }
 
  autoTypeTimer = setTimeout(autoTypeStep, GAP_TIME);
 
  nameRender.addEventListener('click', () => {
    stopAutoTypeOnUserInteraction();
    nameExtra.focus();
  });
 
  nameExtra.addEventListener('focus', stopAutoTypeOnUserInteraction);
  nameExtra.addEventListener('blur', resumeAutoTypeOnBlur);
 
  nameExtra.addEventListener('input', () => {
    if (nameExtra.textContent.includes('\n')) {
      nameExtra.textContent = nameExtra.textContent.replace(/\n/g, '');
    }
    if (nameExtra.textContent.length > MAX_CHARS) {
      nameExtra.textContent = nameExtra.textContent.slice(0, MAX_CHARS);
    }
    const range = document.createRange();
    range.selectNodeContents(nameExtra);
    range.collapse(false);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  });
  nameExtra.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') e.preventDefault();
  });
 
  // ---- Mobile hamburger menu: toggles the stacked link list under the nav bar ----
  const menuToggle = document.getElementById('menuToggle');
  const mobilePanel = document.getElementById('mobilePanel');
  menuToggle.addEventListener('click', () => {
    const isOpen = mobilePanel.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  });
  // Close the mobile panel once a link is tapped, so it doesn't stay open
  // after the page has scrolled to the chosen section.
  mobilePanel.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobilePanel.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open menu');
    });
  });
 
  // ---- Scroll reveal ----
  const revealEls = document.querySelectorAll('[data-reveal]');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
  }, { threshold: 0.12 });
  revealEls.forEach(el => io.observe(el));
 
  // ---- Theme toggle (in-memory only, no storage) ----
  const themeCheckbox = document.getElementById('themeCheckbox');
  themeCheckbox.addEventListener('change', () => {
    const theme = themeCheckbox.checked ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
  });
 
  const MAILTO_ADDRESS = 'grace.digitalugc@gmail.com';
  const MAIL_SUBJECT = 'Paid partnership inquiry: [Brand Name] x Grace';
  const MAIL_BODY =
`Hi Grace,
 
We absolutely loved your recent video on [e.g., your React tutorial / Shopify build] and are reaching out because your authentic style is exactly what we're looking for at [Brand Name].
 
We'd love to explore partnering with you on a dedicated video. Here are the initial project details:
 
- Product/Service: [Name of product or service]
- Deliverable: [e.g., 60-second dedicated review / integrated shoutout]
- Usage Rights: [e.g., 30 days paid social + organic cross-posting]
- Timeline: First draft by [Date], publish by [Date]
- Budget: [Budget Range]
 
If you have the bandwidth and are interested in collaborating, we'd love to see your current media kit or rate card to discuss the next steps.
 
Looking forward to potentially working together!
 
Best regards,
[Your Name]
[Your Title]
[Brand Name]
[Website Link]`;
 
  const mailtoHref =
    `mailto:${MAILTO_ADDRESS}` +
    `?subject=${encodeURIComponent(MAIL_SUBJECT)}` +
    `&body=${encodeURIComponent(MAIL_BODY)}`;
 
  const briefBtn = document.getElementById('briefBtn');
  const contactEmail = document.getElementById('contactEmail');
  briefBtn.href = mailtoHref;
  contactEmail.href = mailtoHref;
  contactEmail.textContent = MAILTO_ADDRESS;
 
  // ---- Language toggle (in-memory only) ----
  const translations = {
    'nav.about': {en:'About', fr:'À propos'},
    'nav.work': {en:'Work', fr:'Travaux'},
    'nav.services': {en:'Services', fr:'Services'},
    'nav.contact': {en:'Contact', fr:'Contact'},
 
    'hero.eyebrow': {en:'↳ render output', fr:'↳ résultat affiché'},
    'hero.tagline': {en:"I create engaging, authentic tech content that showcases products through hands-on tutorials, product walkthroughs, real-world demos, and honest reviews — helping audiences understand, trust, and use them confidently.",
                     fr:"Je crée du contenu technique attrayant et authentique qui présente les produits à travers des tutoriels pratiques, des présentations de produits, des démonstrations en situation réelle et des avis honnêtes, aidant ainsi le public à les comprendre, à leur faire confiance et à les utiliser en toute confiance."},
    'hero.badge1': {en:'Technical UGC', fr:'Contenu technique'},
    'hero.badge2': {en:'Dev Tools & SaaS', fr:'Outils dev & SaaS'},
    'hero.badge3': {en:'Available for briefs', fr:'Disponible pour vos projets'},
    'hero.typeHint': {en:'click the name and type — backspace stops right at "GRACE"', fr:'cliquez sur le nom et écrivez — le retour arrière s\'arrête juste avant « GRACE »'},
 
    'about.eyebrow': {en:'about', fr:'à propos'},
    'about.title': {en:"Who's writing the code", fr:'Qui écrit le code'},
    'about.p1': {en:'Hi, I\'m Grace — a <span class="hl">frontend developer and technical content creator</span>. Instead of simply explaining a product\'s vibe. I explain how it actually works, because I\'ve shipped with these tools myself.',
                 fr:'Bonjour, je suis Grace — <span class="hl">développeuse front-end est créateur de contenu technique</span>. Au lieu de simplement décrire l\'ambiance d\'un produit. Moi, j\'explique comment il fonctionne vraiment, car j\'ai développé avec ces outils moi-même.'},
    'about.p2': {en:'My content covers <span class="hl">developer tools, SaaS products, and dev-facing platforms</span>: setup walkthroughs, honest first-impressions, "what I\'d change" breakdowns, and side-by-side comparisons your audience can trust because they came from real usage, not a script.',
                 fr:'Mon contenu couvre <span class="hl">les outils pour développeurs, les produits SaaS et les plateformes techniques</span> : prises en main, premières impressions honnêtes, analyses « ce que je changerais », et comparatifs auxquels votre audience peut faire confiance, car ils viennent d\'un usage réel, pas d\'un script.'},
    'about.p3': {en:'Every video or post is built the way I build software: <span class="hl">test it, break it, explain it clearly</span> — so the content holds up to a technical audience, not just a scroll.',
                 fr:'Chaque vidéo ou publication est construite comme je construis un logiciel : <span class="hl">le tester, le pousser à ses limites, l\'expliquer clairement</span> — pour que le contenu tienne face à une audience technique, pas seulement au scroll.'},
    'about.stat1': {en:'FOLLOWERS', fr:'ABONNÉS'},
    'about.stat2': {en:'VIEWS', fr:'VUES'},
    'about.stat3': {en:'BRAND DEMOS', fr:'DÉMOS DE MARQUE'},
 
    'work.eyebrow': {en:'work', fr:'travaux'},
    'work.title': {en:'Sample clips from past briefs', fr:'Extraits de précédentes collaborations'},
    'work.intro': {en:'A quick look at format and pacing — swap these for your real portfolio cuts.', fr:"Un aperçu du format et du rythme — à remplacer par vos propres montages."},
 
    'explainer.title': {en:'What technical UGC actually is', fr:'Ce qu\'est vraiment le contenu technique'},
    'diff.rem1': {en:'A generic creator reading your landing page copy on camera.', fr:'Un créateur générique qui lit le texte de votre page d\'accueil face caméra.'},
    'diff.rem2': {en:'Vague praise: <b>"this tool is so easy to use!"</b>', fr:'Des éloges vagues : <b>« cet outil est tellement facile à utiliser ! »</b>'},
    'diff.add1': {en:'A developer actually installing, configuring, and using your product on screen.', fr:'Un développeur qui installe, configure et utilise réellement votre produit à l\'écran.'},
    'diff.add2': {en:'Specific, credible detail: <b>setup time, edge cases, real errors, and fixes.</b>', fr:'Des détails précis et crédibles : <b>temps d\'installation, cas limites, vraies erreurs et solutions.</b>'},
    'diff.add3': {en:'Content technical audiences actually trust — because it holds up under questions.', fr:'Un contenu auquel les audiences techniques font vraiment confiance — car il résiste aux questions.'},
    'ugc.p1': {en:'Technical UGC is developer-made content — demos, reviews, and tutorials — created by someone who understands the product at the code level, not just the marketing page.',
               fr:'Le contenu technique généré par un créateur, ce sont des démos, avis et tutoriels réalisés par quelqu\'un qui comprend le produit au niveau du code, pas seulement de sa page marketing.'},
    'ugc.p2': {en:'For dev tools and SaaS brands, that distinction is the difference between a video that gets skipped and one that gets bookmarked, shared in Slack, and cited in a comment thread.',
               fr:'Pour les marques d\'outils dev et de SaaS, cette différence sépare une vidéo qu\'on passe d\'une vidéo qu\'on enregistre, qu\'on partage sur Slack et qu\'on cite en commentaire.'},
 
    'services.eyebrow': {en:'services', fr:'services'},
    'services.title': {en:'How I can help your product', fr:'Comment je peux aider votre produit'},
    'svc1.h3': {en:'Product walkthroughs', fr:'Démonstrations produit'},
    'svc1.p': {en:'Real setup-to-first-win demos that show your product doing what it claims, no staged screens.', fr:'De vraies démos, de l\'installation au premier résultat, montrant que votre produit tient ses promesses — sans mise en scène.'},
    'svc2.h3': {en:'Hands-on reviews', fr:'Avis basés sur l\'usage réel'},
    'svc2.p': {en:'Credible, developer-voiced reviews that weigh trade-offs — the kind that convert a skeptical audience.', fr:'Des avis crédibles, formulés par une développeuse, qui pèsent le pour et le contre — le genre qui convainc une audience sceptique.'},
    'svc3.h3': {en:'Tutorials & explainers', fr:'Tutoriels & explications'},
    'svc3.p': {en:'Short-form or long-form tutorials that turn your docs into content people actually finish.', fr:'Des tutoriels courts ou longs qui transforment votre documentation en contenu que les gens regardent jusqu\'au bout.'},
 
    'contact.title': {en:"Let's ship something worth watching.", fr:'Créons un contenu qui mérite d\'être regardé.'},
    'contact.p': {en:"Send over your product and audience, and I'll put together a content plan built for developers.", fr:'Partagez votre produit et votre audience, et je vous prépare un plan de contenu pensé pour les développeurs.'},
    'contact.btn': {en:'Start a brief →', fr:'Démarrer un projet →'},
 
    'footer.text': {en:'© 2026 Grace — Technical UGC', fr:'© 2026 Grace — Contenu technique'},
    'footer.stack': {en:'Built with React · TypeScript · Vite', fr:'Développé avec React · TypeScript · Vite'},
  };
 
  const langBtn = document.getElementById('langToggle');
  let lang = 'en';
  function applyLang(l){
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[key]) el.innerHTML = translations[key][l];
    });
    document.documentElement.setAttribute('lang', l);
    langBtn.textContent = l === 'en' ? 'FR' : 'EN';
  }
  langBtn.addEventListener('click', () => {
    lang = lang === 'en' ? 'fr' : 'en';
    applyLang(lang);
  });