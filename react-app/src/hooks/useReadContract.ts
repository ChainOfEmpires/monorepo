import { ethers } from 'ethers';
import { useQueries } from 'react-query';

export async function fetchContractData(contractAddress: string, abi: string, method: string) {
  const mumbaiProvider = new ethers.providers.JsonRpcProvider(
    'https://polygon-mumbai.infura.io/v3/475ad160984d4b538b28651b5fae42a6',
  );

  const contract = new ethers.Contract(contractAddress, abi, mumbaiProvider);

  return contract[method]();
}

function useReadContract(contractAddress: string, abi: string, readMethods: string[]) {
  return useQueries(
    readMethods.map((method) => ({
      queryKey: method,
      queryFn: () => fetchContractData(contractAddress, abi, method),
    })),
  );
}

export default useReadContract;
