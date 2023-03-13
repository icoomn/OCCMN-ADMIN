interface IAccount {
    id?: string
    name: string
    password: string
	roleId: string
    createTime?: Date
    status?: boolean
}

// 初始化默认值对象
const initAccount = (options?: Partial<IAccount>):IAccount => {
    const defaults = {
        name: '',
        password: '',
		roleId: '',
        createTime: new Date(),
        status: true
    }
    return { ...defaults, ...options }
}

export { initAccount }
export type { IAccount }
