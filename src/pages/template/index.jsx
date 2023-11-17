import Sidebar from '@/components/molecules/sidebar';
import TemplatesList from '@/components/molecules/templatesList';

function ResultadosPage() {
  return (
    <div className='flex'>
        <Sidebar/>
        <div className='flex-1 bg-gray-200 text-black p-4'>
          <TemplatesList/>
        </div>
    </div>
  );
}

export default ResultadosPage;
