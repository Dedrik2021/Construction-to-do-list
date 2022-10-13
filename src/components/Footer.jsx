import { Link } from 'react-router-dom';

import logo from '../assets/images/content/logo.png';

const Footer = () => {
	return (
		<footer className="footer">
            <div className="container">
                <Link className='footer__link' to={'/'} onClick={() => window.scroll(0, 0)}>
                    <img src={logo} alt='logo' height={'70px'} width={'200px'}/>
                </Link>
            </div>
        </footer>
	);
};

export default Footer;
