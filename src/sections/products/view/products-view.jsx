import { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { products } from 'src/_mock/products';

import ProductCard from '../product-card';
import ProductSort from '../product-sort';
import ProductFilters from '../product-filters';

// import ProductCartWidget from '../product-cart-widget';

// ----------------------------------------------------------------------

export default function ProductsView({data}) {
  const { image, type,name} = data;
  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Products
      </Typography>

      <div style={{display:'flex'}}>
          <img alt="icon" src={image} width="50px" height="50px"/>
          <Typography variant="h4" sx={{pl:2 }}>
            {type} Products report
          </Typography>
        </div>
      <Stack
        direction="row"
        alignItems="center"
        flexWrap="wrap-reverse"
        justifyContent="flex-end"
        sx={{ mb: 5 }}
      >
        
        <Stack direction="row" spacing={1} flexShrink={0} sx={{mt:2}}>
          <ProductFilters
            openFilter={openFilter}
            onOpenFilter={handleOpenFilter}
            onCloseFilter={handleCloseFilter}
          />

          <ProductSort />
        </Stack>
      </Stack>

      <Grid container spacing={3}>
 
        {products.map((product) => (
          (product.type === type)&&
          <Grid key={product.id} xs={12} sm={6} md={3}>
            <ProductCard product={product} type={name}/>
          </Grid>
        ))}
      </Grid>

      {/* <ProductCartWidget /> */}
    </Container>
  );
}

ProductsView.propTypes = {
    data:PropTypes.shape({
    type: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string
  })
};
