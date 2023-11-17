import { useEffect, useState } from 'react';
import TemplateService from '@/services/TemplateService';
import styles from './styles.module.css';

function TemplatesList(props) {
    const [templates, setTemplates] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await TemplateService.findAllTemplates();
                setTemplates(response.data.data);
            } catch (error) {
                console.error('Erro ao buscar dados do serviço:', error);
            }
        }

        fetchData();
    }, []);

    const handleEditClick = (id) => {
        window.location.href = `/template/update/${id}`;
    }

    return (
        <div className="container mx-auto mt-8">
            <table className="min-w-full">
                <thead>
                <tr>
                    <th className="py-2 px-4 bg-gray-200 border border-black">Tipo de Template</th>
                    <th className="py-2 px-4 bg-gray-200 border border-black">Título</th>
                    <th className="py-2 px-4 bg-gray-200 border border-black">Ações</th>
                </tr>
                </thead>
                <tbody className='border-b border-b-black'>
                    {templates.map((item) => (
                        <tr key={item.id}>
                            <td className="py-2 px-4 border-x border-x-black">{item.type.name}</td>
                            <td className="py-2 px-4 border-x border-x-black">{item.title}</td>
                            <td className="py-2 px-4 border-x border-x-black">
                                <div className='flex justify-center'>
                                    <button className="mr-2 p-1"
                                        onClick={() => handleEditClick(item.id)}
                                    >
                                        <img
                                            src="/edit-svgrepo-com.png"
                                            alt="Ícone de lápis"
                                            className="w-6 h-6"
                                        />
                                    </button>
                                    {/* <button className="p-1"
                                        onClick={() => handleEditClick(item.id)}
                                    >
                                        <img
                                            src="/garbage-svgrepo-com.png"
                                            alt="Ícone de lápis"
                                            className="w-6 h-6"
                                        />
                                    </button> */}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TemplatesList;
