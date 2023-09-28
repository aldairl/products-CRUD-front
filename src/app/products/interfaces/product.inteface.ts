export interface Product {
    id:          number;
    name:        string;
    description: string;
    sku:         string;
    price:       number;
    image:       string;
    tags:        Tag[];
    stock:       number;
}

export interface Tag{
    id: number;
    name: string;
}