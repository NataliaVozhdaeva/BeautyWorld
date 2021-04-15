import { useState} from 'react';

export default function MastersForm({onCreate}){
	
	const[fullName, setName] = useState();
	const[position, setPosition] = useState();
	const[photo, setPhoto] = useState();
	
	function reset(){
		setName("");
		setPosition("");
		setPhoto("");
	};
	
	function handleForm(event){
		event.preventDefault();
		const data = {fullName, position, photo};
		
		reset();
		onCreate(data);
	};
	
	return(
		<form onSubmit={handleForm}>
			<input value={fullName} onChange={event => setName(event.target.value)} placeholder='ФИО' required />
			
			<input value={position} onChange={event => setPosition(event.target.value)} placeholder='Позиция' required />
			
			<input value={photo} onChange={event => setPhoto(event.target.value)} placeholder='Ссылка на фото' />
			
			<button>Добавить нового мастера</button>
		</form>
	)
}