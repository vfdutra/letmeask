import { ButtonHTMLAttributes } from "react"

import { PageButton } from '../styles/button'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean
};

export function Button({ isOutlined = false, ...props}: ButtonProps) {
  return (
  <PageButton 
    className={`button ${isOutlined ? 'outlined' : ''}`}
    {...props}
  />  
  )
}