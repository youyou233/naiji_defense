cc.Class({
	extends: cc.Component,

	properties: {},

	// LIFE-CYCLE CALLBACKS:

	onLoad() {},
	init(b, time) {
		this._building = b
		this.time = time
		this.loadChild().then(() => {
			this.startLoading()
		})
	},
	loadChild() {
		return new Promise((resolve) => {
			this.loadingNode = this.node.getChildByName('loadingNode')
		})
	},
	startLoading() {
		if (this.loadingInterval) {
			clearInterval(this.loadingInterval)
		}
		this.loadingInterval = setInterval(() => {
			let action = cc.scaleTo(this.time, 1, 1)
			this.loadingNode.scaleX = 0
			this.loadingNode.runAction(action)
			this._building.createNinja()
		}, this.time * 1000)
	},
	end() {
		if (this.loadingInterval) {
			clearInterval(this.loadingInterval)
		}
	},
});