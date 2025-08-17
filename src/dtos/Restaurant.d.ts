interface RegisterRestaurantRequest {
  email: string;
  managerName: string;
  phone: string;
  restaurantName: string;
}

interface GetManagerRestaurant {
  id: string;
  name: string;
  managerId: string | null;
  description: string;
  createdAt: Date | null;
  updatedAt: Date | null;
}
