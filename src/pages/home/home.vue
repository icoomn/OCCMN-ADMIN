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
                        <span @click="doRefresh"><el-icon><Refresh /></el-icon>&nbsp;刷新</span>
                    </div>
                </div>
                <div class="header__quit">
                    <el-dropdown @command="handleCommand">
                        <span class="el-dropdown-link">
                            <span>管理员</span>
                            <el-icon class="el-icon--right">
                                <arrow-down />
                            </el-icon>
                        </span>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item command="modify">修改密码</el-dropdown-item>
                                <el-dropdown-item command="logout" divided>退出登陆</el-dropdown-item>
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
				<el-menu-item index="/role/list">
                    <el-icon><Medal /></el-icon>
                    <span>角色管理</span>
                </el-menu-item>
				<el-menu-item index="/role/list">
                    <el-icon><Unlock /></el-icon>
                    <span>权限管理</span>
                </el-menu-item>
                <el-menu-item index="/account/list">
                    <el-icon><User /></el-icon>
                    <span>账户管理</span>
                </el-menu-item>
				<el-menu-item index="/article/list">
                    <el-icon><Memo /></el-icon>
                    <span>文章管理</span>
                </el-menu-item>
				<el-menu-item index="/article/comment">
                    <el-icon><ChatDotRound /></el-icon>
                    <span>评论管理</span>
                </el-menu-item>
				<el-menu-item index="/reward/list">
                    <el-icon><Bowl /></el-icon>
                    <span>打赏管理</span>
                </el-menu-item>
                <el-menu-item index="/category/list">
                    <el-icon><Operation /></el-icon>
                    <span>分类管理</span>
                </el-menu-item>
            </el-menu>
            <el-main style="height: calc(100vh - 60px);"><router-view v-if="refresh"></router-view></el-main>
        </el-container>
    </el-container>

    <!-- 修改密码 -->
    <el-dialog v-model="dialogVisible" title="修改密码" width="500px">
        <el-form :model="password" :rules="rules" ref="ruleFormRef">
            <el-form-item label="原密码" prop="old">
                <el-input v-model="password.old" type="password" placeholder="请输入原密码" />
            </el-form-item>
            <el-form-item label="新密码" prop="new">
                <el-input v-model="password.new" type="password" placeholder="请输入新密码" />
            </el-form-item>
            <el-form-item label="新密码" prop="newRepeat">
                <el-input v-model="password.newRepeat" type="password" placeholder="请确认新密码" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="modifyPassword(ruleFormRef)">确定</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
    import { useRoute, useRouter } from 'vue-router'
    import { reactive, ref, watch } from 'vue'
    import { FormRules, FormInstance } from 'element-plus'

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

    // 刷新
    const refresh = ref<boolean>(true)
    const doRefresh = () => {
        refresh.value = false
        setTimeout(() => refresh.value = true, 10)
    }

    // 修改密码
    const ruleFormRef = ref<FormInstance>()
    const dialogVisible = ref(false)
    const password = reactive({ old: '', new: '', newRepeat: '' })
    const handleCommand = (command: string) => {
        if (command === 'logout') {
            router.replace('/login')
        } else {
            password.old = ''
            password.new = ''
            password.newRepeat = ''
            dialogVisible.value = true
        }
    }
    const modifyPassword = (formEl: FormInstance | undefined) => {
        if (!formEl) return
        formEl.validate(valid => {
            if (valid) {
                dialogVisible.value = false
            } else {
                return false
            }
        })
    }
    const compareNewPassword = (rule: any, value: any, callback: any) => {
        if (value !== password.new) {
            callback(new Error('两次密码不一致'))
        } else {
            callback()
        }
    }
    const rules = reactive<FormRules>({
        old: [{ required: true, message: '请输入原密码', trigger: 'blur' }],
        new: [{ required: true, message: '请输入新密码', trigger: 'blur' }],
        newRepeat: [
            { required: true, message: '请输入新密码', trigger: 'blur' },
            { validator: compareNewPassword, trigger: 'blur' }
        ]
    })
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
	:deep(.el-menu-item) {
		padding-right: 45px;
	}
</style>