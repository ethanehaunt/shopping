import React from 'react';
import styled from 'styled-components';

export const Card = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    color:  ${({ theme }) => theme.inputText} !important;
    background-color:  ${({ theme }) => theme.body} !important;
    background-clip: border-box;
    border: 1px solid ${({ theme }) => theme.toggleBorder} !important;
    border-radius: .5rem;
  `;

export const CardHeader = styled.div`
    padding: .75rem 1.5rem;
    margin-bottom: 0;
    background-color: ${({ theme }) => theme.body} !important;
    border-bottom: 1px solid ${({ theme }) => theme.toggleBorder};
  `;

export const CardTitle = styled.h5`
    margin-bottom: .5rem;
  `;

export const CardBody = styled.div`
    flex: 1 1 auto;
    padding: 1.5rem 1.5rem;
  `;

export const CardImage = styled.img`
    border-top-left-radius: calc(0.5rem - 1px);
    border-top-right-radius: calc(0.5rem - 1px);
    width: 100%;
    vertical-align: middle;
  `;

export const CardFooter = styled.div`
    padding: .75rem 1.5rem;
    border-top: 1px solid ${({ theme }) => theme.toggleBorder};
  `;
