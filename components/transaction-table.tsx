"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ArrowDownLeft, ArrowUpRight, MoreHorizontal, Search } from "lucide-react"

// Mock transaction data
export const allTransactions:any[] = [
  // 2023 transactions
  {
    id: "1",
    name: "Private Equity Investment - Tech Startup",
    date: "Apr 7, 2023",
    amount: -50000,
    type: "expense",
    category: "Investment",
    account: "investment",
  },
  {
    id: "2",
    name: "Dividend Income - Luxury Brand Holdings",
    date: "Apr 6, 2023",
    amount: 250000,
    type: "income",
    category: "Dividend",
    account: "investment",
  },
  {
    id: "3",
    name: "Yacht Maintenance - Superyacht 'Elegance'",
    date: "Apr 5, 2023",
    amount: -120000,
    type: "expense",
    category: "Lifestyle",
    account: "checking",
  },
  {
    id: "4",
    name: "Fine Art Auction - Impressionist Masterpiece",
    date: "Apr 4, 2023",
    amount: -350000,
    type: "expense",
    category: "Investment",
    account: "investment",
  },
  {
    id: "5",
    name: "Real Estate Development Project",
    date: "Mar 15, 2023",
    amount: -2500000,
    type: "expense",
    category: "Property",
    account: "investment",
  },

  // 2022 transactions
  {
    id: "6",
    name: "Property Sale - Beverly Hills Estate",
    date: "Dec 15, 2022",
    amount: 4500000,
    type: "income",
    category: "Property",
    account: "investment",
  },
  {
    id: "7",
    name: "Venture Capital Exit - AI Startup",
    date: "Nov 20, 2022",
    amount: 1200000,
    type: "income",
    category: "Investment",
    account: "investment",
  },
  {
    id: "8",
    name: "Charitable Foundation Launch",
    date: "Oct 10, 2022",
    amount: -1000000,
    type: "expense",
    category: "Charity",
    account: "savings",
  },
  {
    id: "9",
    name: "Business Revenue - Luxury Property Development",
    date: "Sep 15, 2022",
    amount: 850000,
    type: "income",
    category: "Business",
    account: "checking",
  },
  {
    id: "10",
    name: "Private Island Purchase",
    date: "Aug 1, 2022",
    amount: -150000,
    type: "expense",
    category: "Property",
    account: "investment",
  },

  // 2021 transactions
  {
    id: "11",
    name: "Property Purchase - Monaco Penthouse",
    date: "Dec 25, 2021",
    amount: -8500000,
    type: "expense",
    category: "Property",
    account: "investment",
  },
  {
    id: "12",
    name: "Stock Portfolio Growth",
    date: "Nov 18, 2021",
    amount: 3500000,
    type: "income",
    category: "Investment",
    account: "investment",
  },
  {
    id: "13",
    name: "Private Equity Investment - Biotech",
    date: "Oct 12, 2021",
    amount: -2000000,
    type: "expense",
    category: "Investment",
    account: "investment",
  },
  {
    id: "14",
    name: "Luxury Hotel Chain Acquisition",
    date: "Sep 5, 2021",
    amount: -250000,
    type: "expense",
    category: "Business",
    account: "investment",
  },
  {
    id: "15",
    name: "Cryptocurrency Investment",
    date: "Aug 20, 2021",
    amount: -50000,
    type: "expense",
    category: "Investment",
    account: "investment",
  },

  // 2020 transactions
  {
    id: "16",
    name: "Property Sale - London Mayfair",
    date: "Jul 15, 2020",
    amount: 12000000,
    type: "income",
    category: "Property",
    account: "investment",
  },
  {
    id: "17",
    name: "Tech Startup Exit",
    date: "Jun 10, 2020",
    amount: 300000,
    type: "income",
    category: "Business",
    account: "investment",
  },
  {
    id: "18",
    name: "Private Jet Upgrade",
    date: "May 5, 2020",
    amount: -450000,
    type: "expense",
    category: "Lifestyle",
    account: "investment",
  },
  {
    id: "19",
    name: "Art Collection Expansion",
    date: "Apr 25, 2020",
    amount: -150000,
    type: "expense",
    category: "Investment",
    account: "investment",
  },
  {
    id: "20",
    name: "Global Real Estate Fund Investment",
    date: "Mar 20, 2020",
    amount: -1000000,
    type: "expense",
    category: "Investment",
    account: "investment",
  },

  // 2019 transactions
  {
    id: "21",
    name: "Luxury Resort Development",
    date: "Feb 15, 2019",
    amount: -350000,
    type: "expense",
    category: "Business",
    account: "investment",
  },
  {
    id: "22",
    name: "Venture Capital Portfolio Exit",
    date: "Jan 10, 2019",
    amount: 250000,
    type: "income",
    category: "Investment",
    account: "investment",
  },
  {
    id: "23",
    name: "Private Banking Investment",
    date: "Dec 25, 2019",
    amount: -50000,
    type: "expense",
    category: "Investment",
    account: "investment",
  },
  {
    id: "24",
    name: "Yacht Fleet Expansion",
    date: "Nov 20, 2019",
    amount: -300000,
    type: "expense",
    category: "Lifestyle",
    account: "investment",
  },
  {
    id: "25",
    name: "Commercial Property Portfolio",
    date: "Oct 15, 2019",
    amount: -2000000,
    type: "expense",
    category: "Property",
    account: "investment",
  },

  // 2018 transactions
  {
    id: "26",
    name: "Luxury Brand Acquisition",
    date: "Sep 10, 2018",
    amount: -4000000,
    type: "expense",
    category: "Business",
    account: "investment",
  },
  {
    id: "27",
    name: "Technology Fund Investment",
    date: "Aug 5, 2018",
    amount: -150000,
    type: "expense",
    category: "Investment",
    account: "investment",
  },
  {
    id: "28",
    name: "Private Island Development",
    date: "Jul 1, 2018",
    amount: -250000,
    type: "expense",
    category: "Property",
    account: "investment",
  },
  {
    id: "29",
    name: "Global Hedge Fund Returns",
    date: "Jun 15, 2018",
    amount: 350000,
    type: "income",
    category: "Investment",
    account: "investment",
  },
  {
    id: "30",
    name: "Charitable Foundation Expansion",
    date: "May 10, 2018",
    amount: -1000000,
    type: "expense",
    category: "Charity",
    account: "savings",
  },

  // 2017 transactions
  {
    id: "31",
    name: "Luxury Hotel Chain Sale",
    date: "Apr 5, 2017",
    amount: 50000,
    type: "income",
    category: "Business",
    account: "investment",
  },
  {
    id: "32",
    name: "Space Technology Investment",
    date: "Mar 1, 2017",
    amount: -2000000,
    type: "expense",
    category: "Investment",
    account: "investment",
  },
  {
    id: "33",
    name: "Mediterranean Villa Complex",
    date: "Feb 14, 2017",
    amount: -300000,
    type: "expense",
    category: "Property",
    account: "investment",
  },
  {
    id: "34",
    name: "Renewable Energy Fund",
    date: "Jan 20, 2017",
    amount: -150000,
    type: "expense",
    category: "Investment",
    account: "investment",
  },
  {
    id: "35",
    name: "Private Aviation Company Sale",
    date: "Jan 5, 2017",
    amount: 450000,
    type: "income",
    category: "Business",
    account: "investment",
  },

  // 2016 transactions
  {
    id: "36",
    name: "Global Real Estate Portfolio",
    date: "Dec 20, 2016",
    amount: -4000000,
    type: "expense",
    category: "Property",
    account: "investment",
  },
  {
    id: "37",
    name: "Tech Startup Accelerator",
    date: "Nov 15, 2016",
    amount: -1000000,
    type: "expense",
    category: "Business",
    account: "investment",
  },
  {
    id: "38",
    name: "Luxury Yacht Manufacturing",
    date: "Oct 10, 2016",
    amount: -250000,
    type: "expense",
    category: "Business",
    account: "investment",
  },
  {
    id: "39",
    name: "Investment Banking Returns",
    date: "Sep 5, 2016",
    amount: 300000,
    type: "income",
    category: "Investment",
    account: "investment",
  },
  {
    id: "40",
    name: "Private Museum Foundation",
    date: "Aug 1, 2016",
    amount: -2000000,
    type: "expense",
    category: "Charity",
    account: "savings",
  },

  // 2015 transactions
  {
    id: "41",
    name: "Luxury Fashion Brand Sale",
    date: "Jul 15, 2015",
    amount: 350000,
    type: "income",
    category: "Business",
    account: "investment",
  },
  {
    id: "42",
    name: "Space Tourism Investment",
    date: "Jun 10, 2015",
    amount: -150000,
    type: "expense",
    category: "Investment",
    account: "investment",
  },
  {
    id: "43",
    name: "Private Island Resort",
    date: "May 5, 2015",
    amount: -300000,
    type: "expense",
    category: "Property",
    account: "investment",
  },
  {
    id: "44",
    name: "Biotechnology Fund",
    date: "Apr 1, 2015",
    amount: -2000000,
    type: "expense",
    category: "Investment",
    account: "investment",
  },
  {
    id: "45",
    name: "Global Logistics Company Sale",
    date: "Mar 15, 2015",
    amount: 4000000,
    type: "income",
    category: "Business",
    account: "investment",
  },

  // 2014 transactions
  {
    id: "46",
    name: "Urban Development Project",
    date: "Feb 10, 2014",
    amount: -250000,
    type: "expense",
    category: "Property",
    account: "investment",
  },
  {
    id: "47",
    name: "Artificial Intelligence Startup",
    date: "Jan 5, 2014",
    amount: -1000000,
    type: "expense",
    category: "Investment",
    account: "investment",
  },
  {
    id: "48",
    name: "Luxury Car Collection",
    date: "Dec 20, 2014",
    amount: -150000,
    type: "expense",
    category: "Lifestyle",
    account: "investment",
  },
  {
    id: "49",
    name: "Private Equity Fund Returns",
    date: "Nov 15, 2014",
    amount: 300000,
    type: "income",
    category: "Investment",
    account: "investment",
  },
  {
    id: "50",
    name: "Educational Foundation",
    date: "Oct 10, 2014",
    amount: -2000000,
    type: "expense",
    category: "Charity",
    account: "savings",
  },

  // 2013 transactions
  {
    id: "51",
    name: "Luxury Hotel Chain Expansion",
    date: "Sep 5, 2013",
    amount: -350000,
    type: "expense",
    category: "Business",
    account: "investment",
  },
  {
    id: "52",
    name: "Renewable Energy Company Sale",
    date: "Aug 1, 2013",
    amount: 450000,
    type: "income",
    category: "Business",
    account: "investment",
  },
  {
    id: "53",
    name: "Private Golf Resort",
    date: "Jul 15, 2013",
    amount: -2000000,
    type: "expense",
    category: "Property",
    account: "investment",
  },
  {
    id: "54",
    name: "Quantum Computing Investment",
    date: "Jun 10, 2013",
    amount: -150000,
    type: "expense",
    category: "Investment",
    account: "investment",
  },
  {
    id: "55",
    name: "Global Art Fund",
    date: "May 5, 2013",
    amount: -1000000,
    type: "expense",
    category: "Investment",
    account: "investment",
  },

  // 2012 transactions
  {
    id: "56",
    name: "Commercial Real Estate Portfolio",
    date: "Apr 1, 2012",
    amount: -300000,
    type: "expense",
    category: "Property",
    account: "investment",
  },
  {
    id: "57",
    name: "Technology Venture Fund",
    date: "Mar 15, 2012",
    amount: -2000000,
    type: "expense",
    category: "Investment",
    account: "investment",
  },
  {
    id: "58",
    name: "Private Aviation Fleet",
    date: "Feb 10, 2012",
    amount: -250000,
    type: "expense",
    category: "Lifestyle",
    account: "investment",
  },
  {
    id: "59",
    name: "Global Investment Returns",
    date: "Jan 5, 2012",
    amount: 350000,
    type: "income",
    category: "Investment",
    account: "investment",
  },
  {
    id: "60",
    name: "Medical Research Foundation",
    date: "Dec 20, 2012",
    amount: -150000,
    type: "expense",
    category: "Charity",
    account: "savings",
  },

  // 2011 transactions
  {
    id: "61",
    name: "Luxury Resort Chain Sale",
    date: "Nov 15, 2011",
    amount: 4000000,
    type: "income",
    category: "Business",
    account: "investment",
  },
  {
    id: "62",
    name: "Space Technology Fund",
    date: "Oct 10, 2011",
    amount: -2000000,
    type: "expense",
    category: "Investment",
    account: "investment",
  },
  {
    id: "63",
    name: "Caribbean Island Development",
    date: "Sep 5, 2011",
    amount: -300000,
    type: "expense",
    category: "Property",
    account: "investment",
  },
  {
    id: "64",
    name: "Clean Energy Investment",
    date: "Aug 1, 2011",
    amount: -150000,
    type: "expense",
    category: "Investment",
    account: "investment",
  },
  {
    id: "65",
    name: "Global Shipping Company Sale",
    date: "Jul 15, 2011",
    amount: 350000,
    type: "income",
    category: "Business",
    account: "investment",
  },

  // 2010 transactions
  {
    id: "66",
    name: "Urban Property Development",
    date: "Jun 10, 2010",
    amount: -250000,
    type: "expense",
    category: "Property",
    account: "investment",
  },
  {
    id: "67",
    name: "Biotech Research Fund",
    date: "May 5, 2010",
    amount: -2000000,
    type: "expense",
    category: "Investment",
    account: "investment",
  },
  {
    id: "68",
    name: "Luxury Yacht Collection",
    date: "Apr 1, 2010",
    amount: -300000,
    type: "expense",
    category: "Lifestyle",
    account: "investment",
  },
  {
    id: "69",
    name: "Private Equity Returns",
    date: "Mar 15, 2010",
    amount: 4000000,
    type: "income",
    category: "Investment",
    account: "investment",
  },
  {
    id: "70",
    name: "Arts Foundation",
    date: "Feb 10, 2010",
    amount: -150000,
    type: "expense",
    category: "Charity",
    account: "savings",
  },

  // 2009 transactions
  {
    id: "71",
    name: "Global Hotel Chain Acquisition",
    date: "Jan 5, 2009",
    amount: -350000,
    type: "expense",
    category: "Business",
    account: "investment",
  },
  {
    id: "72",
    name: "Technology Company Sale",
    date: "Dec 20, 2009",
    amount: 450000,
    type: "income",
    category: "Business",
    account: "investment",
  },
  {
    id: "73",
    name: "Mountain Resort Development",
    date: "Nov 15, 2009",
    amount: -2000000,
    type: "expense",
    category: "Property",
    account: "investment",
  },
  {
    id: "74",
    name: "Artificial Intelligence Fund",
    date: "Oct 10, 2009",
    amount: -150000,
    type: "expense",
    category: "Investment",
    account: "investment",
  },
  {
    id: "75",
    name: "Fine Wine Collection",
    date: "Sep 5, 2009",
    amount: -1000000,
    type: "expense",
    category: "Investment",
    account: "investment",
  },

  // 2008 transactions
  {
    id: "76",
    name: "Global Real Estate Investment",
    date: "Aug 1, 2008",
    amount: -300000,
    type: "expense",
    category: "Property",
    account: "investment",
  },
  {
    id: "77",
    name: "Venture Capital Fund",
    date: "Jul 15, 2008",
    amount: -2000000,
    type: "expense",
    category: "Investment",
    account: "investment",
  },
  {
    id: "78",
    name: "Private Aircraft Fleet",
    date: "Jun 10, 2008",
    amount: -250000,
    type: "expense",
    category: "Lifestyle",
    account: "investment",
  },
  {
    id: "79",
    name: "Hedge Fund Returns",
    date: "May 5, 2008",
    amount: 350000,
    type: "income",
    category: "Investment",
    account: "investment",
  },
  {
    id: "80",
    name: "Environmental Foundation",
    date: "Apr 1, 2008",
    amount: -150000,
    type: "expense",
    category: "Charity",
    account: "savings",
  },

  // 2007 transactions
  {
    id: "81",
    name: "Luxury Brand Portfolio Sale",
    date: "Mar 15, 2007",
    amount: 4000000,
    type: "income",
    category: "Business",
    account: "investment",
  },
  {
    id: "82",
    name: "Space Exploration Fund",
    date: "Feb 10, 2007",
    amount: -2000000,
    type: "expense",
    category: "Investment",
    account: "investment",
  },
  {
    id: "83",
    name: "Mediterranean Resort Complex",
    date: "Jan 5, 2007",
    amount: -300000,
    type: "expense",
    category: "Property",
    account: "investment",
  },
  {
    id: "84",
    name: "Green Energy Investment",
    date: "Dec 20, 2007",
    amount: -150000,
    type: "expense",
    category: "Investment",
    account: "investment",
  },
  {
    id: "85",
    name: "Global Retail Chain Sale",
    date: "Nov 15, 2007",
    amount: 350000,
    type: "income",
    category: "Business",
    account: "investment",
  },

  // 2006 transactions
  {
    id: "86",
    name: "City Development Project",
    date: "Oct 10, 2006",
    amount: -250000,
    type: "expense",
    category: "Property",
    account: "investment",
  },
  {
    id: "87",
    name: "Medical Technology Fund",
    date: "Sep 5, 2006",
    amount: -2000000,
    type: "expense",
    category: "Investment",
    account: "investment",
  },
  {
    id: "88",
    name: "Classic Car Collection",
    date: "Aug 1, 2006",
    amount: -300000,
    type: "expense",
    category: "Lifestyle",
    account: "investment",
  },
  {
    id: "89",
    name: "Investment Banking Profits",
    date: "Jul 15, 2006",
    amount: 4000000,
    type: "income",
    category: "Investment",
    account: "investment",
  },
  {
    id: "90",
    name: "Youth Education Foundation",
    date: "Jun 10, 2006",
    amount: -150000,
    type: "expense",
    category: "Charity",
    account: "savings",
  },

  // 2005 transactions
  {
    id: "91",
    name: "International Hotel Group Sale",
    date: "May 5, 2005",
    amount: 450000,
    type: "income",
    category: "Business",
    account: "investment",
  },
  {
    id: "92",
    name: "Quantum Technology Investment",
    date: "Apr 1, 2005",
    amount: -2000000,
    type: "expense",
    category: "Investment",
    account: "investment",
  },
  {
    id: "93",
    name: "Private Island Resort Development",
    date: "Mar 15, 2005",
    amount: -350000,
    type: "expense",
    category: "Property",
    account: "investment",
  },
  {
    id: "94",
    name: "Sustainable Energy Fund",
    date: "Feb 10, 2005",
    amount: -150000,
    type: "expense",
    category: "Investment",
    account: "investment",
  },
  {
    id: "95",
    name: "Global Media Company Sale",
    date: "Jan 5, 2005",
    amount: 38000000,
    type: "income",
    category: "Business",
    account: "investment",
  },

  // 2004 transactions
  {
    id: "96",
    name: "Urban Real Estate Portfolio",
    date: "Dec 20, 2004",
    amount: -28000000,
    type: "expense",
    category: "Property",
    account: "investment",
  },
  {
    id: "97",
    name: "Digital Technology Fund",
    date: "Nov 15, 2004",
    amount: -18000000,
    type: "expense",
    category: "Investment",
    account: "investment",
  },
  {
    id: "98",
    name: "Private Helicopter Fleet",
    date: "Oct 10, 2004",
    amount: -22000000,
    type: "expense",
    category: "Lifestyle",
    account: "investment",
  },
  {
    id: "99",
    name: "Global Investment Returns",
    date: "Sep 5, 2004",
    amount: 32000000,
    type: "income",
    category: "Investment",
    account: "investment",
  },
  {
    id: "100",
    name: "Cultural Heritage Foundation",
    date: "Aug 1, 2004",
    amount: -12000000,
    type: "expense",
    category: "Charity",
    account: "savings",
  }
];

interface TransactionTableProps {
  accountType?: string
}

export default function TransactionTable({ accountType }: TransactionTableProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredTransactions = allTransactions
    .filter((transaction) => (accountType ? transaction.account === accountType : true))
    .filter(
      (transaction) =>
        transaction.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transaction.category.toLowerCase().includes(searchQuery.toLowerCase()),
    )

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="relative w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search transactions..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Transaction</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div
                        className={`rounded-full p-2 £{
                          transaction.type === "income"
                            ? "bg-green-100 text-green-700"
                            : transaction.type === "transfer"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-red-100 text-red-700"
                        }`}
                      >
                        {transaction.type === "income" ? (
                          <ArrowDownLeft className="h-4 w-4" />
                        ) : (
                          <ArrowUpRight className="h-4 w-4" />
                        )}
                      </div>
                      <span className="font-medium">{transaction.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{transaction.category}</TableCell>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell
                    className={`text-right font-medium £{transaction.amount > 0 ? "text-green-600" : "text-gray-900"}`}
                  >
                    {transaction.amount > 0 ? "+" : ""}£{Math.abs(transaction.amount).toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View details</DropdownMenuItem>
                        <DropdownMenuItem>Add note</DropdownMenuItem>
                        <DropdownMenuItem>Dispute transaction</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                  No transactions found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
