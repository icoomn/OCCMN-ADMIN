<template>
    <!-- 搜索 -->
    <div class="search">
        <div class="search__left">
            <el-input v-model="keyword" @change="search" clearable placeholder="输入名称搜索">
                <template #append>
                    <el-button :icon="Search" />
                </template>
            </el-input>
        </div>
        <div class="search__right">
            <el-button type="primary" :icon="CirclePlusFilled" @click="addCategory">新增</el-button>
        </div>
    </div>
    
    <!-- 列表 -->
    <el-table :data="list" :row-class-name="tableRowClassName">
        <el-table-column type="index" label="#" />
        <el-table-column prop="id" label="编号" />
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="sort" label="排序" />
        <el-table-column prop="createTime" label="创建时间" />
        <el-table-column prop="status" label="状态">
            <template #default="scope">
                <el-switch
                    v-model="scope.row.status"
                    inline-prompt
                    style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                    active-text="启用"
                    inactive-text="禁用"
                />
            </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="230">
            <template #default="scope">
                <el-button type="danger" @click="delCategory(scope.row)">删除</el-button>
                <el-button type="primary" @click="editCategory(scope.row)">编辑</el-button>
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

    <!-- 新增/编辑 -->
    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="500px">
        <el-form :model="category">
            <el-form-item label="名称">
                <el-input v-model="category.name" />
            </el-form-item>
            <el-form-item label="排序">
                <el-input v-model="category.sort" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确定</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
    import { ref } from 'vue'
    import { ICategory, initCategory } from '../../models/ICategory'
    import { Search, CirclePlusFilled } from '@element-plus/icons-vue'
    import useConfirm from '../../hooks/useConfirm'

    // 列表
    const list = ref<ICategory[]>([
        { id: '001', name: 'HTML/CSS', sort: '001233', createTime: '2023-01-31', status: true },
        { id: '001', name: 'JAVASCRIPT', sort: '001233', createTime: '2023-01-31', status: true },
        { id: '001', name: 'VUE', sort: '001233', createTime: '2023-01-31', status: true },
        { id: '001', name: 'NODEJS', sort: '001233', createTime: '2023-01-31', status: false },
        { id: '001', name: 'DEVTOOL', sort: '001233', createTime: '2023-01-31', status: true },
        { id: '001', name: 'SQL', sort: '001233', createTime: '2023-01-31', status: true },
        { id: '001', name: 'UNIAPP', sort: '001233', createTime: '2023-01-31', status: true },
        { id: '001', name: 'C#/.NET', sort: '001233', createTime: '2023-01-31', status: true },
        { id: '001', name: '电子游戏', sort: '001233', createTime: '2023-01-31', status: false },
        { id: '001', name: '生活随笔', sort: '001233', createTime: '2023-01-31', status: true }
    ])
    const tableRowClassName = ({ row } : { row: ICategory }) => {
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
    const delCategory = (row: ICategory) => {
        confirm(`确定删除分类 [${row.name}] 吗？`, () => {})
    }

    // 编辑新增
    const dialogVisible = ref(false)
    const dialogTitle = ref('')
    const category = ref<ICategory>(initCategory())
    const addCategory = () => {
        category.value = initCategory()
        dialogTitle.value = '新增分类'
        dialogVisible.value = true
    }
    const editCategory = (row: ICategory) => {
        category.value = row
        dialogTitle.value = '编辑分类'
        dialogVisible.value = true
    }
</script>

<style scoped>
</style>