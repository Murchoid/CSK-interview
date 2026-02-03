import { useState, useEffect } from 'react'
import './App.css'

/**
 * @typedef {Object} Announcement
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {{path:string, text:string}} link
 * @property {string} createdAt
 */

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
        setAnnouncements(data.announcements)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchAnnouncements()
  }, [])
  if (loading) {
    // console.log(loading)
    return (
      <h1>LOADING....</h1>
    )
  }

  if (error) {
    //  console.log(error)
     return <h1 className='text-red-500'>Something went wrong fetching announcement</h1>;
   }

  // console.log('announcements :>> ', announcements);

  return (
    <>
      <section className='bg-slate-200 p-4 min-h-screen '>
        <div className='min-h-[20vh]'>
          <h1 className='text-center font-bold text-3xl '>COMPUTER SOCIETY OF KIRINYANGA</h1>
         </div>
  
        <div className='min-h-screen gap-4 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))]'>
          {
            announcements.length ? announcements.map((ann) => {
              return (
                <div
                  key={ann.title}
                  className="bg-white shadow min-h-[10em] rounded p-4 w-fit my-4">
                  <h1 className="text-slate-950 text-2xl bold">{ann.title}</h1>
                  <p className="text-slate-600">{ann.description}</p>
                  <div>
                    <p className='text-slate-300 mt-3'>{ann.createdAt}</p>
                    <a href={`${ann.link.path}`} target='_blank'>
                      <button className='bg-green-500 py-1 px-4 rounded mt-4 mb-2 text-white'>{ann.link.text}</button>
                    </a>
                  </div>
                </div>
              );
            }) : <h4 className='text-blue-400'>No announcements yet!</h4>
          }
        </div>


      </section>
      <footer className='min-h-[20vh]'>
        <p className='text-center text-green-300 mt-[2em] '>&copy; { new Date().getFullYear() } CSK. All Rights Reserved.</p>
      </footer>
    </>
  )
}

export default App
