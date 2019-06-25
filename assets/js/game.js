cc.Class({
  extends: cc.Component,

  properties: {
    buildingPrefab: cc.Prefab,
    buildingSF: [cc.SpriteFrame],
  },

  // 一轮游戏的初始化
  onLoad() {
    this.loadChild()
  },
  init(c) {
    this._controller = c
    this.UI = c.UI
    this.pageMgr = c.pageMgr
    this.addBuilding()
  },
  loadChild() {
    this.buildingLand = this.node.getChildByName('scrollView').getChildByName('content').getChildByName('land')
  },
  clickBuildingBtn(current) {
    this.currentBuilding = current
    // 打开建筑的页面
    this.pageMgr.operateDialog(1, 1, 1)
  },
  // --------------- 建筑 -----------
  addBuilding() {
    console.log('增加建筑嗷')
    let building = cc.instantiate(this.buildingPrefab)
    building.parent = this.buildingLand
    building.getComponent('building').init(this)
  },
  // 改变建筑
  buildBtn(e, d) {
    this.currentBuilding.changeBuilding(+d)
    this.pageMgr.operateDialog(1, 0, 1)
    this.addBuilding()
  },
  // 获得当前建筑组
  getBuildingArr() {
    return new Promise((resolve) => {
      this.buildingArr = []
      let arr = this.buildingLand.children
      for (let item in arr) {
        this.buildingArr.push(arr[item].getComponent('building'))
      }
    })
  }
  // update (dt) {},
});