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
		let action = cc.spawn(cc.sequence(cc.moveBy(0.3, 0, 20).easing(cc.easeOut(2.0)), cc.moveBy(0.3, 0, -20).easing(cc.easeIn(2.0))), cc.moveBy(0.6, 50, 0))
		this.aniInterval = setInterval(() => {
			this.node.runAction(action)
		}, 800)
	},
	onCollisionEnter: function (other) {
		console.log(other)
		if (other.name == 'enemy') {
			
		}
	}
});