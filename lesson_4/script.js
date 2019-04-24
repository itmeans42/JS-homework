let money, time;

function start() {
    money = +prompt ("Ваш бюджет на месяц?", '');
    time = prompt ("Введите дату в формате YYYY-MM-DD", '');

    while(isNaN(money) || money == "" || money == null) {
        money = +prompt ("Ваш бюджет на месяц?", '');
    }
}
start();

let appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: true,
    chooseExpenses: function() {
        for (let i = 0; i < 2;) {
            let a = prompt("Введите обязательную статью расходов в этом месяце:", ''),
                b = prompt("Во сколько обойдется?", '');
        
            if ( typeof(a) === 'string' && typeof(a) != null && typeof(b) != null
                && a != '' && b != '' && a.length < 50) {
                console.log("Done!");
                appData.expenses[a] = b;
                i++;
            }
        }
    },
    detectDayBudget: function() {
        appData.moneyPerDay = (appData.budget / 30).toFixed();
        alert("Ежедневный бюджет: " + appData.moneyPerDay);
    },
    detectLevel: function() {
        if (appData.moneyPerDay < 100) {
            console.log("Минимальный уровень достатка");
        } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
            console.log("Средний уровень достатка");
        } else if (appData.moneyPerDay > 2000) {
            console.log("Высокий уровень достатка");
        } else {
            console.log("Произошла ошибка");
        }   
    },
    checkSavings: function() {
        if (appData.savings == true) {
            let save = +prompt("Какова сумма накоплений?", ''),
                percent = +prompt("Под какой процент?", '');
            
            appData.monthIncome = save/100/12*percent;
            alert("Доход в месяц с вашего депозита: " + appData.monthIncome);
        }
    }, 
    chooseOptExpenses: function() {
        for (let i = 1; i < 4;) {
            let optQuestion = prompt("Статья необязательных расходов?", '');
        
            if ( typeof(optQuestion) === 'string' && typeof(optQuestion) != null
                && optQuestion != '' && optQuestion.length < 50) {
                console.log("Done!");
                appData.optionalExpenses[i] = optQuestion;
                i++;
            }
        }
    },
    chooseIncome: function () {
        for (let i = 0; i < 1; i++) {
        let items = prompt('Что принесёт дополнительный доход? (Напишите через запятую)', '');
    
        if ((typeof (items)) === 'string' && items != '' && (typeof (items)) != null) {
            appData.income = items.split(', ');
            appData.income.push(prompt('Может быть, что-то ещё?'));
            appData.income.sort();
            appData.income.forEach( function(item, i, income) {
            let number = i + 1;
            console.log(number + ' Способы доп. заработка: ' + item);
            });
            } else {
                i--;
            }
        }
    },
    
};
for (let key in appData) {
    console.log('Наша программа включает в себя данные: ' + key + appData[key]);
}