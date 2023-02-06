interface IPaging {
    pageIndex: number   // 当前页
    pageSize: number    // 每页显示条数
    total?: number      // 总条数
}

const initPaging = (options?: Partial<IPaging>):IPaging => {
    const defaults:IPaging = {
        pageIndex: 1,
        pageSize: 10,
        total: 0
    }
    return { ...defaults, ...options }
}

export { initPaging }
export type { IPaging }