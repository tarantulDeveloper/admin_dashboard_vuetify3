import instance from "@/api";

class TransferHistoryService {
  async transfer(request) {
    return await instance
      .post("/transactions/transfer", request)
      .then((response) => response.data);
  }

  async fetchAllTransactions() {
    const response = await instance.get("/transactions/my");
    return response.data;
  }

}

export default new TransferHistoryService();
