cc.Class({
  extends: cc.Component,

  properties: {
    buildingPrefab: cc.Prefab,
    buildingSF: [cc.SpriteFrame],
    ninjaPrefab: cc.Prefab,
    enemyPrefab: cc.Prefab
  },

  // 一轮游戏的初始化
  onLoad() {
    this.loadChild()
  },
  init(c) {
    this._controller = c
    this.UI = c.UI
    this.pageMgr = c.pageMgr
    this.status = 1 //游戏状态
    this.beforeStart()
  },
  loadChild() {
    let content = this.node.getChildByName('scrollView').getChildByName('content')
    this.buildingLand = content.getChildByName('land')
    this.ninjaGroup = content.getChildByName('ninjaGroup')
    this.enemyGroup = content.getChildByName('enemyGroup')
    let UI = this.node.getChildByName('UI')
    this.coolDown = UI.getChildByName('coolDown').getChildByName('label')
    this.coolDown.active = false
  },
  clearAllGroup() {

  },
  beforeStart() {
    this.addBuilding()
    this.clearAllGroup()
    // 计时六十秒 然后生成忍者
    this.coolDownNun = 11
    this.coolDownInterval = setInterval(() => {
      this.coolDownNun--
      if (this.coolDownNun < 0) {
        clearInterval(this.coolDownInterval)
        this.startEnemyInterval()
        this.coolDown.active = false
      } else {
        this.coolDown.active = true
        this.coolDown.getComponent(cc.Label).string = this.coolDownNun
      }
    }, 1000)
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
  },
  //------------ 敌人 -----------------
  startEnemyInterval() {
    this.enemyGenerateInterval = setInterval(() => {
      let enemy = cc.instantiate(this.enemyPrefab)
      enemy.parent = this.enemyGroup
      enemy.x = 0
      enemy.y = 0
      enemy.getComponent('enemy').init(this)
    }, 3000)
  }
  // update (dt) {},
});