import { formHandler } from "./modules/form.js"

const errorHandler = (form, error) => {
    const errorArray = Object.entries(error).filter(([key, value]) => value.status === 'error')
    errorArray.forEach((value => {
        const input = form.elements[value[0]]
        input.value = null
        input.placeholder = value[1].msg
        input.classList.add('placeholder:text-error')
    }))
}

formHandler({ errorHandler })
