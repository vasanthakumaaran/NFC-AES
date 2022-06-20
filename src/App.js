import React,{ useState } from 'react';
const Cryptr = require('cryptr');


const App = () => {
  const [formData,setFormData] = useState('')
  const [password,setPassword] = useState('')

  const Encrypt = async() => {
    if(formData.length <= 0 || password.length <= 0){
      alert('Please fill all the fields')
    }
    else {
    //encrypt the formData 
    const cryptr = new Cryptr(password);
    const encrypted = await cryptr.encrypt(formData);
    await localStorage.setItem('encrypted',encrypted);
    await console.log(encrypted);
    await setFormData('');
    await setPassword('');
  }
  }

  const Decrypt = async() => {
  if(password.length <= 0  || localStorage.getItem('encrypted') === null){
    alert('Please fill all the fields')
  } else {
   if(localStorage.getItem('encrypted') !== null){
    const cryptr = new Cryptr(password);
    try{
    const decrypted = await cryptr.decrypt(localStorage.getItem('encrypted'));
    await console.log(decrypted);
    await setFormData(decrypted);
    } catch(err){
      alert('Wrong Password')
    }
   } else {
    await console.log("No data to decrypt");
    await setFormData("No data to decrypt");
   }
  }
  }


  const ButtonForm = () => (
    <>
      <div style={{display:"flex",flexDirection:"row",gap:"10px"}}>
        <button onClick={() => Decrypt() } style={{background:"#000000",padding:"1rem 1rem",color:"white"}}>
          Read
        </button>
        <button onClick={() => Encrypt()} style={{background:"#000000",padding:"1rem 1rem",color:"white"}}>
          Write
        </button>
      </div>
    </>
  )
  return(
    <>
      
      <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",top:'50%'}}>
      <label>Enter Text</label>
        <input type="textarea" value={formData} onChange={(e) => setFormData(e.target.value)} />
        <label>Enter Password</label>
        <input type="textarea" value={password} onChange={(e) => setPassword(e.target.value)} />
        <ButtonForm/>
      </div>
    </>
  )
}




export default App;