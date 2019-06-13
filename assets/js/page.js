cc.Class({
	extends: cc.Component,

	properties: {
		dialogs: [],
		pages: [],
	},
	loadChild() {
		return new Promise((resolve, rejects) => {
			resolve()
		})
	},

	// -------------- 页面更换 -------------------
	/**
	 * 操作弹框
	 * @param {*} target 传Node则直接操作Node 传数字则去dialogs中取对应的
	 * @param {*} operation 操作方式 1打开 0关闭
	 */
	operateDialog(target, operation) {
		let action = ''
		if (typeof (target) == 'number') {
			target = this.dialogs[target]
		}
		if (operation) {
			target.scale = 0.5
			target.active = true
			action = AC.popOut(0.5)
		} else {
			action = cc.sequence(AC.popIn(0.5), cc.callFunc(() => {
				target.active = false
			}))
		}
		target.runAction(action)
	},
	openDialogBtn(e, d) {
		this.operateDialog(+d, 1)
	},
	closeDialogBtn(e, d) {
		this.operateDialog(+d, 0)
	},
	showPageBtn(e, d) {
		this.showPage(+d)
	},
	showPage(num) {
		this.closeAllDialogs(+num)
		this.operateDialog(+num, 1)
	},
	closeAllDialogs(num) {
		for (let i = 0; i < this.dialogs.length; i++) {
			if (num == i || (i == 1 && num != 0)) continue
			this.operateDialog(i, 0)
		}
	},
	// update (dt) {},
});