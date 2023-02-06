interface IArticle {
    id: string
    title: string
    coverPicture?: string
    intro?: string
    content?: string
    createTime?: string
    status?: boolean
}

// 初始化默认值对象
const initArticle = (options?: Partial<IArticle>):IArticle => {
    const defaults = {
        id: '',
        title: '',
        coverPicture: '',
        intro: '',
        content: '',
        createTime: '',
        status: true
    }
    return { ...defaults, ...options }
}

export { initArticle }
export type { IArticle } 