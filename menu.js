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
 * ============================================================ */

(function () {
  'use strict';

  // ---- Config ------------------------------------------------
  // If the main marketing site ever moves, change this one line.
  var SITE_BASE = 'https://www.pressrelease.com';

  // Where the menu should render. If a <div id="prc-menu-mount">
  // exists on the page, we'll use it. Otherwise we inject at the
  // top of <body> so the menu always appears above page content.
  var MOUNT_ID = 'prc-menu-mount';

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
  `;

  var style = document.createElement('style');
  style.setAttribute('data-prc-menu', 'true');
  style.textContent = css;
  document.head.appendChild(style);

  // ---- 2b. Magento detection & integration -------------------
  // On Magento pages we:
  //   1. Hide the original Magento theme header (duplicate menu)
  //   2. Hide Magento's breadcrumbs
  //   3. Force our menu to span full width regardless of Magento's layout
  //   4. Relocate Magento's native minicart widget into our menu's cart slot
  //
  // Strict detection: only true if we see Magento-specific globals or DOM
  // markers that would never appear on Duda or other platforms. Generic
  // body class matches (like [class*="cms-"]) are NOT used because Duda
  // sometimes adds classes with those substrings, causing false positives.
  function detectMagento() {
    if (typeof window.checkout !== 'undefined' && window.checkout && window.checkout.baseUrl) return true;
    if (typeof window.BASE_URL !== 'undefined' && typeof window.LOCALE !== 'undefined') return true;
    if (document.querySelector('.minicart-wrapper[data-block="minicart"]')) return true;
    // Fall back to looking for Magento's page-wrapper combined with its script signature
    if (document.querySelector('script[src*="/static/version"][src*="/mage/"]')) return true;
    return false;
  }
  var isMagento = detectMagento();
  if (isMagento) {
    var magentoHideCSS = document.createElement('style');
    magentoHideCSS.setAttribute('data-prc-magento-hide', 'true');
    magentoHideCSS.textContent = `
      /* Hide original Magento header pieces */
      .page-header > .panel.wrapper { display: none !important; }
      .page-header .sections.nav-sections { display: none !important; }
      header.main-header { display: none !important; }
      .page-header .header.content { display: none !important; }

      /* Hide breadcrumbs */
      .breadcrumbs, .page-header + .breadcrumbs, nav.breadcrumbs { display: none !important; }

      /* Remove extra spacing from stripped-out header elements */
      .page-wrapper > .page-header { margin: 0 !important; padding: 0 !important; border: 0 !important; min-height: 0 !important; height: auto !important; }
      /* Collapse the empty header container so there's no blank space above content */
      .page-wrapper > .page-header:empty,
      .page-wrapper > .page-header { background: none !important; }

      /* Reduce leftover top padding on the main content area */
      .page-main { padding-top: 20px !important; }
      body.checkout-cart-index .page-main,
      body.checkout-index-index .page-main { padding-top: 0 !important; }

      /* Force our shared menu to span the full width of the viewport.
         We use position:relative with a left offset that accounts for the
         distance between the mount and the viewport edge. Using 100vw with
         negative margins caused content to be clipped on the left on some
         Magento layouts. */
      #prc-menu-mount {
        width: 100% !important;
        max-width: 100% !important;
      }
      #prc-menu-mount .prc-nav-container {
        width: 100% !important;
        max-width: 100% !important;
      }
      /* The Magento CMS page wraps content in a <main class="page-main">
         with padding. Neutralize that padding ABOVE our menu by pulling the
         page-main's top to 0 and letting our menu sit flush. */
      .cms-menu-test .page-main,
      .page-main { padding-top: 0 !important; }

      /* When Magento's native minicart is relocated into our menu slot,
         restore its visibility and strip theme styling that would make it
         look wrong in our menu. NO circle/border - just a clean icon. */
      #prc-menu-mount .minicart-wrapper {
        position: static !important;
        left: auto !important;
        top: auto !important;
        visibility: visible !important;
        margin-left: 10px !important;
      }
      /* Style the relocated minicart as a clean icon-only button */
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
      /* Hide the default "My Cart" text label - we want icon only */
      #prc-menu-mount .minicart-wrapper .action.showcart .text {
        position: absolute !important;
        width: 1px !important; height: 1px !important;
        overflow: hidden !important; clip: rect(0,0,0,0) !important;
      }
      /* The cart icon itself (Magento uses an icon font pseudo-element) */
      #prc-menu-mount .minicart-wrapper .action.showcart::before {
        font-size: 22px !important;
        color: inherit !important;
        line-height: 1 !important;
        margin: 0 !important;
      }
      /* Item count badge - positioned on the top-right of the icon */
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

      /* If we've relocated the minicart, hide our own fallback cart button
         so we don't end up with two cart icons. */
      #prc-menu-mount.has-magento-cart .cart-btn { display: none !important; }
    `;
    document.head.appendChild(magentoHideCSS);
  }

  // ---- 3. Build menu HTML (absolute URLs so it works on any subdomain) ----
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
            <li class="menu-item">
              <a href="${B}/ACCESS-verified">ACCESS Verified</a>
            </li>
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
                    <div class="dropdown-heading">Resources</div>
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
        </div>
        <div class="action-buttons">
          <a href="https://app.accessnewswire.com/login/pressrelease" target="_blank" class="login-btn">
            Login <i class="fas fa-user-circle"></i>
          </a>
          <a href="https://checkout.pressrelease.com/checkout/" class="press-btn">
            Purchase Now <i class="fas fa-sign-in-alt"></i>
          </a>
          <a href="https://checkout.pressrelease.com/checkout/cart" class="cart-btn" aria-label="Cart" title="Cart">
            <i class="fas fa-shopping-cart"></i>
          </a>
        </div>
      </div>
    </div>
  `;

  // ---- 4. Mount the menu ------------------------------------
  // Strategy differs by platform:
  //   - On Duda: render right next to the <script> tag so the menu sits
  //     inside the HTML widget where the publisher placed it.
  //   - On Magento: render at the TOP of <body>, ignoring where the CMS
  //     block was placed. This avoids getting trapped inside Magento's
  //     narrow content column which clips the menu.
  function mountMenu() {
    var mount = document.getElementById(MOUNT_ID);

    if (!mount) {
      mount = document.createElement('div');
      mount.id = MOUNT_ID;

      if (isMagento && document.body) {
        // Magento: top of body, escape the content column entirely
        if (document.body.firstChild) {
          document.body.insertBefore(mount, document.body.firstChild);
        } else {
          document.body.appendChild(mount);
        }
      } else {
        // Non-Magento (Duda etc.): render next to the <script> tag
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

    // On Magento: try to relocate Magento's native minicart widget into our
    // menu's cart slot. We retry for up to ~5 seconds because Magento's
    // Knockout bindings initialize asynchronously and the element may not
    // be ready when our script first runs.
    if (isMagento) {
      relocateMagentoCart();
    }
    // On non-Magento pages (Duda, etc.): cart icon stays as a simple link
    // pointing to the Magento cart page. No live count badge - users click
    // and go to Magento to see their cart.
  }

  function relocateMagentoCart() {
    var attempts = 0;
    var maxAttempts = 50; // 50 * 100ms = 5 seconds
    var interval = setInterval(function () {
      attempts++;
      var magentoCart = document.querySelector('.minicart-wrapper');
      var mount = document.getElementById(MOUNT_ID);
      var ourCartBtn = mount ? mount.querySelector('.cart-btn') : null;

      if (magentoCart && mount && ourCartBtn && !mount.contains(magentoCart)) {
        // Insert Magento's cart widget right before our fallback cart button
        ourCartBtn.parentNode.insertBefore(magentoCart, ourCartBtn);
        // Mark the mount so our CSS hides our fallback cart button
        mount.classList.add('has-magento-cart');
        clearInterval(interval);
      } else if (attempts >= maxAttempts) {
        // Gave up - Magento minicart never materialized on this page.
        // Our own fallback cart button stays visible as a backup.
        clearInterval(interval);
      }
    }, 100);
  }

  // ---- 5. Attach hover + scroll behaviors -------------------
  function attachBehaviors() {
    // Dropdown hover
    var items = document.querySelectorAll('.prc-nav-container .has-dropdown');
    items.forEach(function (item) {
      item.addEventListener('mouseenter', function () {
        document.querySelectorAll('.prc-nav-container .menu-item.hover').forEach(function (i) {
          if (i !== item) i.classList.remove('hover');
        });
        item.classList.add('hover');
      });
      item.addEventListener('mouseleave', function () {
        item.classList.remove('hover');
      });
    });

    // Scroll-driven logo/nav color swap
    window.addEventListener('scroll', function () {
      var logoImg = document.querySelector('.prc-nav-container .logo img');
      var navContainer = document.querySelector('.prc-nav-container');
      if (!logoImg || !navContainer) return;
      if (window.scrollY > 10) {
        logoImg.classList.add('white-logo');
        navContainer.classList.add('scrolled');
      } else {
        logoImg.classList.remove('white-logo');
        navContainer.classList.remove('scrolled');
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
