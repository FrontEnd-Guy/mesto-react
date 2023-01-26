function Card({card, onCardClick}) {

    function handleClick() {
        onCardClick(card);
      }  

    return(
        <div className="template-card">
            <article className="element">
                <img className="element__image" src={card.link} alt={card.name} onClick={handleClick}/>
                <h2 className="element__title">{card.name}</h2>
                <div className="element__like-container">
                    <button aria-label='Like' className="element__like" type="button"></button>
                    <span className="element__like-counter">{card.likes.length}</span>
                </div>
                <button aria-label='Delete' className="element__delete" type="button"></button>
            </article>
        </div>
    )
}

export default Card
