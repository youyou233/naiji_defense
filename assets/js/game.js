cc.Class({
  extends: cc.Component,

  properties: {
    buildingPrefab: cc.Prefab,
  },

  // 一轮游戏的初始化
  onLoad() {
    this.loadChild()
  },
  init(c) {
    this._controller = c
    this.UI = c.UI
    this.initBuildings()
  },
  loadChild() {
    this.buildingLand = this.node.getChildByName('scrollView').getChildByName('content').getChildByName('land')
    this.buildingArr = this.buildingLand.children
  },
  initBuildings() {
    for (let i in this.buildingArr) {
      this.buildingArr[i].getComponent('building').init(this)
    }
  },

  // --------------- 增加建筑 -----------
  addBuilding() {
    console.log('增加建筑嗷')
    let building = cc.instantiate(this.buildingPrefab)
    building.parent = this.buildingLand
    building.getComponent('building').init(this)
  },
  // update (dt) {},
});