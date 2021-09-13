# 关于实验的说明

## 1. 实验提交时间
实验的提交时间一般为布置后一周，比如本周三布置的实验作业，提交截止时间为下周二23:59，如有特殊情况会加以说明。

## 2. 实验提交方式
实验需提交两次，一是展示在自己的网站上，二是提交到指定ftp的指定目录下。

### 3.1 个人网站
要求自建一个人网站， 能够展示静态网页即可。推荐使用[github pages](https://pages.github.com)的个人主页服务，也可采用类似的[GitLab](https://gitlab.com)或是国内类似的如[码云](https://gitee.com)提供的个人网页托管服务，当然如果你有能力，也可以选择自己在阿里云或腾讯云或百度云上建站。

以Github Pages为例，搭建过程详见[Github建站指南](https://docs.github.com/cn/github/working-with-github-pages/about-github-pages)。***一小时可以完成，相信我，相信自己***

网站至少应该在***首页***提供明显的***每次***课程作业的页面链接，建议不超过两层，具体形式不限。

个人网站建立后，请及时将网站地址告知任课老师，以方便检查实验作业

### 3.2 提交到指定FTP
每次实验在截止提交时间之前将压缩包上传到ftp中对应的实验文件夹下，地址为[ftp://192.168.21.5](ftp://192.168.21.5)，用户名和密码均为"s学号"， 如学号为***201712203501001***，则用户名和密码均为***s201712203501001***, 请注意实验提交的文件夹

## 3. 实验提交形式
对于在自己网站上展示的结果无要求

提交到FTP上的实验提交形式为<strong style="color:red">.zip</strong>压缩文件，<strong style="color:red">不接受其它格式压缩文件</strong>，凡提交其它格式压缩文件，或解压无效的，一律视作未提交。请在提交到ftp之前自行检查核对。

压缩包内部文件目录格式如下：

<img src="../images/cg/treelist.png" alt="目录结构" style="zoom:33%;" />

其中，压缩包的根目录下有Index.html文件，用于展示你的实验作业，js目录下放置相关的js文件，所有工具库一律放置在common目录下，用户程序比如triangle.js放在js目录下。压缩包以<strong style="color:red">学号</strong>命名。

若一次作业有多个任务，为每个任务分别建立一个html文件，并以任务序号命名，如task1.html, task2.html等，并在index.html中建立每个任务对应html文件的链接。

<img src="../images/cg/treemulti.png" alt="目录结构" style="zoom:33%;" />

## 4. 学生网站链接