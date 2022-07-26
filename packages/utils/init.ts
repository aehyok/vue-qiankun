export const checkPhoneFun = (val: any) => {
  if (!/^1\d{10}$/.test(val)) {
    return false
  }
  return true
}

// https://blog.csdn.net/zkcharge/article/details/117168220
// 判断经纬度是否在某个围栏中
export const IsPtInPoly = (aLon: any, aLat: any, aPoints: any) => {
  let iSum = 0
  let dLon1
  let dLon2
  let dLat1
  let dLat2
  let dLon
  if (aPoints.length < 3) return false
  const iCount = aPoints.length
  for (let i = 0; i < iCount; i++) {
    if (i === iCount - 1) {
      dLon1 = aPoints[i].lng
      dLat1 = aPoints[i].lat
      dLon2 = aPoints[0].lng
      dLat2 = aPoints[0].lat
    } else {
      dLon1 = aPoints[i].lng
      dLat1 = aPoints[i].lat
      dLon2 = aPoints[i + 1].lng
      dLat2 = aPoints[i + 1].lat
    }
    // 以下语句判断A点是否在边的两端点的水平平行线之间，在则可能有交点，开始判断交点是否在左射线上
    if ((aLat >= dLat1 && aLat < dLat2) || (aLat >= dLat2 && aLat < dLat1)) {
      if (Math.abs(dLat1 - dLat2) > 0) {
        // 得到 A点向左射线与边的交点的x坐标：
        dLon = dLon1 - ((dLon1 - dLon2) * (dLat1 - aLat)) / (dLat1 - dLat2)
        if (dLon < aLon) iSum++
      }
    }
  }
  if (iSum % 2 !== 0) return true
  return false
}

export const init = () => {
  console.log('window.__POWERED_BY_QIANKUN__', window.__POWERED_BY_QIANKUN__)
  // eslint-disable-next-line no-underscore-dangle
  if (window.__POWERED_BY_QIANKUN__) {
    /* eslint-disable camelcase */
    // eslint-disable-next-line no-undef, no-underscore-dangle
    __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__
  }
}
