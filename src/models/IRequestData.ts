export default interface IRequestData {
    url: string
    method?: 'GET' | 'POST' | 'PATCH' | 'DELETE'
    data?: any
    loading?: boolean
}