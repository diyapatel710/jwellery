// ── ADMIN JS ──

// Sidebar toggle (mobile)
const sidebarToggle = document.getElementById('sidebarToggle');
const adminSidebar = document.getElementById('adminSidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');

sidebarToggle?.addEventListener('click', () => {
  adminSidebar?.classList.toggle('open');
  sidebarOverlay?.classList.toggle('show');
  document.body.style.overflow = adminSidebar?.classList.contains('open') ? 'hidden' : '';
});
sidebarOverlay?.addEventListener('click', () => {
  adminSidebar?.classList.remove('open');
  sidebarOverlay?.classList.remove('show');
  document.body.style.overflow = '';
});

// ── COUNTER ANIMATION
const counters = document.querySelectorAll('.stat-value[data-count]');
const animateCounter = (el) => {
  const target = +el.dataset.count;
  const isRupees = target > 10000;
  const dur = 1800;
  const step = 16;
  const inc = target / (dur / step);
  let cur = 0;
  const timer = setInterval(() => {
    cur = Math.min(cur + inc, target);
    if (isRupees) {
      el.textContent = '₹' + Math.floor(cur).toLocaleString('en-IN');
    } else {
      el.textContent = Math.floor(cur).toLocaleString('en-IN');
    }
    if (cur >= target) clearInterval(timer);
  }, step);
};

const statObserver = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { animateCounter(e.target); statObserver.unobserve(e.target); } });
}, { threshold: 0.3 });
counters.forEach(c => statObserver.observe(c));

// ── MINI CHART (canvas-based)
const canvas = document.getElementById('revenueChart');
if (canvas) {
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.parentElement.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = 220 * dpr;
  canvas.style.width = rect.width + 'px';
  canvas.style.height = '220px';
  ctx.scale(dpr, dpr);
  const W = rect.width, H = 220;

  const data = [180, 240, 195, 310, 285, 420, 380, 510, 460, 590, 520, 680];
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const maxVal = Math.max(...data);
  const pad = { t: 20, r: 20, b: 40, l: 50 };
  const cW = W - pad.l - pad.r;
  const cH = H - pad.t - pad.b;

  // Grid lines
  ctx.strokeStyle = 'rgba(0,0,0,0.05)';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const y = pad.t + (cH / 4) * i;
    ctx.beginPath(); ctx.moveTo(pad.l, y); ctx.lineTo(pad.l + cW, y); ctx.stroke();
    ctx.fillStyle = 'rgba(0,0,0,0.3)'; ctx.font = '10px Jost';
    ctx.textAlign = 'right';
    const val = Math.round(maxVal * (1 - i/4));
    ctx.fillText('₹' + val + 'K', pad.l - 6, y + 3);
  }

  // X labels
  ctx.fillStyle = 'rgba(0,0,0,0.4)'; ctx.font = '10px Jost'; ctx.textAlign = 'center';
  months.forEach((m, i) => {
    const x = pad.l + (i / (data.length - 1)) * cW;
    ctx.fillText(m, x, H - 8);
  });

  // Gradient fill
  const points = data.map((v, i) => ({
    x: pad.l + (i / (data.length - 1)) * cW,
    y: pad.t + (1 - v / maxVal) * cH
  }));

  const grad = ctx.createLinearGradient(0, pad.t, 0, pad.t + cH);
  grad.addColorStop(0, 'rgba(201,168,76,0.3)');
  grad.addColorStop(1, 'rgba(201,168,76,0)');

  ctx.beginPath();
  ctx.moveTo(points[0].x, pad.t + cH);
  points.forEach(p => ctx.lineTo(p.x, p.y));
  ctx.lineTo(points[points.length-1].x, pad.t + cH);
  ctx.closePath();
  ctx.fillStyle = grad; ctx.fill();

  // Line
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    const cp1x = (points[i-1].x + points[i].x) / 2;
    ctx.bezierCurveTo(cp1x, points[i-1].y, cp1x, points[i].y, points[i].x, points[i].y);
  }
  ctx.strokeStyle = '#C9A84C'; ctx.lineWidth = 2.5;
  ctx.lineJoin = 'round'; ctx.stroke();

  // Dots
  points.forEach(p => {
    ctx.beginPath(); ctx.arc(p.x, p.y, 3.5, 0, Math.PI * 2);
    ctx.fillStyle = '#C9A84C'; ctx.fill();
    ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.5; ctx.stroke();
  });
}

// ── ORDERS TABLE
const ordersData = [
  { id:'#AUR-4821', customer:'Priya Sharma', product:'Diamond Solitaire Ring', amount:'₹45,999', status:'delivered', date:'Apr 12, 2025' },
  { id:'#AUR-4820', customer:'Anjali Patel', product:'Gold Twisted Bangle', amount:'₹18,500', status:'processing', date:'Apr 12, 2025' },
  { id:'#AUR-4819', customer:'Meera Iyer', product:'Emerald Pendant Set', amount:'₹32,000', status:'shipped', date:'Apr 11, 2025' },
  { id:'#AUR-4818', customer:'Sonal Desai', product:'Pearl Choker Necklace', amount:'₹8,800', status:'pending', date:'Apr 11, 2025' },
  { id:'#AUR-4817', customer:'Kavita Rao', product:'Ruby Cocktail Ring', amount:'₹28,000', status:'delivered', date:'Apr 10, 2025' },
  { id:'#AUR-4816', customer:'Neha Joshi', product:'Silver Jhumka Earrings', amount:'₹2,800', status:'cancelled', date:'Apr 10, 2025' },
];

const ordersTable = document.getElementById('ordersTable');
if (ordersTable) {
  ordersTable.innerHTML = ordersData.map(o => `
    <tr>
      <td><span class="order-id">${o.id}</span></td>
      <td>${o.customer}</td>
      <td>${o.product}</td>
      <td><strong>${o.amount}</strong></td>
      <td><span class="status-badge ${o.status}">${o.status.charAt(0).toUpperCase() + o.status.slice(1)}</span></td>
      <td>${o.date}</td>
      <td><button class="table-btn">View</button></td>
    </tr>
  `).join('');
}

// Chart tabs
document.querySelectorAll('.chart-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.chart-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
  });
});
