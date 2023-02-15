import http from '@/apis/http'
import { IAccount } from '@/models/IAccount'

const $apiAccount = {
    list (params: { keyWord: string, status?: string, pageIndex?: number, pageSize?: number }) {
        return http<{ list: IAccount[], total: number }>({
            url: 'accounts',
            data: {
                keyWord: params.keyWord,
                status: params.status,
                pageIndex: params.pageIndex || 1,
                pageSize: params.pageSize || 10
            },
            loading: false
        })
    },
    create (account: IAccount) {
        return http<any>({
            url: 'accounts',
            method: 'POST',
            data: account
        })
    },
    update (account: IAccount) {
        return http<any>({
            url: `accounts/${account.id}`,
            method: 'PATCH',
            data: account
        })
    },
    delete (id: string) {
        return http<any>({
            url: `accounts/${id}`,
            method: 'DELETE'
        })
    }
}

export default $apiAccount