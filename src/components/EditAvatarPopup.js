import {PopupWithForm} from "./PopupWithForm";
import { useRef, useEffect } from "react";

export function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, buttonText}) {
    const inputRef = useRef();

    useEffect(() => {
        inputRef.current.value = '';
    }, [isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
          avatar: inputRef.current.value
        });
      } 
    
    return(
        <PopupWithForm 
            title = 'Обновить аватар' 
            name = 'update-avatar' 
            isOpen = {isOpen} 
            onClose = {onClose}
            onSubmit = {handleSubmit}
            buttonText = {buttonText}>
                <label className="popup__field">
                    <input type="url" ref = {inputRef} id="avatar-input" className="popup__input popup__input_field_avatar-link" 
                            name="avatar-link" placeholder="Ссылка на картинку" required />
                    <span className="popup__input-error avatar-input-error"></span>
                </label>
        </PopupWithForm>
    )
}