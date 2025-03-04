import React, { useState, useMemo } from 'react'
import heartIcon from '@/assets/job/heart.svg'
import styled from 'styled-components'

const JobMainView = () => {
  const [order, setOrder] = useState('')
  const jobs = [
    { title: 'farm worker', location: 'lon lon ranch', salary: 30000, id: '1' },
    { title: 'quarryman', location: 'death mountain', salary: 40000, id: '2' },
    { title: 'flute player', location: 'the lost woods', salary: 35000, id: '3' },
    { title: 'fisherman', location: 'lake hylia', salary: 21000, id: '4' },
    { title: 'prison guard', location: 'gerudo valley', salary: 32000, id: '5' },
  ]

  const sortedJobs = useMemo(() => {
    if (!order) return jobs
    return [...jobs].sort((a, b) => {
      if (order === 'salary') return b.salary - a.salary
      return a[order].localeCompare(b[order])
    })
  }, [order, jobs])

  return (
    <JobListPage>
      <div id='prj'>
        <header className='mt-5'>
          <div className='title'>
            <img src={heartIcon} alt='site logo' />
            <h1>Hyrule Jobs</h1>
          </div>
          <div className='order'>
            <button onClick={() => setOrder('title')}>Order by title</button>
            <button onClick={() => setOrder('salary')}>Order by salary</button>
            <button onClick={() => setOrder('location')}>Order by location</button>
          </div>
        </header>
        <JobList jobs={sortedJobs} />
      </div>
    </JobListPage>
  )
}

const JobListPage = styled.div`
  .job-list {
    max-width: 960px;
    margin: 40px auto;
  }
  .job-list ul {
    padding: 0;
  }
  .job-list li {
    list-style-type: none;
    background: white;
    padding: 16px;
    margin: 16px 0;
    border-radius: 4px;
  }
  .job-list h2 {
    margin: 0 0 10px;
    text-transform: capitalize;
  }
  .salary {
    display: flex;
  }
  .salary img {
    width: 30px;
  }
  .salary p {
    color: #17bf66;
    font-weight: bold;
    margin: 10px 4px;
  }
  .list-move {
    transition: all 1s;
  }
`

export default JobMainView
