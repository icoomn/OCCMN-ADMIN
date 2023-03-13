import useAuthStore from './auth'

const useStore = () => ({
    useAuthStore: useAuthStore()
})

export default useStore