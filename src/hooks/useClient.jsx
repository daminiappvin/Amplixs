
import { useQuery } from 'react-query';
import { fetchData } from '../services/api';

const useClient = (tenant , endpoint) => {
  return useQuery(['data', endpoint], () => fetchData(tenant ,endpoint), {
    // Optional settings like stale time, cache time, etc.
    staleTime: 60000, // 1 minute
  });
};

export default useClient;
