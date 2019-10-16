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
                prop="power"
                label="权限"
            >
            </el-table-column>
            <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                        size="small"
                        @click="openDialog(scope.row)">编辑</el-button>
                    </template>
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
        <el-dialog title="管理员信息" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="id" :label-width="formLabelWidth">
                    <el-input v-model="form.id" autocomplete="off" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="账户" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="活动区域" :label-width="formLabelWidth">
                    <el-select v-model="form.power" placeholder="请选择活动区域">
                        <el-option label="管理员" value="管理员"></el-option>
                        <el-option label="超级管理员" value="超级管理员"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitSave">确 定</el-button>
            </div>
        </el-dialog>
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
                dialogFormVisible: false,
                formLabelWidth: '120px',
                // options:["普通管理员","超级管理员"]
                 form: {
                    name: '',
                    id:'',
                    power:''
                },
                isPower:'',
                isId:''
            }
        },
        watch: {
            isPower (){
                console.log(this.isId)
                if(localStorage.car_root_id == this.isId){
                    if(this.isPower == "超级管理员"){
                        localStorage.power =0;
                    }
                    else if(this.isPower == "管理员"){
                        localStorage.power =1;
                    }
                }
            }
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
                this.getSelectItemData(row, 'edit')
            },
            getSelectItemData(row) {
                var key_word = new window.FormData()
                key_word.append('id',row.id)
                axios.post('http://47.94.38.46:80/home/home/webrootlistselete',key_word, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept': 'application/json'
                    }
                }).then((res) => {
                    if(res){
                        this.form.id = res.data.id
                        this.form.name = res.data.name
                        this.form.power = res.data.power
                        // console.log(res.data.carid)
                    }
                }).catch((error) => {
                        console.log(error)
                })
            },
            submitSave() {
                let FormData = new window.FormData()
                if(localStorage.power == 0){
                    FormData.append('id',this.form.id)
                    FormData.append('power',this.form.power)
                    // console.log(this.form)
                    axios.post('http://47.94.38.46:80/home/home/webrootlistupdata',FormData, {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Accept': 'application/json'
                        }
                    }).then((res) => {
                        if(res){
                            this.isPower = res.data.power;
                            this.isId = res.data.id;
                            // console.log(res)
                            location.reload()
                        }
                    }).catch((error) => {
                            console.log(error)
                    })               
                }
                else{
                    alert("您权限不足~")
                }

            },
           getMsg() {
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
                            // console.log(res)
                        for(let i = 0; i < res.data.length; i++){
                            const tableItem = {
                                id: res.data[i].id,
                                name: res.data[i].name,
                                power: res.data[i].power,
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
        //   console.log(localStorage)
        },
    }
</script>

<style lang="stylus">
	// @import '../style/mixin';
    // .table_container{
    //     padding: 20px;
    // }
</style>


