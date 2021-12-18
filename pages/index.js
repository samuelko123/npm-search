import React, { useState, useEffect } from 'react'
import { Card, ErrorAlert, Pagination, SearchBar, Spinner } from '../components'
import axios from 'axios'

export default () => {
  const pageSize = 20
  const [items, setItems] = useState(null)
  const [itemCount, setItemCount] = useState(0)
  const [keyword, setKeyword] = useState(null)
  const [pageNum, setPageNum] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)

  useEffect(() => {
    async function fetchData() {
      if (!!keyword && !!pageNum) {
        setIsLoading(true)

        try {
          let from = (pageNum - 1) * pageSize
          let url = `https://registry.npmjs.org/-/v1/search?text=${keyword}&size=${pageSize}&from=${from}`
          let res = await axios.get(url)

          setItems(res.data.objects)
          setItemCount(res.data.total)
        } catch (err) {
          setErrorMsg(err)
        } finally {
          setIsLoading(false)
        }
      }
    }

    fetchData()
  }, [keyword, pageNum])

  const handleKeywordChange = (keyword) => {
    setKeyword(keyword)
    setPageNum(1)
  }

  const handlePageChange = (pageNum) => {
    setPageNum(pageNum)
  }

  return (
    <>
      <SearchBar
        placeholderText='Search npm registry'
        buttonText='Search'
        onSubmit={handleKeywordChange}
        autoFocus={true}
      />
      {errorMsg &&
        <ErrorAlert message={errorMsg.message} />
      }
      {isLoading && !errorMsg &&
        <Spinner />
      }
      {!isLoading && !!items &&
        <>
          <p>No. of results: {itemCount.toLocaleString('en-AU')}</p>
          {
            items.map((item, index) =>
              <Card
                key={index}
                title={
                  <a href={item.package.links.npm} target='_blank' className='link-primary' rel="noreferrer">{item.package.name}</a>
                }
                body={item.package.description}
              />
            )
          }
          <Pagination
            currentPage={pageNum}
            itemCount={itemCount}
            pageSize={pageSize}
            siblingCount={1}
            onClick={handlePageChange}
          />
        </>
      }
    </>
  )
}