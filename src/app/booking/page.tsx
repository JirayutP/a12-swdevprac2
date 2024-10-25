'use client'
import DateReserve from "@/components/DateReserve"
import { addBooking } from "@/redux/features/bookSlice"
import { AppDispatch } from "@/redux/store"
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import dayjs, { Dayjs } from "dayjs"
import { useState } from "react"
import { useDispatch } from "react-redux"

export default function Booking() {
    const dispatch = useDispatch<AppDispatch>()
    const [bookName, setBookName] = useState<string|null>(null)
    const [bookLastname, setBookLastname] = useState<string|null>(null)
    const [bookID, setBookID] = useState<string|null>(null)
    const [bookHospital, setBookHospital] = useState<string|null>(null)
    const [bookDate, setBookDate] = useState<Dayjs|null>(null)

    const makeBooking = () => {
        if(bookName && bookLastname && bookID && bookHospital && bookDate){
            const item:BookingItem = {
                name: bookName,
                surname: bookLastname,
                id: bookID,
                hospital: bookHospital,
                bookDate: dayjs(bookDate).format('YYYY/MM/DD')
            }
            dispatch(addBooking(item))
        }
    }

    return(
        <main className="w-[100%] flex flex-col items-center space-y-4">
            <div className="mt-10 text-xl font-medium">Vaccine Booking</div>
            <TextField id="Name" name="Name" label="Name" variant="standard" onChange={(e) => setBookName(e.target.value)}/>
            <TextField id="Lastname" name="Lastname" label="Lastname" variant="standard" onChange={(e) => setBookLastname(e.target.value)}/>
            <TextField id="Citizen ID" name="Citizen ID" label="Citizen ID" variant="standard" onChange={(e) => setBookID(e.target.value)}/>
            
            <FormControl>
                <InputLabel id="hospital">Hospital</InputLabel>
                <Select labelId="hospital" variant="standard" name="hospital" id="hospital" className="h-[2em] w-[200px]" value={bookHospital} onChange={(e) => setBookHospital(e.target.value)}>
                    <MenuItem value="Chula">Chulalongkorn Hospital</MenuItem>
                    <MenuItem value="Rajavithi">Rajavithi Hospital</MenuItem>
                    <MenuItem value="Thammasat">Thammasat University Hospital</MenuItem>
                </Select>
            </FormControl>

            <DateReserve setDateChange={(value: Dayjs) => setBookDate(value)}/>

            <Button variant="contained" name="Book Vaccine" onClick={makeBooking}>
                Book Vaccine
            </Button>
        </main>
    )
}