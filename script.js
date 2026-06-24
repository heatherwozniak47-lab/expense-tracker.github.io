let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let budget = Number(localStorage.getItem("budget")) || 0;

updateDisplay();

function setBudget() {
    const value = document.getElementById("budget").value;

    if (!value) {
        alert("Enter a budget amount.");
        return;
    }

    budget = Number(value);

    localStorage.setItem("budget", budget);

    updateDisplay();
}

function addExpense() {
    const date = document.getElementById("date").value;

expenses.push({
    amount: Number(amount),
    category,
    date
});
li.innerHTML = `
    ${expense.date} - ${expense.category}: $${expense.amount}
    <button onclick="editExpense(${index})">Edit</button>
<button onclick="deleteExpense(${index})">Delete</button>
`;
    const amount = document.getElementById("amount").value;
    const category = document.getElementById("category").value;

    if (!amount || !category) {
        alert("Please fill out all fields.");
        return;
    }

    expenses.push({
        amount: Number(amount),
        category
    });

    localStorage.setItem("expenses", JSON.stringify(expenses));

    document.getElementById("amount").value = "";
    document.getElementById("category").value = "";

    updateDisplay();
}

function deleteExpense(index) {
    expenses.splice(index, 1);

    localStorage.setItem("expenses", JSON.stringify(expenses));

    updateDisplay();
}

function updateDisplay() {
    const list = document.getElementById("expenseList");
    const totalElement = document.getElementById("total");
    const remainingElement = document.getElementById("remaining");
    const categoryList = document.getElementById("categories");
    function editExpense(index) {
    const expense = expenses[index];
    function toggleDarkMode() {
    document.body.classList.toggle("dark");
    function exportCSV() {
    let csv =
        "Date,Category,Amount\n";

    expenses.forEach(expense => {
        csv +=
            `${expense.date},${expense.category},${expense.amount}\n`;
    });

    const blob =
        new Blob([csv], {
            type: "text/csv"
        });

    const link =
        document.createElement("a");

    link.href =
        URL.createObjectURL(blob);

    link.download =
        "expenses.csv";

    link.click();
}
}

    document.getElementById("amount").value = expense.amount;
    document.getElementById("category").value = expense.category;
    document.getElementById("date").value = expense.date;

    expenses.splice(index, 1);

    localStorage.setItem(
        "expenses",
        JSON.stringify(expenses)
    );

    updateDisplay();
    updateChart();
}

    list.innerHTML = "";
    categoryList.innerHTML = "";

    let total = 0;
    let categoryTotals = {};

    expenses.forEach((expense, index) => {
        total += expense.amount;

        categoryTotals[expense.category] =
            (categoryTotals[expense.category] || 0) + expense.amount;

        const li = document.createElement("li");

        li.innerHTML = `
            ${expense.category}: $${expense.amount}
            <button onclick="deleteExpense(${index})">
                Delete
            </button>
        `;

        list.appendChild(li);
    });

    totalElement.textContent = total;

    remainingElement.textContent = budget - total;

    for (let category in categoryTotals) {
        const li = document.createElement("li");

        li.textContent =
            `${category}: $${categoryTotals[category]}`;

        categoryList.appendChild(li);
    }
}
let chart;

function updateChart() {

    const categoryTotals = {};

    expenses.forEach(expense => {
        categoryTotals[expense.category] =
            (categoryTotals[expense.category] || 0)
            + expense.amount;
    });

    const labels =
        Object.keys(categoryTotals);

    const data =
        Object.values(categoryTotals);

    if (chart) {
        chart.destroy();
    }

    chart = new Chart(
        document.getElementById("expenseChart"),
        {
            type: "pie",
            data: {
                labels,
                datasets: [{
                    data
                }]
            }
        }
    );
}