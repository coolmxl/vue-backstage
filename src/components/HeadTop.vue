<template>
    <div class="mybtn">
            <el-button  style="font-weight:700;" round @click="removeLocal">退出登录</el-button>
            <p>{{cRoot}}</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // currentRoot:''
        }
    },
    computed: {
        cRoot() {
            if(localStorage.power === 0){
                return "超级管理员" + localStorage.car_root_name + ' ' + "欢迎您"
            }            
            else{
                return "管理员" + localStorage.car_root_name + ' ' + "欢迎您"
            }
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

<style lang="stylus" scoped>
.mybtn
    display inline-flex
    p
        font-size 15px
        font-weight 700
        color #606266
        line-height 10px
</style>