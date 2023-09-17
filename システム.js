function addMemo() {
  const memoTitle = document.querySelector("#memo-title-input").value;
  const memoContent = document.querySelector("#memo-content-input").value;

  const newMemo = document.createElement("div");
  newMemo.classList.add("memo");

  const memoHeader = document.createElement("div");
  memoHeader.classList.add("memo-header");

  const memoTitleElement = document.createElement("h3");
  memoTitleElement.classList.add("memo-title");
  memoTitleElement.textContent = memoTitle;

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", function() {
    deleteMemo(newMemo);
  });

  memoHeader.appendChild(memoTitleElement);
  memoHeader.appendChild(deleteButton);

  const memoText = document.createElement("div");
  memoText.classList.add("memo-text");
  memoText.innerHTML = memoContent.replace(/\n/g, "<br>"); // 改行に<br>タグを追加

  const copyButton = document.createElement("button");
  copyButton.classList.add("copy-button");
  copyButton.textContent = "Copy";
  copyButton.addEventListener("click", function() {
    copyToClipboard(newMemo.getAttribute("id").substring(4));
  });

  newMemo.appendChild(memoHeader);
  newMemo.appendChild(memoText);
  newMemo.appendChild(copyButton);
  document.querySelector("#memo-container").appendChild(newMemo);

  document.querySelector("#memo-title-input").value = "";
  document.querySelector("#memo-content-input").value = "";
}

function deleteMemo(memo) {
  memo.parentNode.removeChild(memo);
}

function copyToClipboard(memoId) {
  const memoText = document.querySelector(`#memo${memoId} .memo-text`);
  const memoHtml = memoText.innerHTML;
  navigator.clipboard.writeText(memoHtml).then(
    function() {
      console.log("Copied to clipboard successfully!");
    },
    function() {
      console.error("Failed to copy to clipboard");
    }
  );
}
