import axios from 'axios'
	export const serviceApi = () => {
	return axios.create({
		baseURL: 'https://localhost:44393/api/'
});
} 

//Live Link
//https://apps.fastlogistics.com.ph/convanapi/api/

//LOCAL
//https://localhost:44393/api/