// Sample categories
const categories = [
  { id: 1, name: 'Electronics' },
  { id: 2, name: 'Clothing' },
  { id: 3, name: 'Groceries' },
  { id: 4, name: 'Beauty' },
  { id: 5, name: 'Toys' }
];

// Sample products
const products = [
  {
    id: 101,
    name: 'AirPods',
    category: 'Electronics',
    price: 145.00,
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MWP22?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1591634795000',
    description: 'Apple AirPods with wireless charging case. Enjoy high-quality sound and seamless connectivity.',
    featured: true,
    stock: 'In Stock',
    specs: 'Bluetooth, Wireless, White',
    sizes: null
  },
  {
    id: 102,
    name: 'MacBook Air',
    category: 'Electronics',
    price: 999.00,
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/macbook-air-midnight-select-20220606?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1654122880566',
    description: 'Apple MacBook Air with M2 chip. Lightweight, powerful, and perfect for work or play.',
    featured: true,
    stock: 'In Stock',
    specs: '13.6" display, 256GB SSD, 8GB RAM',
    sizes: null
  },
  {
    id: 103,
    name: 'Google Pixel 6',
    category: 'Electronics',
    price: 299.00,
    image: 'https://store.google.com/product/images/phone_pixel_6a_hero_carousel_1.png',
    description: 'Google Pixel 6 smartphone with advanced camera and pure Android experience.',
    featured: true,
    stock: 'In Stock',
    specs: '6.4" display, 128GB storage, 5G',
    sizes: null
  },
  {
    id: 104,
    name: 'PlayStation 5',
    category: 'Electronics',
    price: 499.00,
    image: 'https://m.media-amazon.com/images/I/619BkvKW35L._AC_SL1500_.jpg',
    description: 'Sony PlayStation 5 Console. Next-gen gaming with ultra-fast SSD and stunning graphics.',
    featured: true,
    stock: 'In Stock',
    specs: '825GB SSD, 4K Gaming',
    sizes: null
  },
  {
    id: 201,
    name: 'Classic T-Shirt',
    category: 'Clothing',
    price: 19.99,
    image: 'https://images.pexels.com/photos/1004016/pexels-photo-1004016.jpeg?auto=compress&w=400',
    description: '100% cotton, available in multiple sizes. Comfortable and stylish for everyday wear.',
    featured: false,
    stock: 'In Stock',
    specs: null,
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 202,
    name: 'Denim Jeans',
    category: 'Clothing',
    price: 39.99,
    image: 'https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg?auto=compress&w=400',
    description: 'Comfort fit denim jeans. Durable and perfect for any occasion.',
    featured: true,
    stock: 'Out of Stock',
    specs: null,
    sizes: ['30', '32', '34', '36']
  },
  {
    id: 301,
    name: 'Organic Apples',
    category: 'Groceries',
    price: 4.99,
    image: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&w=400',
    description: 'Fresh organic apples, 1kg pack. Crisp, juicy, and healthy.',
    featured: false,
    stock: 'In Stock',
    specs: null,
    sizes: null
  },
  {
    id: 302,
    name: 'Milk',
    category: 'Groceries',
    price: 2.49,
    image: 'https://images.pexels.com/photos/416656/pexels-photo-416656.jpeg?auto=compress&w=400',
    description: '1 litre full cream milk. Fresh and nutritious.',
    featured: true,
    stock: 'In Stock',
    specs: null,
    sizes: null
  },
  {
    id: 401,
    name: 'Face Cream',
    category: 'Beauty',
    price: 15.99,
    image: 'https://images.pexels.com/photos/3738341/pexels-photo-3738341.jpeg?auto=compress&w=400',
    description: 'Hydrating face cream for all skin types. Keeps your skin soft and glowing.',
    featured: false,
    stock: 'In Stock',
    specs: null,
    sizes: null
  },
  {
    id: 501,
    name: 'Toy Car',
    category: 'Toys',
    price: 9.99,
    image: 'https://images.pexels.com/photos/163743/pexels-photo-163743.jpeg?auto=compress&w=400',
    description: 'Colorful toy car for kids. Safe and fun for all ages.',
    featured: false,
    stock: 'In Stock',
    specs: null,
    sizes: null
  }
]; 