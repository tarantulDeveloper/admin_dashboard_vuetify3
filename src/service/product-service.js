import instance from "@/api";

class ProductsService {
    async addProduct(product) {
        const response = await instance.post("/products", product);
        return response.data;
    }

    async fetchAllProducts() {
        const response = await instance.get('/products/manager');
        return response.data;
    }

    async updateProduct(id,product) {
        const response = await instance.put(`/products/${id}`, product);
        return response.data;
    }

    async fetchProductById(id) {
        const response = await instance.get(`/products/${id}`);
        return response.data;
    }

    async deleteProductById(id) {
        const response = await instance.delete(`/products/${id}`);
        return response.data;
    }
}

export default new ProductsService();