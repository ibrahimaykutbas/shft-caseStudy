import { useState } from 'react';

export default useApi = apiFunc => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const request = async (...args) => {
    setLoading(true);
    const response = await apiFunc(args);
    setData(response.data);
    setError(!response.ok);
    setLoading(false);
    return response;
  };

  return { data, loading, error, request };
};
