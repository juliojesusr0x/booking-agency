import React from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
  background-color: white;
  border-bottom: 1px solid #e5e7eb;
  padding: 1rem 2rem;
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: #3b82f6;
  font-size: 1.5rem;
  font-weight: 600;
  transition: color 0.2s;

  &:hover {
    color: #2563eb;
  }
`;

const LogoImage = styled.img`
  height: 2rem;
  width: auto;
  display: block;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const StyledLink = styled(NavLink)<{ $active: boolean }>`
  text-decoration: none;
  font-weight: 500;
  color: ${(props) => (props.$active ? "#3b82f6" : "#6b7280")};
  padding: 0.5rem 0;
  border-bottom: 2px solid
    ${(props) => (props.$active ? "#3b82f6" : "transparent")};
  transition: color 0.2s;

  &:hover {
    color: #3b82f6;
  }
`;

export const Navigation: React.FC = () => {
  return (
    <Nav>
      <NavContainer>
        <LogoLink to="/">
          <LogoImage src="/logo.svg" alt="Booking Agency" />
          <span>Booking Agency</span>
        </LogoLink>
        <NavLinks>
          <StyledLink to="/" $active={location.pathname === "/"}>
            Search Properties
          </StyledLink>
          <StyledLink
            to="/bookings"
            $active={location.pathname === "/bookings"}
          >
            My Bookings
          </StyledLink>
        </NavLinks>
      </NavContainer>
    </Nav>
  );
};
