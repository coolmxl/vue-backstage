<template>
     <div >
		<head-top></head-top>
        <div class="seach">
            <el-input
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
            v-model="input">
            </el-input>
            <el-button round @click=seach>搜索</el-button>
        </div>
        <el-table  :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" border stripe fit empty-text="暂无数据" style="width: 100%"
                        :default-sort="{prop: 'date', order: 'descending'}">
                <el-table-column
                    prop="id"
                    label="id"
                    sortable
                    >
                </el-table-column>
                <el-table-column
                    prop="add_time"
                    label="add_time"
                    sortable
                    >
                </el-table-column>
                <el-table-column
                    prop="carid"
                    label="carid"
                    sortable
                   >
                </el-table-column>
                <el-table-column
                    prop="state"
                    label="状态"
                    sortable
                    >
                </el-table-column>
                <el-table-column
                    prop="stopTime"
                    label="停车时间/小时"
                    sortable
                    >
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="账户"
                    sortable
                    >
                </el-table-column>
                <el-table-column label="操作" width="160">
                  <template slot-scope="scope">
                    <el-button
                      size="small"
                      @click="openDialog(scope.row)">编辑</el-button>
                    <el-button
                      size="small"
                      type="danger"
                      @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                  </template>
                </el-table-column>
        </el-table>

        <div class="paging" >
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[9, 5,]"
            :page-size="1"
            background
            layout="total, sizes, prev, pager, next, jumper"
            :total="tableData.length">
          </el-pagination>
        </div>
        <el-dialog title="请谨慎修改信息！" :visible.sync="dialogFormVisible">
        <el-form :model="form">
                    <el-form-item label="carid" label-width="100px">
                        <el-input v-model="form.carid" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="状态" label-width="100px">
                        <el-input v-model="form.state"></el-input>
                    </el-form-item>
                    <el-form-item label="账户" label-width="100px">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitSave">确 定</el-button>
        </div>
        </el-dialog>
            <el-dialog title="搜索结果为" :visible.sync="dialogSelect">
                <p v-text="seachText"></p>
            <el-table  :data="stableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" border stripe fit empty-text="暂无数据" style="width: 100%"
                            :default-sort="{prop: 'date', order: 'descending'}">
                    <el-table-column
                        prop="sid"
                        label="id"
                        sortable
                        >
                    </el-table-column>
                    <el-table-column
                        prop="sadd_time"
                        label="add_time"
                        sortable
                        >
                    </el-table-column>
                    <el-table-column
                        prop="scarid"
                        label="carid"
                        sortable
                    >
                    </el-table-column>
                    <el-table-column
                        prop="sstate"
                        label="状态"
                        sortable
                        >
                    </el-table-column>
                    <el-table-column
                        prop="sstopTime"
                        label="停车时间/小时"
                        sortable
                        >
                    </el-table-column>
                    <el-table-column
                        prop="sname"
                        label="账户"
                        sortable
                        >
                    </el-table-column>
            </el-table>
            <div class="paging" >
            <el-pagination
                @size-change="shandleSizeChange"
                @current-change="shandleCurrentChange"
                :current-page="scurrentPage"
                :page-sizes="[9, 5,]"
                :page-size="1"
                background
                layout="total, sizes, prev, pager, next, jumper"
                :total="stableData.length">
            </el-pagination>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
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
                tableData: [],
                stableData: [],
                pagesize:9,
                currentPage:1,
                scurrentPage:1,
                dialogFormVisible: false,
                dialogSelect:false,
                form: {
                    name: '',
                    carid:'',
                    state:'',
                    id:''
                },
                formLabelWidth: '120px',
                input:'',
                seachText:'',

            }
        },
        methods: {
             handleSizeChange(val) {
                this.pagesize =val;
            },
            handleCurrentChange(val) {
                this.currentPage = val;
            },
            shandleSizeChange(val) {
                this.pagesize =val;
            },
            shandleCurrentChange(val) {
                this.currentPage = val;
            },
            getMsg() {
                let that = this
                axios.get('http://47.94.38.46:80/home/home/getMsg',{
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept': 'application/json'
                    }
                    }).then((res) => {
                        if (res.status == 200) {
                        for(let i = 0; i < res.data.length; i++){
                            //计算时间差
                            let Ntime = new Date()
                            var date = new Date(res.data[i].add_time)
                            let Stime = parseInt((Ntime - date) / 1000 / 60/ 60)
                            // console.log(parseInt(d2 - d1) / 1000 / 60 /60);//两个时间相差的小时数
                            // 停车时间
                            const tableItem = {
                                id: res.data[i].id,
                                add_time: res.data[i].add_time,
                                carid: res.data[i].carid,
                                state:res.data[i].state,
                                name:res.data[i].name,
                                stopTime:Stime
                            }
                            that.tableData.push(tableItem)
                        }
                        }
                    }).catch((error) => {
                            console.log(error)
                    })
            },
            seach() {
                this.dialogSelect = true
                this.dialogSelectForm()
            },
            // 查
            dialogSelectForm() {
                let that = this
                var key_word = new window.FormData()
                key_word.append('key',this.input)
                axios.post('http://47.94.38.46:80/home/home/carSelect',key_word,{
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept': 'application/json'
                    }
                    }).then((res) => {
                        if (res.status == 200) {
                            if(res.data.length==0){
                                this.seachText = "空~"
                            }
                            for(let i = 0; i < res.data.length; i++){
                                //计算时间差
                                let Ntime = new Date()
                                var date = new Date(res.data[i].add_time)
                                let Stime = parseInt((Ntime - date) / 1000 / 60/ 60)
                                // 停车时间
                                const tableItem = {
                                    sid: res.data[i].id,
                                    sadd_time: res.data[i].add_time,
                                    scarid: res.data[i].carid,
                                    sstate:res.data[i].state,
                                    sname:res.data[i].name,
                                    sstopTime:Stime
                                }
                                that.stableData.push(tableItem)
                            }
                        }
                    }).catch((error) => {
                            console.log(error)
                    })                
            },
            openDialog(row) {
                if(localStorage.power == 0){
                    this.dialogFormVisible = true;
                    this.getSelectItemData(row)
                }
                else{
                    alert("您权限不足！")
                }
            },
            // 修改
            getSelectItemData(row) {
                var key_word = new window.FormData()
                key_word.append('id',row.id)
                axios.post('http://47.94.38.46:80/home/home/webcarlistselete',key_word, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept': 'application/json'
                    }
                }).then((res) => {
                    if(res){
                        this.form.carid = res.data.carid
                        this.form.name = res.data.name
                        this.form.state = res.data.state
                        this.form.id = res.data.id
                    }
                }).catch((error) => {
                        console.log(error)
                })
            },
            submitSave() {
                let FormData = new window.FormData()
                FormData.append('carid',this.form.carid)
                FormData.append('name',this.form.name)
                FormData.append('state',this.form.state)
                FormData.append('id',this.form.id)
                axios.post('http://47.94.38.46:80/home/home/webcarlistupdata',FormData, {
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
            handleDelete(index,row) {
                 if(localStorage.power == 0){
                    let FormData = new window.FormData()
                    FormData.append('id',row.id)
                    axios.post('http://47.94.38.46:80/home/home/webcarlistdelete',FormData, {
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
                 }
                 else{
                     alert("你权限不足！")
                 }
            }
        },
        mounted() {
         this.getMsg();
        },

    }
</script>

<style lang="stylus">
    .seach{
        display:flex
    }
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
    .table_container{
        padding: 20px;
    }
    .Pagination{
        display: flex;
        justify-content: flex-start;
        margin-top: 8px;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
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
