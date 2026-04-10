// ==========================================
// AUTHENTICATION & SESSION MANAGEMENT
// ==========================================

const Auth = {
    login: (email, password) => {
        const users = DB.getUsers();
        // Simple mock check
        const user = users.find(u => (u.email === email && u.password === password) || (email.includes(u.role.toLowerCase())));
        if (user) {
            localStorage.setItem('sessionUser', JSON.stringify(user));
            return user;
        }
        return null;
    },

    loginByRole: (role) => {
        const users = DB.getUsers();
        const user = users.find(u => u.role.toLowerCase() === role.toLowerCase());
        if (user) {
            localStorage.setItem('sessionUser', JSON.stringify(user));
            return user;
        }
        return null;
    },

    logout: () => {
        localStorage.removeItem('sessionUser');
        window.location.href = 'login.html';
    },

    getUser: () => {
        const data = localStorage.getItem('sessionUser');
        return data ? JSON.parse(data) : null;
    },

    requireAuth: (allowedRoles = null) => {
        const user = Auth.getUser();
        if (!user) {
            window.location.href = 'login.html';
            return;
        }
        if (allowedRoles && !allowedRoles.includes(user.role)) {
            // Strict precise redirection
            if (user.role === 'Admin') window.location.href = 'admin_dashboard.html';
            else if (user.role === 'Faculty') window.location.href = 'faculty_dashboard.html';
            else window.location.href = 'student_dashboard.html';
        }
        return user;
    },

    updateUI: () => {
        const user = Auth.getUser();
        if (!user) return;

        // Update profile pills/avatars
        const profileInitials = document.querySelectorAll('.profile-pill, .avatar');
        profileInitials.forEach(el => {
            el.textContent = user.initial;
            if (user.role === 'Admin') {
                el.style.background = '#ef4444';
            } else if (user.role === 'Faculty') {
                el.style.background = '#f59e0b';
            }
        });

        // Update profile text (Top header)
        const nameHeaders = document.querySelectorAll('.header-profile-text h4');
        nameHeaders.forEach(el => el.textContent = user.name);

        const roleHeaders = document.querySelectorAll('.header-profile-text p');
        roleHeaders.forEach(el => el.textContent = user.role);

        // Update sidebar role badge
        const badge = document.querySelector('.role-badge');
        if (badge) {
            badge.textContent = `Role: ${user.role}`;
            if (user.role === 'Admin') {
                badge.style.color = '#ef4444';
                badge.style.background = 'rgba(239, 68, 68, 0.1)';
                badge.style.borderColor = 'rgba(239, 68, 68, 0.2)';
            } else if (user.role === 'Faculty') {
                badge.style.color = '#f59e0b';
                badge.style.background = 'rgba(245, 158, 11, 0.1)';
                badge.style.borderColor = 'rgba(245, 158, 11, 0.2)';
            }
        }

        // Conditionally show/hide navigation
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu) {
            // Code dynamically hiding links has been intentionally removed
            // since each role now has rigidly separated html shells.
        }
        
        // Hide/Show role specific elements via classes
        document.body.classList.add(`role-${user.role.toLowerCase()}`);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // Attach logout generic
    const logoutBtns = document.querySelectorAll('.logout');
    logoutBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            Auth.logout();
        });
    });
});
