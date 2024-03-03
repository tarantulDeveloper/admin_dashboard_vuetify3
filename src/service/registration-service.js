import instance from "@/api";

class RegistrationService {
    async fetchAllRegistrationRequests() {
        const response = await instance.get("/registration/requests");
        return response.data;
    }

    async approveRegistrationRequest(registrationId, request) {
        return await instance.post(`/registration/requests/approve/${registrationId}`, request).then(response => response.data);
    }

    async rejectRegistrationRequest(registrationId) {
        const response = await instance.post(`/registration/requests/reject/${registrationId}`);
        return response.data;
    }

}

export default new RegistrationService();