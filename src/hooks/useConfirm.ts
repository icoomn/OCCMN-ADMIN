import { ElMessageBox, ElMessage } from "element-plus"

export default () => {
    const confirm = (message: string, callback: Function) => {
        ElMessageBox.confirm(message, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => { callback() }).catch(() => {})
    }
    return { confirm }
}