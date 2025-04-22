import React from 'react'
import Icon from '../../../utils/Icon'
import Button from '../../../utils/base/Button';

const Header = () => {
	return (
		<>
			<header id="header">
				<nav>
					<ul className="header__nav">
						<li>
							<Button variant="primary">Sign In</Button>
						</li>
						<li>
							<Icon type="bell" size="2.4rem" />
						</li>
					</ul>
				</nav>
			</header>
		</>
	)
}

export default Header