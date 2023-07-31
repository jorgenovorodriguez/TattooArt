import { NavLink } from 'react-router-dom';
import Logo from '../Logo/Logo';

const InfoContainer = () => {
    return (
        <div className='register-card'>
            <div className='logo-container'>
                <Logo />
            </div>
            <div className='login-input '>
            <h2  >
                ¿Buscas un sitio donde tatuar? ¿Tienes un estudio y te gustaría
                conocer tatuadores o gente con la que colaborar?.
            </h2>
            <p>
                Únete a nuestra comunidad para estar al tanto de nuevas ofertas
                de trabajo o si simplemente te interesan las colaboraciones
                esporádicas. Si quieres encontrar a las nuevas promesas del
                tatuaje antes que nadie deberías formar parte de TattoArt..
            </p>
            <NavLink to='/home'>Entrar como invitado</NavLink>
        </div>
        </div>
    );
};

export default InfoContainer;
