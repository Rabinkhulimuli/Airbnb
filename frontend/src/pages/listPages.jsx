import axios from 'axios'
import '../css/pagelist.css'
import {useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
export default function ListPages(){
    const[dataList,setDataList]= useState([])
    const {id}=useParams()
    console.log(id)
     useEffect(()=> {
        axios.get("/newPage")
        .then(({data})=> setDataList(data) )
        .catch((err)=> console.log(err));
     },[])
     /* const image= (dat)=> {
        return dat.map((eh)=> {
            console.log(eh)
            return (
                <div key="eh" className="in-place-img-d">
                <img className="in-place-img" src={`http://localhost:5000/uploads/${eh}`}/>
                </div>
        )})
     }
     */
     const page= dataList.find((eh)=> eh._id===id)

    return (
        <>
          
            <h2>Your Places</h2>
            <div>
                <h1>{page?.title} </h1>
            </div>
        </>
    )
}