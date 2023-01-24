import React from "react";
import { api } from "../utils/API";

function Main(props) {
    const [userInfo, setUserInfo] = React.useState({userName: '', userDescription: '', userAvatar: ''})

    React.useEffect(()=>{
        api.getUserInfo().then((data) => setUserInfo(
            {userName: data.name,
            userDescription: data.about,
            userAvatar: data.avatar}
        ))
    },[])


    return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar-container">
                    <img src={userInfo.userAvatar} alt="Автарака пользователя" className="profile__avatar" />
                    <button area-label='Edit Profile Picture' className="profile__avatar-edit-button" type="button" onClick={props.onEditAvatar}></button>
                </div>
                <div className="profile__profile-info">
                    <h1 className="profile__name">{userInfo.userName}</h1>
                    <p className="profile__job">{userInfo.userDescription}</p>
                    <button aria-label='Edit Profile Info' className="profile__edit-button" type="button" onClick={props.onEditProfile}></button>
                </div>
                <button aria-label='Add Card' className="profile__add-button" type="button" onClick={props.onAddPlace}></button>
                </section>
                <section className="elements">
                    {props.children}
                </section>
            </main>
    )
}

export default Main