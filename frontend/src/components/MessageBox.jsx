import React from 'react'


export default function MessageBox({ message }){
if (!message) return null
const cls = message.type === 'success' ? 'bg-green-500' : 'bg-red-500'
return (
<div className={`fixed inset-x-0 top-4 z-50 flex justify-center p-4 transition`}>
<div className={`${cls} text-white px-6 py-3 rounded-lg shadow`}>{message.txt}</div>
</div>
)
}