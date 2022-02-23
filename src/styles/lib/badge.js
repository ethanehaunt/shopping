import React from 'react';
import styled from 'styled-components';

export const Badge = styled.span`
    display: inline-flex;
    align-items: baseline;
    font-weight: 700;
    line-height: 1.3;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;

    margin-top:${props => props.Notification ? "-1rem" : "auto"};
    margin-left:${props => props.Notification ? "-0.1rem" : "auto"};
    color:${props => props.Notification ? "white" : "inherit"};
    font-size:${props => props.Notification ? "6.5pt" : "8.5pt"};

    padding:${props => props.Rounded ? "0.2em 0.46em" : " 0.2em .5rem"};
    border-radius:${props => props.Rounded ? "50%" : ".27rem"};
  `;

