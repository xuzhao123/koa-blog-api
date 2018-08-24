# koa-blog-api  

## pm2

~~~ bash
pm2 start pm2.json
pm2 start app.js
pm2 stop id
pm2 restart id
pm2 delete id
~~~

## mongodb  

* mongodb安装  

~~~ bash
curl -O https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-3.0.6.tgz    # 下载
tar -zxvf mongodb-linux-x86_64-3.0.6.tgz                                   # 解压
~~~

mv  mongodb-linux-x86_64-3.0.6/ /usr/local/mongodb  

* 使得mongodb常驻内存  

进入mongodb的bin目录
sudo ./mongod --dbpath=/data/db --fork --logpath=/data/logs
