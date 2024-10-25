'use client'
import Link from "next/link";
import Card from "./Card";
import { useReducer, useState } from "react";

export default function CardPanel(){

    const ratingReducer = (ratingList:Map<string, number>, action:{type:string, hospitalName:string, rating:number})=>{
        switch(action.type){
            case 'update':{
                if (action.rating == null){
                    action.rating = 0
                }
                return new Map(ratingList.set(action.hospitalName, action.rating))
            }
            case 'remove':{
                ratingList.delete(action.hospitalName)
                return new Map(ratingList)
            }
            default: return ratingList
        }
    }
    
    const  [ratingList, dispatchRating] = useReducer(ratingReducer, new Map<string, number>([['Chulalongkorn Hospital',0],['Rajavithi Hospital',0],['Thammasat University Hospital',0]]))
    
    /**
     * Mooc Data for Demontration Only   
     */
    const mockHospitalRepo=[
        {hid:'001', hospitalName:'Chulalongkorn Hospital', image:'/img/chula.jpg'},
        {hid:'002', hospitalName:'Rajavithi Hospital', image:'/img/rajavithi.jpg'},
        {hid:'003', hospitalName:'Thammasat University Hospital', image:'/img/thammasat.jpg'},
    ]
    
    return(
        <div>
            <div style={{margin:'20px', display:'flex', flexDirection:'row', alignContent:'space-around', justifyContent:'space-around', flexWrap:'wrap'}}>
                {
                    mockHospitalRepo.map((hospitalItem)=>(
                        <Link href={`/hospital/${hospitalItem.hid}`} className="w-1/5">
                            <Card hospitalName={hospitalItem.hospitalName} imgSrc={hospitalItem.image}
                            updateRating={(hospital:string,rate:number)=>dispatchRating({type:'update', hospitalName:hospital, rating:rate})}
                            />
                        </Link>
                        
                    ))
                }
            </div>
            <div className="w-full text-xl font-medium px-10">Hospital List with Ratings : {ratingList.size}</div>
            {Array.from(ratingList).map((hospitalWithRate)=><div 
                className="px-10" 
                key={hospitalWithRate[0]} 
                data-testid={hospitalWithRate[0]}
                onClick={()=>{
                    dispatchRating({type:'remove', hospitalName:hospitalWithRate[0], rating:hospitalWithRate[1]})
                }}
                >{hospitalWithRate[0]} : {hospitalWithRate[1]}</div>)}
        </div>
        
    )
}