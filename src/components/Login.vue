<template>
    <div class="container" :style="{width:'1500px',height:'900px',background:'url('+ bg +')no-repeat'}" >

        <div class="box" @keyup.enter="Login">
            <div class="title">
                <h3>
                    万达停车管理系统
                </h3>
            </div>  
            <div style="margin: 20px;"></div>
            <el-form :label-position="labelPosition" label-width="80px" >
            <el-form-item label="账号" style="padding=0">
                <el-input v-model="formInfo.name"></el-input>
            </el-form-item>
            <el-form-item label="密码" style="padding=0">
                <el-input placeholder="请输入密码" v-model="formInfo.pwd" show-password></el-input>
            </el-form-item> 
            <el-form-item label="验证码" style="padding=0">
                <div>   
                    <Captcha @func="show"/>
                </div> 
                <el-input v-model="formInfo.vrt"></el-input>
            </el-form-item>
            </el-form>
            <div class="btn">
                <router-link to="/login"><el-button type="primary" @click="Login" @keyup.enter.native="Login">登录</el-button></router-link>
                <router-link to="/regintser"><el-button type="success" >注册</el-button></router-link>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Captcha from '../components/Captcha'
export default {
    data() {
        return {
            bg:require('../../public/preview3.jpg'),
            labelPosition: 'top',
            img:'',
            formInfo: {
            name: '',
            pwd:'',
            },
            vrt:''
        };
    },
    components: {
        Captcha
    },
    methods: {
        show(res){
             this.vrt = res
        },
        Login(){
            let msg = JSON.stringify(this.formInfo);
            let vrt1 = JSON.stringify(this.vrt);
            let postData = this.$qs.stringify({
                data:msg,
                vrt:vrt1
            })
            let app = this
            if(this.vrt !== app.formInfo.vrt){
                alert("验证错误！")
                return false;
            }
            axios.post('http://47.94.38.46:80/home/home/carcheck',postData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                }
            }).then((res) => {
                if(res.data ==2){
                    alert("账号或密码错误")
                }
                else if(typeof(res.data)!=="number"){
                    localStorage.car_root_name = app.formInfo.name
                    localStorage.car_root_id = res.data[1]
                    localStorage.power = res.data[2]
                    localStorage.token1 = res.data[0]
                    this.$router.push('/home/manage');
                }
            }).catch((error) => {
                    // console.log(error)
                    alert("登陆失败！")
            })
        },
    },
    mounted() {
    },
}
</script>

<style lang="stylus" scoped>
html,body{
    overflow hidden
}

.container
    padding 0
    margin 0
    background-size:cover;
    background-attachment:fixed;
    background-color:#CCCCCC;
    @media screen and (min-width: 1500px) {
        width 1500px
    }
    .box
        z-index 999
        width 20%
        color  blue
        background: rgb(206, 234, 236);
        position: absolute;
        right: 90px;
        top: 140px;
        border-radius 5px
        @media screen and (max-width: 700px) {
            width 100%
            right 0
            top 10px
        }
        .btn
            display: flex;
            justify-content: space-between;
</style>
