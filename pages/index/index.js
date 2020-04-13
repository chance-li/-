//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    navData: [{title:'标题1',width:0,left:0},{title:'标题222222',width:0,left:0},{title:'标题33333',width:0,left:0},{title:'标题444',width:0,left:0},{title:'标题55555',width:0,left:0},{title:'标题666',width:0,left:0},{title:'标题7777777',width:0,left:0},{title:'标题8',width:0,left:0},{title:'标题99',width:0,left:0}],
    prevTab: 0,
    currentTab: 0,
    windowWidth: 0,
    navScrollLeft: 0,
    borderLeft: 20,
    borderWidth: 0,
  },
  //事件处理函数
  onLoad: function () {
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      },
    })
  },
  onReady(){
    let that = this
    let left = 20
    for(let idx in that.data.navData){
      let query2 = wx.createSelectorQuery();
      query2.select('#nav-text'+idx).boundingClientRect(function (res) {
        if(idx == '0'){
          that.setData({
            borderWidth: res.width,
            borderLeft: 20,
          })
        }
        that.setData({
          ['navData[' + idx + '].width']: res.width,
          ['navData[' + idx + '].left']: left
        })
        left += res.width+20
      }).exec();
    }
  },
  transitionChange(e) {
    if(e.detail.dx > 0){
      if(this.data.currentTab <= this.data.navData.length-1){
        if(this.data.prevTab == this.data.currentTab){
          let differ = this.data.navData[this.data.currentTab+1].width - this.data.navData[this.data.currentTab].width
          let ratio1 = differ * (e.detail.dx / this.data.windowWidth)
          let differ1 = this.data.navData[this.data.currentTab+1].left - this.data.navData[this.data.currentTab].left
          let ratio2 = differ1 * (e.detail.dx / this.data.windowWidth)
          this.setData({
            borderWidth: this.data.navData[this.data.currentTab].width + ratio1,
            borderLeft: this.data.navData[this.data.currentTab].left + ratio2,
          })
        }else{
          let differ = this.data.navData[this.data.currentTab].width - this.data.navData[this.data.prevTab].width
          let ratio1 = differ * ((e.detail.dx/(this.data.currentTab-this.data.prevTab)) / this.data.windowWidth)
          let differ1 = this.data.navData[this.data.currentTab].left - this.data.navData[this.data.prevTab].left
          let ratio2 = differ1 * ((e.detail.dx/(this.data.currentTab-this.data.prevTab)) / this.data.windowWidth)
          this.setData({
            borderWidth: this.data.navData[this.data.prevTab].width + ratio1,
            borderLeft: this.data.navData[this.data.prevTab].left + ratio2,
          })
        }
      }
    }else{
      if(this.data.currentTab >= 0) {
        if(this.data.prevTab == this.data.currentTab){
          let differ1 = this.data.navData[this.data.currentTab].width - this.data.navData[this.data.currentTab-1].width 
          let ratio1 = differ1 * (e.detail.dx / this.data.windowWidth)
          let differ2 = this.data.navData[this.data.currentTab].left - this.data.navData[this.data.currentTab-1].left
          let ratio2 = differ2 * (e.detail.dx / this.data.windowWidth)
          this.setData({
            borderWidth: this.data.navData[this.data.currentTab].width + ratio1,
            borderLeft: this.data.navData[this.data.currentTab].left + ratio2,
          })
        }else{
          let differ1 = this.data.navData[this.data.prevTab].width - this.data.navData[this.data.currentTab].width 
          let ratio1 = differ1 * ((e.detail.dx/(this.data.currentTab-this.data.prevTab)) / this.data.windowWidth)
          let differ2 = this.data.navData[this.data.prevTab].left - this.data.navData[this.data.currentTab].left
          let ratio2 = differ2 * ((e.detail.dx/(this.data.currentTab-this.data.prevTab)) / this.data.windowWidth)
          this.setData({
            borderWidth: this.data.navData[this.data.prevTab].width - ratio1,
            borderLeft: this.data.navData[this.data.prevTab].left - ratio2,
          })
        }
      }
    }
  },
  navClick(e) {
    var that = this;
    var cur = e.currentTarget.dataset.current;
    if (this.data.currentTab == cur) {
      return false;
    } else {
      this.setData({
        prevTab: this.data.currentTab,
        currentTab: cur
      })
    }
  },
  animationfinish(e){
    let cur = e.detail.current;
    let left = this.data.navData[cur].left - ((this.data.windowWidth / 2) - (this.data.navData[cur].width / 2))
    this.setData({
      prevTab: cur,
      currentTab: cur,
      navScrollLeft: left
    })
  },
  swiperChange(e) {

  }
})