import store from "@/store/vuex_store";

class VuexStoreService {
    async cleaner() {
        const {dispatch} = store;
        await dispatch('user', null);
        await dispatch('role', null);
        await dispatch('auth', false);
        await dispatch('systemUser', false);
        await dispatch('profile_photo_url', null);
        await dispatch('firstName', null);
        await dispatch('lastName', null);
    }

    async setter(user, role, auth, systemUser, profile_photo_url, firstName, lastName) {
        const {dispatch} = store;
        await dispatch('user', user);
        await dispatch('role', role);
        await dispatch('auth', auth);
        await dispatch('systemUser', systemUser);
        await dispatch('profile_photo_url', profile_photo_url);
        await dispatch('firstName', firstName);
        await dispatch('lastName', lastName);
    }

    async setProfilePhotoUrl(profileUr) {
        const {dispatch} = store;
        await dispatch('profile_photo_url', profileUr);
    }
}

export default new VuexStoreService();