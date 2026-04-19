/* ==========================================================================
   Miya B Bookkeeping — Main JS
   - Mobile nav toggle
   - Sticky header state
   - FAQ accordion
   - Scroll reveal animations
   - Contact form conditional logic + client-side validation
   - Active nav link highlighting
   - Dynamic footer year
   ========================================================================== */

(function () {
    'use strict';

    /* -------- Dynamic year in footer -------- */
    document.querySelectorAll('[data-year]').forEach(function (el) {
        el.textContent = new Date().getFullYear();
    });

    /* -------- Mobile navigation toggle -------- */
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function () {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('open');
            const expanded = navToggle.classList.contains('active');
            navToggle.setAttribute('aria-expanded', expanded);
        });

        // Close menu when clicking a link (mobile)
        navMenu.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                navToggle.classList.remove('active');
                navMenu.classList.remove('open');
            });
        });
    }

    /* -------- Sticky header state -------- */
    const header = document.querySelector('.site-header');
    if (header) {
        const onScroll = function () {
            if (window.scrollY > 10) header.classList.add('scrolled');
            else header.classList.remove('scrolled');
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    /* -------- Active nav link based on current page -------- */
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-menu a').forEach(function (link) {
        const href = link.getAttribute('href');
        if (href === currentPath || (currentPath === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });

    /* -------- FAQ accordion -------- */
    document.querySelectorAll('.faq-q').forEach(function (btn) {
        btn.addEventListener('click', function () {
            const item = btn.closest('.faq-item');
            const answer = item.querySelector('.faq-a');
            const isOpen = btn.classList.toggle('open');
            btn.setAttribute('aria-expanded', isOpen);

            if (isOpen) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = '0';
            }
        });
    });

    /* -------- Scroll reveal -------- */
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

        document.querySelectorAll('.reveal').forEach(function (el) {
            observer.observe(el);
        });
    } else {
        document.querySelectorAll('.reveal').forEach(function (el) {
            el.classList.add('visible');
        });
    }

    /* -------- Contact form: conditional logic + validation -------- */
    const form = document.getElementById('inquiry-form');
    if (form) {
        const radios = form.querySelectorAll('input[name="client-type"]');
        const businessFields = form.querySelector('[data-conditional="business"]');
        const individualFields = form.querySelector('[data-conditional="individual"]');

        function updateConditionals() {
            const selected = form.querySelector('input[name="client-type"]:checked');
            if (!selected) return;
            if (selected.value === 'business') {
                if (businessFields) businessFields.classList.add('show');
                if (individualFields) individualFields.classList.remove('show');
            } else {
                if (businessFields) businessFields.classList.remove('show');
                if (individualFields) individualFields.classList.add('show');
            }
        }

        radios.forEach(function (r) {
            r.addEventListener('change', updateConditionals);
        });
        updateConditionals();

        form.addEventListener('submit', function (e) {
            e.preventDefault();

            // Simple validation pass
            const required = form.querySelectorAll('[required]');
            let valid = true;
            required.forEach(function (field) {
                if (field.offsetParent === null) return; // skip hidden
                if (!field.value || (field.type === 'email' && !/^\S+@\S+\.\S+$/.test(field.value))) {
                    field.style.borderColor = '#c44';
                    valid = false;
                } else {
                    field.style.borderColor = '';
                }
            });

            if (!valid) {
                const first = form.querySelector('[style*="rgb(204, 68, 68)"], [style*="#c44"]');
                if (first) first.scrollIntoView({ behavior: 'smooth', block: 'center' });
                return;
            }

            // Success: In production, POST to your backend / Formspree / Netlify Forms.
            // For static deployment, redirect to thank-you page.
            window.location.href = 'thank-you.html';
        });
    }

    /* -------- Smooth anchor scroll offset handling -------- */
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target && this.getAttribute('href').length > 1) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
})();
