import { reactive, Ref, ref, toRef } from "vue"
import { IPaging, initPaging } from "../models/IPaging"

// 将params参数限定为object对象类型
interface IParams {
    [key: string]: unknown
}

interface IResult<T> {
    list: T[],
    total: number
}

export default <T>(listRequest: Function, params: IParams) => {
    const list = ref<T[]>([]) as Ref<T[]>
    const paging:IPaging = reactive(initPaging())
    const getList = async () => {
        const result:IResult<T> = await listRequest({ ...params, ...paging })
        list.value = result.list
        paging.total = result.total
    }
    return { list, paging, getList }
}