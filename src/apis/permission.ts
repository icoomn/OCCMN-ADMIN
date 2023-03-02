import http from '@/apis/http'
import { IPermission } from '@/models/IPermission'

const $apiPermission = {
    list (params: { keyWord: string, pageIndex?: number, pageSize?: number }) {
        return http<{ list: IPermission[], total: number }>({
            url: 'permissions',
            data: {
				keyWord: params.keyWord,
                pageIndex: params.pageIndex || 1,
                pageSize: params.pageSize || 10
            },
            loading: false
        })
    },
    create (permission: IPermission) {
        return http<any>({
            url: 'permissions',
            method: 'POST',
            data: permission
        })
    },
    update (permission: IPermission) {
        return http<any>({
            url: `permissions/${permission.id}`,
            method: 'PATCH',
            data: permission
        })
    },
    delete (id: string) {
        return http<any>({
            url: `permissions/${id}`,
            method: 'DELETE'
        })
    }
}

export default $apiPermission