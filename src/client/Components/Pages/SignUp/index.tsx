import React, { useState, useEffect, useCallback } from 'react';
import { auth } from '../../../libs/firebase';
import SignUp from './SignUp';
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
		 * 入力されたemailとpasswordが有効か判断しsignupする関数
		 */
		const signup = async () => {
			setLoading(true);
			try {
				await auth.createUserWithEmailAndPassword(email, password);
				setLoading(false);
				props.history.push('/login');
			} catch (error) {
				setLoading(false);
				switch (error.code) {
					case 'auth/invalid-email':
						alert('メールアドレスを正しく入力してください。');
						break;
					case 'auth/weak-password':
						alert('６文字以上のパスワードを設定してください。');
						break;
					case 'auth/email-already-in-use':
						alert(
							`${email}は既に登録されています。\n LoginフォームよりLoginしてください。`,
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
			<SignUp
				email={email}
				handleChangeEmail={handleChangeEmail}
				password={password}
				handleChangePassword={handleChangePassword}
				loading={loading}
				signup={signup}
			/>
		);
	},
);

Component.displayName = 'Component';
export default Component;
