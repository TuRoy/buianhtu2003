
import './App.css'
import React from 'react'
import Modal from './components/modal'
import Cart from './components/cart'

import { useState, useEffect } from 'react'

function App() {
  const [toggle, setToggle] = useState(false)
  const [data, setData] = useState([])
  const [index, setIndex] = useState()
  const [count, setCount] = useState([0, 0])
  const [filter, setFilter] = useState([])
  const [inputsc, setInputsc] = useState('')
  const [searchdata, setSearchdata] = useState([])
  const [toggle1, setToggle1] = useState(false)




// Phân data theo cột trong bảng
  data.map((value, index) => { value.id = index })
  let listtodo = data.filter(value => value.status == 1)
  let listdoing = data.filter(value => value.status == 2)
  let listdone = data.filter(value => value.status == 3)


  const openmodal = () => {
    document.querySelector('#name').value = ''
    document.querySelector('#date').value = ''
    let arrst = document.querySelectorAll('#radio')
    for (let i = 0; i < arrst.length; i++) {
      arrst[i].checked = false
    }
    setToggle(false)
  }



  // sử lý tính tổng
  useEffect(() => {
    setCount([listtodo.length + listdoing.length, listdone.length])
  }, [data])



  // sử lý filter
  const handleclick = (e) => {
    let index = e.target.id
    let datafilter = [...data]
    if (index == 4) {
      datafilter.sort(function (a, b) {
        return new Date(a.date) - new Date(b.date)
      })
      setFilter([])
      setData(datafilter)
    } else if(index==5){
      setFilter([])
    } else{
      datafilter = datafilter.filter(value => value.status == index)
      if(datafilter.length == 0){
        alert('trong !!!')
      }
       setFilter(datafilter)
    }
  }



  // sử lý search
  const handlechange = (e) => {
    setInputsc(e.target.value)
    setToggle1(true)
  }

  useEffect(() => {
     setTimeout(() => {
      let A = data.filter(value => value.name.includes(inputsc))
      if(inputsc.length > 0){
        setSearchdata(A)
      }else{setSearchdata([])}
    }, 800);
  }, [inputsc])


  return (
    <div className='app'>
      <button type="button" onClick={openmodal} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <Modal setInputsc={setInputsc} index={index} toggle={toggle} setData={setData} data={data}></Modal>



      {/* tổng số đã thực hiện và chưa thực hiện  */}
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">...</span>
      </div> {count[0]} <br />
      <div className="spinner-border text-danger" role="status">
        <span className="visually-hidden">...</span>
      </div> {count[1]} <br />



      {/* search */}
      <div className='searchs'>
        <input type="text" className='search' placeholder='Search...' onChange={handlechange} />
       {toggle1?  <div className='blsearch'>
        {searchdata.map((value, index1) => {
              return (<div key={index1}><Cart  setIndex={setIndex} setToggle={setToggle} id={value.id} data={data} status={value.status} setData={setData} name={value.name} date={value.date}></Cart></div>)
            })}
       </div>: ''}
      </div>



      {/* listdrop filter */}
      <div className='block'>
        <div className="btn-group">
          <button type="button" className="btn btn-outline-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            Filter
          </button>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" onClick={handleclick} id={5} >All</a></li>
            <li><a className="dropdown-item" onClick={handleclick} id={1} >Todo</a></li>
            <li><a className="dropdown-item" onClick={handleclick} id={2} >Doing</a></li>
            <li><a className="dropdown-item" onClick={handleclick} id={3} >Done</a></li>
            <li><a className="dropdown-item" onClick={handleclick} id={4} >Date</a></li>
          </ul>
        </div >



        {/* bảng danh sách công viêc */}
        {filter.length !== 0 ?
          <div className='todos'><p className='title'>{filter[0].status == 1 ? 'Todo' : filter[0].status == 2 ? 'Doing' : 'Done'}</p>
            {filter.map((value, index1) => {
              return (<div key={index1}><Cart  setIndex={setIndex} setToggle={setToggle} id={value.id} data={data} status={value.status} setData={setData} name={value.name} date={value.date}></Cart></div>)
            })}
          </div>
          : <div className="list">
            <div className="todos"><p className="title">Todo <span>{listtodo.length}</span></p>
              {listtodo.map((value, index1) => {
                return (<div key={index1}><Cart  setIndex={setIndex} setToggle={setToggle} id={value.id} data={data} status={value.status} setData={setData} name={value.name} date={value.date}></Cart></div>)
              })}
            </div>
            <div className="todos"><p className="title">Doing <span>{listdoing.length}</span></p>
              {listdoing.map((value, index1) => {
                return (<div key={index1}><Cart count={count} setIndex={setIndex} setToggle={setToggle} id={value.id} data={data} status={value.status} setData={setData} name={value.name} date={value.date}></Cart></div>)
              })}
            </div>
            <div className="todos"><p className="title">Done <span>{listdone.length}</span></p>
              {listdone.map((value, index1) => {
                return (<div key={index1}><Cart count={count} setIndex={setIndex} setToggle={setToggle} id={value.id} data={data} status={value.status} setData={setData} name={value.name} date={value.date}></Cart></div>)
              })}
            </div>
          </div>}

      </div>
    </div>
  )
}

export default App