"use client";

import React from 'react';
import NewsCard from './NewsCard';
import styled from 'styled-components';

const CategoryWrapper = styled.div`
  margin-bottom: 32px;
`;

const CategoryTitle = styled.h2`
  font-size: 1.5rem;
  color: #222;
  margin-bottom: 16px;
`;

const Category = ({ title, news }: { title: string; news: Array<{ title: string; description: string; link: string }> }) => {
  return (
    <CategoryWrapper>
      <CategoryTitle>{title}</CategoryTitle>
      {news.map((item, index) => (
        <NewsCard key={index} title={item.title} description={item.description} link={item.link} />
      ))}
    </CategoryWrapper>
  );
};

export default Category;
