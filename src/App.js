
import './App.css';
import {useState, useEffect} from 'react'
import Axios from 'axios'

function App() {

  const [name, setName] = useState('')
  const [age, setAge] = useState(0)
  const [listOfFriends, setListOfFriends] = useState([])
  const addFriend = ()=>{
  
    Axios.post('http://localhost:3001/addFriend',{
      name:name,
      age: age})
      .then((response)=> {
        setListOfFriends([...listOfFriends, {_id:response.data._id, name: name, age: age}])
       
        document.getElementById('text').value=""
        document.getElementById('number').value=""

      })
      
  }

  useEffect(()=>{
    Axios.get('http://localhost:3001/read')
      .then((res)=>{
        setListOfFriends(res.data)
      })
      .catch((err)=>console.log(err.message))
  }
  ,[])


  const handleUpdate = (id)=>{
    const newAge = prompt("Enter new age: ")
    Axios.put('http://localhost:3001/update',{
      newAge:newAge,
      id:id
    }).then(()=>{
     setListOfFriends(listOfFriends.map((item)=>{
        return  item._id ===id ? {_id:id, name:item.name, age: newAge} : item
      }))
    }).catch((err)=>console.log(err.message))
  }

  const handleDelete = (id)=>{
    
    Axios.delete(`http://localhost:3001/delete/${id}`).then(()=>{
      setListOfFriends(listOfFriends.filter((item)=>{
        return item._id != id
      }))
    })
    .catch(()=>console.log("not working"))
  }

  return (
    <div className="App">
     <div className="container">
        <input type="text" id='text' placeholder="Friend name.."
        onChange={(e)=>{
          setName(e.target.value)
        }}  
        />
        <input type="number" id='number' placeholder="Friend age.." 
         onChange={(e)=>{
          setAge(e.target.value)
        }}
        />
        <input type="button" value="Add Friend" 
        onClick={addFriend}
        />
     </div>
     
     {listOfFriends.map((item)=>(
      <div key={item._id} className='listContainer' >
      <div className='list' >
        <h2>Name :  {item.name}</h2>
        <h2>Age:  {item.age}</h2>


      </div>
      <button onClick={()=>{handleUpdate(item._id)}}>Update</button>
      <button onClick={()=>{handleDelete(item._id)}}>Delete</button>

      </div>

     ))}
    </div>
    
  );
}

export default App;
