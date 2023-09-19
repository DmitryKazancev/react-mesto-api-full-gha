import { useContext } from "react"
import CurrentUserContext from "../../contexts/CurrentUserContext"

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {

    const currentUser = useContext(CurrentUserContext);
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = (
        `element__button-like ${isLiked && 'element__button-like_active'}`
    );
    const handleCardClick = () => {
        onCardClick({ name: card.name, link: card.link })
    };
    const isOwn = currentUser._id === card.owner._id;

    return (
        <article className="element">
            <img src={card.link} alt={card.name} className="element__image" onClick={handleCardClick} />
            { isOwn && <button
                type="button"
                className="element__button-trash"
                aria-label="Удалить карточку"
                onClick={() => onCardDelete(card)}
            />}
            <div className="element__description">
                <h2 className="element__title">{card.name}</h2>
                <div className="element__likes">
                    <button
                        type="button"
                        className={cardLikeButtonClassName}
                        aria-label="Поставить лайк"
                        onClick={() => onCardLike(card)}
                    />
                    <span id="likes" className="element__likes-number">
                        {card.likes.length}
                    </span>
                </div>
            </div>
        </article>
    )
}