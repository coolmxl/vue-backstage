<template>
    <div>
        <el-row>
            <el-button round @click="removeLocal">退出登录</el-button>
        </el-row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    methods: {
        removeLocal() {
            localStorage.removeItem('token1')
            localStorage.removeItem('car_root_name');
            localStorage.removeItem('car_root_id');
            localStorage.removeItem('power')
            location.reload();
        }
    },
}
</script>

<style lang="stylus">

</style>