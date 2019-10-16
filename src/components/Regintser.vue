<template>
    <div>
        <el-input v-model="uid" placeholder="请输入账号"></el-input>
        <el-input placeholder="请输入密码" v-model="pwd" show-password></el-input>
        <el-input placeholder="请确认密码" v-model="repwd" show-password></el-input>
        <p v-text="data"></p>
        <el-button round @click="reginster">注册</el-button>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            uid:'',
            pwd:'',
            repwd:'',
            data:''
        }
    },
    methods: {
        reginster(){
            if(this.pwd != this.repwd){
                this.data = "两次密码不一致"
                return false
            }
            let msg = {
                name:this.uid,
                pwd:this.pwd,
                power:'管理员'
            }
            let data = JSON.stringify(msg);
            let postData = this.$qs.stringify({
                data:msg
            })
            axios.post("http://47.94.38.46:80/home/home/userSave",postData,{
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                }
            }).then((res)=>{
                    // alert("注册成功！")
                    this.$router.push('/login');
            }).catch((err)=>{
                // console.log(err)
                alert("注册失败！")
            })
        
        },
    }

}
</script>

<style>

</style>
