import { ethers } from 'ethers'
import detectEthereumProvider from '@metamask/detect-provider'

export default createSharedComposable(() => {

  let connection
  const provider = useState('provider', () => null)
  let signer
  
  const isMetamaskInstalled = computed(() => Boolean(provider.value))

  const connectProvider = (_provider) => {
    connection = new ethers.providers.Web3Provider(_provider)
    signer = connection.getSigner()
  }

  const signMessage = async (message) => await signer.signMessage(message).then(res => console.log(res))

  const requestAccounts = async () => await connection.send('eth_requestAccounts', [])

  const getCurrentUser = async () => await connection.send('eth_accounts', [])

  const getBalance = async (address) => await connection.getBalance(address)
  
  const lookupAddress = async (address) => await connection.lookupAddress(address)

  const getAvatar = async (ensName) => await connection.getAvatar(ensName)

  const request = async (payload) => await provider.value.request(payload)

  const switchNetwork = async () => await provider.value.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: useRuntimeConfig().public.NETWORK_ID }] })

  const getChainId = async () => await provider.value.request({ method: 'eth_chainId'})

  const getProvider = () => connection

  const getSigner = () => signer

  const detectProvider = async () => provider.value = await detectEthereumProvider()

  return {
    connection,
    provider,
    signer,
    connectProvider,
    signMessage,
    requestAccounts,
    getCurrentUser,
    getBalance,
    lookupAddress,
    getAvatar,
    request,
    switchNetwork,
    getChainId,
    getProvider,
    getSigner,
    isMetamaskInstalled,
    detectProvider,
    detectEthereumProvider
  }
})