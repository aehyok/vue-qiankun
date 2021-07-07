export const checkPhoneFun = val => {
  if (!/^1\d{10}$/.test(val)) {
    return false
  }
  return true
}

// https://blog.csdn.net/zkcharge/article/details/117168220
// 判断经纬度是否在某个围栏中
export const IsPtInPoly = (ALon, ALat, APoints) => {
	var iSum = 0,
		iCount;
	var dLon1, dLon2, dLat1, dLat2, dLon;
	if (APoints.length < 3) return false;
	iCount = APoints.length;
	for (var i = 0; i < iCount; i++) {
		if (i == iCount - 1) {
			dLon1 = APoints[i].lng;
			dLat1 = APoints[i].lat;
			dLon2 = APoints[0].lng;
			dLat2 = APoints[0].lat;
		} else {
			dLon1 = APoints[i].lng;
			dLat1 = APoints[i].lat;
			dLon2 = APoints[i + 1].lng;
			dLat2 = APoints[i + 1].lat;
		}
		//以下语句判断A点是否在边的两端点的水平平行线之间，在则可能有交点，开始判断交点是否在左射线上
		if (((ALat >= dLat1) && (ALat < dLat2)) || ((ALat >= dLat2) && (ALat < dLat1))) {
			if (Math.abs(dLat1 - dLat2) > 0) {
				//得到 A点向左射线与边的交点的x坐标：
				dLon = dLon1 - ((dLon1 - dLon2) * (dLat1 - ALat)) / (dLat1 - dLat2);
				if (dLon < ALon)
					iSum++;
			}
		}
	}
	if (iSum % 2 != 0)
		return true;
	return false;
}