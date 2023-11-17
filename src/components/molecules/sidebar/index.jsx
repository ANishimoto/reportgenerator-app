import Link from 'next/link';
import styles from './styles.module.css';

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-600 text-white p-4 min-h-screen">
      <div className='w-full h-10 flex justify-center'>
        <span className='text-center text-2xl'>Report Generator</span>
      </div>
      <nav className='mt-6'>
        <ul>
          <li className='mt-2 hover:text-blue-500'>
            <Link href="/template">
              Templates
            </Link>
          </li>
          <li className='mt-2 hover:text-blue-500'>
            <Link href="/generateReport">
              Gerar Arquivo
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
