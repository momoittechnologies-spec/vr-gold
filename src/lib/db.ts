import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

export interface GoldRates {
  id: string;
  gold24k: number;
  gold22k: number;
  gold18k: number;
  silver: number;
  buyingMarginPercent: number;
  updatedAt: string;
  updatedBy: string;
}

export interface Lead {
  id: string;
  trackingCode: string;
  name: string;
  phone: string;
  serviceType: 'DOORSTEP_RELEASE' | 'BRANCH_VISIT' | 'SELL_GOLD' | 'VALUATION_INQUIRY';
  bankName: string;
  estimatedGrams: number;
  pledgeAmount?: number;
  location?: string;
  preferredDate?: string;
  preferredTime?: string;
  notes?: string;
  status: 'NEW' | 'CONTACTED' | 'BANK_VISIT_SCHEDULED' | 'RELEASE_COMPLETED' | 'CANCELLED';
  assignedStaff?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ValuationItem {
  id: string;
  name: string;
  purityKarat: 24 | 22 | 18;
  grossWeightGrams: number;
  stoneEnamelWeightGrams: number;
  netGoldWeightGrams: number;
  ratePerGram: number;
  itemValuation: number;
}

export interface Transaction {
  id: string;
  voucherCode: string;
  customerName: string;
  customerPhone: string;
  customerAadhaar: string;
  customerAddress: string;
  bankOrLender: string;
  loanAccountNo?: string;
  pledgeSlipNo?: string;
  type: 'PLEDGED_GOLD_RELEASE' | 'DIRECT_SALE';
  items: ValuationItem[];
  totalGrossWeightGrams: number;
  totalNetWeightGrams: number;
  grossGoldValuation: number;
  bankPrincipalCleared: number;
  bankInterestCleared: number;
  bankTotalSettlement: number;
  vrGoldServiceFee: number;
  netPayoutToCustomer: number;
  paymentMethod: 'CASH' | 'IMPS_RTGS' | 'UPI' | 'SPLIT_CASH_AND_UPI';
  paymentReference?: string;
  status: 'IN_PROGRESS' | 'BANK_CLEARED' | 'SETTLEMENT_COMPLETED';
  staffName: string;
  notes?: string;
  createdAt: string;
  completedAt?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'STAFF';
  passwordHash: string;
  salt: string;
  createdAt: string;
}

export interface DatabaseSchema {
  rates: GoldRates;
  leads: Lead[];
  transactions: Transaction[];
  users: User[];
}

const DATA_DIR = path.join(process.cwd(), '.data');
const DB_FILE = path.join(DATA_DIR, 'vr_gold_database.json');

function hashPassword(password: string, salt: string): string {
  return crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
}

function getInitialDatabase(): DatabaseSchema {
  const adminSalt = crypto.randomBytes(16).toString('hex');
  const staffSalt = crypto.randomBytes(16).toString('hex');

  const now = new Date().toISOString();

  return {
    rates: {
      id: 'default-rates',
      gold24k: 7520,
      gold22k: 6890,
      gold18k: 5640,
      silver: 96,
      buyingMarginPercent: 1.5,
      updatedAt: now,
      updatedBy: 'Admin (VR Gold Kadapa)',
    },
    users: [
      {
        id: 'usr-admin-1',
        email: 'admin@vrgold.com',
        name: 'VR Gold Management',
        role: 'ADMIN',
        salt: adminSalt,
        passwordHash: hashPassword('vrgold@2026', adminSalt),
        createdAt: now,
      },
      {
        id: 'usr-staff-1',
        email: 'staff@vrgold.com',
        name: 'Kadapa Branch Operator',
        role: 'STAFF',
        salt: staffSalt,
        passwordHash: hashPassword('kadapa@2026', staffSalt),
        createdAt: now,
      },
    ],
    leads: [
      {
        id: 'lead-101',
        trackingCode: 'VRG-8921',
        name: 'K. Venkata Subba Reddy',
        phone: '9848022334',
        serviceType: 'DOORSTEP_RELEASE',
        bankName: 'SBI Kadapa Main Branch (Near Collectorate)',
        estimatedGrams: 42,
        pledgeAmount: 210000,
        location: 'NGO Colony, Kadapa',
        preferredDate: 'Today',
        preferredTime: '03:00 PM',
        notes: 'Customer wants cash backing at SBI branch to clear 42 grams ornaments and collect remaining cash.',
        status: 'BANK_VISIT_SCHEDULED',
        assignedStaff: 'Ravi Kumar (Field Executive)',
        createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
        updatedAt: new Date(Date.now() - 1800000).toISOString(),
      },
      {
        id: 'lead-102',
        trackingCode: 'VRG-8922',
        name: 'P. Lakshmi Devi',
        phone: '9440511223',
        serviceType: 'DOORSTEP_RELEASE',
        bankName: 'Andhra Pragathi Grameena Bank (APGB)',
        estimatedGrams: 28,
        pledgeAmount: 140000,
        location: 'Yerramukkapalli, Kadapa',
        preferredDate: 'Tomorrow',
        preferredTime: '11:30 AM',
        notes: 'Pledged 2 gold bangles and chain. Wants fast bank settlement.',
        status: 'NEW',
        assignedStaff: 'Unassigned',
        createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
        updatedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
      },
      {
        id: 'lead-103',
        trackingCode: 'VRG-8923',
        name: 'S. Ramanjaneyulu',
        phone: '9177899001',
        serviceType: 'BRANCH_VISIT',
        bankName: 'Direct Old Gold Sale',
        estimatedGrams: 16,
        location: 'Beside Sivalayam, NGO Colony',
        notes: 'Selling old 22K gold ring & coin for spot cash.',
        status: 'RELEASE_COMPLETED',
        assignedStaff: 'Kadapa Branch Operator',
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        updatedAt: new Date(Date.now() - 3600000 * 8).toISOString(),
      },
    ],
    transactions: [
      {
        id: 'txn-2026-1048',
        voucherCode: 'VRG-1048',
        customerName: 'B. Srinivasulu',
        customerPhone: '9849123456',
        customerAadhaar: 'XXXX-XXXX-7124',
        customerAddress: 'D.No 7/340, Chinna Chowk, Kadapa',
        bankOrLender: 'Canara Bank - RIMS Branch, Kadapa',
        loanAccountNo: 'CAN-GL-2026-0914',
        pledgeSlipNo: 'PS-449102',
        type: 'PLEDGED_GOLD_RELEASE',
        items: [
          {
            id: 'item-1',
            name: 'Gold Traditional Haram',
            purityKarat: 22,
            grossWeightGrams: 32.5,
            stoneEnamelWeightGrams: 1.5,
            netGoldWeightGrams: 31.0,
            ratePerGram: 6880,
            itemValuation: 213280,
          },
          {
            id: 'item-2',
            name: 'Gold Bangles (Pair)',
            purityKarat: 22,
            grossWeightGrams: 24.2,
            stoneEnamelWeightGrams: 0.2,
            netGoldWeightGrams: 24.0,
            ratePerGram: 6880,
            itemValuation: 165120,
          },
        ],
        totalGrossWeightGrams: 56.7,
        totalNetWeightGrams: 55.0,
        grossGoldValuation: 378400,
        bankPrincipalCleared: 250000,
        bankInterestCleared: 8400,
        bankTotalSettlement: 258400,
        vrGoldServiceFee: 5000,
        netPayoutToCustomer: 115000,
        paymentMethod: 'IMPS_RTGS',
        paymentReference: 'UTR-SBIN202610019948',
        status: 'SETTLEMENT_COMPLETED',
        staffName: 'VR Gold Management',
        notes: 'Doorstep visit conducted at Canara Bank RIMS branch. Full loan closed and net cash transferred via IMPS.',
        createdAt: new Date(Date.now() - 3600000 * 20).toISOString(),
        completedAt: new Date(Date.now() - 3600000 * 18).toISOString(),
      },
    ],
  };
}

function ensureDb(): DatabaseSchema {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(DB_FILE)) {
    const initial = getInitialDatabase();
    fs.writeFileSync(DB_FILE, JSON.stringify(initial, null, 2), 'utf-8');
    return initial;
  }

  try {
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (error) {
    console.error('Error reading database file, recreating initial database:', error);
    const initial = getInitialDatabase();
    fs.writeFileSync(DB_FILE, JSON.stringify(initial, null, 2), 'utf-8');
    return initial;
  }
}

function saveDb(data: DatabaseSchema): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  const tmpFile = `${DB_FILE}.tmp.${Date.now()}`;
  fs.writeFileSync(tmpFile, JSON.stringify(data, null, 2), 'utf-8');
  fs.renameSync(tmpFile, DB_FILE);
}

// ============================================
// Public API Methods
// ============================================

export const db = {
  // Rates
  getRates(): GoldRates {
    const data = ensureDb();
    return data.rates;
  },

  updateRates(ratesUpdate: Partial<Omit<GoldRates, 'id' | 'updatedAt'>>, updatedBy: string): GoldRates {
    const data = ensureDb();
    data.rates = {
      ...data.rates,
      ...ratesUpdate,
      updatedAt: new Date().toISOString(),
      updatedBy: updatedBy || data.rates.updatedBy,
    };
    saveDb(data);
    return data.rates;
  },

  // Leads
  getLeads(): Lead[] {
    const data = ensureDb();
    return data.leads.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  getLeadByIdOrCode(query: string): Lead | undefined {
    const data = ensureDb();
    const clean = query.trim().toUpperCase();
    return data.leads.find(
      (l) => l.id.toUpperCase() === clean || l.trackingCode.toUpperCase() === clean || l.phone === query.trim()
    );
  },

  createLead(leadData: Omit<Lead, 'id' | 'trackingCode' | 'createdAt' | 'updatedAt' | 'status'>): Lead {
    const data = ensureDb();
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const trackingCode = `VRG-${randomSuffix}`;
    const newLead: Lead = {
      ...leadData,
      id: `lead-${Date.now()}`,
      trackingCode,
      status: 'NEW',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    data.leads.unshift(newLead);
    saveDb(data);
    return newLead;
  },

  updateLead(id: string, updates: Partial<Lead>): Lead | null {
    const data = ensureDb();
    const index = data.leads.findIndex((l) => l.id === id);
    if (index === -1) return null;

    data.leads[index] = {
      ...data.leads[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    saveDb(data);
    return data.leads[index];
  },

  // Transactions
  getTransactions(): Transaction[] {
    const data = ensureDb();
    return data.transactions.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  getTransactionByVoucherOrId(query: string): Transaction | undefined {
    const data = ensureDb();
    const clean = query.trim().toUpperCase();
    return data.transactions.find(
      (t) => t.id.toUpperCase() === clean || t.voucherCode.toUpperCase() === clean || t.customerPhone === query.trim()
    );
  },

  createTransaction(txnData: Omit<Transaction, 'id' | 'voucherCode' | 'createdAt'>): Transaction {
    const data = ensureDb();
    const randomVoucherNum = Math.floor(1000 + Math.random() * 9000);
    const voucherCode = `VRG-${randomVoucherNum}`;
    const newTxn: Transaction = {
      ...txnData,
      id: `txn-${Date.now()}`,
      voucherCode,
      createdAt: new Date().toISOString(),
    };
    data.transactions.unshift(newTxn);
    saveDb(data);
    return newTxn;
  },

  // Users & Auth
  findUserByEmail(email: string): User | undefined {
    const data = ensureDb();
    return data.users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());
  },

  verifyUserCredentials(email: string, passwordAttempt: string): User | null {
    const user = this.findUserByEmail(email);
    if (!user) return null;
    const computedHash = hashPassword(passwordAttempt, user.salt);
    if (computedHash === user.passwordHash) {
      return user;
    }
    return null;
  },
};
