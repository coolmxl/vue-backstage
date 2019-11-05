<template>
    <div>
        <head-top></head-top>
        <section class="data_section">
			<header class="section_title">数据统计</header>
            <div style="">
                <el-row :gutter="20" style="display: flex;
    justify-content: space-between;
    align-items: center;" class="">
                    <el-col :span="4"><div class="data_list today_head"><span class="data_num head">当日数据：</span></div></el-col>
                    <el-col :span="4"><div class="data_list"><span class="data_num">{{orderCount}}</span> 新增订单</div></el-col>
                    <el-col :span="4"><div class="data_list"><span class="data_num">{{userCount}}</span> 新增用户</div></el-col>
                    <el-col :span="4"><div class="data_list"><span class="data_num">{{adminCount}}</span> 新增管理员</div></el-col>
                </el-row>
                <el-row :gutter="20" style="display: flex;
    justify-content: space-between;
    align-items: center;">
                    <el-col :span="4"><div class="data_list all_head"><span class="data_num head">总数据：</span></div></el-col>
                    <el-col :span="4"><div class="data_list"><span class="data_num">{{allOrderCount}}</span> 订单</div></el-col>
                    <el-col :span="4"><div class="data_list"><span class="data_num">{{allUserCount}}</span> 注册用户</div></el-col>
                    <el-col :span="4"><div class="data_list"><span class="data_num">{{allAdminCount}}</span> 管理员</div></el-col>
                </el-row>
            </div>
		</section>
        <Tendency :sevenDate='sevenDate' :sevenDay='sevenDay'/>
    </div>
</template>

<script>
    import HeadTop from '../components/HeadTop'
    import Tendency from '../components/Tendency'
    import axios from 'axios'
    export default {
        components:{
            HeadTop,
            Tendency
        },
        data() {
            return {
                userCount: null,
    			orderCount: null,
                adminCount: null,
                allUserCount: null,
                allOrderCount: null,
                allAdminCount: null,
    			sevenDay: [],
    			sevenDate: [[],[],[]],
            }
        },
        methods: {
            getSevenDay() {
                var myDate = new Date(); //获取今天日期
                myDate.setDate(myDate.getDate() - 7); 
                var dateArray = [];
                var dateTemp;
                var flag = 1;
                for (var i = 0; i < 7; i++) { 
                    dateTemp = myDate.getFullYear()+ "-" + (myDate.getMonth() + 1) + "-" + (myDate.getDate()+1);
                    dateArray.push(dateTemp);
                    myDate.setDate(myDate.getDate() + flag);
                } 
                // let ntime = myDate.getFullYear()+ "-" + (myDate.getMonth() + 1) + "-" + myDate.getDate();
                // dateArray.push(ntime)
                this.sevenDay = dateArray                
            },
            getOrderCount() {
                axios.get('http://47.94.38.46:80/home/home/getOrderCount',{
                     headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept': 'application/json'
                     }
                }).then((res) => {
                    this.orderCount = res.data[0].count
                    for(let i = 0; i < res.data.length; i++){
                        this.sevenDate[0].push(res.data[i].count)
                    }
                    this.sevenDate[0].reverse();
                }).catch((error) =>{
                    console.log(error)
                })
            },
            getUserCount() {
                axios.get('http://47.94.38.46:80/home/home/getUserCount',{
                     headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept': 'application/json'
                     }
                }).then((res) => {
                    this.userCount = res.data[0].count
                    for(let i = 0; i < res.data.length; i++){
                        this.sevenDate[1].push(res.data[i].count)
                    }
                    this.sevenDate[1].reverse();
                }).catch((error) =>{
                    console.log(error)
                })
            },
            getAdminCount() {
                axios.get('http://47.94.38.46:80/home/home/getAdminCount',{
                     headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept': 'application/json'
                     }
                }).then((res) => {
                    this.adminCount = res.data[0].count
                    for(let i = 0; i < res.data.length; i++){
                        this.sevenDate[2].push(res.data[i].count)
                    }
                    this.sevenDate[2].reverse();
                }).catch((error) =>{
                    console.log(error)
                })
            },
            getAllAdminCount() {
                axios.get('http://47.94.38.46:80/home/home/getAllAdminCount',{
                     headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept': 'application/json'
                     }
                }).then((res) => {
                        this.allAdminCount = res.data
                }).catch((error) =>{
                    console.log(error)
                })
            },
            getAllUserCount() {
                axios.get('http://47.94.38.46:80/home/home/getAllUserCount',{
                     headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept': 'application/json'
                     }
                }).then((res) => {
                        this.allUserCount = res.data[0].id
                }).catch((error) =>{
                    console.log(error)
                })
            },
            getAllOrderCount() {
                axios.get('http://47.94.38.46:80/home/home/getAllOrderCount',{
                     headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept': 'application/json'
                     }
                }).then((res) => {
                    // console.log(res)
                    this.allOrderCount = res.data[0].id
                }).catch((error) =>{
                    console.log(error)
                })
            }
        },
        mounted() {
            this.getSevenDay()
            this.getOrderCount()
            this.getAdminCount()
            this.getUserCount()
            this.getAllAdminCount()
            this.getAllOrderCount()
            this.getAllUserCount()
        },
    }    
</script>

<style lang="stylus">
	.data_section{
		padding: 20px;
		margin-bottom: 40px;
		.section_title{
			text-align: center;
			font-size: 30px;
			margin-bottom: 10px;
		}
        .data_list{
            text-align: center;
            font-size: 14px;
            color: #666;
            border-radius: 6px;
            background: #E5E9F2;
            .data_num{
                color: #333;
                font-size: 26px;
            }
            .head{
                border-radius: 6px;
                font-size: 22px;
                padding: 4px 0;
                color: #fff;
                display: inline-block;
            }
        }
        .today_head{
            background: #FF9800;
        }
        .all_head{
            background: #20A0FF;
        }
	}
</style>
