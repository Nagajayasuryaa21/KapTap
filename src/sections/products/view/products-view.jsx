// import { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { DateTimePicker } from '@mui/x-date-pickers';
// eslint-disable-next-line import/no-extraneous-dependencies
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// eslint-disable-next-line import/no-extraneous-dependencies
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { product_data } from 'src/_mock/products';

import ProductCard from '../product-card';
// import ProductSort from '../product-sort';
// import ProductFilters from '../product-filters';

// import ProductCartWidget from '../product-cart-widget';



// ----------------------------------------------------------------------

export default function ProductsView({data,startDate,endDate,handleStartDateChange,handleEndDateChange,days,counts,events}) {
  const { image, type,name} = data;
  // const [openFilter, setOpenFilter] = useState(false);
  const viewProductIds = events
  .filter(item => item.type === type)
  .map(item => item.product);
  console.log(viewProductIds);
  // const handleOpenFilter = () => {
  //   setOpenFilter(true);
  // };

  // const handleCloseFilter = () => {
  //   setOpenFilter(false);
  // };

  return (
    <Container maxWidth='xl'>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Products
      </Typography>

      <div style={{display:'flex'}}>
          <img alt="icon" src={image} width="50px" height="50px"/>
          <Typography variant="h4" sx={{pl:2 }}>
            {name} Products report
          </Typography>
        </div>
      <Stack
        direction="row"
        alignItems="center"
        flexWrap="wrap-reverse"
        justifyContent="flex"
        sx={{ mb: 5 }}
      >
        
        {/* <Stack direction="row" spacing={1} flexShrink={0} sx={{mt:2}}>
          <ProductFilters
            openFilter={openFilter}
            onOpenFilter={handleOpenFilter}
            onCloseFilter={handleCloseFilter}
          />

          <ProductSort />
        </Stack> */}
          <Grid container spacing={3} sx={{ p: 3, display:'flex' }}>
            <Grid >
              <Grid>
                <Typography variant="secondary2" sx={{ ml: 1 }}>
                  Start Date & Time
                </Typography>
              </Grid>
              <Grid>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker value={startDate} onChange={handleStartDateChange}/>
                </LocalizationProvider>
              </Grid>
              
            </Grid>
            <Grid >
              <Grid>
                <Typography variant="secondary2" sx={{ ml: 1 }}>
                  End Date & Time
                </Typography>
              </Grid>
              <Grid>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker value={endDate} onChange={handleEndDateChange}/>
                </LocalizationProvider>  
              </Grid>
            </Grid>
            
          </Grid>
      </Stack>

      <Grid container spacing={3}>
 
        {product_data.map((product) => (
          // (product.type === type)&&
          viewProductIds.includes(product.id) && 
          <Grid key={product.id} xs={12} sm={8} md={3}>
            <a style={{cursor:'pointer',textDecoration:'none'}} href={`/product/${product.id}`}>
              <ProductCard product={product} type={name} count={counts[product.id]} days={days}/>
            </a>
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
  }),
  startDate:PropTypes.object,
  endDate:PropTypes.object,
  handleStartDateChange:PropTypes.func,
  handleEndDateChange:PropTypes.func,
  days:PropTypes.string,
  counts:PropTypes.object,
  events:PropTypes.object

};
