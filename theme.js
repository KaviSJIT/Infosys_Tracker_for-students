// ==========================================
// THEME MANAGEMENT (Dark / Light)
// ==========================================

const Theme = {
    init: () => {
        const savedTheme = localStorage.getItem('appTheme') || 'dark';
        if (savedTheme === 'light') {
            document.body.classList.add('light-mode');
        }
        Theme.injectToggleButton();
    },

    toggle: () => {
        if (document.body.classList.contains('light-mode')) {
            document.body.classList.remove('light-mode');
            localStorage.setItem('appTheme', 'dark');
        } else {
            document.body.classList.add('light-mode');
            localStorage.setItem('appTheme', 'light');
        }
    },

    injectToggleButton: () => {
        const topbarRight = document.querySelector('.topbar-right');
        if (topbarRight) {
            const toggleWrapper = document.createElement('div');
            toggleWrapper.className = 'top-icon theme-toggle-btn';
            toggleWrapper.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="moon-icon" style="display: none;">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="sun-icon">
                    <circle cx="12" cy="12" r="5"></circle>
                    <line x1="12" y1="1" x2="12" y2="3"></line>
                    <line x1="12" y1="21" x2="12" y2="23"></line>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                    <line x1="1" y1="12" x2="3" y2="12"></line>
                    <line x1="21" y1="12" x2="23" y2="12"></line>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
            `;
            
            toggleWrapper.style.cursor = 'pointer';
            
            // Insert before the profile pill
            topbarRight.insertBefore(toggleWrapper, topbarRight.lastElementChild);
            
            // Event listener
            toggleWrapper.addEventListener('click', () => {
                Theme.toggle();
                Theme.updateIcon();
            });
            
            Theme.updateIcon();
        }
    },

    updateIcon: () => {
        const btn = document.querySelector('.theme-toggle-btn');
        if (btn) {
            const isLight = document.body.classList.contains('light-mode');
            btn.querySelector('.moon-icon').style.display = isLight ? 'block' : 'none';
            btn.querySelector('.sun-icon').style.display = isLight ? 'none' : 'block';
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // Check if on login page or dashboard
    if (document.querySelector('.topbar-right')) {
        Theme.init();
    } else {
        // If no topbar (e.g. login page), just apply class without injecting button
        const savedTheme = localStorage.getItem('appTheme') || 'dark';
        if (savedTheme === 'light') {
            document.body.classList.add('light-mode');
        }
    }
});
