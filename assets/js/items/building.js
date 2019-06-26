cc.Class({
	extends: cc.Component,
// TODO: 
	properties: {
		building: null,
		type: 0, //0表示无建筑
	},

	// 一轮游戏的初始化
	init(g, num) { //num从1开始传递
		this._game = g
		this.type = num
		this.loadChild().then(() => {
			this.buildingSprite = num ? g.buildingSF[num - 1] : null
			this.menuNode.active = num ? false : true
		})
	},
	loadChild() {
		return new Promise((resolve) => {
			this.buildingSprite = this.node.getChildByName('building').getComponent(cc.Sprite)
			this.menuNode = this.node.getChildByName('btn')
		})
	},
	clickBuildingBtn() {
		// 打开弹框
		this._game.clickBuildingBtn(this)
	},
	changeBuilding(num) {
		this.buildingSprite.spriteFrame = this._game.buildingSF[num - 1]
		this.menuNode.active = false
	}
	// update (dt) {},
});