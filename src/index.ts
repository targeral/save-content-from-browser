const main = () => {
  console.info('i am index.js');
  const btn = document.getElementById('btn');
  const clear = document.getElementById('clear');
  const root = document.getElementById('root');
  btn?.addEventListener('click', () => {
    chrome.storage.local.get(['key']).then(result => {
      console.log(`Value currently is ${result.key}`);
      if (root) {
        const items: string[] = JSON.parse(result.key) ?? [];
        const temp = `
         <ul>
          ${items.map(item => `<li>${item}</li>`)}
         </ul>
        `;
        root.innerHTML = temp;
      }
    });
  });

  clear?.addEventListener('click', () => {
    (chrome as any).storage.local.set({ key: null }).then(() => {
      console.log('clear');
    });
  });
};

main();
