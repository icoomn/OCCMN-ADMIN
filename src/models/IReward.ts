interface IReward {
    id?: string
    amount: number
    payMethod: string
    createTime?: Date
}

// 初始化默认值对象
const initReward = (options?: Partial<IReward>):IReward => {
    const defaults = {
        amount: 0,
        payMethod: '',
        createTime: new Date(),
    }
    return { ...defaults, ...options }
}

export { initReward }
export type { IReward }
