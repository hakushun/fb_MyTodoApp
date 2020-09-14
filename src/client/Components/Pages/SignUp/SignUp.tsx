import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PrimaryButton from '../../Common/Buttons/PrimaryButton';
import SecondaryButton from '../../Common/Buttons/SecondaryButton';
import ButtonWrapper from '../../Common/Buttons/ButtonWrapper';
import Section from '../../Common/Section/Section';
import Heading from '../../Common/Heading/Heading2';
import DonutSpinner from '../../Common/Loading/DonutSpinner';

const FormWrapper = styled.div`
	font-weight: bold;
	margin: 0 auto;
	width: 320px;
`;
const InputGroup = styled.label`
	align-items: center;
	display: block;
	padding: 5px 0;
`;
const Input = styled.input`
	border: 2px solid #ffedcc;
	border-radius: 3px;
	display: block;
	font-size: 14px;
	margin: 5px auto 0;
	min-height: 20px;
	min-width: 230px;
	padding: 3px;

	&:invalid {
		background-color: #ffccde;
		border-color: #ff0059;
	}
`;
const Label = styled.span`
	align-items: center;
	display: flex;
	font-size: 16px;
	justify-content: center;
`;
const Wrapper = styled.div`
	padding: 15px 0;
`;
const Legend = styled.legend`
	margin: 0 auto;
`;
type Props = {
	email: string;
	handleChangeEmail: (event: React.ChangeEvent<HTMLInputElement>) => void;
	password: string;
	handleChangePassword: (event: React.ChangeEvent<HTMLInputElement>) => void;
	loading: boolean;
	signup: () => Promise<void>;
};

const SignUp: React.FC<Props> = React.memo(
	({
		email,
		handleChangeEmail,
		password,
		handleChangePassword,
		loading,
		signup,
	}) => {
		return (
			<Section id="signup" ariahidden="false">
				<form id="signup_form">
					<fieldset>
						<Legend>
							<Heading text="Sign Up Form" />
						</Legend>
						<FormWrapper>
							<InputGroup>
								<Label>Email:</Label>
								<Input
									type="email"
									autoFocus
									required
									aria-required="true"
									placeholder="Email address"
									name="email"
									value={email}
									onChange={(e) => handleChangeEmail(e)}
								/>
							</InputGroup>
							<InputGroup>
								<Label>Password:</Label>
								<Input
									type="password"
									required
									aria-required="true"
									placeholder="Password"
									name="new-password"
									value={password}
									onChange={(e) => handleChangePassword(e)}
								/>
							</InputGroup>
						</FormWrapper>
					</fieldset>
					{loading ? (
						<Wrapper>
							<DonutSpinner />
						</Wrapper>
					) : (
						<>
							<ButtonWrapper>
								<PrimaryButton text="Sign Up" method={() => signup()} />
							</ButtonWrapper>
							<Wrapper>
								If you have already signed up, please login.
								<ButtonWrapper>
									<Link to="/login" style={{ display: 'contents' }}>
										<SecondaryButton text="To Login Form" />
									</Link>
								</ButtonWrapper>
							</Wrapper>
						</>
					)}
				</form>
			</Section>
		);
	},
);

SignUp.displayName = 'SignUp';
export default SignUp;
