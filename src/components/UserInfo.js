export default class UserInfo {
    constructor({ userInfoName, userInfoAbout, userAvatar}) {
    this._name = userInfoName;
    this._about = userInfoAbout;
    this._avatar = userAvatar
    }

    // исходные данные пользователя для открытия формы
    getUserInfo() {
    return {
        user: this._name.textContent,
        about: this._about.textContent,
        avatar: this._avatar.src
    }
    }

    //новые данные пользователя для добавления на страницу
    setUserInfo({name, about, avatar}) {   
    this._name.textContent = name;
    this._about.textContent = about;
    this._avatar.src = avatar
    }
} 