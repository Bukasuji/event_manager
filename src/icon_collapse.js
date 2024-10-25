   function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const logo = document.getElementById('logo');
    
    sidebar.classList.toggle('w-16');
    sidebar.classList.toggle('w-64');

    // Toggle hidden text
    const spans = sidebar.querySelectorAll('span');
    spans.forEach(span => {
      if (span.classList.contains('hidden')) {
        span.classList.remove('hidden');
        span.classList.add('sm:block');
      } else {
        span.classList.add('hidden');
        span.classList.remove('sm:block');
      }
    });

    // Toggle logo size
    if (logo.textContent === "LOg") {
        logo.textContent = "LOg";
      } else {
        logo.textContent = "LOg";
      }
  }