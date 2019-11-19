<template>
  <div>
	  <head-top></head-top>
	   <el-row style="margin-top: 20px;" class="font-my">
  			<el-col :span="12" :offset="4">
		        <el-form  label-width="110px" class="demo-formData">
					<el-form-item label="账户名称" prop="name">
						<el-input placeholder="账户名称(必填项)" v-model="name"></el-input>
					</el-form-item>
					<el-form-item label="密码" prop="phone">
        				<el-input placeholder="请输入密码(必填项)" v-model="pwd" show-password></el-input>
					</el-form-item>
					<el-form-item label="确认密码" prop="description">
        				<el-input placeholder="请确认密码" v-model="repwd" show-password></el-input>
					</el-form-item>
        			<p v-text="data"></p>
					<el-form-item label="手机号码" prop="promotion_info">
				        <el-input placeholder="请输入手机号码(必填项)" v-model="phone"></el-input>
					</el-form-item>
					<el-form-item label="车牌1" prop="promotion_info">
        				<el-input placeholder="请填写车牌1（至少写一个最多可写四个）" v-model="carid1" ></el-input>
					</el-form-item>
					<el-form-item label="车牌2" prop="promotion_info">
        				<el-input placeholder="请填写车牌2（至少写一个最多可写四个）" v-model="carid2" ></el-input>
					</el-form-item>
					<el-form-item label="车牌3" prop="promotion_info">
        				<el-input placeholder="请填写车牌3（至少写一个最多可写四个）" v-model="carid3" ></el-input>
					</el-form-item>
					<el-form-item label="车牌4" prop="promotion_info">
        				<el-input placeholder="请填写车牌4（至少写一个最多可写四个）" v-model="carid4" ></el-input>
					</el-form-item>
		        </el-form>
  			</el-col>
	   	</el-row>
		<div class="btn ">
			<el-button  round @click="addCar">添加</el-button>
		</div>
    	
	   
  </div>
</template>

<script>
import axios from 'axios'
import HeadTop from '../components/HeadTop'
export default {
	components:{
		HeadTop
	},
	data() {
		return {
			data:"",
			name:'',
			pwd:'',
			repwd:'',
			phone:'',
			carid1:"",
			carid2:"",
			carid3:"",
			carid4:""
		}
	},
	methods: {
		addCar() {
			var reg=11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
			if(this.pwd != this.repwd){
                this.data = "两次密码不一致"
                return false
			}
			else if(this.name =='' || this.carid1 ==''){
				alert("请输入必填项")
                return false
			}
			else if(!reg.test(this.phone)){
                alert("手机格式不正确");
                return false
            }
            var formData = new window.FormData() // vue 中使用 window.FormData(),否则会报 'FormData isn't definded'
			formData.append('name',this.name)
			formData.append('pwd',this.pwd)
			formData.append('phone',this.phone)
			let carid = this.carid1+this.carid2+this.carid3+this.carid4
			formData.append('carid',carid)
			axios.post("http://47.94.38.46:80/home/home/userCarSave1",formData,{
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                }
            }).then((res)=>{
				this.$router.push('/home/userList')
				location.reload()
            }).catch((err)=>{
				console.log(err)
				alert("注册失败！")
            })
		}
	},
}
</script>

<style scoped>
.font-my{
	font-weight: 700;
	color:white;
}
.btn{
	/* display: flex; */
	margin-left: 20%
}
.btn button{
	width: 200px !important
}

</style>