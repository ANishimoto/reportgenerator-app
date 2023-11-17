import Sidebar from '@/components/molecules/sidebar';
import TemplateForm from '@/components/molecules/templateForm';
import TemplateService from '@/services/TemplateService';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

function ResultadosPage() {
  const [template, setTemplate] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await TemplateService.findTemplateById(id);
        setTemplate(response.data.data[0]);
      } catch (error) {
        console.error('Erro ao buscar dados do serviço:', error);
      }
    }

    fetchData();
  }, [id]);
  return (
    <div className='flex'>
      <Sidebar/>
      <div className='flex-1 bg-gray-200 p-4'>
        <TemplateForm template={template}/>
      </div>
    </div>
  );
}

export default ResultadosPage;
