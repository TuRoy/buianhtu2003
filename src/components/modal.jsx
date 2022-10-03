import React from 'react'

function modal(props) {

    
    let listdata = props.data
    const adddata = () =>{
        let name = document.querySelector('#name').value
        let date = document.querySelector('#date').value
        let arrst = document.querySelectorAll('#radio')
        let check 
        for(let i = 0; i< arrst.length; i++){
            if(arrst[i].checked){
                check =arrst[i].value
            }
        }
        if(!check || !name || !date){ return alert('dien thong tin')}
        let newdata = [...listdata, {name: name, date:date, status: check}]
        props.setData(newdata)
    }

    const savedata = (index)=>{
        let name = document.querySelector('#name').value
        let date = document.querySelector('#date').value
        let arrst = document.querySelectorAll('#radio')
        let check 
        for(let i = 0; i< arrst.length; i++){
            if(arrst[i].checked){
                check =arrst[i].value
            }
        }
        if(!check || !name || !date){ return alert('dien thong tin')}
        let newdata = [...listdata]
        newdata[index] = {name: name, date:date, status: check}
        props.setData(newdata)
    }
    const deletedata = (i)=>{
        let newdata = listdata.filter((value,index) =>{return index !== i})
        props.setData(newdata)
    }
    return (
        <div>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <input type="text" id='name'/> <br />
                            <input type="date" id='date'/>
                            <div className="select">
                               <input type="radio" id="radio" name='radio'  value={1}/> Todo <br />
                                <input type="radio" id="radio" name='radio'  value={2}/> Doing <br />
                                <input type="radio" id="radio" name='radio'  value={3}/> Done
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            {props.toggle?
                           <div>
                             <button onClick={function(){savedata(props.index)}} type="button" data-bs-dismiss="modal" className="btn btn-primary">save</button>
                            <button onClick={function (){deletedata(props.index)}} type="button" data-bs-dismiss="modal" className="btn btn-primary">delete</button>
                           </div>
                            :<button onClick={adddata} type="button" data-bs-dismiss="modal" className="btn btn-primary">Add</button>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default modal