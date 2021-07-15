## 当前脚本文件所在路径
current_path=$(cd $(dirname $0); pwd)
version='2.0.0.006'

## 打印当前目录
echo $current_path

# 打印当前目录文件列表
# echo $a* 

###############1、需要拉取的项目路径##############

## 项目仓库本地文件路径
base_url ='/e/work/aehyok/github/vue-qiankun/'

## 开始pull拉取项目
project_path=${base_url}
cd $project_path
 git pull
  echo -e "\033[32m拉取项目：${project_path} 成功\033[0m";


#############2、需要编译的项目路径
npmbuild_pathArr=(
  "/e/work/aehyok/github/vue-qiankun/main-vite-app-ts"
  "/e/work/aehyok/github/vue-qiankun/webpack-app"
  "/e/work/aehyok/github/vue-qiankun/map-app"
)
## 开始 build 项目
for ((i=0;i<${#npmbuild_pathArr[*]};i++))
do
  project_path=${npmbuild_pathArr[i]}
  cd $project_path
  yarn build
  echo -e "\033[32m编译项目：${npmbuild_pathArr[i]} 成功\033[0m";
done

# ######、拷贝完之后进行git 的提交
# cd /f/work/git/dvs-2.x/dvs-release-dev/
# git add .
# git status
# sleep 1s
# message="chore：前端app、qrocde、wechat、console(child)commit-version:${version}"
# git commit -m $message .
# git push origin

echo "5秒后将自动退出本脚本："
for i in $(seq 5 -1 1)
do
  echo -e $i;sleep 1
done
exit

## 执行脚本  sh 2021-06-09-build.sh