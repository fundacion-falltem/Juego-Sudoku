document.addEventListener("DOMContentLoaded", () => {
  const aboutBtn = document.getElementById("aboutBtn");
  const modal = document.getElementById("aboutModal");

  if (!aboutBtn || !modal) return;

  const closeBtn = modal.querySelector(".modal-close");
  const confirmBtn = modal.querySelector(".modal-actions .btn");

  // =========================
  // Abrir / cerrar modal
  // =========================
  aboutBtn.addEventListener("click", () => {
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
  });

  function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  }

  closeBtn?.addEventListener("click", closeModal);
  confirmBtn?.addEventListener("click", closeModal);

  // =========================
  // SOLAPAS (TABS)
  // =========================
  const tabs = modal.querySelectorAll(".modal-tab");
  const panels = modal.querySelectorAll(".modal-panel");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const target = tab.dataset.tab;

      // activar tab
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      // mostrar panel correspondiente
      panels.forEach(panel => {
        if (panel.dataset.panel === target) {
          panel.hidden = false;
          panel.classList.add("active");
        } else {
          panel.hidden = true;
          panel.classList.remove("active");
        }
      });
    });
  });
});
