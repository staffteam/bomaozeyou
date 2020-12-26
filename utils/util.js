const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
//上传文件
function uploadFile(url, filePath, name, formData, cb) {
  console.log('a=' + filePath)
  wx.uploadFile({
    url: url,
    filePath: filePath,
    name: name,
    header: {
      'content-type': 'multipart/form-data'
    }, // 设置请求的 header
    formData: formData, // HTTP 请求中其他额外的 form data
    success: function (res) {
      if (res.statusCode == 200 && !res.data.result_code) {
        return typeof cb == "function" && cb(res.data)
      } else {
        return typeof cb == "function" && cb(false)
      }
    },
    fail: function () {
      return typeof cb == "function" && cb(false)
    }
  })
}
const endTime = date => {
  var date1 = new Date(); //开始时间
  var date2 = new Date(date.replace(/-/g, "/")); //结束时间
  var date3 = date2.getTime() - date1.getTime() //时间差的毫秒数
  if (date3 > 0) {
    //计算出相差天数
    var days = Math.floor(date3 / (24 * 3600 * 1000))
    //计算出小时数
    var leave1 = date3 % (24 * 3600 * 1000) //计算天数后剩余的毫秒数
    var hours = Math.floor(leave1 / (3600 * 1000))
    //计算相差分钟数
    var leave2 = leave1 % (3600 * 1000) //计算小时数后剩余的毫秒数
    var minutes = Math.floor(leave2 / (60 * 1000))
    //计算相差秒数
    var leave3 = leave2 % (60 * 1000) //计算分钟数后剩余的毫秒数
    var seconds = Math.round(leave3 / 1000);
    var run = '';
    run += days > 0 ? days + '天' : '';
    run += hours > 0 ? hours + '时' : '';
    run += minutes > 0 ? minutes + '分' : '';
    return run;
  } else {
    return null;
  }
}

module.exports = {
  formatTime,
  endTime,
  uploadFile
}