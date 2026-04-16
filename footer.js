/* ============================================================
 * PressRelease.com Shared Footer
 * ------------------------------------------------------------
 * Single source of truth for the site footer. Load on any site
 * (Duda, Magento, etc.) with a single line:
 *
 *   <script src="https://accessneswire.github.io/shared-menu-/footer.js"></script>
 *
 * To update the footer, edit this file, commit, and push. Both
 * sites will reflect the change within GitHub Pages' cache TTL
 * (usually under a minute, sometimes a few minutes).
 * ============================================================ */

(function () {
  'use strict';

  // ---- Config ------------------------------------------------
  // If the main marketing site ever moves, change this one line.
  var SITE_BASE = 'https://www.pressrelease.com';
  var MOUNT_ID = 'prc-footer-mount';

  // ---- Magento detection -------------------------------------
  // Same detection logic as menu.js. On Magento pages we hide the theme's
  // default footer so we don't get two footers stacked.
  function detectMagento() {
    if (typeof window.checkout !== 'undefined' && window.checkout && window.checkout.baseUrl) return true;
    if (typeof window.BASE_URL !== 'undefined' && typeof window.LOCALE !== 'undefined') return true;
    if (document.querySelector('.minicart-wrapper[data-block="minicart"]')) return true;
    if (document.querySelector('script[src*="/static/version"][src*="/mage/"]')) return true;
    return false;
  }
  var isMagento = detectMagento();

  // ---- 1. Inject Poppins font (if not already present) ------
  if (!document.querySelector('link[href*="fonts.googleapis.com/css2?family=Poppins"]')) {
    var fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap';
    document.head.appendChild(fontLink);
  }

  // ---- 2. Inject footer styles ------------------------------
  var css = `
    .prc-footer-container {
      --footer-bg: #330066;
      --footer-text: #ffffff;
      --footer-link: #ffffff;
      --footer-link-hover: #ffff00;
      --footer-heading: #ffCC00;
      --footer-border: rgba(255, 255, 255, 0.1);
    }
    .prc-footer-container .site-footer {
      background-color: var(--footer-bg);
      color: var(--footer-text);
      padding: 40px 0;
      font-family: 'Poppins', sans-serif;
    }
    .prc-footer-container .footer-top {
      display: flex;
      flex-wrap: nowrap;
      justify-content: space-between;
      padding: 0 20px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .prc-footer-container .footer-content-area {
      display: flex;
      flex: 1;
      gap: 40px;
      align-items: flex-start;
      width: 100%;
    }
    .prc-footer-container .footer-column,
    .prc-footer-container .contact-block {
      flex: 1;
      margin-bottom: 20px;
      min-width: 0;
    }
    .prc-footer-container .footer-column p,
    .prc-footer-container .contact-block h4 {
      font-size: 15px;
      font-weight: 600;
      margin: 0 0 10px 0;
      color: var(--footer-heading) !important;
      font-family: 'Poppins', sans-serif !important;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .prc-footer-container .contact-block h4 + h4 { margin-top: 15px; }
    .prc-footer-container .footer-column ul,
    .prc-footer-container .contact-block ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .prc-footer-container .footer-column ul li,
    .prc-footer-container .contact-block ul li { margin-bottom: 8px; }
    .prc-footer-container .footer-column ul li a,
    .prc-footer-container .contact-block a {
      color: var(--footer-link);
      text-decoration: none;
      font-size: 14px;
      opacity: 0.85;
      transition: color 0.3s ease;
    }
    .prc-footer-container .footer-column ul li a:hover,
    .prc-footer-container .contact-block a:hover {
      color: var(--footer-link-hover);
      opacity: 1;
    }
    .prc-footer-container .contact-block p {
      margin: 6px 0;
      font-size: 14px;
      color: var(--footer-text);
      opacity: 0.85;
    }
    .prc-footer-container .contact-block .social-icons a {
      display: inline-block;
      margin-right: 15px;
      font-size: 20px;
      font-weight: 600;
      color: var(--footer-link);
      transition: color 0.3s ease;
    }
    .prc-footer-container .contact-block .social-icons a:hover {
      color: var(--footer-link-hover);
    }
    .prc-footer-container .footer-bottom {
      text-align: center;
      padding: 20px 10px 0;
      border-top: 1px solid var(--footer-border);
      margin-top: 20px;
      font-size: 13px;
    }
    .prc-footer-container .footer-bottom .logo img {
      height: 30px;
      margin-bottom: 10px;
    }
    .prc-footer-container .footer-bottom .legal-links a {
      color: var(--footer-link);
      text-decoration: none;
      margin: 0 8px;
      opacity: 0.7;
      font-size: 13px;
      transition: color 0.3s ease;
    }
    .prc-footer-container .footer-bottom .legal-links a:hover {
      color: var(--footer-link-hover);
      opacity: 1;
    }
    .prc-footer-container .footer-bottom p {
      margin: 5px 0 0;
      color: var(--footer-text);
      opacity: 0.7;
    }
    @media (max-width: 992px) {
      .prc-footer-container .footer-top { flex-wrap: wrap; }
      .prc-footer-container .footer-column,
      .prc-footer-container .contact-block { flex: 1 1 45%; }
    }
    @media (max-width: 576px) {
      .prc-footer-container .footer-top {
        flex-direction: column;
        align-items: center;
        text-align: center;
      }
      .prc-footer-container .footer-content-area {
        flex-direction: column !important;
        align-items: center !important;
        gap: 25px !important;
        text-align: center !important;
      }
      .prc-footer-container .footer-column,
      .prc-footer-container .contact-block {
        flex: 1 1 100%;
        width: 100% !important;
        max-width: 320px;
        margin: 0 auto 25px auto !important;
      }
      .prc-footer-container .footer-column ul,
      .prc-footer-container .contact-block ul {
        padding: 0;
        text-align: center;
      }
      .prc-footer-container .contact-block .social-icons {
        display: flex;
        justify-content: center;
        gap: 20px;
      }
      .prc-footer-container .footer-bottom {
        text-align: center !important;
        padding-top: 30px !important;
      }
      .prc-footer-container .footer-bottom .legal-links {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 8px;
        line-height: 1.6;
      }
    }
  `;

  var style = document.createElement('style');
  style.setAttribute('data-prc-footer', 'true');
  style.textContent = css;
  document.head.appendChild(style);

  // ---- 2b. Magento-specific: hide default theme footer --------
  // So we don't end up with Magento's footer stacked below ours.
  if (isMagento) {
    var magentoHideCSS = document.createElement('style');
    magentoHideCSS.setAttribute('data-prc-footer-magento-hide', 'true');
    magentoHideCSS.textContent = `
      /* Hide Magento's default theme footer content */
      .page-wrapper > footer.page-footer { display: none !important; }
      footer.page-footer { display: none !important; }
      /* Also hide Magento's "copyright" block if rendered outside footer */
      .copyright { display: none !important; }
    `;
    document.head.appendChild(magentoHideCSS);
  }

  // ---- 3. Build footer HTML ----------------------------------
  var B = SITE_BASE;
  var footerHTML = `
    <div class="prc-footer-container">
      <footer class="site-footer">
        <div class="footer-top">
          <div class="footer-content-area">
            <div class="footer-column">
              <p>Company</p>
              <ul>
                <li><a href="${B}/about-us">About Us</a></li>
                <li><a href="${B}/faqs">FAQs</a></li>
                <li><a href="${B}/contact-us">Contact Us</a></li>
              </ul>
            </div>
            <div class="footer-column">
              <p>Our Brands</p>
              <ul>
                <li><a href="https://www.accessnewswire.com" target="_blank" rel="noopener noreferrer">ACCESS Newswire</a></li>
                <li><a href="https://www.newswire.com" target="_blank" rel="noopener noreferrer">Newswire.com</a></li>
                <li><a href="https://pressrelease.com" target="_blank" rel="noopener noreferrer">Pressrelease.com</a></li>
              </ul>
            </div>
            <div class="footer-column">
              <p>Resources</p>
              <ul>
                <li><a href="${B}/privacy-policy">Privacy Policy</a></li>
                <li><a href="${B}/terms-of-service">Terms of Service</a></li>
              </ul>
            </div>
            <div class="contact-block">
              <h4>Contact Us</h4>
              <p>Phone: <a href="tel:18007137278">1-(800) 713-7278</a></p>
              <p>Email: <a href="mailto:hello@pressrelease.com">Hello@pressrelease.com</a></p>
              <p>Connect</p>
              <div class="social-icons">
                <a href="https://www.linkedin.com/company/pressrelease-newswire/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">in</a>
                <a href="https://www.facebook.com/people/PressReleasecom/61580431165190/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">fb</a>
                <a href="https://www.instagram.com/pressreleasecom" target="_blank" rel="noopener noreferrer" aria-label="Instagram">ig</a>
                <a href="https://linktr.ee/Pressrelease.com" target="_blank" rel="noopener noreferrer" aria-label="Linktree">lt</a>
              </div>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <div class="logo">
            <img src="https://irp.cdn-website.com/9d35525b/dms3rep/multi/PRC_full_deep_white.svg" alt="PressRelease.com Logo">
          </div>
          <div class="legal-links">
            <a href="${B}/privacy-policy">Privacy Policy</a>
            <span>|</span>
            <a href="${B}/terms-of-service">Terms of Service</a>
            <span>|</span>
            <a href="${B}/editorial-content-guidelines">Editorial Guidelines</a>
          </div>
          <p>&copy; <span class="prc-current-year">2026</span> PressRelease.com. All rights reserved.</p>
        </div>
      </footer>
    </div>
  `;

  // ---- 4. Mount the footer -----------------------------------
  // Strategy:
  //   - On Duda: render right next to the <script> tag so it sits inside
  //     the HTML widget where the publisher placed it.
  //   - On Magento: render at the very bottom of <body> so it doesn't get
  //     trapped inside a narrow content column.
  function mountFooter() {
    var mount = document.getElementById(MOUNT_ID);

    if (!mount) {
      mount = document.createElement('div');
      mount.id = MOUNT_ID;

      if (isMagento && document.body) {
        // Magento: append to end of body
        document.body.appendChild(mount);
      } else {
        // Duda / other: render next to the <script> tag
        var scripts = document.querySelectorAll('script[src*="footer.js"]');
        var thisScript = scripts[scripts.length - 1];

        if (thisScript && thisScript.parentNode) {
          thisScript.parentNode.insertBefore(mount, thisScript.nextSibling);
        } else if (document.body) {
          document.body.appendChild(mount);
        }
      }
    }
    mount.innerHTML = footerHTML;

    // Fill in the current year
    var yearEls = mount.querySelectorAll('.prc-current-year');
    var currentYear = new Date().getFullYear();
    yearEls.forEach(function (el) { el.textContent = currentYear; });
  }

  // ---- 5. Run when DOM is ready ------------------------------
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountFooter);
  } else {
    mountFooter();
  }
})();
