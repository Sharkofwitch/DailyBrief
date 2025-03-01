'use client'

import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';

const Container = styled.div`
  background-color: #2e2e2e;
  color: #f1f1f1;
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  min-height: 100vh;
  height: auto;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #ff6347;
  text-align: center;
  margin: 0;
  padding-top: 20px;
`;

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

const CardTitle = styled.h3`
  font-size: 1.4rem;
  color: #f1f1f1;
  margin: 0;
`;

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
  const [headlines, setHeadlines] = useState<{ title: string; link: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHeadlines = async () => {
      try {
        const res = await fetch('/api/headlines');
        const data = await res.json();
        setHeadlines(data);
      } catch (error) {
        console.error('Fehler beim Laden der Nachrichten:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchHeadlines();
  }, []);

  return (
    <>
      <Head>
        <title>DailyBrief – BBC News</title>
        <meta name="description" content="Aktuelle BBC-Schlagzeilen auf einen Blick" />
      </Head>
      <Container>
        <Title>BBC News Headlines</Title>
        {loading ? (
          <p>Loading...</p>
        ) : headlines.length > 0 ? (
          headlines.map((headline, index) => (
            <NewsCard key={index} title={headline.title} link={headline.link} />
          ))
        ) : (
          <p>Keine Nachrichten gefunden.</p>
        )}
      </Container>
    </>
  );
};

export default Page;