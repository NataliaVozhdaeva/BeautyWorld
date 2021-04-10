export class HttpService {
	
	constructor(baseApiPath){
		this.baseApi = baseApiPath;	
	}
	
	async get(path){
		const responce = await fetch(`${this.baseApi}/${path}`);
		return responce.json();
	}
	
	async post(path, body){
		const stringifiedData = JSON.stringify(body);
		
		const responce = await fetch(`${this.baseApi}/${path}`,{
			method: 'POST',
			body: stringifiedData,
			headers:{
				'Content-Type': 'application/json'
			}
		});
		
		return responce.json();	
	}	
}