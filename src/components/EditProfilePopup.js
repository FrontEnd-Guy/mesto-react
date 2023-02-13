import { useState, useContext, useEffect } from "react";
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import {PopupWithForm} from "./PopupWithForm";

export function EditProfilePopup({isOpen, onClose, onUpdateUser}){
    const currentUser = useContext(CurrentUserContext);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        setName(currentUser?.name);
        setDescription(currentUser?.about);
      }, [currentUser]); 

    function handleNameChange(e){
        setName(e.target.value);
    };

    function handleDescriptionChange(e){
        setDescription(e.target.value);
    };

    function handleSubmit(e){
        e.preventDefault();
        onUpdateUser({
          name: name,
          about: description,
        });
    };

    return(
        <PopupWithForm 
          title = 'Редактировать профиль' 
          name = 'edit-profile' 
          isOpen = {isOpen} 
          onClose = {onClose}
          onSubmit = {handleSubmit}
          buttonText = 'Сохранить'>
            <label className="popup__field" >
                <input type="text" value={name || ''} id="name-input" className="popup__input popup__input_field_name" 
                    name="edit-name" placeholder="Имя" required minLength="2" maxLength="40" onChange={handleNameChange}/>
                <span className="popup__input-error name-input-error"></span>
            </label>
            <label className="popup__field">
                <input type="text" value={description || ''} id="job-input" className="popup__input popup__input_field_job" 
                    name="edit-job" placeholder="О себе" required minLength="2" maxLength="200" onChange={handleDescriptionChange}/>
                <span className="popup__input-error job-input-error"></span>
            </label>
        </PopupWithForm>
    )
}