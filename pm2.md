### pm2在linux上运行
1. 配置ecosystem.json文件
```
{
    "apps": [{
        "name": "[name]",
        "script": "app.js",
        "env": {
            "COMMON_VARIABLE": "true"
        },
        "env_production": {
            "NODE_ENV": "production"
        }
    }],
    "deploy": {
        "production": {
            "user": "[用户名]",
            "host": ["主机ip"],
            "port": [端口], 
            "ref": "origin/master",
            "repo": "git地址",
            "path": "地址",
            "ssh_options": "StrictHostKeyChecking=no",
            "env": {
                "NODE_ENV": "production"
            }
        }
    }
}
```
```
21/tcp FTP文件传输协议
22/tcp SSH安全登录、文件传送(SCP)和端口重定向
3306 mysql
```

2. 上传git成功后
输入命令
```
pm2 deploy ecosystem.json production set up
输入密码
```
3. 更新文件
```
pm2 deploy ecosystem.json production
只需要输入这条命令
```
4. 进去主机开启pm2
