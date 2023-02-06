import http from '@/apis/http'
import { IAccount } from '@/models/IAccount'

const $apiAccount = {
    getList () {
        return http<{ list: IAccount[], total: number }>({
            url: 'account/list',
            data: {
                name: '',
                pageIndex: 1,
                pageSize: 10
            },
            loading: true
        })
    },
    addOrEdit (account: IAccount) {
        return http<void>({
            url: 'account/addoredit',
            method: 'POST',
            data: account,
            loading: true
        })
    },
    getDetail (id: string) {
        return http<IAccount>({
            url: 'account/detail',
            data: { id }
        })
    },
    onOrOff (id: string) {
        return http<void>({
            url: 'account/onoroff',
            method: 'POST',
            data: { id }
        })
    },
    deleteOne (id: string) {
        return http<void>({
            url: 'account/deleteone',
            method: 'DELETE',
            data: { id }
        })
    }
}

export default $apiAccount