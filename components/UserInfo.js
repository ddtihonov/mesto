export default class UserInfo {
    constructor({ userInfoName, userInfoProfession }) {
    this._name = userInfoName;
    this._profession = userInfoProfession;
    };

    getUserInfo() {
    return {
        user: this._name.textContent,
        profession: this._profession.textContent
    };
    };

    setUserInfo(data) {
    this._name.textContent = data.name;
    this._profession.textContent = data.profession;
    };
}; 