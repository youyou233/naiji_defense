cc.Class({
	extends: cc.Component,

	properties: {},

	// LIFE-CYCLE CALLBACKS:

	// onLoad () {},
	init(g) {
		this._game = g
		this.loadChild()
	},
	loadChild() {

	},
	start() {

	},
	onGameStart() {

	},
	updateMoney() {},
	updateAllUI() {
		this.updateMoney()
	}
	// update (dt) {},
});