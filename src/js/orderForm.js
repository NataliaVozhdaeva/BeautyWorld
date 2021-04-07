import ApiService from './services/api-service';
import Inputmask from 'inputmask/dist/jquery.inputmask';

class orderForm{
	constructor(){
		this.pending = false;
		this.message = false;
		this.formEl = document.getElementById('order-form');
		this.mastersSelect = this.formEl.elements.masterId;
		this.servicesSelect = this.formEl.elements.serviceId;
		
		//const Inputmask = require('inputmask');
		Inputmask({"mask": "+7(999)999-99-99"}).mask(this.formEl.elements.phone);
		
		this._init();
		this._bindEvents();
	}//constructor
	
		_init(){
			this._buildMastersSelect();
			this._buildServicesSelect();
		}
		
		async _buildMastersSelect(){
			try {
				const masters = await ApiService.getMasters();
				
					masters.forEach(master => {
					const option = document.createElement('option');
					option.value = master.id;
					option.textContent = `$(master.surName) $(master.firstName)`;
					this.mastersSelect.add(option);
					});//masters.forEach
			} catch(error){
				console.log(error);
			  }
		}//buildMasterSelect
		
		async _buildServicesSelect(){
			try{
				const services = await ApiService.getServices();
				
					services.forEach(service => {
					const option = document.createElement('option');
					option.value = service.id;
					option.textContent = `$(service.name)`;
					this.servicesSelect.add(option);
					});//services.forEach
			} catch(error){
				console.log(error);
			  }
		}//buildServiceSelect
		
		_bindEvents(){
			this.formEl.addEventListener( 'submit', (event) => {
				event.preventDefault();
				this._handleForm();				
			});
		}
		
		async _handleForm(){
			const orderData = {
				name: this.formEl.elements.name.value,
				phone: this.formEl.elements.phone.value,
				masterId: this.formEl.elements.masterId.value,
				serviceId: this.formEl.elements.serviceId.value,
				visitDate: this.formEl.elements.visitDate.value
			};

			this._togglePendingState();

			setTimeout ( async() =>{
				try{
					await ApiService.createOrder(orderData);
					this.formEl.reset();
					
					this._toggleMessageState();		

										
					setTimeout(function(){
					$.fancybox.close();
					}, 3000);
					
				} catch(error) {
					console.log(error);					
				} finally {
					this._togglePendingState();					
				}
			}, 3000	);
		}
		
		_togglePendingState(){
			this.pending = !this.pending;
			this.formEl.classList.toggle('order-form_pending', this.pending);			
		}
		
		_toggleMessageState(){
			this.message = !this.message;
			this.formEl.classList.toggle('form__message_visible', this.message);			
		}
}	
export default orderForm
	
	