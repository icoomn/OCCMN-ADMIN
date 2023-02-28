interface IPermission {
	id?: string
	name: string
	type: number
	path?: string
	parentId?: string
}

// 初始化默认值对象
const initPermission = (options?: Partial<IPermission>):IPermission => {
	const defaults = {
		name: '',
		type: 0,
		path: '',
		parentId: '00000000-0000-0000-0000-000000000000'
	}
	return { ...defaults, ...options }
}

export { initPermission }
export type { IPermission }
	