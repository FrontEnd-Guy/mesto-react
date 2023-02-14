import {useState, useEffect} from 'react';
import '../index.css';
import { api } from "../utils/API";
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import { EditProfilePopup } from './EditProfilePopup';
import { EditAvatarPopup } from './EditAvatarPopup';
import { AddPlacePopup } from './AddPlacePopup';
import { PopupWithForm } from './PopupWithForm';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isEditProfilePopupOpen, setEditProfilePopupState] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupState] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupState] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([])
  const [isLoading, setIsLoading] = useState(false);


  useEffect(()=>{
    api.getUserInfo()
      .then((data) => setCurrentUser(data))
      .catch((err) => console.log(err))
  }, []);

  useEffect(()=>{
    api.getCardsList()
        .then((cards) => setCards(cards))
        .catch((err) => console.log(err))
  }, []);  

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) => console.log(err))
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)    
        .then(() => {
          setCards((state) => state.filter((c) => c._id != card._id));
        })
        .catch((err) => console.log(err))
  }

  function handleEditAvatarClick(){
    setEditAvatarPopupState(true)
  }

  function handleEditProfileClick(){
    setEditProfilePopupState(true)
  }

  function handleAddPlaceClick(){
    setAddPlacePopupState(true)
  }

  function closeAllPopups(){
    setEditAvatarPopupState(false)
    setAddPlacePopupState(false)
    setEditProfilePopupState(false)
    setSelectedCard(null)
  }

  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard

  useEffect(() => {
    function closeByEscape(evt) {
      if(evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if(isOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen]) 

  function handleUpdateUser(data){
    setIsLoading(true);
    api.editUserInfo(data)
      .then((updatedUserInfo) =>{
        setCurrentUser(updatedUserInfo);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(()=>setIsLoading(false))
  }

  function handleUpdateAvatar(data) {
    setIsLoading(true);
    api.updateAvatar(data)
      .then((updatedAvater) =>{
        setCurrentUser(updatedAvater);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(()=>setIsLoading(false))
  }

  function handleAddPlaceSubmit(data) {
    setIsLoading(true);
    api.createCard(data)
      .then((newCard) =>{
        setCards([newCard, ...cards]);
        closeAllPopups()
      })
      .catch((err) => console.log(err))
      .finally(()=>setIsLoading(false))
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header />
      <Main 
          cards = {cards}
          onCardLike = {handleCardLike}
          onCardDelete = {handleCardDelete}
          onCardClick = {handleCardClick}
          onEditProfile = {handleEditProfileClick} 
          onAddPlace = {handleAddPlaceClick} 
          onEditAvatar = {handleEditAvatarClick}/>
      <Footer />
      <ImagePopup 
          card={selectedCard} 
          onClose={closeAllPopups}/>
      <EditProfilePopup 
          isOpen={isEditProfilePopupOpen} 
          onClose={closeAllPopups} 
          onUpdateUser={handleUpdateUser}
          buttonText={isLoading? 'Сохранение...' : 'Сохранить'}/> 
      <AddPlacePopup 
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          buttonText={isLoading? 'Сохранение...' : 'Сохранить'}/> 
      <PopupWithForm 
          title = 'Вы уверены?' 
          name = 'delete-card'
          buttonText = 'Да' />
      <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen} 
          onClose={closeAllPopups} 
          onUpdateAvatar={handleUpdateAvatar}
          buttonText={isLoading? 'Сохранение...' : 'Сохранить'}/>  
    </CurrentUserContext.Provider>
  );
}

export default App;
