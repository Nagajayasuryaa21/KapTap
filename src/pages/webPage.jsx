import dayjs from 'dayjs';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect} from 'react';

import Box from '@mui/material/Box';
import {Grid } from '@mui/material';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Avatar from '@mui/material/Avatar';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import TableSortLabel from '@mui/material/TableSortLabel';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { users_data } from 'src/_mock/user';
import { product_data } from 'src/_mock/products';
// import { ProductsView } from 'src/sections/products/view';

import { DateTimePicker } from '@mui/x-date-pickers';
// eslint-disable-next-line import/no-extraneous-dependencies
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// eslint-disable-next-line import/no-extraneous-dependencies
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

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
// import UserTableToolbar from 'src/sections/user/user-table-toolbar';
import { emptyRows, applyFilter, getComparator, visuallyHidden } from 'src/sections/user/utils';
// ----------------------------------------------------------------------

  
  


// import { UserView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

export default function UserPageWEB() {
    const { id } = useParams();
  const [page, setPage] = useState(0);

    const [order, setOrder] = useState('asc');
    
    const [orderBy, setOrderBy] = useState('name');
  
    const [filterName, setFilterName] = useState('');
  
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [events,setEvents] = useState([]);
    useEffect(()=>{
      console.log("HELLO-Dashboard");
      const fetchEvents = async () => {
        try {
          // Make a GET request to your API endpoint
          const response = await fetch(`https://no-code-app-api.vercel.app/api/ecom/events/customer/${id}`);
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
    },[id]);

    const headLabel=[
        { id: 'name', label: 'User Name' },
        { id: 'product', label: 'Product Name' },
        { id: 'zone', label: 'Product Zone' },
        { id: 'address', label: 'Delever to' },
        { id: 'datetime', label: 'Date & Time', align: 'center' },
        { id: 'status', label: 'Status' },
    ];
    const today = dayjs();
    // Calculate start date as 7 days before today
    const defaultStartDate = today.subtract(7, 'day');
    // Set end date as today
    const defaultEndDate = today.add(60,'day');

    // State to store selected dates
    const [startDate, setStartDate] = useState(defaultStartDate);
    const [endDate, setEndDate] = useState(defaultEndDate);
    const filteredEvents = events.filter(e => {
      const eventDate = new Date(e.date);
      return eventDate >= startDate && eventDate <= endDate;
    });
    const combinedData = filteredEvents
    .map(evt => {
      const user = users_data.find(u => u.phone === evt.customer_id);
      const product = product_data.find(p => p.id === evt.product);
      if (user) {
      // If a matching user is found, combine the user data with the event
      evt = { ...evt, name: user.name, avatarUrl: user.avatarUrl, phone: user.phone };
      }

      if(product){
        evt = { ...evt, productName: product.name, zone: product.zone};
      }
      // If no user is found, return the event as is (or handle this case differently if needed)
      return evt;
  });
  combinedData.sort((a, b) => new Date(b.date) - new Date(a.date))
  console.log("COMBINED",JSON.stringify(combinedData));
  
    const handleSort = (e, i) => {
      const isAsc = orderBy === i && order === 'asc';
      if (i !== '') {
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(i);
      }
      
      
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
    const handleStartDateChange = (newStartDate) => {
      setStartDate(newStartDate);
    };
  
    const handleEndDateChange = (newEndDate) => {
      setEndDate(newEndDate);
    };
  return (
    <>
      <Helmet>
        <title> User | Minimal UI </title>
      </Helmet>

      {/* <UserView /> */}
      <Grid  xs={12} md={12} lg={12}>
            <Card>
                <Typography variant='h5' m={3}>
                    User Activities
                </Typography>
                
                
                    <Grid container spacing={3} gap={2} sx={{ p: 3, display:'flex' }} filterName={filterName}
                              onFilterName={handleFilterByName}>
                      <Grid>
                        {/* <Grid mx={2}>
                          <Typography variant="secondary2" sx={{ ml: 1 }}>
                              User name
                          </Typography>
                        </Grid>
                        <Grid>
                          <UserTableToolbar
                              numSelected={0}
                              filterName={filterName}
                              onFilterName={handleFilterByName}
                          />
                        </Grid> */}
                      </Grid>
                      <Grid >
                        <Grid mb={2}>
                          <Typography variant="secondary2" sx={{ m: 1 }}>
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
                        <Grid mb={2}>
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

                <Scrollbar>
                    <TableContainer sx={{ overflow: 'unset' }}>
                    <Table sx={{ minWidth: 800 }}>
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
                                    sx={{ width: headCell.width, minWidth: headCell.minWidth , marginLeft: 2}}
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

                                    <TableCell>
                                      <a href={`/product/${row.product}`} style={{textDecoration:'none', color:'black'}} target='break'>
                                        {row.productName}
                                      </a>
                                    </TableCell>

                                    <TableCell>{row.zone}</TableCell>
                                    <TableCell>{row.desc}</TableCell>
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
    </>
  );
}
