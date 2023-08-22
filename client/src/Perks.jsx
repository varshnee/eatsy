import React from 'react'

function Perks({selected,onChange}) {

  function cbclick(ev){
    const {checked,name}=ev.target;
    if (checked) {
      onChange([...selected,name]);
    } else {
      onChange([...selected.filter(selectedName => selectedName !== name)]);
    }
  }

  return (
    <div>
      <div className='gap-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5'>
                  <label className='border p-4 flex rounded-2xl gap-2 items-center'>
                    <input type="checkbox" name='restobar' onChange={cbclick}/>
                    <span>Restobar</span>
                  </label >  
                  <label className='border p-4 flex rounded-2xl gap-2 items-center'>
                    <input type="checkbox" name='music'onChange={cbclick}/>
                    <span>Live music</span>
                  </label>
                  <label className='border p-4 flex rounded-2xl gap-2 items-center'>
                    <input type="checkbox" name='veg'onChange={cbclick}/>
                    <span>Vegetarian</span>
                  </label>
                  <label className='border p-4 flex rounded-2xl gap-2 items-center'>
                    <input type="checkbox" name='gourmet' onChange={cbclick}/>
                    <span>Gourmet</span>
                  </label>
                  <label className='border p-4 flex rounded-2xl gap-2 items-center'>
                    <input type="checkbox" name='outdoor' onChange={cbclick}/>
                    <span>Outdoor seating</span>
                  </label>
                  <label className='border p-4 flex rounded-2xl gap-2 items-center'>
                    <input type="checkbox" name='private' onChange={cbclick}/>
                    <span>Private Dining</span>
                  </label>
                  <label className='border p-4 flex rounded-2xl gap-2 items-center'>
                    <input type="checkbox" name='wifi' onChange={cbclick}/>
                    <span>Wifi</span>
                  </label>
                  <label className='border p-4 flex rounded-2xl gap-2 items-center'>
                    <input type="checkbox" name='parking' onChange={cbclick}/>
                    <span>Parking</span>
                  </label>
                  <label className='border p-4 flex rounded-2xl gap-2 items-center'>
                    <input type="checkbox" name='pets' onChange={cbclick}/>
                    <span>Pet friendly</span>
                  </label>
                </div>
    </div>
  )
}

export default Perks
