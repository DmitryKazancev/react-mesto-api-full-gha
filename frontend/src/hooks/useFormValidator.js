import { useCallback, useState } from "react";

export default function useFormValidator() {
    
    const [inputValues, setInputValues] = useState({});
    const [inputErrors, setInputErrors] = useState({});
    const [isValid, setIsValid] = useState(false);
    const [isInputValid, setIsInputValid] = useState({});

    function handleChange(evt) {
        const name = evt.target.name;
        const value = evt.target.value;
        const validationMessage = evt.target.validationMessage;
        const valid = evt.target.validity.valid;
        const form = evt.target.form;

        setIsValid(form.checkValidity());

        setInputValues((lastValues) => {
            return { ...lastValues, [name]: value }
        })

        setInputErrors((lastErrors) => {
            return { ...lastErrors, [name]: validationMessage }
        })

        setIsInputValid((lastIsInputValid) => {
            return { ...lastIsInputValid, [name]: valid }
        })
    }

    function resetForm(formData = {}) {
        setInputValues(formData);
        setInputErrors({});
        setIsValid(false);
        setIsInputValid({});
    }

    const setInputValue = useCallback((name, value) => {
        setInputValues((lastValues) => {
            return { ...lastValues, [name]: value }
        })
    }, [])

    return { inputValues, inputErrors, isValid, isInputValid, handleChange, resetForm, setInputValue }
}