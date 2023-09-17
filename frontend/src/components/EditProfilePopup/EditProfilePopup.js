import { useContext, useEffect } from "react";
import useFormValidator from "../../hooks/useFormValidator";
import PopupWithForm from "../PopupWithForms/PopupWithForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {

  const currentUser = useContext(CurrentUserContext);
  const { inputValues, inputErrors, isValid, isInputValid, handleChange, resetForm, setInputValue } = useFormValidator();
  
  useEffect(() => {
    setInputValue("nameInput", currentUser.name);
    setInputValue("jobInput", currentUser.about);
  }, [currentUser, setInputValue])

  function closePopup() {
    onClose();
    resetForm({ nameInput: currentUser.name, jobInput: currentUser.about })
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({ nameInput: inputValues.nameInput, jobInput: inputValues.jobInput }, resetForm);
  }

  return (
    <PopupWithForm name='edit-author' title='Редактировать профиль' textButton='Сохранить' isOpen={isOpen} onClose={closePopup} isValid={isValid} onSubmit={handleSubmit}>
      <input
        id="name-author"
        type="text"
        placeholder="Имя автора"
        className={`popup__input popup__input_type_name ${isInputValid.nameInput === undefined || isInputValid.nameInput ? '' : 'popup__input_type_error'}`}
        name="nameInput"
        minLength={2}
        maxLength={40}
        required=""
        value={inputValues.nameInput ? inputValues.nameInput : ''}
        onChange={handleChange}
      />
      <span
        id="name-author-error"
        className="popup__error popup__error_field_first">{inputErrors.nameInput}</span>

      <input
        id="about-author"
        type="text"
        placeholder="Об авторе"
        className={`popup__input popup__input_type_job ${isInputValid.jobInput === undefined || isInputValid.jobInput ? '' : 'popup__input_type_error'}`}
        name="jobInput"
        minLength={2}
        maxLength={200}
        required=""
        value={inputValues.jobInput ? inputValues.jobInput : ''}
        onChange={handleChange}
      />
      <span
        id="about-author-error"
        className="popup__error popup__error_field_second">{inputErrors.jobInput}</span>
    </PopupWithForm>
  )
}