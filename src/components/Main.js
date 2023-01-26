import {useEffect, useState} from "react";
import Card from "./Card";
import { api } from "../utils/API";

function Main({onEditProfile, onAddPlace, onEditAvatar, onOpenCard}) {
    const [userInfo, setUserInfo] = useState({userName: '', userDescription: '', userAvatar: ''})
    const [cards, setCards] = useState([])

    useEffect(()=>{
        api.getCardsList()
        .then((cards) => setCards(cards))
        .catch((err) =>{
          console.log(err);
        })
    },[])    

    useEffect(()=>{
        api.getUserInfo()
        .then((data) => setUserInfo(
            {userName: data.name,
            userDescription: data.about,
            userAvatar: data.avatar}))
        .catch((err) =>{
            console.log(err);
          })
    },[])


    return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar-container">
                    <img src={userInfo.userAvatar} alt="Автарака пользователя" className="profile__avatar" />
                    <button area-label='Edit Profile Picture' className="profile__avatar-edit-button" type="button" onClick={onEditAvatar}></button>
                </div>
                <div className="profile__profile-info">
                    <h1 className="profile__name">{userInfo.userName}</h1>
                    <p className="profile__job">{userInfo.userDescription}</p>
                    <button aria-label='Edit Profile Info' className="profile__edit-button" type="button" onClick={onEditProfile}></button>
                </div>
                <button aria-label='Add Card' className="profile__add-button" type="button" onClick={onAddPlace}></button>
            </section>
            <section className="elements">
                {
                    cards.map((card) => {
                        return (<Card 
                                    key={card._id} 
                                    card={card} 
                                    onCardClick={(card) => onOpenCard(card)}/>)    
                    })
                }
            </section>
        </main>
    )
}

export default Main