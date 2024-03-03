import instance from "@/api";

class TransactionService {
  async fetchAllTransactionRequests() {
    const response = await instance.get("transaction-requests");
    return response.data;
  }

  async approveTransactionRequest(transactionId, request) {
    return await instance
      .post(`/transaction-requests/approve/${transactionId}`, request)
      .then((response) => response.data);
  }

  async rejectTransactionRequest(transactionId) {
    const response = await instance.post(
      `/transaction-requests/reject/${transactionId}`
    );
    return response.data;
  }
}

export default new TransactionService();
