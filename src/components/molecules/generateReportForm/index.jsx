import { useEffect, useState } from 'react';
import TemplateTypeService from '@/services/TemplateTypeService';
import TemplateService from '@/services/TemplateService';
import GenerateFileService from '@/services/GenerateFileService';

function GenerateReportForm() {
    const [templateTypes, setTemplateTypes] = useState([]);
    const [templates, setTemplates] = useState([]);
    
    const [selectedTemplateType, setSelectedTemplateType] = useState({id: '', name: ''});
    const [selectedTemplate, setSelectedTemplate] = useState('');
    const [file, setFile] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await TemplateTypeService.findAllTemplateTypes();
                setTemplateTypes(response.data.data);
            } catch (error) {
                console.error('Erro ao buscar dados do serviço:', error);
            }
        }

        fetchData();
    }, []); 

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await TemplateService.findAllTemplates({
                    templateTypeId: selectedTemplateType.id
                });
                (response.data.data) ? setTemplates(response.data.data) : setTemplates([]);
            } catch (error) {
                console.error('Erro ao buscar dados do serviço:', error);
            }
        }

        fetchData();
    }, [selectedTemplateType]); 

    const handleTemplateTypeChange = (event) => {
        setSelectedTemplateType(event.target.value);
    };

    const handleTemplateChange = (event) => {
        setSelectedTemplate(event.target.value);
    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const payload = new FormData()
        payload.append("template", selectedTemplate);
        payload.append("file", file);
        const options = {
            responseType: 'arraybuffer'
        }

        let response = null;
        let extension = null;
        const templateType = templateTypes.find(data => data.id == selectedTemplateType);
        switch (templateType.name) {
            case 'PDF':
                response = await GenerateFileService.generatePdfFile(payload, options);
                extension = '.pdf';
                break;
            case 'HTML':
                response = await GenerateFileService.generateHtmlFile(payload, options);
                extension = '.html';
                break;
            case 'CSV':
                response = await GenerateFileService.generateCsvFile(payload, options);
                extension = '.csv';
                break;
            case 'TXT':
                response = await GenerateFileService.generateTextFile(payload, options);
                extension = '.txt';
                break;
            default:
                console.log("Tipo de template não implemantado ainda!");
                break;
        }

        if (response) {
            const blob = new Blob([response.data], { type: 'application/octet-stream' });
    
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
    
            const template = templates.find(data => data.id == selectedTemplate);
            link.download = `${template.title}${extension}`;
    
            document.body.appendChild(link);
    
            link.click();
    
            document.body.removeChild(link);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto mt-8">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Tipo de Template:
                    <select
                        value={selectedTemplateType}
                        onChange={handleTemplateTypeChange}
                        className="mt-1 p-2 border rounded-md w-full"
                    >
                        {
                            templateTypes.map(data => (
                                <option key={data.id} value={data.id}>
                                    {data.name}
                                </option>
                            ))
                        }
                    </select>
                </label>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Template:
                    <select
                        value={selectedTemplate}
                        onChange={handleTemplateChange}
                        className="mt-1 p-2 border rounded-md w-full"
                    >
                        {
                            templates.map(data => (
                                <option key={data.id} value={data.id}>
                                    {data.title}
                                </option>
                            ))
                        }
                    </select>
                </label>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                Carregar arquivo fonte de dados (.json):
                <input
                    type="file"
                    accept=".json"
                    onChange={handleFileChange}
                    className="mt-1 p-2 border rounded-md w-full"
                />
                </label>
            </div>

            <button
                type="submit"
                className="bg-green-500 text-black p-2 rounded-md hover:bg-green-700"
            >
                Enviar
            </button>
        </form>
    );
}

export default GenerateReportForm;
