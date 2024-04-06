import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'View',
    path: '/user',
    icon: icon('ic_blog'),
  },
  {
    title: 'Add To Cart',
    path: '/products',
    icon: icon('ic_cart'),
  },
  {
    title: 'Order Cancel',
    path: '/404',
    icon: icon('ic_disabled'),
  },
  
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: icon('ic_lock'),
  // },
  
];

export default navConfig;
