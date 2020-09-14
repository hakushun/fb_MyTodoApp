import React, { useState, useEffect, useCallback } from 'react';
import { auth } from '../../../libs/firebase';
import Login from './Login';
import * as H from 'history';

type Props = {
	history: H.History;
};

const Component = React.memo(
	(props: Props): JSX.Element => {
		const [email, setEmail] = useState<string>('');
		const [password, setPassword] = useState<string>('');
		const [loading, setLoading] = useState<boolean>(false);

		/**
		 * emailの入力値を制御する関数
		 */
		const handleChangeEmail = useCallback(
			(e: React.ChangeEvent<HTMLInputElement>) => {
				setEmail(e.target.value);
			},
			[setEmail],
		);

		/**
		 * passwordの入力値を制御する関数
		 */
		const handleChangePassword = useCallback(
			(e: React.ChangeEvent<HTMLInputElement>) => {
				setPassword(e.target.value);
			},
			[setPassword],
		);

		/**
		 * 入力されたemailとpasswordが有効か判断しloginする関数
		 */
		const login = async () => {
			setLoading(true);
			try {
				await auth.signInWithEmailAndPassword(email, password);
				setLoading(false);
				props.history.push('/');
			} catch (error) {
				setLoading(false);
				switch (error.code) {
					case 'auth/invalid-email':
						alert('メールアドレスを正しく入力してください。');
						break;
					case 'auth/wrong-password':
						alert(
							'パスワードが違います。\nパスワードを忘れた方は管理者に連絡してください。',
						);
						break;
					case 'auth/user-not-found':
						alert(
							`${email}は登録されていません\n利用登録してない方はSign Upフォームより登録してください。`,
						);
						break;
					default:
						alert(`${error.code}\n${error.message}`);
						break;
				}
			}
		};

		// 既にlogin済みであればHomeに遷移
		useEffect(() => {
			auth.onAuthStateChanged((user) => {
				user && props.history.push('/');
			});
		}, []);

		return (
			<Login
				email={email}
				handleChangeEmail={handleChangeEmail}
				password={password}
				handleChangePassword={handleChangePassword}
				loading={loading}
				login={login}
			/>
		);
	},
);

Component.displayName = 'Component';
export default Component;
