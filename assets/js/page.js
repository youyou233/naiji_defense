var AC = require('action')
cc.Class({
	extends: cc.Component,

	properties: {
		dialogs: [],
		pages: [],
	},
	currentPage: 0,
	loadChild() {
		return new Promise((resolve, rejects) => {

			resolve()
		})
	},

	// -------------- 弹框更换 -------------------
	/**
	 * 操作弹框
	 * @param {*} target 传Node则直接操作Node 传数字则去dialogs中取对应的
	 * @param {*} operation 操作方式 1打开 0关闭
	 * @param dir 卷轴方向 0横板 1竖版
	 * @param mask 是否有背景遮罩 TODO:
	 */
	operateDialog(target, operation, dir, mask) {
		let action = ''
		if (typeof (target) == 'number') {
			target = this.dialogs[target]
		}
		let content = target.getChildByName('content')
		// 判断操作
		if (operation) {
			content.active = false
			// 判断方向
			if (dir) {
				// 打开竖版弹框
				target.y = window.winSize.height / 2 + target.size.y / 2
				target.active = true
			} else {
				// 打开横板弹框
				target.x = window.winSize.width / 2 + target.size.x / 2
				target.active = true
			}
			let action = cc.moveTo(1, 0, 0)
			target.runAction(action)
		} else {
			// 判断方向
			var action = ''
			if (dir) {
				action = cc.moveTo(1, -window.winSize.height / 2 - target.size.y / 2, 0)
				// 关闭竖版弹框
			} else {
				action = cc.moveTo(1, 0, -window.winSize.width / 2 - target.size.x / 2)
				// 关闭横板弹框
			}
			target.runAction(cc.sequence(action, cc.callFunc(() => {
				target.active = false
			})))
		}

	},
	openDialogBtn(e, d) {
		this.operateDialog(+d, 1)
	},
	closeDialogBtn(e, d) {
		this.operateDialog(+d, 0)
	},
	//------------------- 页面切换 ----------------
	showPage(num) {
		if (num == this.currentPage) {
			return
		}
	},
	// update (dt) {},
});