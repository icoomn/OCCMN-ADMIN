<template>
    <div class="bodyer">
        <div class="bodyer-main">
            <div class="main-title"><input class="title" type="text" placeholder="请输入文章标题"></div>
            <div class="main-editor">
                <Editor
                    api-key="ezplca8k39c8ww5xkmly2tp03if9tht5lubgnzoutmhzsuqd"
                    :init="{
                        height: '900px',
                        language: 'zh_CN',
                        plugins: 'lists link image table code help wordcount'
                    }"
                />
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
                <el-button>存为草稿</el-button>
                <el-button type="primary">发布</el-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import Editor from '@tinymce/tinymce-vue'
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

    .main-uploader {
        margin-top: 30px;
    }
    
    .footer {
        position: fixed;
        right: 0;
        bottom: 0;
        width: calc(100% - 200px);
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