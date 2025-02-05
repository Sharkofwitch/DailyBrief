'use client'

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

// Dunkler Hintergrund und zentrierte Inhalte
const Container = styled.div`
  background-color: #2e2e2e;
  color: #f1f1f1;
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  height: 100vh;
  justify-content: flex-start;
`;

// Überschrift
const Title = styled.h1`
  font-size: 2.5rem;
  color: #ff6347; /* Tomatenrot */
  text-align: center;
  margin-bottom: 30px;
`;

// Container für jedes einzelne Nachrichten-Card
const Card = styled.div`
  background: #444;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  padding: 20px;
  margin-bottom: 20px;
  width: 80%;
  max-width: 600px;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #555;
  }
`;

// Titel der Schlagzeile
const CardTitle = styled.h3`
  font-size: 1.4rem;
  color: #f1f1f1;
  margin: 0;
`;

// Link zum Artikel
const CardLink = styled.a`
  text-decoration: none;
  color: #ff6347;
  font-size: 1.1rem;
  margin-top: 10px;
  display: inline-block;
  
  &:hover {
    color: #fff;
  }
`;

const NewsCard = ({ title, link }: { title: string; link: string }) => (
  <Card>
    <CardTitle>{title}</CardTitle>
    <CardLink href={link} target="_blank" rel="noopener noreferrer">
      Read more
    </CardLink>
  </Card>
);

const Page = () => {
  const [headlines, setHeadlines] = useState<any[]>([]);

  useEffect(() => {
    const fetchHeadlines = async () => {
      const res = await fetch('/api/headlines');
      const data = await res.json();
      setHeadlines(data);
    };

    fetchHeadlines();
  }, []);

  return (
    <Container>
      <Title>BBC News Headlines</Title>
      {headlines.map((headline, index) => (
        <NewsCard key={index} title={headline.title} link={headline.link} />
      ))}
    </Container>
  );
};

export default Page;
