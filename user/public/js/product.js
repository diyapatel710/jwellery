// ── PRODUCT PAGE JS ──

// Gallery thumbnails
document.querySelectorAll('.thumb').forEach(thumb => {
  thumb.addEventListener('click', () => {
    document.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
    thumb.classList.add('active');
    const mainImg = document.getElementById('mainImg');
    if (mainImg) {
      mainImg.style.transform = 'scale(0.8)';
      setTimeout(() => {
        mainImg.textContent = thumb.dataset.emoji;
        mainImg.style.transform = 'scale(1)';
      }, 200);
    }
  });
});

// Option buttons
document.querySelectorAll('.option-buttons').forEach(group => {
  group.querySelectorAll('.opt-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      group.querySelectorAll('.opt-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      // Update label
      const label = group.previousElementSibling?.querySelector('.selected-val');
      if (label) label.textContent = btn.textContent;
    });
  });
});

// Quantity
let qty = 1;
document.getElementById('qtyMinus')?.addEventListener('click', () => {
  if (qty > 1) { qty--; document.getElementById('qtyVal').textContent = qty; }
});
document.getElementById('qtyPlus')?.addEventListener('click', () => {
  if (qty < 10) { qty++; document.getElementById('qtyVal').textContent = qty; }
});

// Wishlist
let wished = false;
document.getElementById('wishBtn')?.addEventListener('click', function () {
  wished = !wished;
  this.textContent = wished ? '♥' : '♡';
  this.classList.toggle('wished', wished);
  showToast(wished ? '♥ Added to Wishlist' : '♡ Removed from Wishlist');
});

// Add to cart
document.getElementById('addCartBtn')?.addEventListener('click', function () {
  let cart = JSON.parse(localStorage.getItem('Jwello_cart') || '[]');
  const existing = cart.find(i => i.id === 1);
  if (existing) existing.qty += qty;
  else cart.push({ id: 1, name: 'Diamond Solitaire Ring', price: 45999, qty });
  localStorage.setItem('Jwello_cart', JSON.stringify(cart));
  const total = cart.reduce((s, i) => s + i.qty, 0);
  document.querySelectorAll('#cartBadge').forEach(b => b.textContent = total);
  showToast(`✦ ${qty} item(s) added to cart`);
  this.textContent = 'Added ✓';
  this.style.background = 'var(--gold)';
  this.style.color = 'var(--dark)';
  setTimeout(() => { this.textContent = 'Add to Cart'; this.style.background = ''; this.style.color = ''; }, 2000);
});

// Buy now
document.getElementById('buyNowBtn')?.addEventListener('click', () => {
  window.location = 'checkout.html';
});

// Tabs
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('tab-' + btn.dataset.tab)?.classList.add('active');
  });
});

// Related products
const related = [
  { id: 2, name: 'Ruby Cocktail Ring', cat: 'rings', price: 28000, old: 33500, icon: '❤️', badge: 'Popular', off: '16%' },
  { id: 3, name: 'Rose Gold Stackable Ring', cat: 'rings', price: 12500, old: 14000, icon: '🌹', badge: '', off: '11%' },
  { id: 4, name: 'Sapphire Eternity Ring', cat: 'rings', price: 38000, old: 44000, icon: '💙', badge: 'New', off: '14%' },
  { id: 5, name: 'Antique Gold Band', cat: 'rings', price: 8500, old: 10000, icon: '🔮', badge: '', off: '15%' },
];
const relatedGrid = document.getElementById('relatedGrid');
if (relatedGrid) {
  relatedGrid.innerHTML = related.map(p => `
    <div class="product-card reveal">
      <div class="product-img">${p.icon}
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
        <button class="add-to-cart">Add to Cart</button>
      </div>
    </div>
  `).join('');
  relatedGrid.querySelectorAll('.reveal').forEach(el => setTimeout(() => el.classList.add('visible'), 100));
}
