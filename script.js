/**
 * Oordio Landing — Interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileMenu();
  initTabs();
  initPricingToggle();
  initTestimonials();
  initScrollAnimations();
  initStatCounters();
  initBlogLoadMore();
});

// Header scroll state
function initHeader() {
  const header = document.getElementById('header');
  let lastScroll = 0;

  const onScroll = () => {
    const scrollY = window.scrollY;
    header.classList.toggle('scrolled', scrollY > 20);
    lastScroll = scrollY;
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// Mobile menu
function initMobileMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (!toggle || !navLinks) return;

  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', !expanded);
    navLinks.classList.toggle('open', !expanded);
    document.body.style.overflow = expanded ? '' : 'hidden';
  });

  // Close on link click (for anchor links)
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        toggle.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  });
}

// Tab switching (How It Works)
function initTabs() {
  const tabs = document.querySelectorAll('.tab');
  const panels = document.querySelectorAll('.tab-panel');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const targetId = tab.dataset.tab;

      tabs.forEach((t) => t.classList.remove('active'));
      panels.forEach((p) => p.classList.remove('active'));

      tab.classList.add('active');
      const panel = document.getElementById(targetId);
      if (panel) panel.classList.add('active');

      // Re-trigger animations for newly visible panel
      panel?.querySelectorAll('[data-animate]').forEach((el) => {
        el.removeAttribute('data-visible');
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) entry.target.setAttribute('data-visible', '');
            });
          },
          { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );
        observer.observe(el);
      });
    });
  });
}

// Pricing toggle (Monthly / Yearly)
function initPricingToggle() {
  const toggle = document.getElementById('pricing-toggle');
  if (!toggle) return;

  toggle.addEventListener('click', () => {
    const isYearly = toggle.getAttribute('aria-checked') === 'true';
    toggle.setAttribute('aria-checked', !isYearly);
    document.body.classList.toggle('yearly-pricing', !isYearly);
  });
}

// Testimonials — static bubbles with subtle hover
function initTestimonials() {
  // Bubbles are static; hover/active states handled by CSS
}

// Scroll-triggered animations
function initScrollAnimations() {
  const animated = document.querySelectorAll('[data-animate]');
  if (!animated.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.setAttribute('data-visible', '');
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  animated.forEach((el) => observer.observe(el));
}

// Stat counter animation
function initStatCounters() {
  const statCards = document.querySelectorAll('.stat-card');
  if (!statCards.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const card = entry.target;
        const valueEl = card.querySelector('.stat-value');
        if (!valueEl || card.dataset.counted) return;

        const target = parseFloat(valueEl.dataset.count) || 0;
        const isDecimal = valueEl.hasAttribute('data-decimal');
        const suffix = card.querySelector('.stat-suffix');
        const suffixText = suffix?.textContent || '';
        const duration = 1500;
        const start = performance.now();

        card.dataset.counted = 'true';
        card.setAttribute('data-visible', '');

        const animate = (now) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = target * eased;
          valueEl.textContent = isDecimal ? current.toFixed(1) : Math.round(current);
          if (progress < 1) requestAnimationFrame(animate);
          else valueEl.textContent = isDecimal ? target.toFixed(1) : target;
        };

        requestAnimationFrame(animate);
      });
    },
    { threshold: 0.3 }
  );

  statCards.forEach((card) => observer.observe(card));
}

// Blog: Load more / Show less
function initBlogLoadMore() {
  const btn = document.getElementById('blog-load-more');
  const blogSection = document.querySelector('.section.blog');
  const moreCards = document.querySelectorAll('.blog-card-more');

  if (!btn || !blogSection || !moreCards.length) return;

  btn.addEventListener('click', () => {
    const expanded = blogSection.classList.toggle('expanded');
    btn.setAttribute('aria-expanded', expanded);
    btn.textContent = expanded ? 'Show less' : 'Load more';

    if (expanded) {
      moreCards.forEach((card) => card.setAttribute('data-visible', ''));
    }
  });
}
