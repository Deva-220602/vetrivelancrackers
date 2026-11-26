const P={a:"10 pcs · 1 box",b:"5 pcs · 1 box",c:"1 box",d:"1 packet",e:"1 pc",f:"3 pcs · 1 box",g:"10 pcs",h:"3 pcs"};
const catalog=[
["Combo packs","Ready-made mixes for every celebration.",["Children's Combo Pack|1 combo","Adult Combo Pack|1 combo","Family Combo Pack|1 combo","Morning Combo Pack|1 combo","Night Combo Pack|1 combo"]],
["Sparklers","A gentle, glowing start to the festivities.",["7cm Electric Sparklers|a","7cm Colour Sparklers|a","10cm Electric Sparklers|a","10cm Colour Sparklers|a","10cm Green Sparklers|a","10cm Red Sparklers|a","12cm Electric Sparklers|a","12cm Colour Sparklers|a","12cm Green Colour Sparklers|a","12cm Red Colour Sparklers|a","15cm Electric Sparklers|a","15cm Colour Sparklers|a","15cm Green Sparklers|a","15cm Red Sparklers|a","30cm Electric Sparklers|b","30cm Colour Sparklers|b","30cm Green Sparklers|b","30cm Red Sparklers|b","50cm Electric Sparklers|b"]],
["Flower pots","A bright shower of colour, right at your feet.",["Flower Pots Big|a","Flower Pots Special|a","Flower Pots Ashoka|a","Flower Pots Colour Koti|a","Flower Pots Colour Koti Deluxe|a"]],
["Ground chakkars","A merry little spin for the whole family.",["Ground Chakkar Big|a","Ground Chakkar Special|a","Ground Chakkar Deluxe|a","Spinner Special Plastic|a","Spinner Deluxe Plastic|a","Whistling Wheel|b","Wire Chakkar|a"]],
["Colour fountain","A dancing fountain of festive colour.",["Chotta Bheem 5 Colour Fountain|b","Peacock Feather|b","Disco Shower|b","Red Bloom Fountain|b","Green Boom|b","Oreo Gold|b","Tin Beer Fountain Crackling|e","Peacock 3 Face|e","Bada Peacock|e","Tri Colour Fountain|b"]],
["Twinkling star","Little stars that twinkle and sparkle.",["1½\" Twinkling Star Medium|a","4\" Twinkling Star Deluxe|a"]],
["Fancy pencils","Slim, bright and full of fun.",["10cm Pencil|a","Deluxe Pencil|a","Mercury Torch / Ultra Pencil|f","Sivakasi Special Pop Pencil|f"]],
["Bijili vedi","Classic red crackers for a good sound.",["Red Bijili (50 pcs)|d","Red Bijili (100 pcs)|d","Stripped Bijili (100 pcs)|d"]],
["One sound crackers","The traditional Lakshmi favourites.",["2¾\" Kurivi Crackers|d","3½\" Medium Lakshmi|d","4\" Lakshmi Crackers|d","4\" Lakshmi Deluxe / Joker / Gold Lakshmi|d","5\" Lakshmi|d","6\" Lakshmi|d"]],
["Bombs","Big, bold and loud. Light with care.",["Bullet Bomb|c","King of King Bomb|c","Classic Bomb|c","Agni Bomb|c","Digital Bomb|c","¼ kg Paper Bomb|c","½ kg Paper Bomb|c","1 kg Paper Bomb|c"]],
["Children special novelties","Playful surprises just for the little ones.",["Magic / Electric Stone|g","Kit Kat / Tin Tin|a","Snake Tablet|a","Jee Boom Baa|a","Dancing Bambaram / Spinner|a","Helicopter|b","Butterfly|a","Photo Flash|b","Mega Siren|f","Money Bank Small|e","Money Bank Large|2 pcs · 1 box","Gold Coin|b","Moon Light|b","Ganga Jamuna|b","4×4 Wheel|b","Cylinder Smoke Bomb|e"]],
["Aerial fancy shots","Colour that lights up the whole sky.",["Chotta Fancy|c","Sky Force|b","Penta Sky Shots|b","2\" Aerial Fancy (5 varieties)|c","2\" Aerial Fancy|h","3½\" Aerial Fancy (10 varieties)|c","3½\" Niagara Falls|c","4\" Aerial Fancy (10 varieties)|c"]],
["Garland / Lar","Long strings for a grand, continuous cracker.",["28 Giant|d","56 Giant|d","50 Deluxe|d","100 Deluxe|d","300 Wala|c","1,000 Wala Silver|c","1,000 Wala Platinum|c","5,000 Wala Silver|c","5,000 Wala Platinum|c","10,000 Wala Silver|c","10,000 Wala Platinum|c"]],
["Multicolour shots","Branded multi-shot boxes for the big finale.",["12 Shots Crackling (Rider)|c","25 Shots Crackling (Rider)|c","30 Shots Multicolour Branded|c","60 Shots Multicolour Branded|c","120 Shots Multicolour Branded|c","240 Shots Multicolour Branded|c"]],
["Colour smoke","Clouds of festive colour.",["Colour Smoke (3 pcs)|f","Colour Smoke (5 pcs)|b"]],
["Digital wala","Long-running crackling strings.",["100 Digital Wala|e","1,000 Digital Wala|e","3,000 Digital Wala|e","5,000 Digital Wala|e"]],
["Colour match box","Fun, colourful match boxes.",["Robin Small Match Box|10 boxes","Robin Medium Size Match (5 in 1)|c","Robin VIP Match Box (10 in 1)|c"]],
["Guns","Cap guns and whistling missiles for fun.",["Roll Cap Box 10 in 1 with Deluxe Gun|1 set","Ring Cap 10 + 1 Deluxe Revolver Gun|1 set","Whistle Missiles|d"]]];
const looks=[["#e9b64e","#e77642","#f1e7cc"],["#4d8d71","#23544e","#dce9db"],["#5880ae","#33476e","#dce3ee"],["#d85c71","#97364e","#f0dfe0"],["#d99637","#8d4b29","#eee1cd"],["#a06da8","#5c406f","#e9e0ed"],["#d46d3e","#8e3f36","#f2e2d4"],["#4a7779","#274849","#d9e7e2"]];
let nextId=1;
const products=catalog.flatMap(([category,description,items],ci)=>items.map(it=>{const [name,code]=it.split("|"),l=looks[ci%looks.length];
return {id:nextId++,name,kind:category,category,price:100,description,badge:P[code]||code,colors:[l[0],l[1]],art:l[2]}}));
const categories=["All crackers",...new Set(products.map(p=>p.category))];
const cart=new Map();let activeCategory="All crackers";
const $=id=>document.getElementById(id);
const productGrid=$("products"),cartPanel=$("cart-panel"),overlay=$("overlay");
const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
const formatPrice=a=>`₹${a.toLocaleString("en-IN")}`;
const find=id=>products.find(p=>p.id===id);
const ray=(cx,cy,r1,r2,n,col,w=2.5)=>Array.from({length:n},(_,i)=>{const a=Math.PI*2*i/n;return `<line x1="${(cx+Math.cos(a)*r1).toFixed(1)}" y1="${(cy+Math.sin(a)*r1).toFixed(1)}" x2="${(cx+Math.cos(a)*r2).toFixed(1)}" y2="${(cy+Math.sin(a)*r2).toFixed(1)}" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/>`}).join("");
const st=(x,y,r,col)=>`<path d="M${x} ${y-r}L${x+r*.28} ${y-r*.28}L${x+r} ${y}L${x+r*.28} ${y+r*.28}L${x} ${y+r}L${x-r*.28} ${y+r*.28}L${x-r} ${y}L${x-r*.28} ${y-r*.28}Z" fill="${col}"/>`;
const G="#f5cd4c",D="#2a2b26",BR="#7a5230";
const icons={
"Combo packs":(a,b)=>`<rect x="26" y="58" width="68" height="42" rx="4" fill="${a}"/><rect x="22" y="44" width="76" height="18" rx="4" fill="${b}"/><rect x="55" y="44" width="10" height="56" fill="${G}"/><path d="M60 44C48 30 34 34 42 42ZM60 44C72 30 86 34 78 42Z" fill="${G}"/>${st(92,26,9,"#fff3b0")}${st(26,30,5,"#ffe28a")}`,
"Sparklers":(a,b)=>`<line x1="34" y1="104" x2="70" y2="38" stroke="${BR}" stroke-width="4" stroke-linecap="round"/><line x1="52" y1="104" x2="86" y2="46" stroke="${BR}" stroke-width="4" stroke-linecap="round"/><line x1="70" y1="38" x2="76" y2="26" stroke="${a}" stroke-width="7" stroke-linecap="round"/><line x1="86" y1="46" x2="91" y2="36" stroke="${b}" stroke-width="7" stroke-linecap="round"/>${ray(78,22,7,22,10,G)}${ray(93,32,5,16,8,"#ffe28a",2)}${st(100,12,6,"#fff")}`,
"Flower pots":(a,b)=>`<path d="M40 104L46 64H74L80 104Z" fill="${a}"/><rect x="41" y="56" width="38" height="10" rx="3" fill="${b}"/><rect x="48" y="80" width="24" height="5" fill="${G}" opacity=".8"/>${ray(60,38,10,34,12,G,3)}${ray(60,38,6,22,12,"#ff7a45",2.5)}${st(60,36,8,"#fff3b0")}`,
"Ground chakkars":(a,b)=>`<g class="spin"><circle cx="60" cy="60" r="30" fill="none" stroke="${a}" stroke-width="7"/><line x1="60" y1="30" x2="60" y2="90" stroke="${b}" stroke-width="6"/><line x1="30" y1="60" x2="90" y2="60" stroke="${b}" stroke-width="6"/><line x1="39" y1="39" x2="81" y2="81" stroke="${b}" stroke-width="4"/><line x1="81" y1="39" x2="39" y2="81" stroke="${b}" stroke-width="4"/>${ray(60,60,40,50,12,G,3)}</g><circle cx="60" cy="60" r="8" fill="${G}"/>`,
"Colour fountain":(a,b)=>`<path d="M44 106L52 70H68L76 106Z" fill="${a}"/><rect x="50" y="62" width="20" height="10" rx="3" fill="${b}"/><g fill="none" stroke-width="4.5" stroke-linecap="round"><path d="M60 62Q34 26 18 54" stroke="${b}"/><path d="M60 62Q46 14 34 22" stroke="${G}"/><path d="M60 62Q62 6 60 10" stroke="#ff5f8f"/><path d="M60 62Q74 14 86 22" stroke="#7be0c3"/><path d="M60 62Q86 26 102 54" stroke="#8fb4ff"/></g>${st(60,10,7,"#fff")}${st(20,50,5,G)}${st(100,50,5,G)}`,
"Twinkling star":(a,b)=>`${st(60,60,44,G)}${st(60,60,26,a)}${st(60,60,11,"#fff")}${st(100,22,8,"#fff3b0")}${st(20,96,7,"#ffe28a")}${st(24,26,5,"#fff")}`,
"Fancy pencils":(a,b)=>`<g transform="rotate(-35 60 60)"><rect x="51" y="20" width="18" height="62" fill="${a}"/><rect x="51" y="20" width="18" height="10" fill="${G}"/><rect x="51" y="46" width="18" height="6" fill="${b}"/><path d="M51 82H69L60 102Z" fill="#e8c9a0"/><path d="M56 92H64L60 102Z" fill="${D}"/></g>${ray(34,22,6,22,10,G)}${st(20,40,5,"#fff")}`,
"Bijili vedi":(a,b)=>`<g><rect x="32" y="56" width="16" height="42" rx="4" fill="${a}" transform="rotate(-14 40 77)"/><rect x="52" y="52" width="16" height="46" rx="4" fill="${a}"/><rect x="72" y="56" width="16" height="42" rx="4" fill="${a}" transform="rotate(14 80 77)"/><rect x="52" y="70" width="16" height="6" fill="${G}"/><rect x="32" y="74" width="16" height="5" fill="${G}" transform="rotate(-14 40 77)"/><rect x="72" y="74" width="16" height="5" fill="${G}" transform="rotate(14 80 77)"/></g><path d="M60 52Q64 38 74 34M38 58Q36 44 28 40M82 58Q86 44 94 40" fill="none" stroke="${BR}" stroke-width="2.5"/>${ray(76,32,4,14,8,G,2.2)}${ray(26,38,3,11,7,G,2)}${ray(96,38,3,11,7,G,2)}`,
"One sound crackers":(a,b)=>`<rect x="40" y="52" width="40" height="50" rx="5" fill="${a}"/><rect x="40" y="52" width="40" height="8" fill="${b}"/><rect x="40" y="94" width="40" height="8" fill="${b}"/><circle cx="60" cy="77" r="12" fill="${G}"/>${st(60,77,8,a)}<path d="M60 52Q60 38 74 32" fill="none" stroke="${BR}" stroke-width="3"/>${ray(76,30,4,16,10,G,2.5)}${st(92,14,5,"#fff")}`,
"Bombs":(a,b)=>`<circle cx="58" cy="72" r="30" fill="${D}"/><path d="M34 62Q58 74 82 60" fill="none" stroke="${a}" stroke-width="7"/><ellipse cx="46" cy="58" rx="7" ry="4" fill="#fff" opacity=".25" transform="rotate(-30 46 58)"/><rect x="52" y="36" width="14" height="10" rx="2" fill="${b}"/><path d="M60 36Q62 22 78 18" fill="none" stroke="${BR}" stroke-width="3"/>${ray(82,16,4,18,10,G,2.8)}${st(98,32,5,"#ffe28a")}`,
"Children special novelties":(a,b)=>`<rect x="57" y="22" width="6" height="22" rx="3" fill="${G}"/><ellipse cx="60" cy="48" rx="30" ry="9" fill="${b}"/><path d="M30 48H90L60 104Z" fill="${a}"/><path d="M44 60H76" stroke="#fff" stroke-opacity=".5" stroke-width="4"/>${st(24,24,8,"#ff9bd0")}${st(98,28,7,"#7be0c3")}${st(100,80,5,"#8fb4ff")}${st(18,76,5,G)}`,
"Aerial fancy shots":(a,b)=>`<g transform="rotate(35 54 70)"><rect x="46" y="48" width="16" height="42" fill="${a}"/><path d="M46 48L54 28L62 48Z" fill="${b}"/><path d="M46 80L36 94L46 90ZM62 80L72 94L62 90Z" fill="${D}"/><rect x="52" y="90" width="4" height="22" fill="${BR}"/></g>${ray(86,32,8,28,14,"#ff5f8f",2.6)}${ray(86,32,5,18,14,G,2.6)}${st(86,32,7,"#fff")}${st(106,56,5,"#7be0c3")}${st(62,14,5,"#8fb4ff")}`,
"Garland / Lar":(a,b)=>`<path d="M10 60Q60 100 110 60" fill="none" stroke="${BR}" stroke-width="3"/>${Array.from({length:9},(_,i)=>{const t=i/8,x=10+t*100,y=60+Math.sin(t*Math.PI)*28;return `<rect x="${x-3.5}" y="${y}" width="7" height="18" rx="2" fill="${i%2?a:b}"/><rect x="${x-3.5}" y="${y+7}" width="7" height="3" fill="${G}"/>`}).join("")}${ray(110,58,4,15,8,G,2.4)}${ray(10,58,4,13,7,G,2)}`,
"Multicolour shots":(a,b)=>`<rect x="24" y="64" width="72" height="40" rx="5" fill="${a}"/><rect x="24" y="64" width="72" height="9" fill="${b}"/>${[36,48,60,72,84].map(x=>`<circle cx="${x}" cy="82" r="5" fill="${D}"/>`).join("")}${ray(34,40,3,18,8,"#ff5f8f",2.4)}${ray(60,26,3,20,10,G,2.4)}${ray(86,40,3,18,8,"#7be0c3",2.4)}${st(60,26,6,"#fff")}`,
"Colour smoke":(a,b)=>`<rect x="46" y="72" width="28" height="32" rx="4" fill="${a}"/><rect x="46" y="72" width="28" height="7" fill="${b}"/><g opacity=".92"><circle cx="60" cy="58" r="16" fill="${b}"/><circle cx="44" cy="46" r="14" fill="#ff9bd0"/><circle cx="76" cy="44" r="15" fill="#7be0c3"/><circle cx="60" cy="32" r="16" fill="#8fb4ff"/><circle cx="90" cy="26" r="9" fill="${G}"/></g>`,
"Digital wala":(a,b)=>`<circle cx="60" cy="60" r="38" fill="${a}"/><circle cx="60" cy="60" r="28" fill="none" stroke="${b}" stroke-width="5"/><circle cx="60" cy="60" r="19" fill="none" stroke="${G}" stroke-width="4" stroke-dasharray="3 5"/><circle cx="60" cy="60" r="9" fill="${D}"/>${ray(60,60,44,54,12,G,3)}${st(100,20,7,"#fff3b0")}`,
"Colour match box":(a,b)=>`<rect x="40" y="26" width="6" height="26" rx="2" fill="#e8c9a0" transform="rotate(-12 43 50)"/><circle cx="36" cy="25" r="5" fill="#d8453a"/><rect x="56" y="22" width="6" height="30" rx="2" fill="#e8c9a0"/><circle cx="59" cy="21" r="5" fill="${b}"/><rect x="72" y="26" width="6" height="26" rx="2" fill="#e8c9a0" transform="rotate(12 75 50)"/><circle cx="84" cy="25" r="5" fill="#d8453a"/><rect x="24" y="50" width="72" height="44" rx="4" fill="${a}"/><rect x="34" y="58" width="52" height="28" rx="3" fill="#f7f5ef"/>${st(60,72,10,b)}${ray(59,12,3,10,6,G,2)}`,
"Guns":(a,b)=>`<rect x="26" y="46" width="52" height="20" rx="5" fill="${D}"/><rect x="74" y="49" width="30" height="12" rx="3" fill="${a}"/><path d="M34 66H54L50 98H30Z" fill="${b}"/><path d="M56 66Q60 78 70 70" fill="none" stroke="${D}" stroke-width="4"/><circle cx="48" cy="56" r="4" fill="${G}"/>${ray(108,55,4,16,8,G,2.6)}${st(118,38,5,"#fff")}`
};
const tint=p=>/\bgreen\b/i.test(p.name)?["#3f9c5a","#1f6a3a"]:/\bred\b/i.test(p.name)?["#d8453a","#972b2b"]:/\belectric\b/i.test(p.name)?["#e9d77a","#c9a23a"]:p.colors;
const iconFor=p=>`<svg viewBox="0 0 120 120" aria-hidden="true">${(icons[p.category]||icons["Twinkling star"])(...tint(p))}</svg>`;


function renderFilters(){$("filters").innerHTML=categories.map(c=>`<button class="filter-chip" type="button" aria-pressed="${c===activeCategory}" data-category="${c}">${c}</button>`).join("")}
function renderProducts(){
const q=$("search").value.trim().toLowerCase();
const vis=products.filter(p=>(activeCategory==="All crackers"||p.category===activeCategory)&&`${p.name} ${p.kind} ${p.description}`.toLowerCase().includes(q));
productGrid.innerHTML=vis.length?vis.map((p,i)=>`<article class="product-card" style="animation-delay:${Math.min(i,11)*50}ms">
<div class="product-art" style="--art-bg:${p.art};--pack-a:${p.colors[0]};--pack-b:${p.colors[1]}"><span class="art-label">${p.badge}</span>${p.img?`<img class="art-img" src="${p.img}" alt="${p.name}" loading="lazy">`:`<div class="art-svg" role="img" aria-label="Illustration of ${p.name}">${iconFor(p)}</div>`}<i class="spark-dot one"></i><i class="spark-dot two"></i><i class="spark-dot three"></i></div>
<div class="product-info"><div class="product-kind">${p.kind}</div><h3 class="product-title">${p.name}</h3><p class="product-desc">${p.description}</p><div class="product-buy"><span class="price">${formatPrice(p.price)}</span><button class="add-button" type="button" data-add="${p.id}"><span aria-hidden="true">+</span> Add to bag</button></div></div></article>`).join(""):`<div class="empty-state">No crackers found. Try another search or category.</div>`}
function renderCart(){
const items=[...cart.entries()];
const count=items.reduce((s,[,q])=>s+q,0);
const total=items.reduce((s,[id,q])=>s+find(id).price*q,0);
$("cart-count").textContent=count;$("cart-total").textContent=formatPrice(total);
$("cart-items").innerHTML=items.length?items.map(([id,q])=>{const p=find(id);return `<div class="cart-row"><div><strong>${p.name}</strong><small>${formatPrice(p.price)} each</small><div class="quantity"><button type="button" data-quantity="${id}" data-change="-1" aria-label="Remove one ${p.name}">−</button><span>${q}</span><button type="button" data-quantity="${id}" data-change="1" aria-label="Add one ${p.name}">+</button></div></div><span class="cart-row-total">${formatPrice(p.price*q)}</span></div>`}).join(""):`<div class="cart-empty">Your bag is waiting for a little sparkle.<br>Add something lovely from the collection.</div>`}
function retrigger(el,cls){el.classList.remove(cls);void el.offsetWidth;el.classList.add(cls)}
function setCartOpen(o){cartPanel.classList.toggle("open",o);overlay.classList.toggle("open",o);cartPanel.setAttribute("aria-hidden",String(!o));document.body.style.overflow=o?"hidden":"";if(o)$("close-cart").focus()}
let toastTimer;
function showToast(m){const t=$("toast");t.textContent=m;t.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove("show"),2400)}

/* ---------- Add-to-bag sparkle + fly to cart ---------- */
function sparkleAt(x,y){for(let i=0;i<10;i++){const s=document.createElement("i");const a=Math.PI*2*i/10,d=22+Math.random()*18;
s.style.cssText=`position:fixed;z-index:70;left:${x}px;top:${y}px;width:5px;height:5px;border-radius:50%;background:#ffd45a;box-shadow:0 0 8px 2px #ff9b3a;pointer-events:none`;
document.body.appendChild(s);s.animate([{transform:"translate(0,0) scale(1)",opacity:1},{transform:`translate(${Math.cos(a)*d}px,${Math.sin(a)*d}px) scale(0)`,opacity:0}],{duration:600,easing:"ease-out"}).onfinish=()=>s.remove()}}
function flyToCart(from){if(reduce)return;const b=from.getBoundingClientRect(),t=$("open-cart").getBoundingClientRect();
const f=document.createElement("div");f.className="fly";f.style.left=b.left+b.width/2-8+"px";f.style.top=b.top+b.height/2-8+"px";document.body.appendChild(f);
const dx=t.left+t.width/2-b.left-b.width/2,dy=t.top+t.height/2-b.top-b.height/2;
f.animate([{transform:"translate(0,0) scale(1)",opacity:1},{transform:`translate(${dx*.5}px,${dy-80}px) scale(1.3)`,offset:.5},{transform:`translate(${dx}px,${dy}px) scale(.2)`,opacity:.3}],{duration:750,easing:"cubic-bezier(.4,.1,.3,1)"}).onfinish=()=>{f.remove();retrigger($("open-cart"),"bump")}}

/* ---------- Events ---------- */
$("filters").addEventListener("click",e=>{const b=e.target.closest("[data-category]");if(!b)return;activeCategory=b.dataset.category;renderFilters();renderProducts()});
$("search").addEventListener("input",renderProducts);
productGrid.addEventListener("click",e=>{const b=e.target.closest("[data-add]");if(!b)return;
const id=Number(b.dataset.add);cart.set(id,(cart.get(id)||0)+1);renderCart();
const r=b.getBoundingClientRect();sparkleAt(r.left+r.width/2,r.top+r.height/2);flyToCart(b);
b.classList.add("done");b.innerHTML="✓ Added";setTimeout(()=>{b.classList.remove("done");b.innerHTML='<span aria-hidden="true">+</span> Add to bag'},1100);
retrigger($("cart-total-row"),"tick");showToast(`${find(id).name} added to your bag`)});
$("cart-items").addEventListener("click",e=>{const b=e.target.closest("[data-quantity]");if(!b)return;
const id=Number(b.dataset.quantity),n=(cart.get(id)||0)+Number(b.dataset.change);
if(n>0)cart.set(id,n);else cart.delete(id);renderCart();retrigger($("cart-total-row"),"tick")});
$("open-cart").addEventListener("click",()=>setCartOpen(true));
$("close-cart").addEventListener("click",()=>setCartOpen(false));
overlay.addEventListener("click",()=>setCartOpen(false));
document.addEventListener("keydown",e=>{if(e.key==="Escape")setCartOpen(false)});
$("share-order").addEventListener("click",async()=>{
if(!cart.size){showToast("Your bag is empty. Add a favourite first.");return}
const lines=[...cart.entries()].map(([id,q])=>`${q} x ${find(id).name} - ${formatPrice(find(id).price*q)}`);
const total=[...cart.entries()].reduce((s,[id,q])=>s+find(id).price*q,0);
const text=`Vetrivelan Crackers order enquiry\n${lines.join("\n")}\nEstimated total: ${formatPrice(total)}\n\nPlease confirm availability and delivery details.`;
try{if(navigator.share)await navigator.share({title:"Vetrivelan Crackers order",text});else{await navigator.clipboard.writeText(text);showToast("Order summary copied to clipboard")}}
catch(err){if(err.name!=="AbortError")showToast("Unable to share right now. Please try again.")}});

/* ---------- Scroll effects ---------- */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{threshold:.15});
document.querySelectorAll(".reveal").forEach(el=>io.observe(el));
addEventListener("scroll",()=>{const h=document.documentElement;
$("progress").style.transform=`scaleX(${scrollY/Math.max(1,h.scrollHeight-innerHeight)})`;
$("header").classList.toggle("scrolled",scrollY>30)},{passive:true});
/* 3D tilt on product cards (pointer devices only) */
if(!reduce&&matchMedia("(hover:hover)").matches){
productGrid.addEventListener("pointermove",e=>{const c=e.target.closest(".product-card");if(!c)return;const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.transform=`perspective(700px) rotateY(${x*8}deg) rotateX(${-y*8}deg) translateY(-4px)`});
productGrid.addEventListener("pointerout",e=>{const c=e.target.closest(".product-card");if(c)c.style.transform=""})}

renderFilters();renderProducts();renderCart();
/* delivery van: starts when scrolled into view, replay on demand */
(function(){const d=$("delivery");
new IntersectionObserver((es,o)=>{if(es[0].isIntersecting){d.classList.add("go");o.disconnect()}},{threshold:.35}).observe(d);
$("dl-replay").addEventListener("click",()=>{d.classList.remove("go");void d.offsetWidth;d.classList.add("go")})})();
/* splash: logo reveal, then circle-wipe into the landing page */
(function(){const s=$("splash");let done=false;scrollTo(0,0);
function end(){if(done)return;done=true;s.classList.add("out");
setTimeout(()=>document.body.classList.remove("splashing"),450);
setTimeout(()=>{s.remove();},1350)}
setTimeout(end,reduce?900:3400);$("sp-skip").addEventListener("click",end)})();