function MobileMenu(){ 

  const btnMenu = document.querySelector(".mobile-menu-btn");
  const menu = document.querySelector(".menu");
    
  btnMenu.addEventListener('click', () => { 
    menu.style.display = 'block'; 
  
  const btnClose = document.createElement('li');
  btnClose.classList.add('btnClose');
  btnClose.textContent = 'Закрыть меню';
  btnClose.style.color = '#FB9475';
  menu.appendChild(btnClose);

    btnClose.addEventListener('click', () => { 
    menu.style.display = 'none'; 
	menu.removeChild(btnClose);
	});
  
  });
  
};