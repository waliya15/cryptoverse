import  React, { useEffect, useState } from "react";
import {Row, Col, Typography, Card, Input, Spin } from 'antd'
import { Link } from "react-router-dom";
import { useGetCryptoInfoQuery } from "../services/cryptoApi";
import millify from "millify";

const Cryptocurrencies= ({simplified})=> {
    const count= simplified ? 10 : 100;
    const {data: cryptos, isFetching}= useGetCryptoInfoQuery(count);
    
    const [cryptoList, setCryptoList]= useState([])
    const [SearchItem, setSearchItem]= useState('')

    useEffect(()=>{
        const filteredCryptoList = cryptos?.data?.coins?.filter(
            c => c.name.toLowerCase().includes(SearchItem.toLowerCase()))
               
        setCryptoList(filteredCryptoList)
        }
    ,[SearchItem])

    if (isFetching)
    return (
      <Spin
        style={{
          height: "81vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      />
    );

    return(
        <>
        {simplified ?  null 
        :  <div className="search-crypto">
            <Input placeholder='Search Cryptocurrencies' onChange={e => setSearchItem(e.target.value)} />
        </div> }
       
            <Row gutter={[32,32]} className="crypto-card-container">
           
            {cryptoList?.map((crypto,id) => 
                <Col xs={24} sm={12} lg={6} className='crypto-card' key={crypto.uuid}>
                    <Link to={`/crypto/${crypto.uuid}`} >
                        <Card
                            title={`${crypto.rank}.${crypto.name}`}
                            extra={<img className='crypto-image' src={crypto.iconUrl} alt='crypto'/> }
                            hoverable >
                            <p>Price: {millify(crypto.price)}</p>
                            <p>Market Cap: {millify(crypto.marketCap)}</p>
                            <p>Daily Change: {millify(crypto.change)}</p>
                        </Card>
                    </Link>
                </Col>)}
        </Row>
        </>
        
    )
}
export default Cryptocurrencies;

