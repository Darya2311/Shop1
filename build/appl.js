let data = null;
let url = "https://my-json-server.typicode.com/darya2311/database/cards"

fetch(url)
	.then(function (resp) {
		return resp.json()
	})
	.then(function (finalResp) {
		data = finalResp
		appRender(finalResp);
		showCategoryList();
	})

let shoppingCart = [];

//  проверка сохраненной корзины
window.addEventListener("load", function () {
	let storageShoppingCart = JSON.parse(localStorage.getItem("shoppingCart")) === null ? [] : JSON.parse(localStorage.getItem("shoppingCart"))
	shoppingCart = storageShoppingCart
})


//  показывает выпадашку фильтров 
function showCategoryList() {
	let filterList = document.querySelectorAll('.filter');
	filterList.forEach(function (filter) {
		filter.addEventListener("click", function (e) {
			e.target.closest('.filter').classList.toggle('show-cat-list');
		})
	})

	catFilter(data);
}

// showCategoryList();

//  фильтр 
function catFilter(data) { // попадает в data весь массив объектов
	let catList = document.querySelectorAll('.category-item');
	catList.forEach(function (item) {
		item.addEventListener('click', function (e) {
			let category = e.target.getAttribute("data-category");
			let filterType = e.target.closest('.filter').classList[1];
			let newData;
			let parentEl = document.querySelector('.main__files');

			if (category == "all") {
				parentEl.innerHTML = " ";
				appRender(data)
			} else {
				if (filterType == "price") {
					newData = data.filter(function (card) {
						return card[filterType] <= category
					})
				} else {
					newData = data.filter(function (card) { // после фильтрации создается новый массив
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
	for (i = 0; i < data.rating; i++) {
		ratingEl += '<i class="fas fa-star"></i>';
	}
	return ratingEl;
}

//  создает карточки из массива объктов (карточек)
function appRender(data) {
	data.forEach(function (card) {
		cardRender(".main__files", card);
	});
};

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

menu.addEventListener("click", function (e) {
	menu.classList.toggle("active");
})


//   добавление элемента в корзину
document.addEventListener("click", function (e) {
	if (e.target.classList.contains("for__icon") || (e.target.classList.contains("fa-shopping-bag"))) {
		let allreadyEgsists = false;
		let doublecatedItemIndex = null;
		let cardId = e.target.closest(".card").getAttribute("data-id")
		let shoppingCartItem = {
			imgUrl: data[cardId - 1].imgUrl,
			price: data[cardId - 1].price,
			amount: 1,
			id: cardId
		}

		for (let i = 0; i < shoppingCart.length; i++) {
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

//  отрисовка карточек в корзине
function shoppingCartItemRender(parent, data) {
	let parentEl = document.querySelector(parent);
	let shoppingCard = `
	<div class="card-bag" data-id=${data.id}>
		<div class="del-elem"> X </div>
		<img src="${data.imgUrl}" alt="Shop-card">
		<div class="card-price"> 
			<p>цена: ${data.price} $</p>
			<div class="num-area"> 
				<button class="remove-amount">-</button>
				<div class="amount">${data.amount}</div>
				<button class="add-amount">+</button>
			</div>
		</div>
	</div>
	`;
	parentEl.innerHTML += shoppingCard
}

// отрисовка корзины
function shoppingCartRender(data) {
	document.querySelector(".for-cards").innerHTML = '';
	data.forEach(function (card) {
		shoppingCartItemRender(".for-cards", card)


		// кнопки + и - в корзине
		let addButton = document.querySelectorAll(".add-amount")
		let removeButton = document.querySelectorAll(".remove-amount")

		addButton.forEach(function (item) {
			item.addEventListener("click", function (e) {
				let cartItemId = this.closest(".card-bag").getAttribute("data-id")
				let cartItemAmountEl = this.previousElementSibling
				let cartItemAmount = Number(cartItemAmountEl.innerHTML)

				cartItemAmount++
				cartItemAmountEl.innerHTML = cartItemAmount


				let changingObj = shoppingCart.filter(function (item) {
					return cartItemId == item.id
				})

				let changingObjIndex = shoppingCart.indexOf(changingObj[0])
				shoppingCart[changingObjIndex].amount = cartItemAmount
				totalAmount(shoppingCart)
				localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart))
			})
		})

		removeButton.forEach(function (item) {
			item.addEventListener("click", function (e) {
				let cartItemId = this.closest(".card-bag").getAttribute("data-id")
				let cartItemAmountEl = this.nextElementSibling
				let cartItemAmount = Number(cartItemAmountEl.innerHTML)

				if (cartItemAmount <= 1) {
					return

				} else {
					cartItemAmount--
					cartItemAmountEl.innerHTML = cartItemAmount
					let changingObj = shoppingCart.filter(function (item) {
						return cartItemId == item.id
					})

					let changingObjIndex = shoppingCart.indexOf(changingObj[0])
					shoppingCart[changingObjIndex].amount = cartItemAmount	
					totalAmount(shoppingCart)
					localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart))
				}
			})
		})

		let delBtnList = document.querySelectorAll(".del-elem")
		delBtnList.forEach(function (btn) {
			btn.addEventListener("click", function () {
				let cartItemId = this.closest(".card-bag").getAttribute("data-id")
				let cartItem = this.closest(".card-bag")
				let sure = confirm("Вы точно хотите удалить?")
				if (sure) {
					cartItem.remove()
				}

				let changingObj = shoppingCart.filter(function (item) {
					return cartItemId == item.id
				})
				let changingObjIndex = shoppingCart.indexOf(changingObj[0])
				shoppingCart.splice(changingObjIndex, 1)
				totalAmount(shoppingCart)
				localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart))
			})
		})
	})
	totalAmount(shoppingCart)
}

function totalAmount(data) {
	let totalAmount = 0;
	let totalAmountEl = document.querySelector(".summ")
	data.forEach(function (card) {
		if (card.amount > 1) {
			totalAmount += card.price * card.amount
		}
		else {
			totalAmount += card.price
		}
	})
	totalAmountEl.innerHTML = "Total Amount: " + totalAmount
}