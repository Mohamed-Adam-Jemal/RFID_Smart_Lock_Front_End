import React, { useState, useEffect } from 'react'
import axios from 'axios'; // Import Axios for making HTTP requests

import CTA from '../components/CTA'
import InfoCard from '../components/Cards/InfoCard'
import ChartCard from '../components/Chart/ChartCard'
import { Doughnut, Line } from 'react-chartjs-2'
import ChartLegend from '../components/Chart/ChartLegend'
import PageTitle from '../components/Typography/PageTitle'
import { ChatIcon, CartIcon, MoneyIcon, PeopleIcon } from '../icons'
import RoundIcon from '../components/RoundIcon'
import {
  TableBody,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TableFooter,
  Avatar,
  Badge,
  Pagination,
} from '@windmill/react-ui'

function Dashboard() {
  const [page, setPage] = useState(1)
  const [data, setData] = useState([])

  // pagination setup
  const resultsPerPage = 10

  // pagination change control
  function onPageChange(p) {
    setPage(p)
  }

  // Fetch data on component mount
  useEffect(() => {
    axios.get('http://localhost:8000/api/get-access-log/')
      .then(response => {
        setData(response.data) // Set the fetched data to state
      })
      .catch(error => {
        console.error('There was an error fetching the access logs:', error)
      })
  }, [])

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
  )
}

export default Dashboard
