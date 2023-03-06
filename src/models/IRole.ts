import { IPermission } from "./IPermission"
interface IRole {
    id?: string
    name: string
	permissionList: IPermission[]
}

// 初始化默认值对象
const initRole = (options?: Partial<IRole>):IRole => {
    const defaults = {
        name: '',
		permissionList: []
    }
    return { ...defaults, ...options }
}

export { initRole }
export type { IRole }