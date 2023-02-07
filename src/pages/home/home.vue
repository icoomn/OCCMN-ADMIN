<template>
    <el-container>
        <el-header style="background-color: #f5f5f5;">
            <div class="header">
                <div class="header-left-wrapper">
                    <div class="header__logo">
                        <span>OCCMN</span>
                        <el-icon style="cursor: pointer;" class="collapse-icon" @click="isCollapse = !isCollapse">
                            <Expand v-show="isCollapse" />
                            <Fold v-show="!isCollapse" />
                        </el-icon>
                    </div>
                    <div class="header__tool">
                        <span @click="router.back()"><el-icon><ArrowLeft /></el-icon>&nbsp;返回</span>
                        <span @click="fullScreen"><el-icon><FullScreen /></el-icon>&nbsp;全屏</span>
                        <span @click="router.go(0)"><el-icon><Refresh /></el-icon>&nbsp;刷新</span>
                    </div>
                </div>
                <div class="header__quit">
                    <el-dropdown>
                        <span class="el-dropdown-link">
                            <span>管理员</span>
                            <el-icon class="el-icon--right">
                                <arrow-down />
                            </el-icon>
                        </span>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item>修改密码</el-dropdown-item>
                                <el-dropdown-item divided>退出登陆</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>
            </div>
        </el-header>
        <el-container>
            <el-menu style="height: calc(100vh - 60px);"
                active-text-color="#ffd04b"
                background-color="#545c64"
                :default-active="menuDefaultActive"
                :collapse="isCollapse"
                text-color="#fff"
                router
            >
                <el-menu-item index="/dashboard">
                    <el-icon><DataLine /></el-icon>
                    <span>数据看板</span>
                </el-menu-item>
                <el-menu-item index="/account/list">
                    <el-icon><User /></el-icon>
                    <span>账户管理</span>
                </el-menu-item>
                <el-sub-menu index="/article">
                    <template #title>
                        <el-icon><Memo /></el-icon>
                        <span>文章管理</span>
                    </template>
                    <el-menu-item index="/article/list">文章列表</el-menu-item>
                    <el-menu-item index="/article/comment">文章评论</el-menu-item>
                </el-sub-menu>
                <el-menu-item index="/product/list">
                    <el-icon> <Handbag /></el-icon>
                    <span>商品管理</span>
                </el-menu-item>
                <el-menu-item index="/category/list">
                    <el-icon><Operation /></el-icon>
                    <span>分类管理</span>
                </el-menu-item>
            </el-menu>
            <el-main style="height: calc(100vh - 60px);"><router-view></router-view></el-main>
        </el-container>
    </el-container>
</template>

<script lang="ts" setup>
    import { useRoute, useRouter } from 'vue-router'
    import { ref, watch } from 'vue'

    const route = useRoute()
    const router = useRouter()

    // 根据路由选中菜单
    const menuDefaultActive = ref('/dashboard')
    watch(() => route.path, (newValue) => { menuDefaultActive.value = newValue }, { immediate: true })

    // 菜单折叠
    const isCollapse = ref(false)

    // 全屏功能
    const fullScreen = () => {
        const doc = document as any
        let isFull = doc.isFullScreen || doc.mozIsFullScreen || doc.webkitIsFullScreen
        if (isFull) {
            let close = doc.exitFullscreen || doc.webkitCancelFullScreen ||
                doc.mozCancelFullScreen || doc.msExitFullscreen
            close && close.call(doc)
        } else {
            let docElm = document.documentElement as any
            let open = docElm.requestFullScreen || docElm.webkitRequestFullScreen ||
                docElm.mozRequestFullScreen || docElm.msRequestFullscreen
            open && open.call(docElm)
        }
    }
</script>

<style scoped>
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 100%;
    }
    .header-left-wrapper {
        display: flex;
    }
    .header__logo {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 130px;
        margin-right: 20px;
    }
    .header__tool {
        display: flex;
    }
    .header__tool span {
        display: flex;
        align-items: center;
        margin-right: 20px;
        font-size: 14px;
        cursor: pointer;
    }
</style>