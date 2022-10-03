import React from 'react'

function Cart(props) {
    let check = 'card-body'
    if(props.status == 1){
        check = 'card-body bg-info text-white'
    }
    if(props.status == 2){
        check = 'card-body bg-warning text-white'
    }
    if(new Date(props.date) < new Date()){
        check = 'card-body bg-danger text-white'
    }
    if(props.status == 3){
        check = 'card-body bg-success text-white'
    }

    const openedits = (index)=>{
        props.setIndex(index)
         document.querySelector('#name').value = props.data[index].name
        document.querySelector('#date').value = props.data[index].date
        let arrst = document.querySelectorAll('#radio')
        for(let i = 0; i< arrst.length;i++){
            if(arrst[i].value==props.data[index].status){
                arrst[i].checked = true
            }
        }
        props.setToggle(true)
    }
    return (
        <div className="card" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={function(){openedits(props.id)}}>
            <div className={check}>
               <p>{props.name}</p>
               <p>{props.date}</p>
            </div>
        </div>
    )
}

export default Cart