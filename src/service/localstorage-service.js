class LocalstorageService{
    cleaner() {
        const refresh_token = localStorage.getItem("refresh_token");
        localStorage.clear();
        localStorage.setItem("refresh_token", refresh_token);
    }

    setter(key, value) {
        localStorage.setItem(key, value);
    }
}

export default new LocalstorageService();