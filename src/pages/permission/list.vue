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
        </div>
        <div class="search__right">
            <el-button type="primary" :icon="CirclePlusFilled" @click="add('权限')">新增</el-button>
        </div>
    </div>
    
    <!-- 列表 -->
    <el-table :data="list" stripe>
        <el-table-column type="index" label="#" width="200" />
		<el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="type" label="类型" align="center">
			<template #default="scope">
                {{ scope.row.type === 0 ? '菜单级' : '按钮级' }}
            </template>
		</el-table-column>
        <el-table-column prop="path" label="路由" align="center" />
		<el-table-column prop="parentId" label="所属上级" align="center" />
        <el-table-column label="操作" align="right" width="230">
            <template #default="scope">
                <el-button type="danger" :icon="Delete" @click="remove(scope.row)">删除</el-button>
                <el-button type="primary" :icon="Edit" @click="edit(scope.row, '权限')">编辑</el-button>
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
        <el-form :model="permission">
            <el-form-item label="名称">
                <el-input v-model="permission.name" />
            </el-form-item>
            <el-form-item label="类型">
                <el-select v-model="permission.type" style="width: 100%">
					<el-option label="菜单级" :value="0"></el-option>
					<el-option label="按钮级" :value="1"></el-option>
				</el-select>
            </el-form-item>
			<el-form-item label="路由">
                <el-input v-model="permission.path" />
            </el-form-item>
			<el-form-item label="上级">
				<el-select v-model="permission.parentId" style="width: 100%">
					<el-option label="无" value="00000000-0000-0000-0000-000000000000"></el-option>
					<el-option label="菜单级" value="1"></el-option>
					<el-option label="按钮级" value="2"></el-option>
				</el-select>
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
	import { IPermission, initPermission } from '../../models/IPermission'
    import { Search, CirclePlusFilled, Delete, Edit } from '@element-plus/icons-vue'
    import { dateFormat } from '@/utils/dateFormat'
	import $apiPermission from '@/apis/permission'
    import useConfirm from '../../hooks/useConfirm'
	import useListPage from '../../hooks/useListPage'
    import useModify from '@/hooks/useModify'

    // 列表
    const params = reactive({ keyWord: '' })
	const {
        list,
        paging,
        getList,
        search
    } = useListPage<IPermission>($apiPermission.list, params)
    getList()
	
    // 删除
    const { confirm } = useConfirm()
    const remove = (row: IPermission) => {
        confirm(`确定删除权限 [${row.name}] 吗？`, () => {
			$apiPermission.delete(row.id!).then(() => {
                getList()
            })
		})
    }

    // 编辑新增
    const {
        dialogVisible,
        dialogTitle,
        model: permission,
        add,
        edit
    } = useModify<IPermission>(initPermission)
	const save = async () => {
        if (permission.value.id) {
            await $apiPermission.update(permission.value)
        } else {
            await $apiPermission.create(permission.value)
        }
        dialogVisible.value = false
        getList()
    }
</script>

<style>
	
</style>