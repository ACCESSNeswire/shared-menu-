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
 * ============================================================ */

(function () {
  'use strict';

  // ---- Config ------------------------------------------------
  var SITE_BASE = 'https://www.pressrelease.com';
  var MOUNT_ID = 'prc-menu-mount';
  var MOBILE_BREAKPOINT = 1024; // px — below this we switch to mobile nav

  function isMobileView() {
    return window.innerWidth <= MOBILE_BREAKPOINT;
  }

  // ---- 1. Inject Font Awesome (if not already present) -------
  if (!document.querySelector('link[href*="font-awesome"]')) {
    var fa = document.createElement('link');
    fa.rel = 'stylesheet';
    fa.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css';
    document.head.appendChild(fa);
  }

  // ---- 2. Inject menu styles --------------------------------
  var css = `
  .prc-nav-container { font-family: 'Poppins', sans-serif !important; }
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
  .prc-nav-container a {
    color: #000000 !important;
    text-decoration: none !important;
    display: block !important;
    padding: 10px 10px !important;
    transition: all 0.3s ease !important;
  }
  .prc-nav-container.scrolled a { color: #ffffff !important; }
  .prc-nav-container a:hover {
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
  .prc-nav-container .menu {
    list-style: none !important;
    display: flex !important;
    margin: 0 !important;
    padding: 0 !important;
    gap: 30px !important;
  }
  .prc-nav-container .menu-item { position: relative !important; }
  .prc-nav-container .menu > a {
    display: block !important;
    padding: 10px 15px !important;
    color: #000000 !important;
    font-size: 14px !important;
    font-weight: 600 !important;
    text-decoration: none !important;
    transition: all 0.3s ease !important;
  }
  .prc-nav-container .has-dropdown > a::after {
    content: '\\f078' !important;
    font-family: 'Font Awesome 5 Free' !important;
    font-weight: 900 !important;
    font-size: 10px !important;
    margin-left: 8px !important;
    transition: transform 0.3s ease !important;
  }
  .prc-nav-container .menu-item.hover > a,
  .prc-nav-container .menu-item > a:hover {
    background-color: #ff3300 !important;
    color: #ffffff !important;
  }
  .prc-nav-container .menu-item.hover > a::after { transform: rotate(180deg) !important; }
  .prc-nav-container .dropdown {
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
  .prc-nav-container .menu-item.hover .dropdown {
    opacity: 1 !important;
    visibility: visible !important;
    pointer-events: auto !important;
  }
  .prc-nav-container .dropdown-size-small { width: 300px !important; }
  .prc-nav-container .dropdown-size-large { width: 900px !important; }
  .prc-nav-container .dropdown-column .dropdown-heading {
    font-size: 18px !important;
    font-weight: bold !important;
    color: #000850 !important;
    margin-bottom: 15px !important;
    padding-bottom: 10px !important;
    border-bottom: 1px solid #eeeeee !important;
  }
  .prc-nav-container .dropdown-column a {
    display: flex !important;
    align-items: center !important;
    padding: 8px 0 !important;
    font-size: 14px !important;
    text-decoration: none !important;
    color: #000850 !important;
    transition: all 0.2s ease !important;
  }
  .prc-nav-container .dropdown-column a:hover {
    color: #ff3300 !important;
    transform: translateX(5px) !important;
  }
  .prc-nav-container .dropdown-column a i {
    color: #ff3300 !important;
    width: 25px !important;
    margin-right: 10px !important;
    font-size: 16px !important;
    text-align: center !important;
  }
  .prc-nav-container .press-btn,
  .prc-nav-container .login-btn {
    display: flex !important;
    align-items: center !important;
    padding: 10px 10px !important;
    margin-left: 10px !important;
    text-decoration: none !important;
    font-size: 14px !important;
    transition: all 0.3s ease !important;
    white-space: nowrap;
  }
  .prc-nav-container .press-btn {
    background-color: #FF3300 !important;
    color: #ffffff !important;
    padding: 20px 40px !important;
  }
  .prc-nav-container .press-btn:hover {
    background-color: #ff330030 !important;
    padding: 20px 40px !important;
  }
  .prc-nav-container .login-btn { background-color: transparent !important; color: #000000 !important; }
  .prc-nav-container .login-btn:hover { color: #ff3300 !important; }
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
  .prc-nav-container .login-btn i { margin-left: 8px !important; }
  .prc-nav-container .logo img.white-logo {
    filter: brightness(0) invert(1);
    transition: filter 0.3s ease;
  }

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
  .prc-nav-container .mobile-action-buttons { display: none; }

  /* ============================================================
     MOBILE BREAKPOINT (≤1024px)
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

    /* Turn mega-menu into a slide-in drawer */
    .prc-nav-container .mega-menu {
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
    .prc-nav-container.mobile-open .mega-menu {
      transform: translateX(0) !important;
    }

    /* Stack menu items vertically */
    .prc-nav-container .menu {
      flex-direction: column !important;
      gap: 0 !important;
      width: 100% !important;
    }
    .prc-nav-container .menu-item {
      border-bottom: 1px solid #eee !important;
      width: 100% !important;
      position: static !important;
    }
    .prc-nav-container .menu-item > a {
      padding: 15px 5px !important;
      font-size: 16px !important;
      color: #000 !important;
      background: transparent !important;
    }
    /* Don't paint the bar red on tap-hover for mobile - just color shift */
    .prc-nav-container .menu-item > a:hover,
    .prc-nav-container .menu-item.hover > a {
      background: transparent !important;
      color: #ff3300 !important;
    }
    .prc-nav-container .has-dropdown > a::after {
      float: right !important;
      margin-top: 7px !important;
    }
    .prc-nav-container .menu-item.mobile-expanded > a::after {
      transform: rotate(180deg) !important;
    }

    /* Dropdowns become inline accordions */
    .prc-nav-container .dropdown,
    .prc-nav-container .dropdown-size-small,
    .prc-nav-container .dropdown-size-large {
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
    .prc-nav-container .menu-item.mobile-expanded .dropdown {
      display: block !important;
    }
    /* Don't auto-open on desktop-style .hover class on mobile */
    .prc-nav-container .menu-item.hover .dropdown { display: none !important; }
    .prc-nav-container .menu-item.hover.mobile-expanded .dropdown { display: block !important; }

    .prc-nav-container .dropdown-grid {
      display: block !important;
      grid-template-columns: 1fr !important;
    }
    .prc-nav-container .dropdown-column { margin-bottom: 10px !important; }
    .prc-nav-container .dropdown-column .dropdown-heading {
      font-size: 13px !important;
      margin-top: 8px !important;
      margin-bottom: 8px !important;
      padding-bottom: 6px !important;
    }
    .prc-nav-container .dropdown-column a {
      padding: 10px 0 !important;
      color: #000850 !important;
    }

    /* Action buttons at bottom of drawer */
    .prc-nav-container .mobile-action-buttons {
      display: flex !important;
      flex-direction: column !important;
      gap: 10px !important;
      margin-top: 25px !important;
      padding-top: 20px !important;
      border-top: 1px solid #eee !important;
    }
    .prc-nav-container .mobile-action-buttons a {
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
    .prc-nav-container .mobile-action-buttons .login-btn {
      background: transparent !important;
      border: 1px solid #ddd !important;
      color: #000 !important;
      margin: 0 !important;
    }
    .prc-nav-container .mobile-action-buttons .press-btn {
      background: #ff3300 !important;
      color: #fff !important;
      margin: 0 !important;
      padding: 14px 20px !important;
    }
    .prc-nav-container .mobile-action-buttons a i { margin-left: 8px !important; }

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
  var menuHTML = `
    <div class="prc-nav-container">
      <div class="navbar">
        <div class="logo">
          <a href="${B}/">
            <img src="https://irp.cdn-website.com/9d35525b/dms3rep/multi/PRC_full_color.svg" alt="Press Release dot com Logo">
          </a>
        </div>
        <div class="mega-menu">
          <ul class="menu">
            <li class="menu-item has-dropdown">
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
            <li class="menu-item">
              <a href="${B}/get-started">Pricing</a>
            </li>
            <li class="menu-item has-dropdown">
              <a href="#">Resources</a>
              <div class="dropdown dropdown-size-small">
                <div class="dropdown-grid" style="grid-template-columns: 1fr;">
                  <div class="dropdown-column">
                    <div class="dropdown-heading">Features</div>
                    <a href="${B}/ACCESS-verified"><i class="fas fa-check-circle"></i>ACCESS Verified</a>
                    <div class="dropdown-heading" style="margin-top: 20px;">Resources</div>
                    <a href="${B}/blog"><i class="fas fa-blog"></i>Blog</a>
                    <a href="${B}/home#cases"><i class="fas fa-trophy"></i>Success Stories</a>
                    <div class="dropdown-heading" style="margin-top: 20px;">Templates, Tips &amp; Tools</div>
                    <a href="https://www.pressrelease.com/download/amplification-checklist"><i class="fas fa-check-square"></i>Amplification Checklist</a>
                    <a href="https://www.pressrelease.com/download/play-book"><i class="fas fa-book-open"></i>Small Business Play Book</a>
                  </div>
                </div>
              </div>
            </li>
            <li class="menu-item">
              <a href="${B}/newsroom">News</a>
            </li>
            <li class="menu-item">
              <a href="${B}/contact-us">Contact Us</a>
            </li>
          </ul>
          <div class="mobile-action-buttons">
            <a href="https://app.accessnewswire.com/login/pressrelease" target="_blank" class="login-btn">
              Login <i class="fas fa-user-circle"></i>
            </a>
            <a href="https://checkout.pressrelease.com/checkout" class="press-btn">
              Purchase Now <i class="fas fa-sign-in-alt"></i>
            </a>
          </div>
        </div>
        <div class="action-buttons">
          <a href="https://app.accessnewswire.com/login/pressrelease" target="_blank" class="login-btn">
            Login <i class="fas fa-user-circle"></i>
          </a>
          <a href="https://checkout.pressrelease.com/checkout" class="press-btn">
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

    function closeMobileMenu() {
      if (!navContainer) return;
      navContainer.classList.remove('mobile-open');
      document.body.classList.remove('prc-mobile-menu-open');
      if (hamburger) {
        hamburger.setAttribute('aria-expanded', 'false');
      }
      // Collapse any open mobile accordions
      document.querySelectorAll('.prc-nav-container .menu-item.mobile-expanded').forEach(function (i) {
        i.classList.remove('mobile-expanded');
      });
    }

    // Hamburger toggle
    if (hamburger) {
      hamburger.addEventListener('click', function (e) {
        e.stopPropagation();
        var willOpen = !navContainer.classList.contains('mobile-open');
        if (willOpen) {
          navContainer.classList.add('mobile-open');
          document.body.classList.add('prc-mobile-menu-open');
          hamburger.setAttribute('aria-expanded', 'true');
        } else {
          closeMobileMenu();
        }
      });
    }

    // Dropdown behavior: hover on desktop, tap-toggle on mobile
    var items = document.querySelectorAll('.prc-nav-container .has-dropdown');
    items.forEach(function (item) {
      // Desktop hover
      item.addEventListener('mouseenter', function () {
        if (isMobileView()) return;
        document.querySelectorAll('.prc-nav-container .menu-item.hover').forEach(function (i) {
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
    document.querySelectorAll('.prc-nav-container .mega-menu a').forEach(function (a) {
      a.addEventListener('click', function () {
        if (!isMobileView()) return;
        var href = a.getAttribute('href');
        if (href && href !== '#') closeMobileMenu();
      });
    });

    // Reset to desktop state on resize above breakpoint
    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        if (!isMobileView()) closeMobileMenu();
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
