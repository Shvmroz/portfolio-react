// Dummy data for the admin panel
export const salesData = {
  daily: {
    revenue: 15600,
    orders: 24,
    customers: 18,
    growth: 8.5
  },
  weekly: {
    revenue: 89400,
    orders: 156,
    customers: 123,
    growth: 12.3
  },
  monthly: {
    revenue: 385200,
    orders: 642,
    customers: 487,
    growth: 15.7
  }
};

export const chartData = {
  revenue: {
    series: [{
      name: 'Revenue',
      data: [31000, 35000, 28000, 42000, 38000, 45000, 52000]
    }],
    categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  orders: {
    series: [{
      name: 'Orders',
      data: [45, 52, 38, 65, 48, 72, 84]
    }],
    categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  topProducts: [
    { name: 'Black Silk Abaya', sales: 156 },
    { name: 'Embroidered Navy Abaya', sales: 142 },
    { name: 'Pearl White Abaya', sales: 128 },
    { name: 'Golden Border Abaya', sales: 115 },
    { name: 'Casual Cotton Abaya', sales: 98 }
  ]
};

export const products = [
  {
    id: 1,
    title: 'Elegant Black Silk Abaya',
    description: 'Premium quality black silk abaya with subtle embroidery',
    price: 4500,
    stock: 25,
    category: 'Formal',
    image: 'https://images.pexels.com/photos/8995933/pexels-photo-8995933.jpeg',
    sku: 'ABY-001',
    createdAt: '2024-01-15'
  },
  {
    id: 2,
    title: 'Embroidered Navy Blue Abaya',
    description: 'Beautiful navy blue abaya with gold thread embroidery',
    price: 5200,
    stock: 18,
    category: 'Formal',
    image: 'https://images.pexels.com/photos/19298248/pexels-photo-19298248.jpeg',
    sku: 'ABY-002',
    createdAt: '2024-01-14'
  },
  {
    id: 3,
    title: 'Pearl White Abaya',
    description: 'Pristine white abaya with pearl detailing',
    price: 4800,
    stock: 12,
    category: 'Formal',
    image: 'https://images.pexels.com/photos/9880848/pexels-photo-9880848.jpeg',
    sku: 'ABY-003',
    createdAt: '2024-01-13'
  },
  {
    id: 4,
    title: 'Casual Cotton Abaya',
    description: 'Comfortable cotton abaya for daily wear',
    price: 2800,
    stock: 35,
    category: 'Casual',
    image: 'https://images.pexels.com/photos/8995838/pexels-photo-8995838.jpeg',
    sku: 'ABY-004',
    createdAt: '2024-01-12'
  }
];

export const orders = [
  {
    id: 'ORD-001',
    customerName: 'Ayesha Khan',
    phone: '+92-300-1234567',
    total: 9600,
    date: '2024-01-20',
    status: 'Processing',
    items: [
      { product: 'Elegant Black Silk Abaya', quantity: 2, price: 4800 }
    ]
  },
  {
    id: 'ORD-002',
    customerName: 'Fatima Ali',
    phone: '+92-321-9876543',
    total: 5200,
    date: '2024-01-20',
    status: 'Shipped',
    items: [
      { product: 'Embroidered Navy Blue Abaya', quantity: 1, price: 5200 }
    ]
  },
  {
    id: 'ORD-003',
    customerName: 'Sara Ahmed',
    phone: '+92-333-5555555',
    total: 14400,
    date: '2024-01-19',
    status: 'Delivered',
    items: [
      { product: 'Pearl White Abaya', quantity: 3, price: 14400 }
    ]
  },
  {
    id: 'ORD-004',
    customerName: 'Zainab Sheikh',
    phone: '+92-345-7777777',
    total: 2800,
    date: '2024-01-19',
    status: 'Processing',
    items: [
      { product: 'Casual Cotton Abaya', quantity: 1, price: 2800 }
    ]
  }
];

export const categories = [
  'Formal',
  'Casual',
  'Party Wear',
  'Traditional',
  'Modern',
  'Wedding'
];