import React from 'react'
import { useParams } from 'react-router-dom'


export default function DeleteForm() {
    let{id} = useParams();
    console.log(id)
    return (
        <div>
              Delete Student
        </div>
    )
}
