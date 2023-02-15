import http from '@/apis/http'
import { ICategory } from '@/models/ICategory'

const $apiCategory = {
    list (params: { keyWord: string, status?: string, pageIndex?: number, pageSize?: number }) {
        return http<{ list: ICategory[], total: number }>({
            url: 'categories',
            data: {
                keyWord: params.keyWord,
                status: params.status,
                pageIndex: params.pageIndex || 1,
                pageSize: params.pageSize || 10
            },
            loading: false
        })
    },
    create (category: ICategory) {
        return http<any>({
            url: 'categories',
            method: 'POST',
            data: category
        })
    },
    update (category: ICategory) {
        return http<any>({
            url: `categories/${category.id}`,
            method: 'PATCH',
            data: category
        })
    },
    delete (id: string) {
        return http<any>({
            url: `categories/${id}`,
            method: 'DELETE'
        })
    }
}

export default $apiCategory