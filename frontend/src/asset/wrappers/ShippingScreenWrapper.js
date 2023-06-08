import styled from "styled-components";

const Wrapper = styled.section`
  display: grid;
  align-items: center;
  .logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 1.38rem;
  }
  .form {
    max-width: 400px;
    border-top: 5px solid var(--primary-500);
  }
  h3 {
    margin: 0;
    margin-bottom: 1rem;
  }

  p {
    margin: 0;
    margin-top: 3rem;
  }

  .btn {
    margin-top: 1rem;
    display: block;
    padding: 5px;
    border: 0.5px solid lightgray;
  }
  .member-btn {
    margin-left: 0.5rem;
    background: transparent;
    border: 0.5px solid lightgray;
    color: var(--primary-500);
    cursor: pointer;
    letter-spacing: var(--letterSpacing);
  }
`;
export default Wrapper;
