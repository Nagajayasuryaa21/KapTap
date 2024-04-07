import { sample } from 'lodash';
import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

export const users = [...Array(24)].map((_, index) => ({
  id: faker.string.uuid(),
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  name: faker.person.fullName(),
  company: faker.company.name(),
  isVerified: faker.datatype.boolean(),
  status: sample(['active', 'banned']),
  role: sample([
    'Leader',
    'Hr Manager',
    'UI Designer',
    'UX Designer',
    'UI/UX Designer',
    'Project Manager',
    'Backend Developer',
    'Full Stack Designer',
    'Front End Developer',
    'Full Stack Developer',
  ]),
}));

export const users_data=[
  {
    "avatarUrl": "/assets/images/avatars/avatar_1.jpg",
    "name": "Verna Yundt",
    "phone": "123-456-7890"
  },
  {
    "avatarUrl": "/assets/images/avatars/avatar_2.jpg",
    "name": "Tracy Gleason",
    "phone": "234-567-8901"
  },
  {
    "avatarUrl": "/assets/images/avatars/avatar_3.jpg",
    "name": "Shirley Heidenreich",
    "phone": "345-678-9012"
  },
  {
    "avatarUrl": "/assets/images/avatars/avatar_4.jpg",
    "name": "Alonzo Kuvalis",
    "phone": "456-789-0123"
  },
  {
    "avatarUrl": "/assets/images/avatars/avatar_5.jpg",
    "name": "Judy Cole Jr.",
    "phone": "567-890-1234"
  },
  {
    "avatarUrl": "/assets/images/avatars/avatar_6.jpg",
    "name": "Lola Abshire",
    "phone": "678-901-2345"
  },
  {
    "avatarUrl": "/assets/images/avatars/avatar_7.jpg",
    "name": "Jacob Stamm",
    "phone": "789-012-3456"
  },
  {
    "avatarUrl": "/assets/images/avatars/avatar_8.jpg",
    "name": "Sandra Larson",
    "phone": "890-123-4567"
  },
  {
    "avatarUrl": "/assets/images/avatars/avatar_9.jpg",
    "name": "Hubert Hamill",
    "phone": "901-234-5678"
  },
  {
    "avatarUrl": "/assets/images/avatars/avatar_10.jpg",
    "name": "Mrs. Caroline Wiegand",
    "phone": "012-345-6789"
  }
]


export const user_activity = [...Array(24)].map((_, index) => ({
  id: faker.string.uuid(),
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  name: faker.person.fullName(),
  productName: faker.commerce.productName(),
  brand: faker.company.name(),
  datetime: faker.date.between('2024-01-01T00:00:00.000Z', '2024-01-30T00:00:00.000Z'),
  status: sample(['Add to cart', 'Removed from cart']),

}));
