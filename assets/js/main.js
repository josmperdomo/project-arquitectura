/**
 * Arquitectura Bosque - Interactive Controller
 * Premium Architecture Studio Experience
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initModelFilter();
  initModelModal();
  initCalculator();
  initGalleryFilter();
  initLightbox();
  initContactForm();
  initBackToTop();
});

/**
 * 1. Navbar Sticky & Mobile Drawer
 */
function initNavbar() {
  const header = document.querySelector('.site-header');
  const toggleBtn = document.getElementById('menuToggle');
  const navDrawer = document.getElementById('navDrawer');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  if (toggleBtn && navDrawer) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = navDrawer.classList.toggle('active');
      toggleBtn.classList.toggle('active');
      toggleBtn.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navDrawer.classList.remove('active');
        toggleBtn.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }
}

/**
 * 2. Modelos Filter Tabs
 */
function initModelFilter() {
  const filterBtns = document.querySelectorAll('.model-filter-btn');
  const modelCards = document.querySelectorAll('.model-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      modelCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'grid';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

/**
 * 3. Model Ficha Técnica Modal
 */
const modelData = {
  basico: {
    title: 'Modelo Básico',
    subtitle: 'Refugio Bioclimático de Entrada',
    area: '140 m²',
    terreno: 'Desde 1.000 m²',
    distribucion: '2 Dormitorios (1 en Suite) · 2 Baños completos · Living Comedor con Chimenea Integrada',
    materiales: 'Pino Oregón tratado en autoclave, base de piedra volcánica, ventanales termopanel Low-E',
    climatizacion: 'Aislamiento de celulosa proyectada R-24, orientación solar pasiva norte-nororiente',
    plazo: '5 a 6 meses de ejecución in-situ',
    inversion: '$85.000 USD',
    image: 'assets/img/modelo_basico.jpg',
    features: [
      'Terraza deck perimetral de 35 m²',
      'Cocina americana con cubierta de granito rústico',
      'Cubierta inclinada con preparación para nieve y lluvia torrencial',
      'Sistema de recolección de aguas lluvias de 2.000 litros incluido'
    ]
  },
  premier: {
    title: 'Modelo Premier',
    subtitle: 'Residencia Familiar de Alto Confort',
    area: '210 m²',
    terreno: 'Desde 2.000 m²',
    distribucion: '3 Dormitorios (Master Suite con Walking Closet) · 3 Baños · Estudio Panorámico · Sala de Estar',
    materiales: 'Estructura mixta de madera laminada glulam y perfiles de acero corten, muros de piedra local',
    climatizacion: 'Calefacción central por piso radiante hidrónico compatible con aerotermia / pellets',
    plazo: '7 a 8 meses de ejecución',
    inversion: '$145.000 USD',
    image: 'assets/img/modelo_premier.jpg',
    features: [
      'Deck exterior de 60 m² con fogón empotrado de piedra',
      'Doble altura en living con ventanales de 5.5 metros',
      'Cocina gourmet con isla central y despensa walk-in',
      'Preinstalación de paneles solares fotovoltaicos híbridos'
    ]
  },
  elite: {
    title: 'Modelo Elite',
    subtitle: 'Arquitectura Monumental de Autor',
    area: '320 m²',
    terreno: 'Desde 3.500 m²',
    distribucion: '4 Dormitorios (2 Suites Principales) · 4 Baños · Spa Nórdico con Sauna · Cava de Vinos Subterránea',
    materiales: 'Madera noble de coihue y ciprés reciclado, hormigón visto tableado, cerramientos minimalistas de aluminio Schüco',
    climatizacion: 'Domótica integral Lutron, geotermia y ventilación mecánica con recuperación de calor (VMC)',
    plazo: '10 a 12 meses de ejecución con dirección de obra personalizada',
    inversion: '$220.000 USD',
    image: 'assets/img/modelo_elite.jpg',
    features: [
      'Terraza voladiza de 95 m² con hot tub nórdico o piscina sin fin',
      'Suite principal con balcón privado suspendido sobre la vegetación',
      'Aleros bioclimáticos de 2.2 metros para control térmico estacional',
      'Generador de respaldo automático y pozo profundo canalizado'
    ]
  }
};

function initModelModal() {
  const modal = document.getElementById('modelModal');
  const openBtns = document.querySelectorAll('.open-model-modal');
  const closeBtn = document.getElementById('closeModelModal');
  const overlay = modal?.querySelector('.modal-overlay');

  if (!modal) return;

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const modelKey = btn.getAttribute('data-model');
      const data = modelData[modelKey];
      if (!data) return;

      document.getElementById('modalTitle').textContent = data.title;
      document.getElementById('modalSubtitle').textContent = data.subtitle;
      document.getElementById('modalArea').textContent = data.area;
      document.getElementById('modalTerreno').textContent = data.terreno;
      document.getElementById('modalDistribucion').textContent = data.distribucion;
      document.getElementById('modalMateriales').textContent = data.materiales;
      document.getElementById('modalClimatizacion').textContent = data.climatizacion;
      document.getElementById('modalPlazo').textContent = data.plazo;
      document.getElementById('modalInversion').textContent = data.inversion;
      document.getElementById('modalImg').src = data.image;

      const listContainer = document.getElementById('modalFeatures');
      listContainer.innerHTML = '';
      data.features.forEach(feat => {
        const li = document.createElement('li');
        li.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg> <span>${feat}</span>`;
        listContainer.appendChild(li);
      });

      const quoteBtn = document.getElementById('modalQuoteBtn');
      if (quoteBtn) {
        quoteBtn.setAttribute('data-target-model', data.title);
      }

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  closeBtn?.addEventListener('click', closeModal);
  overlay?.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // Modal direct quote button
  const quoteBtn = document.getElementById('modalQuoteBtn');
  quoteBtn?.addEventListener('click', () => {
    const targetModel = quoteBtn.getAttribute('data-target-model');
    closeModal();
    const select = document.getElementById('contactoModelo');
    if (select && targetModel) {
      for (let i = 0; i < select.options.length; i++) {
        if (select.options[i].text.includes(targetModel)) {
          select.selectedIndex = i;
          break;
        }
      }
    }
    const contactSection = document.getElementById('contacto');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  });
}

/**
 * 4. Interactive Project Cost Estimator / Calculator
 */
function initCalculator() {
  const modelSelect = document.getElementById('calcModel');
  const terrainSelect = document.getElementById('calcTerrain');
  const extraCheckboxes = document.querySelectorAll('.calc-extra');
  const resultArea = document.getElementById('resultArea');
  const resultTime = document.getElementById('resultTime');
  const resultCost = document.getElementById('resultCost');
  const transferBtn = document.getElementById('calcTransferBtn');

  if (!modelSelect || !resultCost) return;

  function calculate() {
    const baseModelCosts = {
      basico: { cost: 85000, area: 140, months: 6, label: 'Modelo Básico' },
      premier: { cost: 145000, area: 210, months: 8, label: 'Modelo Premier' },
      elite: { cost: 220000, area: 320, months: 12, label: 'Modelo Elite' }
    };

    const terrainFactors = {
      plano: 1.0,
      colina: 1.08,
      ribera: 1.14
    };

    const selectedModel = modelSelect.value;
    const modelInfo = baseModelCosts[selectedModel] || baseModelCosts.basico;
    const terrainFactor = terrainFactors[terrainSelect.value] || 1.0;

    let extrasTotal = 0;
    extraCheckboxes.forEach(cb => {
      if (cb.checked) {
        extrasTotal += parseInt(cb.value, 10) || 0;
      }
    });

    const totalEstimated = Math.round((modelInfo.cost * terrainFactor) + extrasTotal);

    resultArea.textContent = `${modelInfo.area} m²`;
    resultTime.textContent = `${modelInfo.months} Meses`;
    resultCost.textContent = `$${totalEstimated.toLocaleString('en-US')} USD`;
  }

  modelSelect.addEventListener('change', calculate);
  terrainSelect?.addEventListener('change', calculate);
  extraCheckboxes.forEach(cb => cb.addEventListener('change', calculate));

  calculate();

  transferBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    const contactModel = document.getElementById('contactoModelo');
    const contactMsg = document.getElementById('contactoMensaje');

    if (contactModel) {
      if (modelSelect.value === 'basico') contactModel.value = 'basico';
      if (modelSelect.value === 'premier') contactModel.value = 'premier';
      if (modelSelect.value === 'elite') contactModel.value = 'elite';
    }

    if (contactMsg) {
      const terrainText = terrainSelect.options[terrainSelect.selectedIndex].text;
      const extras = Array.from(extraCheckboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.parentElement.textContent.trim())
        .join(', ');

      contactMsg.value = `Hola, realicé una estimación en su calculadora para el ${modelSelect.options[modelSelect.selectedIndex].text}. Terreno: ${terrainText}. Adicionales: ${extras || 'Ninguno'}. Presupuesto estimado: ${resultCost.textContent}. Quisiera coordinar una cita con el equipo técnico.`;
    }

    const contactSec = document.getElementById('contacto');
    contactSec?.scrollIntoView({ behavior: 'smooth' });
    showToast('¡Datos de tu cotización cargados en el formulario de contacto!', 'success');
  });
}

/**
 * 5. Gallery Category Filter
 */
function initGalleryFilter() {
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const items = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const cat = btn.getAttribute('data-filter');

      items.forEach(item => {
        const itemCat = item.getAttribute('data-cat');
        if (cat === 'all' || itemCat === cat) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 20);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

/**
 * 6. Lightbox for Gallery
 */
function initLightbox() {
  const lightbox = document.getElementById('galleryLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const closeBtn = document.getElementById('closeLightbox');
  const prevBtn = document.getElementById('prevLightbox');
  const nextBtn = document.getElementById('nextLightbox');
  const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));

  if (!lightbox) return;

  let currentIndex = 0;

  function showImage(index) {
    if (index < 0) index = galleryItems.length - 1;
    if (index >= galleryItems.length) index = 0;
    currentIndex = index;

    const item = galleryItems[currentIndex];
    const img = item.querySelector('img');
    const title = item.querySelector('.gallery-card-title')?.textContent || '';
    const loc = item.querySelector('.gallery-card-loc')?.textContent || '';

    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = `${title} — ${loc}`;
  }

  galleryItems.forEach((item, idx) => {
    item.addEventListener('click', () => {
      showImage(idx);
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeLb = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  };

  closeBtn?.addEventListener('click', closeLb);
  lightbox.querySelector('.lightbox-overlay')?.addEventListener('click', closeLb);

  prevBtn?.addEventListener('click', () => showImage(currentIndex - 1));
  nextBtn?.addEventListener('click', () => showImage(currentIndex + 1));

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLb();
    if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
    if (e.key === 'ArrowRight') showImage(currentIndex + 1);
  });
}

/**
 * 7. Contact Form Simulation & Toast Feedback
 */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="spin-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
        <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
      </svg>
      <span>Enviando requerimiento...</span>
    `;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      form.reset();
      showToast('¡Solicitud enviada con éxito! Nuestro equipo de arquitectos te contactará en menos de 24 horas.', 'success');
    }, 1200);
  });
}

/**
 * Toast Notification Helper
 */
function showToast(message, type = 'info') {
  let toastContainer = document.querySelector('.toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = `toast-item toast-${type}`;
  toast.innerHTML = `
    <div class="toast-content">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      <span>${message}</span>
    </div>
  `;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('visible');
  }, 20);

  setTimeout(() => {
    toast.classList.remove('visible');
    setTimeout(() => toast.remove(), 400);
  }, 4500);
}

/**
 * 8. Back to Top Button
 */
function initBackToTop() {
  const btt = document.getElementById('backToTop');
  if (!btt) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      btt.classList.add('visible');
    } else {
      btt.classList.remove('visible');
    }
  });

  btt.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
