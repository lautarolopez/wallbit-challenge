import { Product } from "@/types";

const API_BASE_URL = "https://fakestoreapi.com";

export const fetchProductById = async (productId: number): Promise<Product> => {
  const response = await fetch(`${API_BASE_URL}/products/${productId}`);

  if (!response.ok) {
    throw new Error("Error fetching product data");
  }

  const productData = await response.json();
  return productData as Product;
};
