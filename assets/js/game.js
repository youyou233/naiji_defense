cc.Class({
  extends: cc.Component,

  properties: {
    buildingSF: [cc.SpriteFrame],
    prefabs: [cc.Prefab], //0建筑 1忍者 2敌人
  },

  // 一轮游戏的初始化
  onLoad() {
    cc.director.getCollisionManager().enabled = true;
    this.loadChild()
    this.initNodePools()
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
    return new Promise((resolve) => {
      this.recoveryAllBlocks(this.buildingLand, 0)
      this.recoveryAllBlocks(this.ninjaGroup, 1)
      this.recoveryAllBlocks(this.enemyGroup, 2)
      resolve()
    })
  },
  beforeStart() {
    this.clearAllGroup().then(() => {
      this.addBuilding()
    })
    // 计时六十秒 然后生成忍者
    this.coolDownNun = 11
    if (this.coolDownInterval) {
      clearInterval(this.coolDownInterval)
    }
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
    this.createNode(0).then((building) => {
      building.parent = this.buildingLand
      building.getComponent('building').init(this)
    })
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
  gameOver() {
    if (this.status == 1) {
      this.status = 2
      this.pageMgr.operateDialog(2, 1, 0)
    }
  },
  onFailClick() {
    this.status = 0
    this.pageMgr.operateDialog(2, 0, 0)
    this.pageMgr.showPage(1, 1)
  },
  //------------ 敌人 -----------------
  startEnemyInterval() {
    if (this.enemyGenerateInterval) {
      clearInterval(this.enemyGenerateInterval)
    }
    this.enemyGenerateInterval = setInterval(() => {
      this.createNode(2).then((enemy) => {
        enemy.parent = this.enemyGroup
        enemy.x = 0
        enemy.y = 0
        enemy.getComponent('enemy').init(this)
      })
    }, 3000)
  },


  // -------------------- 对象池控制 ----------------
  initNodePools() {
    this.nodePools = []
    for (let i = 0; i < this.prefabs.length; i++) {
      this.nodePools[i] = new cc.NodePool()
      for (let j = 0; j < 5; j++) {
        let item = cc.instantiate(this.prefabs[i])
        this.nodePools[i].put(item)
      }
    }
  },
  createNode(num) {
    return new Promise((resolve) => {
      let node = null
      if (this.nodePools[num].size() > 0) {
        node = this.nodePools[num].get()
      } else {
        node = cc.instantiate(this.prefabs[num])
      }
      resolve(node)
    })
  },
  onNodeKill(type, target) {
    this.nodePools[type].put(target)
  },
  recoveryAllBlocks(parent, type) {
    let children = parent.children
    if (children.length != 0) {
      for (let i = 0; i < children.length; i++) {
        this.nodePools[type].put(children[0])
      }
    }
  },
  // update (dt) {},
});