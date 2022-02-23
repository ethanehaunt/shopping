import React from 'react'
import { func, string } from 'prop-types';
import styled from "styled-components"

const ThemeToggler = ({theme,  toggleTheme }) => {
    return (
        <div className="form-check form-switch nav-link me-2">
          <input className="form-check-input mt-1" type="checkbox" id="darkMode" checked={(theme == 'dark')? true:false} onChange={toggleTheme}/>
          <label className="form-check-label mt-1 ps-1" htmlFor="darkMode">Dark Mode</label>
        </div>
    );
};

ThemeToggler.propTypes = {
    theme: string.isRequired,
    toggleTheme: func.isRequired,
}

export default ThemeToggler;
