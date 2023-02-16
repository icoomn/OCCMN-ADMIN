<template>
    <!-- 搜索 -->
    <div class="search">
        <div class="search__left">
            <div class="search__left-item">
                <el-input v-model="params.keyWord" @change="search" clearable placeholder="输入姓名搜索">
                    <template #append>
                        <el-button :icon="Search" />
                    </template>
                </el-input>
            </div>
            <div class="search__left-item">
                <el-select v-model="params.status" @change="search" placeholder="账号状态" clearable>
                    <el-option label="启用" :value="true"></el-option>
                    <el-option label="禁用" :value="false"></el-option>
                </el-select>
            </div>
        </div>
        <div class="search__right">
            <el-button type="primary" :icon="CirclePlusFilled" @click="add('账户')">新增</el-button>
        </div>
    </div>
    
    <!-- 列表 -->
    <el-table :data="list" stripe>
        <el-table-column type="index" label="#" />
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="password" label="密码" />
        <el-table-column prop="createTime" label="创建时间" />
        <el-table-column prop="status" label="状态" width="150" align="center">
            <template #default="scope">
                <el-switch
                    v-model="scope.row.status"
                    inline-prompt
                    style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                    active-text="启用"
                    inactive-text="禁用"
                    @change="$apiAccount.update(scope.row)"
                />
            </template>
        </el-table-column>
        <el-table-column label="操作" align="right" width="230">
            <template #default="scope">
                <el-button type="danger" :icon="Delete" @click="remove(scope.row)">删除</el-button>
                <el-button type="primary" :icon="Edit" @click="edit(scope.row, '账户')">编辑</el-button>
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
        <el-form :model="account">
            <el-form-item label="姓名">
                <el-input v-model="account.name" />
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="account.password" type="password" :disabled="!!account.id" />
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
    import { IAccount, initAccount } from '../../models/IAccount'
    import { Search, CirclePlusFilled, Delete, Edit } from '@element-plus/icons-vue'
    import useConfirm from '../../hooks/useConfirm'
    import useListPage from '@/hooks/useListPage'
    import useModify from '@/hooks/useModify'
    import $apiAccount from '@/apis/account'

    // 列表
    const params = reactive({ keyWord: '', status: '' })
	const {
        list,
        paging,
        getList,
        search
    } = useListPage<IAccount>($apiAccount.list, params)
    getList()

    // 删除
    const { confirm } = useConfirm()
    const remove = (row: IAccount) => {
        confirm(`确定删除账户 [${row.name}] 吗？`, () => {
            $apiAccount.delete(row.id!).then(() => {
                getList()
            })
        })
    }

    // 编辑新增
    const {
        dialogVisible,
        dialogTitle,
        model: account,
        add,
        edit
    } = useModify<IAccount>(initAccount)
    const save = async () => {
        if (account.value.id) {
            await $apiAccount.update(account.value)
        } else {
            await $apiAccount.create(account.value)
        }
        dialogVisible.value = false
        getList()
    }
</script>