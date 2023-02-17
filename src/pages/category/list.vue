<template>
    <!-- 搜索 -->
    <div class="search">
        <div class="search__left">
            <div class="search__left-item">
                <el-input v-model="params.keyWord" @change="search" clearable placeholder="输入名称搜索">
                    <template #append>
                        <el-button :icon="Search" />
                    </template>
                </el-input>
            </div>
            <div class="search__left-item">
                <el-select v-model="params.status" @change="search" placeholder="分类状态" clearable>
                    <el-option label="启用" :value="true"></el-option>
                    <el-option label="禁用" :value="false"></el-option>
                </el-select>
            </div>
        </div>
        <div class="search__right">
            <el-button type="primary" :icon="CirclePlusFilled" @click="add('分类')">新增</el-button>
        </div>
    </div>
    
    <!-- 列表 -->
    <el-table :data="list" stripe>
        <el-table-column type="index" label="#" />
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="sort" label="排序" />
        <el-table-column prop="createTime" label="创建时间">
            <template #default="scope">
                {{ dateFormat(scope.row.createTime) }}
            </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" align="center">
            <template #default="scope">
                <el-switch
                    v-model="scope.row.status"
                    inline-prompt
                    style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                    active-text="启用"
                    inactive-text="禁用"
					@change="$apiCategory.update(scope.row)"
                />
            </template>
        </el-table-column>
        <el-table-column label="操作" align="right" width="230">
            <template #default="scope">
                <el-button type="danger" :icon="Delete" @click="remove(scope.row)">删除</el-button>
                <el-button type="primary" :icon="Edit" @click="edit(scope.row, '分类')">编辑</el-button>
            </template>
        </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination background
        hide-on-single-page
        layout="sizes, prev, pager, next, total, jumper"
        :total="paging.total"
        v-model:page-size="paging.pageSize"
        v-model:current-page="paging.pageIndex"
        :page-sizes="[10, 15, 20, 25, 30]"
        @current-change="getList"
        @size-change="getList"
        style="margin-top: 20px;"
    />

    <!-- 新增/编辑 -->
    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="500px">
        <el-form :model="category">
            <el-form-item label="名称">
                <el-input v-model="category.name" />
            </el-form-item>
            <el-form-item label="排序">
                <el-input v-model.number="category.sort" type="number" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="save">确定</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
    import { reactive } from 'vue'
    import { ICategory, initCategory } from '../../models/ICategory'
    import { Search, CirclePlusFilled, Delete, Edit } from '@element-plus/icons-vue'
    import { dateFormat } from '@/utils/dateFormat'
	import $apiCategory from '@/apis/categories'
    import useConfirm from '../../hooks/useConfirm'
	import useListPage from '../../hooks/useListPage'
    import useModify from '@/hooks/useModify'

    // 列表
    const params = reactive({ keyWord: '', status: '' })
	const {
        list,
        paging,
        getList,
        search
    } = useListPage<ICategory>($apiCategory.list, params)
    getList()
	
    // 删除
    const { confirm } = useConfirm()
    const remove = (row: ICategory) => {
        confirm(`确定删除分类 [${row.name}] 吗？`, () => {
			$apiCategory.delete(row.id!).then(() => {
                getList()
            })
		})
    }

    // 编辑新增
    const {
        dialogVisible,
        dialogTitle,
        model: category,
        add,
        edit
    } = useModify<ICategory>(initCategory)
	const save = async () => {
        if (category.value.id) {
            await $apiCategory.update(category.value)
        } else {
            await $apiCategory.create(category.value)
        }
        dialogVisible.value = false
        getList()
    }
</script>