export default class Api {
    constructor({baseUrl, headers}) {
        this.baseUrl = baseUrl;
        this.headers = headers;
    };

    getUserInfo() {
        return fetch(`${this.baseUrl}/users/me`, {
            headers: this.headers
        })
            .then(this._checkError);
    }

    setUserInfo(data) {
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
            .then(this._checkError);
    }

    addAvatar(data) {
        return fetch(`${this.baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
            .then(this._checkError);
    }

    getInitialCards() {
        return fetch(`${this.baseUrl}/cards`, {
            headers: this.headers
        })
            .then(this._checkError);
    }
    
    addCard(element) {
        return fetch(`${this.baseUrl}/cards`, {
            method: 'POST', 
            headers: this.headers,
            body: JSON.stringify({
                name: element.title,
                link: element.image
            })
        })
            .then(this._checkError);
    }

    deleteCard(id) {
        return fetch(`${this.baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: this.headers
        })
            .then(this._checkError);
    }

    addLike(id) {
        return fetch(`${this.baseUrl}/cards/likes/${id}`, {
            method: 'PUT',
            headers: this.headers
        })
            .then(this._checkError);
    }
    
    deleteLike(id) {
        return fetch(`${this.baseUrl}/cards/likes/${id}`, {
            method: 'DELETE',
            headers: this.headers
        })
            .then(this._checkError);
    };

    _checkError(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }
}