/* ============================================================
 * PressRelease.com Shared Navigation Menu
 * ------------------------------------------------------------
 * Single source of truth for the site header. Load on any site
 * (Duda, Magento, etc.) with a single line:
 *
 *   <script src="https://YOUR-USER.github.io/menu/menu.js"></script>
 *
 * To update the menu, edit this file, commit, and push. Both
 * sites will reflect the change within GitHub Pages' cache TTL
 * (usually under a minute, sometimes a few minutes).
 *
 * MOBILE: Below 1024px viewport, the desktop menu collapses
 * into a hamburger drawer. Dropdowns become tap-to-expand
 * accordions. Action buttons move into the drawer footer.
 *
 * MOBILE ORDERING: The drawer order is controlled by the
 * MOBILE_ORDER map in the config block below. It is applied
 * with CSS `order`, scoped inside the mobile media query, so
 * the desktop bar always follows source order and is never
 * affected by changes made there.
 *
 * DRAWER RELOCATION: When the drawer opens on mobile it is
 * moved to <body> and moved back on close. A CSS `transform`
 * on ANY ancestor turns `position: fixed` into a containing
 * block, which is what breaks full-screen drawers inside Duda
 * headers. Relocating to <body> removes every possible
 * transformed ancestor. Because the drawer then lives outside
 * .prc-nav-container, every rule that styles drawer content is
 * written against BOTH `.prc-nav-container ...` and
 * `.prc-mega-menu ...`. The declarations in each pair are
 * identical, so desktop rendering is unchanged.
 * ============================================================ */

(function () {
  'use strict';

  // ---- Config ------------------------------------------------
  var SITE_BASE = 'https://www.pressrelease.com';
  var MOUNT_ID = 'prc-menu-mount';
  var MOBILE_BREAKPOINT = 1024; // px — below this we switch to mobile nav
  var DRAWER_ANIM_MS = 320;     // must be >= the CSS transform transition

  /* ---- MOBILE DRAWER ORDER (mobile only) ---------------------
   * Keys match the data-nav attribute on each <li class="menu-item">.
   * Lower number = higher in the drawer. Change these freely;
   * the desktop bar is unaffected because these rules live inside
   * the @media (max-width) block.
   */
  var MOBILE_ORDER = {
    'use-cases': 1,
    'pricing':   2,
    'resources': 3,
    'news':      4,
    'contact':   6
  };

  /* ---- MOBILE-ONLY NAV ITEMS ---------------------------------
   * Links that appear in the mobile drawer but NOT in the desktop
   * bar. Slugs below were read off the live pressrelease.com nav.
   * `order` slots them into the MOBILE_ORDER sequence above.
   */
  var MOBILE_EXTRA_LINKS = [
    { label: 'About Us',            href: SITE_BASE + '/about-us', order: 5 },
    { label: 'Frequently Asked Questions', href: SITE_BASE + '/faqs', order: 7 }
  ];

  /* ---- MOBILE FOOTER LINKS (mobile only) ---------------------
   * Secondary/legal links pinned below the CTA buttons at the very
   * bottom of the drawer — out of the primary nav, still reachable.
   */
  var MOBILE_FOOTER_LINKS = [
    { label: 'Privacy Policy',              href: SITE_BASE + '/privacy-policy' },
    { label: 'Terms of Service',            href: SITE_BASE + '/terms-of-service' },
    { label: 'Editorial Content Guidelines', href: SITE_BASE + '/editorial-content-guidelines' }
  ];

  function isMobileView() {
    return window.innerWidth <= MOBILE_BREAKPOINT;
  }

  function escAttr(s) {
    return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;')
      .replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // ---- 1. Inject Font Awesome (if not already present) -------
  if (!document.querySelector('link[href*="font-awesome"]')) {
    var fa = document.createElement('link');
    fa.rel = 'stylesheet';
    fa.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css';
    document.head.appendChild(fa);
  }

  // ---- 1b. Build the mobile-only order rules from config -----
  var mobileOrderCSS = Object.keys(MOBILE_ORDER).map(function (key) {
    return '.prc-nav-container .menu-item[data-nav="' + key + '"],\n    ' +
           '.prc-mega-menu .menu-item[data-nav="' + key + '"] { order: ' +
           MOBILE_ORDER[key] + ' !important; }';
  }).join('\n    ');

  var mobileExtraOrderCSS = MOBILE_EXTRA_LINKS.map(function (link, i) {
    var ord = (typeof link.order === 'number') ? link.order : (100 + i);
    return '.prc-nav-container .menu-item[data-nav="extra-' + i + '"],\n    ' +
           '.prc-mega-menu .menu-item[data-nav="extra-' + i + '"] { order: ' +
           ord + ' !important; }';
  }).join('\n    ');

  // ---- 2. Inject menu styles --------------------------------
  var css = `
  .prc-nav-container,
  .prc-mega-menu { font-family: 'Poppins', sans-serif !important; }
  .prc-nav-container .navbar {
    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;
    padding: 0 10px 0 30px !important;
    height: 80px;
  }
  .prc-nav-container .logo { width: 220px !important; flex-shrink: 0 !important; }
  .prc-nav-container .logo img { width: 100% !important; height: auto !important; display: block !important; }
  .prc-nav-container .mega-menu { flex-grow: 1; display: flex; justify-content: center; }
  .prc-nav-container a,
  .prc-mega-menu a {
    color: #000000 !important;
    text-decoration: none !important;
    display: block !important;
    padding: 10px 10px !important;
    transition: all 0.3s ease !important;
  }
  .prc-nav-container.scrolled a { color: #ffffff !important; }
  .prc-nav-container a:hover,
  .prc-mega-menu a:hover {
    color: #FF3300 !important;
    background-color: #FF330030 !important;
    padding: 10px 10px !important;
    transition: all 0.3s ease !important;
  }
  .prc-nav-container.scrolled a:hover {
    color: #ffffff !important;
    background-color: rgba(255, 255, 255, 0.15) !important;
  }
  .prc-nav-container .action-buttons { display: flex !important; align-items: center !important; flex-shrink: 0 !important; }
  .prc-nav-container .menu,
  .prc-mega-menu .menu {
    list-style: none !important;
    display: flex !important;
    margin: 0 !important;
    padding: 0 !important;
    gap: 30px !important;
  }
  .prc-nav-container .menu-item,
  .prc-mega-menu .menu-item { position: relative !important; }
  .prc-nav-container .menu > a {
    display: block !important;
    padding: 10px 15px !important;
    color: #000000 !important;
    font-size: 14px !important;
    font-weight: 600 !important;
    text-decoration: none !important;
    transition: all 0.3s ease !important;
  }
  .prc-nav-container .has-dropdown > a::after,
  .prc-mega-menu .has-dropdown > a::after {
    content: '\\f078' !important;
    font-family: 'Font Awesome 5 Free' !important;
    font-weight: 900 !important;
    font-size: 10px !important;
    margin-left: 8px !important;
    transition: transform 0.3s ease !important;
  }
  .prc-nav-container .menu-item.hover > a,
  .prc-nav-container .menu-item > a:hover,
  .prc-mega-menu .menu-item.hover > a,
  .prc-mega-menu .menu-item > a:hover {
    background-color: #ff3300 !important;
    color: #ffffff !important;
  }
  .prc-nav-container .menu-item.hover > a::after,
  .prc-mega-menu .menu-item.hover > a::after { transform: rotate(180deg) !important; }
  .prc-nav-container .dropdown,
  .prc-mega-menu .dropdown {
    display: block !important;
    position: absolute !important;
    top: 100% !important;
    left: 50% !important;
    transform: translateX(-50%) !important;
    padding: 35px !important;
    background: #ffffff !important;
    box-shadow: 0 8px 20px rgba(0,0,0,0.1) !important;
    border-radius: 8px !important;
    z-index: 10000 !important;
    opacity: 0 !important;
    visibility: hidden !important;
    pointer-events: none !important;
    transition: opacity 0.3s ease, visibility 0.3s ease !important;
  }
  .prc-nav-container .menu-item.hover .dropdown,
  .prc-mega-menu .menu-item.hover .dropdown {
    opacity: 1 !important;
    visibility: visible !important;
    pointer-events: auto !important;
  }
  .prc-nav-container .dropdown-size-small,
  .prc-mega-menu .dropdown-size-small { width: 300px !important; }
  .prc-nav-container .dropdown-size-large,
  .prc-mega-menu .dropdown-size-large { width: 900px !important; }
  .prc-nav-container .dropdown-column .dropdown-heading,
  .prc-mega-menu .dropdown-column .dropdown-heading {
    font-size: 18px !important;
    font-weight: bold !important;
    color: #000850 !important;
    margin-bottom: 15px !important;
    padding-bottom: 10px !important;
    border-bottom: 1px solid #eeeeee !important;
  }
  .prc-nav-container .dropdown-column a,
  .prc-mega-menu .dropdown-column a {
    display: flex !important;
    align-items: center !important;
    padding: 8px 0 !important;
    font-size: 14px !important;
    text-decoration: none !important;
    color: #000850 !important;
    transition: all 0.2s ease !important;
  }
  .prc-nav-container .dropdown-column a:hover,
  .prc-mega-menu .dropdown-column a:hover {
    color: #ff3300 !important;
    transform: translateX(5px) !important;
  }
  .prc-nav-container .dropdown-column a i,
  .prc-mega-menu .dropdown-column a i {
    color: #ff3300 !important;
    width: 25px !important;
    margin-right: 10px !important;
    font-size: 16px !important;
    text-align: center !important;
  }
  .prc-nav-container .press-btn,
  .prc-nav-container .login-btn,
  .prc-mega-menu .press-btn,
  .prc-mega-menu .login-btn {
    display: flex !important;
    align-items: center !important;
    padding: 10px 10px !important;
    margin-left: 10px !important;
    text-decoration: none !important;
    font-size: 14px !important;
    transition: all 0.3s ease !important;
    white-space: nowrap;
  }
  .prc-nav-container .press-btn,
  .prc-mega-menu .press-btn {
    background-color: #FF3300 !important;
    color: #ffffff !important;
    padding: 20px 40px !important;
  }
  .prc-nav-container .press-btn:hover,
  .prc-mega-menu .press-btn:hover {
    background-color: #ff330030 !important;
    padding: 20px 40px !important;
  }
  .prc-nav-container .login-btn,
  .prc-mega-menu .login-btn { background-color: transparent !important; color: #000000 !important; }
  .prc-nav-container .login-btn:hover,
  .prc-mega-menu .login-btn:hover { color: #ff3300 !important; }
  .prc-nav-container .cart-btn {
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    width: 44px !important;
    height: 44px !important;
    padding: 0 !important;
    margin-left: 10px !important;
    text-decoration: none !important;
    font-size: 18px !important;
    color: #000000 !important;
    background-color: transparent !important;
    border: 1px solid #ff3300 !important;
    border-radius: 50% !important;
    transition: all 0.3s ease !important;
  }
  .prc-nav-container .cart-btn:hover {
    background-color: #ff3300 !important;
    color: #ffffff !important;
    padding: 0 !important;
  }
  .prc-nav-container .cart-btn i { margin: 0 !important; }
  .prc-nav-container.scrolled .cart-btn { color: #ffffff !important; border-color: #ffffff !important; }
  .prc-nav-container.scrolled .cart-btn:hover { background-color: #ffffff !important; color: #ff3300 !important; }
  .prc-nav-container .press-btn i,
  .prc-nav-container .login-btn i,
  .prc-mega-menu .press-btn i,
  .prc-mega-menu .login-btn i { margin-left: 8px !important; }
  .prc-nav-container .logo img.white-logo {
    filter: brightness(0) invert(1);
    transition: filter 0.3s ease;
  }

  /* Mobile-only elements are hidden outright on desktop. The media
     query below re-enables them with a higher-specificity rule. */
  .prc-nav-container .prc-mobile-only,
  .prc-mega-menu .prc-mobile-only { display: none !important; }
  .prc-nav-container .mobile-footer-links,
  .prc-mega-menu .mobile-footer-links { display: none !important; }

  /* Hamburger button - hidden on desktop, shown on mobile via media query.
     Uses three plain <span> lines instead of a Font Awesome icon so it still
     renders if FA fails to load on the page (e.g. CSP blocks cdnjs). */
  .prc-nav-container .hamburger {
    display: none;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
    width: 44px;
    height: 44px;
    padding: 0 !important;
    margin-left: 8px;
    background: transparent !important;
    border: none;
    cursor: pointer;
    line-height: 1;
  }
  .prc-nav-container .hamburger:hover { background: transparent !important; }
  .prc-nav-container .hamburger-line {
    display: block !important;
    width: 22px;
    height: 2.5px;
    background: #000;
    border-radius: 2px;
    transition: transform 0.25s ease, opacity 0.2s ease, background-color 0.3s ease;
  }
  .prc-nav-container.scrolled .hamburger-line { background: #fff; }
  .prc-nav-container.mobile-open .hamburger-line { background: #000; }
  /* Animate the three lines into an X when the drawer is open */
  .prc-nav-container.mobile-open .hamburger-line:nth-child(1) {
    transform: translateY(7.5px) rotate(45deg);
  }
  .prc-nav-container.mobile-open .hamburger-line:nth-child(2) {
    opacity: 0;
  }
  .prc-nav-container.mobile-open .hamburger-line:nth-child(3) {
    transform: translateY(-7.5px) rotate(-45deg);
  }

  /* Mobile action buttons inside drawer - hidden on desktop */
  .prc-nav-container .mobile-action-buttons,
  .prc-mega-menu .mobile-action-buttons { display: none; }

  /* ============================================================
     MOBILE BREAKPOINT (≤${MOBILE_BREAKPOINT}px)
     ============================================================ */
  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    .prc-nav-container .navbar {
      padding: 0 15px !important;
      height: 64px !important;
      background: #fff !important;
      position: relative !important;
      z-index: 10001 !important;
    }
    .prc-nav-container.scrolled .navbar { background: #fff !important; }
    .prc-nav-container .logo { width: 150px !important; }

    /* Hide desktop login + purchase buttons; cart stays visible */
    .prc-nav-container .action-buttons > .login-btn,
    .prc-nav-container .action-buttons > .press-btn { display: none !important; }

    /* Show hamburger */
    .prc-nav-container .hamburger { display: flex !important; }

    /* Turn mega-menu into a slide-in drawer.
       The .prc-mega-menu twin is what applies once the drawer has
       been relocated to <body>, where it is no longer a descendant
       of .prc-nav-container. */
    .prc-nav-container .mega-menu,
    .prc-mega-menu {
      position: fixed !important;
      top: 64px !important;
      left: 0 !important;
      right: 0 !important;
      bottom: 0 !important;
      background: #fff !important;
      display: flex !important;
      flex-direction: column !important;
      justify-content: flex-start !important;
      overflow-y: auto !important;
      padding: 10px 20px 30px !important;
      z-index: 10000 !important;
      transform: translateX(-100%) !important;
      transition: transform 0.3s ease !important;
      -webkit-overflow-scrolling: touch;
    }
    .prc-nav-container.mobile-open .mega-menu,
    .prc-mega-menu.is-open {
      transform: translateX(0) !important;
    }

    /* Stack menu items vertically */
    .prc-nav-container .menu,
    .prc-mega-menu .menu {
      flex-direction: column !important;
      gap: 0 !important;
      width: 100% !important;
    }
    .prc-nav-container .menu-item,
    .prc-mega-menu .menu-item {
      border-bottom: 1px solid #eee !important;
      width: 100% !important;
      position: static !important;
    }

    /* ---- Mobile-only drawer ordering ------------------------
       Generated from MOBILE_ORDER / MOBILE_EXTRA_LINKS at the top
       of this file. Scoped to this media query, so the desktop bar
       keeps its source order no matter what these say. */
    ${mobileOrderCSS}
    ${mobileExtraOrderCSS}

    /* Reveal mobile-only items (higher specificity than the base
       .prc-mobile-only hide rule) */
    .prc-nav-container .menu-item.prc-mobile-only,
    .prc-mega-menu .menu-item.prc-mobile-only { display: block !important; }

    .prc-nav-container .menu-item > a,
    .prc-mega-menu .menu-item > a {
      padding: 15px 5px !important;
      font-size: 16px !important;
      color: #000 !important;
      background: transparent !important;
    }
    /* Don't paint the bar red on tap-hover for mobile - just color shift */
    .prc-nav-container .menu-item > a:hover,
    .prc-nav-container .menu-item.hover > a,
    .prc-mega-menu .menu-item > a:hover,
    .prc-mega-menu .menu-item.hover > a {
      background: transparent !important;
      color: #ff3300 !important;
    }
    .prc-nav-container .has-dropdown > a::after,
    .prc-mega-menu .has-dropdown > a::after {
      float: right !important;
      margin-top: 7px !important;
    }
    .prc-nav-container .menu-item.mobile-expanded > a::after,
    .prc-mega-menu .menu-item.mobile-expanded > a::after {
      transform: rotate(180deg) !important;
    }

    /* Dropdowns become inline accordions */
    .prc-nav-container .dropdown,
    .prc-nav-container .dropdown-size-small,
    .prc-nav-container .dropdown-size-large,
    .prc-mega-menu .dropdown,
    .prc-mega-menu .dropdown-size-small,
    .prc-mega-menu .dropdown-size-large {
      position: static !important;
      transform: none !important;
      top: auto !important;
      left: auto !important;
      width: 100% !important;
      max-width: 100% !important;
      box-shadow: none !important;
      border-radius: 0 !important;
      padding: 5px 0 15px 15px !important;
      background: #fafafa !important;
      opacity: 1 !important;
      visibility: visible !important;
      pointer-events: auto !important;
      display: none !important;
      transition: none !important;
    }
    .prc-nav-container .menu-item.mobile-expanded .dropdown,
    .prc-mega-menu .menu-item.mobile-expanded .dropdown {
      display: block !important;
    }
    /* Don't auto-open on desktop-style .hover class on mobile */
    .prc-nav-container .menu-item.hover .dropdown,
    .prc-mega-menu .menu-item.hover .dropdown { display: none !important; }
    .prc-nav-container .menu-item.hover.mobile-expanded .dropdown,
    .prc-mega-menu .menu-item.hover.mobile-expanded .dropdown { display: block !important; }

    .prc-nav-container .dropdown-grid,
    .prc-mega-menu .dropdown-grid {
      display: block !important;
      grid-template-columns: 1fr !important;
    }
    .prc-nav-container .dropdown-column,
    .prc-mega-menu .dropdown-column { margin-bottom: 10px !important; }
    .prc-nav-container .dropdown-column .dropdown-heading,
    .prc-mega-menu .dropdown-column .dropdown-heading {
      font-size: 13px !important;
      margin-top: 8px !important;
      margin-bottom: 8px !important;
      padding-bottom: 6px !important;
    }
    .prc-nav-container .dropdown-column a,
    .prc-mega-menu .dropdown-column a {
      padding: 10px 0 !important;
      color: #000850 !important;
    }

    /* Action buttons at bottom of drawer */
    .prc-nav-container .mobile-action-buttons,
    .prc-mega-menu .mobile-action-buttons {
      display: flex !important;
      flex-direction: column !important;
      gap: 10px !important;
      margin-top: 25px !important;
      padding-top: 20px !important;
      border-top: 1px solid #eee !important;
      order: 900 !important;
    }
    .prc-nav-container .mobile-action-buttons a,
    .prc-mega-menu .mobile-action-buttons a {
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      padding: 14px 20px !important;
      font-size: 15px !important;
      font-weight: 600 !important;
      border-radius: 4px !important;
      text-decoration: none !important;
      white-space: nowrap !important;
    }
    .prc-nav-container .mobile-action-buttons .login-btn,
    .prc-mega-menu .mobile-action-buttons .login-btn {
      background: transparent !important;
      border: 1px solid #ddd !important;
      color: #000 !important;
      margin: 0 !important;
    }
    .prc-nav-container .mobile-action-buttons .press-btn,
    .prc-mega-menu .mobile-action-buttons .press-btn {
      background: #ff3300 !important;
      color: #fff !important;
      margin: 0 !important;
      padding: 14px 20px !important;
    }
    .prc-nav-container .mobile-action-buttons a i,
    .prc-mega-menu .mobile-action-buttons a i { margin-left: 8px !important; }

    /* Secondary / legal links pinned to the very bottom */
    .prc-nav-container .mobile-footer-links,
    .prc-mega-menu .mobile-footer-links {
      display: flex !important;
      flex-wrap: wrap !important;
      column-gap: 18px !important;
      row-gap: 2px !important;
      margin-top: 22px !important;
      padding-top: 16px !important;
      border-top: 1px solid #eee !important;
      order: 950 !important;
    }
    .prc-nav-container .mobile-footer-links a,
    .prc-mega-menu .mobile-footer-links a {
      padding: 6px 0 !important;
      font-size: 13px !important;
      font-weight: 400 !important;
      color: #666 !important;
      background: transparent !important;
    }
    .prc-nav-container .mobile-footer-links a:hover,
    .prc-mega-menu .mobile-footer-links a:hover {
      color: #ff3300 !important;
      background: transparent !important;
    }

    /* Keep the primary list above the CTA + footer link blocks */
    .prc-nav-container .mega-menu > .menu,
    .prc-mega-menu > .menu { order: 1 !important; }

    /* On mobile, don't let scroll logic flip colors to white over a drawer */
    .prc-nav-container.scrolled .logo img.white-logo { filter: none !important; }
    .prc-nav-container.scrolled a { color: #000 !important; }
    .prc-nav-container.scrolled .menu-item > a:hover,
    .prc-nav-container.scrolled .menu-item.hover > a {
      background: transparent !important;
      color: #ff3300 !important;
    }
  }

  /* Body scroll lock when mobile drawer is open */
  body.prc-mobile-menu-open { overflow: hidden !important; }
  `;

  var style = document.createElement('style');
  style.setAttribute('data-prc-menu', 'true');
  style.textContent = css;
  document.head.appendChild(style);

  // ---- 2b. Magento detection & integration -------------------
  function detectMagento() {
    if (typeof window.checkout !== 'undefined' && window.checkout && window.checkout.baseUrl) return true;
    if (typeof window.BASE_URL !== 'undefined' && typeof window.LOCALE !== 'undefined') return true;
    if (document.querySelector('.minicart-wrapper[data-block="minicart"]')) return true;
    if (document.querySelector('script[src*="/static/version"][src*="/mage/"]')) return true;
    return false;
  }
  var isMagento = detectMagento();
  if (isMagento) {
    var magentoHideCSS = document.createElement('style');
    magentoHideCSS.setAttribute('data-prc-magento-hide', 'true');
    magentoHideCSS.textContent = `
      .page-header > .panel.wrapper { display: none !important; }
      .page-header .sections.nav-sections { display: none !important; }
      header.main-header { display: none !important; }
      .page-header .header.content { display: none !important; }
      .breadcrumbs, .page-header + .breadcrumbs, nav.breadcrumbs { display: none !important; }
      .page-wrapper > .page-header { margin: 0 !important; padding: 0 !important; border: 0 !important; min-height: 0 !important; height: auto !important; }
      .page-wrapper > .page-header:empty,
      .page-wrapper > .page-header { background: none !important; }
      .page-main { padding-top: 20px !important; }
      body.checkout-cart-index .page-main,
      body.checkout-index-index .page-main { padding-top: 0 !important; }
      #prc-menu-mount {
        width: 100% !important;
        max-width: 100% !important;
      }
      #prc-menu-mount .prc-nav-container {
        width: 100% !important;
        max-width: 100% !important;
      }
      .cms-menu-test .page-main,
      .page-main { padding-top: 0 !important; }
      #prc-menu-mount .minicart-wrapper {
        position: static !important;
        left: auto !important;
        top: auto !important;
        visibility: visible !important;
        margin-left: 10px !important;
      }
      #prc-menu-mount .minicart-wrapper .action.showcart {
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        width: 44px !important;
        height: 44px !important;
        border: none !important;
        background: transparent !important;
        color: #000 !important;
        text-decoration: none !important;
        position: relative !important;
        padding: 0 !important;
        margin: 0 !important;
        box-shadow: none !important;
        transition: color 0.3s ease !important;
      }
      #prc-menu-mount .minicart-wrapper .action.showcart:hover,
      #prc-menu-mount .minicart-wrapper .action.showcart:hover::before {
        color: #ff3300 !important;
        background: transparent !important;
      }
      #prc-menu-mount .minicart-wrapper .action.showcart .text {
        position: absolute !important;
        width: 1px !important; height: 1px !important;
        overflow: hidden !important; clip: rect(0,0,0,0) !important;
      }
      #prc-menu-mount .minicart-wrapper .action.showcart::before {
        font-size: 22px !important;
        color: inherit !important;
        line-height: 1 !important;
        margin: 0 !important;
      }
      #prc-menu-mount .minicart-wrapper .action.showcart .counter.qty {
        position: absolute !important;
        top: -4px !important;
        right: -4px !important;
        min-width: 20px !important;
        height: 20px !important;
        padding: 0 5px !important;
        background: #ff3300 !important;
        color: #fff !important;
        border-radius: 10px !important;
        font-size: 11px !important;
        font-weight: 700 !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        line-height: 1 !important;
        margin: 0 !important;
        box-shadow: 0 1px 3px rgba(0,0,0,0.2) !important;
      }
      #prc-menu-mount .minicart-wrapper .action.showcart .counter.qty.empty {
        display: none !important;
      }
      #prc-menu-mount .minicart-wrapper .counter-label { display: none !important; }
      #prc-menu-mount.has-magento-cart .cart-btn { display: none !important; }

      /* ---- Hide Magento's native mobile hamburger (nav-toggle) ----
         Magento themes render their own hamburger absolutely-positioned at
         the top-left on mobile. The generic header rules above don't catch
         it because it's outside .page-header in some themes. */
      .nav-toggle,
      .action.nav-toggle,
      .page-wrapper > .nav-toggle,
      header .nav-toggle,
      body > .nav-toggle {
        display: none !important;
        visibility: hidden !important;
      }
      /* Magento checkout also renders this "Sign In" link outside the
         header we hide above. Kill it too. */
      .page-wrapper .authentication-wrapper { display: none !important; }

      /* ---- Keep the relocated minicart tight inside our flex row ----
         Magento's theme CSS can give .minicart-wrapper absolute positioning,
         floats, or generous widths that push our own hamburger off the
         right edge. Pin it to a clean inline-flex box. */
      #prc-menu-mount .minicart-wrapper {
        position: static !important;
        left: auto !important; right: auto !important;
        top: auto !important; bottom: auto !important;
        float: none !important;
        display: inline-flex !important;
        align-items: center !important;
        visibility: visible !important;
        margin: 0 0 0 8px !important;
        padding: 0 !important;
        flex-shrink: 0 !important;
        width: auto !important;
        overflow: visible !important;
        transform: none !important;
      }

      /* ---- Force our hamburger visible on Magento mobile ----
         Defensive in case Magento's button resets fight our base styles. */
      @media (max-width: 1024px) {
        #prc-menu-mount .hamburger {
          display: flex !important;
          visibility: visible !important;
          opacity: 1 !important;
          width: 44px !important;
          height: 44px !important;
          min-width: 44px !important;
          flex-shrink: 0 !important;
          background: transparent !important;
          border: none !important;
          padding: 0 !important;
          margin: 0 0 0 8px !important;
          color: #000 !important;
          font-size: 22px !important;
          cursor: pointer !important;
        }
        /* Keep navbar on a single row so nothing wraps off-screen */
        #prc-menu-mount .navbar {
          flex-wrap: nowrap !important;
          overflow: visible !important;
        }
        #prc-menu-mount .action-buttons {
          margin-left: auto !important;
          flex-wrap: nowrap !important;
          flex-shrink: 0 !important;
        }
      }
    `;
    document.head.appendChild(magentoHideCSS);
  }

  // ---- 3. Build menu HTML -----------------------------------
  var B = SITE_BASE;

  // Mobile-only <li> items, rendered from MOBILE_EXTRA_LINKS.
  // These carry .prc-mobile-only so they never appear on desktop.
  var mobileExtraItemsHTML = MOBILE_EXTRA_LINKS.map(function (link, i) {
    var icon = link.icon ? '<i class="' + escAttr(link.icon) + '"></i>' : '';
    return '\n            <li class="menu-item prc-mobile-only" data-nav="extra-' + i + '">' +
           '<a href="' + escAttr(link.href) + '">' + icon + link.label + '</a></li>';
  }).join('');

  // Mobile-only secondary/legal link row. Rendered only if configured,
  // so an empty config never leaves a stray divider line in the drawer.
  var mobileFooterHTML = MOBILE_FOOTER_LINKS.length
    ? '\n          <div class="mobile-footer-links">' +
      MOBILE_FOOTER_LINKS.map(function (link) {
        return '\n            <a href="' + escAttr(link.href) + '">' + link.label + '</a>';
      }).join('') +
      '\n          </div>'
    : '';

  var menuHTML = `
    <div class="prc-nav-container">
      <div class="navbar">
        <div class="logo">
          <a href="${B}/">
            <img src="https://irp.cdn-website.com/9d35525b/dms3rep/multi/PRC_full_color.svg" alt="Press Release dot com Logo">
          </a>
        </div>
        <div class="mega-menu prc-mega-menu">
          <ul class="menu">
            <li class="menu-item has-dropdown" data-nav="use-cases">
              <a href="#">Use Cases</a>
              <div class="dropdown dropdown-size-large">
                <div class="dropdown-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px;">
                  <div class="dropdown-column">
                    <div class="dropdown-heading">By Use Case</div>
                    <a href="${B}/product-launches-market-entry"><i class="fas fa-rocket"></i>Product Launches &amp; Market Entry</a>
                    <a href="${B}/funding-announcements"><i class="fas fa-hand-holding-usd"></i>Funding Announcements</a>
                    <a href="${B}/franchise-location-launches"><i class="fas fa-store-alt"></i>Franchise &amp; Location Launches</a>
                    <a href="${B}/crisis-response-reputation-management"><i class="fas fa-shield-alt"></i>Crisis Response &amp; Reputation</a>
                    <a href="${B}/partnership-award-winning"><i class="fas fa-award"></i>Partnerships &amp; Award Wins</a>
                    <a href="${B}/personal-brand-thought-leadership"><i class="fas fa-user-tie"></i>Personal Brand &amp; Leadership</a>
                    <a href="${B}/content-campaign-amplification"><i class="fas fa-share-alt"></i>Content &amp; Campaign Amplification</a>
                    <a href="${B}/recruitment-employer-branding"><i class="fas fa-user-plus"></i>Recruitment &amp; Employer Branding</a>
                  </div>
                  <div class="dropdown-column">
                    <div class="dropdown-heading">By Stage</div>
                    <a href="${B}/startups-smb"><i class="fas fa-seedling"></i>Startups &amp; SMBs</a>
                    <a href="${B}/entrepreneurs-creators"><i class="fas fa-laptop-code"></i>Entrepreneurs &amp; Creators</a>
                    <a href="${B}/agencies"><i class="fas fa-users"></i>Agencies</a>
                    <a href="${B}/resellers"><i class="fas fa-redo-alt"></i>Resellers</a>
                    <a href="${B}/enterprise"><i class="fas fa-building"></i>Enterprise</a>
                  </div>
                </div>
              </div>
            </li>
            <li class="menu-item" data-nav="pricing">
              <a href="${B}/get-started">Pricing</a>
            </li>
            <li class="menu-item has-dropdown" data-nav="resources">
              <a href="#">Resources</a>
              <div class="dropdown dropdown-size-small">
                <div class="dropdown-grid" style="grid-template-columns: 1fr;">
                  <div class="dropdown-column">
                    <div class="dropdown-heading">Resources</div>
                    <a href="${B}/blog"><i class="fas fa-blog"></i>Blog</a>
                    <a href="${B}/home#cases"><i class="fas fa-trophy"></i>Success Stories</a>
                    <div class="dropdown-heading" style="margin-top: 20px;">Templates, Tips &amp; Tools</div>
                    <a href="https://www.pressrelease.com/download/amplification-checklist"><i class="fas fa-check-square"></i>Amplification Checklist</a>
                    <a href="https://www.pressrelease.com/download/play-book"><i class="fas fa-book-open"></i>Small Business Play Book</a>
                    <div class="dropdown-heading" style="margin-top: 20px;">Features</div>
                    <a href="${B}/access-verified"><i class="fas fa-check-circle"></i>ACCESS Verified</a>
                  </div>
                </div>
              </div>
            </li>
            <li class="menu-item" data-nav="news">
              <a href="${B}/newsroom">News</a>
            </li>
            <li class="menu-item" data-nav="contact">
              <a href="${B}/contact-us">Contact Us</a>
            </li>${mobileExtraItemsHTML}
          </ul>
          <div class="mobile-action-buttons">
            <a href="https://app.accessnewswire.com/login/pressrelease" target="_blank" class="login-btn">
              Login <i class="fas fa-user-circle"></i>
            </a>
            <a href="https://checkout.pressrelease.com/pricing.html" class="press-btn">
              Purchase Now <i class="fas fa-sign-in-alt"></i>
            </a>
          </div>${mobileFooterHTML}
        </div>
        <div class="action-buttons">
          <a href="https://app.accessnewswire.com/login/pressrelease" target="_blank" class="login-btn">
            Login <i class="fas fa-user-circle"></i>
          </a>
          <a href="https://checkout.pressrelease.com/pricing.html" class="press-btn">
            Purchase Now<i class="fas fa-sign-in-alt"></i>
          </a>
          <a href="https://checkout.pressrelease.com/checkout/cart" class="cart-btn" aria-label="Cart" title="Cart">
            <i class="fas fa-shopping-cart"></i>
          </a>
          <button type="button" class="hamburger" aria-label="Open menu" aria-expanded="false">
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
          </button>
        </div>
      </div>
    </div>
  `;

  // ---- 4. Mount the menu ------------------------------------
  function mountMenu() {
    var mount = document.getElementById(MOUNT_ID);

    if (!mount) {
      mount = document.createElement('div');
      mount.id = MOUNT_ID;

      if (isMagento && document.body) {
        if (document.body.firstChild) {
          document.body.insertBefore(mount, document.body.firstChild);
        } else {
          document.body.appendChild(mount);
        }
      } else {
        var scripts = document.querySelectorAll('script[src*="menu.js"]');
        var thisScript = scripts[scripts.length - 1];

        if (thisScript && thisScript.parentNode) {
          thisScript.parentNode.insertBefore(mount, thisScript.nextSibling);
        } else if (document.body.firstChild) {
          document.body.insertBefore(mount, document.body.firstChild);
        } else {
          document.body.appendChild(mount);
        }
      }
    }
    mount.innerHTML = menuHTML;

    attachBehaviors();

    if (isMagento) {
      relocateMagentoCart();
    }
  }

  function relocateMagentoCart() {
    var attempts = 0;
    var maxAttempts = 50;
    var interval = setInterval(function () {
      attempts++;
      var magentoCart = document.querySelector('.minicart-wrapper');
      var mount = document.getElementById(MOUNT_ID);
      var ourCartBtn = mount ? mount.querySelector('.cart-btn') : null;

      if (magentoCart && mount && ourCartBtn && !mount.contains(magentoCart)) {
        ourCartBtn.parentNode.insertBefore(magentoCart, ourCartBtn);
        mount.classList.add('has-magento-cart');
        clearInterval(interval);
      } else if (attempts >= maxAttempts) {
        clearInterval(interval);
      }
    }, 100);
  }

  // ---- 5. Attach hover + scroll + mobile behaviors -----------
  function attachBehaviors() {
    var navContainer = document.querySelector('.prc-nav-container');
    var hamburger = document.querySelector('.prc-nav-container .hamburger');
    var drawer = document.querySelector('.prc-mega-menu');

    // Placeholder marking where the drawer belongs in the DOM while
    // it is temporarily parked on <body>.
    var drawerHome = null;
    var reattachTimer = null;

    /* Move the drawer out to <body>.
       Any ancestor with a `transform` (Duda headers frequently have one)
       becomes the containing block for `position: fixed`, which pins the
       drawer inside the header strip instead of the viewport. Parking it
       on <body> guarantees there is no transformed ancestor left. */
    function detachDrawer() {
      if (!drawer || drawer.parentNode === document.body) return;
      drawerHome = document.createComment('prc-mega-menu-home');
      drawer.parentNode.insertBefore(drawerHome, drawer);
      document.body.appendChild(drawer);
    }

    function reattachDrawer() {
      if (!drawer || !drawerHome || !drawerHome.parentNode) return;
      drawerHome.parentNode.insertBefore(drawer, drawerHome);
      drawerHome.parentNode.removeChild(drawerHome);
      drawerHome = null;
    }

    function closeMobileMenu(immediate) {
      if (!navContainer) return;
      navContainer.classList.remove('mobile-open');
      document.body.classList.remove('prc-mobile-menu-open');
      if (drawer) drawer.classList.remove('is-open');
      if (hamburger) {
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', 'Open menu');
      }
      // Collapse any open mobile accordions
      document.querySelectorAll('.menu-item.mobile-expanded').forEach(function (i) {
        i.classList.remove('mobile-expanded');
      });

      // Put the drawer back once the slide-out has finished, so the
      // animation is still visible. Immediate on desktop resize.
      clearTimeout(reattachTimer);
      if (immediate) {
        reattachDrawer();
      } else {
        reattachTimer = setTimeout(reattachDrawer, DRAWER_ANIM_MS);
      }
    }

    // Hamburger toggle
    if (hamburger) {
      hamburger.addEventListener('click', function (e) {
        e.stopPropagation();
        var willOpen = !navContainer.classList.contains('mobile-open');
        if (willOpen) {
          clearTimeout(reattachTimer);
          detachDrawer();
          // Force a reflow so the browser registers the off-screen
          // start position before the transform transition runs.
          if (drawer) void drawer.offsetWidth;
          navContainer.classList.add('mobile-open');
          if (drawer) drawer.classList.add('is-open');
          document.body.classList.add('prc-mobile-menu-open');
          hamburger.setAttribute('aria-expanded', 'true');
          hamburger.setAttribute('aria-label', 'Close menu');
        } else {
          closeMobileMenu();
        }
      });
    }

    // Close the drawer on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navContainer.classList.contains('mobile-open')) {
        closeMobileMenu();
      }
    });

    // Dropdown behavior: hover on desktop, tap-toggle on mobile
    var items = document.querySelectorAll('.prc-mega-menu .has-dropdown');
    items.forEach(function (item) {
      // Desktop hover
      item.addEventListener('mouseenter', function () {
        if (isMobileView()) return;
        document.querySelectorAll('.prc-mega-menu .menu-item.hover').forEach(function (i) {
          if (i !== item) i.classList.remove('hover');
        });
        item.classList.add('hover');
      });
      item.addEventListener('mouseleave', function () {
        if (isMobileView()) return;
        item.classList.remove('hover');
      });

      // Mobile tap to expand/collapse
      var trigger = null;
      for (var c = 0; c < item.children.length; c++) {
        if (item.children[c].tagName === 'A') { trigger = item.children[c]; break; }
      }
      if (trigger) {
        trigger.addEventListener('click', function (e) {
          if (!isMobileView()) return;
          // These are placeholder anchors (href="#"), don't let them jump to top
          e.preventDefault();
          item.classList.toggle('mobile-expanded');
        });
      }
    });

    // Close mobile menu when user taps a real link
    document.querySelectorAll('.prc-mega-menu a').forEach(function (a) {
      a.addEventListener('click', function () {
        if (!isMobileView()) return;
        var href = a.getAttribute('href');
        if (href && href !== '#') closeMobileMenu(true);
      });
    });

    // Reset to desktop state on resize above breakpoint.
    // The immediate reattach matters: leaving the drawer on <body>
    // above the breakpoint would empty the desktop nav bar.
    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        if (!isMobileView()) closeMobileMenu(true);
      }, 100);
    });

    // Scroll-driven logo/nav color swap — desktop only
    window.addEventListener('scroll', function () {
      if (isMobileView()) return;
      var logoImg = document.querySelector('.prc-nav-container .logo img');
      var nc = document.querySelector('.prc-nav-container');
      if (!logoImg || !nc) return;
      if (window.scrollY > 10) {
        logoImg.classList.add('white-logo');
        nc.classList.add('scrolled');
      } else {
        logoImg.classList.remove('white-logo');
        nc.classList.remove('scrolled');
      }
    });
  }

  // ---- 6. Run when DOM is ready ------------------------------
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountMenu);
  } else {
    mountMenu();
  }
})();
