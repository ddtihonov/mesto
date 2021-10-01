export default class UserInfo {
    constructor({ userInfoName, userInfoProfession, userAvatar}) {
    this._name = userInfoName;
    this._profession = userInfoProfession;
    this._avatar = userAvatar
    }

    // исходные данные пользователя для открытия формы
    getUserInfo() {
    return {
        user: this._name.textContent,
        profession: this._profession.textContent,
        avatar: this._avatar.src
    }
    }

    //новые данные пользователя для добавления на страницу
    setUserInfo({name, job, avatar}) {
    this._name.textContent = name;
    this._profession.textContent = job;
    this._avatar.src = avatar
    }
} 