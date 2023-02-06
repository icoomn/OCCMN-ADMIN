interface ICategory {
    id: string
    name: string
    sort: string
    createTime?: string
    status?: boolean
}

// 初始化默认值对象
const initCategory = (options?: Partial<ICategory>):ICategory => {
    const defaults = {
        id: '',
        name: '',
        sort: '0',
        createTime: '',
        status: true
    }
    return { ...defaults, ...options }
}

export { initCategory }
export type { ICategory }
