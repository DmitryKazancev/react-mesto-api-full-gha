import Card from "../Card/Card.js";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

export default function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike, onCardDelete }) {

    const currentUser = useContext(CurrentUserContext);

    return (
        <main className="content">
            {/*Section PROFILE*/}
            <section className="profile" aria-label="Профиль автора">
                <div className="profile__description">
                    <button
                        type="button"
                        className="profile__button-avatar"
                        aria-label="Изменить автар автора"
                        onClick={onEditAvatar}>
                        <img src={currentUser.avatar} alt="Аватар профиля" className="profile__avatar" />
                    </button>
                    <div className="profile__info">
                        <div className="profile__info-list">
                            <h1 className="profile__info-author" >{currentUser.name}</h1>
                            <button
                                type="button"
                                className="profile__button-edit"
                                aria-label="Редактировать профиль"
                                onClick={onEditProfile}
                            />
                        </div>
                        <p className="profile__info-description">{currentUser.about}</p>
                    </div>
                </div>
                <button
                    type="button"
                    className="profile__button-add"
                    aria-label="Добавить публикацию"
                    onClick={onAddPlace}
                />
            </section>
            {/*Section ELEMENTS*/}
            <section className="elements" aria-label="Карточки с местами">
                {cards.map(data => {
                    return (
                        <li key={data._id} >
                            <Card card={data} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} />
                        </li>
                    )
                })}
            </section>
        </main>
    )
}