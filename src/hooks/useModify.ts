import { ref } from "vue"

export default <T>(init: Function) => {
    const dialogVisible = ref(false)
    const dialogTitle = ref('')
    const model = ref<T>(init())

    const add = (title?: string) => {
        model.value = init()
        dialogTitle.value = `新增${title}`
        dialogVisible.value = true
    }

    const edit = (row: T, title?: string) => {
        model.value = init(row)
        dialogTitle.value = `编辑${title}`
        dialogVisible.value = true
    }

    return {
        dialogVisible,
        dialogTitle,
        model,
        add,
        edit
    }
}