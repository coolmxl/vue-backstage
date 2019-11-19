<template>
    <div style="overflow:hidden;height:721px;">
	    <HeadTop></HeadTop>
        <el-table
		    :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" border stripe fit empty-text="暂无数据" 
            :default-sort="{prop: 'date', order: 'descending'}" :class="cls">
             <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                    <el-form-item label="评论内容" style="width:100%">
                        <span>{{ props.row.content }}</span>
                    </el-form-item>
                    </el-form>
                </template>
                </el-table-column>
            <el-table-column  prop="id"  label="id"></el-table-column>
            <el-table-column prop="id_branch"  label="id分支"></el-table-column>
            <el-table-column prop="comment_id" label="评论人id"></el-table-column>
            <el-table-column prop="comment_name" label="评论人"></el-table-column>
            <el-table-column prop="comment_time" label="评论时间"></el-table-column>
            <el-table-column prop="commented_name" label="被评论人"></el-table-column>
            <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                        size="small"
                        @click="openDialog(scope.row)">编辑</el-button>
                        <el-button
                      size="small"
                      type="danger"
                      @click="handleDelete(scope.row)">删除</el-button>
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
        <el-dialog title="请谨慎修改信息" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="id" :label-width="formLabelWidth">
                    <el-input v-model="form.id" autocomplete="off" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="评论内容" :label-width="formLabelWidth">
                    <el-input
                    type="textarea"
                    :rows="5"
                    placeholder="请输入内容"
                    autosize
                    v-model="form.content"
                    maxlength="300"
                    show-word-limit
                    >
                    </el-input>
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
import {api} from '@/api/myapi'
import HeadTop from '../components/HeadTop'
    // import headTop from '../components/headTop'
    // import {adminList, adminCount} from '@/api/getData'
    export default {
        components:{
            HeadTop
        },
        data(){
            return {
                cls:'set-overflow',
                tableData: [],
                pagesize:10,
                currentPage:1,
                dialogFormVisible: false,
                formLabelWidth: '120px',
                 form: {
                    id:'',
                    content:''
                },
                isPower:'',
                isId:'',
                mylist:[]
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
                this.getSelectComment(row, 'edit')
            },
            async handleDelete(row){
                confirm("确认要删除吗？")
                let key_word = new window.FormData()
                key_word.append('id',row.id)
                try{
                    let d = await axios.post(`http://47.94.38.46:80/home/index/deleteComment`,key_word,{
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Accept': 'application/json'
                        }
                    })
                    location.reload()
                }catch(e) {
                    console.error(e)
                }
            },
            async getComment(){
                let data = await api.get("http://47.94.38.46:80/home/index/getcomment")
                // console.log(typeof data)
                // console.log(data)
                data.map( x =>{
                    this.tableData.push(x)
                })
                // console.log(this.tableData);
                
                this.mylist = data;
            },
            async getSelectComment(row) {
                try {
                    let key_word = new window.FormData()
                    key_word.append('id',row.id)
                    let d = await axios.post(`http://47.94.38.46:80/home/index/getselectcomment`,key_word,{
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept': 'application/json'
                    }
                    })
                    this.form.id = d.data.id
                    this.form.content = d.data.content
                } catch(e) {
                    console.error(e)
                }
            },
            async submitSave() {
                if(localStorage.power == 0){
                    let FormData = new window.FormData()
                    FormData.append('id',this.form.id)
                    FormData.append('content',this.form.content)
                    try {
                        let d = await axios.post(`http://47.94.38.46:80/home/index/commentUpdata`,FormData,{
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded',
                                'Accept': 'application/json'
                            }
                        })
                        location.reload()
                    } catch(e) {
                    console.error(e)
                    }
                }
                else{
                    alert("您权限不足~")
                }

            },
        },
    	mounted() {
        },
        created() {
          this.getComment();
        },
    }
</script>

<style lang="stylus" scoped>
.el-table .cell
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
.set-overflow
    width: 100%;
    height: 628px;
    overflow-y: scroll;


</style>


