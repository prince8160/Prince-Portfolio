/**
 * KALLA PRINCE — CREATIVE DEVELOPER PORTFOLIO ENGINE (PHASE 2)
 * 
 * Features:
 * - Centralized Data-Driven Rendering (from data.js)
 * - 240-Frame Canvas Sequence Engine with Physics Lerp
 * - Morphing "VIEW DEMO ↗" Custom Cursor Badge
 * - Expandable "View All Projects" Dynamic Gallery
 * - Interactive Career Journey Timeline
 * - 3D Perspective Card Tilt Micro-interactions
 * - Magnetic Button Attractions
 * - Email One-Click Copy Action
 * - Active Scroll Spy Navigation & Header Dynamics
 * - Responsive Drawer Menu
 */

(() => {
  'use strict';

  // Fallback / Data Extraction
  const data = window.portfolioData || {
    personal: {
      fullName: "Kalla Prince",
      email: "kallaprince221@gmail.com"
    },
    services: [],
    skills: [],
    experience: [],
    projects: []
  };

  // --- Constants & Config ---
  const TOTAL_FRAMES = 240;
  const LERP_FACTOR = 0.08; // Silky smooth deceleration
  
  // --- DOM Elements ---
  const canvas = document.getElementById('animation-canvas');
  const ctx = canvas.getContext('2d', { alpha: false });
  
  const loader = document.getElementById('loader');
  const loaderBar = document.getElementById('loader-bar');
  const loaderPercent = document.getElementById('loader-percent');
  const scrollProgressBar = document.getElementById('scroll-progress-bar');
  
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');
  
  const menuToggle = document.getElementById('menu-toggle');
  const drawerClose = document.getElementById('drawer-close');
  const drawerBackdrop = document.getElementById('drawer-backdrop');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerLinks = document.querySelectorAll('.drawer-link');
  
  const cursorDot = document.getElementById('cursor-dot');
  const cursorOutline = document.getElementById('cursor-outline');

  const servicesGrid = document.getElementById('services-grid');
  const skillsGrid = document.getElementById('skills-grid');
  const timelineTrack = document.getElementById('timeline-track');
  const projectsGrid = document.getElementById('projects-grid');
  const projectsAdditional = document.getElementById('projects-additional');
  const projectsExpandableWrap = document.getElementById('projects-expandable-wrap');
  const viewAllBtn = document.getElementById('view-all-projects-btn');
  const viewAllBtnText = document.getElementById('view-all-btn-text');

  const copyEmailBtn = document.getElementById('copy-email-btn');
  const copyTooltip = document.getElementById('copy-tooltip');

  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  const formSubmitBtn = document.getElementById('form-submit-btn');

  // --- Animation & Cursor State ---
  const images = [];
  let loadedCount = 0;
  let currentFrame = 1;
  let targetFrame = 1;
  let renderedFrame = -1;
  let isReady = false;

  let mouseX = -100;
  let mouseY = -100;
  let outlineX = -100;
  let outlineY = -100;

  // Format frame URL
  function getFrameUrl(index) {
    const padded = String(index).padStart(6, '0');
    return `frames/frame_${padded}.png`;
  }

  // --- 1. DYNAMIC DATA RENDERING SUBSYSTEM ---

  // Render Services from Data
  function renderServices() {
    if (!servicesGrid || !data.services) return;
    
    servicesGrid.innerHTML = data.services.map((svc) => {
      const featuresHtml = svc.features.map(f => `<li><span class="bullet"></span> ${f}</li>`).join('');
      
      let iconSvg = '';
      if (svc.id === 'ui-ux') {
        iconSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>`;
      } else if (svc.id === 'frontend') {
        iconSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`;
      } else if (svc.id === 'responsive') {
        iconSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>`;
      } else {
        iconSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>`;
      }

      return `
        <div class="service-card glass-panel tilt-card">
          <div class="service-icon-wrap ${svc.iconClass}">
            ${iconSvg}
          </div>
          <h3 class="service-title">${svc.title}</h3>
          <p class="service-desc">${svc.desc}</p>
          <ul class="service-features">${featuresHtml}</ul>
        </div>
      `;
    }).join('');
  }

  // Render Skills from Data
  function renderSkills() {
    if (!skillsGrid || !data.skills) return;

    skillsGrid.innerHTML = data.skills.map((skill) => {
      let iconSvg = '';
      if (skill.name.includes('HTML')) {
        iconSvg = `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="${skill.color}" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`;
      } else if (skill.name.includes('CSS')) {
        iconSvg = `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="${skill.color}" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m4.93 4.93 4.24 4.24"/><path d="m14.83 9.17 4.24-4.24"/><path d="m14.83 14.83 4.24 4.24"/></svg>`;
      } else if (skill.name.includes('JavaScript')) {
        iconSvg = `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="${skill.color}" stroke-width="2"><path d="m10 15 5-3-5-3v6Z"/><rect width="20" height="20" x="2" y="2" rx="5"/></svg>`;
      } else if (skill.name.includes('React')) {
        iconSvg = `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="${skill.color}" stroke-width="2"><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(45 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-45 12 12)"/><circle cx="12" cy="12" r="2"/></svg>`;
      } else if (skill.name.includes('Next')) {
        iconSvg = `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="${skill.color}" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/></svg>`;
      } else if (skill.name.includes('Bootstrap')) {
        iconSvg = `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="${skill.color}" stroke-width="2"><rect width="18" height="18" x="3" y="3" rx="4"/><path d="M9 8h4.5a2.5 2.5 0 0 1 0 5H9"/><path d="M9 13h5.5a2.5 2.5 0 0 1 0 5H9"/></svg>`;
      } else if (skill.name.includes('Git')) {
        iconSvg = `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="${skill.color}" stroke-width="2"><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M18 6v6a6 6 0 0 1-6 6H9"/></svg>`;
      } else {
        iconSvg = `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="${skill.color}" stroke-width="2"><rect width="16" height="12" x="2" y="4" rx="2"/><line x1="8" x2="16" y1="20" y2="20"/></svg>`;
      }

      return `
        <div class="skill-card glass-panel tilt-card">
          <div class="skill-icon-box">${iconSvg}</div>
          <div class="skill-info">
            <h4 class="skill-name">${skill.name}</h4>
            <span class="skill-category">${skill.category}</span>
          </div>
          <span class="skill-badge">${skill.badge}</span>
        </div>
      `;
    }).join('');
  }

  // Render Experience Timeline from Data
  function renderExperience() {
    if (!timelineTrack || !data.experience) return;

    timelineTrack.innerHTML = data.experience.map((item) => {
      const tagsHtml = item.tags.map(t => `<span class="tech-tag">${t}</span>`).join('');
      return `
        <div class="timeline-item">
          <div class="timeline-node">
            <div class="timeline-dot"></div>
          </div>
          <div class="timeline-content glass-panel tilt-card">
            <span class="timeline-year">${item.year}</span>
            <h3 class="timeline-role">${item.role}</h3>
            <span class="timeline-company">${item.company}</span>
            <p class="timeline-desc">${item.desc}</p>
            <div class="timeline-tags">${tagsHtml}</div>
          </div>
        </div>
      `;
    }).join('');
  }

  // Helper to create Project Card HTML
  function createProjectCardHtml(project) {
    const tagsHtml = (project.tags || []).map(t => `<span class="tech-tag">${t}</span>`).join('');

    return `
      <div class="project-card glass-panel tilt-card" data-url="${project.demoUrl}" role="link" tabindex="0">
        <div class="project-preview">
          <div class="project-image-box">
            <img src="${project.image}" alt="${project.title} Preview" class="project-img" loading="lazy">
          </div>
        </div>
        <div class="project-details">
          <div class="project-label-row">
            <span class="project-demo-badge">${project.demoLabel || 'DEMO'}</span>
            ${project.category ? `<span class="project-category">${project.category}</span>` : ''}
          </div>
          <h3 class="project-title">${project.title}</h3>
          <p class="project-desc">${project.description}</p>
          <div class="project-tags">${tagsHtml}</div>
          <div class="project-links">
            <a href="${project.demoUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-primary project-cta-btn" onclick="event.stopPropagation();">
              <span>View Demo</span>
              <svg class="btn-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
            </a>
            ${project.githubUrl ? `
            <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="project-link text-muted" onclick="event.stopPropagation();" aria-label="GitHub Repository" title="Code Repository">
              <span>Code</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
            </a>` : ''}
          </div>
        </div>
      </div>
    `;
  }

  // Render Initial 3 Projects and Additional Projects
  function renderProjects() {
    if (!projectsGrid || !data.projects) return;

    const featuredProjects = data.projects.slice(0, 3);
    const additionalProjects = data.projects.slice(3);

    projectsGrid.innerHTML = featuredProjects.map(createProjectCardHtml).join('');

    if (projectsAdditional) {
      projectsAdditional.innerHTML = additionalProjects.map(createProjectCardHtml).join('');
    }

    if (viewAllBtnText) {
      viewAllBtnText.textContent = `View All Projects (${data.projects.length})`;
    }
  }

  // --- 2. CANVAS SEQUENCE & LERP INTERPOLATION ENGINE ---

  function resizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);

    renderedFrame = -1;
    drawFrame(Math.round(currentFrame));
  }

  function drawFrame(frameIndex) {
    const index = Math.max(1, Math.min(TOTAL_FRAMES, frameIndex));
    const img = images[index - 1];

    if (!img || !img.complete || img.naturalWidth === 0) return;

    if (renderedFrame === index && canvas._w === canvas.width && canvas._h === canvas.height) {
      return;
    }

    canvas._w = canvas.width;
    canvas._h = canvas.height;
    renderedFrame = index;

    const canvasW = canvas.width;
    const canvasH = canvas.height;
    const imgW = img.naturalWidth || 1920;
    const imgH = img.naturalHeight || 1080;

    const imgRatio = imgW / imgH;
    const canvasRatio = canvasW / canvasH;

    let drawW, drawH, drawX, drawY;

    if (canvasRatio > imgRatio) {
      drawW = canvasW;
      drawH = canvasW / imgRatio;
      drawX = 0;
      drawY = 0; // Top-aligned so head/hair extends behind transparent navbar without clipping
    } else {
      drawH = canvasH;
      drawW = canvasH * imgRatio;
      drawX = (canvasW - drawW) / 2;
      drawY = 0;
    }

    ctx.drawImage(img, drawX, drawY, drawW, drawH);
  }

  function updateScrollState() {
    const scrollY = window.scrollY || window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    
    if (docHeight > 0) {
      const progress = Math.max(0, Math.min(1, scrollY / docHeight));
      targetFrame = 1 + progress * (TOTAL_FRAMES - 1);
      
      if (scrollProgressBar) {
        scrollProgressBar.style.width = `${progress * 100}%`;
      }
    }

    if (scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    let currentSectionId = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 200;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  }

  function renderLoop() {
    // Lerp smoothing for frames
    currentFrame += (targetFrame - currentFrame) * LERP_FACTOR;

    if (Math.abs(targetFrame - currentFrame) < 0.005) {
      currentFrame = targetFrame;
    }

    drawFrame(Math.round(currentFrame));

    // Custom cursor lerp
    outlineX += (mouseX - outlineX) * 0.16;
    outlineY += (mouseY - outlineY) * 0.16;

    if (cursorDot) {
      cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    }
    if (cursorOutline) {
      cursorOutline.style.transform = `translate3d(${outlineX}px, ${outlineY}px, 0)`;
    }

    requestAnimationFrame(renderLoop);
  }

  function preloadAllFrames() {
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFrameUrl(i);

      const onLoaded = () => {
        loadedCount++;
        const percent = Math.round((loadedCount / TOTAL_FRAMES) * 100);

        if (loaderBar) loaderBar.style.width = `${percent}%`;
        if (loaderPercent) loaderPercent.textContent = `${percent}%`;

        if (i === 1 && renderedFrame === -1) {
          drawFrame(1);
        }

        if (loadedCount === TOTAL_FRAMES) {
          finishLoading();
        }
      };

      if ('decode' in img) {
        img.decode().then(onLoaded).catch(onLoaded);
      } else {
        img.onload = onLoaded;
        img.onerror = onLoaded;
      }

      images.push(img);
    }
  }

  function finishLoading() {
    isReady = true;
    setTimeout(() => {
      if (loader) loader.classList.add('loaded');
    }, 250);

    updateScrollState();
    currentFrame = targetFrame;
    drawFrame(Math.round(currentFrame));
  }

  // --- 3. INTERACTION SUBSYSTEMS ---

  // 3D Card Tilt Effect
  function initCardTilts() {
    document.querySelectorAll('.tilt-card').forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      });
    });
  }

  // Magnetic Buttons
  function initMagneticButtons() {
    document.querySelectorAll('.magnetic-btn').forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - (rect.left + rect.width / 2);
        const y = e.clientY - (rect.top + rect.height / 2);
        btn.style.transform = `translate3d(${x * 0.28}px, ${y * 0.28}px, 0)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate3d(0, 0, 0)';
      });
    });
  }

  // Custom Cursor
  function initCustomCursor() {
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }, { passive: true });

    // Open URL when project card is clicked
    document.querySelectorAll('.project-card').forEach((card) => {
      card.addEventListener('click', (e) => {
        const url = card.getAttribute('data-url');
        if (url && !e.target.closest('a')) {
          window.open(url, '_blank', 'noopener,noreferrer');
        }
      });
    });

    // Enlarge cursor on interactive links & buttons
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, .social-pill');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        if (cursorOutline) {
          cursorOutline.style.width = '52px';
          cursorOutline.style.height = '52px';
          cursorOutline.style.borderColor = 'var(--primary-pink)';
          cursorOutline.style.backgroundColor = 'rgba(244, 63, 94, 0.08)';
        }
      });
      el.addEventListener('mouseleave', () => {
        if (cursorOutline) {
          cursorOutline.style.width = '38px';
          cursorOutline.style.height = '38px';
          cursorOutline.style.borderColor = 'rgba(244, 63, 94, 0.5)';
          cursorOutline.style.backgroundColor = 'transparent';
        }
      });
    });
  }

  // "View All Projects" Staggered Expansion
  function initViewAllProjects() {
    if (!viewAllBtn || !projectsExpandableWrap) return;

    let isExpanded = false;

    viewAllBtn.addEventListener('click', () => {
      isExpanded = !isExpanded;

      if (isExpanded) {
        projectsExpandableWrap.classList.add('expanded');
        viewAllBtn.classList.add('expanded');
        if (viewAllBtnText) viewAllBtnText.textContent = "Show Less";

        // Re-initialize tilts and cursor on newly revealed cards
        initCardTilts();
        initCustomCursor();
      } else {
        projectsExpandableWrap.classList.remove('expanded');
        viewAllBtn.classList.remove('expanded');
        if (viewAllBtnText) viewAllBtnText.textContent = `View All Projects (${data.projects.length})`;

        // Smooth scroll back to projects section
        const projectsSection = document.getElementById('projects');
        if (projectsSection) {
          projectsSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  }

  // One-Click Email Copy
  function initEmailCopy() {
    if (!copyEmailBtn) return;

    copyEmailBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const email = data.personal.email || "kallaprince221@gmail.com";

      navigator.clipboard.writeText(email).then(() => {
        if (copyTooltip) {
          copyTooltip.textContent = "Copied! ✨";
          copyTooltip.classList.add('show');

          setTimeout(() => {
            copyTooltip.textContent = "Copy";
            copyTooltip.classList.remove('show');
          }, 2200);
        }
      }).catch(() => {
        window.location.href = `mailto:${email}`;
      });
    });
  }

  // Mobile Drawer Navigation
  function initMobileDrawer() {
    const openMenu = () => mobileDrawer.classList.add('open');
    const closeMenu = () => mobileDrawer.classList.remove('open');

    if (menuToggle) menuToggle.addEventListener('click', openMenu);
    if (drawerClose) drawerClose.addEventListener('click', closeMenu);
    if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeMenu);

    drawerLinks.forEach((link) => {
      link.addEventListener('click', closeMenu);
    });
  }

  // Contact Form Submission (Netlify Forms Integration)
  function initContactForm() {
    if (!contactForm) return;

    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const originalBtnContent = formSubmitBtn.innerHTML;
      formSubmitBtn.disabled = true;
      formSubmitBtn.innerHTML = `<span>Sending...</span>`;
      formStatus.className = 'form-status';
      formStatus.textContent = '';

      const formData = new FormData(contactForm);
      const encodedData = new URLSearchParams(formData).toString();

      try {
        const response = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: encodedData
        });

        if (response.ok) {
          formStatus.className = 'form-status success';
          formStatus.textContent = '✨ Message sent successfully! I will get back to you shortly.';
          contactForm.reset();

          setTimeout(() => {
            formStatus.textContent = '';
          }, 7000);
        } else {
          throw new Error(`Netlify form submission failed with status: ${response.status}`);
        }
      } catch (error) {
        formStatus.className = 'form-status error';
        formStatus.textContent = '⚠️ Unable to send message. Please try again or email directly at kallaprince221@gmail.com';
      } finally {
        formSubmitBtn.disabled = false;
        formSubmitBtn.innerHTML = originalBtnContent;
      }
    });
  }

  // --- INITIALIZATION ---
  renderServices();
  renderSkills();
  renderExperience();
  renderProjects();

  resizeCanvas();
  preloadAllFrames();
  initCardTilts();
  initMagneticButtons();
  initCustomCursor();
  initViewAllProjects();
  initEmailCopy();
  initMobileDrawer();
  initContactForm();

  window.addEventListener('scroll', updateScrollState, { passive: true });
  window.addEventListener('resize', () => {
    resizeCanvas();
    updateScrollState();
  }, { passive: true });

  requestAnimationFrame(renderLoop);

})();
