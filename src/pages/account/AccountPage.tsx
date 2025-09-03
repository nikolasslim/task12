import React from 'react';
import UserInfo from '@/modules/user/components/userInfo/UserInfo';
import EditAccountForm from '@/modules/user/components/editAccountForm/EditAccountForm';

export default function AccountPage() {
	return (
		<>
			<UserInfo />
			<EditAccountForm />
		</>
	);
}
