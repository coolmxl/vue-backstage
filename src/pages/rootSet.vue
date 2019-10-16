<template>
    <div class="fillcontain">
	    <head-top></head-top>
        <header class="admin_title">当前管理员信息</header>
        <div class="admin_set">
            <ul>
                <li>
                    <span>姓名：</span><span>{{adminInfo.name}}</span>
                </li>
                <li>
                    <span>管理员权限：</span><span>{{adminInfo.power}}</span>
                </li>
                <li>
                    <span>管理员 ID：</span><span>{{adminInfo.id}}</span>
                </li>
            </ul>
            <el-button type="success" style="margin-left: 12%;" round @click="dialogFormVisible = true" >添加管理员</el-button>
        </div>
        <el-dialog title="添加管理员" :visible.sync="dialogFormVisible">
        <el-form :model="form">
            <el-form-item label="账户" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" :label-width="formLabelWidth">
                <el-input v-model="form.pwd" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item >
            <p v-text="textdata"></p>
            </el-form-item>
            <el-form-item label="权限" :label-width="formLabelWidth">
            <el-select  v-model="form.power" placeholder="">
                <el-option label="超级管理员" value="超级管理员"></el-option>
                <el-option label="管理员" value="管理员"></el-option>
            </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="openDialog">确 定</el-button>
        </div>
        </el-dialog>
    </div>
</template>

<script>
import axios from 'axios'
import HeadTop from '../components/HeadTop'
    export default {
        components:{
            HeadTop
        },
        data(){
            return {
                dialogFormVisible: false,
                formLabelWidth: '120px',
                btn:false,
                textdata:'',
                form:{
                    name:'',
                    power:'',
                },
                adminInfo:{
                    name:'',
                    id:'',
                    power:''
                },
                value:true,
            }
        },
        methods: {
            getCurrentRoot() {
                let formData = new window.FormData()
                // console.log(localStorage.car_root_id)
                formData.append('id',localStorage.car_root_id)
                axios.post("http://47.94.38.46:80/home/home/getRootMsg",formData,{
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept': 'application/json'
                    }
                }).then((res)=>{
                        // console.log(res)
                        this.adminInfo.name = res.data.name
                        this.adminInfo.id = res.data.id
                        this.adminInfo.power = res.data.power

                        // alert("注册成功！")
                        //  this.$router.push('/login');
                }).catch((err)=>{
                    console.log(err)
                })
            },
            openDialog() {
                this.dialogFormVisible = true;
                this.isPower();
            },
            isPower(){
                if(localStorage.power == 0){
                    this.addRoot();
                    // console.log(123);
                }
                else if(localStorage.power == 1 && this.form.power =="管理员"){
                    this.addRoot();
                }
                else{
                    alert("不符合要求~请重新添加")
                    return false;
                }
            },
            addRoot() {
                let msg = {
                    name:this.form.name,
                    pwd:this.form.name,
                    power:this.form.power,
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
                        location.reload()
                        this.$router.push('/rootlist');

                }).catch((err)=>{
                    console.log(err)
                })
            },
            getRootInfo() {
                let that = this
                axios.get('http://47.94.38.46:80/home/home/getMsgRoot',{
                    params: { 
                        page:that.currentPage1
                    },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                }
                }).then((res) => {
                    if (res.status == 200) {
                        console.log(res)
                        for(let i = 0; i < res.data.length; i++){
                            const tableItem = {
                                id: res.data[i].id,
                                name: res.data[i].name,
                                power: res.data[i].power,
                            }
                            this.form.push(tableItem)
                        }
                    }
                }).catch((error) => {
                        console.log(error)
                })
            },
            Test() {
                if(localStorage.power === 0){
                    this.btn = true
                    this.textdata = ""
                }
                else if(localStorage.power === 1) {
                    this.btn = false
                    this.textdata = "mmm"
                }
            }
        },
        mounted() {
            this.form.power = '管理员'
            // console.log(localStorage)
            this.getCurrentRoot()

        },
    }
</script>

<style lang="stylus">
	.explain_text{
		margin-top: 20px;
		text-align: center;
		font-size: 20px;
		color: #333;
	}
    .admin_set{
        width: 60%;
        background-color: #F9FAFC;
        min-height: 400px;
        margin: 20px auto 0;
        border-radius: 10px;
    }
    .admin_set ul li{
        padding: 20px;
        list-style:none
    }
    .admin_set ul li span{
        color: #666;

    }
    .admin_title{
        margin-top: 20px;
        text-align: center;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        margin-top: 10px;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #20a0ff;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 120px;
        height: 120px;
        line-height: 120px;
        text-align: center;
    }
    .avatar {
        width: 120px;
        height: 120px;
        display: block;
    }
</style>
