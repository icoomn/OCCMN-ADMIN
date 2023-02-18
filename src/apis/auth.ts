import http from '@/apis/http'

const $apiAuth = {
    login (name: string, password: string) {
        return http<any>({
            url: `auth/login`,
            method: 'POST',
            data: {
                name,
                password
            }
        })
    }
}

export default $apiAuth