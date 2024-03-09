import Link from 'next/link';
import { FaExclamationTriangle } from 'react-icons/fa';

const NotFoundPage = () => {
  return (
    <section className='min-h-screen flex-grow'>
      <div className='container m-auto max-w-2xl py-24'>
        <div className='px-6 py-24 mb-4 shadow-md rounded-md m-4 md:m-0'>
          <div className='flex justify-center'>
            <FaExclamationTriangle className='text-displayLarge text-faded-70'></FaExclamationTriangle>
          </div>
          <div className='text-center'>
            <h1 className='text-headlineLarge font-bold mt-4 mb-2'>Page Not Found</h1>
            <p className='text-secondary text-xl mb-10'>
              The page you are looking for does not exist.
            </p>
            <Link
              href='/'
              className='bg-faded-30 hover:bg-faded-10 text-secondary font-bold py-4 px-6 rounded'
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>
      <div className='flex-grow'></div>
    </section>
  );
};
export default NotFoundPage;
