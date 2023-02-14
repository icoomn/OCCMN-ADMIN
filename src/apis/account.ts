import http from '@/apis/http'
import { IAccount } from '@/models/IAccount'

const $apiAccount = {
    list (params: { keyWord: string, status?: boolean, pageIndex?: number, pageSize?: number }) {
        return http<{ list: IAccount[], total: number }>({
            url: 'accounts',
            data: {
                name: params.keyWord,
                pageIndex: params.pageIndex || 1,
                pageSize: params.pageSize || 10
            },
            loading: true
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