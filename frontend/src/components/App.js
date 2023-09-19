import Header from "./Header/Header.js";
import Footer from "./Footer/Footer.js";
import PopupWithForm from "./PopupWithForms/PopupWithForm.js";
import ImagePopup from "./ImagePopup/ImagePopup.js";
import { useState, useEffect } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import api from "../utils/api.js";
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup/EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup/AddPlacePopup.js";
import ProtectedRouteElement from "./ProtectedRoute/ProtectedRoute.js";
import HomePage from "./HomePage/HomePage.js";
import Login from "./Login/Login.js";
import Register from "./Register/Register.js";
import InfoTooltip from "./InfoTooltip/InfoTooltip.js";
import * as auth from "../utils/auth";
import successIcon from "../images/icon-success.svg";
import errorIcon from "../images/icon-error.svg";

function App() {

  const navigate = useNavigate(); 
  //States
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isSuccessInfoTooltipStatus, setIsSuccessInfoTooltipStatus] = useState(false);
  const [email, setEmail] = useState("");
  const [tooltipMessage, setTooltipMessage] = useState("");
  const [tooltipIcon, setTooltipIcon] = useState("");


  //Click to avatar button function
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  //Click to edit profile button function
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  //Click to card add button function
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  //Close all popup windows function
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
    setSelectedCard({});
  }

  //Click to image and open popup with image function
  function handleCardClick(card) {
    setSelectedCard(card);
  }
  
  //Delete card function
  function handleCardDelete(card) {
    const currentCard = card;
    api.deleteCard(currentCard._id, localStorage.token)
      .then(() => {
        setCards(prevCards => prevCards.filter(card => {
          // return card._id !== currentCard._id
          return card !== currentCard._id
        }))
      })
      .catch(error => {
        console.error(`Ошибка удаления карточки ${error}`)
      })
  }

  //Set or delete like to card function
  function handleCardLike(card) {
    // const isLiked = card.likes.some(i => i._id === currentUser._id);
    const isLiked = card.likes.some(i => i._id === currentUser);
    if (isLiked) {
      api.deleteLike(card._id, localStorage.token)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch(error => {
          console.error(`Ошибка удаления лайка ${error}`)
        })
    }
    else {
      api.addLike(card._id, localStorage.token)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch(error => {
          console.error(`Ошибка установки лайка ${error}`)
        })
    }
  }

  //Update info about user function
  function handleUpdateUser(infoUser, resetForm) {
    api.setOwnerInfo(infoUser, localStorage.token)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
        resetForm();
      })
      .catch(error => {
        console.error(`Ошибка редактирования профиля ${error}`)
      })
  }

  //Update user avatar function
  function handleUpdateAvatar(infoUser, resetForm) {
    api.setOwnerAvatar(infoUser, localStorage.token)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
        resetForm();
      })
      .catch(error => {
        console.error(`Ошибка редактирования аватара ${error}`)
      })
  }

  //Add new card function
  function handleAddPlaceSubmit(infoCard, resetForm) {
    api.addNewCard(infoCard, localStorage.token)
      .then(res => {
        setCards([res, ...cards]);
        closeAllPopups();
        resetForm();
      })
      .catch(error => {
        console.error(`Ошибка добавления карточки ${error}`)
      })
  }

  //User registration function
  const handleRegister = (formValue) => {
    auth
      .register(formValue.password, formValue.email)
      .then(() => {
        setIsSuccessInfoTooltipStatus(true);
        setTooltipIcon(successIcon);
        setTooltipMessage('Вы успешно зарегистрировались!');
        navigate("/sign-in");
      })
      .catch((err) => {
        setIsSuccessInfoTooltipStatus(false);
        setTooltipIcon(errorIcon);
        setTooltipMessage('Что-то пошло не так! Попробуйте ещё раз.');
        console.log(err);
      })
      .finally(() => {
        setIsInfoTooltipPopupOpen(true);
      })
  };

  //User login function
  const handleLogin = (formValue) => {
    auth
      .authorize(formValue.password, formValue.email)
      .then((res) => {
        setLoggedIn(true);
        setEmail(formValue.email);
        localStorage.setItem("token", res.token);
        navigate("/");
      })
      .catch((err) => {
        setIsSuccessInfoTooltipStatus(false);
        setIsInfoTooltipPopupOpen(true);
      });
  };

  //User logout function
  function handleSignOut() {
    localStorage.removeItem("token");
    setLoggedIn(false);
    navigate("/sign-in", { replace: true });
  }

  //Get info about user and cards from server
  useEffect(() => {
    loggedIn &&
    Promise.all([api.getUserInfo(localStorage.token), api.getCards(localStorage.token)])
      .then(([infoUser, infoCards]) => {
        setCurrentUser(infoUser);
        setCards(infoCards);
      })
      .catch(error => {
        console.error(`Ошибка запроса данных с сервера ${error}`)
      })
  }, [loggedIn])

  //Check user token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            navigate("/");
            console.log(res);
            // setEmail(res.data.email);
          }
        })
        .catch((err) => console.log(err));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
      <Header email={email} handleSignOut={handleSignOut} />
      <Routes>
          <Route path="/" element={<ProtectedRouteElement 
                                      element={HomePage} 
                                      onEditProfile={handleEditProfileClick} 
                                      onAddPlace={handleAddPlaceClick} 
                                      onEditAvatar={handleEditAvatarClick} 
                                      onCardClick={handleCardClick} 
                                      cards={cards} 
                                      onCardLike={handleCardLike} 
                                      onCardDelete={handleCardDelete} 
                                      loggedIn={loggedIn} 
                                      />
          } />
          <Route path="/sign-in" element={
            <Login  handleLogin={handleLogin} />
          } />
          <Route path="/sign-up" element={
             <Register  handleRegistration={handleRegister} />
          } />
          <Route path="*" element={loggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />
            }/>
      </Routes>
       {/*Section FOOTER  */}
        <Footer />
        {/*Popups sections  */}
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <PopupWithForm name='delete-card' />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <InfoTooltip  isOpen={isInfoTooltipPopupOpen} 
                      onClose={closeAllPopups} 
                      isSuccessInfoTooltipStatus={isSuccessInfoTooltipStatus}
                      tooltipMessage={tooltipMessage}
                      tooltipIcon={tooltipIcon}
                      />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
