import getHospitals from "@/libs/getHospitals";
import HospitalCatalog from "@/components/HospitalCatalog";
import { Suspense } from "react"
import { LinearProgress } from "@mui/material"
import CardPanel from "@/components/CardPanel";

export default function Hospital() {
    const hospitals = getHospitals() 

    return(
        <main className="text-center p-5">
            <h1 className="text-xl font-medium">Vaccine Service Center</h1>
            <Suspense fallback={<p>Loading ... <LinearProgress/></p>}>
                <HospitalCatalog hospitalsJson={hospitals}/>
            </Suspense>
        </main>
    )
}