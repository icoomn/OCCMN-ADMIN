import http from '@/apis/http'
import { IArticle } from '@/models/IArticle'

const $apiArticle = {
    list (params: { keyWord: string, status?: string, pageIndex?: number, pageSize?: number }) {
        return http<{ list: IArticle[], total: number }>({
            url: 'articles',
            data: {
                keyWord: params.keyWord,
                status: params.status,
                pageIndex: params.pageIndex || 1,
                pageSize: params.pageSize || 10
            },
            loading: false
        })
    },
	detail (id: string) {
		return http<IArticle>({
            url: `articles/${id}`,
            method: 'GET'
        })
	},
    create (article: IArticle) {
        return http<any>({
            url: 'articles',
            method: 'POST',
            data: article
        })
    },
    update (article: IArticle) {
        return http<any>({
            url: `articles/${article.id}`,
            method: 'PATCH',
            data: article
        })
    },
    delete (id: string) {
        return http<any>({
            url: `articles/${id}`,
            method: 'DELETE'
        })
    }
}

export default $apiArticle