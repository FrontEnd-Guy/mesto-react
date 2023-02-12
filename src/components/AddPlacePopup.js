import { useState } from "react";
import {PopupWithForm} from "./PopupWithForm";

export function AddPlacePopup({isOpen, onClose, onAddPlace}){
    const [link, setLink] = useState('');
    const [name, setName] = useState('');

    function handleLinkChange(e){
        setLink(e.target.value)
    }

    function handleNameChange(e){
        setName(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault();
        onAddPlace({
            link: link,
            name: name
        })
    }

    return (
        <PopupWithForm 
            title = 'Новое место' 
            name = 'add-place' 
            isOpen = {isOpen} 
            onClose = {onClose}
            onSubmit = {handleSubmit}
            buttonText = 'Сохранить'>
                <label className="popup__field">
                    <input type="text" value={name} id="place-input" className="popup__input popup__input_field_place-name" 
                           name="add-place" placeholder="Название" required minLength="2" maxLength="30" onChange={handleNameChange}/>
                    <span className="popup__input-error place-input-error"></span>
                </label>
                <label className="popup__field">
                    <input type="url" value={link} id="link-input" className="popup__input popup__input_field_image-link" 
                           name="add-link" placeholder="Ссылка на картинку" required onChange={handleLinkChange}/>
                    <span className="popup__input-error link-input-error"></span>
                </label>
        </PopupWithForm>
    )
}