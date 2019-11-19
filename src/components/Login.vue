<template>
    <div class="fa">
        <div class="container" :style="{    width: '1536px',
            height: '721px',background:'url('+ bg +')no-repeat'}" >
        </div>
        <div class="box" @keyup.enter="Login">
            <div class="title">
                <h3 style="text-align:center">
                    阳光停车管理系统
                </h3>
            </div>  
            <el-form :label-position="labelPosition" label-width="80px" class="fzw">
                <el-form-item label="账号" style="margin:0" >
                    <el-input placeholder="请输入账户" v-model="formInfo.name"></el-input>
                </el-form-item>
                <el-form-item label="密码"  style="margin:0">
                    <el-input placeholder="请输入密码" v-model="formInfo.pwd" show-password></el-input>
                </el-form-item> 
                <el-form-item  label="验证码"  style="margin:0">
                    <div>   
                        <Captcha @func="show"/>
                    </div> 
                    <el-input v-model="formInfo.vrt"></el-input>
                </el-form-item>
            </el-form>
            <div class="btn">
                <router-link to="/login"><el-button  id="lol"  type="primary" @click="Login" @keyup.enter="Login">登录</el-button></router-link>
                <!-- <router-link to="/regintser"><el-button type="success" >注册</el-button></router-link> -->
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
                console.log(res);
                
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
.fa{
    overflow hidden
}
.container
    padding 0
    margin 0
    background-size:cover;
    background-attachment:fixed;
    background-color:#CCCCCC;
    opacity 0.7
    @media screen and (min-width: 1500px) {
        width 1500px
    }
#lol
    width 77%
.fzw
    font-weight: 700;
.box
    position fixed
    z-index 999
    width 30%
    color  blue
    background: #7db7ff;
    position: absolute;
    left 37%
    top: 21%;
    border-radius 5px

    @media screen and (max-width: 700px) {
        width 100%
        left 0%
        top 21%
    }
    @media screen and (max-width: 376px) {
        width 100%
        left 0%
        top 0%
        height 667px
    }
    .btn
        margin-left: 18%;
        margin-top: 5%;
@media screen and (max-width: 955px) {
    #lol {
    }
}
@media screen and (max-width: 700px) {
    #lol {
    }
}
@media screen and (max-width: 376px) {
    .fa{
        height 667px
        overflow hidden
    }
}
</style>
