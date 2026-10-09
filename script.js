/**
 * TALLER MÓVIL PRO - Client Scripts
 * Streamlined, vanilla ES6 logic using event delegation.
 */

document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('mobile-toggle');
  const drawer = document.getElementById('mobile-drawer');
  const searchInput = document.getElementById('commune-search');
  const communesGrid = document.getElementById('communes-grid');
  const toast = document.getElementById('toast-notification');
  const toastMsg = document.getElementById('toast-message');
  
  let toastTimer = null;
  const phoneNumber = '+56 9 5379 7437';

  // State Management
  const state = {
    menuOpen: false,
  };

  function toggleMenu(forceState) {
    state.menuOpen = typeof forceState === 'boolean' ? forceState : !state.menuOpen;
    if(toggleBtn) {
      toggleBtn.setAttribute('aria-expanded', String(state.menuOpen));
      toggleBtn.classList.toggle('is-active', state.menuOpen);
    }
    if(drawer) {
      drawer.classList.toggle('is-open', state.menuOpen);
      drawer.setAttribute('aria-hidden', String(!state.menuOpen));
    }
  }

  function showToast(text) {
    if (!toast || !toastMsg) return;
    toastMsg.textContent = text;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
  }

  // --- SINGLE DELEGATED EVENT LISTENER ---
  document.body.addEventListener('click', async (e) => {
    // 1. Mobile Menu Toggle
    if (e.target.closest('#mobile-toggle')) {
      toggleMenu();
      return;
    }

    // Close menu when clicking mobile links
    if (e.target.closest('.mobile-nav-link') || e.target.closest('.mobile-actions a')) {
      toggleMenu(false);
    }

    // 2. FAQ Accordion
    const faqTrigger = e.target.closest('.accordion-trigger');
    if (faqTrigger) {
      const item = faqTrigger.closest('.accordion-item');
      const panel = item.querySelector('.accordion-panel');
      const icon = item.querySelector('.faq-icon');
      const isExpanded = faqTrigger.getAttribute('aria-expanded') === 'true';

      if (isExpanded) {
        faqTrigger.setAttribute('aria-expanded', 'false');
        item.classList.remove('is-open');
        panel.hidden = true;
        if (icon) icon.textContent = '+';
      } else {
        // Close others
        document.querySelectorAll('.accordion-item.is-open').forEach(otherItem => {
          if (otherItem !== item) {
            const otherTrigger = otherItem.querySelector('.accordion-trigger');
            const otherPanel = otherItem.querySelector('.accordion-panel');
            const otherIcon = otherItem.querySelector('.faq-icon');
            if (otherTrigger && otherPanel) {
              otherTrigger.setAttribute('aria-expanded', 'false');
              otherItem.classList.remove('is-open');
              otherPanel.hidden = true;
              if (otherIcon) otherIcon.textContent = '+';
            }
          }
        });

        // Open current
        faqTrigger.setAttribute('aria-expanded', 'true');
        item.classList.add('is-open');
        panel.hidden = false;
        if (icon) icon.textContent = '−';
      }
      return;
    }

    // 3. WhatsApp Builder (Lead Capture Funnel)
    if (e.target.closest('.pill-btn')) {
      const btn = e.target.closest('.pill-btn');
      const pillGroup = btn.closest('.pill-group');
      const hiddenInput = pillGroup.nextElementSibling;
      
      pillGroup.querySelectorAll('.pill-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      hiddenInput.value = btn.getAttribute('data-value');
      
      pillGroup.classList.remove('error');
      return;
    }

    if (e.target.closest('.btn-funnel-submit')) {
      e.preventDefault();
      const form = e.target.closest('form');
      if (!form) return;

      const tipoInput = form.querySelector('.input-tipo-vehiculo');
      const marcaInput = form.querySelector('.input-marca');
      const anoInput = form.querySelector('.input-ano');
      const fallaInput = form.querySelector('.input-falla');
      const comunaInput = form.querySelector('.input-comuna');
      const direccionInput = form.querySelector('.input-direccion');

      let isValid = true;
      const requiredFields = [tipoInput, marcaInput, anoInput, fallaInput, comunaInput, direccionInput];
      
      if (!tipoInput.value) {
        isValid = false;
        if (tipoInput.previousElementSibling) {
          tipoInput.previousElementSibling.classList.add('error');
        }
      }

      requiredFields.forEach(field => {
        if (!field.value) {
          isValid = false;
          field.classList.add('error');
        } else {
          field.classList.remove('error');
        }
      });

      if (!isValid) return;

      const vehiculoTipo = tipoInput.value;
      const marcaModelo = marcaInput.value;
      const ano = anoInput.value;
      const falla = fallaInput.value;
      const comuna = comunaInput.value;
      const direccion = direccionInput.value;

      const targetPhone = "56953797437";
      const message = `Hola, necesito asistencia técnica en terreno:\n\n• Vehículo/Equipo: ${vehiculoTipo || 'No especificado'} - ${marcaModelo || ''} (${ano || ''})\n• Problema / Falla: ${falla || 'Diagnóstico general'}\n• Ubicación: ${comuna || ''}, ${direccion || ''}\n\nFavor confirmar disponibilidad y presupuesto.`;
      const waUrl = `https://wa.me/${targetPhone}?text=${encodeURIComponent(message)}`;

      window.open(waUrl, '_blank', 'noopener,noreferrer');
      return;
    }



    // 5. Phone Copy
    if (e.target.closest('#btn-copy-phone')) {
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(phoneNumber);
        } else {
          const textarea = document.createElement('textarea');
          textarea.value = phoneNumber;
          textarea.style.position = 'fixed';
          textarea.style.opacity = '0';
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand('copy');
          document.body.removeChild(textarea);
        }
        showToast(`Teléfono ${phoneNumber} copiado al portapapeles`);
      } catch (err) {
        showToast(`Número: ${phoneNumber}`);
      }
      return;
    }

    // 5. Services Accordion
    const serviceAccTrigger = e.target.closest('.service-acc-trigger');
    if (serviceAccTrigger) {
      const item = serviceAccTrigger.closest('.service-acc-item');
      const isExpanded = serviceAccTrigger.getAttribute('aria-expanded') === 'true';

      // Close others
      document.querySelectorAll('.service-acc-item.is-open').forEach(otherItem => {
        if (otherItem !== item) {
          const otherTrigger = otherItem.querySelector('.service-acc-trigger');
          if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
          otherItem.classList.remove('is-open');
        }
      });

      if (isExpanded) {
        // Collapse it
        serviceAccTrigger.setAttribute('aria-expanded', 'false');
        item.classList.remove('is-open');
      } else {
        // Expand it
        serviceAccTrigger.setAttribute('aria-expanded', 'true');
        item.classList.add('is-open');
      }
      return;
    }

    // 6. Services CTA Buttons -> Scroll to Form & Pre-select
    const serviceCtaBtn = e.target.closest('.service-cta-btn');
    if (serviceCtaBtn) {
      e.preventDefault();
      
      const targetType = serviceCtaBtn.getAttribute('data-target-type');
      const targetFailure = serviceCtaBtn.getAttribute('data-target-failure');
      
      if (targetType) {
        // Find matching pill button and trigger click
        const optionButtons = document.querySelectorAll('.pill-btn');
        optionButtons.forEach(opt => {
          if (opt.textContent.trim().toLowerCase() === targetType.toLowerCase()) {
            opt.click();
          }
        });
      }

      if (targetFailure) {
        const fallaInput = document.querySelector('.input-falla');
        if (fallaInput) {
          fallaInput.value = targetFailure;
          fallaInput.classList.remove('error');
        }
      }

      // Smooth scroll to form
      const formContainer = document.querySelector('.lead-capture-funnel') || document.getElementById('contacto');
      if (formContainer) {
        formContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

      // Focus first input of Step 2 after scrolling
      setTimeout(() => {
        const firstInput = document.querySelector('.input-marca');
        if (firstInput) firstInput.focus();
      }, 500);

      return;
    }
  });

  document.body.addEventListener('input', (e) => {
    if (e.target.classList.contains('form-control')) {
      e.target.classList.remove('error');
    }
  });

  document.body.addEventListener('change', (e) => {
    if (e.target.classList.contains('form-control')) {
      e.target.classList.remove('error');
    }
  });

  // --- KEYDOWN EVENTS ---
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && state.menuOpen) {
      toggleMenu(false);
    }
  });

  // --- COMMUNE SEARCH FILTER ---
  if (searchInput && communesGrid) {
    const communePills = communesGrid.querySelectorAll('.commune-pill');
    
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      let matchCount = 0;
      
      communePills.forEach(pill => {
        const name = (pill.textContent || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        const isMatch = name.includes(query);
        pill.style.display = isMatch ? 'flex' : 'none';
        if (isMatch) matchCount++;
      });

      let emptyMsg = document.getElementById('communes-empty-msg');
      if (matchCount === 0 && !emptyMsg) {
        emptyMsg = document.createElement('div');
        emptyMsg.id = 'communes-empty-msg';
        emptyMsg.style.cssText = 'grid-column: 1 / -1; padding: 14px; color: #FF9900; font-family: var(--font-mono); font-size: 12px; background-color: rgba(255, 153, 0, 0.08); border: 1px solid var(--border-amber); border-radius: var(--radius-sm);';
        emptyMsg.innerHTML = 'No encontramos esa comuna en la lista rápida, ¡pero escríbenos por WhatsApp y confirmamos factibilidad técnica de inmediato!';
        communesGrid.appendChild(emptyMsg);
      } else if (matchCount > 0 && emptyMsg) {
        emptyMsg.remove();
      }
    });
  }

  // --- SCROLL SPY & STICKY HEADER OFFSET ---
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  if (sections.length > 0 && navLinks.length > 0) {
    window.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY + 90;
      let currentId = '';
      
      for(let i = 0; i < sections.length; i++) {
        const top = sections[i].offsetTop;
        const height = sections[i].offsetHeight;
        if (scrollPosition >= top && scrollPosition < top + height) {
          currentId = sections[i].getAttribute('id');
          break;
        }
      }

      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
      });
    }, { passive: true });
  }
});

(function() {
  const callBtn = document.getElementById('btn-call-trigger');
  if (!callBtn) return;

  const phoneNumber = '+56953797437';
  const isMobile = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent) 
                   || (navigator.maxTouchPoints && navigator.maxTouchPoints > 2);

  callBtn.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();

    // 1. ALWAYS COPY TO CLIPBOARD AS GUARANTEED ACTION
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(phoneNumber).catch(function() {
        fallbackCopyText(phoneNumber);
      });
    } else {
      fallbackCopyText(phoneNumber);
    }

    // 2. DEVICE-SPECIFIC ACTION
    if (isMobile) {
      // Direct call protocol for phones (bypasses Chrome webpage navigation)
      window.location.assign('tel:' + phoneNumber);
    } else {
      // Visual feedback on desktop that number was copied
      const textSpan = document.getElementById('call-btn-text');
      if (textSpan) {
        const originalText = textSpan.textContent;
        textSpan.textContent = "¡NÚMERO COPIADO!";
        setTimeout(function() {
          textSpan.textContent = originalText;
        }, 2200);
      }
    }
  });

  // Fallback copy function for older mobile browsers/webviews
  function fallbackCopyText(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
    } catch (err) {}
    document.body.removeChild(textArea);
  }
})();
