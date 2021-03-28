class TabItem{
	constructor(link, content) { 
    this.link = link; 
    this.content = content; 
    } 
	
	onClick(callback) { 
    this.link.addEventListener('click', () => callback()); 
    } 
	
	activate() { 
    this._toggle(true);   
    } 
   
    deactivate() { 
    this._toggle(false); 
    } 
	
	_toggle(activate) { 
    this.link.classList.toggle('active', activate); 
    this.content.classList.toggle('active', activate); 
    } 
}

class TabsManager { 
	constructor(tabsElem) { 
    this.tabs = []; 
    this.activeTab = null; 
	
	this.init(tabsElem);     
    this.activateTab(this.tabs[0]); 
  } 
    
	init(tabsElem) { 
    const links = tabsElem.querySelectorAll('.price__menu li'); 
    const contents = document.querySelectorAll('.price_table'); 
         
		for (let i = 0; i < links.length; i++) { 
		  const tab = new TabItem(links[i], contents[i]); 
		  this.tabs.push(tab); 
		   
		  tab.onClick(() => this.activateTab(tab));   
		} 
	}

	activateTab(tab) { 
    if (this.activeTab) { 
      this.activeTab.deactivate(); 
    } 
    this.activeTab = tab; 
    this.activeTab.activate(); 
    } 
}

$(function(){
  $('#multiple-items').slick({
    infinite: true,
    slidesToShow: 4,
    slidesToScroll:1,
	prevArrow:$('.prev-work'),
	nextArrow:$('.next-work')
  });
});

window.onload = function() { 
  const tabsElem = document.getElementsByClassName('price_navigation')[0]; 
  new TabsManager(tabsElem); 
  MobileMenu();
}