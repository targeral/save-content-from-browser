/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * 1. 监听按钮事件
 * 2. 当按 "s" 的时候，检查当前页面是否存在选中的内容
 * 3. 保存内容到 Storage 中
 * 4. 插件支持从 Storage 中下载内容，并且下载完后清除下载过的内容。
 * 相关文档：
 * https://juejin.cn/post/6920166753909604366
 * https://www.ucloud.cn/yun/106094.html
 * https://developer.chrome.com/docs/extensions/mv3/content_scripts/#capabilities
 **/
console.info('I am content script1');

const saveChrome = async (value: string) => {
  (chrome as any).storage.local.set({ key: value }).then(() => {
    console.log('Value is set');
  });
};

const getFromChrome = async () => {
  chrome.storage.local.get(['key']).then(result => {
    console.log(`Value currently is ${result.key}`);
  });
};

const saveStorage = (content: string) => {
  const store: string | null = localStorage.getItem('saveContent');
  let realStore: string[];
  if (!store) {
    localStorage.setItem('saveContent', JSON.stringify([]));
    realStore = [];
  } else {
    realStore = JSON.parse(store);
  }

  realStore.push(content);
  localStorage.setItem('saveContent', JSON.stringify(realStore));
};

document.addEventListener('keypress', e => {
  if (e.key.toLowerCase() === 's') {
    const selection = window.getSelection();
    if (!selection) {
      return;
    }
    if (selection.rangeCount > 0) {
      const saveContent = selection.toString();
      console.log('save', saveContent);
      saveChrome(saveContent);
    }
  }
});
