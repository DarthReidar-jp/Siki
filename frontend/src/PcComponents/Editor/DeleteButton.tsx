import { useNavigate } from 'react-router-dom';
import { FaRegTrashAlt } from "react-icons/fa";
import { deletePage } from '../../utils/fetch/LoadEditorState'; // Adjust the path as necessary

const DeleteButton = ({ id, projectId }: { id: any; projectId?: any }) => {
  const navigate = useNavigate();
  
  const handleDelete = async () => {
    await deletePage(id);
    if (projectId) {
      // Navigate to the project-specific page when projectId is provided
      navigate(`/project/${projectId}`);
    } else {
      // Navigate to the home page when no projectId is provided
      navigate(`/`);
    }
  };

  return (
    <button className='button' onClick={handleDelete}>
      <FaRegTrashAlt />
    </button>
  );
};

export default DeleteButton;
