import { formHandler } from "./modules/form.js"

const errorHandler = (form, error) => {
    error.forEach((item) => {
        const input = form.elements[item.key]
        input.value = null
        input.placeholder = item.msg
        input.classList.add('placeholder:text-error')
    })
}

formHandler({ errorHandler })
