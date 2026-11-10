document.addEventListener("click", (event) => {
  document.querySelectorAll("details[open]").forEach((item) => {
    if (!item.contains(event.target)) item.removeAttribute("open");
  });
});

document.querySelectorAll(".sidebar-toggle").forEach((button) => {
  button.addEventListener("click", () => {
    const shell = button.closest(".app-shell");
    shell.classList.toggle("sidebar-collapsed");
  });
});

// Panel toggle logic
document.querySelectorAll('tbody tr').forEach(row => {
  row.addEventListener('click', (e) => {
    // Avoid triggering if a checkbox or button was clicked directly
    if (e.target.tagName.toLowerCase() === 'input' && e.target.type === 'checkbox') return;
    if (e.target.tagName.toLowerCase() === 'button') {
      // If it's the "Review" or "Submit" button, we still want to open the panel
      if (!e.target.classList.contains('review') && !e.target.classList.contains('submit')) {
        return;
      }
    }
    
    const panel = document.querySelector('.review-panel');
    if (panel) {
      panel.style.display = 'flex';
      const pageContent = document.querySelector('.page-content');
      if (pageContent) {
        pageContent.classList.add('panel-open');
        if (panel.classList.contains('wide-panel')) {
          pageContent.classList.add('wide-panel-open');
        }
      }
      // Remove selected class from all rows
      document.querySelectorAll('tbody tr').forEach(r => r.classList.remove('selected-row'));
      row.classList.add('selected-row');
      
      // Optional: Update the ID badge in the panel header based on the row ID
      const idCell = row.querySelector('td:nth-child(1), td:nth-child(2)'); // Handles both queue and validation tables
      const headerBadge = panel.querySelector('.id-badge');
      if (idCell && headerBadge) {
        // If the first cell has an input (checkbox), use the second cell text for ID
        let idText = idCell.textContent.trim();
        if (row.querySelector('td:first-child input[type="checkbox"]')) {
           idText = row.querySelector('td:nth-child(2)').textContent.trim();
        }
        if(idText) {
          headerBadge.textContent = idText;
        }
      }
    }
  });
});

function closeReviewPanel(panel) {
  if (!panel) return;
  panel.style.display = 'none';
  const pageContent = document.querySelector('.page-content');
  if (pageContent) {
    pageContent.classList.remove('panel-open', 'wide-panel-open');
  }
  document.querySelectorAll('tbody tr').forEach(r => r.classList.remove('selected-row'));
}

document.querySelectorAll('.review-panel-header').forEach(header => {
  header.querySelectorAll('button').forEach(btn => {
    // Prev/next nav must not dismiss the panel
    if (btn.closest('.nav-buttons')) return;
    btn.addEventListener('click', () => closeReviewPanel(header.closest('.review-panel')));
  });
});
