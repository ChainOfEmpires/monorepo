import { ethers } from 'ethers';

async function fetchContractData<T>(
  contractAddress: string,
  abi: string,
  method: string,
  provider?: ethers.providers.JsonRpcSigner | ethers.providers.BaseProvider,
  params: any[] = [],
): Promise<T> {
  const mumbaiProvider = new ethers.providers.JsonRpcProvider(
    'https://polygon-mumbai.infura.io/v3/475ad160984d4b538b28651b5fae42a6',
  );

  const contract = new ethers.Contract(contractAddress, abi, provider || mumbaiProvider);

  return contract[method](...params);
}

function useContract(
  contractAddress: string,
  abi: any,
) {
  return {
    read: <T = any>(
      method: string,
      params?: any[],
    ) => fetchContractData<T>(contractAddress, abi, method, null, params),
    update: <T = any>(
      method: string,
      provider: ethers.providers.JsonRpcSigner | ethers.providers.BaseProvider,
      params?: any[],
    ) => fetchContractData<T>(contractAddress, abi, method, provider, params),
  };
}

export default useContract;
