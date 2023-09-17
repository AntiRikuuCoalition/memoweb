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
		// Save the memos to a cookie
		saveMemos();
	}
});

// Add clear memos button event listener
document.getElementById('clear-memos').addEventListener('click', function(event) {
	// Clear the memo list
	memoList.innerHTML = '';
	// Remove the memos cookie
	localStorage.removeItem('memos');
});

// Add memos from localStorage when page loads
loadMemos();

// Function to add a memo to the memo list
function addMemo(memo) {
	// Create the memo item element
	const memoItem = document.createElement('div');
	memoItem.classList.add('memo-item');
	// Create the memo text element
	const memoText = document.createElement('p');
	memoText.textContent = memo;
	// Create the copy memo button element
	const copyMemoButton = document.createElement('button');
	copyMemoButton.classList.add('copy-memo-button');
	copyMemoButton.textContent = 'コピー';
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
		alert('コピーしました');
	});
	// Create the remove memo button element
	const removeMemoButton = document.createElement('button');
	removeMemoButton.textContent = '削除';
	// Add event listener to remove memo button
	removeMemoButton.addEventListener('click', function(event) {
		// Remove the memo item from the memo list
		memoList.removeChild(event.target.parentNode);
		// Save the memos to localStorage
		saveMemos();
	});
	// Add the memo text, copy memo button, and remove memo button to the memo item
	memoItem.appendChild(memoText);
	memoItem.appendChild(copyMemoButton);
	memoItem.appendChild(removeMemoButton);
	// Add the memo item to the memo list
	memoList.appendChild(memoItem);
}

// Function to load memos from localStorage
function loadMemos() {
	// Get the memos from localStorage (if set)
	const memos = JSON.parse(localStorage.getItem('memos'));
	if (memos) {
		// Add each memo from the array to the memo list
		memos.forEach(memo => addMemo(memo));
	}
}

// Function to save memos to localStorage
function saveMemos() {
	// Get the memos from the memo list
	const memosList = memoList.querySelectorAll('p');
	// Create an empty memos array
	const memos = [];
	// Add each memo text to the memos array
	memosList.forEach(memo => memos.push(memo.textContent));
	// Save the memos to localStorage
	localStorage.setItem('memos', JSON.stringify(memos));
}

// Function to get a cookie by name (Not needed anymore)
function getCookie(name) {
	return null;
}
