import React from 'react';
import {
	FooterWrapper,
	FooterText,
	IconWrapper,
	RepoLink,
} from './Footer.style';
import { FaHeart } from 'react-icons/fa';
import { AiOutlineStar } from 'react-icons/ai';

function Footer() {
	return (
		<FooterWrapper>
			<FooterText>
				Feel free to
				<IconWrapper>
					<AiOutlineStar />
				</IconWrapper>
				and
				<IconWrapper>
					<FaHeart />
				</IconWrapper>
				<RepoLink
					href='https://github.com/gajojr/gpt-steroid'
					target='_blank'
					rel='noreferrer'
				>
					github repo
				</RepoLink>
			</FooterText>
		</FooterWrapper>
	);
}

export default Footer;
