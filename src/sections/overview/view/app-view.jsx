// import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';
import React, { useState,useEffect} from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import {product_data } from 'src/_mock/products';

// import Iconify from 'src/components/iconify';
import { ProductsView } from 'src/sections/products/view';
// import AppTasks from '../app-tasks';
// import AppNewsUpdate from '../app-news-update';
// import AppOrderTimeline from '../app-order-timeline';
// import AppCurrentVisits from '../app-current-visits';
// import AppWebsiteVisits from '../app-website-visits';
import AppWidgetSummary from '../app-widget-summary';

// import AppTrafficBySite from '../app-traffic-by-site';
// import AppCurrentSubject from '../app-current-subject';
// import AppConversionRates from '../app-conversion-rates';

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

export default function AppView() {
  const [selected, setSelected] = useState(Data.view);
  const today = dayjs();
  const [events,setEvents] = useState([]);
  // Calculate start date as 7 days before today
  const defaultStartDate = today.subtract(7, 'day');
  // Set end date as today
  const defaultEndDate = today;

  useEffect(()=>{
    console.log("HELLO-Dashboard");
    const fetchEvents = async () => {
      try {
        // Make a GET request to your API endpoint
        const response = await fetch(`https://no-code-app-api.vercel.app/api/ecom/events/`);
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
  },[]);

  // State to store selected dates
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);

  const filteredEvents = events.filter(e => {
    const eventDate = new Date(e.date);
    return eventDate >= startDate && eventDate <= endDate;
  });
  console.log(filteredEvents);

  // Function to handle date change
  const handleStartDateChange = (newStartDate) => {
    setStartDate(newStartDate);
  };

  const handleEndDateChange = (newEndDate) => {
    setEndDate(newEndDate);
  };

  const numberOfDays = endDate.diff(startDate, 'day') + 1;
  console.log(JSON.stringify(product_data));
  const totalViewsCount = events.reduce((count, item) => {
    if (item.type === "view") {
      count+=1;
    }
    return count;
  }, 0);
  const totaladdCount = events.reduce((count, item) => {
    if (item.type === "add") {
      count+=1;
    }
    return count;
  }, 0);
  const totalorderCount = events.reduce((count, item) => {
    if (item.type === "order") {
      count+=1;
    }
    return count;
  }, 0);
  const counts = filteredEvents.reduce((acc, item) => {
    if (item.type === selected.type) {
      acc[item.product] = (acc[item.product] || 0) + 1;
    }
    return acc;
  }, {});
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid
          xs={12}
          sm={6}
          md={3}
          onClick={() => {
            setSelected(Data.view);
          }}
          style={{ cursor: 'pointer' }}
        >
          <AppWidgetSummary
            title="Views"
            total={totalViewsCount}
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/eye-scan-protection.png" />}
          />
        </Grid>

        <Grid
          xs={12}
          sm={6}
          md={3}
          onClick={() => {
            setSelected(Data.add);
          }}
          style={{ cursor: 'pointer' }}
        >
          <AppWidgetSummary
            title="Add to cart"
            total={totaladdCount}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
          />
        </Grid>

        <Grid
          xs={12}
          sm={6}
          md={3}
          onClick={() => {
            setSelected(Data.cancel);
          }}
          style={{ cursor: 'pointer' }}
        >
          <AppWidgetSummary
            title="Order"
            total={totalorderCount}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
          />
        </Grid>
        {/* 
        <Grid xs={12} md={6} lg={8}>
          <AppWebsiteVisits
            title="Website Visits"
            subheader="(+43%) than last year"
            chart={{
              labels: [
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ],
              series: [
                {
                  name: 'Team A',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: 'Team B',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'Team C',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentVisits
            title="Current Visits"
            chart={{
              series: [
                { label: 'America', value: 4344 },
                { label: 'Asia', value: 5435 },
                { label: 'Europe', value: 1443 },
                { label: 'Africa', value: 4443 },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppConversionRates
            title="Conversion Rates"
            subheader="(+43%) than last year"
            chart={{
              series: [
                { label: 'Italy', value: 400 },
                { label: 'Japan', value: 430 },
                { label: 'China', value: 448 },
                { label: 'Canada', value: 470 },
                { label: 'France', value: 540 },
                { label: 'Germany', value: 580 },
                { label: 'South Korea', value: 690 },
                { label: 'Netherlands', value: 1100 },
                { label: 'United States', value: 1200 },
                { label: 'United Kingdom', value: 1380 },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentSubject
            title="Current Subject"
            chart={{
              categories: ['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math'],
              series: [
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ],
            }}
          />
        </Grid> */}

        {/* <Grid container > */}
        {/* <AppNewsUpdate
            title="Products"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: faker.commerce.productName(),
              description: faker.commerce.productDescription(),
              // image: `/assets/images/covers/cover_${index + 1}.jpg`,
              image: faker.image.url(),
              postedAt: faker.date.recent(),
            }))}
          /> */}

        {/* </Grid> */}

        {/* <Grid xs={12} md={6} lg={4}>
          <AppOrderTimeline
            title="Order Timeline"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: [
                '1983, orders, $4220',
                '12 Invoices have been paid',
                'Order #37745 from September',
                'New order placed #XF-2356',
                'New order placed #XF-2346',
              ][index],
              type: `order${index + 1}`,
              time: faker.date.past(),
            }))}
          />
        </Grid> */}

        {/* <Grid xs={12} md={6} lg={4}>
          <AppTrafficBySite
            title="Traffic by Site"
            list={[
              {
                name: 'FaceBook',
                value: 323234,
                icon: <Iconify icon="eva:facebook-fill" color="#1877F2" width={32} />,
              },
              {
                name: 'Google',
                value: 341212,
                icon: <Iconify icon="eva:google-fill" color="#DF3E30" width={32} />,
              },
              {
                name: 'Linkedin',
                value: 411213,
                icon: <Iconify icon="eva:linkedin-fill" color="#006097" width={32} />,
              },
              {
                name: 'Twitter',
                value: 443232,
                icon: <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={32} />,
              },
            ]}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppTasks
            title="Tasks"
            list={[
              { id: '1', name: 'Create FireStone Logo' },
              { id: '2', name: 'Add SCSS and JS files if required' },
              { id: '3', name: 'Stakeholder Meeting' },
              { id: '4', name: 'Scoping & Estimations' },
              { id: '5', name: 'Sprint Showcase' },
            ]}
          />
        </Grid> */}
        <Grid>
          <ProductsView data = {selected} startDate={startDate} endDate={endDate} handleStartDateChange={handleStartDateChange} handleEndDateChange={handleEndDateChange} days={numberOfDays} counts={counts} events={filteredEvents}/>
        </Grid>
      </Grid>
    </Container>
  );
}
