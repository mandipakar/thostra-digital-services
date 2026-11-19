
/* ==========================================
   THOSTRA ADVERTISING DISPLAY ENGINE
   ========================================== */

document.addEventListener("DOMContentLoaded", () => {
  if (typeof thostraAds === "undefined") {
    console.error("THOSTRA: Advertising configuration not loaded.");
    return;
  }

  const today = new Date();

const todayDate = [
  today.getFullYear(),
  String(today.getMonth() + 1).padStart(2, "0"),
  String(today.getDate()).padStart(2, "0")
].join("-");

  const activeAds = thostraAds
    .filter(ad =>
      ad.active &&
      ad.startDate <= todayDate &&
      ad.endDate >= todayDate
    )
    .sort((a, b) => b.priority - a.priority);

  if (!activeAds.length) return;

  /* Create promotional banner */
  const banner = document.createElement("section");
  banner.className = "thostra-ad-banner";
  banner.setAttribute("aria-label", "THOSTRA promotions");

  const header = document.querySelector("header");

  if (header) {
    header.insertAdjacentElement("afterend", banner);
  }

  const bannerAds = activeAds.filter(ad =>
    ad.display.includes("banner")
  );

  let bannerIndex = 0;

  function showBanner() {
    if (!bannerAds.length) return;

    const ad = bannerAds[bannerIndex];

    banner.innerHTML = `
      <div class="thostra-ad-content">
       <img class="thostra-ad-image"
     src="${ad.image}"
     alt="${ad.title}"> 
      <span class="thostra-ad-label">FEATURED PROMOTION</span>
        <div class="thostra-ad-copy">
          <strong>${ad.title}</strong>
          <p>${ad.description}</p>
        </div>
        <a class="thostra-ad-button"
           href="${ad.link}"
           target="_blank"
           rel="noopener">
          ${ad.buttonText}
        </a>
        <span class="thostra-ad-position">
          ${bannerIndex + 1} / ${bannerAds.length}
        </span>
        
      </div>
    `;
  }

  showBanner();

  if (bannerAds.length > 1) {
    setInterval(() => {
      bannerIndex = (bannerIndex + 1) % bannerAds.length;
      showBanner();
    }, 8000);
  }

  /* Create promotional pop-up */
  const popupAds = activeAds.filter(ad =>
    ad.display.includes("popup")
  );

  const popupAlreadyShown =
    sessionStorage.getItem("thostraPopupShown");

  if (popupAds.length && !popupAlreadyShown) {
    const popupAd = popupAds[0];

    const popup = document.createElement("div");
    popup.className = "thostra-ad-overlay";

    popup.innerHTML = `
      <div class="thostra-ad-popup" role="dialog"
           aria-modal="true"
           aria-labelledby="thostra-popup-title">

        <button class="thostra-ad-close"
                aria-label="Close advertisement">
          &times;
        </button>

        <span class="thostra-ad-label">
          SPECIAL PROMOTION
        </span>
        <img class="thostra-popup-image"
     src="${popupAd.image}"
     alt="${popupAd.title}">

        <h2 id="thostra-popup-title">
          ${popupAd.title}
        </h2>

        <p>${popupAd.description}</p>

        <a class="thostra-ad-button"
           href="${popupAd.link}"
           target="_blank"
           rel="noopener">
          ${popupAd.buttonText}
        </a>

        <small>THOSTRA — Let There Be Light.</small>
      </div>
    `;

    document.body.appendChild(popup);

    popup.querySelector(".thostra-ad-close")
      .addEventListener("click", () => {
        popup.remove();
        sessionStorage.setItem("thostraPopupShown", "yes");
      });

    sessionStorage.setItem("thostraPopupShown", "yes");
  }
});
