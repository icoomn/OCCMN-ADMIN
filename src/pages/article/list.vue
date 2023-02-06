<template>
    <!-- 搜索 -->
    <div class="search">
        <div class="search__left">
            <el-input v-model="keyword" @change="search" clearable placeholder="输入标题搜索">
                <template #append>
                    <el-button :icon="Search" />
                </template>
            </el-input>
        </div>
        <div class="search__right">
            <el-button type="primary" :icon="CirclePlusFilled" @click="addArticle">新增</el-button>
        </div>
    </div>
    
    <!-- 列表 -->
    <el-table :data="list" :row-class-name="tableRowClassName">
        <el-table-column type="index" label="#" />
        <el-table-column prop="id" label="编号" width="120" />
        <el-table-column prop="title" label="标题" />
        <el-table-column prop="status" label="状态" width="150">
            <template #default="scope">
                <el-switch
                    v-model="scope.row.status"
                    inline-prompt
                    style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                    active-text="上架"
                    inactive-text="下架"
                />
            </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="180">
            <template #default="scope">
                <el-button type="danger" @click="delArticle(scope.row)">删除</el-button>
                <el-button type="primary" @click="editArticle(scope.row.id)">编辑</el-button>
            </template>
        </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination background
        hide-on-single-page
        layout="sizes, prev, pager, next, total, jumper"
        :total="1000"
        :page-sizes="[10, 15, 20, 25, 30]"
        style="margin-top: 20px;"
    />
</template>

<script lang="ts" setup>
    import { ref } from 'vue'
    import { IArticle, initArticle } from '../../models/IArticle'
    import { Search, CirclePlusFilled } from '@element-plus/icons-vue'
    import useConfirm from '../../hooks/useConfirm'
    import router from '@/routers/index'

    // 列表
    const list = ref<IArticle[]>([
        { id: '001', title: '这事文章的标题，你知道吗？', createTime: '2023-01-31', status: true },
        { id: '001', title: '这事文章的标题，你知道吗？', createTime: '2023-01-31', status: true },
        { id: '001', title: '这事文章的标题，你知道吗？', createTime: '2023-01-31', status: true },
        { id: '001', title: '这事文章的标题，你知道吗？', createTime: '2023-01-31', status: false },
        { id: '001', title: '这事文章的标题，你知道吗？', createTime: '2023-01-31', status: true },
        { id: '001', title: '这事文章的标题，你知道吗？', createTime: '2023-01-31', status: true },
        { id: '001', title: '这事文章的标题，你知道吗？', createTime: '2023-01-31', status: true },
        { id: '001', title: '这事文章的标题，你知道吗？', createTime: '2023-01-31', status: true },
        { id: '001', title: '这事文章的标题，你知道吗？', createTime: '2023-01-31', status: false },
        { id: '001', title: '这事文章的标题，你知道吗？', createTime: '2023-01-31', status: true }
    ])
    const tableRowClassName = ({ row } : { row: IArticle }) => {
        if (!row.status) {
            return 'danger-row'
        }
        return ''
    }

    // 搜索
    const keyword = ref('')
    const search = () => {

    }

    // 删除
    const { confirm } = useConfirm()
    const delArticle = (row: IArticle) => {
        confirm(`确定删除文章 [${row.title}] 吗？`, () => {})
    }

    const addArticle = () => {
        router.push('/article/add')
    }

    const editArticle = (id: string) => {
        router.push(`/article/add?id=${id}`)
    }
</script>

<style scoped>
    
</style>