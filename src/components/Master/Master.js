import {useContext} from 'react';
import bem from 'easy-bem';
import cn from 'classnames';

import mastersContext from '../../contexts/mastersContext';

import './Master.scss';

const b = bem('Master');

export default function Master({master, className}){
	
	const {id, photo, fullName, position} = master;
	const _className = cn(b(), className);
	const _photo = photo || "https://im0-tub-ru.yandex.net/i?id=34c3e7712603981f6e89ff094be26cd0&n=13";
	const {removeMaster} = useContext(mastersContext);
	
	return (
		<div className={_className}>		
			<div className={b("photo")}>
				 <img src={_photo} alt="master_photo" /> 
			</div>
			
			<div className={b("name")}> {fullName} </div>
			
			<div className={b("position")}> {position} </div>
			
			<button onClick={() => removeMaster(id)}> Х </button>
		</div>
	);
}

