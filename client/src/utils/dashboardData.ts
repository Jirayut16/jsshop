export interface DashboardData {
  balance: number;
  bestSeller: [
    {
      image: string;
      totalSold: number;
      _id: string;
      price: number;
    }
  ];
  customer: number;
  revenueByProduct: [
    {
      totalRevenue: number;
      _id: string;
    }
  ];
  salesByDate: [
    {
      totalSales: number;
      _id: string;
    }
  ];
  topCustomers: [
    {
      _id: string;
      name: string;
      totalSpent: number;
    }
  ];
  saleReport: [
    {
      totalOrders: number;
      totalSales: number;
      _id?: null;
    }
  ];
  totalItemsSale: number;
}
