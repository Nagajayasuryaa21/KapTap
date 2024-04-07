import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import React, { useState,useEffect} from 'react';
// import { faker } from '@faker-js/faker';


import Box from '@mui/material/Box';
import {Grid } from '@mui/material';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Avatar from '@mui/material/Avatar';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import TableSortLabel from '@mui/material/TableSortLabel';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { users_data} from 'src/_mock/user';
// import { AppView } from 'src/sections/overview/view';

// import { ProductsView } from 'src/sections/products/view';
import { event,product_data } from 'src/_mock/products';

import Label from 'src/components/label';

// import ProductCard from 'src/sections/products/product-card';
// import AppNewsUpdate from 'src/sections/overview/app-news-update';
// import AppWidgetSummary from 'src/sections/overview/app-widget-summary';
// import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import TableNoData from 'src/sections/user/table-no-data';
// import UserTableRow from 'src/sections/user/user-table-row';
// import UserTableHead from 'src/sections/user/user-table-head';
import TableEmptyRows from 'src/sections/user/table-empty-rows';
import UserTableToolbar from 'src/sections/user/user-table-toolbar';
import AppWebsiteVisits from 'src/sections/overview/app-website-visits';
import AppCurrentVisits from 'src/sections/overview/app-current-visits';
import { emptyRows, applyFilter, getComparator, visuallyHidden } from 'src/sections/user/utils';
// ----------------------------------------------------------------------

const Data = {
    view: {
      type: 'view',
      name: "View",
      image: '/assets/icons/glass/eye-scan-protection.png',
    },
    add: {
      type: 'add',
      name: "Add to Chart",
      image: '/assets/icons/glass/ic_glass_buy.png',
    },
    cancel: {
      type: "order",
      name: 'Order',
      image: '/assets/icons/glass/ic_glass_message.png',
    },
  };
  
  


export default function ProductDetail() {

    const { id } = useParams();
    const product = product_data.find(e => e.id.toString()=== id);
    const [events,setEvents] = useState([]);
    useEffect(()=>{
        console.log("Hello");
        const fetchEvents = async () => {
            try {
              // Make a GET request to your API endpoint
              const response = await fetch(`https://no-code-app-api.vercel.app/api/ecom/events/product/${id}`);
              if (!response.ok) {
                throw new Error('Failed to fetch events');
              }
              // Parse the JSON response
              const eventData = await response.json();
              // Set the events state with the fetched data
              console.log(eventData);
              setEvents(eventData);
            //   setEvents(eventData);
            } catch (error) {
              console.error('Error fetching events:', error);
            }
          };
      
          fetchEvents();
    },[id])
    // console.log(id);
    // console.log(product);
    // console.log(product_data);
    const [selectedobj, setSelectedobj] = useState(Data.view);

    const [page, setPage] = useState(0);

    const [order, setOrder] = useState('asc');
    const dataMap = new Map();

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

    
    let filteredEvents = events;

    if(!events.length){
        filteredEvents = event.filter(e => e.product.toString() === id);
        event.forEach(activity => {
            const date = new Date(activity.date).toLocaleDateString();
            const count = dataMap.get(date) || { 'add': 0, 'remove': 0 ,'order':0,'view':0,'cancel':0};
            count[activity.type]+=1;
            dataMap.set(date, count);
        });

    }else{
        events.forEach(activity => {
            const date = new Date(activity.date).toLocaleDateString();
            const count = dataMap.get(date) || { 'add': 0, 'remove': 0 ,'order':0,'view':0,'cancel':0};
            count[activity.type]+=1;
            dataMap.set(date, count);
        });
    }
    
        

    // Then, filter based on 'type' if necessary
    if (selectedobj.type === 'add') {
    // Include both 'add' and 'remove' types
    filteredEvents = filteredEvents.filter(e => e.type === 'add' || e.type === 'remove');
    } else if (selectedobj.type === 'order') {
    // Include both 'order' and 'cancel' types
    filteredEvents = filteredEvents.filter(e => e.type === 'order' || e.type === 'cancel');
    } else if (selectedobj.type === 'view') {
    // If type is not 'view', adjust to only include 'view' types, or any specific logic you need
    // If you want to exclude 'view' when a specific type is mentioned, you might not need this block
    filteredEvents = filteredEvents.filter(e => e.type === 'view'); // Adjust according to your needs. This example excludes non-'view' types if they're not 'add' or 'order'
    }

    // Map over the filtered events to combine with user data
    const combinedData = filteredEvents.map(evt => {
        const user = users_data.find(u => u.phone === evt.customer_id);

        if (user) {
        // If a matching user is found, combine the user data with the event
        return { ...evt, name: user.name, avatarUrl: user.avatarUrl, phone: user.phone };
        }

        // If no user is found, return the event as is (or handle this case differently if needed)
        return evt;
    });

    console.log("COMBINED",combinedData);

    const totalCounts = events.reduce((counts, activity) => {
        counts[activity.type]+=1;
        return counts;
      }, { 'add': 0, 'remove': 0 ,'order':0,'view':0,'cancel':0});

    console.log(totalCounts);
    const labels = Array.from(dataMap.keys()).sort((a, b) => new Date(a) - new Date(b));
    const series = Object.keys(dataMap.get(labels[0]));
    console.log(labels);
    console.log(series);
    // const [selected, setSelected] = useState([]);
  
    const [orderBy, setOrderBy] = useState('name');
  
    const [filterName, setFilterName] = useState('');
  
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const headLabel=[
        { id: 'name', label: 'User Name' },
        { id: 'phone', label: 'Phone Number' },
        { id: 'datetime', label: 'Date & Time', align: 'center' },
        { id: 'status', label: 'Status' },
    ];
  
    const handleSort = (e, i) => {
      const isAsc = orderBy === i && order === 'asc';
      if (i !== '') {
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(i);
      }
      
    //   console.log(dataMap);
    //   console.log(labels);
      console.log(series);
    //   console.log(labels.map(label => dataMap.get(label)['Add to cart']));
    //   console.log(labels.map(label => dataMap.get(label)['Removed from cart']));
    //   console.log(JSON.stringify(user_activity));
    };
  
    // const handleSelectAllClick = (event) => {
    //   if (event.target.checked) {
    //     const newSelecteds = users.map((n) => n.name);
    //     setSelected(newSelecteds);
    //     return;
    //   }
    //   setSelected([]);
    // };
  
    // const handleClick = (event, name) => {
    //   const selectedIndex = selected.indexOf(name);
    //   let newSelected = [];
    //   if (selectedIndex === -1) {
    //     newSelected = newSelected.concat(selected, name);
    //   } else if (selectedIndex === 0) {
    //     newSelected = newSelected.concat(selected.slice(1));
    //   } else if (selectedIndex === selected.length - 1) {
    //     newSelected = newSelected.concat(selected.slice(0, -1));
    //   } else if (selectedIndex > 0) {
    //     newSelected = newSelected.concat(
    //       selected.slice(0, selectedIndex),
    //       selected.slice(selectedIndex + 1)
    //     );
    //   }
    //   setSelected(newSelected);
    // };
  
    const handleChangePage = (e, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (e) => {
      setPage(0);
      setRowsPerPage(parseInt(e.target.value, 10));
    };
  
    const handleFilterByName = (e) => {
      setPage(0);
      setFilterName(e.target.value);
    };
  
    const dataFiltered = applyFilter({
      inputData: combinedData,
      comparator: getComparator(order, orderBy),
      filterName,
    });

    dataFiltered.sort((a, b) => new Date(b.date) - new Date(a.date));
  
    const notFound = !dataFiltered.length && !!filterName;

    const onSort = (property) => (e) => {
        handleSort(e, property);
      };
  
//   name = "add";
    
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
      <Grid container spacing={3} gap={3} p={5} selected={selectedobj}>

        <Grid
            xs={14} sm={6} md={4}
        >
            {/* <ProductCard product={products[1]} selected={selected} type={selected.type} /> */}
            <Card>
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
        xs={12} sm={6} md={7}
        >
            {/* <Grid container > */}
            <div>

                <Grid container spacing={1} gap={2} m={3}>
                    <Grid
                    xs={12}
                    sm={6}
                    md={3}
                    onClick={() => {
                        setSelectedobj(Data.view);
                    }}
                    style={{ cursor: 'pointer' }}
                    >
                        <Card
                            component={Stack}
                            spacing={3}
                            direction="row"
                            sx={{
                                px: 3,
                                py: 3,
                                borderRadius: 2,
                            }}
                            >
                            <Box sx={{ width: 64, height: 64 }}><img alt="icon" src="/assets/icons/glass/eye-scan-protection.png" /></Box>
                            <Typography variant="h5">
                                View
                            </Typography>
                            
                        </Card>
                    </Grid>

                    <Grid
                        xs={12}
                        sm={6}
                        md={4}
                        onClick={() => {
                            setSelectedobj(Data.add);
                        }}
                        style={{ cursor: 'pointer' }}
                        >
                            <Card
                                component={Stack}
                                spacing={3}
                                direction="row"
                                sx={{
                                    px: 3,
                                    py: 3,
                                    borderRadius: 2,
                                }}
                                >
                                <Box sx={{ width: 64, height: 64 }}><img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" /></Box>
                                <Typography variant="h6">
                                    Add To Chart
                                </Typography>
                                
                            </Card>
                        </Grid>

                        <Grid
                        xs={12}
                        sm={6}
                        md={4}
                        onClick={() => {
                            setSelectedobj(Data.cancel);
                        }}
                        style={{ cursor: 'pointer' }}
                        >
                            <Card
                                component={Stack}
                                spacing={3}
                                direction="row"
                                sx={{
                                    px: 3,
                                    py: 3,
                                    borderRadius: 2,
                                }}
                                >
                                <Box sx={{ width: 64, height: 64 }}><img alt="icon" src="/assets/icons/glass/ic_glass_message.png" /></Box>
                                <Typography variant="h6">
                                    Order
                                </Typography>
                                
                            </Card>
                        </Grid>
                </Grid>
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
                            <Grid item xs={12} sm={6} md={4}>
                                <Typography variant="subtitle1" color="#696969">
                                Type:
                                </Typography>
                                <Typography my={1} variant='h6'>
                                {/* {product.type} */}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
                
            </div>
            {/* <ProductCard product={products[1]} /> */}
        </Grid>
        {(selectedobj.type!=='view') && <Grid xs={12} md={6} lg={7}>
            <AppWebsiteVisits
                title={selectedobj.name.toString()}
                chart={{
                labels,
                series: [
                    {
                    name: selectedobj.type==='add'?'Add to cart':'Ordered',
                    type: 'area',
                    fill: 'gradient',
                    data: labels.map(label => dataMap.get(label)[selectedobj.type==='add'?'add':'order']),
                    },
                    {
                    name: selectedobj.type==='add'?'Remover from cart':'Cancel Order',
                    type: 'area',
                    fill: 'gradient',
                    data: labels.map(label => dataMap.get(label)[selectedobj.type==='add'?'remove':'cancel']),
                    },
                ],
                }}
            />
        </Grid>}
        {(selectedobj.type!=='view')&&<Grid xs={10} md={5} lg={4}>
            <AppCurrentVisits
                title="Pie Chart"
                chart={{
                series: [
                    { label: selectedobj.type==='add'?'Add to cart':'Ordered', value: totalCounts[selectedobj.type==='add'?'add':'order'] },
                    { label: selectedobj.type==='add'?'Remover from cart':'Cancel Order', value: totalCounts[selectedobj.type==='add'?'remove':'cancel'] },
                ],
                }}
            />
        </Grid >}

        <Grid  xs={12} md={12} lg={12}>
            <Card>
                <Typography variant='h5' m={3}>
                    User Activities
                </Typography>
                <UserTableToolbar
                    numSelected={0}
                    filterName={filterName}
                    onFilterName={handleFilterByName}
                />

                <Scrollbar>
                    <TableContainer sx={{ overflow: 'unset' }}>
                    <Table sx={{ minWidth: 800, p:5}} >
                        {/* <UserTableHead
                        order={order}
                        orderBy={orderBy}
                        rowCount={users.length}
                        numSelected={selected.length}
                        onRequestSort={handleSort}
                        onSelectAllClick={handleSelectAllClick}
                        headLabel={[
                            { id: 'name', label: 'Name' },
                            { id: 'company', label: 'Company' },
                            { id: 'role', label: 'Role' },
                            { id: 'isVerified', label: 'Verified', align: 'center' },
                            { id: 'status', label: 'Status' },
                            { id: '' },
                        ]}
                        /> */}
                        <TableHead>
                            <TableRow>
                                {/* <TableCell padding="checkbox">
                                <Checkbox
                                    indeterminate={numSelected > 0 && numSelected < rowCount}
                                    checked={rowCount > 0 && numSelected === rowCount}
                                    onChange={onSelectAllClick}
                                />
                                </TableCell> */}

                                {headLabel.map((headCell) => (
                                <TableCell
                                    key={headCell.id}
                                    align={headCell.align || 'left'}
                                    sortDirection={orderBy === headCell.id ? order : false}
                                    sx={{ width: headCell.width, minWidth: headCell.minWidth }}
                                >
                                    <TableSortLabel
                                    hideSortIcon
                                    active={orderBy === headCell.id}
                                    direction={orderBy === headCell.id ? order : 'asc'}
                                    onClick={onSort(headCell.id)}
                                    sx={{marginLeft:1}}
                                    >
                                    {headCell.label}
                                    {orderBy === headCell.id ? (
                                        <Box sx={{ ...visuallyHidden }} ml={2}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                        </Box>
                                    ) : null}
                                    </TableSortLabel>
                                </TableCell>
                                ))}
                            </TableRow>
                            </TableHead>
                        <TableBody>
                        {dataFiltered
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => (
                            // <UserTableRow
                            //     key={row.id}
                            //     name={row.name}
                            //     role={row.role}
                            //     status={row.status}
                            //     company={row.company}
                            //     avatarUrl={row.avatarUrl}
                            //     isVerified={row.isVerified}
                            //     selected={selected.indexOf(row.name) !== -1}
                            //     handleClick={(event) => handleClick(event, row.name)}
                            // />
                            
                                <TableRow hover tabIndex={-1} role="checkbox" selected={()=>{}}>
                                    {/* <TableCell padding="checkbox">
                                    <Checkbox disableRipple checked={selected} onChange={handleClick} />
                                    </TableCell> */}

                                    <TableCell component="th" scope="row" padding="none" >
                                    <Stack direction="row" alignItems="center" spacing={2} ml={2}>
                                        <Avatar alt={row.name} src={row.avatarUrl} />
                                        <Typography variant="subtitle2" noWrap>
                                        {row.name}
                                        </Typography>
                                    </Stack>
                                    </TableCell>

                                    <TableCell>{row.phone}</TableCell>

                                    {/* <TableCell>{row.brand}</TableCell> */}

                                    <TableCell align="center">{new Date(row.date).toUTCString()}</TableCell>

                                    <TableCell>
                                    <Label color={(row.type === 'remove' || row.type === 'cancel') ? 'error' : 'success'}>
                                        {{
                                            'remove': 'Remove from cart',
                                            'add': 'Add to cart',
                                            'view': 'Viewed',
                                            'order': 'Ordered',
                                            'cancel': 'Canceled Order'
                                        }[row.type] || row.type}
                                    </Label>
                                    </TableCell>
                                </TableRow>
                                
                            ))}

                        <TableEmptyRows
                            height={77}
                            emptyRows={emptyRows(page, rowsPerPage, combinedData.length)}
                        />

                        {notFound && <TableNoData query={filterName} />}
                        </TableBody>
                    </Table>
                    </TableContainer>
                </Scrollbar>

                <TablePagination
                    page={page}
                    component="div"
                    count={combinedData.length}
                    rowsPerPage={rowsPerPage}
                    onPageChange={handleChangePage}
                    rowsPerPageOptions={[5, 10, 25]}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
                </Card>
        </Grid>

      </Grid>
      {/* <ProductsView /> */}
    </>
  );
}
