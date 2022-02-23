import React from 'react';
import styled from 'styled-components';

export const Table = styled.table`
    width: 100%;
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.inputText} !important;
    vertical-align: top;
    border-color: ${({ theme }) => theme.toggleBorder} !important;
    caption-side: bottom;
    border-collapse: collapse;    
  `;

export const TableHead = styled.thead`
    vertical-align: bottom;
    padding: 2rem .5rem !important;
  `;

export const TableBody = styled.tbody`
    vertical-align: inherit;
    color: ${({ theme }) => theme.inputText} !important;
    border-top:1px solid ${({ theme }) => theme.toggleBorder} !important;
    font-weight: 300;
  `;