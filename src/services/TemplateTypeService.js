import api from './api';

const uri = `${process.env.BACKEND_URL}/TemplateType`;

export default class TemplateTypeService {

    static async findAllTemplateTypes() {
        return await api.get(uri, {});
    }
}