'use client'

import { useState } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { Dayjs } from "dayjs";

export default function DateReserve({onDateChange}:{onDateChange:Function}) {

  const [reserveDate, setReserveDate] = useState<Dayjs | null>(null);

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