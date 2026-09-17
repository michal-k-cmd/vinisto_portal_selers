export interface ecomailEventType {
    //event: {
        email: string;
        category: string;
        action: string;
        label: string;
        value: string;
    //}
}

export interface ecomailBasketItemType {
    productId: string;
    price: number;
    url?: string;
    img_url?: string;
    name?: string;
    description?: string; 
}