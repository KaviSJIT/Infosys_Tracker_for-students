document.addEventListener('DOMContentLoaded', () => {
    // Manage Password -> Blank Page
    const buttons = document.querySelectorAll('button');
    buttons.forEach(btn => {
        if (btn.textContent.trim().toLowerCase() === 'manage password') {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                window.open('about:blank', '_blank');
            });
        }
    });
});

