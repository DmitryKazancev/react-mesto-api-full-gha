import useFormValidator from "../../hooks/useFormValidator";
import PopupWithForm from "../PopupWithForms/PopupWithForm";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {

  const { inputValues, inputErrors, isValid, isInputValid, handleChange, resetForm } = useFormValidator();

  function closePopup() {
    onClose();
    resetForm()
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({ cardName: inputValues.cardName, link: inputValues.link }, resetForm);
  }

  return (
    <PopupWithForm name='add-card' title='Новое место' textButton='Создать' isOpen={isOpen} onClose={closePopup} isValid={isValid} onSubmit={handleSubmit}>
      <input
        id="name-card"
        type="text"
        placeholder="Название"
        className={`popup__input popup__input_card_name ${isInputValid.cardName === undefined || isInputValid.cardName ? '' : 'popup__input_type_error'}`}
        name="cardName"
        minLength={2}
        maxLength={20}
        required
        value={inputValues.cardName ? inputValues.cardName : ''}
        onChange={handleChange}
      />
      <span
        id="name-card-error"
        className="popup__error popup__error_field_first"
      >{inputErrors.cardName}</span>
      <input
        id="link-card"
        type="url"
        placeholder="Ссылка на картинку"
        className={`popup__input popup__input_card_url ${isInputValid.link === undefined || isInputValid.link ? '' : 'popup__input_type_error'}`}
        name="link"
        required
        value={inputValues.link ? inputValues.link : ''}
        onChange={handleChange}
      />
      <span
        id="link-card-error"
        className="popup__error popup__error_field_second"
      >{inputErrors.link}</span>
    </PopupWithForm>
  )
}