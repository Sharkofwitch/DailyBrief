"use client";

import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 16px;
  margin-bottom: 16px;
`;

const Title = styled.h3`
  font-size: 1.2rem;
  color: #333;
`;

const Description = styled.p`
  color: #555;
  font-size: 1rem;
  margin-top: 8px;
`;

const NewsCard = ({ title, description, link }: { title: string; description: string; link: string }) => {
  return (
    <Card>
      <Title>{title}</Title>
      <Description>{description}</Description>
      <a href={link} target="_blank" rel="noopener noreferrer">Read more</a>
    </Card>
  );
};

export default NewsCard;
