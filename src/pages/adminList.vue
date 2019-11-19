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
            <el-table-column label="操作" width="160">
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
        <el-dialog title="请谨慎修改车牌信息！" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                        <el-form-item label="carid1" label-width="100px">
                            <el-input v-model="form.carid1" auto-complete="off"></el-input>
                        </el-form-item>                        
                        <el-form-item label="carid2" label-width="100px">
                            <el-input v-model="form.carid2" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="carid3" label-width="100px">
                            <el-input v-model="form.carid3" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="carid4" label-width="100px">
                            <el-input v-model="form.carid14" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="carid5" label-width="100px">
                            <el-input v-model="form.carid5" auto-complete="off"></el-input>
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
                form: {
                    id:'',
                    carid1: '',
                    carid2:'',
                    carid3:'',
                    carid4:'',
                    carid5:''
                },
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
                if(localStorage.power == 0){
                    this.dialogFormVisible = true;
                    this.getSelectItemData(row)
                    this.form.id = row.id
                }
                else{
                    alert("您权限不足！")
                }
            },
            // 修改
            async getSelectItemData(row) {
                var key_word = new window.FormData()
                key_word.append('id',row.id)
                console.log(this.form);
                
                let rs = await axios.post('http://47.94.38.46:80/home/home/adminselect',key_word, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept': 'application/json'
                    }
                })
                console.log(rs);
                this.form.carid1 = rs.data.substr(0,7);
                this.form.carid2 = rs.data.substr(7,7);
                this.form.carid3 = rs.data.substr(14,7);
                this.form.carid4 = rs.data.substr(21,7);
                this.form.carid5 = rs.data.substr(27,7);

            },
            submitSave() {
                let FormData = new window.FormData()
                let carid = this.form.carid1+this.form.carid2+this.form.carid3+this.form.carid4+this.form.carid5
                FormData.append('carid',carid)
                FormData.append('id',this.form.id)
                axios.post('http://47.94.38.46:80/home/home/adminupdata',FormData, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept': 'application/json'
                    }
                }).then((res) => {
                    if(res){
                        location.reload()
                    }
                }).catch((error) => {
                        console.log(error)
                })
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


