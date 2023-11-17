import Sidebar from '@/components/molecules/sidebar';
import TemplateForm from '@/components/molecules/templateForm';

function ResultadosPage() {
  return (
    <div className='flex'>
        <Sidebar/>
        <div className='flex-1 bg-gray-200 p-4'>
            <TemplateForm/>
        </div>
    </div>
  );
}

export default ResultadosPage;
