export default class UserInfo {
    constructor({ userInfoName, userInfoProfession }) {
    this._name = userInfoName;
    this._profession = userInfoProfession;
    }

    // исходные данные пользователя для открытия формы
    getUserInfo() {
    return {
        user: this._name.textContent,
        profession: this._profession.textContent
    }
    }

    //новые данные пользователя для добавления на страницу
    setUserInfo(data) {
    this._name.textContent = data.name;
    this._profession.textContent = data.job;
    }
} 