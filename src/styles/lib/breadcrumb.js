import React from 'react';
import styled from 'styled-components';

export const Breadcrumb = styled.ul`
    display: flex;
    flex-wrap: wrap;
    padding: 0 0;
    text-decoration: auto;
    margin-bottom: 1rem;
    list-style: none;
  `;

export const BreadcrumbItem = styled.li`
    display: flex;
    flex-wrap: wrap;
    text-decoration: auto !important;
   
    & + &{
        padding-left: .5rem;
    }

    & + &::before {
        float: left;
        padding-right: .5rem;
        color: #757575;
        content: "/";
    }
  `;