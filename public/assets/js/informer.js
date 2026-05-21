const fetchOnTimeOut = async (url, interval = 5000) => {
    if (!document.getElementById("username")) {
        return;
    }

    try {
        const response = await fetch(url)

        if (!response.ok) {
            throw new Error(`ERROR: ${response.status}`);
        }

        const data = await response.json()

        if (data.badge > 0) {
            if (document.getElementById("msgCountBadge")) {
                document.getElementById("msgCountBadge").innerText = '+' + data.badge
            } else {
                const indicator = document.createElement('span')
                indicator.className = "indicator-item badge badge-xs badge-success"
                indicator.setAttribute('id', 'msgCountBadge')
                indicator.textContent = '+' + data.badge
                document.getElementById("user_avatar").before(indicator)
            }
        }

    setTimeout(fetchOnTimeOut, interval, url, interval);
    } catch (err) {
        if (err.name === 'TimeoutError') {
            console.error('Request timed out');
        } else {
            console.error('Other error:', err);
        }
    }
}

fetchOnTimeOut('/api/informer', 5000)
