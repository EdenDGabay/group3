document.addEventListener("DOMContentLoaded", () => {
    displaySwaps();
    updateCounts();
});

const displaySwaps = () => {
    const swapTableBody = document.getElementById('swapHistoryBody');
    swapTableBody.innerHTML = `
        <tr>
            <td>0</td>
            <td>2024-01-01</td>
            <td>Sample Swapper</td>
            <td>Example Book Title</td>
        </tr>
    `;

    const swapsCount = parseInt(localStorage.getItem('lastSwapNumber') || 0);
    for (let i = 1; i <= swapsCount; i++) {
        const swap = JSON.parse(localStorage.getItem('swap' + i));
        if (swap) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${swap.swapNumber}</td>
                <td>${swap.swapDate}</td>
                <td>${swap.swappedWith}</td>
                <td>${swap.bookName}</td>
            `;
            swapTableBody.appendChild(row);
        }
    }
};

const updateCounts = () => {
    const staticExamplesCount = 1;
    const dynamicSwapsCount = parseInt(localStorage.getItem('booksSwappedCount') || 0);
    const totalCount = staticExamplesCount + dynamicSwapsCount;
    document.getElementById('booksSwappedCount').textContent = totalCount;
};

const addSwap = () => {
    let currentCount = parseInt(localStorage.getItem('booksSwappedCount') || 0);
    localStorage.setItem('booksSwappedCount', currentCount + 1);
    updateCounts();
};

document.getElementById('addSwapButton').addEventListener('click', () => {
    document.getElementById('newSwapForm').style.display = 'block';
    document.getElementById('swapNumber').value = parseInt(localStorage.getItem('lastSwapNumber') || '0') + 1;
});

const submitNewSwap = () => {
    const swapNumber = document.getElementById('swapNumber').value;
    const swapDate = document.getElementById('swapDate').value;
    const swappedWith = document.getElementById('swappedWith').value;
    const bookName = document.getElementById('bookName').value;

    if (!validateTextFields(swapDate, swappedWith, bookName)) {
        return;
    }

    const newSwap = { swapNumber, swapDate, swappedWith, bookName };
    localStorage.setItem('lastSwapNumber', swapNumber);
    localStorage.setItem('swap' + swapNumber, JSON.stringify(newSwap));
    addSwap();

    document.getElementById('newSwapForm').style.display = 'none';
    resetFormFields();

    displaySwaps();
};

const resetFormFields = () => {
    document.getElementById('swapNumber').value = '';
    document.getElementById('swapDate').value = '';
    document.getElementById('swappedWith').value = '';
    document.getElementById('bookName').value = '';
};

const validateTextFields = (swapDate, swappedWith, bookName) => {
    const validTextRegex = /^[a-zA-Z\s,'-]+$/;
    if (!swapDate || !validTextRegex.test(swappedWith) || !validTextRegex.test(bookName)) {
        alert("Please enter valid values in all fields.");
        return false;
    }
    return true;
};

document.getElementById('newSwapForm').addEventListener('submit', (event) => {
    event.preventDefault();
    submitNewSwap();
});
