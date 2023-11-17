import { useEffect, useState } from 'react';
import TemplateTypeService from '@/services/TemplateTypeService';
import TemplateService from '@/services/TemplateService';
import styles from './styles.module.css';

function TemplateForm(props) {
    const [id, setId] = useState('');
    const [templateTypes, setTemplateTypes] = useState([]);
    const [title, setTitle] = useState('');
    const [selectedTemplateType, setSelectedTemplateType] = useState('');
    const [content, setContent] = useState('');

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
        if (props.template) {
            setId(props.template.id);
            setTitle(props.template.title);
            setSelectedTemplateType(props.template.type.id);
            setContent(props.template.currentVersion.content);
        }
    }, [props.template])

    const handleTitleChange = async (event) => {
        setTitle(event.target.value);
    };

    const handleTemplateTypeChange = async (event) => {
        setSelectedTemplateType(event.target.value);
    };

    const handleContentChange = async (event) => {
        setContent(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const payload = {
            title: title,
            type: {
                id: selectedTemplateType
            },
            content: content
        };

        let request = async () => {};
        if (id) {
            payload.id = id;
            payload.status = true;
            request = TemplateService.updateTemplate;
        } else {
            request = TemplateService.createTemplate;
        }

        try {
            await request(payload);
        } catch (error) {
            console.log(error);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Tab') {
            event.preventDefault();
      
            // Adiciona uma tabulação manualmente na posição do cursor
            const start = event.target.selectionStart;
            const end = event.target.selectionEnd;
            const newText = `${content.substring(0, start)}\t${content.substring(end)}`;
            setContent(newText);
      
            // Atualiza a posição do cursor
            const newCursorPosition = start + 1;
            setTimeout(() => {
              // Define a posição do cursor após um pequeno atraso
              event.target.setSelectionRange(newCursorPosition, newCursorPosition);
            }, 0);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto mt-8">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Título do Template:
                    <input 
                        type="text"
                        className="mt-1 p-2 border rounded-md w-full"
                        value={title}
                        onChange={handleTitleChange}
                    />
                </label>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Tipo do Template:
                    <select
                        value={selectedTemplateType}
                        onChange={handleTemplateTypeChange}
                        className="mt-1 p-2 border rounded-md w-full"
                        disabled={id}
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
                    <textarea 
                        cols="30" 
                        rows="10"
                        className="mt-1 p-2 border rounded-md w-full"
                        value={content}
                        onChange={handleContentChange}
                        onKeyDown={handleKeyDown}
                    >
                    </textarea>
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

export default TemplateForm;
