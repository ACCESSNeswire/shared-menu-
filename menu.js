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

  // ---- 2b. Magento detection & duplicate-header hiding -------
  // On Magento pages, we want to hide the existing theme header so we
  // don't show two menus stacked on top of each other. But we MUST keep
  // Magento's mini-cart DOM element alive and functional so its JavaScript
  // (item count, slide-out popup, live updates) continues to work - we
  // just make it visually invisible. Users will use the cart icon in our
  // shared menu instead, which links directly to /checkout/cart/.
  var isMagento = typeof window.checkout !== 'undefined'
               || !!document.querySelector('body[class*="cms-"], body[class*="catalog-"], body[class*="checkout-"]');
  if (isMagento) {
    var magentoHideCSS = document.createElement('style');
    magentoHideCSS.setAttribute('data-prc-magento-hide', 'true');
    magentoHideCSS.textContent = `
      /* Hide the top panel/announcement bar */
      .page-header > .panel.wrapper { display: none !important; }
      /* Hide nav sections (the mobile/responsive menu container) */
      .page-header .sections.nav-sections { display: none !important; }
      /* Hide the custom main-header built by the theme */
      header.main-header { display: none !important; }
      /* Hide the standard Magento header content row if present */
      .page-header .header.content { display: none !important; }
      /* But KEEP the minicart element in the DOM - just visually hidden
         so Magento's JS (which watches for DOM elements) keeps working */
      .minicart-wrapper {
        position: absolute !important;
        left: -9999px !important;
        top: -9999px !important;
        visibility: hidden !important;
      }
      /* Remove extra spacing left behind by hidden header elements */
      .page-wrapper > .page-header { margin: 0 !important; padding: 0 !important; border: 0 !important; }
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
          <a href="${B}/get-started" class="press-btn">
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
  // Strategy: render the menu RIGHT NEXT TO the <script> tag that loaded
  // this file. That way, on Duda the menu appears inside the HTML widget
  // exactly where it was before, without shifting any page content.
  // Only fall back to <body> injection if we absolutely can't find our script.
  function mountMenu() {
    var mount = document.getElementById(MOUNT_ID);

    if (!mount) {
      // Try to find the <script> tag that loaded this file
      var scripts = document.querySelectorAll('script[src*="menu.js"]');
      var thisScript = scripts[scripts.length - 1]; // last one is usually ours

      mount = document.createElement('div');
      mount.id = MOUNT_ID;

      if (thisScript && thisScript.parentNode) {
        // Insert the menu right after our own <script> tag - this keeps it
        // inside the Duda HTML widget / Magento CMS block exactly where the
        // publisher placed the script, so page layout isn't disturbed.
        thisScript.parentNode.insertBefore(mount, thisScript.nextSibling);
      } else if (document.body.firstChild) {
        // Fallback: top of <body>
        document.body.insertBefore(mount, document.body.firstChild);
      } else {
        document.body.appendChild(mount);
      }
    }
    mount.innerHTML = menuHTML;

    attachBehaviors();
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
