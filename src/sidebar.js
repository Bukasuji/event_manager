const hamburgerBtn = document.getElementById('hamburger-btn');
        const navMenu = document.getElementById('nav-menu');
        const closeBtn = document.getElementById('close-btn');

        hamburgerBtn.addEventListener('click', () => {
            navMenu.classList.toggle('hidden');
        });

        closeBtn.addEventListener('click', () => {
            navMenu.classList.add('hidden');
        });