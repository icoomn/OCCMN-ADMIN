interface IRole {
    id?: string
    name: string
}

// 初始化默认值对象
const initRole = (options?: Partial<IRole>):IRole => {
    const defaults = {
        name: ''
    }
    return { ...defaults, ...options }
}

export { initRole }
export type { IRole }