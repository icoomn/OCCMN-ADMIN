import { IPermission } from "./IPermission"
interface IRole {
    id?: string
    name: string
	permissions: IPermission[]
}

// 初始化默认值对象
const initRole = (options?: Partial<IRole>):IRole => {
    const defaults = {
        name: '',
		permissions: []
    }
    return { ...defaults, ...options }
}

export { initRole }
export type { IRole }