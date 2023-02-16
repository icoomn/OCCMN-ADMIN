<template>
    <div class="bodyer">
        <div class="bodyer-main">
            <div class="main-title"><input class="title" type="text" v-model="article.title" placeholder="请输入文章标题"></div>
            <div class="main-editor">
                <Editor
                    api-key="ezplca8k39c8ww5xkmly2tp03if9tht5lubgnzoutmhzsuqd"
                    :init="{
                        height: '900px',
                        language: 'zh_CN',
                        plugins: 'lists link image table code help wordcount'
                    }"
					v-model="article.content"
                />
            </div>
			<div class="main-intro">
				<el-input type="textarea" v-model="article.intro" placeholder="请输入文章简介，一段好的介绍更能吸引读者的目光~" :rows="5"></el-input>
			</div>
            <div class="main-uploader">
                <el-upload
                    drag
                    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                >
                    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                    <div class="el-upload__text">
                        上传文章封面图，可将图片拖到此处 或 <em>点击上传</em>
                    </div>
                    <template #tip>
                        <div class="el-upload__tip">
                            仅支持 JPEG/JPG/PNG 格式的图片，并且小于 500KB
                        </div>
                    </template>
                </el-upload>
            </div>
        </div>
    </div>
    <div class="footer">
        <div class="footer-main">
            <div><span>存为草稿则只在后台列表显示，相当于【下架】状态；发布则相当于【上架】，所有读者可见</span></div>
            <div>
                <el-button @click="router.back()">返回列表</el-button>
                <el-button type="primary" :icon="Promotion" @click="save">发布</el-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import Editor from '@tinymce/tinymce-vue'
	import { IArticle, initArticle } from '@/models/IArticle'
	import { ref } from 'vue'
	import $apiArticle from '@/apis/article'
	import { useRouter, useRoute } from 'vue-router'
	import { Promotion } from '@element-plus/icons-vue'

	const router = useRouter()
	const route = useRoute()
	const article = ref<IArticle>(initArticle())

	const detail = async () => {
		const id = route.query.id
		if (id) {
			const model = await $apiArticle.detail(id.toString())
			article.value = model
		}
	}

	detail()

	const save = async () => {
		await $apiArticle.create(article.value)
		router.back()
	}
</script>

<style scoped>
    .bodyer {
        margin-bottom: 80px;
    }
    .bodyer-main {
        width: 900px;
        min-height: 900px;
        margin: 0 auto;
    }
    .main-title {
        border-bottom: 1px dashed #eee;
    }
    .title {
        width: 860px;
        height: 40px;
        font-size: 30px;
        font-weight: bold;
        padding: 15px 0;
        border: none;
        outline: none;
    }
    .main-editor {
        height: 900px;
        background-color: #fff;
        margin-top: 30px;
    }

    .main-intro, .main-uploader {
        margin-top: 30px;
    }
    
    .footer {
        position: fixed;
        right: 0;
        bottom: 0;
        width: calc(100% - 150px);
        height: 60px;
        border-top: 1px solid #eee;
        background-color: #fff;
    }
    .footer-main {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 900px;
        height: 100%;
        margin: 0 auto;
        color: #999;
        font-size: 14px;
    }
</style>