let money, 
    time,
    startBtn = document.getElementById('start'),
    budget = document.getElementsByClassName('budget-value') [0],
    dayBudget = document.getElementsByClassName('daybudget-value') [0],
    levelValue = document.getElementsByClassName('level-value') [0],
    expensesValue = document.getElementsByClassName('expenses-value') [0],
    optionalExpenses = document.getElementsByClassName('optionalexpenses-value') [0],
    incomeValue = document.getElementsByClassName('income-value') [0],
    monthSavings = document.getElementsByClassName('monthsavings-value') [0],
    yearSavings = document.getElementsByClassName('yearsavings-value') [0],

    expensesItem = document.getElementsByClassName('expenses-item'),    
    expensesBtn = document.getElementsByTagName('button') [0],
    optionalExpensesBtn = document.getElementsByTagName('button') [1],
    countBtn = document.getElementsByTagName('button') [2],
    optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item'),
    chooseIncome = document.querySelector('.choose-income'),
    checkSavings = document.querySelector('#savings'),
    sumValue = document.querySelector('.choose-sum'),
    percentValue = document.querySelector('.choose-percent'),
    yearValue = document.querySelector('.year-value'),
    monthValue = document.querySelector('.month-value'),
    dayValue = document.querySelector('.day-value'),

    appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false
};

countBtn.disabled = true;
countBtn.style.background = '#C0C0C0';

startBtn.addEventListener('click', function () {
    time = prompt('Введите дату в формате YYYY-MM-DD', '');
    money = +prompt('Ваш бюджет на месяц?', '');

    while (isNaN(money) || money == "" || money == null) {
        money = +prompt('Ваш бюджет?', '');
    }

    appData.budget = money;
    appData.timeData = time;
    budget.textContent = money.toFixed();
    yearValue.value = new Date(Date.parse(time)).getFullYear();
    monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
    dayValue.value = new Date(Date.parse(time)).getDate();

    countBtn.disabled = false;
    countBtn.style.background = ''; 
});

expensesBtn.addEventListener('click', function() {
    let sum = 0;
    for (let i = 0; i < expensesItem.length;) {
        let a = expensesItem[1].value,
            b = expensesItem[++i].value;
            appData.expenses[a] = b;
            sum += +b;
            i++;
    }

    expensesValue.textContent = sum;
    appData.expensesSum = sum;
});

optionalExpensesBtn.addEventListener('click', function() {
    for (let i = 0; i < optionalExpensesItem.length;) {
        let optQuestion = optionalExpensesItem[i].value;
            appData.optionalExpenses[i] = optQuestion;
            optionalExpenses.textContent += appData.optionalExpenses[i] + ' ';
            i++;
    }
});

countBtn.addEventListener('click', function() {
    let expenses = appData.expensesSum;

    if (appData.budget != undefined) {
        appData.moneyPerDay = ((appData.budget - expenses) / 30).toFixed();
        dayBudget.textContent = appData.moneyPerDay;
    
        if (appData.moneyPerDay < 100) {
            levelValue.textContent = "Минимальный уровень достатка";
        } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
            levelValue.textContent = "Средний уровень достатка";
        } else if (appData.moneyPerDay > 2000) {
            levelValue.textContent = "Высокий уровень достатка";
        } else {
            levelValue.textContent = "Произошла ошибка";
        }  
    } else {
        dayBudget.textContent = "Произошла ошибка";
    }
});

chooseIncome.addEventListener('change', function() {
    let items = chooseIncome.value;
    appData.income = items.split(', ');
    incomeValue.textContent = appData.income;
});

checkSavings.addEventListener('click', function() {
    if (appData.savings == true) {
        appData.savings = false;
    } else {
        appData.savings = true;
    }
});

sumValue.addEventListener('input', function() {
    if (appData.savings == true) {
        let sum = +sumValue.value,
            percent = +percentValue.value;

        appData.monthIncome = sum/100/12*percent;
        appData.yearIncome = sum/100*percent;

        monthSavings.textContent = appData.monthIncome.toFixed(1);
        yearSavings.textContent = appData.yearIncome.toFixed(1);
    }
});

percentValue.addEventListener('input', function() {
    if (appData.savings == true) {
        let sum = +sumValue.value,
            percent = +percentValue.value;

        appData.monthIncome = sum/100/12*percent;
        appData.yearIncome = sum/100*percent;

        monthSavings.textContent = appData.monthIncome.toFixed(1);
        yearSavings.textContent = appData.yearIncome.toFixed(1);    
    }
});

setInterval(function time() {
    if (fixButtons(expensesItem) && budget.textContent != '') {
    expensesBtn.disabled = false;
    expensesBtn.style.background = '';    
    } else {
    expensesBtn.disabled = true;
    expensesBtn.style.background = '#C0C0C0';
    }
    if (fixButtons(optionalExpensesItem) && budget.textContent != '') {
    optionalExpensesBtn.disabled = false;
    optionalExpensesBtn.style.background = '';
    } else {
    optionalExpensesBtn.disabled = true;
    optionalExpensesBtn.style.background = '#C0C0C0';      
    }

}, 500);

function fixButtons(arr) {
	for(let i = 0; i < arr.length; i++) {
		if (arr[i].value == '') {
			return false;
		}
	}
	return true;
}