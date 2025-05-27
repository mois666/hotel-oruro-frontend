
export interface Guest {
  id: string;
  documentId: string;
  firstName: string;
  lastName: string;
  phone: string;
  roomType: RoomType;
  roomNumber: number;
  floor: number;
  checkIn: string;
  checkOut: string;
  discount?: number;
  total: number;
}

export interface Room {
  id: number;
  number: number;
  type: RoomType;
  floor: number;
  status: RoomStatus;
  price: number;
  capacity: number;
}

export enum RoomType {
  SIMPLE = 'Simple',
  DOUBLE = 'Doble',
  SUITE = 'Suite'
}

export enum RoomStatus {
  AVAILABLE = 'available',
  OCCUPIED = 'occupied',
  CLEANING = 'cleaning',
  MAINTENANCE = 'maintenance'
}

export enum UserRole {
  ADMIN = 'admin',
  RECEPTIONIST = 'receptionist'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  dateCreated: string;
}
