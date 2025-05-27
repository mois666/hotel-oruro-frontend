
import { Guest, Room, RoomStatus, RoomType } from "../types";
import { format } from "date-fns";

// Mock rooms data
export const rooms: Room[] = [
  { id: 1, number: 101, type: RoomType.SIMPLE, floor: 1, status: RoomStatus.AVAILABLE, price: 100, capacity: 1 },
  { id: 2, number: 102, type: RoomType.SIMPLE, floor: 1, status: RoomStatus.OCCUPIED, price: 100, capacity: 1 },
  { id: 3, number: 103, type: RoomType.DOUBLE, floor: 1, status: RoomStatus.AVAILABLE, price: 180, capacity: 2 },
  { id: 4, number: 104, type: RoomType.SUITE, floor: 1, status: RoomStatus.CLEANING, price: 250, capacity: 2 },
  { id: 5, number: 201, type: RoomType.SIMPLE, floor: 2, status: RoomStatus.AVAILABLE, price: 120, capacity: 1 },
  { id: 6, number: 202, type: RoomType.SIMPLE, floor: 2, status: RoomStatus.MAINTENANCE, price: 120, capacity: 1 },
  { id: 7, number: 203, type: RoomType.DOUBLE, floor: 2, status: RoomStatus.OCCUPIED, price: 200, capacity: 2 },
  { id: 8, number: 204, type: RoomType.SUITE, floor: 2, status: RoomStatus.OCCUPIED, price: 280, capacity: 2 },
  { id: 9, number: 301, type: RoomType.DOUBLE, floor: 3, status: RoomStatus.AVAILABLE, price: 220, capacity: 2 },
  { id: 10, number: 302, type: RoomType.SUITE, floor: 3, status: RoomStatus.AVAILABLE, price: 300, capacity: 2 },
];

// Mock guests data
export const guests: Guest[] = [
  {
    id: '1',
    documentId: '12345678',
    firstName: 'Gordy',
    lastName: 'Col',
    phone: '555-1234',
    roomType: RoomType.DOUBLE,
    roomNumber: 203,
    floor: 2,
    checkIn: format(new Date(), 'yyyy-MM-dd'),
    checkOut: format(new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd'),
    discount: 10,
    total: 540
  },
  {
    id: '2',
    documentId: '87654321',
    firstName: 'Dulce',
    lastName: 'Maria',
    phone: '555-5678',
    roomType: RoomType.DOUBLE,
    roomNumber: 203,
    floor: 2,
    checkIn: format(new Date(), 'yyyy-MM-dd'),
    checkOut: format(new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd'),
    discount: 10,
    total: 540
  },
  {
    id: '3',
    documentId: '56781234',
    firstName: 'Marleny',
    lastName: 'Rodriguez',
    phone: '555-9012',
    roomType: RoomType.SIMPLE,
    roomNumber: 102,
    floor: 1,
    checkIn: format(new Date(), 'yyyy-MM-dd'),
    checkOut: format(new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd'),
    discount: 0,
    total: 200
  },
  {
    id: '4',
    documentId: '43218765',
    firstName: 'Aby',
    lastName: 'Pereira',
    phone: '555-3456',
    roomType: RoomType.SUITE,
    roomNumber: 204,
    floor: 2,
    checkIn: format(new Date(), 'yyyy-MM-dd'),
    checkOut: format(new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd'),
    discount: 15,
    total: 1190
  },
];

// Financial metrics
export const financialMetrics = {
  todayRevenue: 1250,
  weekRevenue: 8750,
  monthRevenue: 32500,
  totalRevenue: 125000,
  occupancyRate: 68, // percentage
};
