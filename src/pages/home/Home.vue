<template>
	<div class="manage_page fillcontain">
		<el-row style="height: 100%;">
	  		<el-col :span="4"  class="box1" style="height:721px; background-color: #545c64;">
				<el-menu :default-active="defaultActive"  background-color="#545c64" theme="dark" router text-color="#fff">
					<el-menu-item index="manage" ><i class="el-icon-menu"></i>首页</el-menu-item>
					<el-submenu index="2">
						<template slot="title"><i class="el-icon-document"></i>数据管理</template>
						<el-menu-item index="userList">用户列表</el-menu-item>
						<el-menu-item index="carList">停车列表</el-menu-item>
						<el-menu-item index="rootList">管理员列表</el-menu-item>
						<el-menu-item index="commentList">评论列表</el-menu-item>
						<el-menu-item index="headP">头像列表</el-menu-item>
					</el-submenu>
					<el-submenu index="3">
						<template slot="title"><i class="el-icon-plus"></i>添加数据</template>
						<el-menu-item index="addCar">添加用户</el-menu-item>
					</el-submenu>
					<!-- <el-submenu index="4">
						<template slot="title"><i class="el-icon-star-on"></i>图表</template>
						<el-menu-item index="visitor">用户分布</el-menu-item>
					</el-submenu> -->
					<el-submenu index="6">
						<template slot="title"><i class="el-icon-setting"></i>设置</template>
						<el-menu-item index="rootSet">管理员设置</el-menu-item>
						<!-- <el-menu-item index="sendMessage">发送通知</el-menu-item> -->
					</el-submenu>
					<el-submenu index="7">
						<template slot="title"><i class="el-icon-warning"></i>说明</template>
						<el-menu-item index="explain">说明</el-menu-item>
					</el-submenu>
				</el-menu>
			</el-col>
			<!-- 头部菜单 -->
			<el-col  class="box2" style="background-color:#545c64;" >   
					<el-menu :default-active="defaultActive" style="background-color:#545c64;" >
					<el-menu-item index="manage" ><i class="el-icon-menu"></i>首页</el-menu-item>
					<el-submenu index="2">
						<template slot="title"><i class="el-icon-document"></i>数据管理</template>
						<el-menu-item index="userList">用户列表</el-menu-item>
						<el-menu-item index="carList">停车列表</el-menu-item>
						<el-menu-item index="rootList">管理员列表</el-menu-item>
					</el-submenu>
					<el-submenu index="3">
						<template slot="title"><i class="el-icon-plus"></i>添加数据</template>
						<el-menu-item index="addCar">添加用户</el-menu-item>
					</el-submenu>
					<el-submenu index="6">
						<template slot="title"><i class="el-icon-setting"></i>设置</template>
						<el-menu-item index="rootSet">管理员设置</el-menu-item>
					</el-submenu>
					<el-submenu index="7">
						<template slot="title"><i class="el-icon-warning"></i>说明</template>
						<el-menu-item index="explain">说明</el-menu-item>
					</el-submenu>
				</el-menu>
			</el-col>
			<el-col :span="20" style="height: 100%;overflow: auto;" class="box3">
				<keep-alive>
				    <router-view></router-view>
				</keep-alive>
			</el-col>
		</el-row>

  	</div>
</template>

<script>
    export default {
		computed: {
			defaultActive: function(){
				return this.$route.path.replace('/', '');
			}
		},
		mounted() {
			if(!localStorage.token1){
				alert("请先登录")
				this.$router.push('/login')
				return false
			}
		},
    }
</script>

<style lang="stylus">
 	@media screen and (max-width: 700px) {
		.box2{
			display ""
		}
		.box1{
			display none
		}
		.box3{
			width 100%
		}
		body{
			overflow auto
		}
	}  
	@media screen and (min-width: 700px) {
		.box2{
			display none
		}
		.box1{
			display ""
		}
		.box3{
			width ""
		}
		body{
			overflow auto
		}
	}  
	.el-menu
		background none !important
</style>

    
