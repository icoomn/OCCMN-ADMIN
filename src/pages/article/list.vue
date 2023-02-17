<template>
    <!-- 搜索 -->
    <div class="search">
        <div class="search__left">
            <el-input v-model="params.keyWord" @change="search" clearable placeholder="输入标题搜索">
                <template #append>
                    <el-button :icon="Search" />
                </template>
            </el-input>
        </div>
        <div class="search__right">
            <el-button type="primary" :icon="CirclePlusFilled" @click="add">新增</el-button>
        </div>
    </div>
    
    <!-- 列表 -->
    <el-table :data="list" stripe>
        <el-table-column type="index" label="#" />
        <el-table-column prop="title" label="标题" width="300" show-overflow-tooltip />
		<el-table-column prop="title" label="封面图" width="175">
			<template #default="scope">
                <div class="img-wrapper">
                    <img :src="scope.row.coverPicture" class="cover-img" :alt="scope.row.title">
                </div>
			</template>
		</el-table-column>
		<el-table-column prop="viewCount" label="阅读量" align="center" />
		<el-table-column prop="createTime" label="创建时间" width="120">
            <template #default="scope">
                {{ dateFormat(scope.row.createTime) }}
            </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="150" align="center">
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
        <el-table-column label="操作" align="right" width="230">
            <template #default="scope">
                <el-button type="danger" :icon="Delete" @click="remove(scope.row)">删除</el-button>
                <el-button type="primary" :icon="Edit" @click="edit(scope.row.id)">编辑</el-button>
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
</template>

<script lang="ts" setup>
    import { reactive } from 'vue'
    import { IArticle } from '../../models/IArticle'
    import { Search, CirclePlusFilled, Delete, Edit } from '@element-plus/icons-vue'
    import { dateFormat } from '@/utils/dateFormat'
    import useConfirm from '../../hooks/useConfirm'
	import useListPage from '@/hooks/useListPage'
	import { useRouter } from 'vue-router'
	import $apiArticle from '@/apis/article'

	// 列表
    const params = reactive({ keyWord: '', status: '' })
	const {
        list,
        paging,
        getList,
        search
    } = useListPage<IArticle>($apiArticle.list, params)
    getList()
	
    // 删除
    const { confirm } = useConfirm()
    const remove = (row: IArticle) => {
        confirm(`确定删除文章 [${row.title}] 吗？`, () => {
			$apiArticle.delete(row.id!).then(() => {
                getList()
            })
		})
    }

	const router = useRouter()
    const add = () => {
        router.push('/article/add')
    }
    const edit = (id: string) => {
        router.push(`/article/add?id=${id}`)
    }
</script>

<style scoped>
.img-wrapper {
    line-height: 0;
}
.cover-img {
    width: 150px;
    height: 30px;
	border-radius: 4px;
}
</style>