const main = () => {
  console.info('i am index.js');
  const btn = document.getElementById('btn');
  const root = document.getElementById('root');
  btn?.addEventListener('click', () => {
    chrome.storage.local.get(['key']).then(result => {
      console.log(`Value currently is ${result.key}`);
      if (root) {
        root.innerHTML = `hello${JSON.stringify(result.key)}`;
      }
    });
  });
};

main();
