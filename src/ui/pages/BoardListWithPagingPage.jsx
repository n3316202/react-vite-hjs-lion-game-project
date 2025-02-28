import axios from 'axios'
import React, { useEffect, useState } from 'react'
import BoardPagingnation from '../components/board/BoardPagingnation'
import styled from 'styled-components'
import Pagination from 'react-js-pagination'

//https://sample.bmaster.kro.kr/contacts?pageno=1&pagesize=10

const BoardListWithPagingPage = () => {
  const initPaging = {
    activePage: 1, // 현재 페이지
    limit: 10, // 한 페이지 당 보여질 게시물 갯수
    pageCount: 10, //    1 ,2,3,4,5,6,7,8,9,10
    totalCount: 0, //총갯수
    data: [], // 데이타
  }

  const [paging, setPaging] = useState(initPaging)

  const getContacts = async (pageNum, pageSize) => {
    await axios
      .get(`https://sample.bmaster.kro.kr/contacts?pageno=${pageNum}&pagesize=${pageSize}`)
      .then((response) => {
        setPaging((prev) => ({
          ...prev,
          data: response.data.contacts,
          totalCount: response.data.totalcount,
        }))

        console.log(paging)
      })
      .catch((error) => console.log(error))
  }

  useEffect(() => {
    getContacts(3, 10)
  }, [])

  const deleteBoard = (e) => {
    const { name, value } = e.target
    console.log(name + '::' + value)

    let filterdContacts = paging.data.filter((contact) => {
      console.log(contact)
      return contact.no !== value
    })

    setPaging((prev) => ({
      ...prev,
      data: filterdContacts,
    }))
  }

  const handlePageChange = (pageNumber) => {
    console.log(pageNumber)
    console.log(typeof pageNumber)

    //setPaging((prev) => ({ ...prev, activePage: pageNumber }))

    axios
      .get(`https://sample.bmaster.kro.kr/contacts?pageno=${pageNumber}&pagesize=${paging.pageCount}`)
      .then((res) => {
        console.log(res)

        setPaging((prev) => ({
          ...prev,
          data: res.data.contacts,
          totalCount: res.data.totalcount,
          activePage: pageNumber,
        }))

        console.log(paging)
      })
      .catch((error) => console.log(error))
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
                  {paging.data &&
                    paging.data.map((contact) => (
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
            <PaginationBox>
              <Pagination
                activePage={paging.activePage}
                itemsCountPerPage={paging.limit}
                totalItemsCount={paging.totalCount}
                pageRangeDisplayed={paging.pageCount}
                onChange={handlePageChange}
              ></Pagination>
            </PaginationBox>
            <hr />
          </div>
        </div>
      </div>
    </div>
  )
  // <!-- /.container-fluid -->);
}

const PaginationBox = styled.div`
  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 15px;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  ul.pagination li {
    display: inline-block;
    width: 30px;
    height: 30px;
    border: 1px solid #e2e2e2;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
  }
  ul.pagination li:first-child {
    border-radius: 5px 0 0 5px;
  }
  ul.pagination li:last-child {
    border-radius: 0 5px 5px 0;
  }
  ul.pagination li a {
    text-decoration: none;
    color: #337ab7;
    font-size: 1rem;
  }
  ul.pagination li.active a {
    color: white;
  }
  ul.pagination li.active {
    background-color: #337ab7;
  }
  ul.pagination li a:hover,
  ul.pagination li a.active {
    color: blue;
  }
`
export default BoardListWithPagingPage
