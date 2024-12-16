import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PageTitle from '../components/Typography/PageTitle';
import SectionTitle from '../components/Typography/SectionTitle';
import config from '../config';
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Badge,
  Avatar,
  Button,
  Pagination,
} from '@windmill/react-ui';
import { TrashIcon } from '../icons';

const getUsersEndpoint = "/get-users/";
const deleteUserEndpoint = "/delete-user/"

function Tables() {
  const [pageTable2, setPageTable2] = useState(1);
  const [dataTable2, setDataTable2] = useState([]);
  const resultsPerPage = 10;
  
  const totalResults = dataTable2.length;

  // Pagination control for Table 2
  function onPageChangeTable2(p) {
    setPageTable2(p);
  }

  // Fetch users from the API
  useEffect(() => {
    axios
      .get(`${config.serverUrl}`+getUsersEndpoint)
      .then((response) => {
        setDataTable2(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching users!", error);
      });
  }, [pageTable2]);

  // Handle delete user
  const handleDelete = (userId) => {
    axios
      .delete(`${config.serverUrl}${deleteUserEndpoint}${userId}/`)
      .then((response) => {
        console.log("User deleted:", response);
        // After successful deletion, update the table by removing the deleted user
        setDataTable2((prevData) => prevData.filter((user) => user.user_id !== userId));
      })
      .catch((error) => {
        console.error("There was an error deleting the user!", error);
      });
  };

  return (
    <>
      <PageTitle>Users</PageTitle>
      <SectionTitle>Table with actions</SectionTitle>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>User ID</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>RFID Tag</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {dataTable2.slice((pageTable2 - 1) * resultsPerPage, pageTable2 * resultsPerPage).map((user) => (
              <TableRow key={user.user_id}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <div>
                      <p className="font-semibold">{user.user_id}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{user.username}</span>
                </TableCell>
                <TableCell>
                  <Badge type="success">{user.rfid_tag}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-4">
                    <Button
                      layout="link"
                      size="icon"
                      aria-label="Delete"
                      onClick={() => handleDelete(user.user_id)} // Trigger delete on button click
                    >
                      <TrashIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableFooter>
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            onChange={onPageChangeTable2}
            label="Table navigation"
          />
        </TableFooter>
      </TableContainer>
    </>
  );
}

export default Tables;
