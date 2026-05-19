// ── SHOP JS ──
const allProducts = [
  { id: 1, name: 'Diamond Solitaire Ring', cat: 'rings', metal: 'gold', price: 45999, old: 52000, icon: '💍', badge: 'Bestseller', off: '12%' },
  { id: 2, name: 'Gold Twisted Bangle', cat: 'bracelets', metal: 'gold', price: 18500, old: 22000, icon: '🏅', badge: 'New', off: '16%' },
  { id: 3, name: 'Pearl Drop Earrings', cat: 'earrings', metal: 'silver', price: 4200, old: 5500, icon: '✨', badge: '', off: '24%' },
  { id: 4, name: 'Emerald Pendant Set', cat: 'necklaces', metal: 'gold', price: 32000, old: 38000, icon: '📿', badge: 'Sale', off: '16%' },
  { id: 5, name: 'Silver Jhumka Earrings', cat: 'earrings', metal: 'silver', price: 2800, old: 3500, icon: '🪬', badge: '', off: '20%' },
  { id: 6, name: 'Ruby Cocktail Ring', cat: 'rings', metal: 'gold', price: 28000, old: 33500, icon: '❤️', badge: 'Popular', off: '16%' },
  { id: 7, name: 'Diamond Tennis Bracelet', cat: 'bracelets', metal: 'gold', price: 85000, old: 95000, icon: '💎', badge: 'Luxury', off: '11%' },
  { id: 8, name: 'Antique Gold Necklace', cat: 'necklaces', metal: 'gold', price: 52000, old: 60000, icon: '🌟', badge: 'Heritage', off: '13%' },
  { id: 9, name: 'Rose Gold Stackable Ring', cat: 'rings', metal: 'rose-gold', price: 12500, old: 14000, icon: '🌹', badge: '', off: '11%' },
  { id: 10, name: 'Pearl Choker Necklace', cat: 'necklaces', metal: 'silver', price: 8800, old: 11000, icon: '⚪', badge: 'Trending', off: '20%' },
  { id: 11, name: 'Sapphire Stud Earrings', cat: 'earrings', metal: 'gold', price: 19000, old: 22000, icon: '💙', badge: '', off: '14%' },
  { id: 12, name: 'Gold Kada Bracelet', cat: 'bracelets', metal: 'gold', price: 35000, old: 40000, icon: '⭕', badge: '', off: '12%' },
];

const shopGrid = document.getElementById('shopGrid');
let cart2 = JSON.parse(localStorage.getItem('Jwello_cart') || '[]');

function renderShopGrid(items) {
  if (!shopGrid) return;
  shopGrid.innerHTML = items.map(p => `
    <div class="product-card reveal">
      <div class="product-img">
        ${p.icon}
        <div class="product-actions">
          <button class="action-btn">❤</button>
          <button class="action-btn">👁</button>
        </div>
        ${p.badge ? `<div class="product-badge">${p.badge}</div>` : ''}
      </div>
      <div class="product-info">
        <p class="product-category">${p.cat}</p>
        <h3 class="product-name">${p.name}</h3>
        <div class="product-price">
          <span class="price-current">₹${p.price.toLocaleString('en-IN')}</span>
          <span class="price-old">₹${p.old.toLocaleString('en-IN')}</span>
          <span class="price-off">${p.off} off</span>
        </div>
        <button class="add-to-cart" data-id="${p.id}" data-name="${p.name}" data-price="${p.price}">Add to Cart</button>
      </div>
    </div>
  `).join('');

  // Reveal
  shopGrid.querySelectorAll('.reveal').forEach(el => {
    setTimeout(() => el.classList.add('visible'), 50);
  });

  // Cart
  shopGrid.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = +btn.dataset.id;
      const name = btn.dataset.name;
      const price = +btn.dataset.price;
      const existing = cart2.find(i => i.id === id);
      if (existing) existing.qty++;
      else cart2.push({ id, name, price, qty: 1 });
      localStorage.setItem('Jwello_cart', JSON.stringify(cart2));
      const total = cart2.reduce((s, i) => s + i.qty, 0);
      document.querySelectorAll('#cartBadge').forEach(b => b.textContent = total);
      showToast(`✦ ${name} added to cart`);
    });
  });
}

// Initial render
renderShopGrid(allProducts);

// Price Range
const priceRange = document.getElementById('priceRange');
const priceVal = document.getElementById('priceVal');
priceRange?.addEventListener('input', () => {
  priceVal.textContent = '₹' + parseInt(priceRange.value).toLocaleString('en-IN');
});

// Filter toggle (mobile)
const filterToggle = document.getElementById('filterToggle');
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const sidebarClose = document.getElementById('sidebarClose');

filterToggle?.addEventListener('click', () => {
  sidebar?.classList.add('open');
  sidebarOverlay?.classList.add('show');
  document.body.style.overflow = 'hidden';
});
const closeSidebar = () => {
  sidebar?.classList.remove('open');
  sidebarOverlay?.classList.remove('show');
  document.body.style.overflow = '';
};
sidebarClose?.addEventListener('click', closeSidebar);
sidebarOverlay?.addEventListener('click', closeSidebar);

// Sort
document.getElementById('sortSelect')?.addEventListener('change', function () {
  let sorted = [...allProducts];
  if (this.value === 'Price: Low to High') sorted.sort((a, b) => a.price - b.price);
  if (this.value === 'Price: High to Low') sorted.sort((a, b) => b.price - a.price);
  renderShopGrid(sorted);
});

// URL param filter
const params = new URLSearchParams(window.location.search);
const catParam = params.get('cat');
if (catParam) {
  const filtered = allProducts.filter(p => p.cat === catParam);
  renderShopGrid(filtered.length ? filtered : allProducts);
}
