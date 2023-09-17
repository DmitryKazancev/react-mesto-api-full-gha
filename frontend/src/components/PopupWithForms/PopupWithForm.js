export default function PopupWithForm({ name, title, textButton, children, isOpen, onClose, isValid, onSubmit }) {

    return (
        <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`} >
            <div className="popup__container">
                <button
                    type="button"
                    className="popup__close popup__close-author"
                    aria-label="Закрыть всплывающее окно"
                    onClick={onClose}
                />
                <h2 className="popup__title">{title}</h2>
                <form
                    className="popup__content popup__content-author"
                    name={name}
                    noValidate=""
                    onSubmit={onSubmit}
                >
                    {children}
                    <button type="submit" className={`popup__button ${isValid ? '' : 'popup__button_invalid'}`} aria-label="Сохранить">
                        {textButton}
                    </button>
                </form>
            </div>
        </div>
    )
}