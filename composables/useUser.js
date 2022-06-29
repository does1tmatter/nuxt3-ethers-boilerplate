import { ethers } from 'ethers'

export default function () {

  const config = useRuntimeConfig()
  const { getChainId, getCurrentUser, lookupAddress, getAvatar, getBalance, requestAccounts, getSigner } = useWallet()
  const { sliceAddress } = useUtils()

  const address = useState('address', () => null)
  const chainId = useState('chainId', () => null)
  const balance = useState('balance', () => null)

  const ensName = useState('ensName', () => null)
  const ensAvatar = useState('ensAvatar', () => null)

  const ownedTokens = useState('ownedTokens', () => [])

  const username = computed(() => ensName.value || sliceAddress(address.value))

  const isNetwork = computed(() => config.NETWORK_ID === chainId.value)
  const isAuthenticated = computed(() => Boolean(address.value))

  const detectChain = async () => chainId.value = await getChainId()

  const formatBalance = (balance) => {
    if (!parseInt(balance)) return 0
    return parseFloat(ethers.utils.formatEther(balance)).toFixed(4)
  }

  const userLoading = useState('userLoading', () => false)

  const resetUser = () => {
    address.value = null
    balance.value = null
    ensName.value = null
    ensAvatar.value = null
    ownedTokens.value = []
  }

  const loadUserData = async (_addy) => {
    try {
      if (_addy.length) {
        address.value = _addy[0]
        ensName.value = await lookupAddress(_addy[0])
        balance.value = await getBalance(_addy[0]).then(res => formatBalance(res))
        if (ensName.value) ensAvatar.value = await getAvatar(ensName.value)
      } else {
        resetUser()
      }
    } catch (error) {
      console.log(error)
    } finally {
      // const sig = getSigner()
      // connectNftContract(sig)
    }
  }

  const loadConnectedWallet = async () => {
    try {
      userLoading.value = true
      await getCurrentUser()
        .then(res => loadUserData(res))
    } catch (error) {
      console.log(error)
    } finally {
      userLoading.value = false
    }
  }

  const connectUser = async () => {
    try {
      userLoading.value = true
      await requestAccounts()
        .then(res => loadUserData(res))
    } catch (error) {
      console.log(error)
    } finally {
      userLoading.value = false
    }
  }

  return {
    address,
    chainId,
    balance,
    ensAvatar,
    ensName,
    ownedTokens,
    username,
    isNetwork,
    isAuthenticated,
    detectChain,
    userLoading,
    resetUser,
    loadConnectedWallet,
    connectUser,
    loadUserData
  }

}