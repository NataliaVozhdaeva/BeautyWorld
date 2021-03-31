function MobileMenu(){ 

  const btnMenus = document.querySelectorAll(".mobile-menu-btn");
  const menues = document.querySelectorAll(".menu");
  
	btnMenus.forEach(function(item, i, btnMenus){ 
	  item.addEventListener('click', () => { 
		menues[i].style.cssText=`display:block; margin-bottom:-100px;`
			
			const btnClose = document.createElement('li');
			btnClose.textContent = 'Закрыть меню';
			btnClose.style.color = '#FB9475';
			menues[i].appendChild(btnClose);

			btnClose.addEventListener('click', () => { 
			menues[i].style.display = 'none'; 
			menues[i].removeChild(btnClose);
			});
	  }); //btnMenu onclick
	}); //btnMenus forEach
};//MobileMenu