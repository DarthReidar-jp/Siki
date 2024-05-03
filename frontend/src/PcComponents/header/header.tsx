import NewPageButton from './NewPageButton';
import VectorSearchForm from './VectorSearchForm';

const Header = () => {
  return (
    <header className='flex justify-between items-center fixed top-0 z-50 w-full bg-white bg-opacity-50 backdrop-blur-sm p-2'>
      <div className='flex justify-center items-center flex-grow'>
        <NewPageButton />
        <VectorSearchForm />
      </div>
    </header>
  );
};

export default Header;
