import React from "react";

function PopupWithForm(props) {
    return(
        <div className={`popup popup_action_${props.name} ${props.isOpen}`}>
            <div className="popup__container">
            <button aria-label='Close' type="button" className="popup__close" onClick={props.onClose}></button>
            <h2 className="popup__title">{props.title}</h2>
            <form className="popup__form" name={props.name}>
                {props.children}
            </form>
            </div>
        </div>
    )
}

export default PopupWithForm