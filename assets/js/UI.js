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