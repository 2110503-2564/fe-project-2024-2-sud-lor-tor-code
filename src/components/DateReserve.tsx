'use client'

import { useState } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { Dayjs } from "dayjs";
import dayjs from 'dayjs'; // ต้อง import dayjs เพื่อใช้แปลง

interface DateReserveProps {
  onDateChange: Function;
  initialDate?: Date; // รับค่า initialDate เป็น Date
}

export default function DateReserve({ onDateChange, initialDate }: DateReserveProps) {
  // ใช้ dayjs เพื่อแปลง initialDate จาก Date เป็น Dayjs
  const [reserveDate, setReserveDate] = useState<Dayjs | null>(
    initialDate ? dayjs(initialDate) : null // ถ้ามี initialDate แปลงเป็น Dayjs
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Event Date"
        value={reserveDate}
        slotProps={{ textField: { variant: 'standard' } }}
        onChange={(value) => {
          setReserveDate(value);
          onDateChange(value);
        }}
      />
    </LocalizationProvider>
  )
}
