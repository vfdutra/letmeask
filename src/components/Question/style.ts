import styled from 'styled-components';

export const PageQuestion = styled.div`
  background: ${props => props.theme.colors.background};
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  padding: 24px;

  & + .question {
    margin-top: 8px;
  }

  &.highlighted {
    background: ${props => props.theme.colors.background};
    border: 1px solid #835AFD;

    footer .user-info span {
      color: ${props => props.theme.colors.text};
    }
  }

  &.answered {
    background: #DBDCDD;
  }

  p {
    color: ${props => props.theme.colors.text};
  }

  footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 24px;
    
    .user-info {
      display: flex;
      align-items: center;
  
      img {
        width: 32px;
        height: 32px;
        border-radius: 50%;
      }
  
      span {
        margin-left: 8px;
        color: ${props => props.theme.colors.text};
        font-size: 14px;
      }
    }

    > div {
      display: flex;
      gap: 16px;
    }

    button {
      border: 0;
      background: transparent;
      cursor: pointer;
      transition: filter 0.2;

      &.like-button {
        display: flex;
        align-items: flex-end;
        color: #737380;
        gap: 8px;

        &.liked {
          color: #835afd;

          svg path {
            stroke: #835afd;
          }
        }
      }

      &:hover {
        filter: brightness(0.7)
      }
    }
  }
`;