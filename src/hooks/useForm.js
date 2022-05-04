import { useState, useEffect } from 'react'

export default function useForm(initialState, validate) {

    const [values, setValues] = useState(initialState)
    const [errors, setErrors] = useState({})
    const [isSubmitting, setSubmitting] = useState(false)

    useEffect(() => {
        if (isSubmitting) {
            const noErrors = Object.keys(errors).length === 0
            if (noErrors) {
                setSubmitting(false)
            } else {
                setSubmitting(false)
            }
        }

    }, [errors, isSubmitting, values, initialState])

    useEffect(() => {
        setValues(initialState)
    }, [initialState])

    const handleChange = (event) => {
        event.persist()
        setValues(
            previousValues => (
                {
                    ...previousValues,
                    [event.target.name]: event.target.value
                }
            )
        )
    }

    const handleBlur = () => {
        const validationErros = validate(values)
        setErrors(validationErros)
    }


    const handleSubmit = (onSubmit) => {
        return (e) => {
            if (e && typeof e.preventDefault === 'function') {
                e.preventDefault();
            }
            const validationErros = validate(values)
            setErrors(validationErros)
            setSubmitting(true)
            if (Object.keys(validationErros).length === 0) {
                onSubmit(values)
            }
        }
    };

    return {
        handleSubmit,
        handleBlur,
        handleChange,
        values,
        errors,
        isSubmitting
    }

}