<template>
    <div >
		<head-top></head-top>
        <el-table
		     :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" border stripe fit empty-text="暂无数据" style="width: 100%"
                        :default-sort="{prop: 'date', order: 'descending'}">
          <el-table-column
		        prop="id"
		        label="id"
		        >
		      </el-table-column>
		      <el-table-column
		        prop="name"
		        label="姓名"
		        >
		      </el-table-column>
		      <el-table-column
		        prop="phone"
		        label="联系方式"
		        >
		      </el-table-column>
		    </el-table>
		    <div class="Pagination" style="text-align: left;margin-top: 10px;">
           <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 5,]"
            :page-size="1"
            background
            layout="total, sizes, prev, pager, next, jumper"
            :total="tableData.length">
          </el-pagination>
            </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import HeadTop from '../components/HeadTop'
    // import headTop from '../components/headTop'
    // import {adminList, adminCount} from '@/api/getData'
    export default {
        components:{
			HeadTop
		},
        data(){
            return {
                tableData: [],
                pagesize:10,
                currentPage:1,
            }
        },
        methods: {
            handleSizeChange(val) {
                this.pagesize =val;
            },
            handleCurrentChange(val) {
                this.currentPage = val;
            },
           getMsg() {
                let that = this
                axios.get('http://47.94.38.46:80/home/home/getMsgUser',{
                        params: { 
                            page:that.currentPage1
                        },
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept': 'application/json'
                    }
                    }).then((res) => {
                        if (res.status == 200) {
                            // console.log(res)
                        for(let i = 0; i < res.data.length; i++){
                            const tableItem = {
                                id: res.data[i].id,
                                name: res.data[i].name,
                                phone:res.data[i].phone,
                                carid:res.data[i].carid,
                            }
                            that.tableData.push(tableItem)
                        }

                        }
                    }).catch((error) => {
                            console.log(error)
                    })
            },
        },
    	  mounted() {
          this.getMsg()
        },
    }
</script>

<style lang="stylus">
	// @import '../style/mixin';
    // .table_container{
    //     padding: 20px;
    // }
</style>


