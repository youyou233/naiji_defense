var utils = require('utils')
var playerData = require('playerData')
cc.Class({
	extends: cc.Component,

	properties: {
		pageMgr: require('page')
	},
	start() {
		utils.setDesignResolution()
		this.loadData()
		this.pageMgr.loadChild().then(() => {
			this.pageMgr.showPage(0)
		})
	},
	loadData() {
		playerData.loadData()
	}

});