
import { useState} from 'react';

export default function OrderChange({onCreate}){

	let[id, setId] = useState();
	let[customer, setClientName] = useState();
	let[phone, setPhone] = useState();
	let[master, setMasterName] = useState();
    let[service, setService] = useState();
    let[visitDate, setVisitDate] = useState();
    let[status, setStatus] = useState();

	
	function reset(){
		setId("");
		setClientName("");
		setPhone("");
		setMasterName("");
        setService("");
        setVisitDate("");
        setStatus("");
	};
	
	function handleForm(event){
		event.preventDefault();
		let order = {};
		for (let key in {id, customer, phone, master, service, visitDate, status}){
			order[key] = document.getElementsByClassName(key)[0].value;
		}

		//const data = {id, customer, phone, master, service, visitDate, status};
		const data = order;
		
		reset();
		onCreate(data);
	};
	
	return(
		<form onSubmit={handleForm} id='editForm'>
			<input className='id' value={id} onChange={event => setId(event.target.value)}/>
			
            <input className='customer' value={customer} onChange={event => setClientName(event.target.value)} placeholder='Клиент' required />
			
			<input className='phone' value={phone} onChange={event => setPhone(event.target.value)} placeholder='Телефон' required />
			
			<input className='master'  value={master} onChange={event => setMasterName(event.target.value)} placeholder='Мастер'  />
            
            <input className='service'  value={service} onChange={event => setService(event.target.value)} placeholder='Услуга'  />
            
            <input className='visitDate'  value={visitDate} onChange={event => setVisitDate(event.target.value)} placeholder='Дата' />
			
            <input className='status'  value={status} onChange={event => setStatus(event.target.value)} placeholder='Статус'  />

			<button>Принять </button>
		</form>
	)
}