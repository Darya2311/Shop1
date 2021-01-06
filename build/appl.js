const data = [
    {
        category: "accessory",
        type: "sm",
        color: "blue",
        price: 30, 
        name: "scarf",
        rating: 3,
        imgUrl: "images/pic1.jpg",
        id: 1
    },
    {
        category: "clothes",
        type: "lg",
        color: "white",
        price: 70, 
        name: "shirt",
        rating: 3,
        imgUrl: "images/pic2.jpg",
        id: 2
    },
    {
        category: "clothes",
        type: "lg",
        color: "blue",
        price: 60, 
        name: "shirt",
        rating: 4,
        imgUrl: "images/pic3.jpg",
        id: 3
    },
    {
        category: "clothes",
        type: "md",
        color: "blue",
        price: 40, 
        name: "T-shirt",
        rating: 5,
        imgUrl: "images/pic4.jpg",
        id: 4
    },
    {
        category: "accessory",
        type: "sm",
        color: "black",
        price: 25, 
        name: "Glasses",
        rating: 5,
        imgUrl: "images/pic5.jpg",
        id: 5
    },
    {
        category: "clothes",
        type: "md",
        color: "white",
        price: 50, 
        name: "jumper",
        rating: 3,
        imgUrl: "images/pic6.jpg",
        id: 6
    },
    {
        category: "footwear",
        type: "md",
        color: "white",
        price: 30, 
        name: "sneakers",
        rating: 4,
        imgUrl: "images/pic7.jpg",
        id: 7
    },
    {
        category: "clothes",
        type: "lg",
        color: "dark-blue",
        price: 55, 
        name: "hoodies",
        rating: 3,
        imgUrl: "images/pic8.jpg",
        id: 8
    },
];  

let shoppingCart = [];

//  проверка сохраненной корзины
window.addEventListener("load", function() {
    let storageShoppingCart = JSON.parse(localStorage.getItem("shoppingCart")) === null ? [] : JSON.parse(localStorage.getItem("shoppingCart"))
    shoppingCart = storageShoppingCart
})


//  показывает выпадашку фильтров 
function showCategoryList() {   
    let filterList = document.querySelectorAll('.filter');
    filterList.forEach(function(filter) {
        filter.addEventListener("click", function(e) {
            e.target.closest('.filter').classList.toggle('show-cat-list');
        })
    })

    catFilter(data);
}

showCategoryList();

//  фильтр 
function catFilter(data) { // попадает в data весь массив объектов
    let catList = document.querySelectorAll('.category-item');
    catList.forEach(function(item) {
        item.addEventListener('click', function(e) {
            let category = e.target.getAttribute("data-category");
            let filterType = e.target.closest('.filter').classList[1];
            let newData;
            let parentEl = document.querySelector('.main__files');

            if (category == "all") {
                parentEl.innerHTML = " ";
                console.log(data)
                appRender(data)
            } else {
                if (filterType == "price") {
                    newData = data.filter(function(card) { 
                        return card[filterType] <= category
                    })
                } else {
                    newData = data.filter(function(card) { // после фильтрации создается новый массив
                        return card[filterType] == category
                    })
                }
                parentEl.innerHTML = " "
                appRender(newData)
            }
        })
    })
};


//  шаблон карточки, добавление карточки в родительский элемент
function cardRender(parent, data) {
    let parentEl = document.querySelector(parent);

    let rating = renderRating(data);

    let card = `
    <div class="card" data-id="${data.id}">
        <img src="${data.imgUrl}" alt="Picture">
        <div class="for__icon">
            <i class="fas fa-shopping-bag"></i>
        </div>
        <div class="card__caption">
            <h3>${data.name}</h3>
            <div class="rating"> 
                ${rating}
            </div>
            <p>${data.price}$</p>
        </div>
    </div>
    `;
    
    parentEl.innerHTML += card
};

//  создает разметку блока рейтинга 
function renderRating(data) {
    let ratingEl = "";
    for(i=0; i<data.rating; i++){
        ratingEl += '<i class="fas fa-star"></i>';
    }
    return ratingEl;
}

//  создает карточки из массива объктов (карточек)
function appRender(data) {
    data.forEach(function(card){
        cardRender(".main__files", card);
    });
};
appRender(data);




// создает клик на корзину
let btnBox = document.querySelector(".icon__item.pack")
let boxPage = document.querySelector('.bag-page.hidden')
function hiddenBlock() {
    boxPage.classList.toggle("hidden")
    shoppingCartRender(shoppingCart);
};

btnBox.addEventListener("click", hiddenBlock)


//  кнопка exit в корзине
let exit = document.querySelector("button.exit")
exit.addEventListener("click", hiddenBlock)

// бургер меню
let menu = document.querySelector(".menu-burger")
let links = document.querySelectorAll(".burger.menu__link")

menu.addEventListener("click", function(e) {
    menu.classList.toggle("active");
})


//   добавление элемента в корзину
document.addEventListener("click", function(e) {
    if(e.target.classList.contains("for__icon") || (e.target.classList.contains("fa-shopping-bag"))) {
        let allreadyEgsists = false;
        let doublecatedItemIndex = null;
        let cardId = e.target.closest(".card").getAttribute("data-id")
        let shoppingCartItem = {
        imgUrl:  data[cardId-1].imgUrl,
        price:   data[cardId-1].price,
        amount:  1,
        id: cardId
        }

        for (let i = 0; i< shoppingCart.length; i++) {
            if (shoppingCart[i].id === shoppingCartItem.id) {
              allreadyEgsists = true
              doublecatedItemIndex = i
              break
            }
          }
      
          if (allreadyEgsists) {
            shoppingCart[doublecatedItemIndex].amount++
          } else {
            shoppingCart.push(shoppingCartItem)
          }
    
          localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart))
          shoppingCartRender(shoppingCart);
        }
})
// кнопки + и - в корзине
let addButton = document.querySelector(".add-amount")
let removeButton = document.querySelector(".remove-amount")
console.log(addButton)
// addButton.addEventListener("click", function() {
//     shoppingCart.amount++
// })


//  отрисовка карточек в корзине
function shoppingCartItemRender(parent, data) {
    let parentEl = document.querySelector(parent);
    let shoppingCard = `
    <div class="card-bag">
        <img src="${data.imgUrl}" alt="Shop-card">
        <div class="card-price"> 
            <p>цена: ${data.price} $</p>
            <div class="num-area"> 
                <button class="add-amount">-</button>
                <div class="amount">${data.amount}</div>
                <button class="remove-amount">+</button>
            </div>
        </div>
    </div>
    `;
    parentEl.innerHTML += shoppingCard
} 

// отрисовка корзины
function shoppingCartRender(data) {
    document.querySelector(".for-cards").innerHTML = '';
    data.forEach(function(card) {
        shoppingCartItemRender(".for-cards", card)
    })
}
