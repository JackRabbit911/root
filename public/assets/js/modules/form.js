export const formHandler = ({ errorHandler }) => {
    const forms = Array.from(document.forms)

    for (let i = 0; i < forms.length; i++) {
        const form = forms[i]

        form.addEventListener('submit', async function (event) {
            event.preventDefault()
            const formData = new FormData(form)
            const method = form.elements._method?.value || form.method

            try {
                const response = method === 'get' ?
                    await fetchGet(form) :
                    await fetchPost(form, method)

                if (response.ok) {
                    const contentType = response.headers.get("content-type")
                    if (!contentType || !contentType.includes("application/json")) {
                        throw new TypeError("Oops, we didn't get JSON back from the server!")
                    }

                    const data = await response.json();

                    if (data.success && data.result) {
                        for (const [key, value] of Object.entries(data.result)) {
                            const elem = document.getElementById(key)

                            if (elem) {
                                elem.insertAdjacentHTML('afterend', value)
                                elem.remove()
                            }
                        }
                    } else if (data.error) {
                        errorHandler(form, data.error)
                    }
                } else if (response.status >= 400 && response.status < 500) {
                    const data = await response.json();
                    errorHandler(form, data.error)
                }
            } catch (error) {
                console.error('Ошибка при запросе:', error)
            }
        })
    }

    async function fetchGet(form) {
        const formData = new FormData(form)
        const searchParams = new URLSearchParams(formData)
        const url = new URL(form.action)
        url.search = searchParams

        window.history.replaceState({}, '', url);

        return await fetch(url.toString(), {
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
            }
        })
    }

    async function fetchPost(form, method) {
        const formData = new FormData(form)
        const url = form.action

        return await fetch(url, {
            method: method,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
            },
            body: formData,
        })
    }
}
