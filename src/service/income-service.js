import instance from "@/api";

class IncomeService {
  async fetchAllIncomes(isoCode) {
    const response = await instance.get(`/incomes/system?isoCode=${isoCode}`);
    return response.data;
  }

  async fetchTotalIncome(iso) {
    return await instance
      .get(`/incomes/system/total?isoCode=${iso}`)
      .then((response) => response.data);
  }

  async fetchIncomeMonthly( isoCode) {
    return await instance
      .get(`/incomes/system/monthly?isoCode=${isoCode}`)
      .then((response) => response.data);
  }
}

export default new IncomeService();
