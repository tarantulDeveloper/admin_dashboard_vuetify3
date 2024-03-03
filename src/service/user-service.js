import instance from "@/api";

class UserService {
    async fetchUserById(id) {
        const response = await instance.get(`/users/${id}`);
        return response.data;
    }

    async fetchAllUsers() {
        const response = await instance.get('/users');
        return response.data;
    }

    async fetchClientById(id) {
        const response = await instance.get(`/users/client/${id}`);
        return response.data;
    }

    async changeActivatedStatusOfUserById(userId, activated) {
        const response = await instance.put('/users/enable', {
            id: userId,
            activated: activated
        });
        return response.data;
    }

    async updateAdminOrManager(user) {
        const response = await instance.put('/users', user);
        return response.data;
    }

    async updateClient(client){
        const response = await instance.put("/users/client", client);
        return response.data;
    }

    async addAdminOrManager(user) {
        const response = await instance.post("/users", user);
        return response.data;
    }

    async getPersonalData() {
        const response = await instance.get('/users/personal');
        return response.data;
    }

    async updateImg(photo){
        const response = await instance.put(`/users/image`, photo);
        return response.data;
    }

    async changePersonalInfo(userInfo) {
        const response = await instance.put("/users/personal/update", userInfo);
        return response.data;
    }

    async getPersonalBalance(isoCode){
        const response = await instance.get(`/users/balance?isoCode=${isoCode}`);
        return response.data;
    }

    async addDealerByManager(dealer) {
        const response = await instance.post("/auth/dealer", dealer);
        return response.data;
    }

    async getAdminOrManagerInfo() {
        const response = await instance.get("/users/admin-manager");
        return response.data;
    }

    async updateAdminOrManagerInfo(userInfo) {
        const response = await instance.put("/users/update-admin-manager",userInfo);
        return response.data;
    }
}

export default new UserService();