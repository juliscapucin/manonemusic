import { Loader } from '@/components'

const LoadingPage = ({ loading }) => {
  return (
    <div className='w-screen h-screen flex justify-center items-center'><Loader/></div>
  );
};
export default LoadingPage;
