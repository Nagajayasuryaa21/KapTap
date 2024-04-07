import dayjs from 'dayjs';
import React,{useState} from 'react';
// import { faker } from '@faker-js/faker';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import {Grid } from '@mui/material';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import { DateTimePicker } from '@mui/x-date-pickers';
// eslint-disable-next-line import/no-extraneous-dependencies
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// eslint-disable-next-line import/no-extraneous-dependencies
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { users_data} from 'src/_mock/user';
import { product_data } from 'src/_mock/products';

export default function ProductDetailECOM() {

    const { id } = useParams();
    const product = product_data.find(e => e.id.toString()=== id);
    const renderImg =(e)=>(
        <Box
          component="img"
          alt={product.name}
          src={product.cover}
          sx={{
            top: 0,
            width: 1,
            height: 1,
            objectFit: 'cover',
            position: 'absolute',
          }}
        />
      );

    

      const today = dayjs();
      const [startDate, setStartDate] = useState(today);
      const [addToChart,setAddToCart] = useState("Add to cart");
      const [buyNow,setBuyNow] = useState("Buy now");
      const [address,setAddress] = useState("");
      const handleStartDateChange = (newStartDate) => {
        setStartDate(newStartDate);
      };
      const [selectedUser, setSelectedUser] = useState('789-012-3456');

      const handleChange = (e) => {
        setSelectedUser(e.target.value);
        setAddToCart("Add to cart");
        setBuyNow("Buy now");
      };
      const handleOnClickView=()=>{
        const eventData = {
            customer_id:selectedUser,
            type:"view",
            desc:"", 
            product:product.id,
            brand_id:product.brand_id,
            date:startDate,
         };
         fetch('https://no-code-app-api.vercel.app/api/ecom/events', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(eventData),
        })
        .then(response => {
            if (!response.ok) {
                console.log('Failed to add to cart');
            }
            // If the response is OK, you can handle the success here
            console.log('Item added to cart successfully');
        })
        .catch(error => {
            // Handle any errors
            console.error('Error adding to cart:', error);
        });
        const event = new CustomEvent('custom-event', { detail: eventData });
        window.dispatchEvent(event);
        window.parent.postMessage(eventData,'*');
      }
      const handleOnClickAddToCart = () => {
        const eventData = {
            customer_id:selectedUser,
            type:addToChart==="Add to cart"?"add":"remove",
            desc:"", 
            product:product.id,
            brand_id:product.brand_id,
            date:startDate,
         };
         fetch('https://no-code-app-api.vercel.app/api/ecom/events', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(eventData),
        })
        .then(response => {
            if (!response.ok) {
                console.log('Failed to add to cart');
            }
            // If the response is OK, you can handle the success here
            console.log('Item added to cart successfully');
        })
        .catch(error => {
            // Handle any errors
            console.error('Error adding to cart:', error);
        });
        const event = new CustomEvent('custom-event', { detail: eventData });
        window.dispatchEvent(event);
        window.parent.postMessage(eventData,'*');
        console.log("SENT");
        setAddToCart(addToChart==="Add to cart"?"Remove from cart":"Add to cart")
      };

      const handleOnClickByNow = () => {
        const eventData = {
            customer_id:selectedUser,
            type:buyNow==="Buy now"?"order":"cancel",
            desc:address, 
            product:product.id,
            brand_id:product.brand_id,
            date:startDate,
         };
         fetch('https://no-code-app-api.vercel.app/api/ecom/events', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(eventData),
        })
        .then(response => {
            if (!response.ok) {
                console.log('Failed to add to cart');
            }
            // If the response is OK, you can handle the success here
            console.log('Item added to cart successfully');
        })
        .catch(error => {
            // Handle any errors
            console.error('Error adding to cart:', error);
        });
        const event = new CustomEvent('custom-event', { detail: eventData });
        window.dispatchEvent(event);
        window.parent.postMessage(eventData,'*');
        console.log("SENT");
        setBuyNow(buyNow==="Buy now"?"Cancel Order":"Buy now")
      };


    
  return (
    <>
      {/* <Typography variant="h4" sx={{ mx:3, mb:3 }}>
        Product Detail
      </Typography> */}
      <Helmet>
        <title> Products | Minimal UI </title>
      </Helmet>
      {/* <AppView/> */}
      {/* <div>
        Hello
      </div> */}
      <Grid container spacing={3} gap={3} p={5} >

        <Grid
            xs={14} sm={6} md={4}
        >
            {/* <ProductCard product={products[1]} selected={selected} type={selected.type} /> */}
            <Card>
                <a href='/ecom-list' style={{textDecoration:'none',color:'black'}}>
                    <Typography variant="subtitle1">
                        Go Back
                    </Typography>
                </a>
                <Box sx={{ pt: '100%', position: 'relative' }}>
                    {/* {product.status && renderStatus} */}

                    {renderImg(id)}
                </Box>

                <Stack spacing={2} sx={{ p: 3 }}>
                    <Link color="inherit" underline="hover" variant="subtitle2" noWrap>
                    {product.name}
                    </Link>
                </Stack>
                </Card>
        </Grid>
        <Grid
        xs={12} sm={6} md={7} gap={2}
        >
            {/* <Grid container > */}
            

                <Grid>
                    <Card >
                        <CardHeader title="Product Detail" subheader="" />
                        <Grid container spacing={3} mx={5} my={3}> {/* Use `container` to define a Grid container and `spacing` for the gap */}
                            <Grid item xs={12} sm={6} md={4}> {/* Adjust the item sizes for responsiveness */}
                                <Typography variant="subtitle1" color="#696969">
                                Name:
                                </Typography>
                                <Typography my={1} variant='h6'>
                                {product.name}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Typography variant="subtitle1" color="#696969">
                                Price:
                                </Typography>
                                <Typography my={1} variant='h6'>
                                ${product.price} {product.priceSale && <span>(Sale: ${product.priceSale})</span>}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Typography variant="subtitle1" color="#696969">
                                Colors:
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center', mt: 1 }}>
                                {product.colors.map((color, index) => (
                                    <Box
                                    key={index}
                                    sx={{
                                        width: 10,
                                        height: 10,
                                        borderRadius: '50%',
                                        backgroundColor: color,
                                    }}
                                    />
                                ))}
                                </Box>
                            </Grid>
                            {product.status && (
                                <Grid item xs={12} sm={6} md={4}>
                                <Typography variant="subtitle1" color="#696969">
                                    Status:
                                </Typography>
                                <Typography  my={1} variant='h6'>
                                    {product.status}
                                </Typography>
                                </Grid>
                            )}
                        </Grid>
                    </Card>
                </Grid>
                <Grid mt={2} >
                    <Card >
                        <Grid container m={5} gap={3}>
                            <Grid >
                                <Grid>
                                    <Typography variant="secondary2" sx={{ ml: 1 }}>
                                    Date & Time
                                    </Typography>
                                </Grid>
                                <Grid>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DateTimePicker value={startDate} onChange={handleStartDateChange}/>
                                    </LocalizationProvider>
                                </Grid>
                            
                            </Grid>
                            <Grid >
                                
                                <Grid mt={3}>
                                    <TextField id="outlined-basic" label="Enter your Address" variant="outlined" value={address} onChange={(e)=>{setAddress(e.target.value)}}/>
                                </Grid>
                            
                            </Grid>
                            <Grid>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={selectedUser}
                                onChange={handleChange}
                                label="User Phone"
                                >
                                {users_data.map((user, index) => (
                                    <MenuItem key={index} value={user.phone}>
                                    {user.phone}
                                    </MenuItem>
                                ))}
                                </Select>
                            </Grid>
                            
                            <Grid>
                                <Button m={5} variant='outlined' color={addToChart==="Add to cart"?"primary":"error"} onClick={handleOnClickAddToCart}>
                                    {addToChart}
                                </Button>
                            </Grid>
                            <Grid>
                                <Button m={5} variant='contained' color={buyNow==="Buy now"?"primary":"error"} onClick={handleOnClickByNow}>
                                    {buyNow}
                                </Button>
                            </Grid>
                            <Grid>
                                <Button m={5} variant='contained' color="success" onClick={handleOnClickView}>
                                    View
                                </Button>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
                
            
            {/* <ProductCard product={products[1]} /> */}
        </Grid>

      </Grid>
      {/* <ProductsView /> */}
    </>
  );
}
