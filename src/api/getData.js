import axios from 'axios'
import qs from 'qs'

let http={
    post:"",
    get:""
}
// http://60.10.00.005:8080
//方法一 统一拦截

const Website="";
http.post= function (api,data){
    let params = qs.stringify(data)
    return new Promise((resolve,reject) => {
        axios.post(`${Website}`+api,params).then((res) =>{
            resolve(res)
        })
    })
}
http.get= function (api,data){
    let params = qs.stringify(data)
    return new Promise((resolve,reject) => {
        axios.post(`${Website}`+api,params).then((res) =>{
            resolve(res)
        })
    })
}
方法二单个请求定义
// export function _login(data){
//     let params = qs.stringify(data)
//     return axios.post('/hrjc/mobile/login',params)
// }
export default http