import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [announcements, setAnnouncements] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch('http://localhost:3000/announcements')
        if (!response.ok) throw new Error('Failed to fetch announcements')
        const data = await response.json()
        setAnnouncements(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchAnnouncements()
  }, [])

  // const handleAction = (id) => {
  //   alert(`Action clicked for announcement: ${id}`)
  // }

  return (
    
    // <div className=''>
    //   {
    //     announcements.map((ann) => {
    //       <div key={ann.title}>
    //         <h1>{ann.title}</h1>
    //         <p>{ann.description}</p>
    //         <div>
    //           <p>{ ann.date }</p>
    //           <button>Book Event</button>
    //         </div>
    //       </div>
    //     })
    //   }
    // </div>
    <>
      
      <section className='bg-slate-200 min-h-screen p-4 '>
        <div className='grid grid-cols-[repeat(auto-fill,minmax(300px,))]'>
          <div className='bg-white rounded shadow p-4 '>
            <h1>Lorem ipsum dolor sit amet.</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil quo qui consequuntur veniam. Ad, nam.</p>
            <div>
              <p>3/2/2024</p>
              <button>Book Event</button>
            </div>
          </div>
        </div>

      </section>
    </>
   
  )
}

export default App
