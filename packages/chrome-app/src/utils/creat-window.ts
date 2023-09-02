export function createWindow(left:number, top:number, width:number, height:number) {
	chrome.windows.create(
		{
			url: chrome.runtime.getURL("options.html"),
			type: "popup",
			left, top,
			width, height
		}, 
		function(window:any) {
			// 保存：通过变更保存窗口信息会被释放
			chrome.storage.local.set({'wid': window.id});
		}
	);
}

export async function getWidnow() {
	let result = await chrome.storage.local.get(["wid"]);
	let wid = parseInt(result.wid);
	// console.log(`${result.wid} ${wid}`);
	if (wid) {
		// 不能使用windows.get，当id对应窗口不存在时会报错
		let windows = await chrome.windows.getAll({windowTypes: ['popup']});
		for (let w of windows) {
			if (w.id === wid) {
				return w;
			}
		}
	}
	return null;
}

export async function handlerWindow(){
	let window:any = await getWidnow();
	if (window) {
	let info = { focused: true };
	    chrome.windows.update(window.id, info);
	} else {
	// 以小（mac）为准：mac用户如果调整为一个较小值后，重启能恢复
        let left:any = 100;
        let top:any = 100;
        let width:any = 1000;
        let height:any = 598;
        let result:any = await chrome.storage.sync.get(['windowSize']);
        if (result.windowSize) {
            width = parseInt(result.windowSize.width);
            height = parseInt(result.windowSize.height);
        }
        width = Math.max(width, 1000);
        height = Math.max(height, 598);
        if (chrome.system && chrome.system.display) {
            let displays:any = await chrome.system.display.getInfo();
            if (displays.length > 0) {
                let display:any = displays[0];
                let bounds:any = display.bounds;
                width = Math.min(bounds.width, width);
                height = Math.min(bounds.height, height);
                const leftNum:string = (bounds.width - width)/2 + '';
                const topNum:string = (bounds.height - height)/2 + ''
                left = parseInt(leftNum);
                top = parseInt(topNum);
                createWindow(left, top, width, height);
            } else {
                createWindow(left, top, width, height);
            }
        } else {
            createWindow(left, top, width, height);
        }
	}
}

