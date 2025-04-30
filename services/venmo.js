// https://github.com/tjlav5/venmo-api/blob/master/src/api.js
import fetch from 'node-fetch'

class Venmo {
  constructor (accessToken) {
    this.accessToken = accessToken
    this.baseUrl = 'https://api.venmo.com/v1/'
  }

  async me () {
    const response = await fetch(
      `${this.baseUrl}me?access_token=${this.accessToken}`
    )
    return response.json()
  }

  async profile (id) {
    const response = await fetch(
      `${this.baseUrl}users/${id}?access_token=${this.accessToken}`
    )
    return response.json()
  }

  async friends (id, limit, offset) {
    const response = await fetch(
      `${this.baseUrl}users/${id}/friends?access_token=${this.accessToken}&limit=${limit}&offset=${offset}`
    )
    return response.json()
  }

  async getPayments (filter = {}, limit, after, before) {
    const params = new URLSearchParams({
      access_token: this.accessToken,
      ...filter,
      limit,
      after,
      before
    })
    const response = await fetch(`${this.baseUrl}payments?${params}`)
    return response.json()
  }

  async getPayment (id) {
    const response = await fetch(
      `${this.baseUrl}payments/${id}?access_token=${this.accessToken}`
    )
    return response.json()
  }

  async createPayment (userID, note, amount, audience) {
    const response = await fetch(`${this.baseUrl}payments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        access_token: this.accessToken,
        user_id: userID,
        note,
        amount,
        audience
      })
    })
    return response.json()
  }

  async updatePayment (paymentID, action) {
    const response = await fetch(`${this.baseUrl}payments/${paymentID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        access_token: this.accessToken,
        action
      })
    })
    return response.json()
  }
}

export default Venmo
