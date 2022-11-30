import { NavLink } from 'react-router-dom';
import styles from './Nav.module.css';

const Nav = () => {
  return (
    <header className="">
      <nav>
        <div className={styles.containerNavar}>
          <div className={styles.containerNavarChild}>
            <div>
              <NavLink to="/" className>
                {' '}
                🌐{' '}
              </NavLink>
            </div>

            <div>
              <NavLink to="/countries" className>
                {' '}
                <p>HOME </p>
              </NavLink>
            </div>
            <div>
              <NavLink to="/activities" className>
                {' '}
                <p>ACTIVITIES{'    '}</p>
              </NavLink>
            </div>
            <div>
              <NavLink to="/activities/create" className>
                {' '}
                <p>CREATE </p>
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Nav;
