import instance from "@/api";

class HistoryService{
    async fetchAllHistory(currentPage) {
        const response = await instance.get("/history",{
            params: {
                page: currentPage
            }
        });
        return response;
    }
}
export default new HistoryService();