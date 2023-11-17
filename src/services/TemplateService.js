import api from './api';

const uri = `${process.env.BACKEND_URL}/Template`;

export default class TemplateService {

    static async findAllTemplates(params) {
        return await api.get(uri, {params});
    }

    static async findTemplateById(id) {
        return await api.get(`${uri}/${id}`);
    }

    static async createTemplate(payload) {
        return await api.post(uri, payload);
    }

    static async updateTemplate(payload) {
        return await api.put(`${uri}/${payload.id}`, payload);
    }
}