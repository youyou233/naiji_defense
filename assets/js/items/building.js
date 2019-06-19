cc.Class({
  extends: cc.Component,

  properties: {
  },

  // 一轮游戏的初始化
  init(g) {
    this._game = g
    this.loadChild()
  },
  loadChild() {
    this.buildMenu=this.node.getChildByName('menu')
  },
  onTap() {
    this.buildMenu.active = this.buildMenu.active ? false : true
  },
  addBuilding(){
    this.onTap()
    this._game.addBuilding()
  }
  // update (dt) {},
});