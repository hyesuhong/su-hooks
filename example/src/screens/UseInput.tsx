import { ValidatorFn, useInput } from '../hooks/useInput';

export default function UseInput() {
	const maxLen: ValidatorFn = (value) => value.length < 11;
	const name = useInput('Su', maxLen);
	return (
		<>
			<input type='text' placeholder='Name' {...name} />
		</>
	);
}
