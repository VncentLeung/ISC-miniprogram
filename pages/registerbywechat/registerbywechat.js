// pages/registerbywechat/registerbywechat.js
Page({
    data: {
        //用户基本信息（头像、昵称、电话）
        userinfo: {
            avatarUrl: '../../images/my.png',
            nickName: '未授权',
        },
        //是否已经获取用户信息
        hasUserInfo: false,
        //是否可以调用获取信息的函数
        canIUseGetUserProfile: false,
    },
    info(){
        wx.getUserInfo({
          //成功后会返回
          success:(res)=>{
            console.log(res);
            // 把你的用户信息存到一个变量中方便下面使用
            let userInfo= res.userInfo
            //获取openId（需要code来换取）这是用户的唯一标识符
            // 获取code值
            wx.login({
              //成功放回
              success:(res)=>{
                console.log(res);
                let code=res.code
                // 通过code换取openId
                wx.request({
                  url: `https://api.weixin.qq.com/sns/jscode2session?appid=wx6f99bf2b59706cb7&secret=44d3d3b30820282dd14061b7f0970ecd&js_code=${code}&grant_type=authorization_code`,
                  success:(res)=>{
                    console.log(res);
                    userInfo.openid=res.data.openid
                    console.log("我的openid为："+userInfo.openid);
                    wx.setStorageSync('openid', userInfo.openid)

                    //此处将openid传入后端，根据数据库判断，已存在则登陆成功，否则插入这个用户到数据库

                    setTimeout(() => {
                        wx.showToast({
                         title: '登录成功',
                         icon: "success",
                        })
                      }, 500);
                       
                      setTimeout(() => {
                         wx.switchTab({
                             url: '../index/index',
                           })
                      }, 1000);
                  }
                })
               
              }
            })  

          }
        })

      },
    
    
})