<template>
    <div class="wrapper">
        <el-icon :size="80" color="gray"><ColdDrink /></el-icon>
        <span class="tips">Oops, 您要找的页面丢失了～</span>
    </div>
</template>

<script lang="ts" setup>
    
</script>

<style scoped>
    .wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;
    }
    .tips {
        margin-top: 20px;
        color: #999;
        font-size: 20px;
    }
</style>