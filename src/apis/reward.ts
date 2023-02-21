import http from '@/apis/http'
import { IReward } from '@/models/IReward'

const $apiReward = {
    list (params: { pageIndex?: number, pageSize?: number }) {
        return http<{ list: IReward[], total: number }>({
            url: 'rewards',
            data: {
                pageIndex: params.pageIndex || 1,
                pageSize: params.pageSize || 10
            },
            loading: false
        })
    },
    create (reward: IReward) {
        return http<any>({
            url: 'rewards',
            method: 'POST',
            data: reward
        })
    },
    update (reward: IReward) {
        return http<any>({
            url: `rewards/${reward.id}`,
            method: 'PATCH',
            data: reward
        })
    },
    delete (id: string) {
        return http<any>({
            url: `rewards/${id}`,
            method: 'DELETE'
        })
    }
}

export default $apiReward