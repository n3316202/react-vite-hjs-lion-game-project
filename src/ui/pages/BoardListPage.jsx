import axios from 'axios'
import React, { useEffect, useState } from 'react'

//https://sample.bmaster.kro.kr/contacts?pageno=1&pagesize=10

const BoardListPage = () => {
  const [contacts, setContacts] = useState([])

  const getContacts = async (pageNum, pageSize) => {
    await axios
      .get(`https://sample.bmaster.kro.kr/contacts?pageno=${pageNum}&pagesize=${pageSize}`)
      .then((response) => {
        // setContacts((prev) => ({
        //   ...prev,
        //   contacts: response.data.contacts,
        // }))
        setContacts(response.data.contacts)

        console.log(contacts)
      })
      .catch((error) => console.log(error))
  }

  useEffect(() => {
    getContacts(3, 10)
    console.log(contacts)
  }, [])

  const deleteBoard = (e) => {
    const { name, value } = e.target
    console.log(name + '::' + value)

    setContacts(contacts.filter((contact) => contact.no !== value))
  }
  return (
    <div className='container mt-3'>
      <div className='container-fluid'>
        <h1 className='h1 mb-2 text-gray-800 text-center'>게시판</h1>
        <p className='mb-4'>
          {/* DataTables is a third party plugin that is used to generate the demo table below. For more information about
          DataTables, please visit the{' '} */}
          {/* <a target='_blank' href='https://datatables.net'>
            official DataTables documentation
          </a>
          . */}
        </p>

        {/* <!-- DataTales Example --> */}
        <div className='card shadow mb-4'>
          <div className='card-header py-3'>
            <h6 className='m-0 font-weight-bold text-primary'>DataTables Example</h6>
          </div>
          <div className='card-body'>
            <div className='table-responsive'>
              <table
                className='table table-bordered text-center align-middle'
                id='dataTable'
                width='100%'
                cellspacing='0'
              >
                <thead>
                  <tr>
                    <th>번호</th>
                    <th>이름</th>
                    <th>전화번호</th>
                    <th>주소</th>
                    <th>사진</th>
                    <th className='text-center'>삭제</th>
                  </tr>
                </thead>

                <tbody>
                  {contacts &&
                    contacts.map((contact) => (
                      <tr key={contact.no}>
                        <td>{contact.no}</td>
                        <td>{contact.name}</td>
                        <td>{contact.tel}</td>

                        <td>{contact.address}</td>
                        <td>
                          <img src={contact.photo} alt='' />
                        </td>
                        <td className='text-center'>
                          <button className='btn btn-success' value={contact.no} onClick={deleteBoard}>
                            삭제
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            {/* 페이징           */}

            <hr />
          </div>
        </div>
      </div>
    </div>
  )
  // <!-- /.container-fluid -->);
}

export default BoardListPage
