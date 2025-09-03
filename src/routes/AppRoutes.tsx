import React from 'react';
import { Navigate, Route, Routes, useOutletContext } from 'react-router-dom';
import MainLayout from '@/pages/mainLayout/MainLayout';
import HomePage from '@/pages/home/HomePage';
import AccountPage from '@/pages/account/AccountPage';
import MineSnippetsPage from '@/pages/mineSnippets/MineSnippetsPage';
import QuestionsPage from '@/pages/questions/QuestionsPage';
import CreateQuestionPage from '@/pages/createQuestion/CreateQuestionPage';
import EditQuestionPage from '@/pages/editQuestion/EditQuestionPage';
import UsersPage from '@/pages/users/UsersPage';
import UserProfilePage from '@/pages/userProfile/UserProfilePage';
import PostSnippetsPage from '@/pages/postSnippets/PostSnippetsPage';
import EditSnippetPage from '@/pages/editSnippet/EditSnippetPage';
import RequireAuth from '@/modules/auth/RequireAuth';
import ProfilePage from '@/pages/profile/ProfilePage';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const { onOpenSignIn } = useOutletContext<{ onOpenSignIn: () => void }>();
	return <RequireAuth onOpenSignIn={onOpenSignIn}>{children}</RequireAuth>;
};

export const AppRoutes: React.FC = () => {
	return (
		<Routes>
			<Route element={<MainLayout />}>
				<Route
					path="/profile"
					element={
						<ProtectedRoute>
							<ProfilePage />
						</ProtectedRoute>
					}
				/>
				<Route path="/" element={<HomePage />} />
				<Route
					path="/account"
					element={
						<ProtectedRoute>
							<AccountPage />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/posts/snippets"
					element={
						<ProtectedRoute>
							<PostSnippetsPage />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/posts/mine"
					element={
						<ProtectedRoute>
							<MineSnippetsPage />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/questions"
					element={
						<ProtectedRoute>
							<QuestionsPage />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/questions/create"
					element={
						<ProtectedRoute>
							<CreateQuestionPage />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/questions/edit/:questionId"
					element={
						<ProtectedRoute>
							<EditQuestionPage />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/users"
					element={
						<ProtectedRoute>
							<UsersPage />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/users/:id"
					element={
						<ProtectedRoute>
							<UserProfilePage />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/posts/mine/edit/:snippetId"
					element={
						<ProtectedRoute>
							<EditSnippetPage />
						</ProtectedRoute>
					}
				/>

				<Route path="*" element={<Navigate to="/" replace />} />
			</Route>
		</Routes>
	);
};
