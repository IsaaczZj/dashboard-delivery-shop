interface ProfileRespose {
  id: string;
  name: string;
  phone: string | null;
  role: "manager" | "customer";
  createdAt: Date | null;
  updatedAt: Date | null;
  email: string;
}

interface UpdateProfile {
  name: string;
  description: string;
}
