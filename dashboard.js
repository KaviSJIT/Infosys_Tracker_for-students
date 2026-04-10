// dashboard.js

document.addEventListener('DOMContentLoaded', () => {

    // 0. Dynamically inject necessary HTML and CSS
    injectStylesAndHTML();

    // 1. Dynamic Search Functionality
    const searchInput = document.querySelector('.search-bar input');
    const programCards = document.querySelectorAll('.program-card, .rec-card');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            
            programCards.forEach(card => {
                const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
                const tags = Array.from(card.querySelectorAll('.ptag, .rtag')).map(tag => tag.textContent.toLowerCase()).join(' ');
                
                if (title.includes(searchTerm) || tags.includes(searchTerm)) {
                    card.removeAttribute('data-filtered');
                } else {
                    card.setAttribute('data-filtered', 'true');
                }
            });
        });

        // Command + K Shortcut
        document.addEventListener('keydown', (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                searchInput.focus();
            }
        });
    }

    // 2. Auto-Updating Date
    const dateBadge = document.querySelector('.date-badge');
    if (dateBadge) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const today = new Date();
        const svgIcon = dateBadge.querySelector('svg');
        dateBadge.innerHTML = '';
        if (svgIcon) dateBadge.appendChild(svgIcon);
        dateBadge.appendChild(document.createTextNode(' ' + today.toLocaleDateString('en-US', options)));
    }

    // 3. Profile Dropdown Toggle
    const profileBox = document.querySelector('.header-profile-box');
    const profileDropdown = document.getElementById('profileDropdown');

    if (profileBox && profileDropdown) {
        profileBox.addEventListener('click', (e) => {
            if(e.target.closest('.profile-dropdown')) return;
            profileDropdown.classList.toggle('show');
            e.stopPropagation();
        });

        document.addEventListener('click', (e) => {
            if (!profileBox.contains(e.target)) {
                profileDropdown.classList.remove('show');
            }
        });
    }

    // 4. "Enroll Now" Interactivity
    const enrollButtons = document.querySelectorAll('.rec-action');
    const enrolledStatCard = document.querySelector('.stat-card .stat-value');

    enrollButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const card = this.closest('.rec-card');
            const courseTitle = card.querySelector('h3').textContent;

            // Show Toast
            showToast(`Successfully enrolled in ${courseTitle}!`);

            // Update Stat
            if (enrolledStatCard) {
                let currentVal = parseInt(enrolledStatCard.textContent) || 0;
                enrolledStatCard.textContent = currentVal + 1;
                
                enrolledStatCard.style.transform = 'scale(1.2)';
                enrolledStatCard.style.color = '#a855f7';
                enrolledStatCard.style.transition = 'all 0.3s ease';
                setTimeout(() => {
                    enrolledStatCard.style.transform = 'scale(1)';
                    enrolledStatCard.style.color = 'white';
                }, 300);
            }

            // Animate card out and remove
            card.style.height = card.offsetHeight + 'px';
            setTimeout(() => {
                card.classList.add('animating-out');
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }, 100);
        });
    });

    function showToast(message) {
        const container = document.getElementById('toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `
            <div class="toast-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
            <div class="toast-message">${message}</div>
        `;

        container.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('hiding');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3000);
    }

    // 5. Progress Bar Initial Animation
    const progressFills = document.querySelectorAll('.progress-bar-fill');
    progressFills.forEach(fill => {
        const targetWidth = fill.style.width;
        fill.style.width = '0%';
        fill.classList.add('no-transition');
        
        void fill.offsetWidth; // trigger reflow
        
        fill.classList.remove('no-transition');
        setTimeout(() => {
            fill.style.width = targetWidth;
        }, 300);
    });

    // 6. Continue Learning -> Blank Page
    const continueButtons = Array.from(document.querySelectorAll('.btn-action')).filter(btn => 
        btn.textContent.toLowerCase().includes('continue learning') || 
        btn.textContent.toLowerCase().includes('continue internship') ||
        btn.textContent.toLowerCase().includes('review certificate')
    );
    
    continueButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            window.open('about:blank', '_blank');
        });
    });

});

// Helper function to inject HTML / CSS directly without modifying static index
function injectStylesAndHTML() {
    // Inject CSS styles
    const style = document.createElement('style');
    style.textContent = `
        /* Dynamic Styles Injected via JS */
        [data-filtered="true"] { display: none !important; }
        .program-card, .rec-card { transition: all 0.3s ease-in-out; }
        .rec-card.animating-out { opacity: 0; transform: scale(0.9); }
        .progress-bar-fill { transition: width 1s ease-out; }
        
        .header-profile-box { position: relative; cursor: pointer; }
        .profile-dropdown {
            position: absolute; top: calc(100% + 10px); right: 0;
            background: #0a1128; border: 1px solid rgba(255,255,255,0.1);
            border-radius: 12px; padding: 0.5rem; min-width: 200px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
            opacity: 0; visibility: hidden; transform: translateY(-10px);
            transition: all 0.2s ease; z-index: 100;
        }
        .profile-dropdown.show { opacity: 1; visibility: visible; transform: translateY(0); }
        .dropdown-item {
            display: flex; align-items: center; gap: 0.8rem;
            padding: 0.8rem 1rem; color: #cbd5e1; text-decoration: none;
            border-radius: 8px; font-size: 0.9rem; transition: background 0.2s, color 0.2s;
        }
        .dropdown-item:hover { background: rgba(255,255,255,0.05); color: white; }
        .dropdown-item svg { color: #64748b; transition: color 0.2s; width:16px; height:16px; }
        .dropdown-item:hover svg { color: white; }
        .dropdown-item.text-red { color: #f87171; }
        .dropdown-item.text-red svg { color: #f87171; }
        .dropdown-item.text-red:hover { background: rgba(248, 113, 113, 0.1); }
        .dropdown-divider { height: 1px; background: rgba(255,255,255,0.1); margin: 0.5rem 0; }
        
        .toast-container {
            position: fixed; bottom: 2rem; right: 2rem; display: flex;
            flex-direction: column; gap: 1rem; z-index: 1000;
        }
        .toast {
            background: #1e293b; border-left: 4px solid #a855f7; color: white;
            padding: 1rem 1.5rem; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.3);
            display: flex; align-items: center; gap: 1rem; min-width: 300px;
            animation: toastSlideIn 0.3s ease forwards;
        }
        .toast.hiding { animation: toastSlideOut 0.3s ease forwards; }
        .toast-icon {
            width: 24px; height: 24px; border-radius: 50%; background: #a855f7;
            display: flex; justify-content: center; align-items: center;
        }
        .toast-icon svg { width: 14px; height: 14px; color: white; }
        
        @keyframes toastSlideIn {
            from { transform: translateX(120%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes toastSlideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(120%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    // Inject Toast Container
    const toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);

    // Inject Profile Dropdown
    const profileBox = document.querySelector('.header-profile-box');
    if (profileBox) {
        const dropdown = document.createElement('div');
        dropdown.className = 'profile-dropdown';
        dropdown.id = 'profileDropdown';
        dropdown.innerHTML = `
            <a href="#" class="dropdown-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                My Profile
            </a>
            <a href="student_settings.html" class="dropdown-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                Settings
            </a>
            <div class="dropdown-divider"></div>
            <a href="login.html" class="dropdown-item text-red">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                Logout
            </a>
        `;
        profileBox.appendChild(dropdown);
    }
}
