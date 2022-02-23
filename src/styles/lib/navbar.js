import React from 'react';
import styled from 'styled-components';

export const Navbar = styled.ul`
    display: flex;
    flex-direction: column;
    padding-left: 0;
    margin: 0;
    list-style: none;
    box-shadow: 0 0px 1px 0 rgb(0 0 0 / 20%), 0 2px 8px 0 rgb(0 0 0 / 10%);
  `;

export const NavbarNav = styled.li`
    display: block;
    padding: .5rem 0.1rem;
    color: ${({ theme }) => theme.inputText} !important;
    text-decoration: none;
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out;
   `;

export const NavbarBrand = styled.h5`
    font-size: 1.5em;
    text-align: center;
    margin: 0px;
    padding: 4px 0px;
    color: palevioletred;
  `;

export const ToggleNavbarButton = styled.button`
      padding: 0px;
      color:${({ theme }) => theme.inputText} !important;;
      display: none !important;
      background: transparent;
      border: 1px solid transparent !important;
      box-shadow: none !important;
    
    @media (max-width: 425px) {
        display: flex !important;
        margin-top:1rem;
    }
  `;

export const ToggleNavbar = styled.div`
    display: flex !important;
    justify-content: space-between !important;
    margin-left:0px;
    width: 100%;
    
    @media (max-width: 425px) {
        display: ${props => props.show ? "flex" : "none"} !important;
        flex-direction: column !important;
        margin-left:1rem;
    }
  `;

export const ToggleNavItem = styled.div`
    display: flex !important;
    flex-direction: row !important;
    width: 100%;
    
    @media (max-width: 425px) {
        flex-direction: column !important;
    }
  `;

export const ToggleNavbarItem = styled.div`
    display:flex;
    flex-direction: row;
    
    @media (max-width: 425px) {
       flex-direction: column;
    }
  `;
