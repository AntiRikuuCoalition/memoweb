// Get the memo form and memo list elements
const memoForm = document.getElementById('memo-form');
const memoList = document.getElementById('memo-list');

// Add memo form submission event listener
memoForm.addEventListener('submit', function(event) {
  // Prevent the form submission from refreshing the page
  event.preventDefault();
  // Get the memo input field value
  const memo = event.target.elements.memo.value;
  // Check if the memo input field has a value
  if (memo) {
    // Add the memo to the memo list
    addMemo(memo);
    // Clear the memo input field
    event.target.elements.memo.value = '';
    // Save the memos to local storage
    saveMemos();
  }
});

// Add clear memos button event listener
document.getElementById('clear-memos').addEventListener('click', function(event) {
  // Clear the memo list
  memoList.innerHTML = '';
  // Remove the memos from local storage
  localStorage.removeItem('memos');
});

// Add memos from local storage when page loads
loadMemos();

// Function to add a memo to the memo list
function addMemo(memo) {
  // Create the memo item element
  const memoItem = document.createElement('div');
  memoItem.classList.add('memo-item');
  // Create the memo text element
  const memoText = document.createElement('p');
  memoText.innerHTML = escapeHTML(memo).replace(/\n/g, '<br>'); // Add line breaks to memo text
  // Create the copy memo button element
  const copyMemoButton = document.createElement('button');
  copyMemoButton.classList.add('copy-memo-button');
  copyMemoButton.textContent = 'Copy';
  // Add event listener to copy memo button
  copyMemoButton.addEventListener('click', function(event) {
    // Get the memo text from the memo item
    const memo = event.target.parentNode.querySelector('p').textContent;
    // Create a temporary DOM element to hold the memo text
    const tempElement = document.createElement('textarea');
    tempElement.value = memo;
    document.body.appendChild(tempElement);
    // Copy the memo text to the clipboard
    tempElement.select();
    document.execCommand('copy');
    // Remove the temporary DOM element
    document.body.removeChild(tempElement);
    // Alert the user that the memo has been copied
    alert('Copied!');
  });
  // Create the remove memo button element
  const removeMemoButton = document.createElement('button');
  removeMemoButton.textContent = 'Delete';
  // Add event listener to remove memo button
  removeMemoButton.addEventListener('click', function(event) {
    // Remove the memo item from the memo list
    memoList.removeChild(event.target.parentNode);
    // Save the memos to local storage
    saveMemos();
  });
  // Add the memo text, copy memo button, and remove memo button to the memo item
  memoItem.appendChild(memoText);
  memoItem.appendChild(copyMemoButton);
  memoItem.appendChild(removeMemoButton);
  // Add the memo item to the memo list
  memoList.appendChild(memoItem);
}

// Function to load memos from local storage
function loadMemos() {
  // Get the memos from local storage (if set)
  const memosJSON = localStorage.getItem('memos');
  if (memosJSON) {
    // Parse the memos JSON string into an array
    const memos = JSON.parse(memosJSON);
    // Add each memo from the array to the memo list
    memos.forEach(memo => addMemo(memo));
  }
}

// Function to save memos to local storage
function saveMemos() {
  // Get the memos from the memo list
  const memosList = memoList.querySelectorAll('p');
  // Create an empty memos array
  const memos = [];
  // Add each memo text to the memos array
  memosList.forEach(memo => memos.push(unescapeHTML(memo.innerHTML).replace(/<br>/g, '\n'))); // Replace line breaks with \n
  // Stringify the memos array into a JSON string
  const memosJSON = JSON.stringify(memos);
  // Set the memos in local storage
  localStorage.setItem('memos', memosJSON);
}

// Function to escape HTML
function escapeHTML(html) {
  return html.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

// Function to unescape HTML
function unescapeHTML(html) {
  return html.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
}
