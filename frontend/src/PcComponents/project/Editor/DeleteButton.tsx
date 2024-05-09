import { useNavigate } from 'react-router-dom';
import { FaRegTrashAlt } from "react-icons/fa";

const DeleteButton = ({ id, projectId }: { id: any; projectId: any }) => {
  const navigate = useNavigate();
  const handleDelete = async () => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    try {
      const response = await fetch(`${backendUrl}page/${id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'X-Requested-With': 'XMLHttpRequest' // このヘッダーを追加
        }
      });
      if (!response.ok) {
        throw new Error('ページの削除に失敗しました');
      }
      navigate(`/project/${projectId}`);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <button className='button' onClick={handleDelete}><FaRegTrashAlt /></button>
  );
};

export default DeleteButton;
