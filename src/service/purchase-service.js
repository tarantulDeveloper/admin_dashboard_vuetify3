import instance from "@/api";

class PurchaseService {
  async fetchTotalPurchases() {
    return await instance
      .get("/purchases/system/total")
      .then((response) => response.data);
  }

  async fetchPurchasesMonthly() {
    return await instance
      .get("/purchases/system/monthly")
      .then((response) => response.data);
  }
}

export default new PurchaseService();
