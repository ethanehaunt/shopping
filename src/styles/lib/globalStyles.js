import { createGlobalStyle} from "styled-components"
export const GlobalStyles = createGlobalStyle`
  
  body {
    background: ${({ theme }) => theme.background} !important;
    color: ${({ theme }) => theme.text} !important;    
  }
  .nav-link{
    color: ${({ theme }) => theme.text} !important;
  }
  .text-muted{
    color: ${({ theme }) => theme.text} !important;
  }
  .form-control{
    color: ${({ theme }) => theme.inputText} !important;
    background: ${({ theme }) => theme.body} !important;
    border-color: ${({ theme }) => theme.toggleBorder} !important;
  }
  .togglerNavbar{
    color: ${({ theme }) => theme.text} !important;
  }
  
  .w-20{
    width: 20% !important;
  }
  .w-24{
    width: 24% !important;
  }
  .w-38{
    width: 38% !important;
  }
  .modal-content{
    background-color: ${({ theme }) => theme.background} !important;
  }
  .btn-close{
    color: ${({ theme }) => theme.inputText} !important;    
  }
  `
