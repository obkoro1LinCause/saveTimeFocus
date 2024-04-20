// 安装完成事件
chrome.runtime.onInstalled.addListener(() => {
	const url = chrome.runtime.getURL('options.html');
	chrome.tabs.create({ url: url });
	console.log(`background.js loaded tab create`,url);
});

console.log(`background.js loaded`);