export const transactions = [
  {
    id: '0',
    title: 'Bought BTC with cKES',
    credited: false,
    amount: '100.00',
    token: "cKES",
    date: '20 Mar 2020, 11:59',
  },
  {
    id: '1',
    title: 'Money added via M-Pesa',
    type: 'deposit',
    credited: true,
    token: "cKES",
    amount: '130.0',
    date: '20 Mar 2020, 11:59',
  },
  {
    id: '2',
    title: 'Money added to wallet',
    type: 'deposit',
    credited: true,
    amount: '150.0',
    token: 'cUSD',
    date: '20 Mar 2020, 11:59',
  },
];

export const spaces = [
  { id: "0x1", 
    type: "rosca", 
    name: "Masomo", 
    balance: "50", 
    token: "cUSD"
  }, 
  {
    id: "0x2", 
    type: "rosca", 
    name: "TMK Wanaume", 
    balance: "500", 
    token: "cUSD"
  }, 
  {
    id: "0x3", 
    type: "personal", 
    name: "Vacation", 
    balance: "500", 
    token: "cUSD"
  }
]

export const rates = {"cKES" : 1, "cUSD" : 125.75, "CELO": (125.75*0.485)}