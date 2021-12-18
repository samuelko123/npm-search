import React, { useState, useEffect, useCallback } from 'react'
import { Row, Col } from 'react-bootstrap'
import { Card, ErrorAlert, ExcelButton, Pagination, SearchBar, Spinner } from '../components'
import axios from 'axios'
import { downloadExcel } from '../libs'
import styles from '../styles/index.module.css'

export default () => {
  const pageSize = 20
  const [items, setItems] = useState(null)
  const [itemCount, setItemCount] = useState(0)
  const [keyword, setKeyword] = useState(null)
  const [pageNum, setPageNum] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)

  const fetchData = useCallback(async () => {
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
  }, [keyword, pageNum])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleKeywordChange = (keyword) => {
    setKeyword(keyword)
    setPageNum(1)
  }

  const handlePageChange = (pageNum) => {
    setPageNum(pageNum)
  }

  const handleDownloadExcel = async () => {
    const headers = ['name', 'description', 'url']
    const data = items.map(function (item) {
      return {
        name: item.package.name,
        description: item.package.description,
        url: item.package.links.npm,
      }
    })

    const fileName = `${keyword}.xlsx`
    downloadExcel(headers, data, fileName, 'Packages')
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
          <Row>
            <Col>
              No. of results: {itemCount.toLocaleString('en-AU')}
            </Col>
            <Col className={styles.btn_container}>
              <ExcelButton
                onClick={handleDownloadExcel}
              />
            </Col>
          </Row>
          {
            items.map((item, index) =>
              <Card
                key={index}
                title={
                  <a href={item.package.links.npm} target='_blank' className='link-primary' rel="noreferrer">
                    {item.package.name}
                  </a>
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