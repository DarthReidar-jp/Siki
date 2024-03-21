import React from 'react';
import { useNavigate } from 'react-router-dom';

const DeleteButton = ({ id }: { id: any }) => {
    const navigate = useNavigate();
    
    const handleDelete = async () => {
        try {
          const response = await fetch(`http://localhost:8000/api/page/${id}`, {
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
        <button onClick={handleDelete}>削除</button>
    );
};

export default DeleteButton;
