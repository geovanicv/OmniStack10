import React, {useState, useEffect} from 'react'

function DevForm({onSubmit}) {
  
  //estado
  
  const [github_username, setgithub_username] = useState('');
  const [techs, settechs] = useState('');


  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const {latitude, longitude} = position.coords;
        
        setLatitude(latitude);
        setLongitude(longitude);
      },
      (err) => {
        console.log(err);
      },
      {
        timeout: 30000,
      }
    )
  }, [])

  async function handleSubmit(e) {
    e.preventDefault();
    
   await onSubmit({
      github_username,
      techs,
      latitude,
      longitude
    });

    setgithub_username('')
    settechs('')
  }

  return (
    <form onSubmit={handleSubmit}>
          <div className="input-block">
            <label htmlFor="github_username">Usuário do GitHub</label>
            <input 
              name="github_username" 
              id="username_github" 
              required
              value={github_username}
              onChange={e => setgithub_username(e.target.value)}
            />
          </div>

          <div className="input-block">
            <label htmlFor="techs">Tecnologias</label>
            <input 
              name="techs" 
              id="techs" 
              required
              value={techs}
              onChange={e => settechs(e.target.value)}
              />
          </div>

          <div className="input-group">
            <div className="input-block">
              <label htmlFor="latitude">Latitude</label>
              <input 
                type="number" 
                name="latitude" 
                id="latitude" 
                required 
                value={latitude}
                onChange={e => setLatitude(e.target.value)}
                />
            </div>

            <div className="input-block">
              <label htmlFor="longitude">Longitude</label>
              <input 
                type="number" 
                name="longitude" 
                id="longitude" 
                required 
                value={longitude}
                onChange={e => setLongitude(e.target.value)}
                />
            </div>
          </div>

          <button type="submit">Salvar</button>
        </form>
  )
}

export default DevForm;