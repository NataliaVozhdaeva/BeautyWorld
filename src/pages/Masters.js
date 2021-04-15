import {useEffect, useState} from 'react';
import Masters from '../components/Masters/Masters';
import MastersForm from '../components/MastersForm';
import MastersContext from '../contexts/mastersContext';
import ApiService from '../api/api-service';

export default function MastersPage() {

    const [masters, setMasters] = useState([]);

	useEffect(() => {
		async function fetchData(){
			const masters = await ApiService.getMasters();	
			setMasters(masters);	
			console.log(masters);
		}
		
		fetchData();
	}, []);

    function createMaster(master){
		const {id} = masters[masters.length - 1];
		
		setMasters(masters.concat([{
		...master,
		id: id + 1
		}]));
		//console.log(masters);
		/*setMasters([
			...masters,
			master
		]);*/

		//console.log(master);
	}
	
	function removeMaster(id){
		setMasters(masters.filter(m => m.id !== id));
		//console.log(masters);
	}

    return(
        <>
            <MastersForm onCreate={createMaster} />
		    <br />
		
            <MastersContext.Provider value={{removeMaster}}>
                {masters.length === 0 ?
                <p>Нет данных</p>  : <Masters masters={masters} />}
            </MastersContext.Provider> 
        </>
    );
}