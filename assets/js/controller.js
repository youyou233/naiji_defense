var utils = require('utils')
var _playerData = require('playerData')
cc.Class({
	extends: cc.Component,

	properties: {
		pageMgr: require('page'),
		game: require('game'),
		UI: require('UI'), //动态生成UI
	},
	start() {
		utils.setDesignResolution()
		this.loadData()
		this.pageMgr.loadChild().then(() => {
			this.pageMgr.showPage(0)
		})
	},
	loadData() {
		this.playerData = _playerData.loadData()
		this.UI.init(this)
		this.UI.updateAllUI()
	},
	gameStart() {
		this.game.init(this)
		this.pageMgr.showPage(4)
	},
});