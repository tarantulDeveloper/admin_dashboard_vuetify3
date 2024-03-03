import instance from "@/api";

class ProfileChangeService {
    async fetchAll() {
        const response = await instance.get("/profile-changes-request/requests");
        return response.data;
    }

    async approve(registrationId, request) {
        return await instance.post(`/profile-changes-request/approve/${registrationId}`, request).then(response => response.data);
    }

    async reject(registrationId) {
        const response = await instance.post(`/profile-changes-request/reject/${registrationId}`);
        return response.data;
    }

}

export default new ProfileChangeService();