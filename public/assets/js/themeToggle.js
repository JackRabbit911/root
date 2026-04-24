document.addEventListener('DOMContentLoaded', () => {
    const themeController = document.getElementById('theme-controller')
    const currentTheme = document.documentElement.getAttribute('data-theme')

    // Устанавливаем начальное состояние чекбокса (если тема dark, то checked)
    if (themeController && currentTheme === 'dark') {
        themeController.checked = true
    }

    // Слушаем изменения
    themeController?.addEventListener('change', (e) => {
        const newTheme = e.target.checked ? 'dark' : 'light'
        document.documentElement.setAttribute('data-theme', newTheme)
        localStorage.setItem('theme', newTheme)
    });
});
