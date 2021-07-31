import React from 'react';

import { LinkContainer } from 'react-router-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';

import './NavBar.css';

interface Props { }

interface State { }

export default class NavBar extends React.PureComponent<Props, State> {
	// constructor(props: Props) {
	//   super(props);
	// }

	render() {
		return (
			<React.Fragment>
				<Navbar bg='transparent' variant='light'>

					<Navbar.Collapse className='justify-content-center'>
						<Nav className='mr-auto nav_style'>
							<Nav.Item className="item_style">
								<NavLink
									className='nav-link'
									isActive={(match, location) => location.pathname === '/'}
									activeClassName='nav-link active'
									to={{ pathname: '/' }}>
									Home
								</NavLink>
							</Nav.Item>

							<Nav.Item className="item_style">
								<NavLink
									className='nav-link'
									activeClassName='nav-link active'
									to={{ pathname: '/media' }}>
									Browse
								</NavLink>
							</Nav.Item>

							<Nav.Item className="item_style">
								<NavLink
									className='nav-link'
									activeClassName='nav-link active'
									to={{ pathname: '/ethics' }}>
									Ethics
								</NavLink>
							</Nav.Item>


							{(localStorage.getItem("username") && localStorage.getItem("username") !== '') ?
								<Navbar.Text className=''>
									Hi, <Link to={{ pathname: '/profile/' + localStorage.getItem("username") }}>{localStorage.getItem("username")}</Link>
								</Navbar.Text>
								:
								<Nav.Item className="item_style">
									<NavLink
										className='nav-link'
										activeClassName='nav-link active'
										to={{ pathname: '/login' }}>
										Login
									</NavLink>
								</Nav.Item>
							}
						</Nav>
					</Navbar.Collapse>
				</Navbar>
			</React.Fragment>
		)
	}
}