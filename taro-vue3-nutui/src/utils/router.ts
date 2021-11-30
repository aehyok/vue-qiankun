import Taro from '@tarojs/taro';

export function useRouter() {
    
    /**
   * 跳转路由
   * @param  url路径 {string}
   */
    const push = (url: string) => {
        Taro.navigateTo({
            url: url
        })
    }

    /**
   * 返回到上一页
   * @param delta {number}
   */
    const go = (delta: number) => {
        Taro.navigateBack({
            delta: -delta
        })
    }

    return {
        push,
        go
    }
}