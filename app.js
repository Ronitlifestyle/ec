// --- Tab Navigation ---
document.addEventListener('DOMContentLoaded', () => {
  // Tab switching
  const tabBtns = document.querySelectorAll('.tab-btn');
  const sections = ['homeSection', 'searchSection', 'aboutSection', 'contactSection'];
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      sections.forEach(sec => {
        document.getElementById(sec).classList.add('hidden');
      });
      tabBtns.forEach(b => b.classList.remove('text-green-600'));
      btn.classList.add('text-green-600');
      btn.classList.remove('text-gray-400');
      document.getElementById(btn.dataset.tab).classList.remove('hidden');
      document.getElementById(btn.dataset.tab).classList.add('block');
      if (btn.dataset.tab === 'searchSection') {
        setTimeout(() => document.getElementById('searchInput').focus(), 100);
      }
      if (btn.dataset.tab === 'homeSection') {
        renderProducts(products);
        setupCategoryFilter();
      }
    });
  });

  // Home
  renderProducts(products);
  setupCategoryFilter();

  // Search
  setupSearch();

  // Modal close
  document.getElementById('closeProductModal').onclick = closeProductModal;
  document.getElementById('productModal').onclick = function(e) {
    if (e.target === this) closeProductModal();
  };
});

// --- Product Modal ---
let modalProduct = null;
let modalImages = [];
let modalMainImgIndex = 0;
function openProductModal(product) {
  modalProduct = product;
  // Demo: Use main image + 2 sample images for thumbnails if only one image
  modalImages = [product.image];
  if (!product.images) {
    modalImages.push(
      'https://images.pexels.com/photos/715688/pexels-photo-715688.jpeg?auto=compress&w=400',
      'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&w=400'
    );
  } else {
    modalImages = product.images;
  }
  modalMainImgIndex = 0;
  updateProductModalImage();
  // Thumbnails
  const thumbs = modalImages.map((img, i) =>
    `<img src="${img}" data-idx="${i}" class="rounded-lg object-contain w-16 h-16 md:w-20 md:h-20 border-2 ${i === 0 ? 'border-green-500' : 'border-transparent'} cursor-pointer bg-gray-100 hover:border-green-600 transition" />`
  ).join('');
  document.getElementById('modalThumbs').innerHTML = thumbs;
  Array.from(document.getElementById('modalThumbs').children).forEach((thumb, i) => {
    thumb.onclick = () => {
      modalMainImgIndex = i;
      updateProductModalImage();
      Array.from(document.getElementById('modalThumbs').children).forEach((t, j) => {
        t.classList.toggle('border-green-500', j === i);
        t.classList.toggle('border-transparent', j !== i);
      });
    };
  });
  document.getElementById('modalName').textContent = product.name;
  document.getElementById('modalStock').textContent = product.stock;
  document.getElementById('modalDesc').textContent = product.description;
  document.getElementById('modalPrice').textContent = `₹${product.price}`;
  // WhatsApp button
  const waMsg = encodeURIComponent(`Hello, I'm interested in ${product.name} priced at ₹${product.price}`);
  const waLink = `https://wa.me/918617806375?text=${waMsg}`;
  const waBtn = document.getElementById('modalAddCart');
  waBtn.textContent = 'WhatsApp';
  waBtn.onclick = () => { window.open(waLink, '_blank'); };
  document.getElementById('productModal').classList.remove('hidden');
}
function updateProductModalImage() {
  const mainImg = document.getElementById('modalMainImg');
  mainImg.src = modalImages[modalMainImgIndex];
  mainImg.alt = modalProduct ? modalProduct.name : '';
}
function closeProductModal() {
  document.getElementById('productModal').classList.add('hidden');
  modalProduct = null;
  modalImages = [];
  modalMainImgIndex = 0;
}

// --- Home Section ---
function renderProducts(productList) {
  const grid = document.getElementById('productGrid');
  grid.innerHTML = '';
  if (!productList.length) {
    grid.innerHTML = '<div class="col-span-2 text-center text-gray-400 py-8">No products found.</div>';
    return;
  }
  productList.forEach(product => {
    grid.appendChild(productCard(product));
  });
}

function productCard(product) {
  const card = document.createElement('div');
  card.className = 'bg-white rounded-xl shadow p-3 flex flex-col items-center hover:shadow-lg transition cursor-pointer min-h-[180px] md:min-h-[220px] lg:min-h-[320px] lg:p-6';
  const shortDesc = product.description.length > 50 ? product.description.slice(0, 50) + '...' : product.description;
  card.innerHTML = `
    <img src="${product.image}" alt="${product.name}" class="w-20 h-20 md:w-28 md:h-28 lg:w-40 lg:h-40 object-contain mb-2 rounded-lg">
    <div class="w-full flex justify-between items-center mb-1">
      <span class="text-xs md:text-sm lg:text-base text-gray-500">${product.stock}</span>
      <span class="text-xs md:text-sm lg:text-base text-yellow-500 flex items-center">5.0 <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"h-4 w-4 ml-0.5\" fill=\"currentColor\" viewBox=\"0 0 20 20\"><path d=\"M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z\"/></svg></span>
    </div>
    <h3 class="font-semibold text-base md:text-lg lg:text-xl mb-1 w-full truncate">${product.name}</h3>
    <div class="w-full text-xs md:text-sm lg:text-base text-gray-600 mb-2 flex items-center">
      <span class="desc-text">${shortDesc}</span>
      ${product.description.length > 50 ? `<button class="ml-1 text-blue-500 read-more-btn" title="Read More"><svg xmlns='http://www.w3.org/2000/svg' class='h-4 w-4 inline' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M13 7l5 5m0 0l-5 5m5-5H6'/></svg></button>` : ''}
    </div>
    <div class="w-full flex items-end justify-between mt-auto">
      <a href="https://wa.me/918617806375?text=${encodeURIComponent(`Hello, I'm interested in ${product.name} priced at ₹${product.price}`)}" target="_blank" rel="noopener" class="whatsapp-btn bg-green-500 hover:bg-green-600 text-white px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm lg:text-base font-semibold ml-2 flex items-center justify-center gap-1 w-full transition">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline-block" fill="currentColor" viewBox="0 0 24 24"><path d="M20.52 3.48A12.07 12.07 0 0012 0C5.37 0 0 5.37 0 12a11.93 11.93 0 001.64 6.06L0 24l6.18-1.62A12.09 12.09 0 0012 24c6.63 0 12-5.37 12-12a11.93 11.93 0 00-3.48-8.52zM12 22a9.93 9.93 0 01-5.1-1.4l-.36-.21-3.67.96.98-3.58-.23-.37A9.94 9.94 0 1122 12c0 5.52-4.48 10-10 10zm5.47-7.14c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.77-1.68-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.48-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.05 1.02-1.05 2.5 0 1.48 1.08 2.91 1.23 3.11.15.2 2.13 3.25 5.18 4.42.72.25 1.28.4 1.72.51.72.18 1.38.15 1.9.09.58-.07 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.08-.12-.28-.2-.58-.35z"/></svg>
        WhatsApp
      </a>
    </div>
  `;
  if (product.description.length > 50) {
    card.querySelector('.read-more-btn').onclick = function (e) {
      e.stopPropagation();
      const descSpan = card.querySelector('.desc-text');
      if (descSpan.textContent.endsWith('...')) {
        descSpan.textContent = product.description;
        this.innerHTML = `<svg xmlns='http://www.w3.org/2000/svg' class='h-4 w-4 inline' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M7 11l-5 5m0 0l5 5m-5-5h12'/></svg>`;
        this.title = 'Read Less';
      } else {
        descSpan.textContent = shortDesc;
        this.innerHTML = `<svg xmlns='http://www.w3.org/2000/svg' class='h-4 w-4 inline' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M13 7l5 5m0 0l-5 5m5-5H6'/></svg>`;
        this.title = 'Read More';
      }
    };
  }
  card.onclick = (e) => {
    if (!e.target.classList.contains('whatsapp-btn') && !e.target.classList.contains('read-more-btn')) {
      openProductModal(product);
    }
  };
  return card;
}

function setupCategoryFilter() {
  const filterDiv = document.getElementById('categoryFilter');
  filterDiv.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      Array.from(filterDiv.children).forEach(btn => {
        btn.classList.remove('bg-green-500', 'text-white');
        btn.classList.add('bg-gray-100', 'text-gray-700');
      });
      e.target.classList.add('bg-green-500', 'text-white');
      e.target.classList.remove('bg-gray-100', 'text-gray-700');
      const category = e.target.getAttribute('data-category');
      let filtered = products;
      if (category && category !== 'All') {
        filtered = products.filter(p => p.category === category);
      }
      renderProducts(filtered);
    }
  });
}

// --- Search Section ---
function setupSearch() {
  const searchInput = document.getElementById('searchInput');
  const searchGrid = document.getElementById('searchGrid');
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();
    let filtered = products.filter(p =>
      p.name.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query)
    );
    renderSearchResults(filtered);
  });
  renderSearchResults(products);
}

function renderSearchResults(productList) {
  const grid = document.getElementById('searchGrid');
  grid.innerHTML = '';
  if (!productList.length) {
    grid.innerHTML = '<div class="col-span-2 text-center text-gray-400 py-8">No products found.</div>';
    return;
  }
  productList.forEach(product => {
    grid.appendChild(productCard(product));
  });
}

// --- About Section ---
function renderAbout() {
  // Implementation of renderAbout function
}

// --- Contact Section ---
function renderContact() {
  // Implementation of renderContact function
} 