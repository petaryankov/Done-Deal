import request from "../utils/request";
const baseUrl = 'http://localhost:3030/jsonstore/offers';

export default {
    async getAll() {
        const result = await request.get(baseUrl);

        const offers = Object.values(result);

        return offers;
    },
    getOne(gameId) {
        return request.get(`${baseUrl}/${gameId}`);
    },
    create(offerData) {
        return request.post(baseUrl, offerData);
    }
}