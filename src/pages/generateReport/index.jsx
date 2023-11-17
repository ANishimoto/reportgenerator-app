import { useEffect, useState } from 'react';
import TemplateTypeService from '@/services/TemplateTypeService';
import Sidebar from '@/components/molecules/sidebar';
import GenerateReportForm from '@/components/molecules/generateReportForm';

function ResultadosPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await TemplateTypeService.findAllTemplateTypes();
        setData(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados do serviço:', error);
      }
    }

    fetchData();
  }, []); 

  return (
    <div className='flex'>
        <Sidebar/>
        <div className='flex-1 bg-gray-200 p-4'>
            <GenerateReportForm/>
        </div>
    </div>
  );
}

export default ResultadosPage;
