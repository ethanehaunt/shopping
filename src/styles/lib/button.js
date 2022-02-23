import React from 'react';
import styled from 'styled-components';

export const Button = styled.button`
    text-transform: uppercase;
    vertical-align: bottom;
    border: 0;
    border-radius: 4px;
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 20%), 0 1px 20px 0 rgb(0 0 0 / 10%);
    font-weight: 500;
    padding: .625rem 1.5rem .5rem 1.5rem;
    font-size: .75rem;
    line-height: 1.5;
  `;

export const RemoveBtn = styled.a`
    background: papayawhip;
    border-radius: 4px;
    font-size: 9pt;
    padding: 3px 6px;
    color: brown;
    cursor: pointer;
    align-items: baseline;
  `;