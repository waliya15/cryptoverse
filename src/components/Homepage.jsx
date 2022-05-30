import  React from "react";
import { Row, Col, Statistic, Typography, Spin } from 'antd'
import millify from "millify";
import { Link } from "react-router-dom";
import { useGetCryptoInfoQuery } from "../services/cryptoApi";
import Cryptocurrencies from './Cryptocurrencies'
import News from './News'

const {Title}= Typography;

export default function Homepage(){

    const {data, isFetching}= useGetCryptoInfoQuery(10);
    const stats= data?.data?.stats
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
            <Title level={2} className='heading'>
                Global Crypto Statistics
            </Title>
            
            <Row>
                <Col span={12} >
                    <Statistic title='Total Cryptocurrencies' value={millify(stats.total)}></Statistic> 
                </Col>
                <Col span={12} >
                    <Statistic title='Total Exchanges' value={millify(stats.totalExchanges)}></Statistic>
                </Col>
                <Col span={12} >
                    <Statistic title='Total Market Cap' value={millify(stats.totalMarketCap)}></Statistic>
                </Col>
                <Col span={12} >
                    <Statistic title='Total 24h Volume' value={millify(stats.total24hVolume)}></Statistic>
                </Col>
                <Col span={12} >
                    <Statistic title='Tottal Markets' value={millify(stats.totalMarkets)}></Statistic>
                </Col>
            </Row>
            <div className="home-heading-container">
                <Title level={2} className="home-title">Top 10 Cryptos In The World</Title>
                <Title level={3} className="show-more"><Link to="/cryptocurrencies">Show more</Link></Title>
            </div>
            <Cryptocurrencies simplified />
            <div className="home-heading-container">
                <Title level={2} className="home-title">Latest Crypto News</Title>
                <Title className="show-more" level={3}><Link to="/news">Show more</Link></Title>
            </div>
            <News simplified />   
        </>
    )
}