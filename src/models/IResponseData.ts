export default interface IResponseData<T> {
	data: T             // 响应数据
	code: string        // 错误编码，成功时 code 值为 '000'
	message: string     // 错误消息
}