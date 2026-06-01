
/* =====================================================
   All content is loaded from config.json
   Edit via /admin.html — no code changes needed!
   ===================================================== */
const GITHUB_REPO = "AlainGhawi/flammastona"; // e.g. "john/flammastona"
let WHATSAPP_NUMBER = "96176909986";
let SOCIAL = {instagram:"https://instagram.com/flammastona",facebook:"https://facebook.com/flammastona",tiktok:"https://tiktok.com/@flammastona"};
let PRODUCTS = [{id:1,categoryId:1,scentsEnabled:false,scents:[],colors:[],img:"",tag:{en:"Bestseller",fr:"Best-seller",ar:"الأكثر مبيعاً"},name:{en:"Amber Ember",fr:"Braise d'Ambre",ar:"جمر العنبر"},scent:{en:"Amber · Vanilla",fr:"Ambre · Vanille",ar:"عنبر · فانيليا"},desc:{en:"A warm, golden glow with soft notes of vanilla and amber.",fr:"Une lueur dorée et chaleureuse aux notes douces de vanille et d'ambre.",ar:"وهجٌ ذهبيٌّ دافئ بلمسات ناعمة من الفانيليا والعنبر."},priceUsd:18,priceLbp:"1,600,000"},{id:2,categoryId:1,scentsEnabled:false,scents:[],colors:[],img:"",tag:null,name:{en:"Cedar Hush",fr:"Murmure de Cèdre",ar:"همس الأرز"},scent:{en:"Cedar · Sage",fr:"Cèdre · Sauge",ar:"أرز · مريمية"},desc:{en:"Grounding woody notes inspired by Lebanon's mountains.",fr:"Des notes boisées apaisantes inspirées des montagnes du Liban.",ar:"روائح خشبية هادئة مستوحاة من جبال لبنان."},priceUsd:20,priceLbp:"1,790,000"},{id:3,categoryId:1,scentsEnabled:false,scents:[],colors:[],img:"",tag:{en:"New",fr:"Nouveau",ar:"جديد"},name:{en:"Orange Blossom",fr:"Fleur d'Oranger",ar:"زهر البرتقال"},scent:{en:"Neroli · Citrus",fr:"Néroli · Agrumes",ar:"نيرولي · حمضيات"},desc:{en:"Bright and fresh, like a Mediterranean spring morning.",fr:"Vif et frais, comme un matin de printemps méditerranéen.",ar:"منعشٌ ومشرق كصباح ربيعي متوسطي."},priceUsd:18,priceLbp:"1,600,000"},{id:4,categoryId:1,scentsEnabled:false,scents:[],colors:[],img:"",tag:null,name:{en:"Fig & Olive",fr:"Figue & Olive",ar:"تين وزيتون"},scent:{en:"Fig · Green Olive",fr:"Figue · Olive verte",ar:"تين · زيتون أخضر"},desc:{en:"A lush, fruity scent rooted in the Levantine garden.",fr:"Un parfum fruité et généreux ancré dans le jardin levantin.",ar:"عطرٌ فاكهيٌّ غنيّ من قلب الحديقة الشامية."},priceUsd:22,priceLbp:"1,960,000"},{id:5,categoryId:1,scentsEnabled:false,scents:[],colors:[],img:"",tag:null,name:{en:"Rose Damascena",fr:"Rose de Damas",ar:"الورد الدمشقي"},scent:{en:"Damask Rose",fr:"Rose de Damas",ar:"ورد دمشقي"},desc:{en:"Delicate and romantic, a classic rose poured by hand.",fr:"Délicate et romantique, une rose classique coulée à la main.",ar:"رقيقةٌ ورومانسية، وردةٌ كلاسيكية مصبوبة يدوياً."},priceUsd:24,priceLbp:"2,140,000"},{id:6,categoryId:1,scentsEnabled:false,scents:[],colors:[],img:"",tag:{en:"Limited",fr:"Édition limitée",ar:"إصدار محدود"},name:{en:"Midnight Oud",fr:"Oud de Minuit",ar:"عود منتصف الليل"},scent:{en:"Oud · Spice",fr:"Oud · Épices",ar:"عود · توابل"},desc:{en:"Deep, smoky and luxurious for slow evenings.",fr:"Profond, fumé et luxueux pour les longues soirées.",ar:"عميقٌ ودخانيٌّ وفاخر لأمسياتٍ هادئة."},priceUsd:28,priceLbp:"2,500,000"}];
let I18N = {en:{nav_products:"Collection",nav_about:"Our Story",nav_contact:"Contact",hero_eyebrow:"Handcrafted in Lebanon",hero_title:"Light that feels <em>like home</em>",hero_sub:"Slow-poured candles made in small batches, with natural wax and scents that linger gently.",hero_cta1:"Explore the collection",hero_cta2:"Order on WhatsApp",hero_made:"Currently shipping within Lebanon",prod_eyebrow:"The Collection",prod_title:"Choose your glow",about_eyebrow:"Our Story",about_title:"Made by hand, poured with patience",about_p1:"Flammastona began as a small passion in Lebanon — a love for warm light, calm evenings, and scents that turn a room into a refuge.",about_p2:"Every candle is poured in small batches, so each one carries a little care you can feel the moment it's lit.",foot_tag:"Handcrafted candles, poured with love in Lebanon.",foot_reach:"Reach Us",foot_email:"hello@flammastona.com",foot_loc:"Based in Lebanon",foot_rights:"All rights reserved.",order:"Order",priceNote:"approx. price",add:"Add",cart_title:"Your Order",cart_total:"Total",cart_send:"Send order on WhatsApp",cart_empty:"Your cart is empty. Add a candle to get started.",cart_added:"Added",scent_pick:"Choose your scents (up to 3)",scent_max:"Max 3 scents reached",color_pick:"Choose a color",cat_all:"All",cat_other:"Other"},fr:{nav_products:"Collection",nav_about:"Notre Histoire",nav_contact:"Contact",hero_eyebrow:"Fabriqué à la main au Liban",hero_title:"Une lumière qui a un <em>air de maison</em>",hero_sub:"Bougies coulées lentement en petites quantités, avec une cire naturelle et des parfums qui s'attardent doucement.",hero_cta1:"Découvrir la collection",hero_cta2:"Commander sur WhatsApp",hero_made:"Livraison actuellement au Liban",prod_eyebrow:"La Collection",prod_title:"Choisissez votre lueur",about_eyebrow:"Notre Histoire",about_title:"Fait main, coulé avec patience",about_p1:"Flammastona est née d'une petite passion au Liban — l'amour de la lumière chaude, des soirées calmes et des parfums qui transforment une pièce en refuge.",about_p2:"Chaque bougie est coulée en petites quantités, portant un soin que l'on ressent dès qu'elle est allumée.",foot_tag:"Bougies artisanales, coulées avec amour au Liban.",foot_reach:"Nous contacter",foot_email:"hello@flammastona.com",foot_loc:"Basé au Liban",foot_rights:"Tous droits réservés.",order:"Commander",priceNote:"prix approx.",add:"Ajouter",cart_title:"Votre Commande",cart_total:"Total",cart_send:"Envoyer la commande sur WhatsApp",cart_empty:"Votre panier est vide. Ajoutez une bougie pour commencer.",cart_added:"Ajouté",scent_pick:"Choisissez vos parfums (jusqu'à 3)",scent_max:"Maximum 3 parfums atteint",color_pick:"Choisissez une couleur",cat_all:"Tout",cat_other:"Autre"},ar:{nav_products:"المجموعة",nav_about:"قصتنا",nav_contact:"تواصل",hero_eyebrow:"صناعة يدوية في لبنان",hero_title:"ضوءٌ يشبه <em>الدفء في البيت</em>",hero_sub:"شموعٌ مصبوبة بعنايةٍ على دفعاتٍ صغيرة، بشمعٍ طبيعيّ وروائح تبقى بلطف.",hero_cta1:"استكشف المجموعة",hero_cta2:"اطلب عبر واتساب",hero_made:"التوصيل حالياً داخل لبنان",prod_eyebrow:"المجموعة",prod_title:"اختر وهجك",about_eyebrow:"قصتنا",about_title:"صناعة يدوية، مصبوبة بصبر",about_p1:"بدأت فلاماستونا كشغفٍ صغير في لبنان — حبٌّ للضوء الدافئ والأمسيات الهادئة وروائح تحوّل الغرفة إلى ملاذ.",about_p2:"كل شمعة تُصبّ على دفعاتٍ صغيرة، فتحمل لمسةً من العناية تشعر بها لحظة إشعالها.",foot_tag:"شموعٌ مصنوعة يدوياً، مصبوبة بحبٍّ في لبنان.",foot_reach:"تواصل معنا",foot_email:"hello@flammastona.com",foot_loc:"مقرّنا في لبنان",foot_rights:"جميع الحقوق محفوظة.",order:"اطلب",priceNote:"السعر تقريبي",add:"أضف",cart_title:"طلبك",cart_total:"المجموع",cart_send:"أرسل الطلب عبر واتساب",cart_empty:"سلتك فارغة. أضف شمعة للبدء.",cart_added:"تمت الإضافة",scent_pick:"اختر عطورك (حتى 3)",scent_max:"وصلت للحد الأقصى (3 عطور)",color_pick:"اختر اللون",cat_all:"الكل",cat_other:"أخرى"}};
let lang = "en";
let CATEGORIES = [{id:1,name:{en:"Candles",fr:"Bougies",ar:"شموع"}},{id:2,name:{en:"Crystal",fr:"Crystal",ar:"كريستال"}}];
let activeCategory = null;
let productSelections = {}; // { productId: { colorId: number|null, scentIds: number[] } }

async function loadConfig(){
  // Read config.json directly from GitHub — updates instantly when published
  const GITHUB_RAW = "https://raw.githubusercontent.com/" + GITHUB_REPO + "/main/config.json";
  try {
    const r = await fetch(GITHUB_RAW + "?t=" + Date.now());
    if(r.ok){ applyConfig(await r.json()); return; }
  } catch(e){}
  // fallback — inline defaults already set above
}

function applyConfig(cfg){
  if(cfg.whatsapp) WHATSAPP_NUMBER = cfg.whatsapp;
  if(cfg.social) SOCIAL = cfg.social;
  if(cfg.i18n) I18N = cfg.i18n;
  if(cfg.categories) CATEGORIES = cfg.categories;
  if(cfg.products){
    PRODUCTS = cfg.products.map(p=>Object.assign(
      {categoryId:null,scentsEnabled:false,scents:[],colors:[]}, p
    ));
  }
}

const phSvg = `<div class="ph"><svg viewBox="0 0 120 140" fill="none"><path d="M60 6C60 6 22 48 22 90a38 38 0 0 0 76 0c0-22-18-34-18-52 0 14-9 18-13 18 0-18-7-34-7-50Z" fill="url(#cg)"/><defs><radialGradient id="cg" cx="50%" cy="60%" r="60%"><stop stop-color="#fff3d6"/><stop offset="45%" stop-color="#e0a94f"/><stop offset="100%" stop-color="#d4582b"/></radialGradient></defs></svg></div>`;

function lbpNumber(str){ return parseInt(String(str).replace(/[^0-9]/g,""))||0; }
function fmt(n){ return n.toLocaleString("en-US"); }

const plusIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>`;
const waIcon = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.48 1.34 5L2 22l5.18-1.36a9.93 9.93 0 0 0 4.86 1.24c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2Zm4.54 11.97c-.25-.13-1.47-.73-1.7-.81-.23-.08-.4-.13-.56.13-.17.25-.64.8-.79.97-.14.16-.29.18-.54.06-.25-.13-1.05-.39-2-1.23-.74-.66-1.24-1.48-1.38-1.73-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.13-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.42-.14-.01-.31-.01-.48-.01-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.13.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.1-.23-.16-.48-.29Z"/></svg>`;

/* ===== CART ===== */
let cart = {};  // {productId: qty}

function addToCart(id){
  cart[id] = (cart[id]||0) + 1;
  renderCart();
  openCart();
}
function changeQty(id, delta){
  cart[id] = (cart[id]||0) + delta;
  if(cart[id] <= 0) delete cart[id];
  renderCart();
}
function cartCountTotal(){ return Object.values(cart).reduce((a,b)=>a+b,0); }

function renderCart(){
  const t = I18N[lang];
  const itemsEl = document.getElementById("cartItems");
  const ids = Object.keys(cart);
  let usd = 0, lbp = 0;

  if(ids.length === 0){
    itemsEl.innerHTML = `<div class="cart-empty">${t.cart_empty}</div>`;
  } else {
    itemsEl.innerHTML = ids.map(id=>{
      const p = PRODUCTS.find(x=>x.id==id);
      const q = cart[id];
      usd += p.priceUsd * q;
      lbp += lbpNumber(p.priceLbp) * q;
      const sel = productSelections[+id];
      let selParts = [`$${p.priceUsd}`];
      if(sel && sel.colorId && p.colors && p.colors.length > 0){
        const c = p.colors.find(x=>x.id===sel.colorId);
        if(c && c.label) selParts.push(c.label[lang]||c.label.en);
      }
      if(sel && sel.scentIds && sel.scentIds.length > 0 && p.scents){
        const names = sel.scentIds.map(sid=>{ const s=p.scents.find(x=>x.id===sid); return s?(s.name[lang]||s.name.en):""; }).filter(Boolean);
        if(names.length > 0) selParts.push(names.join(", "));
      }
      return `<div class="ci">
        <div class="ci-info">
          <div class="n">${p.name[lang]}</div>
          <div class="p">${selParts.join(" · ")}</div>
        </div>
        <div class="qty">
          <button onclick="changeQty(${id},-1)" aria-label="-">−</button>
          <span>${q}</span>
          <button onclick="changeQty(${id},1)" aria-label="+">+</button>
        </div>
      </div>`;
    }).join("");
  }

  document.getElementById("cartTotal").textContent = usd;
  document.getElementById("cartTotalLbp").textContent = fmt(lbp) + " LBP";

  const count = cartCountTotal();
  const badge = document.getElementById("cartCount");
  badge.textContent = count;
  badge.classList.toggle("hide", count === 0);

  const sendBtn = document.getElementById("cartSend");
  if(count === 0){
    sendBtn.style.pointerEvents = "none";
    sendBtn.style.opacity = ".5";
    sendBtn.href = "#";
  } else {
    sendBtn.style.pointerEvents = "auto";
    sendBtn.style.opacity = "1";
    sendBtn.href = buildOrderLink(usd, lbp);
  }
}

function buildOrderLink(usd, lbp){
  const lines = Object.keys(cart).map(id=>{
    const p = PRODUCTS.find(x=>x.id==id);
    const q = cart[id];
    const sel = productSelections[+id];
    const extras = [];
    if(sel && sel.colorId && p.colors && p.colors.length > 0){
      const c = p.colors.find(x=>x.id===sel.colorId);
      if(c && c.label) extras.push(c.label[lang]||c.label.en);
    }
    if(sel && sel.scentIds && sel.scentIds.length > 0 && p.scents){
      const names = sel.scentIds.map(sid=>{ const s=p.scents.find(x=>x.id===sid); return s?(s.name[lang]||s.name.en):""; }).filter(Boolean);
      if(names.length > 0) extras.push(names.join(", "));
    }
    const extrasStr = extras.length > 0 ? ` (${extras.join(" — ")})` : "";
    return `• ${q} × ${p.name[lang]}${extrasStr} ($${p.priceUsd} ${lang==="ar"?"للقطعة":lang==="fr"?"l'unité":"each"})`;
  }).join("\n");

  const header = lang==="ar"
    ? "مرحباً Flammastona! أودّ طلب الشموع التالية:"
    : lang==="fr"
    ? "Bonjour Flammastona ! Je souhaite commander les bougies suivantes :"
    : "Hi Flammastona! I'd like to order the following candles:";
  const totalLine = lang==="ar"
    ? `\n\nالمجموع: $${usd} (${fmt(lbp)} ل.ل تقريباً)`
    : lang==="fr"
    ? `\n\nTotal : $${usd} (env. ${fmt(lbp)} LBP)`
    : `\n\nTotal: $${usd} (approx. ${fmt(lbp)} LBP)`;

  const msg = `${header}\n${lines}${totalLine}`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

function openCart(){
  document.getElementById("cartPanel").classList.add("open");
  document.getElementById("cartOverlay").classList.add("open");
}
function closeCart(){
  document.getElementById("cartPanel").classList.remove("open");
  document.getElementById("cartOverlay").classList.remove("open");
}

function initSelections(p){
  if(!productSelections[p.id]){
    productSelections[p.id] = {
      colorId: (p.colors && p.colors.length > 0) ? p.colors[0].id : null,
      scentIds: []
    };
  } else if(!productSelections[p.id].colorId && p.colors && p.colors.length > 0){
    productSelections[p.id].colorId = p.colors[0].id;
  }
}
function getProductImg(p, colorId){
  if(colorId && p.colors){
    const c = p.colors.find(x=>x.id===colorId);
    if(c && c.img) return c.img;
  }
  return p.img || "";
}
function selectColor(productId, colorId){
  if(!productSelections[productId]) productSelections[productId]={colorId:null,scentIds:[]};
  productSelections[productId].colorId = colorId;
  renderProducts();
}
function toggleScent(productId, scentId){
  if(!productSelections[productId]) productSelections[productId]={colorId:null,scentIds:[]};
  const sel = productSelections[productId];
  const idx = sel.scentIds.indexOf(scentId);
  if(idx>=0){ sel.scentIds.splice(idx,1); }
  else { if(sel.scentIds.length>=3) return; sel.scentIds.push(scentId); }
  renderProducts();
}
function setCategoryFilter(id){
  activeCategory = id;
  renderProducts();
}

function renderProductCard(p, t){
  initSelections(p);
  const sel = productSelections[p.id];
  const imgSrc = getProductImg(p, sel.colorId);
  const imgHtml = imgSrc
    ? `<img src="${imgSrc}" alt="${p.name[lang]}" style="width:100%;height:100%;object-fit:cover">`
    : phSvg;
  const tag = p.tag ? `<span class="tag">${p.tag[lang]}</span>` : "";

  let colorsHtml = "";
  if(p.colors && p.colors.length > 0){
    colorsHtml = `<div class="prod-colors">
      <div class="prod-option-label">${t.color_pick||"Choose a color"}</div>
      <div class="color-swatches">
        ${p.colors.map(c=>`<button class="color-dot${sel.colorId===c.id?" active":""}" style="background:${c.hex||"#888"}" onclick="selectColor(${p.id},${c.id})" title="${(c.label&&(c.label[lang]||c.label.en))||""}" aria-label="${(c.label&&(c.label[lang]||c.label.en))||""}"></button>`).join("")}
      </div>
    </div>`;
  }

  let scentsHtml = "";
  if(p.scentsEnabled && p.scents && p.scents.length > 0){
    const maxReached = sel.scentIds.length >= 3;
    scentsHtml = `<div class="prod-scents">
      <div class="prod-option-label">${t.scent_pick||"Choose your scents (up to 3)"}</div>
      <div class="scent-pills">
        ${p.scents.map(s=>{
          const isActive = sel.scentIds.includes(s.id);
          const isDisabled = maxReached && !isActive;
          return `<button class="scent-pill${isActive?" active":""}${isDisabled?" disabled":""}" onclick="toggleScent(${p.id},${s.id})"${isDisabled?" disabled":""}>${(s.name&&(s.name[lang]||s.name.en))||""}</button>`;
        }).join("")}
      </div>
      ${maxReached?`<div class="scent-max-note">${t.scent_max||"Max 3 scents reached"}</div>`:""}
    </div>`;
  }

  return `<article class="card reveal">
    <div class="img" style="background:radial-gradient(circle at 50% 40%,#3a2a1c,#241812)">${imgHtml}${tag}</div>
    <div class="body">
      <h3>${p.name[lang]}</h3>
      <div class="scent">${p.scent[lang]}</div>
      ${colorsHtml}
      ${scentsHtml}
      <p class="desc">${p.desc[lang]}</p>
      <div class="row">
        <div class="price">$${p.priceUsd}<small>${p.priceLbp} LBP · ${t.priceNote}</small></div>
        <button class="add" onclick="addToCart(${p.id})">${plusIcon}${t.add}</button>
      </div>
    </div>
  </article>`;
}

function renderProducts(){
  const grid = document.getElementById("grid");
  const filterEl = document.getElementById("catFilter");
  const t = I18N[lang] || I18N.en;

  // Filter bar
  if(CATEGORIES.length > 0){
    const allActive = activeCategory === null;
    filterEl.innerHTML = `<div class="cat-filter-bar">
      <button class="cat-filter-pill${allActive?" active":""}" onclick="setCategoryFilter(null)">${t.cat_all||"All"}</button>
      ${CATEGORIES.map(c=>`<button class="cat-filter-pill${activeCategory===c.id?" active":""}" onclick="setCategoryFilter(${c.id})">${c.name[lang]||c.name.en}</button>`).join("")}
    </div>`;
  } else {
    filterEl.innerHTML = "";
  }

  // Build category -> products map
  const catMap = new Map();
  PRODUCTS.forEach(p=>{
    const cid = p.categoryId || null;
    if(!catMap.has(cid)) catMap.set(cid,[]);
    catMap.get(cid).push(p);
  });

  let html = "";
  if(activeCategory === null){
    // All: grouped sections
    CATEGORIES.forEach(cat=>{
      const prods = catMap.get(cat.id);
      if(!prods || prods.length === 0) return;
      if(CATEGORIES.length > 1){
        html += `<div class="cat-heading">${cat.name[lang]||cat.name.en}</div>`;
      }
      html += prods.map(p=>renderProductCard(p,t)).join("");
    });
    // Uncategorised fallback
    const other = catMap.get(null)||[];
    if(other.length > 0){
      // Only show "Other" heading if at least one named category also has products
      const anyInCategories = CATEGORIES.some(c=>(catMap.get(c.id)||[]).length>0);
      if(CATEGORIES.length > 0 && anyInCategories){
        html += `<div class="cat-heading">${t.cat_other||"Other"}</div>`;
      }
      html += other.map(p=>renderProductCard(p,t)).join("");
    }
  } else {
    const prods = catMap.get(activeCategory)||[];
    html = prods.length > 0
      ? prods.map(p=>renderProductCard(p,t)).join("")
      : `<div style="grid-column:1/-1;text-align:center;color:var(--ink-soft);padding:60px 20px;font-size:1.1rem">No products in this category yet.</div>`;
  }

  grid.innerHTML = html;
  observeReveals();
}

function applyLang(l){
  lang = l;
  const t = I18N[l];
  document.body.className = "lang-"+l;
  document.documentElement.lang = l;
  document.documentElement.dir = (l==="ar") ? "rtl" : "ltr";
  document.querySelectorAll("[data-i18n]").forEach(el=>{
    const k = el.getAttribute("data-i18n");
    if(t[k]!==undefined) el.innerHTML = t[k];
  });
  document.querySelectorAll(".lang button").forEach(b=>b.classList.toggle("active",b.dataset.lang===l));
  document.getElementById("heroWa").href = `https://wa.me/${WHATSAPP_NUMBER}`;
  document.getElementById("footWa").href = `https://wa.me/${WHATSAPP_NUMBER}`;
  renderProducts();
  renderCart();
}

/* reveal on scroll */
let io;
function observeReveals(){
  if(io) io.disconnect();
  io = new IntersectionObserver(entries=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target);} });
  },{threshold:.12});
  document.querySelectorAll(".reveal:not(.in)").forEach(el=>io.observe(el));
}

/* init — load config then boot */
loadConfig().then(()=>{
  /* social links */
  document.getElementById("s-ig").href = SOCIAL.instagram||"#";
  document.getElementById("s-fb").href = SOCIAL.facebook||"#";
  document.getElementById("s-tt").href = SOCIAL.tiktok||"#";
  document.getElementById("s-wa").href = `https://wa.me/${WHATSAPP_NUMBER}`;
  document.getElementById("yr").textContent = new Date().getFullYear();

  /* lang buttons */
  document.querySelectorAll(".lang button").forEach(b=>{
    b.addEventListener("click",()=>applyLang(b.dataset.lang));
  });

  /* mobile menu */
  const nav = document.getElementById("nav");
  document.getElementById("menuBtn").addEventListener("click",()=>nav.classList.toggle("open"));
  nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

  /* cart events */
  document.getElementById("cartBtn").addEventListener("click",openCart);
  document.getElementById("cartClose").addEventListener("click",closeCart);
  document.getElementById("cartOverlay").addEventListener("click",closeCart);

  applyLang("en");
});
