import { sample } from 'lodash';
import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

const PRODUCT_NAME = [
  'Nike Air Force 1 NDESTRUKT',
  'Nike Space Hippie 04',
  'Nike Air Zoom Pegasus 37 A.I.R. Chaz Bear',
  'Nike Blazer Low 77 Vintage',
  'Nike ZoomX SuperRep Surge',
  'Zoom Freak 2',
  'Nike Air Max Zephyr',
  'Jordan Delta',
  'Air Jordan XXXV PF',
  'Nike Waffle Racer Crater',
  'Kyrie 7 EP Sisterhood',
  'Nike Air Zoom BB NXT',
  'Nike Air Force 1 07 LX',
  'Nike Air Force 1 Shadow SE',
  'Nike Air Zoom Tempo NEXT%',
  'Nike DBreak-Type',
  'Nike Air Max Up',
  'Nike Air Max 270 React ENG',
  'NikeCourt Royale',
  'Nike Air Zoom Pegasus 37 Premium',
  'Nike Air Zoom SuperRep',
  'NikeCourt Royale',
  'Nike React Art3mis',
  'Nike React Infinity Run Flyknit A.I.R. Chaz Bear',
];
const EVENT_TYPE =[
  "view",
  "view",
  "view",
  "view",
  "view",
  "view",
  "view",
  "view",
  "add",
  "add",
  "add",
  "add",
  "add",
  "add",
  "add",
  "add",
  "cancel",
  "cancel",
  "cancel",
  "cancel",
  "cancel",
  "cancel",
  "cancel",
  "cancel",
]
const PRODUCT_COLOR = [
  '#00AB55',
  '#000000',
  '#FFFFFF',
  '#FFC0CB',
  '#FF4842',
  '#1890FF',
  '#94D82D',
  '#FFC107',
];
export const event =[
  {
    id:4654,
    product:1510,
    customer_id:"123-456-7890",
    type:"view",
    desc:"",
    date:"2024-04-01T17:00:00Z"
  },
  {
    id:4655,
    product:1510,
    customer_id:"345-678-9012",
    type:"view",
    desc:"",
    date:"2024-04-02T17:00:00Z"
  },
  {
    id:4656,
    product:1512,
    customer_id:"123-456-7890",
    type:"view",
    desc:"",
    date:"2024-04-01T17:00:00Z"
  },
  {
    id:4657,
    product:1512,
    customer_id:"123-456-7890",
    type:"add",
    desc:"",
    date:"2024-04-01T17:00:00Z"
  },
  {
    id:4658,
    product:1510,
    customer_id:"345-678-9012",
    type:"add",
    desc:"",
    date:"2024-04-03T17:00:00Z"

  },
  {
    id:4658,
    product:1510,
    customer_id:"345-678-9012",
    type:"remove",
    desc:"",
    date:"2024-04-04T17:00:00Z"

  },
  {
    id:4659,
    product:1513,
    customer_id:"123-456-7890",
    type:"view",
    desc:"",
    date:"2024-04-04T17:00:00Z"
  },
  {
    id:4660,
    product:1514,
    customer_id:"123-456-7890",
    type:"view",
    desc:"",
    date:"2024-04-01T17:00:00Z"
  },
  {
    id:4661,
    product:1515,
    customer_id:"123-456-7890",
    type:"view",
    desc:"",
    date:"2024-04-01T17:00:00Z"
  },
  {
    id:4662,
    product:1515,
    customer_id:"123-456-7890",
    type:"add",
    desc:"",
    date:"2024-04-01T17:00:00Z"
  },
  {
    id:4663,
    product:1514,
    customer_id:"123-456-7890",
    type:"add",
    desc:"",
    date:"2024-04-01T17:00:00Z"
  },
  {
    id:4664,
    product:1510,
    customer_id:"123-456-7890",
    type:"remove",
    desc:"",
    date:"2024-04-01T17:00:00Z"
  },
  {
    id:4665,
    product:1510,
    customer_id:"123-456-7890",
    type:"order",
    desc:"Whitefield, Bangalure",
    date:"2024-04-01T17:00:00Z"
  },
  {
    id:4666,
    product:1511,
    customer_id:"123-456-7890",
    type:"order",
    desc:"Whitefield, Bangalure",
    date:"2024-04-01T17:00:00Z"
  },
  {
    id:4667,
    product:1512,
    customer_id:"123-456-7890",
    type:"order",
    desc:"Whitefield, Bangalure",
    date:"2024-04-01T17:00:00Z"
  },
  {
    id:4668,
    product:1513,
    customer_id:"123-456-7890",
    type:"order",
    desc:"Whitefield, Bangalure",
    date:"2024-04-01T17:00:00Z"
  },
  {
    id:4668,
    product:1513,
    customer_id:"567-890-1234",
    type:"order",
    desc:"Whitefield, Bangalure",
    date:"2024-04-03T17:00:00Z"
  },
  {
    id:4668,
    product:1513,
    customer_id:"567-890-1234",
    type:"cancel",
    desc:"Whitefield, Bangalure",
    date:"2024-04-04T17:00:00Z"
  }
]
export const product_data = [
  {
    "id": 1510,
    "cover": "/assets/images/products/product_1.jpg",
    "name": "Nike Air Force 1 NDESTRUKT",
    "price": 76,
    "priceSale": null,
    "colors": [
      "#00AB55",
      "#000000"
    ],
    "status": "",
    "zone":1563,
    "brand_id":1000196
  },
  {
    "id": 1511,
    "cover": "/assets/images/products/product_2.jpg",
    "name": "Nike Space Hippie 04",
    "price": 56,
    "priceSale": null,
    "colors": [
      "#000000",
      "#FFFFFF"
    ],
    "status": "sale",
    "zone":1563,
    "brand_id":1000196
  },
  {
    "id": 1512,
    "cover": "/assets/images/products/product_3.jpg",
    "name": "Nike Air Zoom Pegasus 37 A.I.R. Chaz Bear",
    "price": 97,
    "priceSale": 28,
    "colors": [
      "#FFFFFF",
      "#FFC0CB"
    ],
    "status": "new",
    "zone":1563,
    "brand_id":1000196
  },
  {
    "id": 1513,
    "cover": "/assets/images/products/product_4.jpg",
    "name": "Nike Blazer Low 77 Vintage",
    "price": 92,
    "priceSale": null,
    "colors": [
      "#FFC0CB",
      "#FF4842",
      "#1890FF"
    ],
    "status": "",
    "zone":1463,
    "brand_id":1000196
  },
  {
    "id": 1514,
    "cover": "/assets/images/products/product_5.jpg",
    "name": "Nike ZoomX SuperRep Surge",
    "price": 87,
    "priceSale": null,
    "colors": [
      "#00AB55",
      "#000000",
      "#FFFFFF",
      "#FFC0CB",
      "#FF4842",
      "#1890FF",
      "#94D82D",
      "#FFC107"
    ],
    "status": "",
    "zone":1593,
    "brand_id":1000196
  },
  {
    "id": 1515,
    "cover": "/assets/images/products/product_6.jpg",
    "name": "Zoom Freak 2",
    "price": 63,
    "priceSale": 26,
    "colors": [
      "#00AB55",
      "#000000",
      "#FFFFFF",
      "#FFC0CB",
      "#FF4842",
      "#1890FF",
      "#94D82D",
      "#FFC107"
    ],
    "status": "sale",
    "zone":1567,
    "brand_id":1000196
  },
  {
    "id": 1516,
    "cover": "/assets/images/products/product_7.jpg",
    "name": "Nike Air Max Zephyr",
    "price": 7,
    "priceSale": null,
    "colors": [
      "#00AB55",
      "#000000",
      "#FFFFFF",
      "#FFC0CB",
      "#FF4842",
      "#1890FF",
      "#94D82D",
      "#FFC107"
    ],
    "status": "",
    "zone":1579,
    "brand_id":1000196
  },
  {
    "id": 1517,
    "cover": "/assets/images/products/product_8.jpg",
    "name": "Jordan Delta",
    "price": 16,
    "priceSale": null,
    "colors": [
      "#00AB55",
      "#000000",
      "#FFFFFF",
      "#FFC0CB",
      "#FF4842",
      "#1890FF",
      "#94D82D",
      "#FFC107"
    ],
    "status": "",
    "zone":1556,
    "brand_id":1000196
  },
  {
    "id": 1518,
    "cover": "/assets/images/products/product_9.jpg",
    "name": "Air Jordan XXXV PF",
    "price": 82,
    "priceSale": 22,
    "colors": [
      "#00AB55",
      "#000000",
      "#FFFFFF",
      "#FFC0CB",
      "#FF4842",
      "#1890FF",
      "#94D82D",
      "#FFC107"
    ],
    "status": "",
    "zone":1515,
    "brand_id":1000196
  },
  {
    "id": 1519,
    "cover": "/assets/images/products/product_10.jpg",
    "name": "Nike Waffle Racer Crater",
    "price": 13,
    "priceSale": null,
    "colors": [
      "#00AB55",
      "#000000",
      "#FFFFFF",
      "#FFC0CB",
      "#FF4842",
      "#1890FF",
      "#94D82D",
      "#FFC107"
    ],
    "status": "new",
    "zone":1570,
    "brand_id":1000196
  },
  {
    "id": 1520,
    "cover": "/assets/images/products/product_11.jpg",
    "name": "Kyrie 7 EP Sisterhood",
    "price": 7,
    "priceSale": null,
    "colors": [
      "#00AB55",
      "#000000",
      "#FFFFFF",
      "#FFC0CB",
      "#FF4842",
      "#1890FF",
      "#94D82D",
      "#FFC107"
    ],
    "status": "new",
    "zone":1579,
    "brand_id":1000196
  },
  {
    "id": 1521,
    "cover": "/assets/images/products/product_12.jpg",
    "name": "Nike Air Zoom BB NXT",
    "price": 94,
    "priceSale": 19,
    "colors": [
      "#00AB55",
      "#000000",
      "#FFFFFF",
      "#FFC0CB",
      "#FF4842",
      "#1890FF",
      "#94D82D",
      "#FFC107"
    ],
    "status": "",
    "zone":1563,
    "brand_id":1000196
  },
  {
    "id": 1522,
    "cover": "/assets/images/products/product_13.jpg",
    "name": "Nike Air Force 1 07 LX",
    "price": 87,
    "priceSale": null,
    "colors": [
      "#00AB55",
      "#000000",
      "#FFFFFF",
      "#FFC0CB",
      "#FF4842",
      "#1890FF",
      "#94D82D",
      "#FFC107"
    ],
    "status": "",
    "zone":1555,
    "brand_id":1000196
  },
  {
    "id": 1523,
    "cover": "/assets/images/products/product_14.jpg",
    "name": "Nike Air Force 1 Shadow SE",
    "price": 61,
    "priceSale": null,
    "colors": [
      "#00AB55",
      "#000000",
      "#FFFFFF",
      "#FFC0CB",
      "#FF4842",
      "#1890FF",
      "#94D82D",
      "#FFC107"
    ],
    "status": "sale",
    "zone":1560,
    "brand_id":1000196
  },
  {
    "id": 1524,
    "cover": "/assets/images/products/product_15.jpg",
    "name": "Nike Air Zoom Tempo NEXT%",
    "price": 49,
    "priceSale": 25,
    "colors": [
      "#00AB55",
      "#000000",
      "#FFFFFF",
      "#FFC0CB",
      "#FF4842",
      "#1890FF",
      "#94D82D",
      "#FFC107"
    ],
    "status": "",
    "zone":1562,
    "brand_id":1000196
  },
  {
    "id": 1525,
    "cover": "/assets/images/products/product_16.jpg",
    "name": "Nike DBreak-Type",
    "price": 90,
    "priceSale": null,
    "colors": [
      "#00AB55",
      "#000000",
      "#FFFFFF",
      "#FFC0CB",
      "#FF4842",
      "#1890FF",
      "#94D82D",
      "#FFC107"
    ],
    "status": "",
    "zone":1588,
    "brand_id":1000196
  },
  {
    "id": 1526,
    "cover": "/assets/images/products/product_17.jpg",
    "name": "Nike Air Max Up",
    "price": 12,
    "priceSale": null,
    "colors": [
      "#00AB55",
      "#000000",
      "#FFFFFF",
      "#FFC0CB",
      "#FF4842",
      "#1890FF",
      "#94D82D",
      "#FFC107"
    ],
    "status": "sale",
    "zone":1584,
    "brand_id":1000196
  },
  {
    "id": 1527,
    "cover": "/assets/images/products/product_18.jpg",
    "name": "Nike Air Max 270 React ENG",
    "price": 72,
    "priceSale": 24,
    "colors": [
      "#00AB55",
      "#000000",
      "#FFFFFF",
      "#FFC0CB",
      "#FF4842",
      "#1890FF",
      "#94D82D",
      "#FFC107"
    ],
    "status": "new",
    "zone":1585,
    "brand_id":1000196
  },
  {
    "id": 1528,
    "cover": "/assets/images/products/product_19.jpg",
    "name": "NikeCourt Royale",
    "price": 64,
    "priceSale": null,
    "colors": [
      "#00AB55",
      "#000000",
      "#FFFFFF",
      "#FFC0CB",
      "#FF4842",
      "#1890FF",
      "#94D82D",
      "#FFC107"
    ],
    "status": "sale",
    "zone":1551,
    "brand_id":1000196
  },
  {
    "id": 1529,
    "cover": "/assets/images/products/product_20.jpg",
    "name": "Nike Air Zoom Pegasus 37 Premium",
    "price": 39,
    "priceSale": null,
    "colors": [
      "#00AB55",
      "#000000",
      "#FFFFFF",
      "#FFC0CB",
      "#FF4842",
      "#1890FF",
      "#94D82D",
      "#FFC107"
    ],
    "status": "",
    "zone":1560,
    "brand_id":1000196
  },
  {
    "id": 1530,
    "cover": "/assets/images/products/product_21.jpg",
    "name": "Nike Air Zoom SuperRep",
    "price": 60,
    "priceSale": 22,
    "colors": [
      "#00AB55",
      "#000000",
      "#FFFFFF",
      "#FFC0CB",
      "#FF4842",
      "#1890FF",
      "#94D82D",
      "#FFC107"
    ],
    "status": "",
    "zone":1563,
    "brand_id":1000196
  },
  {
    "id": 1531,
    "cover": "/assets/images/products/product_22.jpg",
    "name": "NikeCourt Royale",
    "price": 42,
    "priceSale": null,
    "colors": [
      "#00AB55",
      "#000000",
      "#FFFFFF",
      "#FFC0CB",
      "#FF4842",
      "#1890FF",
      "#94D82D",
      "#FFC107"
    ],
    "status": "",
    "zone":1570,
    "brand_id":1000196
  },
  {
    "id": 1532,
    "cover": "/assets/images/products/product_23.jpg",
    "name": "Nike React Art3mis",
    "price": 20,
    "priceSale": null,
    "colors": [
      "#FF4842",
      "#1890FF"
    ],
    "status": "new",
    "zone":1590,
    "brand_id":1000196
  },
  {
    "id": 1533,
    "cover": "/assets/images/products/product_24.jpg",
    "name": "Nike React Infinity Run Flyknit A.I.R. Chaz Bear",
    "price": 24,
    "priceSale": 21,
    "colors": [
      "#1890FF"
    ],
    "status": "",
    "zone":1595,
    "brand_id":1000196
  }
]


// ----------------------------------------------------------------------

export const products = [...Array(24)].map((_, index) => {
  const setIndex = index + 1;

  return {
    id: index,
    cover: `/assets/images/products/product_${setIndex}.jpg`,
    name: PRODUCT_NAME[index],
    price: faker.number.int({ min: 4, max: 99, precision: 0.01 }),
    priceSale: setIndex % 3 ? null : faker.number.int({ min: 19, max: 29, precision: 0.01 }),
    colors:
      (setIndex === 1 && PRODUCT_COLOR.slice(0, 2)) ||
      (setIndex === 2 && PRODUCT_COLOR.slice(1, 3)) ||
      (setIndex === 3 && PRODUCT_COLOR.slice(2, 4)) ||
      (setIndex === 4 && PRODUCT_COLOR.slice(3, 6)) ||
      (setIndex === 23 && PRODUCT_COLOR.slice(4, 6)) ||
      (setIndex === 24 && PRODUCT_COLOR.slice(5, 6)) ||
      PRODUCT_COLOR,
    status: sample(['sale', 'new', '', '']),
    type:EVENT_TYPE[index]
  };
});
