import axios from "axios";
import {baseURL} from "@/store/variables";
import instance from "@/api";

const config = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
};

class CurrencyService {
    async getCurrencyValues() {
        const response = await axios.get(`${baseURL}/exchange-rates?isoCodes=CNY,EUR,GBP,KZT,RUB,USD`)
        return response.data
    }

    async getCurrencyRate(isoCode){
        const response = await axios.get(`${baseURL}/exchange-rates/${isoCode}`)
        return response.data;
    }

    async setSoftcoinRate(rate) {
        const response = await instance.put("/exchange-rates/softcoin", rate, config);
        return response.data;
    }
}

export default new CurrencyService();