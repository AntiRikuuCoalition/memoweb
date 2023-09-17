// ローカルストレージからメモを取得する関数
function getMemos() {
    return JSON.parse(localStorage.getItem('memos')) || [];
}

// メモを保存する関数
function saveMemo(memo) {
    const memos = getMemos();
    memos.push(memo);
    localStorage.setItem('memos', JSON.stringify(memos));
}

// メモを全削除する関数
function clearMemos() {
    localStorage.removeItem('memos');
}

// メモを表示する関数
function showMemos(memos) {
    const memoList = document.getElementById('memo-list');
    memoList.innerHTML = '';
    
    // メモの表示
    memos.forEach(memo => {
        const memoContainer = document.createElement('div');
        memoContainer.classList.add('memo-container');
        const memoText = document.createElement('p');
        memoText.innerText = memo.replace(/\n/g, '<br>'); // 改行を反映する
        memoContainer.appendChild(memoText);
        memoList.appendChild(memoContainer);
    });
}

// 「メモ作成」フォームを送信したときの処理
const memoForm = document.getElementById('memo-form');
memoForm.addEventListener('submit', event => {
    event.preventDefault(); // フォームのデフォルト動作をキャンセル
    
    const memo = event.target.memo.value;
    if (memo !== '') {
        saveMemo(memo);
        event.target.memo.value = '';
        showMemos(getMemos());
    }
});

// 「メモを全削除する」ボタンをクリックしたときの処理
const clearMemosButton = document.getElementById('clear-memos');
clearMemosButton.addEventListener('click', event => {
    clearMemos();
    showMemos(getMemos());
});
