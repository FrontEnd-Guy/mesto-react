import React from "react"

function ImagePopup(props) {
    return (
        <div className={`popup popup_action_view-photo ${props.card ? 'popup_opened' : ''}`}>
            <figure className="popup__figure">
                <img className="popup__image" src={props.card ? props.card.link : '#'} />
                <figcaption className="popup__figcaption">{props.card.name}</figcaption>
                <button aria-label='Close' type="button" className="popup__close" onClick={props.onClose}></button>
            </figure>
        </div>
    )
}

export default ImagePopup