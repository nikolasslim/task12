import React from 'react';
import { NavLink } from 'react-router-dom';
import { useLoginState, useUserInfo } from '@/store/hooks';
import ProfileIcon from '@/svg/Profile';
import HomeIcon from '@/svg/Home';
import SnippetIcon from '@/svg/Snippet';
import QuestionIcon from '@/svg/Question';
import UsersIcon from '@/svg/Users';
import './Sidebar.css';

const menuItems = [
	{ to: '/', label: 'Home', requiresAuth: false },
	{ to: '/account', label: 'My account', requiresAuth: true },
	{ to: '/posts/snippets', label: 'Post snippets', requiresAuth: true },
	{ to: '/posts/mine', label: 'My snippets', requiresAuth: true },
	{ to: '/questions', label: 'Questions', requiresAuth: true },
	{ to: '/users', label: 'Users', requiresAuth: true },
];

function renderIcon(path: string) {
	switch (path) {
		case '/':
			return <HomeIcon width={28} height={28} />;
		case '/account':
			return <ProfileIcon width={28} height={28} />;
		case '/posts/snippets':
			return <SnippetIcon width={28} height={28} />;
		case '/posts/mine':
			return <SnippetIcon width={28} height={28} />;
		case '/questions':
			return <QuestionIcon width={28} height={28} />;
		case '/users':
			return <UsersIcon width={28} height={28} />;
		default:
			return null;
	}
}

export default function Aside() {
	const isAuthenticated = useLoginState();
	const user = useUserInfo();
	return (
		<aside className="app-aside">
			<div className="aside-menu">
				<div className="logged-user">
					<a className="aside-link" href="/profile" data-discover="true">
						<img src="/assets/img/profile-avatar.jpg" alt="avatar" className="profile-avatar" />
						<span>{isAuthenticated && user.username ? user.username : 'User'}</span>
					</a>
				</div>
				<hr className="synthetic-border" />

				{menuItems.map(item => {
					if (item.requiresAuth && !isAuthenticated) {
						return (
							<span
								key={item.to}
								className="aside-link aside-link-disabled"
								title="Sign in required"
							>
								{renderIcon(item.to)}
								<span className="aside-link-text">{item.label}</span>
							</span>
						);
					}

					return (
						<NavLink
							key={item.to}
							to={item.to}
							className={({ isActive }) => `aside-link${isActive ? ' aside-link-active' : ''}`}
							end={item.to === '/'}
						>
							{renderIcon(item.to)}
							<span className="aside-link-text">{item.label}</span>
						</NavLink>
					);
				})}
			</div>
		</aside>
	);
}
