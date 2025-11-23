// Template for fixed authentication - use this pattern for all pages
(async function() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.replace('login.html');
        return;
    }
    try {
        const response = await fetch(`${API_CONFIG.BASE_URL}/auth/me`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) {
            localStorage.clear();
            window.location.replace('login.html');
            return;
        }
        const data = await response.json();
        const user = data.data.user;
        if (user.role !== 'EXPECTED_ROLE') {  // Replace with: user, pharmacy, delivery, admin
            alert('Access denied. EXPECTED_ROLE role required.');
            localStorage.clear();
            window.location.replace('login.html');
            return;
        }
        localStorage.setItem('userCache', JSON.stringify(user));
    } catch (e) {
        console.error('Auth error:', e);
        localStorage.clear();
        window.location.replace('login.html');
    }
})();
