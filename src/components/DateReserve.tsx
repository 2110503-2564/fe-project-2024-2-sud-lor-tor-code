'use client'

import { useState } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { Dayjs } from "dayjs";
import dayjs from 'dayjs';

export default function DateReserve({ onDateChange, initialDate }: {onDateChange: Function, initialDate?: Date}) {
  const [reserveDate, setReserveDate] = useState<Dayjs | null>(
    initialDate ? dayjs(initialDate) : null
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
