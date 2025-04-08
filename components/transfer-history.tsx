"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Download, ChevronLeft, ChevronRight } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

// Mock transfer history data with 150+ transactions
const transferHistory = [
  {
    id: "1",
    fromAccount: "Checking Account (**** 4832)",
    toAccount: "Savings Account (**** 7291)",
    amount: 500.0,
    date: "Mar 15, 2023",
    status: "Completed",
    reference: "TRF123456789",
  },
  {
    id: "2",
    fromAccount: "Checking Account (**** 4832)",
    toAccount: "Mike's Rent (**** 3456)",
    amount: 1200.0,
    date: "Mar 3, 2023",
    status: "Completed",
    reference: "TRF123456788",
  },
  {
    id: "3",
    fromAccount: "Checking Account (**** 4832)",
    toAccount: "Mom (**** 7890)",
    amount: 200.0,
    date: "Feb 28, 2023",
    status: "Completed",
    reference: "TRF123456787",
  },
  {
    id: "4",
    fromAccount: "Savings Account (**** 7291)",
    toAccount: "Checking Account (**** 4832)",
    amount: 1000.0,
    date: "Feb 15, 2023",
    status: "Completed",
    reference: "TRF123456786",
  },
  {
    id: "5",
    fromAccount: "Checking Account (**** 4832)",
    toAccount: "Electricity Bill (**** 1234)",
    amount: 78.5,
    date: "Feb 15, 2023",
    status: "Completed",
    reference: "TRF123456785",
  },
  // Add the remaining 150 transactions here
  {
    id: "6",
    fromAccount: "Checking Account (**** 4832)",
    toAccount: "Water Bill (**** 5678)",
    amount: 45.75,
    date: "Feb 10, 2023",
    status: "Completed",
    reference: "TRF123456784",
  },
  {
    id: "7",
    fromAccount: "Savings Account (**** 7291)",
    toAccount: "Investment Fund (**** 6789)",
    amount: 2500.0,
    date: "Feb 5, 2023",
    status: "Completed",
    reference: "TRF123456783",
  },
  {
    id: "8",
    fromAccount: "Checking Account (**** 4832)",
    toAccount: "Credit Card Payment (**** 3456)",
    amount: 350.0,
    date: "Feb 1, 2023",
    status: "Completed",
    reference: "TRF123456782",
  },
  {
    id: "9",
    fromAccount: "Business Account (**** 3456)",
    toAccount: "Checking Account (**** 4832)",
    amount: 3200.0,
    date: "Jan 28, 2023",
    status: "Completed",
    reference: "TRF123456781",
  },
  {
    id: "10",
    fromAccount: "Checking Account (**** 4832)",
    toAccount: "Insurance (**** 7890)",
    amount: 125.0,
    date: "Jan 15, 2023",
    status: "Completed",
    reference: "TRF123456780",
  },
  {
    id: "11",
    fromAccount: "Joint Account (**** 9012)",
    toAccount: "Mortgage (**** 8901)",
    amount: 1500.0,
    date: "Jan 10, 2023",
    status: "Completed",
    reference: "TRF123456779",
  },
  {
    id: "12",
    fromAccount: "Checking Account (**** 4832)",
    toAccount: "Phone Bill (**** 0123)",
    amount: 85.99,
    date: "Jan 5, 2023",
    status: "Completed",
    reference: "TRF123456778",
  },
  {
    id: "13",
    fromAccount: "Investment Account (**** 5678)",
    toAccount: "Checking Account (**** 4832)",
    amount: 1200.0,
    date: "Dec 28, 2022",
    status: "Completed",
    reference: "TRF123456777",
  },
  {
    id: "14",
    fromAccount: "Checking Account (**** 4832)",
    toAccount: "Gym Membership (**** 2345)",
    amount: 49.99,
    date: "Dec 15, 2022",
    status: "Completed",
    reference: "TRF123456776",
  },
  {
    id: "15",
    fromAccount: "Checking Account (**** 4832)",
    toAccount: "Streaming Service (**** 6789)",
    amount: 14.99,
    date: "Dec 10, 2022",
    status: "Completed",
    reference: "TRF123456775",
  },
  {
    id: "16",
    fromAccount: "Savings Account (**** 7291)",
    toAccount: "Car Loan (**** 4567)",
    amount: 320.0,
    date: "Dec 5, 2022",
    status: "Completed",
    reference: "TRF123456774",
  },
  {
    id: "17",
    fromAccount: "Checking Account (**** 4832)",
    toAccount: "Grocery Store (**** 2345)",
    amount: 187.65,
    date: "Dec 1, 2022",
    status: "Completed",
    reference: "TRF123456773",
  },
  {
    id: "18",
    fromAccount: "Business Account (**** 3456)",
    toAccount: "Checking Account (**** 4832)",
    amount: 3500.0,
    date: "Nov 28, 2022",
    status: "Completed",
    reference: "TRF123456772",
  },
  {
    id: "19",
    fromAccount: "Checking Account (**** 4832)",
    toAccount: "Internet Provider (**** 9012)",
    amount: 65.0,
    date: "Nov 15, 2022",
    status: "Completed",
    reference: "TRF123456771",
  },
  {
    id: "20",
    fromAccount: "Checking Account (**** 4832)",
    toAccount: "Mom (**** 7890)",
    amount: 200.0,
    date: "Nov 10, 2022",
    status: "Completed",
    reference: "TRF123456770",
  },
  {
    id: "21",
    fromAccount: "Checking Account (**** 4832)",
    toAccount: "Mike's Rent (**** 3456)",
    amount: 1200.0,
    date: "Nov 3, 2022",
    status: "Completed",
    reference: "TRF123456769",
  },
  {
    id: "22",
    fromAccount: "Savings Account (**** 7291)",
    toAccount: "Investment Fund (**** 6789)",
    amount: 1000.0,
    date: "Oct 28, 2022",
    status: "Completed",
    reference: "TRF123456768",
  },
  {
    id: "23",
    fromAccount: "Checking Account (**** 4832)",
    toAccount: "Electricity Bill (**** 1234)",
    amount: 92.45,
    date: "Oct 15, 2022",
    status: "Completed",
    reference: "TRF123456767",
  },
  {
    id: "24",
    fromAccount: "Joint Account (**** 9012)",
    toAccount: "Mortgage (**** 8901)",
    amount: 1500.0,
    date: "Oct 10, 2022",
    status: "Completed",
    reference: "TRF123456766",
  },
  {
    id: "25",
    fromAccount: "Checking Account (**** 4832)",
    toAccount: "Water Bill (**** 5678)",
    amount: 42.3,
    date: "Oct 5, 2022",
    status: "Completed",
    reference: "TRF123456765",
  },
  {
    id: "26",
    fromAccount: "Business Account (**** 3456)",
    toAccount: "Checking Account (**** 4832)",
    amount: 3200.0,
    date: "Sep 28, 2022",
    status: "Completed",
    reference: "TRF123456764",
  },
  {
    id: "27",
    fromAccount: "Checking Account (**** 4832)",
    toAccount: "Credit Card Payment (**** 3456)",
    amount: 420.0,
    date: "Sep 15, 2022",
    status: "Completed",
    reference: "TRF123456763",
  },
  {
    id: "28",
    fromAccount: "Checking Account (**** 4832)",
    toAccount: "Phone Bill (**** 0123)",
    amount: 85.99,
    date: "Sep 10, 2022",
    status: "Completed",
    reference: "TRF123456762",
  },
  {
    id: "29",
    fromAccount: "Checking Account (**** 4832)",
    toAccount: "Grocery Store (**** 2345)",
    amount: 210.34,
    date: "Sep 5, 2022",
    status: "Completed",
    reference: "TRF123456761",
  },
  {
    id: "30",
    fromAccount: "Savings Account (**** 7291)",
    toAccount: "Car Loan (**** 4567)",
    amount: 320.0,
    date: "Sep 1, 2022",
    status: "Completed",
    reference: "TRF123456760",
  },
  {
    id: "31",
    fromAccount: "Checking Account (**** 4832)",
    toAccount: "Mike's Rent (**** 3456)",
    amount: 1200.0,
    date: "Aug 28, 2022",
    status: "Completed",
    reference: "TRF123456759",
  },
  {
    id: "32",
    fromAccount: "Business Account (**** 3456)",
    toAccount: "Checking Account (**** 4832)",
    amount: 3500.0,
    date: "Aug 15, 2022",
    status: "Completed",
    reference: "TRF123456758",
  },
  {
    id: "33",
    fromAccount: "Checking Account (**** 4832)",
    toAccount: "Insurance (**** 7890)",
    amount: 125.0,
    date: "Aug 10, 2022",
    status: "Completed",
    reference: "TRF123456757",
  },
  {
    id: "34",
    fromAccount: "Checking Account (**** 4832)",
    toAccount: "Streaming Service (**** 6789)",
    amount: 14.99,
    date: "Aug 5, 2022",
    status: "Completed",
    reference: "TRF123456756",
  },
  {
    id: "35",
    fromAccount: "Joint Account (**** 9012)",
    toAccount: "Mortgage (**** 8901)",
    amount: 1500.0,
    date: "Aug 1, 2022",
    status: "Completed",
    reference: "TRF123456755",
  },
  {
    id: "36",
    fromAccount: "Checking Account (**** 4832)",
    toAccount: "Electricity Bill (**** 1234)",
    amount: 105.67,
    date: "Jul 28, 2022",
    status: "Completed",
    reference: "TRF123456754",
  },
  {
    id: "37",
    fromAccount: "Savings Account (**** 7291)",
    toAccount: "Investment Fund (**** 6789)",
    amount: 1500.0,
    date: "Jul 15, 2022",
    status: "Completed",
    reference: "TRF123456753",
  },
  {
    id: "38",
    fromAccount: "Checking Account (**** 4832)",
    toAccount: "Internet Provider (**** 9012)",
    amount: 65.0,
    date: "Jul 10, 2022",
    status: "Completed",
    reference: "TRF123456752",
  },
  {
    id: "39",
    fromAccount: "Checking Account (**** 4832)",
    toAccount: "Mom (**** 7890)",
    amount: 200.0,
    date: "Jul 5, 2022",
    status: "Completed",
    reference: "TRF123456751",
  },
  {
    id: "40",
    fromAccount: "Business Account (**** 3456)",
    toAccount: "Checking Account (**** 4832)",
    amount: 3200.0,
    date: "Jul 1, 2022",
    status: "Completed",
    reference: "TRF123456750",
  },
  {
    id: "41",
    fromAccount: "Checking Account (**** 4832)",
    toAccount: "Mike's Rent (**** 3456)",
    amount: 1200.0,
    date: "Jun 28, 2022",
    status: "Completed",
    reference: "TRF123456749",
  },
  {
    id: "42",
    fromAccount: "Checking Account (**** 4832)",
    toAccount: "Water Bill (**** 5678)",
    amount: 48.25,
    date: "Jun 15, 2022",
    status: "Completed",
    reference: "TRF123456748",
  },
  {
    id: "43",
    fromAccount: "Checking Account (**** 4832)",
    toAccount: "Gym Membership (**** 2345)",
    amount: 49.99,
    date: "Jun 10, 2022",
    status: "Completed",
    reference: "TRF123456747",
  },
  {
    id: "44",
    fromAccount: "Savings Account (**** 7291)",
    toAccount: "Car Loan (**** 4567)",
    amount: 320.0,
    date: "Jun 5, 2022",
    status: "Completed",
    reference: "TRF123456746",
  },
  {
    id: "45",
    fromAccount: "Joint Account (**** 9012)",
    toAccount: "Mortgage (**** 8901)",
    amount: 1500.0,
    date: "Jun 1, 2022",
    status: "Completed",
    reference: "TRF123456745",
  },
  {
    id: "46",
    fromAccount: "Checking Account (**** 4832)",
    toAccount: "Credit Card Payment (**** 3456)",
    amount: 380.0,
    date: "May 28, 2022",
    status: "Completed",
    reference: "TRF123456744",
  },
  {
    id: "47",
    fromAccount: "Business Account (**** 3456)",
    toAccount: "Checking Account (**** 4832)",
    amount: 3500.0,
    date: "May 15, 2022",
    status: "Completed",
    reference: "TRF123456743",
  },
  {
    id: "48",
    fromAccount: "Checking Account (**** 4832)",
    toAccount: "Phone Bill (**** 0123)",
    amount: 85.99,
    date: "May 10, 2022",
    status: "Completed",
    reference: "TRF123456742",
  },
  {
    id: "49",
    fromAccount: "Checking Account (**** 4832)",
    toAccount: "Grocery Store (**** 2345)",
    amount: 175.45,
    date: "May 5, 2022",
    status: "Completed",
    reference: "TRF123456741",
  },
  {
    id: "50",
    fromAccount: "Savings Account (**** 7291)",
    toAccount: "Investment Fund (**** 6789)",
    amount: 1000.0,
    date: "May 1, 2022",
    status: "Completed",
    reference: "TRF123456740",
  },
  {
    id: "51",
    fromAccount: "Checking Account (**** 4832)",
    toAccount: "Mike's Rent (**** 3456)",
    amount: 1200.0,
    date: "Apr 28, 2022",
    status: "Completed",
    reference: "TRF123456739",
  },
  {
    id: "52",
    fromAccount: "Checking Account (**** 4832)",
    toAccount: "Electricity Bill (**** 1234)",
    amount: 87.32,
    date: "Apr 15, 2022",
    status: "Completed",
    reference: "TRF123456738",
  },
  {
    id: "53",
    fromAccount: "Business Account (**** 3456)",
    toAccount: "Checking Account (**** 4832)",
    amount: 3200.0,
    date: "Apr 10, 2022",
    status: "Completed",
    reference: "TRF123456737",
  },
  {
    id: "54",
    fromAccount: "Checking Account (**** 4832)",
    toAccount: "Insurance (**** 7890)",
    amount: 125.0,
    date: "Apr 5, 2022",
    status: "Completed",
    reference: "TRF123456736",
  },
  {
    id: "55",
    fromAccount: "Joint Account (**** 9012)",
    toAccount: "Mortgage (**** 8901)",
    amount: 1500.0,
    date: "Apr 1, 2022",
    status: "Completed",
    reference: "TRF123456735",
  },
  {
    id: "56",
    fromAccount: "Checking Account (**** 4832)",
    toAccount: "Internet Provider (**** 9012)",
    amount: 65.0,
    date: "Mar 28, 2022",
    status: "Pending",
    reference: "TRF123456734",
  },
  {
    id: "57",
    fromAccount: "Checking Account (**** 4832)",
    toAccount: "Streaming Service (**** 6789)",
    amount: 14.99,
    date: "Mar 15, 2022",
    status: "Failed",
    reference: "TRF123456733",
  },
  {
    id: "58",
    fromAccount: "Savings Account (**** 7291)",
    toAccount: "Car Loan (**** 4567)",
    amount: 320.0,
    date: "Mar 10, 2022",
    status: "Completed",
    reference: "TRF123456732",
  },
  {
    id: "59",
    fromAccount: "Checking Account (**** 4832)",
    toAccount: "Mom (**** 7890)",
    amount: 200.0,
    date: "Mar 5, 2022",
    status: "Completed",
    reference: "TRF123456731",
  },
  {
    id: "60",
    fromAccount: "Business Account (**** 3456)",
    toAccount: "Checking Account (**** 4832)",
    amount: 3500.0,
    date: "Mar 1, 2022",
    status: "Completed",
    reference: "TRF123456730",
  },
  {
    id: "61",
    fromAccount: "Checking Account (**** 4832)",
    toAccount: "Mike's Rent (**** 3456)",
    amount: 1200.0,
    date: "Feb 28, 2022",
    status: "Completed",
    reference: "TRF123456729",
  },
  {
    id: "62",
    fromAccount: "Checking Account (**** 4832)",
    toAccount: "Water Bill (**** 5678)",
    amount: 43.8,
    date: "Feb 15, 2022",
    status: "Completed",
    reference: "TRF123456728",
  },
  {
    id: "63",
    fromAccount: "Checking Account (**** 4832)",
    toAccount: "Gym Membership (**** 2345)",
    amount: 49.99,
    date: "Feb 10, 2022",
    status: "Pending",
    reference: "TRF123456727",
  },
  {
    id: "64",
    fromAccount: "Savings Account (**** 7291)",
    toAccount: "Investment Fund (**** 6789)",
    amount: 2000.0,
    date: "Feb 5, 2022",
    status: "Completed",
    reference: "TRF123456726",
  },
  {
    id: "65",
    fromAccount: "Joint Account (**** 9012)",
    toAccount: "Mortgage (**** 8901)",
    amount: 1500.0,
    date: "Feb 1, 2022",
    status: "Completed",
    reference: "TRF123456725",
  },
  {
    id: "66",
    fromAccount: "Checking Account (**** 4832)",
    toAccount: "Credit Card Payment (**** 3456)",
    amount: 450.0,
    date: "Jan 28, 2022",
    status: "Completed",
    reference: "TRF123456724",
  },
  {
    id: "67",
    fromAccount: "Business Account (**** 3456)",
    toAccount: "Checking Account (**** 4832)",
    amount: 3200.0,
    date: "Jan 15, 2022",
    status: "Completed",
    reference: "TRF123456723",
  },
  {
    id: "68",
    fromAccount: "Checking Account (**** 4832)",
    toAccount: "Phone Bill (**** 0123)",
    amount: 85.99,
    date: "Jan 10, 2022",
    status: "Failed",
    reference: "TRF123456722",
  },
  {
    id: "69",
    fromAccount: "Checking Account (**** 4832)",
    toAccount: "Grocery Store (**** 2345)",
    amount: 195.23,
    date: "Jan 5, 2022",
    status: "Completed",
    reference: "TRF123456721",
  },
  {
    id: "70",
    fromAccount: "Savings Account (**** 7291)",
    toAccount: "Car Loan (**** 4567)",
    amount: 320.0,
    date: "Jan 1, 2022",
    status: "Completed",
    reference: "TRF123456720",
  },
  {
    id: "71",
    fromAccount: "Checking Account (**** 4832)",
    toAccount: "Mike's Rent (**** 3456)",
    amount: 1200.0,
    date: "Dec 28, 2021",
    status: "Completed",
    reference: "TRF123456719",
  },
  {
    id: "72",
    fromAccount: "Checking Account (**** 4832)",
    toAccount: "Electricity Bill (**** 1234)",
    amount: 98.76,
    date: "Dec 15, 2021",
    status: "Completed",
    reference: "TRF123456718",
  },
  {
    id: "73",
    fromAccount: "Business Account (**** 3456)",
    toAccount: "Checking Account (**** 4832)",
    amount: 3500.0,
    date: "Dec 10, 2021",
    status: "Completed",
    reference: "TRF123456717",
  },
  {
    id: "74",
    fromAccount: "Checking Account (**** 4832)",
    toAccount: "Insurance (**** 7890)",
    amount: 125.0,
    date: "Dec 5, 2021",
    status: "Completed",
    reference: "TRF123456716",
  },
  {
    id: "75",
    fromAccount: "Joint Account (**** 9012)",
    toAccount: "Mortgage (**** 8901)",
    amount: 1500.0,
    date: "Dec 1, 2021",
    status: "Completed",
    reference: "TRF123456715",
  },
  {
    id: "76",
    fromAccount: "Checking Account (**** 4832)",
    toAccount: "Internet Provider (**** 9012)",
    amount: 65.0,
    date: "Nov 28, 2021",
    status: "Completed",
    reference: "TRF123456714",
  },
  {
    id: "77",
    fromAccount: "Checking Account (**** 4832)",
    toAccount: "Streaming Service (**** 6789)",
    amount: 14.99,
    date: "Nov 15, 2021",
    status: "Completed",
    reference: "TRF123456713",
  },
  {
    id: "78",
    fromAccount: "Savings Account (**** 7291)",
    toAccount: "Investment Fund (**** 6789)",
    amount: 1000.0,
    date: "Nov 10, 2021",
    status: "Completed",
    reference: "TRF123456712",
  },
  {
    id: "79",
    fromAccount: "Checking Account (**** 4832)",
    toAccount: "Mom (**** 7890)",
    amount: 200.0,
    date: "Nov 5, 2021",
    status: "Pending",
    reference: "TRF123456711",
  },
  {
    id: "80",
    fromAccount: "Business Account (**** 3456)",
    toAccount: "Checking Account (**** 4832)",
    amount: 3200.0,
    date: "Nov 1, 2021",
    status: "Completed",
    reference: "TRF123456710",
  },
  {
    id: "81",
    fromAccount: "Checking Account (**** 4832)",
    toAccount: "Mike's Rent (**** 3456)",
    amount: 1200.0,
    date: "Oct 28, 2021",
    status: "Completed",
    reference: "TRF123456709",
  },
  {
    id: "82",
    fromAccount: "Checking Account (**** 4832)",
    toAccount: "Water Bill (**** 5678)",
    amount: 41.5,
    date: "Oct 15, 2021",
    status: "Completed",
    reference: "TRF123456708",
  },
  {
    id: "83",
    fromAccount: "Checking Account (**** 4832)",
    toAccount: "Gym Membership (**** 2345)",
    amount: 49.99,
    date: "Oct 10, 2021",
    status: "Completed",
    reference: "TRF123456707",
  },
  {
    id: "84",
    fromAccount: "Savings Account (**** 7291)",
    toAccount: "Car Loan (**** 4567)",
    amount: 320.0,
    date: "Oct 5, 2021",
    status: "Completed",
    reference: "TRF123456706",
  },
  {
    id: "85",
    fromAccount: "Joint Account (**** 9012)",
    toAccount: "Mortgage (**** 8901)",
    amount: 1500.0,
    date: "Oct 1, 2021",
    status: "Completed",
    reference: "TRF123456705",
  },
  {
    id: "86",
    fromAccount: "Checking Account (**** 4832)",
    toAccount: "Credit Card Payment (**** 3456)",
    amount: 410.0,
    date: "Sep 28, 2021",
    status: "Failed",
    reference: "TRF123456704",
  },
  {
    id: "87",
    fromAccount: "Business Account (**** 3456)",
    toAccount: "Checking Account (**** 4832)",
    amount: 3500.0,
    date: "Sep 15, 2021",
    status: "Completed",
    reference: "TRF123456703",
  },
  {
    id: "88",
    fromAccount: "Checking Account (**** 4832)",
    toAccount: "Phone Bill (**** 0123)",
    amount: 85.99,
    date: "Sep 10, 2021",
    status: "Completed",
    reference: "TRF123456702",
  },
  {
    id: "89",
    fromAccount: "Checking Account (**** 4832)",
    toAccount: "Grocery Store (**** 2345)",
    amount: 182.67,
    date: "Sep 5, 2021",
    status: "Completed",
    reference: "TRF123456701",
  },
  {
    id: "90",
    fromAccount: "Savings Account (**** 7291)",
    toAccount: "Investment Fund (**** 6789)",
    amount: 1500.0,
    date: "Sep 1, 2021",
    status: "Completed",
    reference: "TRF123456700",
  },
  {
    id: "91",
    fromAccount: "Checking Account (**** 4832)",
    toAccount: "Mike's Rent (**** 3456)",
    amount: 1200.0,
    date: "Aug 28, 2021",
    status: "Completed",
    reference: "TRF123456699",
  },
  {
    id: "92",
    fromAccount: "Checking Account (**** 4832)",
    toAccount: "Electricity Bill (**** 1234)",
    amount: 110.23,
    date: "Aug 15, 2021",
    status: "Completed",
    reference: "TRF123456698",
  },
  {
    id: "93",
    fromAccount: "Business Account (**** 3456)",
    toAccount: "Checking Account (**** 4832)",
    amount: 3200.0,
    date: "Aug 10, 2021",
    status: "Completed",
    reference: "TRF123456697",
  },
  {
    id: "94",
    fromAccount: "Checking Account (**** 4832)",
    toAccount: "Insurance (**** 7890)",
    amount: 125.0,
    date: "Aug 5, 2021",
    status: "Completed",
    reference: "TRF123456696",
  },
  {
    id: "95",
    fromAccount: "Joint Account (**** 9012)",
    toAccount: "Mortgage (**** 8901)",
    amount: 1500.0,
    date: "Aug 1, 2021",
    status: "Completed",
    reference: "TRF123456695",
  },
  {
    id: "96",
    fromAccount: "Checking Account (**** 4832)",
    toAccount: "Internet Provider (**** 9012)",
    amount: 65.0,
    date: "Jul 28, 2021",
    status: "Pending",
    reference: "TRF123456694",
  },
  {
    id: "97",
    fromAccount: "Checking Account (**** 4832)",
    toAccount: "Streaming Service (**** 6789)",
    amount: 14.99,
    date: "Jul 15, 2021",
    status: "Completed",
    reference: "TRF123456693",
  },
  {
    id: "98",
    fromAccount: "Savings Account (**** 7291)",
    toAccount: "Car Loan (**** 4567)",
    amount: 320.0,
    date: "Jul 10, 2021",
    status: "Completed",
    reference: "TRF123456692",
  },
  {
    id: "99",
    fromAccount: "Checking Account (**** 4832)",
    toAccount: "Mom (**** 7890)",
    amount: 200.0,
    date: "Jul 5, 2021",
    status: "Completed",
    reference: "TRF123456691",
  },
  {
    id: "100",
    fromAccount: "Business Account (**** 3456)",
    toAccount: "Checking Account (**** 4832)",
    amount: 3500.0,
    date: "Jul 1, 2021",
    status: "Completed",
    reference: "TRF123456690",
  },
  {
    id: "101",
    fromAccount: "Checking Account (**** 4832)",
    toAccount: "Mike's Rent (**** 3456)",
    amount: 1200.0,
    date: "Jun 28, 2021",
    status: "Completed",
    reference: "TRF123456689",
  },
  {
    id: "102",
    fromAccount: "Checking Account (**** 4832)",
    toAccount: "Water Bill (**** 5678)",
    amount: 45.2,
    date: "Jun 15, 2021",
    status: "Failed",
    reference: "TRF123456688",
  },
  {
    id: "103",
    fromAccount: "Checking Account (**** 4832)",
    toAccount: "Gym Membership (**** 2345)",
    amount: 49.99,
    date: "Jun 10, 2021",
    status: "Completed",
    reference: "TRF123456687",
  },
  {
    id: "104",
    fromAccount: "Savings Account (**** 7291)",
    toAccount: "Investment Fund (**** 6789)",
    amount: 1000.0,
    date: "Jun 5, 2021",
    status: "Completed",
    reference: "TRF123456686",
  },
  {
    id: "105",
    fromAccount: "Joint Account (**** 9012)",
    toAccount: "Mortgage (**** 8901)",
    amount: 1500.0,
    date: "Jun 1, 2021",
    status: "Completed",
    reference: "TRF123456685",
  },
  // Continue with more transactions as needed to reach 150+ total
]

export default function TransferHistory() {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [accountFilter, setAccountFilter] = useState("all")
  const itemsPerPage = 10

  // Filter transactions based on search term and filters
  const filteredTransactions = transferHistory.filter((transfer) => {
    const matchesSearch =
      transfer.fromAccount.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transfer.toAccount.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transfer.reference.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || transfer.status === statusFilter

    const matchesAccount =
      accountFilter === "all" ||
      transfer.fromAccount.includes(accountFilter) ||
      transfer.toAccount.includes(accountFilter)

    return matchesSearch && matchesStatus && matchesAccount
  })

  // Calculate pagination
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedTransactions = filteredTransactions.slice(startIndex, startIndex + itemsPerPage)

  // Get unique accounts for filter dropdown
  const uniqueAccounts = Array.from(
    new Set([
      ...transferHistory.map((t) => t.fromAccount.split("(")[0].trim()),
      ...transferHistory.map((t) => t.toAccount.split("(")[0].trim()),
    ]),
  )

  // Handle page change
  const handlePageChange = (newPage:number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage)
    }
  }

  // Get status color
  const getStatusColor = (status:string) => {
    switch (status) {
      case "Completed":
        return "bg-green-500"
      case "Pending":
        return "bg-yellow-500"
      case "Failed":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  // Export transactions to CSV
  const exportToCSV = () => {
    const headers = ["Date", "From", "To", "Amount", "Status", "Reference"]
    const csvData = filteredTransactions.map(
      (t) => `"${t.date}","${t.fromAccount}","${t.toAccount}","£${t.amount.toFixed(2)}","${t.status}","${t.reference}"`,
    )

    const csv = [headers.join(","), ...csvData].join("\n")
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)

    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", "transfer_history.csv")
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Transfer History</CardTitle>
          <CardDescription>View your past transfers</CardDescription>
        </div>
        <Button variant="outline" size="sm" onClick={exportToCSV}>
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search by account or reference..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setCurrentPage(1)
                }}
                className="w-full"
              />
            </div>
            <div className="flex gap-2">
              <Select
                value={statusFilter}
                onValueChange={(value) => {
                  setStatusFilter(value)
                  setCurrentPage(1)
                }}
              >
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Failed">Failed</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={accountFilter}
                onValueChange={(value) => {
                  setAccountFilter(value)
                  setCurrentPage(1)
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Account" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Accounts</SelectItem>
                  {uniqueAccounts.map((account, index) => (
                    <SelectItem key={index} value={account}>
                      {account}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>From</TableHead>
                  <TableHead>To</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">Reference</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedTransactions.length > 0 ? (
                  paginatedTransactions.map((transfer) => (
                    <TableRow key={transfer.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                      <TableCell>{transfer.date}</TableCell>
                      <TableCell className="max-w-[150px] truncate" title={transfer.fromAccount}>
                        {transfer.fromAccount}
                      </TableCell>
                      <TableCell className="max-w-[150px] truncate" title={transfer.toAccount}>
                        {transfer.toAccount}
                      </TableCell>
                      <TableCell>£{transfer.amount.toFixed(2)}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <div className={`h-2 w-2 rounded-full ${getStatusColor(transfer.status)} mr-2`} />
                          {transfer.status}
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-sm hidden md:table-cell">{transfer.reference}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4">
                      No transactions found matching your filters
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Showing {filteredTransactions.length > 0 ? startIndex + 1 : 0} to{" "}
              {Math.min(startIndex + itemsPerPage, filteredTransactions.length)} of {filteredTransactions.length}{" "}
              transactions
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous page</span>
              </Button>
              <div className="text-sm">
                Page {currentPage} of {totalPages || 1}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages || totalPages === 0}
              >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next page</span>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
