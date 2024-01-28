import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function parseDate(input:any) {
  // Function to parse Excel serial date
  function excelSerialDateToDate(serial:any) {
    const excelBaseDate = new Date(1899, 11, 31);
    return new Date(excelBaseDate.getTime() + serial * 86400000);
  }

  // Function to format date to month/day/year
  function formatDate(date:any) {
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  }

  let resultDate;

  // Check if input is a number (Excel serial date)
  if (typeof input === 'number') {
    resultDate = excelSerialDateToDate(input);
  } 
  // Check if input is a string and matches ISO 8601 format
  else if (typeof input === 'string' && input.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/)) {
    resultDate = new Date(input);
  } 
  else {
    throw new Error('Invalid input format');
  }

  return formatDate(resultDate);
}
