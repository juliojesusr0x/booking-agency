import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
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

  /* Hide desktop links on small screens */
  @media (max-width: 640px) {
    display: none;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  padding: 0.25rem;
  margin-left: 1rem;
  cursor: pointer;

  @media (max-width: 640px) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  span {
    display: block;
    width: 1.5rem;
    height: 0.125rem;
    background-color: #4b5563;
    border-radius: 9999px;
    position: relative;
  }

  span::before,
  span::after {
    content: "";
    position: absolute;
    left: 0;
    width: 1.5rem;
    height: 0.125rem;
    background-color: #4b5563;
    border-radius: 9999px;
  }

  span::before {
    top: -0.35rem;
  }

  span::after {
    top: 0.35rem;
  }
`;

const MobileNavLinks = styled.div<{ $open: boolean }>`
  display: none;

  @media (max-width: 640px) {
    display: ${(props) => (props.$open ? "flex" : "none")};
    flex-direction: column;
    gap: 0.75rem;
    margin-top: 0.75rem;
  }
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
  const { pathname } = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <Nav>
      <NavContainer>
        <LogoLink to="/">
          <LogoImage src="/logo.svg" alt="Booking Agency" />
          <span>Booking Agency</span>
        </LogoLink>
        <MobileMenuButton
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={isMobileOpen}
          onClick={() => setIsMobileOpen((open) => !open)}
        >
          <span />
        </MobileMenuButton>
        <NavLinks>
          <StyledLink to="/" $active={pathname === "/"}>
            Search Properties
          </StyledLink>
          <StyledLink to="/bookings" $active={pathname === "/bookings"}>
            My Bookings
          </StyledLink>
        </NavLinks>
      </NavContainer>
      <MobileNavLinks $open={isMobileOpen}>
        <StyledLink
          to="/"
          $active={pathname === "/"}
          onClick={() => setIsMobileOpen(false)}
        >
          Search Properties
        </StyledLink>
        <StyledLink
          to="/bookings"
          $active={pathname === "/bookings"}
          onClick={() => setIsMobileOpen(false)}
        >
          My Bookings
        </StyledLink>
      </MobileNavLinks>
    </Nav>
  );
};
