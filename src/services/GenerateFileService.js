import api from './api';

const uri = `${process.env.BACKEND_URL}/file/generate/`;

export default class GenerateFileService {

    static async generatePdfFile(payload, options) {
        return await api.post(`${uri}/pdf`, payload, options);
    }

    static async generateCsvFile(payload, options) {
        return await api.post(`${uri}/csv`, payload, options);
    }

    static async generateTextFile(payload, options) {
        return await api.post(`${uri}/text`, payload, options);
    }

    static async generateHtmlFile(payload, options) {
        return await api.post(`${uri}/html`, payload, options);
    }
}