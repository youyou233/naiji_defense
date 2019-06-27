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
    this.loadChild().then(() => {
      this.buildingSprite.spriteFrame = num ? g.buildingSF[num - 1] : null
      this.menuNode.active = num ? false : true
      if (num) {
        this.startBuildingLoading()
      } else {
        this.endBuildingLoading()
      }
    })
  },
  loadChild() {
    let self = this
    return new Promise((resolve) => {
      self.buildingSprite = self.node.getChildByName('building').getComponent(cc.Sprite)
      self.menuNode = self.node.getChildByName('btn')
      self.buildingLoading = self.node.getChildByName('buildingLoading').getComponent('buildingLoading')
      self.buildingLoading.node.active = false
      resolve()
    })
  },
  clickBuildingBtn() {
    // 打开弹框
    this._game.clickBuildingBtn(this)
  },
  changeBuilding(num) {
    this.buildingSprite.spriteFrame = this._game.buildingSF[num - 1]
    this.menuNode.active = false
    this.startBuildingLoading()
  },
  // 打开 生成计时器
  startBuildingLoading() {
    this.buildingLoading.node.active = true

    this.buildingLoading.init(this, 5)
  },
  createNinja() {
    let action = cc.sequence(cc.scaleTo(0.2, 0.9, 1.1), cc.scaleTo(0.3, 1.05, 0.95), cc.scaleTo(0.1, 1, 1))
    this.node.stopAllActions()
    this.node.runAction(action)
    this._game.createNode(1).then((ninja) => {
      ninja.parent = this._game.ninjaGroup
      ninja.x = this.node.x - 10 - 300
      ninja.y = 0
      ninja.getComponent('ninja').init(this._game)
    })
  },
  endBuildingLoading() {
    this.buildingLoading.end()
  },
  // update (dt) {},
});