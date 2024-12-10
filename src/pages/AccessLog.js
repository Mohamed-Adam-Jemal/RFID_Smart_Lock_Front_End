import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests

import PageTitle from '../components/Typography/PageTitle';

import {
  TableBody,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TableFooter,
  Pagination,
} from '@windmill/react-ui';

const serverIP = "http://172.16.48.73:8000/api";
const getAccessLogEndpoint = "/get-access-log/";

function Dashboard() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);

  // pagination setup
  const resultsPerPage = 10;

  // pagination change control
  function onPageChange(p) {
    setPage(p);
  }

  // Fetch data on component mount and set up periodic updates
  useEffect(() => {
    // Function to fetch data
    const fetchData = () => {
      axios.get(serverIP+getAccessLogEndpoint)
        .then(response => {
          const validData = response.data.filter(log => log && log.username && log.rfid_tag && log.access_time);
          if (validData.length > 0) {
            setData(validData.reverse()); // Set the fetched data to state if it's valid
          }
        })
        .catch(error => {
          console.error('There was an error fetching the access logs:', error);
        });
    };

    // Fetch data initially
    fetchData();

    // Set up an interval to fetch data every 10 seconds (10000ms)
    const intervalId = setInterval(() => {
      fetchData();
    }, 10000); // Fetch new data every 10 seconds

    // Clean up the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array to run once when component mounts

  return (
    <>
      <PageTitle>Access Log</PageTitle>

      <TableContainer>
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Username</TableCell>
              <TableCell>RFID Tag</TableCell>
              <TableCell>Access Time</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {data.slice((page - 1) * resultsPerPage, page * resultsPerPage).map((log, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <div>
                      <p className="font-semibold">{log.username || 'N/A'}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{log.rfid_tag || 'N/A'}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{new Date(log.access_time).toLocaleString()}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableFooter>
          <Pagination
            totalResults={data.length}
            resultsPerPage={resultsPerPage}
            label="Table navigation"
            onChange={onPageChange}
          />
        </TableFooter>
      </TableContainer>

      <div className="grid gap-6 mb-8 md:grid-cols-2">
      </div>
    </>
  );
}

export default Dashboard;
