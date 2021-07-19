# ## 1、当前脚本文件所在路径
# current_path=$(cd $(dirname $0); pwd)
# version='V0.1.0.0012'

# ## 打印当前目录
# echo $current_path

# # 打印当前目录文件列表
# # echo $a* 

# #-----------------------------1、需要拉取的项目路径------------------

# ## 项目仓库本地文件路径
# base_url='/e/work/aehyok/github/vue-qiankun'

# ## 开始pull拉取项目
# project_path=${base_url}
# cd $project_path
#  git pull
#   echo -e "\033[32m拉取项目：${project_path} 成功\033[0m";


# #-------------------------2、设置需要编译的项目路径----------------------
# npmbuild_pathArr=(
#   "/e/work/aehyok/github/vue-qiankun/main-vite-app-ts"    #主应用
#   "/e/work/aehyok/github/vue-qiankun/webpack-app"         # webpack-app 子应用
#   "/e/work/aehyok/github/vue-qiankun/map-app"             #map-app 子应用
# )

# #-------------------------3、 开始 build 项目--------------------------
# for ((i=0;i<${#npmbuild_pathArr[*]};i++))
# do
#   project_path=${npmbuild_pathArr[i]}
#   cd $project_path
#   yarn build
#   echo -e "\033[32m编译项目：${npmbuild_pathArr[i]} 成功\033[0m";
# done

#-------------------------4、 开始拷贝文件到服务器----------------------
# /e/work/aehyok/github/qiankun 是我本地打包后的文件夹
scp -r /e/work/aehyok/github/qiankun/main/ root@139.186.205.7:/usr/local/qiankun/


######、拷贝完之后进行git 的提交
cd /e/work/aehyok/github/qiankun
# git add .
# git status
# sleep 1s
# message="chore：build.sh 脚本打包 commit-version:${version}"
# git commit -m $message .
# git push origin

echo "5秒后将自动退出本脚本："
for i in $(seq 5 -1 1)
do
  echo -e $i;sleep 1
done
exit

## 执行脚本  sh 2021-06-09-build.sh