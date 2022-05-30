import React, { useState } from "react";
import { useGetNewsQuery } from "../services/newsApi";
import { Row, Col, Card, Typography, Select, Spin } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import moment from "moment";
import { useGetCryptoInfoQuery } from "../services/cryptoApi";

const News = ({ simplified }) => {
  const [currentSearch, setCurrentSearch] = useState("Cryptocurrency");

  const { data: cryptoNews, isFetching } = useGetNewsQuery({
    newsCategory: currentSearch,
    count: simplified ? 6 : 12,
  });
  const { data } = useGetCryptoInfoQuery(100);

  const { Title, Text } = Typography;
  const { Option } = Select;

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
  return (
    <>
      <Row gutter={[24, 24]}>
        {simplified ? null : (
          <>
            <Col span={24}>
              <Title level={2}>Latest Cryto News</Title>
              <div>
                <Select
                  showSearch
                  className="select-news"
                  placeholder="Select a Crypto"
                  optionFilterProp="children"
                  onChange={(value) => setCurrentSearch(value)}
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {data?.data?.coins?.map((c, i) => (
                    <Option key={i} value={c.name}></Option>
                  ))}
                </Select>
              </div>
            </Col>
          </>
        )}
        {cryptoNews?.value?.map((news, i) => (
          <Col key={i} xs={24} sm={12} lg={8}>
            <a href={news.url} target="	_blank">
              <Card hoverable className="news-card">
                <div className="news-image-container">
                  <Title className="news-title" level={4}>
                    {news.name}
                  </Title>
                  <img
                    src={
                      news.image?.thumbnail?.contentUrl ||
                      "https://vaalweekblad.com/wp-content/uploads/sites/119/2015/05/news.jpg"
                    }
                    alt="news"
                  />
                </div>
                <p>
                  {news.description > 100
                    ? `${news.description.substring(0, 100)}...`
                    : news.description}
                </p>
                <div className="provider-container">
                  <Avatar
                    src={
                      news.provider[0]?.image?.thumbnail?.contentUrl ||
                      "https://vaalweekblad.com/wp-content/uploads/sites/119/2015/05/news.jpg"
                    }
                    alt="provider"
                  />
                  <div className="provider-name">
                    <Text>{news.provider[0].name}</Text>
                  </div>
                </div>
                <Text className="provider-time">
                  {moment(news.datePublished).startOf("ss").fromNow()}
                </Text>
              </Card>
            </a>
          </Col>
        ))}
      </Row>
    </>
  );
};
export default News;
