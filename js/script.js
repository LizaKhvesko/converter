const currency = document.querySelectorAll('input[type="radio"]');
const currencyName = document.querySelectorAll('.currencyName');
const worldMoney = document.getElementById('worldMoney');
const bynMoney = document.getElementById('bynMoney');
const bynMoney2 = document.getElementById('bynMoney2');
const worldMoney2 = document.getElementById('worldMoney2');
const toBynBtn = document.querySelector('.toByn');
const toWorldBtn = document.querySelector('.toWorld');

const converter = async() => {
    let data = await getData('http://data.fixer.io/api/latest?access_key=c108dd396e6afc7e0324a0d2ed3537c9');
	console.log(data)
	toBynBtn.addEventListener('click', () => {
		let worldValue = worldMoney.value;
		if (worldValue.trim() === '') {
			worldMoney.style.border = '2px solid red';
		} else {
			worldMoney.style.border = '';
			if (currency[0].checked) {
				bynMoney.value = (worldValue * data.rates.BYN).toFixed(2);
			} else {
				bynMoney.value = (worldValue / data.rates.USD * data.rates.BYN).toFixed(2);
			}
		}
	})

	toWorldBtn.addEventListener('click', () => {
		let bynValue = bynMoney2.value;
		if (bynValue.trim() === '') {
			bynMoney2.style.border = '2px solid red';
		} else {
			bynMoney2.style.border = '';
			if (currency[0].checked) {
				worldMoney2.value = (bynValue / data.rates.BYN).toFixed(2);
			} else {
				worldMoney2.value = (bynValue / data.rates.BYN * data.rates.USD).toFixed(2);
			}
		}
	})
}

const getData = async (url) => {
	let response = await fetch(url);
	let data = await response.json();
	return data;
}

currency.forEach(item => {
	item.addEventListener('click', () => {
		currencyName.forEach(elem => {
			elem.textContent = item.id
			worldMoney.value = '';
			bynMoney.value = '';
			bynMoney2.value = '';
			worldMoney2.value = '';
		})
	})
})

converter();
