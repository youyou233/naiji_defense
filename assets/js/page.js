cc.Class({
	extends: cc.Component,

	properties: {
		dialogs: [],
		pages: [],
	},
	currentPage: 0,
	backUpPage: 0,
	loadChild() {
		// 加载页面节点
		let canvas = cc.director.getScene().getChildByName('Canvas')
		return new Promise((resolve, rejects) => {
			let childArr = canvas.children
			for (let i = 0; i < childArr.length; i++) {
				if (childArr[i].name.indexOf('Page') != -1) {
					this.pages.push(childArr[i])
				}
			}
			this.closeAllPage()
			resolve()
		})
	},

	// -------------- 弹框更换 -------------------
	/**
	 * 操作弹框
	 * @param {*} target 传Node则直接操作Node 传数字则去dialogs中取对应的
	 * @param {*} operation 操作方式 1打开 0关闭
	 * @param dir 卷轴方向 0横板 1竖版
	 * @param mask 是否有背景遮罩 
	 */
	operateDialog(target, operation, dir, mask) {
		if (typeof (target) == 'number') {
			target = this.dialogs[target]
		}
		let content = target.getChildByName('content')
		let action = ''
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
			action = cc.moveTo(1, 0, 0)
			target.runAction(action)
		} else {
			// 判断方向
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
	/**
	 * 切换页面 兼容第一次打开页面
	 * @param currentPage
	 * @param {*} target 
	 */
	showPage(target, back) {
		let back = back || false
		if (typeof (target) == 'number') {
			target = this.pages[target]
		}
		if (!this.currentPage) {
			this.currentPage = target
			this.currentPage.active = true
			return
		}
		if (target == this.currentPage) {
			return
		}
		target.x = back ? -window.winSize.width : window.winSize.width
		target.active = true
		let action = cc.moveBy(1, back ? window.winSize.width : -window.winSize.width, 0).easing(cc.easeBackOut(2.0))
		let action2 = cc.moveBy(1, back ? window.winSize.width : -window.winSize.width, 0).easing(cc.easeBackOut(2.0))
		this.currentPage.runAction(cc.sequence(action2, cc.callFunc(() => {
			this.currentPage.active = false
		})))
		target.runAction(cc.sequence(action, cc.callFunc(() => {
			this.currentPage = target
		})))
		this.aniUI(target)
	},
	// 切换上一个页面
	backUp(e, d) {

	},
	showPageBtn(e, d) {
		this.showPage(+d)
	},
	closeAllPage() {
		for (let i in this.pages) {
			this.pages[i].active = false
		}
	},
	// ------------- UI ---------------
	aniUI(target) {
		// let UINode=target.getChildByName('UI')
		// if(UINode.getChildByName('top')){
		//   let top=UINode.getChildByName('top')
		//   top.active=false
		//   top.y=window.winSize.height
		// }
	},
	// update (dt) {},
});