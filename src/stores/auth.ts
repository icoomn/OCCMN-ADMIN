import { IPermission } from '@/models/IPermission'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export default defineStore('auth', () => {
	const permissions = ref<IPermission[]>([])
	return { permissions }
}, {
	persist: {
		enabled: true
	}
})