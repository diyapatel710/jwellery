// ==============================
//  Jwello — Main JavaScript
// ==============================

// ── PRELOADER
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('preloader')?.classList.add('hidden');
  }, 1200);
});

// ── CURSOR
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
if (cursor && window.innerWidth > 768) {
  let mx = 0, my = 0, fx = 0, fy = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';
  });
  const animateFollower = () => {
    fx += (mx - fx) * 0.12;
    fy += (my - fy) * .12;
    follower.style.left = fx + 'px';
    follower.style.top = fy + 'px';
    requestAnimationFrame(animateFollower);
  };
  animateFollower();
  document.querySelectorAll('a, button, .cat-card, .product-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(2)';
      follower.style.transform = 'translate(-50%,-50%) scale(1.5)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(1)';
      follower.style.transform = 'translate(-50%,-50%) scale(1)';
    });
  });
}

// ── NAVBAR SCROLL
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar?.classList.toggle('scrolled', window.scrollY > 50);
});

// ── HAMBURGER
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navMenu?.classList.toggle('open');
  document.body.style.overflow = navMenu?.classList.contains('open') ? 'hidden' : '';
});
navMenu?.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', () => {
  hamburger?.classList.remove('open');
  navMenu.classList.remove('open');
  document.body.style.overflow = '';
}));

// ── HERO PARTICLES
const particleContainer = document.getElementById('particles');
if (particleContainer) {
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.style.cssText = `
      position:absolute;
      width:${Math.random() * 2 + 1}px;
      height:${Math.random() * 2 + 1}px;
      background:rgba(201,168,76,${Math.random() * 0.4 + 0.1});
      border-radius:50%;
      top:${Math.random() * 100}%;
      left:${Math.random() * 100}%;
      animation: floatGem ${Math.random() * 4 + 3}s ease-in-out infinite;
      animation-delay:${Math.random() * -5}s;
    `;
    particleContainer.appendChild(p);
  }
}

// ── CART STATE
let cart = JSON.parse(localStorage.getItem('jwello_cart') || '[]');
const updateCartBadge = () => {
  const total = cart.reduce((s, i) => s + i.qty, 0);
  document.querySelectorAll('#cartBadge').forEach(b => b.textContent = total);
};
updateCartBadge();

// ── TOAST
const showToast = (msg) => {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
};

// ── PRODUCTS DATA
const products = [
  { id: 1, name: 'Diamond Solitaire Ring', cat: 'diamond', type: 'rings', price: 45999, old: 52000, icon: '💍', badge: 'Bestseller', off: '12%' },
  { id: 2, name: 'Gold Twisted Bangle', cat: 'gold', type: 'bracelets', price: 18500, old: 22000, icon: '🏅', badge: 'New', off: '16%' },
  { id: 3, name: 'Pearl Drop Earrings', cat: 'silver', type: 'earrings', price: 4200, old: 5500, icon: '✨', badge: '', off: '24%' },
  { id: 4, name: 'Emerald Pendant Set', cat: 'gold', type: 'necklaces', price: 32000, old: 38000, icon: '📿', badge: 'Sale', off: '16%' },
  { id: 5, name: 'Silver Jhumka Earrings', cat: 'silver', type: 'earrings', price: 2800, old: 3500, icon: '🪬', badge: '', off: '20%' },
  { id: 6, name: 'Ruby Cocktail Ring', cat: 'gold', type: 'rings', price: 28000, old: 33500, icon: '❤️', badge: 'Popular', off: '16%' },
  { id: 7, name: 'Diamond Tennis Bracelet', cat: 'diamond', type: 'bracelets', price: 85000, old: 95000, icon: '💎', badge: 'Luxury', off: '11%' },
  { id: 8, name: 'Antique Gold Necklace', cat: 'gold', type: 'necklaces', price: 52000, old: 60000, icon: '🌟', badge: 'Heritage', off: '13%' },
];

const renderProducts = (filter = 'all') => {
  const grid = document.getElementById('productGrid');
  if (!grid) return;
  const filtered = filter === 'all' ? products : products.filter(p => p.cat === filter);
  grid.innerHTML = filtered.map(p => `
    <div class="product-card reveal" data-id="${p.id}">
      <div class="product-img">
        ${p.icon}
        <div class="product-actions">
          <button class="action-btn" title="Wishlist">❤</button>
          <button class="action-btn" title="Quick View">👁</button>
        </div>
        ${p.badge ? `<div class="product-badge">${p.badge}</div>` : ''}
      </div>
      <div class="product-info">
        <p class="product-category">${p.type}</p>
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

  // Re-observe new cards
  document.querySelectorAll('.product-card').forEach(c => observer.observe(c));

  // Cart listeners
  grid.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = +btn.dataset.id;
      const name = btn.dataset.name;
      const price = +btn.dataset.price;
      const existing = cart.find(i => i.id === id);
      if (existing) existing.qty++;
      else cart.push({ id, name, price, qty: 1 });
      localStorage.setItem('jwello_cart', JSON.stringify(cart));
      updateCartBadge();
      showToast(`✦ ${name} added to cart`);
      btn.textContent = 'Added ✓';
      btn.style.background = 'var(--gold)';
      btn.style.color = 'var(--dark)';
      setTimeout(() => {
        btn.textContent = 'Add to Cart';
        btn.style.background = '';
        btn.style.color = '';
      }, 1800);
    });
  });
};

// ── FILTER TABS
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderProducts(btn.dataset.filter);
  });
});

// ── INTERSECTION OBSERVER (Scroll Reveal)
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ── NEWSLETTER
document.getElementById('newsletterForm')?.addEventListener('submit', e => {
  e.preventDefault();
  showToast('✦ Thank you! Check your inbox for 10% off.');
  e.target.reset();
});

// ── CAT CARD CLICKS
document.querySelectorAll('.cat-card[data-href]').forEach(card => {
  card.addEventListener('click', () => window.location = card.dataset.href);
});

// ── INIT
renderProducts();
