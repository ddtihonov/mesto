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
        if(name) {
            this._name.textContent = name;
        }
        if(about)  {
            this._about.textContent = about;
        }
        if(avatar) {
            this._avatar.src = avatar
        }
    }
} 