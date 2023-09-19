//Class API
class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
    }

    //Get response function
    _getResponseData(res) {
        if (res.ok) {
            return res.json();
        }
        else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    }

    //get info about user
    getUserInfo(token) {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(this._getResponseData)
    }

    //get array cards
    getCards(token) {
        return fetch(`${this._baseUrl}/cards`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(this._getResponseData)
    }

    //update info about user
    setOwnerInfo(ownerInfo, token) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
              },
            body: JSON.stringify({
                name: ownerInfo.nameInput,
                about: ownerInfo.jobInput
            })
        })
            .then(this._getResponseData)
    }

    //update user avatar
    setOwnerAvatar(ownerAvatar, token) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
              },
            body: JSON.stringify({
                avatar: ownerAvatar.linkAvatar
            })
        })
            .then(this._getResponseData)
    }

    //create new card
    addNewCard(cardInfo, token) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
              },
            body: JSON.stringify({
                name: cardInfo.cardName,
                link: cardInfo.link
            })
        })
            .then(this._getResponseData)
    }

    //put like on card
    addLike(cardId, token) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`
              }
        })
            .then(this._getResponseData)
    }

    //delete like on card
    deleteLike(cardId, token) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
              },
        })
            .then(this._getResponseData)
    }

    //delete card created by user
    deleteCard(cardId, token) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
              }
        })
            .then(this._getResponseData)
    }
}

const api = new Api({
    baseUrl: 'https://api.15sprint.nomoredomainsrocks.ru',
    // baseUrl: 'http://localhost:3001',
});


export default api;