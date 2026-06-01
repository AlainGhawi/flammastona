
// ============================================================
// CONFIG — loaded from config.json, editable in memory
// ============================================================
let CONFIG = null;
let SESSION_TOKEN = null; // set after successful server-side login

// ---- LOGIN ----
document.getElementById("pwInput").addEventListener("keydown", e=>{ if(e.key==="Enter") doLogin(); });
async function doLogin(){
  const btn = document.querySelector(".login-box button");
  const errEl = document.getElementById("loginErr");
  const pw = document.getElementById("pwInput").value;
  btn.textContent = "Checking…";
  btn.disabled = true;
  errEl.style.display = "none";
  try {
    const resp = await fetch("/api/login", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({ password: pw })
    });
    const data = await resp.json();
    if(data.ok){
      SESSION_TOKEN = data.token;
      document.getElementById("loginScreen").style.display = "none";
      document.getElementById("app").style.display = "block";
      if(window.innerWidth <= 760) document.getElementById("mobileNav").style.display = "block";
      initApp();
    } else {
      errEl.textContent = "Incorrect password. Please try again.";
      errEl.style.display = "block";
    }
  } catch(e){
    errEl.textContent = "Could not reach server. Are you running netlify dev?";
    errEl.style.display = "block";
  }
  btn.textContent = "Sign In";
  btn.disabled = false;
}
function doLogout(){
  SESSION_TOKEN = null;
  document.getElementById("loginScreen").style.display = "flex";
  document.getElementById("app").style.display = "none";
  document.getElementById("mobileNav").style.display = "none";
  document.getElementById("pwInput").value = "";
}
function setMnav(btn){
  document.querySelectorAll(".mnav-btn").forEach(b=>b.classList.remove("active"));
  btn.classList.add("active");
}

// ---- INIT ----
async function initApp(){
  // Try Netlify Blobs first (live published config), then config.json, then defaults
  let loaded = false;
  try {
    const r = await fetch("/api/load");
    if(r.ok){ CONFIG = await r.json(); loaded = true; }
  } catch(e){}

  if(!loaded){
    try {
      const r = await fetch("config.json?t=" + Date.now());
      if(r.ok){ CONFIG = await r.json(); loaded = true; }
    } catch(e){}
  }

  if(!loaded){
    CONFIG = getDefaultConfig();
    showStatus("Using built-in defaults");
  }

  // Merge any unsaved local draft on top
  const local = localStorage.getItem("flamma_config_draft");
  if(local){ try{ CONFIG = JSON.parse(local); }catch(e){} }
  renderAll();
}

function saveDraft(){
  localStorage.setItem("flamma_config_draft", JSON.stringify(CONFIG));
}

async function publishConfig(){
  const btn = document.getElementById("publishBtn");
  const statusEl = document.getElementById("publishStatus");
  btn.disabled = true;
  btn.textContent = "Publishing…";
  statusEl.style.display = "none";
  try {
    const resp = await fetch("/api/save", {
      method: "POST",
      headers: {"Content-Type":"application/json","x-session-token": SESSION_TOKEN||""},
      body: JSON.stringify({ config: CONFIG })
    });
    const data = await resp.json();
    if(data.ok){
      localStorage.removeItem("flamma_config_draft");
      btn.textContent = "✓ Published!";
      btn.style.background = "var(--amber-deep)";
      statusEl.textContent = "Your site is now live with the latest changes.";
      statusEl.style.color = "var(--green)";
      statusEl.style.display = "block";
      showToast("success", "Changes published!", "Your site is now live. Visitors will see the updates immediately.", 6000);
      setTimeout(()=>{
        btn.textContent = "🚀 Publish changes";
        btn.style.background = "";
        btn.disabled = false;
      }, 3000);
    } else {
      throw new Error(data.error || "Server returned an error");
    }
  } catch(e){
    btn.textContent = "🚀 Publish changes";
    btn.disabled = false;
    statusEl.style.display = "none";
    showToast("error", "Publish failed", "Something went wrong. Please try again or contact your developer. (" + e.message + ")", 0);
  }
}
let toastTimer = null;
function showToast(type, title, msg, dur=4000){
  // type: 'success' | 'error' | 'info'
  const icons = {success:"✓", error:"✕", info:"ℹ"};
  const toast = document.getElementById("toast");
  toast.className = "toast " + type;
  document.getElementById("toastIcon").textContent = icons[type]||"ℹ";
  document.getElementById("toastTitle").textContent = title;
  document.getElementById("toastMsg").textContent = msg;
  toast.classList.add("show");
  if(toastTimer) clearTimeout(toastTimer);
  if(dur > 0) toastTimer = setTimeout(hideToast, dur);
}
function hideToast(){
  document.getElementById("toast").classList.remove("show");
}
// Keep showStatus as a simple wrapper for internal calls
function showStatus(msg){ showToast("info", msg, ""); }

// Show/hide mobile nav on resize
window.addEventListener("resize", ()=>{
  if(!SESSION_TOKEN) return;
  document.getElementById("mobileNav").style.display = window.innerWidth <= 760 ? "block" : "none";
});

// ---- PAGE NAV ----
function showPage(id){
  document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
  document.getElementById("page-"+id).classList.add("active");
  document.querySelectorAll(".sidebar-btn").forEach(b=>b.classList.remove("active"));
  event.target.classList.add("active");
  if(id==="categories") renderCategories();
  if(id==="products") renderProducts();
  if(id==="texts") renderTexts();
  if(id==="settings") renderSettings();
}

// ---- RENDER ALL ----
function renderAll(){
  renderCategories();
  renderProducts();
  renderSettings();
}

// ============================================================
// PRODUCTS
// ============================================================
const LANGS = ["en","fr","ar"];
let activeProdLang = {}; // productId -> active lang tab

function renderProducts(){
  const grid = document.getElementById("productsGrid");
  const flameSvg = `<div class="prod-thumb-flame"><svg viewBox="0 0 120 140" fill="none"><path d="M60 6C60 6 22 48 22 90a38 38 0 0 0 76 0c0-22-18-34-18-52 0 14-9 18-13 18 0-18-7-34-7-50Z" fill="url(#cg2)"/><defs><radialGradient id="cg2" cx="50%" cy="60%" r="60%"><stop stop-color="#fff3d6"/><stop offset="45%" stop-color="#e0a94f"/><stop offset="100%" stop-color="#d4582b"/></radialGradient></defs></svg></div>`;

  grid.innerHTML = CONFIG.products.map((p)=>{
    if(!activeProdLang[p.id]) activeProdLang[p.id] = "en";
    const al = activeProdLang[p.id];
    const tabs = LANGS.map(l=>`<button class="field-tab${al===l?" active":""}" onclick="setProdLang(${p.id},'${l}')">${l.toUpperCase()}</button>`).join("");
    const thumb = p.img ? `<img src="${p.img}" onerror="this.style.display='none'" alt="">` : flameSvg;

    // Category dropdown
    const cats = CONFIG.categories||[];
    const catOptions = cats.map(c=>`<option value="${c.id}"${p.categoryId==c.id?" selected":""}>${c.name.en}</option>`).join("");

    // Scents section
    const scentsRows = (p.scentsEnabled && (p.scents||[]).length > 0)
      ? `<div class="sub-list">${(p.scents||[]).map(s=>`
          <div class="sub-row">
            <span class="sub-row-num">${s.id}</span>
            ${LANGS.map(l=>`<input class="field-input lang-input" placeholder="${l.toUpperCase()}" value="${(s.name[l]||"").replace(/"/g,"&quot;")}" oninput="updateScentName(${p.id},${s.id},'${l}',this.value)" title="${l.toUpperCase()} name">`).join("")}
            <button class="remove-btn" onclick="removeScent(${p.id},${s.id})" style="margin-left:0;flex-shrink:0">✕</button>
          </div>`).join("")}
          <button class="sub-row-add" onclick="addScent(${p.id})">+ Add scent</button>
        </div>`
      : p.scentsEnabled
        ? `<div class="sub-list"><button class="sub-row-add" onclick="addScent(${p.id})">+ Add scent</button></div>`
        : "";

    // Colors section
    const colorRows = (p.colors||[]).length > 0
      ? `<div class="sub-list">${(p.colors||[]).map(c=>`
          <div class="sub-row">
            <div class="color-swatch-btn" style="background:${c.hex||"#888"}">
              <input type="color" value="${c.hex||"#888888"}" oninput="updateColor(${p.id},${c.id},'hex',this.value);this.parentElement.style.background=this.value">
            </div>
            ${LANGS.map(l=>`<input class="field-input lang-input" placeholder="${l.toUpperCase()}" value="${(c.label[l]||"").replace(/"/g,"&quot;")}" oninput="updateColorLabel(${p.id},${c.id},'${l}',this.value)" title="${l.toUpperCase()} label">`).join("")}
            <input class="field-input img-input" placeholder="Image URL (optional)" value="${(c.img||"").replace(/"/g,"&quot;")}" oninput="updateColor(${p.id},${c.id},'img',this.value)">
            <button class="remove-btn" onclick="removeColor(${p.id},${c.id})" style="margin-left:0;flex-shrink:0">✕</button>
          </div>`).join("")}
          <button class="sub-row-add" onclick="addColor(${p.id})">+ Add color variant</button>
        </div>`
      : `<div class="sub-list"><button class="sub-row-add" onclick="addColor(${p.id})">+ Add color variant</button></div>`;

    return `<div class="prod-card" id="prodcard-${p.id}">
      <div class="prod-card-head">
        <div class="prod-thumb">${thumb}</div>
        <div style="flex:1">
          <div style="font-family:var(--serif);font-weight:500;font-size:1.1rem">${p.name[al]||p.name.en}</div>
          <div style="font-size:.88rem;color:var(--ink-soft)">${p.scent[al]||p.scent.en} · $${p.priceUsd}</div>
        </div>
        <button class="remove-btn" onclick="removeProduct(${p.id})">✕ Remove</button>
      </div>
      <div class="prod-card-body">
        <div class="field-group">
          <label>Category</label>
          <select class="field-input" onchange="updateProdCategory(${p.id},this.value)">
            <option value="">— Uncategorised —</option>
            ${catOptions}
          </select>
        </div>
        <div class="field-group">
          <label>Language</label>
          <div class="field-tabs">${tabs}</div>
        </div>
        <div class="field-group">
          <label>Name (${al.toUpperCase()})</label>
          <input class="field-input" value="${(p.name[al]||"").replace(/"/g,"&quot;")}" oninput="updateProd(${p.id},'name','${al}',this.value)">
        </div>
        <div class="field-group">
          <label>Display Scent (${al.toUpperCase()})</label>
          <input class="field-input" value="${(p.scent[al]||"").replace(/"/g,"&quot;")}" oninput="updateProd(${p.id},'scent','${al}',this.value)">
        </div>
        <div class="field-group">
          <label>Description (${al.toUpperCase()})</label>
          <textarea class="field-input" rows="2" oninput="updateProd(${p.id},'desc','${al}',this.value)">${p.desc[al]||""}</textarea>
        </div>
        <div class="field-group">
          <label>Badge/Tag (${al.toUpperCase()})</label>
          <input class="field-input" placeholder="e.g. Bestseller (leave empty for none)" value="${p.tag?p.tag[al]||"":""}" oninput="updateProdTag(${p.id},'${al}',this.value)">
        </div>
        <div class="price-row">
          <div class="field-group">
            <label>Price USD</label>
            <input class="field-input" type="number" value="${p.priceUsd}" oninput="updateProdDirect(${p.id},'priceUsd',+this.value)">
          </div>
          <div class="field-group">
            <label>Price LBP</label>
            <input class="field-input" value="${p.priceLbp}" oninput="updateProdDirect(${p.id},'priceLbp',this.value)">
          </div>
        </div>
        <div class="field-group">
          <label>Default Image URL (optional)</label>
          <div class="img-row">
            <input class="field-input" placeholder="https://… or leave empty for flame" value="${p.img||""}" oninput="updateProdDirect(${p.id},'img',this.value);updateImgPreview(${p.id},this.value)">
            <div class="img-preview" id="imgprev-${p.id}">${p.img?`<img src="${p.img}" alt="">`:""}</div>
          </div>
        </div>
        <div class="field-group">
          <label>Scent Selection</label>
          <label class="toggle-row">
            <input type="checkbox" ${p.scentsEnabled?"checked":""} onchange="toggleScentsEnabled(${p.id},this.checked)">
            <span>Enable scent picker for customers (max 3)</span>
          </label>
          ${scentsRows}
        </div>
        <div class="field-group">
          <label>Color Variants</label>
          ${colorRows}
        </div>
      </div>
    </div>`;
  }).join("");
}

function setProdLang(id, lang){
  activeProdLang[id] = lang;
  renderProducts();
}
function updateProd(id, field, lang, val){
  const p = CONFIG.products.find(x=>x.id==id);
  if(!p[field]) p[field] = {};
  p[field][lang] = val;
  saveDraft();
}
function updateProdDirect(id, field, val){
  const p = CONFIG.products.find(x=>x.id==id);
  p[field] = val;
  saveDraft();
}
function updateProdTag(id, lang, val){
  const p = CONFIG.products.find(x=>x.id==id);
  if(!p.tag) p.tag = {en:"",fr:"",ar:""};
  p.tag[lang] = val;
  if(!val && !p.tag.en && !p.tag.fr && !p.tag.ar) p.tag = null;
  saveDraft();
}
function updateImgPreview(id, url){
  const el = document.getElementById("imgprev-"+id);
  if(el) el.innerHTML = url ? `<img src="${url}" alt="" style="width:100%;height:100%;object-fit:cover">` : "";
}
function removeProduct(id){
  if(!confirm("Remove this product?")) return;
  CONFIG.products = CONFIG.products.filter(p=>p.id!=id);
  saveDraft();
  renderProducts();
}
function addProduct(){
  const maxId = Math.max(0,...CONFIG.products.map(p=>p.id));
  const firstCatId = (CONFIG.categories&&CONFIG.categories.length>0) ? CONFIG.categories[0].id : null;
  CONFIG.products.push({
    id: maxId+1, categoryId: firstCatId, img: "", tag: null,
    name:{en:"New Candle",fr:"Nouvelle Bougie",ar:"شمعة جديدة"},
    scent:{en:"Scent",fr:"Parfum",ar:"عطر"},
    desc:{en:"Description",fr:"Description",ar:"وصف"},
    priceUsd:18, priceLbp:"1,600,000",
    scentsEnabled: false, scents: [], colors: []
  });
  saveDraft();
  renderProducts();
  document.getElementById("productsGrid").lastElementChild.scrollIntoView({behavior:"smooth"});
}
function updateProdCategory(id, val){
  const p = CONFIG.products.find(x=>x.id==id);
  p.categoryId = val ? +val : null;
  saveDraft();
}

// ---- SCENT HELPERS ----
function toggleScentsEnabled(id, val){
  const p = CONFIG.products.find(x=>x.id==id);
  p.scentsEnabled = val;
  if(!p.scents) p.scents = [];
  saveDraft();
  renderProducts();
}
function addScent(productId){
  const p = CONFIG.products.find(x=>x.id==productId);
  if(!p.scents) p.scents = [];
  const maxId = Math.max(0,...p.scents.map(s=>s.id));
  p.scents.push({id:maxId+1, name:{en:"",fr:"",ar:""}});
  saveDraft();
  renderProducts();
}
function removeScent(productId, scentId){
  const p = CONFIG.products.find(x=>x.id==productId);
  p.scents = (p.scents||[]).filter(s=>s.id!=scentId);
  saveDraft();
  renderProducts();
}
function updateScentName(productId, scentId, lang, val){
  const p = CONFIG.products.find(x=>x.id==productId);
  const s = (p.scents||[]).find(x=>x.id==scentId);
  if(s){ if(!s.name) s.name={}; s.name[lang]=val; }
  saveDraft();
}

// ---- COLOR HELPERS ----
function addColor(productId){
  const p = CONFIG.products.find(x=>x.id==productId);
  if(!p.colors) p.colors = [];
  const maxId = Math.max(0,...p.colors.map(c=>c.id));
  p.colors.push({id:maxId+1, hex:"#c8842f", label:{en:"",fr:"",ar:""}, img:""});
  saveDraft();
  renderProducts();
}
function removeColor(productId, colorId){
  const p = CONFIG.products.find(x=>x.id==productId);
  p.colors = (p.colors||[]).filter(c=>c.id!=colorId);
  saveDraft();
  renderProducts();
}
function updateColor(productId, colorId, field, val){
  const p = CONFIG.products.find(x=>x.id==productId);
  const c = (p.colors||[]).find(x=>x.id==colorId);
  if(c) c[field] = val;
  saveDraft();
}
function updateColorLabel(productId, colorId, lang, val){
  const p = CONFIG.products.find(x=>x.id==productId);
  const c = (p.colors||[]).find(x=>x.id==colorId);
  if(c){ if(!c.label) c.label={}; c.label[lang]=val; }
  saveDraft();
}

// ============================================================
// CATEGORIES
// ============================================================
function renderCategories(){
  const container = document.getElementById("categoriesContainer");
  if(!CONFIG.categories || CONFIG.categories.length === 0){
    container.innerHTML = `<div class="settings-section" style="text-align:center;color:var(--ink-soft);padding:32px 20px">No categories yet. Add one below to start organising your products.</div>`;
    return;
  }
  container.innerHTML = CONFIG.categories.map(cat=>`
    <div class="cat-card">
      <div class="cat-card-head">
        <div class="cat-name">${cat.name.en||"(unnamed)"}</div>
        <button class="remove-btn" onclick="removeCategory(${cat.id})" style="margin-left:0">✕ Remove</button>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px">
        ${LANGS.map(l=>`
          <div class="field-group">
            <label>${l.toUpperCase()} Name</label>
            <input class="field-input" value="${(cat.name[l]||"").replace(/"/g,"&quot;")}" oninput="updateCategoryName(${cat.id},'${l}',this.value)">
          </div>`).join("")}
      </div>
    </div>`).join("");
}
function addCategory(){
  if(!CONFIG.categories) CONFIG.categories = [];
  const maxId = Math.max(0,...CONFIG.categories.map(c=>c.id));
  CONFIG.categories.push({id:maxId+1, name:{en:"New Category",fr:"Nouvelle Catégorie",ar:"فئة جديدة"}});
  saveDraft();
  renderCategories();
  document.getElementById("categoriesContainer").lastElementChild.scrollIntoView({behavior:"smooth"});
}
function removeCategory(id){
  if(!confirm("Remove this category? Products assigned to it will become uncategorised.")) return;
  CONFIG.categories = (CONFIG.categories||[]).filter(c=>c.id!=id);
  CONFIG.products.forEach(p=>{ if(p.categoryId==id) p.categoryId=null; });
  saveDraft();
  renderCategories();
  renderProducts();
}
function updateCategoryName(id, lang, val){
  const cat = (CONFIG.categories||[]).find(c=>c.id==id);
  if(cat){ if(!cat.name) cat.name={}; cat.name[lang]=val; }
  saveDraft();
  // Re-render the heading in the card without full re-render
  const card = document.querySelector(`#categoriesContainer .cat-card:nth-child(${(CONFIG.categories||[]).findIndex(c=>c.id==id)+1}) .cat-name`);
  if(card && lang==="en") card.textContent = val||"(unnamed)";
}

// ============================================================
// TEXTS
// ============================================================
const TEXT_KEYS = [
  {key:"hero_eyebrow",label:"Hero eyebrow"},
  {key:"hero_title",label:"Hero headline (HTML ok)"},
  {key:"hero_sub",label:"Hero subtitle"},
  {key:"hero_cta1",label:"Hero CTA button 1"},
  {key:"hero_cta2",label:"Hero CTA button 2"},
  {key:"hero_made",label:"Shipping notice"},
  {key:"prod_title",label:"Products section title"},
  {key:"about_title",label:"About section title"},
  {key:"about_p1",label:"About paragraph 1"},
  {key:"about_p2",label:"About paragraph 2"},
  {key:"foot_tag",label:"Footer tagline"},
];
let activeTextLang = "en";
function renderTexts(){
  const c = document.getElementById("textsContainer");
  const tabs = LANGS.map(l=>`<button class="field-tab${activeTextLang===l?" active":""}" onclick="setTextLang('${l}')">${l.toUpperCase()}</button>`).join("");
  c.innerHTML = `<div style="margin-bottom:18px">
    <div class="field-tabs">${tabs}</div>
    <div style="font-size:.88rem;color:var(--ink-soft);margin-top:4px">Editing: ${activeTextLang==="en"?"English":activeTextLang==="fr"?"French":"Arabic"}</div>
  </div>` + TEXT_KEYS.map(({key,label})=>{
    const val = (CONFIG.i18n[activeTextLang]||{})[key]||"";
    const isLong = val.length > 80 || key.includes("_p");
    return `<div class="settings-section" style="margin-bottom:14px;padding:16px 18px">
      <div style="font-size:.72rem;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-soft);margin-bottom:8px">${label}</div>
      ${isLong
        ? `<textarea class="field-input" rows="2" oninput="updateText('${key}','${activeTextLang}',this.value)">${val}</textarea>`
        : `<input class="field-input" value="${val.replace(/"/g,"&quot;")}" oninput="updateText('${key}','${activeTextLang}',this.value)">`
      }
    </div>`;
  }).join("") + `<div style="margin-top:6px"><button class="btn btn-gold" onclick="saveDraft();showToast('success','Changes saved','Click 🚀 Publish in the header to make them live.',4000)">Save changes</button></div>`;
}
function setTextLang(l){ activeTextLang=l; renderTexts(); }
function updateText(key,lang,val){
  if(!CONFIG.i18n[lang]) CONFIG.i18n[lang]={};
  CONFIG.i18n[lang][key]=val;
  saveDraft();
}

// ============================================================
// SETTINGS
// ============================================================
function renderSettings(){
  document.getElementById("set-wa").value = CONFIG.whatsapp||"";
  document.getElementById("set-email").value = (CONFIG.i18n.en||{}).foot_email||"";
  document.getElementById("set-ig").value = (CONFIG.social||{}).instagram||"";
  document.getElementById("set-fb").value = (CONFIG.social||{}).facebook||"";
  document.getElementById("set-tt").value = (CONFIG.social||{}).tiktok||"";
}
function settingChanged(){}
function saveSettings(){
  CONFIG.whatsapp = document.getElementById("set-wa").value.trim().replace(/[^0-9]/g,"");
  const email = document.getElementById("set-email").value.trim();
  LANGS.forEach(l=>{ if(CONFIG.i18n[l]) CONFIG.i18n[l].foot_email = email; });
  CONFIG.social = CONFIG.social||{};
  CONFIG.social.instagram = document.getElementById("set-ig").value.trim();
  CONFIG.social.facebook = document.getElementById("set-fb").value.trim();
  CONFIG.social.tiktok = document.getElementById("set-tt").value.trim();
  saveDraft();
  showToast("success", "Settings saved", "Click 🚀 Publish in the header to make them live.", 4000);
}

// ============================================================
// EXPORT
// ============================================================
function exportConfig(){
  const blob = new Blob([JSON.stringify(CONFIG,null,2)], {type:"application/json"});
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "config.json";
  a.click();
  showToast("success", "Downloaded!", "config.json saved to your Downloads folder.", 4000);
}
function copyConfigJSON(){
  navigator.clipboard.writeText(JSON.stringify(CONFIG,null,2)).then(()=>showToast("success","Copied!","Config JSON is in your clipboard.",3000));
}

// ============================================================
// AI ASSISTANT
// ============================================================
let aiHistory = [];

function aiKeydown(e){
  if(e.key==="Enter" && !e.shiftKey){ e.preventDefault(); sendAI(); }
}

async function sendAI(){
  const prompt = document.getElementById("aiPrompt").value.trim();
  if(!prompt) return;
  document.getElementById("aiPrompt").value = "";
  document.getElementById("aiSend").disabled = true;

  addAiMsg("user", prompt);
  addAiMsg("ai", "Thinking…", "thinking");

  const systemPrompt = `You are a content editor for the Flammastona handcrafted candles website. The user will ask you to update content in English, French, or Arabic.

You have access to the current site config as JSON. When the user requests changes, you MUST respond with a JSON object describing the specific changes to make, then a brief human explanation.

ALWAYS respond in this exact format:
<changes>
{JSON object with only the changed fields}
</changes>
<reply>
Your brief confirmation message here.
</reply>

The config structure:
- whatsapp: phone number string
- social: {instagram, facebook, tiktok}
- categories: array of {id, name:{en,fr,ar}} — product category groups
- i18n: {en, fr, ar} each with text keys like hero_title, hero_sub, about_p1, about_p2, foot_tag, etc.
- products: array of {id, categoryId (matches a category id or null), img, tag:{en,fr,ar}|null, name:{en,fr,ar}, scent:{en,fr,ar}, desc:{en,fr,ar}, priceUsd, priceLbp, scentsEnabled (bool), scents:[{id,name:{en,fr,ar}}], colors:[{id,hex,label:{en,fr,ar},img}]}

For changes, the JSON should only include the changed fields. Examples:
- Change price: {"products":[{"id":1,"priceUsd":22}]}
- Change i18n text: {"i18n":{"en":{"hero_sub":"New subtitle"}}}
- Change WhatsApp: {"whatsapp":"96176123456"}
- Add category: {"categories":[...all existing categories plus new one...]}
- Add scent to product: {"products":[{"id":1,"scentsEnabled":true,"scents":[{"id":1,"name":{"en":"Vanilla","fr":"Vanille","ar":"فانيليا"}}]}]}
- Add color variant: {"products":[{"id":1,"colors":[{"id":1,"hex":"#c8842f","label":{"en":"Amber","fr":"Ambre","ar":"عنبر"},"img":""}]}]}

Current config:
${JSON.stringify(CONFIG, null, 1)}`;

  aiHistory.push({role:"user", content: prompt});

  try {
    const resp = await fetch("/api/chat", {
      method:"POST",
      headers:{"Content-Type":"application/json","x-session-token": SESSION_TOKEN||""},
      body: JSON.stringify({
        system: systemPrompt,
        messages: aiHistory
      })
    });
    const data = await resp.json();
    const text = data.content?.map(c=>c.text||"").join("") || "";
    aiHistory.push({role:"assistant", content: text});

    // parse response
    const changesMatch = text.match(/<changes>([\s\S]*?)<\/changes>/);
    const replyMatch = text.match(/<reply>([\s\S]*?)<\/reply>/);

    removeThinking();

    if(changesMatch){
      try {
        const changes = JSON.parse(changesMatch[1].trim());
        applyChanges(changes);
        saveDraft();
        renderCategories();
        renderProducts();
        renderTexts();
        renderSettings();
        showToast("success", "Changes applied", "Click 🚀 Publish to make them live.", 5000);
      } catch(e){
        showToast("error", "Could not apply changes", "The AI response was unclear. Try rephrasing your request.", 6000);
      }
    }
    const replyText = replyMatch ? replyMatch[1].trim() : text;
    addAiMsg("ai", replyText);

  } catch(e){
    removeThinking();
    addAiMsg("ai", "Sorry, I couldn't reach the AI service right now. You can still edit everything manually using the Products and Texts tabs on the left.");
    showToast("error", "AI assistant unavailable", "Could not connect to the AI service. Try again or edit manually.", 6000);
    console.error(e);
  }
  document.getElementById("aiSend").disabled = false;
}

function addAiMsg(role, text, cls=""){
  const msgs = document.getElementById("aiMsgs");
  const div = document.createElement("div");
  div.className = "msg " + role + (cls?" "+cls:"");
  div.id = cls==="thinking" ? "thinkingMsg" : "";
  div.innerHTML = text.replace(/\n/g,"<br>").replace(/\*(.*?)\*/g,"<strong>$1</strong>");
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}
function removeThinking(){
  const el = document.getElementById("thinkingMsg");
  if(el) el.remove();
}

function applyChanges(changes){
  if(changes.whatsapp) CONFIG.whatsapp = changes.whatsapp;
  if(changes.social) Object.assign(CONFIG.social, changes.social);
  if(changes.categories) CONFIG.categories = changes.categories;
  if(changes.i18n){
    for(const lang in changes.i18n){
      if(!CONFIG.i18n[lang]) CONFIG.i18n[lang]={};
      Object.assign(CONFIG.i18n[lang], changes.i18n[lang]);
    }
  }
  if(changes.products){
    changes.products.forEach(cp=>{
      const idx = CONFIG.products.findIndex(p=>p.id===cp.id);
      if(idx>=0){
        const existing = CONFIG.products[idx];
        for(const k in cp){
          if(Array.isArray(cp[k])){
            existing[k] = cp[k];
          } else if(typeof cp[k]==="object"&&cp[k]!==null){
            existing[k] = Object.assign(existing[k]||{}, cp[k]);
          } else {
            existing[k] = cp[k];
          }
        }
      } else {
        CONFIG.products.push(cp);
      }
    });
  }
}

// ============================================================
// DEFAULT CONFIG
// ============================================================
function getDefaultConfig(){
  return {"whatsapp":"96176909986","social":{"instagram":"https://instagram.com/flammastona","facebook":"https://facebook.com/flammastona","tiktok":"https://tiktok.com/@flammastona"},"categories":[{"id":1,"name":{"en":"Candles","fr":"Bougies","ar":"شموع"}},{"id":2,"name":{"en":"Crystal","fr":"Crystal","ar":"كريستال"}}],"i18n":{"en":{"nav_products":"Collection","nav_about":"Our Story","nav_contact":"Contact","hero_eyebrow":"Handcrafted in Lebanon","hero_title":"Light that feels <em>like home</em>","hero_sub":"Slow-poured candles made in small batches, with natural wax and scents that linger gently.","hero_cta1":"Explore the collection","hero_cta2":"Order on WhatsApp","hero_made":"Currently shipping within Lebanon","prod_eyebrow":"The Collection","prod_title":"Choose your glow","about_eyebrow":"Our Story","about_title":"Made by hand, poured with patience","about_p1":"Flammastona began as a small passion in Lebanon — a love for warm light, calm evenings, and scents that turn a room into a refuge.","about_p2":"Every candle is poured in small batches, so each one carries a little care you can feel the moment it's lit.","foot_tag":"Handcrafted candles, poured with love in Lebanon.","foot_reach":"Reach Us","foot_email":"hello@flammastona.com","foot_loc":"Based in Lebanon","foot_rights":"All rights reserved.","order":"Order","priceNote":"approx. price","add":"Add","cart_title":"Your Order","cart_total":"Total","cart_send":"Send order on WhatsApp","cart_empty":"Your cart is empty. Add a candle to get started.","cart_added":"Added","scent_pick":"Choose your scents (up to 3)","scent_max":"Max 3 scents reached","color_pick":"Choose a color","cat_all":"All","cat_other":"Other"},"fr":{"nav_products":"Collection","nav_about":"Notre Histoire","nav_contact":"Contact","hero_eyebrow":"Fabriqué à la main au Liban","hero_title":"Une lumière qui a un <em>air de maison</em>","hero_sub":"Bougies coulées lentement en petites quantités, avec une cire naturelle et des parfums qui s'attardent doucement.","hero_cta1":"Découvrir la collection","hero_cta2":"Commander sur WhatsApp","hero_made":"Livraison actuellement au Liban","prod_eyebrow":"La Collection","prod_title":"Choisissez votre lueur","about_eyebrow":"Notre Histoire","about_title":"Fait main, coulé avec patience","about_p1":"Flammastona est née d'une petite passion au Liban — l'amour de la lumière chaude, des soirées calmes et des parfums qui transforment une pièce en refuge.","about_p2":"Chaque bougie est coulée en petites quantités, portant un soin que l'on ressent dès qu'elle est allumée.","foot_tag":"Bougies artisanales, coulées avec amour au Liban.","foot_reach":"Nous contacter","foot_email":"hello@flammastona.com","foot_loc":"Basé au Liban","foot_rights":"Tous droits réservés.","order":"Commander","priceNote":"prix approx.","add":"Ajouter","cart_title":"Votre Commande","cart_total":"Total","cart_send":"Envoyer la commande sur WhatsApp","cart_empty":"Votre panier est vide. Ajoutez une bougie pour commencer.","cart_added":"Ajouté","scent_pick":"Choisissez vos parfums (jusqu'à 3)","scent_max":"Maximum 3 parfums atteint","color_pick":"Choisissez une couleur","cat_all":"Tout","cat_other":"Autre"},"ar":{"nav_products":"المجموعة","nav_about":"قصتنا","nav_contact":"تواصل","hero_eyebrow":"صناعة يدوية في لبنان","hero_title":"ضوءٌ يشبه <em>الدفء في البيت</em>","hero_sub":"شموعٌ مصبوبة بعنايةٍ على دفعاتٍ صغيرة، بشمعٍ طبيعيّ وروائح تبقى بلطف.","hero_cta1":"استكشف المجموعة","hero_cta2":"اطلب عبر واتساب","hero_made":"التوصيل حالياً داخل لبنان","prod_eyebrow":"المجموعة","prod_title":"اختر وهجك","about_eyebrow":"قصتنا","about_title":"صناعة يدوية، مصبوبة بصبر","about_p1":"بدأت فلاماستونا كشغفٍ صغير في لبنان — حبٌّ للضوء الدافئ والأمسيات الهادئة وروائح تحوّل الغرفة إلى ملاذ.","about_p2":"كل شمعة تُصبّ على دفعاتٍ صغيرة، فتحمل لمسةً من العناية تشعر بها لحظة إشعالها.","foot_tag":"شموعٌ مصنوعة يدوياً، مصبوبة بحبٍّ في لبنان.","foot_reach":"تواصل معنا","foot_email":"hello@flammastona.com","foot_loc":"مقرّنا في لبنان","foot_rights":"جميع الحقوق محفوظة.","order":"اطلب","priceNote":"السعر تقريبي","add":"أضف","cart_title":"طلبك","cart_total":"المجموع","cart_send":"أرسل الطلب عبر واتساب","cart_empty":"سلتك فارغة. أضف شمعة للبدء.","cart_added":"تمت الإضافة","scent_pick":"اختر عطورك (حتى 3)","scent_max":"وصلت للحد الأقصى (3 عطور)","color_pick":"اختر اللون","cat_all":"الكل","cat_other":"أخرى"}},"products":[{"id":1,"categoryId":1,"scentsEnabled":false,"scents":[],"colors":[],"img":"","tag":{"en":"Bestseller","fr":"Best-seller","ar":"الأكثر مبيعاً"},"name":{"en":"Amber Ember","fr":"Braise d'Ambre","ar":"جمر العنبر"},"scent":{"en":"Amber · Vanilla","fr":"Ambre · Vanille","ar":"عنبر · فانيليا"},"desc":{"en":"A warm, golden glow with soft notes of vanilla and amber.","fr":"Une lueur dorée et chaleureuse aux notes douces de vanille et d'ambre.","ar":"وهجٌ ذهبيٌّ دافئ بلمسات ناعمة من الفانيليا والعنبر."},"priceUsd":18,"priceLbp":"1,600,000"},{"id":2,"categoryId":1,"scentsEnabled":false,"scents":[],"colors":[],"img":"","tag":null,"name":{"en":"Cedar Hush","fr":"Murmure de Cèdre","ar":"همس الأرز"},"scent":{"en":"Cedar · Sage","fr":"Cèdre · Sauge","ar":"أرز · مريمية"},"desc":{"en":"Grounding woody notes inspired by Lebanon's mountains.","fr":"Des notes boisées apaisantes inspirées des montagnes du Liban.","ar":"روائح خشبية هادئة مستوحاة من جبال لبنان."},"priceUsd":20,"priceLbp":"1,790,000"},{"id":3,"categoryId":1,"scentsEnabled":false,"scents":[],"colors":[],"img":"","tag":{"en":"New","fr":"Nouveau","ar":"جديد"},"name":{"en":"Orange Blossom","fr":"Fleur d'Oranger","ar":"زهر البرتقال"},"scent":{"en":"Neroli · Citrus","fr":"Néroli · Agrumes","ar":"نيرولي · حمضيات"},"desc":{"en":"Bright and fresh, like a Mediterranean spring morning.","fr":"Vif et frais, comme un matin de printemps méditerranéen.","ar":"منعشٌ ومشرق كصباح ربيعي متوسطي."},"priceUsd":18,"priceLbp":"1,600,000"},{"id":4,"categoryId":1,"scentsEnabled":false,"scents":[],"colors":[],"img":"","tag":null,"name":{"en":"Fig & Olive","fr":"Figue & Olive","ar":"تين وزيتون"},"scent":{"en":"Fig · Green Olive","fr":"Figue · Olive verte","ar":"تين · زيتون أخضر"},"desc":{"en":"A lush, fruity scent rooted in the Levantine garden.","fr":"Un parfum fruité et généreux ancré dans le jardin levantin.","ar":"عطرٌ فاكهيٌّ غنيّ من قلب الحديقة الشامية."},"priceUsd":22,"priceLbp":"1,960,000"},{"id":5,"categoryId":1,"scentsEnabled":false,"scents":[],"colors":[],"img":"","tag":null,"name":{"en":"Rose Damascena","fr":"Rose de Damas","ar":"الورد الدمشقي"},"scent":{"en":"Damask Rose","fr":"Rose de Damas","ar":"ورد دمشقي"},"desc":{"en":"Delicate and romantic, a classic rose poured by hand.","fr":"Délicate et romantique, une rose classique coulée à la main.","ar":"رقيقةٌ ورومانسية، وردةٌ كلاسيكية مصبوبة يدوياً."},"priceUsd":24,"priceLbp":"2,140,000"},{"id":6,"categoryId":1,"scentsEnabled":false,"scents":[],"colors":[],"img":"","tag":{"en":"Limited","fr":"Édition limitée","ar":"إصدار محدود"},"name":{"en":"Midnight Oud","fr":"Oud de Minuit","ar":"عود منتصف الليل"},"scent":{"en":"Oud · Spice","fr":"Oud · Épices","ar":"عود · توابل"},"desc":{"en":"Deep, smoky and luxurious for slow evenings.","fr":"Profond, fumé et luxueux pour les longues soirées.","ar":"عميقٌ ودخانيٌّ وفاخر لأمسياتٍ هادئة."},"priceUsd":28,"priceLbp":"2,500,000"}]};
}
