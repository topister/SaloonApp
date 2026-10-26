'use strict';

// Sample style photos are loaded from Unsplash. Change prices or image URLs in the dashboard.
const defaultStyles = [
  {id:'br1',name:'Simple cornrows',category:'braiding',price:800,duration:'1 hour',description:'Neat, simple straight-back cornrows.',icon:'👩🏾‍🦱',image:'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&w=900&q=80'},
  {id:'br2',name:'Feed-in braids',category:'braiding',price:1500,duration:'1.5 hours',description:'Clean feed-in braids with a smooth finish.',icon:'✨',image:'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=900&q=80'},
  {id:'br3',name:'Box braids',category:'braiding',price:2500,duration:'3 hours',description:'Classic individual braids. Price may vary by length.',icon:'💁🏾‍♀️',image:'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80'},
  {id:'br4',name:'Knotless braids',category:'braiding',price:3500,duration:'4 hours',description:'Lightweight knotless look; medium length sample price.',icon:'🌸',image:'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=900&q=80'},
  {id:'br5',name:'Goddess braids',category:'braiding',price:4000,duration:'4 hours',description:'Braids with a soft, curly finish.',icon:'🌺',image:'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80'},
  {id:'br6',name:'Faux locs',category:'braiding',price:4500,duration:'4 hours',description:'Protective loc-inspired style.',icon:'🌿',image:'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=900&q=80'},
  {id:'mn1',name:'Simple low cut',category:'mens',price:300,duration:'20 minutes',description:'Clean and simple low haircut.',icon:'🧔🏾',image:'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=900&q=80'},
  {id:'mn2',name:'Skin fade',category:'mens',price:500,duration:'30 minutes',description:'A smooth fade with a sharp finish.',icon:'✂️',image:'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=900&q=80'},
  {id:'mn3',name:'Taper fade',category:'mens',price:600,duration:'35 minutes',description:'Tapered sides and a tidy shape-up.',icon:'💈',image:'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=900&q=80'},
  {id:'mn4',name:'Waves / brush cut',category:'mens',price:500,duration:'30 minutes',description:'Low cut shaped for a wave style.',icon:'🌀',image:'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=900&q=80'},
  {id:'mn5',name:'Haircut + beard trim',category:'mens',price:700,duration:'45 minutes',description:'Haircut with a clean beard line-up.',icon:'🧔🏾',image:'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=80'},
  {id:'mn6',name:'Beard trim only',category:'mens',price:200,duration:'15 minutes',description:'Tidy up and shape your beard.',icon:'🪒',image:'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=900&q=80'},
  {id:'ot1',name:'Hair wash & blow-dry',category:'other',price:1000,duration:'45 minutes',description:'Wash and finish for a fresh look.',icon:'🧴',image:'https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=900&q=80'},
  {id:'ot2',name:'Manicure',category:'other',price:700,duration:'45 minutes',description:'Nail shaping and tidy care.',icon:'💅🏾',image:'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=900&q=80'},
  {id:'ot3',name:'Pedicure',category:'other',price:1000,duration:'1 hour',description:'Relaxing foot and nail care.',icon:'✨',image:'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=900&q=80'}
];

const $ = id => document.getElementById(id);
const today = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; };
function load(key, fallback) { try { const value = localStorage.getItem(key); return value ? JSON.parse(value) : fallback; } catch { return fallback; } }
let styles = load('salon_styles_v2', defaultStyles);
let bookings = load('salon_bookings_v2', []);
let salonName = load('salon_name_v2', 'Salon Studio');
let currentCategory = 'braiding';
function save() { try { localStorage.setItem('salon_styles_v2', JSON.stringify(styles)); localStorage.setItem('salon_bookings_v2', JSON.stringify(bookings)); localStorage.setItem('salon_name_v2', JSON.stringify(salonName)); } catch { alert('Your browser could not save the changes. Check browser storage settings.'); } }
function esc(value) { return String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch])); }
function money(value) { return 'KSh ' + Number(value || 0).toLocaleString('en-KE'); }
function categoryName(category) { return ({braiding:'Braiding',mens:"Men's cuts",other:'Other services'})[category] || 'Other services'; }

function renderStyles() {
  $('brandName').textContent = salonName;
  const shown = styles.filter(style => style.category === currentCategory);
  $('styleGrid').innerHTML = shown.length ? shown.map(style => `
    <article class="style-card">
      ${style.image ? `<img class="style-photo" src="${esc(style.image)}" alt="${esc(style.name)} hairstyle example" loading="lazy" onerror="this.hidden=true;this.nextElementSibling.hidden=false">` : ''}
      <div class="style-photo-fallback" ${style.image ? 'hidden' : ''} aria-hidden="true">${esc(style.icon || '✂️')}</div>
      <div class="style-content"><h3>${esc(style.name)}</h3><p>${esc(style.description || categoryName(style.category))}</p><div class="style-meta"><span class="price">${money(style.price)}</span><span class="duration">◷ ${esc(style.duration || 'Ask salon')}</span></div><button class="button" type="button" onclick="selectStyle('${esc(style.id)}')">Choose this style</button></div>
    </article>`).join('') : '<div class="empty">No styles in this category yet. Add some in the salon dashboard.</div>';
  $('styleManageList').innerHTML = styles.map(style => `<div class="manage-row"><div><strong>${esc(style.name)}</strong><p>${esc(categoryName(style.category))} · ${money(style.price)} · ${esc(style.duration || 'Duration not set')}</p></div><div class="manage-actions"><button class="button secondary" type="button" onclick="editStyle('${esc(style.id)}')">Edit</button><button class="button danger" type="button" onclick="deleteStyle('${esc(style.id)}')">Remove</button></div></div>`).join('') || '<p class="muted">No styles added yet.</p>';
}
function selectStyle(id) {
  const style = styles.find(item => item.id === id); if (!style) return;
  $('selectedStyle').value = style.name; $('selectedStyleId').value = style.id; $('selectedPrice').value = Number(style.price).toLocaleString('en-KE');
  $('bookingSection').scrollIntoView({behavior:'smooth'});
}
window.selectStyle = selectStyle;
function renderBookings() {
  const todays = bookings.filter(b => b.date === today());
  $('todayCount').textContent = todays.length;
  $('todaySales').textContent = money(todays.filter(b => b.status === 'Completed' && b.paid).reduce((sum,b) => sum + Number(b.price), 0));
  $('unpaidCount').textContent = bookings.filter(b => !b.paid && b.status !== 'Cancelled').length;
  const ordered = [...bookings].sort((a,b) => (a.date+a.time).localeCompare(b.date+b.time));
  $('bookingList').innerHTML = ordered.length ? ordered.map(b => `<article class="panel booking"><div><h3>${esc(b.name)} · ${esc(b.styleName)}</h3><p>📅 ${esc(b.date)} at ${esc(b.time)} · ${money(b.price)}</p><p>☎ ${esc(b.phone)} · ${esc(b.paymentMethod || 'Payment not selected')}${b.notes ? ' · '+esc(b.notes) : ''}</p><p><span class="pill ${esc(b.status)}">${esc(b.status)}</span> <span class="pill ${b.paid?'Completed':'Pending'}">${b.paid?'Paid':'Unpaid'}</span></p></div><div class="actions">${b.status !== 'Completed' && b.status !== 'Cancelled' ? `<button class="button" onclick="setStatus('${esc(b.id)}','Completed')">Complete</button>` : ''}${!b.paid && b.status !== 'Cancelled' ? `<button class="button secondary" onclick="markPaid('${esc(b.id)}')">Mark paid</button>` : ''}${b.status === 'Booked' ? `<button class="button ghost" onclick="setStatus('${esc(b.id)}','Cancelled')">Cancel</button>` : ''}<button class="button danger" onclick="deleteBooking('${esc(b.id)}')">Delete</button></div></article>`).join('') : '<div class="empty">No bookings yet. Customer requests will appear here.</div>';
}
window.setStatus = (id,status) => { bookings = bookings.map(b => b.id === id ? {...b,status} : b); save(); renderBookings(); };
window.markPaid = id => { bookings = bookings.map(b => b.id === id ? {...b,paid:true} : b); save(); renderBookings(); };
window.deleteBooking = id => { if (confirm('Delete this booking?')) { bookings = bookings.filter(b => b.id !== id); save(); renderBookings(); } };
window.deleteStyle = id => { if (confirm('Remove this style? Existing bookings will remain.')) { styles = styles.filter(s => s.id !== id); save(); renderStyles(); } };
window.editStyle = id => { const style = styles.find(s => s.id === id); if (!style) return; const newPrice = prompt(`New price for ${style.name} (KSh):`, style.price); if (newPrice === null) return; const price = Number(newPrice); if (!Number.isFinite(price) || price < 0) { alert('Enter a valid price.'); return; } const newDuration = prompt('Duration:', style.duration || '30 minutes'); if (newDuration === null) return; style.price = price; style.duration = newDuration.trim() || style.duration; save(); renderStyles(); };

document.querySelectorAll('[data-category]').forEach(button => button.addEventListener('click', () => {
  currentCategory = button.dataset.category;
  document.querySelectorAll('[data-category]').forEach(tab => tab.classList.toggle('active', tab === button));
  renderStyles();
}));
document.querySelectorAll('[data-view]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-view]').forEach(tab => tab.classList.toggle('active', tab === button));
  $('homeView').classList.toggle('hidden', button.dataset.view !== 'home');
  $('adminView').classList.toggle('hidden', button.dataset.view !== 'admin');
  if (button.dataset.view === 'admin') renderBookings();
  window.scrollTo({top:0,behavior:'smooth'});
}));
$('bookingDate').min = today();
$('bookingForm').addEventListener('submit', event => {
  event.preventDefault();
  const style = styles.find(item => item.id === $('selectedStyleId').value);
  if (!style) { alert('Please choose a style card before requesting a booking.'); return; }
  const date = $('bookingDate').value, time = $('bookingTime').value;
  if (date < today()) { alert('Please choose today or a future date.'); return; }
  if (bookings.some(b => b.date === date && b.time === time && b.status === 'Booked') && !confirm('There is already a booking at this time. Submit the request anyway?')) return;
  const booking = {id:'b'+Date.now(),name:$('customerName').value.trim(),phone:$('customerPhone').value.trim(),styleId:style.id,styleName:style.name,price:Number(style.price),date,time,paymentMethod:$('paymentMethod').value,notes:$('customerNotes').value.trim(),status:'Booked',paid:false,createdAt:new Date().toISOString()};
  bookings.push(booking); save(); $('bookingNotice').textContent = `Booking request saved for ${booking.styleName} on ${booking.date} at ${booking.time}. Please contact the salon to confirm.`; $('bookingNotice').classList.remove('hidden');
  $('bookingForm').reset(); $('selectedStyleId').value = ''; $('selectedStyle').value = ''; $('selectedPrice').value = ''; $('bookingDate').min = today(); renderBookings();
});
$('styleForm').addEventListener('submit', event => {
  event.preventDefault();
  const name = $('newStyleName').value.trim(), price = Number($('newStylePrice').value);
  if (!name || !Number.isFinite(price) || price < 0) return;
  styles.push({id:'custom'+Date.now(),name,price,category:$('newStyleCategory').value,duration:$('newStyleDuration').value,description:'Ask the salon for details about this style.',icon:'✨',image:$('newStyleImage').value.trim()});
  save(); renderStyles(); $('styleForm').reset();
});
$('editNameBtn').addEventListener('click', () => { const value = prompt('Enter your salon name:', salonName); if (value && value.trim()) { salonName = value.trim().slice(0,70); save(); renderStyles(); } });
$('exportBtn').addEventListener('click', () => {
  const rows = [['Customer','Phone','Style','Price KSh','Date','Time','Payment method','Status','Paid','Notes'], ...bookings.map(b => [b.name,b.phone,b.styleName,b.price,b.date,b.time,b.paymentMethod,b.status,b.paid?'Yes':'No',b.notes])];
  const csv = rows.map(row => row.map(value => '"'+String(value ?? '').replace(/"/g,'""')+'"').join(',')).join('\r\n');
  const blob = new Blob([csv],{type:'text/csv;charset=utf-8;'}), url = URL.createObjectURL(blob), link = document.createElement('a'); link.href = url; link.download = 'salon-bookings.csv'; link.click(); URL.revokeObjectURL(url);
});
$('resetBtn').addEventListener('click', () => { if (confirm('Clear demo bookings and restore the original sample styles? This cannot be undone.')) { styles = defaultStyles.map(style => ({...style})); bookings = []; salonName = 'Salon Studio'; save(); renderStyles(); renderBookings(); } });
renderStyles(); renderBookings();
