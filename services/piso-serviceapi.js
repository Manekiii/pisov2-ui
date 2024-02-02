import axios from 'axios'
	export const serviceApi = () => {
	return axios.create({
		baseURL: 'https://apps.fastlogistics.com.ph/pisoapi/api/'
});
} 

//Live Link
//https://apps.fastlogistics.com.ph/pisoapi/api/

//LOCAL
//https://localhost:44393/api/