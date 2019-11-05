<template>
  <div>
    <HeadTop></HeadTop>
    <el-table
      :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" border stripe fit empty-text="暂无数据" style="width: 100%"
      :default-sort="{prop: 'date', order: 'descending'}">
      <el-table-column  prop="id"  label="头像id"></el-table-column>
      <el-table-column prop="u_id"  label="用户id"></el-table-column>
      <el-table-column prop="path" label="路径"></el-table-column>
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
import {api} from '@/api/myapi'
import HeadTop from '../components/HeadTop'
export default {
    data() {
        return {
            tableData: [],
            pagesize:10,
            currentPage:1,
       }
    },
    components:{
        HeadTop
    },
    methods: {
        handleSizeChange(val) {
            this.pagesize =val;
        },
        handleCurrentChange(val) {
            this.currentPage = val;
        },
        openDialog(row) {
            this.dialogFormVisible = true;
            this.getSelectComment(row, 'edit')
        },
        async getComment(){
            let data = await api.get("http://47.94.38.46:80/home/index/getHead")
            // console.log(typeof data)
            console.log(data)
            data.map( x =>{
                this.tableData.push(x)
            })
            this.mylist = data;
        },
    },
    created() {
        this.getComment()
    },
}
</script>

<style>

</style>