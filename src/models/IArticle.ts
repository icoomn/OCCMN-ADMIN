interface IArticle {
    id?: string
    title: string
    coverPicture: string
    intro: string
    content: string
	viewCount?: number
    createTime?: Date
    status?: boolean
}

// 初始化默认值对象
const initArticle = (options?: Partial<IArticle>):IArticle => {
    const defaults = {
        title: '',
        coverPicture: 'https://img0.baidu.com/it/u=1705694933,4002952892&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=281',
        intro: '',
        content: '',
		viewCount: 0,
        createTime: new Date(),
        status: true
    }
    return { ...defaults, ...options }
}

export { initArticle }
export type { IArticle } 