cc.Class({
  extends: cc.Component,

  properties: {},

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {},
  init(c) {
    this._controller = c
    this.loadChild()
  },
  loadChild() {
    this.pages = this._controller.pageMgr.pages
  },
  // ------------ 根据页面刷新UI -----------
  updatePageUI(num) {

  },
  updateAllPageUI() {
    this.updateMoney()
  },
  // 根据数据刷新UI
  updateMoney() {},

  // update (dt) {},
});