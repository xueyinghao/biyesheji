# biyesheji
My graduation project

在个人开发机器上已经配置Ssh key

在配置完ssh key之后再进行push操作依然需要输入密码：

原因：当前使用的是https而不是ssh，需要更新一下origin

解决方案: 
		  git remote remove origin 

		  git remote add origin git@github.com:Username/Your_Repo_Name.git'
		  
          之后还需要重新设置track branch
          git branch --set-upstream-to=origin/master master'

		  
对于Https方式，我们可以在~/.netrc文件里设定用户名密码，不过这样存在风险，因为我们的密码是明文
存在这个文件里面，比较容易泄露，这一种没找到~/.netrc在哪......



详细参考一下：https://segmentfault.com/q/1010000000599327

