const axios = require('axios');
const { validatePhoneNumber, validateMaxAge } = require('../utils/validators');

class SimSwapService {
  constructor() {
    this.baseURL = 'https://api.orange.com/camara/orange-lab/sim-swap/v1';
  }

  async checkSimSwap(accessToken, phoneNumber, maxAge = 240) {
    // Validate inputs
    if (!validatePhoneNumber(phoneNumber)) {
      throw new Error('Invalid phone number format');
    }
    
    if (!validateMaxAge(maxAge)) {
      throw new Error('Max age must be between 1 and 2160 hours');
    }

    try {
      const response = await axios.post(
        `${this.baseURL}/check`,
        { phoneNumber, maxAge },
        {
          headers: this._buildHeaders(accessToken),
          timeout: 10000
        }
      );

      return this._handleResponse(response);
    } catch (error) {
      return this._handleError(error);
    }
  }

  _buildHeaders(accessToken) {
    return {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      'x-correlator': `trustlocal-simswap-${Date.now()}`
    };
  }

  _handleResponse(response) {
    return {
      success: true,
      status: response.status,
      data: {
        swapped: response.data.swapped,
        verificationTime: new Date().toISOString()
      }
    };
  }

  _handleError(error) {
    console.error('SIM Swap API Error:', error.response?.data || error.message);
    
    const status = error.response?.status || 500;
    const errorData = error.response?.data || {
      code: 'INTERNAL_ERROR',
      message: 'SIM swap verification service unavailable'
    };

    return {
      success: false,
      status,
      error: errorData
    };
  }
}

module.exports = new SimSwapService();