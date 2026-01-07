document.addEventListener("DOMContentLoaded", () => {
  const aboutBtn = document.getElementById("aboutBtn");
  const modal = document.getElementById("aboutModal");
  const closeBtn = modal?.querySelector(".modal-close");
  const confirmBtn = modal?.querySelector(".modal-actions .btn");

  // Abrir modal
  aboutBtn?.addEventListener("click", () => {
    modal.setAttribute("aria-hidden", "false");
    modal.classList.add("open");
  });

  // Cerrar modal
  function closeModal() {
    modal.setAttribute("aria-hidden", "true");
    modal.classList.remove("open");
  }

  closeBtn?.addEventListener("click", closeModal);
  confirmBtn?.addEventListener("click", closeModal);

  // ==========================
  // SOLAPAS
  // ==========================
  const tabs = modal.querySelectorAll(".tab");
  const panels = modal.querySelectorAll(".tab-panel");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const target = tab.dataset.tab;

      // activar tab
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      // mostrar panel correcto
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
