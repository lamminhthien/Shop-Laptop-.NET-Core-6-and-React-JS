# Check Token
[Read_more](https://joshtronic.com/2020/03/23/protected-routes-with-react-router-v5/)
## Helper/Authentication.js
```js
import axios from 'axios';

// Hàm kiểm tra đăng nhập = gửi request đến backend2
export default function isAuthorized() {
    // Cấu hình header để đọc JWT từ localStorage
    const config = {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    };
    // Truy cập vào trang có bảo mật, ví dụ trang danh sách sản phẩm đang quản lý của nhân viên
    axios.get("https://localhost:44372/api/User/Admins", config).then(res => {
        return true
    }, err => {
        return false
    })
}
```
---
# Check And Redirect
```js
import Sidebar from "../Components/sidebar"
import isAuthorized from "../Helpers/Authentication";
import { Redirect } from "react-router-dom"

export default function Dashboard() {
    // Nếu chưa đăng nhập
    if (!isAuthorized()) {
        return <Redirect to="/login" />;
      }
    return (
        <div className="flex">
            <Sidebar/>
            <div className="h-screen flex-1 p-7">
                <h2>Home</h2>
            </div>
        </div>
    )
}
```

# ES6, JSX Range Between Two number
```js
//es6
console.log(
   Array.from({length:5},(val,ind)=>ind)
)

//also es6
console.log(
	[...Array(5),keys()];
)
```


