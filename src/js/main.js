import MobileMenu from './menu.js';
import TabsManager from './tabs.js';
import $ from 'jquery';
import orderForm from './orderForm';

$(function(){
  $('#multiple-items').slick({
		infinite: true,
		slidesToShow: 4,
		slidesToScroll:1,
		prevArrow:$('.prev-work'),
		nextArrow:$('.next-work')
  });
});

const form = document.getElementById('quick-contact');

form.addEventListener('submit', event => {
	event.preventDefault();
	
	const {name, tel} = form.elements;
	
	const formData = {
		name:name.value, 
		tel:tel.value
	}
	
	form.reset();
	console.log(formData);
});

window.onload = function() { 
  const tabsElem = document.getElementsByClassName('price_navigation')[0]; 
  new TabsManager(tabsElem); 
  new MobileMenu();
  new orderForm();
}
