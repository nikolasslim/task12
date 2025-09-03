import './Header.css';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Favicon from '../../svg/Favicon';
import { useAuth } from '@/hooks';
import { HeaderProps } from '@/interfaces/UI';

export default function Header({ onOpenSignIn }: HeaderProps) {
	const { isAuthenticated, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const isQuestionsRoute = location.pathname.startsWith('/questions');

    const handleAskQuestion = () => {
        navigate('/questions/create');
    };

	const openSignIn = () => {
		if (onOpenSignIn) {
			onOpenSignIn();
		}
	};

	return (
		<header className="header">
			<div className="header-logo">
				<Favicon width={40} height={20} className="header-logo-svg" />
				<h2 className="header-logo-text">CODELANG</h2>
			</div>

			<nav className="navbar">
				{!isAuthenticated ? (
					<button className="nav-button nav-button-primary" onClick={openSignIn}>
						SIGN IN
					</button>
				) : (
					<>
						{isQuestionsRoute && (
							<button className="nav-button" onClick={handleAskQuestion}>
								Ask Question
							</button>
						)}
						<button className="nav-button nav-button-primary" onClick={logout}>
							SIGN OUT
						</button>
					</>
				)}
				<button className="nav-button">EN</button>
			</nav>
		</header>
	);
}
