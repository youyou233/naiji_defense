cc.Class({
  extends: cc.Component,
  // TODO: 
  properties: {
    building: null,
    type: 0, //0表示无建筑
  },

  // 一轮游戏的初始化
  init(g, num) { //num从1开始传递
    this._game = g
    this.type = num
    if (num) {
      this.startInterval()
    } else {
      this.endInterval()
    }
    this.loadChild().then(() => {
      this.buildingSprite = num ? g.buildingSF[num - 1] : null
      this.menuNode.active = num ? false : true
    })
  },
  loadChild() {
    return new Promise((resolve) => {
      this.buildingSprite = this.node.getChildByName('building').getComponent(cc.Sprite)
      this.menuNode = this.node.getChildByName('btn')
    })
  },
  clickBuildingBtn() {
    // 打开弹框
    this._game.clickBuildingBtn(this)
  },
  changeBuilding(num) {
    this.buildingSprite.spriteFrame = this._game.buildingSF[num - 1]
    this.menuNode.active = false
    if (num) {
      this.startInterval()
    }
  },
  // 打开 生成计时器
  startInterval() {
    console.log('生成计时器')
    if (this.generateInterval) {
      clearInterval(this.generateInterval)
    }
    //TODO: 时间加入配置文件
    this.generateInterval = setInterval(() => {
      let ninja = cc.instantiate(this._game.ninjaPrefab)
      ninja.parent = this._game.ninjaGroup
      ninja.x = this.node.x - 10 - 300
      ninja.y = 0
      ninja.getComponent('ninja').init(this._game)
    }, 5000)
  },
  endInterval() {
    console.log('关闭计时器')
    if (this.generateInterval) {
      clearInterval(this.generateInterval)
    }
  },
  // update (dt) {},
});