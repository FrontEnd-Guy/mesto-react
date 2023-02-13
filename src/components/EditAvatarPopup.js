import {PopupWithForm} from "./PopupWithForm";
import { useRef } from "react";

export function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
    const inputRef = useRef();

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
          avatar: inputRef.current.value
        });
        this.form.reset()
      } 
    
    return(
        <PopupWithForm 
            title = 'Обновить аватар' 
            name = 'update-avatar' 
            isOpen = {isOpen} 
            onClose = {onClose}
            onSubmit = {handleSubmit}
            buttonText = 'Сохранить'>
                <label className="popup__field">
                    <input type="url" ref = {inputRef} id="avatar-input" className="popup__input popup__input_field_avatar-link" 
                            name="avatar-link" placeholder="Ссылка на картинку" required />
                    <span className="popup__input-error avatar-input-error"></span>
                </label>
        </PopupWithForm>
    )
}