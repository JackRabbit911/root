(function () {
    const savedTheme = localStorage.getItem('theme')
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    const theme = savedTheme || systemTheme

    localStorage.setItem('theme', theme)
    document.documentElement.setAttribute('data-theme', theme)
})()
