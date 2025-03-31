import request from "../utils/request";
const baseUrl = 'http://localhost:3030/jsonstore/offers';

export default {
    async getAll() {
        const result = await request.get(baseUrl);

        const offers = Object.values(result);

        return offers;
    },
    getOne(offerId) {
        return request.get(`${baseUrl}/${offerId}`);
    },
    create(offerData) {
        return request.post(baseUrl, offerData);
    },
    edit(offerId, offerData) {
        return request.put(`${baseUrl}/${offerId}`, offerData);
    },
    delete(offerId) {
        return request.delete(`${baseUrl}/${offerId}`);
    }
}