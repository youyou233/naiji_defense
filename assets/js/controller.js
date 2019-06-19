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
		this.pageMgr.loadChild().then(() => {
      this.pageMgr.showPage(0)
      this.loadData()
		})
	},
	loadData() {
		this.playerData = _playerData.loadData()
		this.UI.init(this)
		this.UI.updatePageUI(1)//更新菜单页面的UI
	},
	gameStart() {
		this.game.init(this)
		this.pageMgr.showPage(4)
	},
});