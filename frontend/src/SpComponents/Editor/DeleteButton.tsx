import { useNavigate } from 'react-router-dom';

const DeleteButton = ({ id }: { id: any }) => {
  const navigate = useNavigate();
  const handleDelete = async () => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    try {
      const response = await fetch(`${backendUrl}page/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to delete page');
      }
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <button className='button' onClick={handleDelete}>削除</button>
  );
};

export default DeleteButton;
