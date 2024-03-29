import { useEffect, useState } from 'react';

export type validator = (value: string) => boolean;

export interface inputProps {
	[key: string]: { value: string; validator?: validator };
}

interface UseForm {
	inputs: inputProps;
	submitHandler: () => void;
}

interface inputReturns {
	[key: string]: {
		value: string;
		isValid?: boolean;
	};
}

export const useForm = ({ inputs, submitHandler }: UseForm) => {
	const initialForm = Object.keys(inputs).reduce((acc, input) => {
		acc[input] = { ...inputs[input], isValid: false };
		return acc;
	}, <inputReturns>{});

	const [form, setForm] = useState<inputReturns>(initialForm);
	const [isFormValid, setIsFormValid] = useState(false);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;

		if (!inputs[name]) return;

		const isValid = inputs[name].validator
			? inputs[name].validator?.(value)
			: true;

		setForm((prev) => ({ ...prev, [name]: { value, isValid } }));
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		await submitHandler();
	};

	useEffect(() => {
		setIsFormValid(Object.values(form).every((el) => el.isValid));
	}, [form]);

	return { form, handleChange, handleSubmit, isFormValid };
};
