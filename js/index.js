// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const minWeightInput = document.querySelector('.minweight__input');
const maxWeightInput = document.querySelector('.maxweight__input');
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления

let colorCollection = ["#84df8a", "#e2d4d7", "#c5aaaf", "#d0dbce", "#b2c3ae", "#e1cbcb", "#d8c4c4", "#d4ced6", "#afa4b3", "#1f2433", "#1387c4", "#eec0c4", "#ee22cc", "#093951", "#939510", "#ffdddd", "#dddd00", "#0d0d0d", "#d0d0d0", "#00d0d0", "#d0d000", "#d00000", "#00001d", "#0001d0", "#001d00", "#01d000", "#1d0000", "#11dd00", "#0011dd", "#335566", "#aa77ee", "#331144", "#aaee99", "#cceeaa", "#eeffcc", "#eeaaff", "#eeccdd", "#331133", "#44aa11", "#bbaa11", "#992040", "#5e6175", ];

// список фруктов в JSON формате
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
]`;

// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);



/*** ОТОБРАЖЕНИЕ ***/

// отрисовка карточек
const display = (arr) => {
  fruitsList.querySelectorAll('li').forEach(elem => elem.remove()); // Удаляем все вложенные элементы из списка фрутов
  for (let i = 0; i < arr.length; i++) {
    // TODO: формируем новый элемент <li> при помощи document.createElement,
    // и добавляем в конец списка fruitsList при помощи document.appendChild
    let liElem = document.createElement('li'), 
        divWrapperElem = document.createElement('div');

    liElem.classList.add('fruit__item');
    divWrapperElem.classList.add('fruit__info');

    liElem.style.background = colorCollection[Math.floor(Math.random() * colorCollection.length)];
    divWrapperElem.innerHTML = `
      <div>${i}</div>
      <div>${arr[i].kind}</div>
      <div>${arr[i].color}</div>
      <div>${arr[i].weight}</div>
      `;

    liElem.append(divWrapperElem);
    fruitsList.append(liElem);
  }
};

// первая отрисовка карточек
display(fruits);

/*** ПЕРЕМЕШИВАНИЕ ***/

// генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// перемешивание массива
const shuffleFruits = () => {
  let result = [];

  // ATTENTION: сейчас при клике вы запустите бесконечный цикл и браузер зависнет
  // while (fruits.length > 0) {
  //   // TODO: допишите функцию перемешивания массива
  //   //
  //   // Подсказка: находим случайный элемент из fruits, используя getRandomInt
  //   // вырезаем его из fruits и вставляем в result.
  //   // ex.: [1, 2, 3], [] => [1, 3], [2] => [3], [2, 1] => [], [2, 1, 3]
  //   // (массив fruits будет уменьшатся, а result заполняться)
  // }
  while(fruits.length > 0) {
    let randInt = getRandomInt(0, fruits.length - 1);
    result.push(fruits.splice(randInt, 1)[0]);
  }
  fruits = result;
};

shuffleButton.addEventListener('click', () => {
  shuffleFruits();
  display(fruits);
});

/*** ФИЛЬТРАЦИЯ ***/

// фильтрация массива
const filterFruits = (min, max) => {
  let arrFilter = fruits.filter((item) => {
    // TODO: допишите функцию
    // return (item.weigh > 15 && item.weight < 28) ? item : false;
    if(item.weight > min && item.weight < max) {
      return item;
    }
  });
  // return arrFilter;
  fruits = arrFilter;
};

filterButton.addEventListener('click', () => {
  filterFruits(minWeightInput.value, maxWeightInput.value);
  display(fruits);
});

/*** СОРТИРОВКА ***/

let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки

const comparationColor = (a, b) => {
  return a.color > b.color;
};

const priorityColor = {
  "фиолетовый": 3,
  "зеленый": 2,
  "розово-красный": 0,
  "желтый": 1,
  "светло-коричневый": 4
};

const comparationColorQuickSort = (fruit1, fruit2) => {
  return priorityColor[fruit1.color] > priorityColor[fruit2.color];  
};

const sortAPI = {
  bubbleSort(arr, comparation) {
    // TODO: допишите функцию сортировки пузырьком
    const n = arr.length;
   // внешняя итерация по элементам
      for (let i = 0; i < n-1; i++) { 
        // внутренняя итерация для перестановки элемента в конец массива
        for (let j = 0; j < n-1-i; j++) { 
            // сравниваем элементы
            if (comparation(arr[j], arr[j+1])) { 
                // делаем обмен элементов
                let temp = arr[j+1]; 
                arr[j+1] = arr[j]; 
                arr[j] = temp; 
            }
        }
      }   
    return arr;
  },

  quickSort(arr, comparation) {
    // TODO: допишите функцию быстрой сортировки
    for (let i = 0, l = arr.length, k = l - 1; i < k; i++) {
      let indexMin = i;
      // поиск минимального элемента в правой части массива
      for (let j = i + 1; j < l; j++) {
          if (comparation(arr[indexMin], arr[j])) {
              indexMin = j;
          }
      }
      // проверка корректности поиска и обмен значениями
      // при обмене используется деструктуризация
      if (indexMin !== i) {
          [arr[i], arr[indexMin]] = [arr[indexMin], arr[i]];
      }
  }
  return arr;
  },

  // выполняет сортировку и производит замер времени
  startSort(sort, arr, comparation) {
    const start = new Date().getTime();
    sort(arr, comparation);
    const end = new Date().getTime();
    sortTime = `${end - start} ms`;
    sortTimeLabel.textContent = sortTime;
  },
};

// инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

sortChangeButton.addEventListener('click', () => {
  // TODO: переключать значение sortKind между 'bubbleSort' / 'quickSort'
  if(sortKind == 'bubbleSort') {
    sortKind = 'quickSort';
    sortKindLabel.innerHTML = 'quickSort';
    // sortKindLabel переменная куда писать алгоритм сортировки
  } else {
    sortKind = 'bubbleSort';
    sortKindLabel.innerHTML = 'bubbleSort';
  }
});

sortActionButton.addEventListener('click', () => {
  // TODO: вывести в sortTimeLabel значение 'sorting...'
  const sort = sortAPI[sortKind];
  let resultSort;
  if(sortKind == 'bubbleSort') {
    resultSort = sort(fruits, comparationColor);
    sortAPI.startSort(sort, fruits, comparationColor);
  } else {
    resultSort = sort(fruits, comparationColorQuickSort);
    sortAPI.startSort(sort, fruits, comparationColorQuickSort);
  }
  
  display(resultSort);
  // TODO: вывести в sortTimeLabel значение sortTime
});

/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', () => {
  let objDataFruit = {}, 
      nullElem;
  
  // TODO: создание и добавление нового фрукта в массив fruits
  // необходимые значения берем из kindInput, colorInput, weightInput
  // kindInput 
  // colorInput 
  // weightInput 
  objDataFruit.kind = kindInput.value;
  objDataFruit.color = colorInput.value;
  objDataFruit.weight = weightInput.value;
  
  if(objDataFruit.kind != "" && objDataFruit.color != "" && objDataFruit.weight != "") {
    let countArrSort = Object.values(priorityColor).length;
    priorityColor[colorInput.value] = countArrSort;
    fruits.push(objDataFruit);
    display(fruits);
    kindInput.value = "";
    colorInput.value = "";
    weightInput.value = "";
    
  } else {
    alert("Есть незаполненные поля. Чтобы добавить фрукт, все поля должны быть заполнены");
  }
});
