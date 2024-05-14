import { useState, useEffect } from 'react';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const useVerifyProjectAccess = (projectId:string|undefined|null) => {
  const [access, setAccess] = useState({ isMember: false, shouldDisplay: false, loading: true });

  useEffect(() => {
    if (!projectId) {
      // projectIdがなければすぐにローディングを終了し、表示を制御しない
      setAccess({ isMember: true, shouldDisplay: true, loading: false });
      return;
    }
    const verifyAccess = async () => {
      try {
        const response = await fetch(`${backendUrl}project/verify?projectId=${projectId}`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json'
          }
          });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json(); // Correctly parsing the JSON response
        setAccess({ ...data, loading: false });
      } catch (error) {
        console.error('Access verification failed:', error);
        setAccess({ isMember: false, shouldDisplay: false, loading: false });
      }
    };

    if (projectId) {
      verifyAccess();
    }
  }, [projectId]);

  return access;
};
