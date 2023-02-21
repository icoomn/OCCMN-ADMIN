import http from '@/apis/http'
import { IRole } from '@/models/IRole'

const $apiRole = {
    list (params: { pageIndex?: number, pageSize?: number }) {
        return http<{ list: IRole[], total: number }>({
            url: 'roles',
            data: {
                pageIndex: params.pageIndex || 1,
                pageSize: params.pageSize || 10
            },
            loading: false
        })
    },
    create (role: IRole) {
        return http<any>({
            url: 'roles',
            method: 'POST',
            data: role
        })
    },
    update (role: IRole) {
        return http<any>({
            url: `roles/${role.id}`,
            method: 'PATCH',
            data: role
        })
    },
    delete (id: string) {
        return http<any>({
            url: `roles/${id}`,
            method: 'DELETE'
        })
    }
}

export default $apiRole