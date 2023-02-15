interface ICategory {
    id?: string
    name: string
    sort: number
    createTime?: Date
    status?: boolean
}

// 初始化默认值对象
const initCategory = (options?: Partial<ICategory>):ICategory => {
    const defaults = {
        name: '',
        sort: 0,
        createTime: new Date(),
        status: true
    }
    return { ...defaults, ...options }
}

export { initCategory }
export type { ICategory }
