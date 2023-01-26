import {useState} from 'react';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import PopupWithForm from './PopupWithForm';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupState] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupState] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupState] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  function handleCardClick(card) {
    setSelectedCard(card)
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


  return (
    <>
      <Header />
      <Main 
          onEditProfile = {handleEditProfileClick} 
          onAddPlace = {handleAddPlaceClick} 
          onEditAvatar = {handleEditAvatarClick} 
          onOpenCard = {handleCardClick} />
      <Footer />
      <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
      <PopupWithForm 
          title = 'Редактировать профиль' 
          name = 'edit-profile' 
          isOpen = {isEditProfilePopupOpen ? 'popup_opened' : ''} 
          onClose = {closeAllPopups}
          buttonText = 'Сохранить'>
        <label className="popup__field" >
          <input type="text" id="name-input" className="popup__input popup__input_field_name" 
                 name="edit-name" placeholder="Имя" required minLength="2" maxLength="40" />
          <span className="popup__input-error name-input-error"></span>
        </label>
        <label className="popup__field">
          <input type="text" id="job-input" className="popup__input popup__input_field_job" 
                 name="edit-job" placeholder="О себе" required minLength="2" maxLength="200" />
          <span className="popup__input-error job-input-error"></span>
        </label>
      </PopupWithForm>
      <PopupWithForm 
          title = 'Новое место' 
          name = 'add-place' 
          isOpen = {isAddPlacePopupOpen ? 'popup_opened' : ''} 
          onClose = {closeAllPopups}
          buttonText = 'Сохранить'>
        <label className="popup__field">
          <input type="text" id="place-input" className="popup__input popup__input_field_place-name" 
                  name="add-place" placeholder="Название" required minLength="2" maxLength="30" />
          <span className="popup__input-error place-input-error"></span>
        </label>
        <label className="popup__field">
          <input type="url" id="link-input" className="popup__input popup__input_field_image-link" 
                 name="add-link" placeholder="Ссылка на картинку" required />
          <span className="popup__input-error link-input-error"></span>
        </label>
      </PopupWithForm>
      <PopupWithForm 
          title = 'Вы уверены?' 
          name = 'delete-card'
          buttonText = 'Да'>
      </PopupWithForm>
      <PopupWithForm 
          title = 'Обновить аватар' 
          name = 'update-avatar' 
          isOpen = {isEditAvatarPopupOpen} 
          onClose = {closeAllPopups}
          buttonText = 'Сохранить'>
        <label className="popup__field">
          <input type="url" id="avatar-input" className="popup__input popup__input_field_avatar-link" 
                 name="avatar-link" placeholder="Ссылка на картинку" required />
          <span className="popup__input-error avatar-input-error"></span>
        </label>
      </PopupWithForm>
    </>
  );
}

export default App;
