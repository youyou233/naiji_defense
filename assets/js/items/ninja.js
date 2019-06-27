cc.Class({
  extends: cc.Component,

  properties: {},

  // LIFE-CYCLE CALLBACKS:

  onLoad() {},
  init(g, type) {
    this._game = g
    this._status = 0
    this.loadChild()
    this.startJumpAni()
  },
  loadChild() {},
  startJumpAni() {
    if (this.aniInterval) {
      clearInterval(this.aniInterval)
    }
    let action = cc.sequence(cc.spawn(cc.sequence(cc.moveBy(0.3, 0, 20).easing(cc.easeOut(2.0)), cc.moveBy(0.3, 0, -20).easing(cc.easeIn(2.0))),
      cc.sequence(cc.scaleTo(0.3, 0.9 * 3, 1.1 * 3), cc.scaleTo(0.3, 1.05 * 3, 0.95 * 3)), cc.moveBy(0.6, 50, 0)), cc.scaleTo(0.1, 3, 3))
    this.aniInterval = setInterval(() => {
      this.node.runAction(action)
    }, 800)
  },
  onCollisionEnter: function (other) {
    if (other.node.name == 'enemy') {
      this._game.onNodeKill(2, other.node)
      this._game.onNodeKill(1, this.node)
    }
  }
});