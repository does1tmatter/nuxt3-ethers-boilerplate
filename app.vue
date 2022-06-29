<script setup>
const { detectChain, isNetwork, loadConnectedWallet, chainId, resetUser, connectUser } = useUser()
const { connectProvider, isMetamaskInstalled, provider, detectProvider, getProvider, switchNetwork } = useWallet()
const { address, balance, ensName, username, isAuthenticated } = useUser()

const onAccountsChanged = (accounts) => {
  resetUser()
  if (isNetwork.value) loadConnectedWallet()
}

const onChainChanged = (chain) => {
  chainId.value = chain
  if (isNetwork.value) loadConnectedWallet()
  if (!isNetwork.value) resetUser()
}

const setListeners = (bool) => {
  if (bool) {
    provider.value.on('accountsChanged', onAccountsChanged)
    provider.value.on('chainChanged', onChainChanged)
  } else {
    provider.value.removeListener('accountsChanged', onAccountsChanged)
    provider.value.removeListener('chainChanged', onChainChanged)
  }
}

onMounted(async () => {
  await detectProvider()
  if (isMetamaskInstalled.value) {
    connectProvider(provider.value)
    await detectChain()
    if (isNetwork.value) {
      await loadContractState(getProvider())
      await loadConnectedWallet()
    }
    setListeners(true)
  } else {
    console.error('Non Ethereum browser! Please install metamask. https://metamask.io/download/')
  }
})

onUnmounted(() => {
  if (isMetamaskInstalled.value) setListeners(false)
})
</script>

<template>
  <div class="flex justify-center items-center min-h-screen">
    <div class="grid gap-2">
      <button v-if="!isAuthenticated && isNetwork" class="font-black" @click="connectUser">Connect</button>
      <button v-if="!isNetwork" class="font-black" @click="switchNetwork">Switch network</button>
      <div>Is network: {{ isNetwork }}</div>
      <div>Is connected: {{ isAuthenticated }}</div>
      <div>Address: {{ address ?? 'null' }}</div>
      <div>balance: {{ balance ?? 'null' }}</div>
      <div>ensName: {{ ensName ?? 'null' }}</div>
      <div>username: {{ username ?? 'null' }}</div>
    </div>
  </div>
</template>
