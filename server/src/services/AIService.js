/* eslint-disable no-param-reassign */
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const AiMessage = require('../models/AiMessage');
const { Agent } = require('node:https');

require('dotenv').config();

class AIService {
  #accessToken;

  #baseUrl;

  #authKey;

  #client;

  constructor(authKey) {
    this.#accessToken = '';
    this.#baseUrl = 'https://gigachat.devices.sberbank.ru/api/v1';
    this.#authKey = authKey;
    this.#client = axios.create({
      baseURL: this.#baseUrl,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      httpsAgent: new Agent({
        rejectUnauthorized: false,
      }),
    });

    this.#client.interceptors.request.use(async (config) => {
      config.headers.Authorization = `Bearer ${this.#accessToken}`;
      return config;
    });

    this.#client.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error.config;
        if (error.response?.status === 401 && !prevRequest.sent) {
          prevRequest.sent = true;
          await this.updateAccessToken();
          prevRequest.headers.Authorization = `Bearer ${this.#accessToken}`;
          return axios(prevRequest);
        }
        return Promise.reject(error);
      },
    );
  }

  async getModels() {
    const response = await this.#client.get('/models');
    return response.data;
  }

  async updateAccessToken() {
    try {
      const rqUID = uuidv4();
      const response = await axios.post(
        `https://ngw.devices.sberbank.ru:9443/api/v2/oauth`,
        'scope=GIGACHAT_API_PERS',
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: 'application/json',
            RqUID: rqUID,
            Authorization: `Basic ${this.#authKey}`,
          },
          httpsAgent: new Agent({
            rejectUnauthorized: false,
          }),
        },
      );

      this.#accessToken = response.data.access_token;
      return this.#accessToken;
    } catch (error) {
      console.error('Error getting access token:', error);
      throw new Error('Failed to get access token');
    }
  }

  async chatCompletions(messages) {
    const response = await this.#client.post('/chat/completions', {
      model: 'GigaChat-2',
      messages,
      temperature: 1.7,
      stream: false,
    });
    return new AiMessage(response.data.choices[0].message.content);
  }
}

const aiService = new AIService(process.env.SBER_AUTH_KEY);

module.exports = aiService;
