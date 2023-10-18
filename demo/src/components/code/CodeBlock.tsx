import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
	oneDark,
	oneLight,
} from 'react-syntax-highlighter/dist/esm/styles/prism';
import * as S from '../../styles/code.css';
import IcoCopy from '../../assets/ico-copy.svg?react';

interface codeBlock {
	code: string;
	copyable?: boolean;
}

// TODO: Create a theme switch, then apply the theme
const theme = 'light';
const syntaxStyle = theme === 'light' ? oneLight : oneDark;

const CodeBlock = ({ code, copyable = true }: codeBlock) => {
	const onClick = () => {
		const regex = /(~{3}[a-z]*)/gi;
		const onlyCode = code.replace(regex, '');

		navigator.clipboard
			.writeText(onlyCode)
			.then(() => {
				//
			})
			.catch((err) => {
				console.error(err);
			});
	};

	return (
		<>
			<Markdown
				components={{
					code: (props) => {
						const { children, className, node, ...rest } = props;
						const match = /language-(\w+)/.exec(className || '');
						return match ? (
							<SyntaxHighlighter
								children={String(children).replace(/\n$/, '')}
								style={syntaxStyle}
								language={match[1]}
								PreTag='div'
							/>
						) : (
							<code {...rest} className={className}>
								{children}
							</code>
						);
					},
				}}
			>
				{code}
			</Markdown>

			{copyable && (
				<button className={S.CopyBtn} onClick={onClick}>
					<IcoCopy className={S.CopyIcon} />
				</button>
			)}
		</>
	);
};

export default CodeBlock;